import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { ChickenReelProduct } from '../lib/assets';

export interface ConvexCardTransform {
  item: ChickenReelProduct;
  originalIndex: number;
  virtualKey: string;
  x: number; // visual pixel offset from container center
  scale: number;
  translateY: number;
  rotateY: number; // degrees
  rotateZ: number; // degrees
  translateZ: number; // px
  opacity: number;
  zIndex: number;
  brightness: number;
  isCenter: boolean;
  distanceFromCenter: number; // absolute distance
}

interface UseConvexReelOptions {
  autoDriftSpeed?: number; // px per frame
  friction?: number; // momentum decay factor (0.92 ~ 0.96)
  cardBaseWidth?: number; // base card width
  gap?: number;
}

export function useConvexReel(
  items: ChickenReelProduct[],
  options: UseConvexReelOptions = {}
) {
  const {
    autoDriftSpeed = 0.55,
    friction = 0.93,
    cardBaseWidth = 280,
    gap = 24
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Position state (in pixels)
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || window.innerWidth);
      } else {
        setContainerWidth(window.innerWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Compute layout dimensions
  const isMobile = containerWidth < 820;
  const isSmallMobile = containerWidth < 450;

  const effectiveCardWidth = useMemo(() => {
    if (isSmallMobile) return Math.min(240, containerWidth * 0.65);
    if (isMobile) return Math.min(270, containerWidth * 0.45);
    return cardBaseWidth;
  }, [containerWidth, isMobile, isSmallMobile, cardBaseWidth]);

  const effectiveGap = isMobile ? 16 : gap;
  const itemStride = effectiveCardWidth + effectiveGap;
  const totalTrackLength = itemStride * items.length;

  // Animation Loop (auto-drift + momentum)
  useEffect(() => {
    let prevTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = Math.min(32, timestamp - prevTimestamp);
      prevTimestamp = timestamp;

      if (!isDraggingRef.current) {
        // Apply momentum velocity
        if (Math.abs(velocityRef.current) > 0.08) {
          offsetRef.current += velocityRef.current * (dt / 16.67);
          velocityRef.current *= Math.pow(friction, dt / 16.67);
        } else {
          velocityRef.current = 0;
          // Apply automatic continuous drift from right to left (offset decreases)
          if (!isHoveredRef.current && !prefersReducedMotion) {
            offsetRef.current -= autoDriftSpeed * (dt / 16.67);
          }
        }
      }

      // Keep offset normalized within totalTrackLength range
      if (totalTrackLength > 0) {
        offsetRef.current = ((offsetRef.current % totalTrackLength) + totalTrackLength) % totalTrackLength;
      }

      setCurrentOffset(offsetRef.current);
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [autoDriftSpeed, friction, totalTrackLength, prefersReducedMotion]);

  // Pointer Event Handlers for Dragging
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only respond to primary button or touch
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    setHasInteracted(true);
    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Capture pointer if available
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastPointerXRef.current;
    const dt = Math.max(1, now - lastTimeRef.current);

    offsetRef.current += dx;
    velocityRef.current = (dx / dt) * 16.67; // normalize to ~60fps px/frame

    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = now;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  const onPointerCancel = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const onMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  // Programmatic navigation
  const next = useCallback(() => {
    velocityRef.current = -12;
  }, []);

  const prev = useCallback(() => {
    velocityRef.current = 12;
  }, []);

  const goToIndex = useCallback((index: number) => {
    const targetOffset = -index * itemStride;
    velocityRef.current = (targetOffset - offsetRef.current) * 0.15;
  }, [itemStride]);

  // Compute Convex 3D Transformations for every card
  const reelCards: ConvexCardTransform[] = useMemo(() => {
    if (!items.length || totalTrackLength === 0) return [];

    const halfContainer = containerWidth / 2;
    const halfTrack = totalTrackLength / 2;
    // Visible viewing band width
    const viewBand = isMobile ? Math.max(300, containerWidth * 0.85) : Math.max(600, containerWidth * 0.7);

    // To ensure seamless infinite wrapping without blank corners, we repeat items across 3 cycles (-1, 0, +1)
    const cards: ConvexCardTransform[] = [];

    const repetitions = [-1, 0, 1];

    repetitions.forEach((rep) => {
      items.forEach((item, originalIndex) => {
        // Base nominal position
        const nominalX = originalIndex * itemStride + rep * totalTrackLength;
        // Shift by current global offset
        let relativeX = nominalX + currentOffset;

        // Wrap relative to center
        // Center position corresponds to relativeX = 0
        // We want cards within [-halfTrack, +halfTrack]
        let dx = ((relativeX % totalTrackLength) + totalTrackLength) % totalTrackLength;
        if (dx > halfTrack) {
          dx -= totalTrackLength;
        }

        // Only compute and render cards that are reasonably close to the viewport
        const cutoff = halfContainer + effectiveCardWidth * 1.5;
        if (Math.abs(dx) > cutoff) return;

        // Normalized distance from center (-1 on left edge, 0 at center, +1 on right edge)
        const u = dx / (viewBand / 2);
        const absU = Math.min(1.8, Math.abs(u));

        // 3D CONVEX GEOMETRY:
        // Center product is largest, standing taller, with 0 tilt.
        // Side products gradually shrink and tilt towards center along a cylindrical convex arc.
        const scale = Math.max(0.72, 1.06 - 0.26 * Math.pow(Math.min(1, absU), 1.3));
        const translateY = -18 * (1 - Math.min(1, Math.pow(absU, 1.4))); // center rises upward
        const rotateY = -u * (isMobile ? 18 : 26); // degrees of convex tilt
        const rotateZ = -u * (isMobile ? 1.5 : 2.5); // subtle playful roll
        const translateZ = -120 * Math.pow(Math.min(1, absU), 1.2); // push back in 3D space
        const opacity = Math.max(0.2, 1 - Math.pow(Math.max(0, absU - 0.65), 1.5) * 0.85);
        const zIndex = Math.round(100 - absU * 50);
        const brightness = Math.max(0.65, 1 - absU * 0.28);
        const isCenter = absU < 0.25;

        cards.push({
          item,
          originalIndex,
          virtualKey: `${item.id}-rep-${rep}`,
          x: dx,
          scale,
          translateY,
          rotateY,
          rotateZ,
          translateZ,
          opacity,
          zIndex,
          brightness,
          isCenter,
          distanceFromCenter: Math.abs(dx)
        });
      });
    });

    // Sort by zIndex ascending so higher z-index cards render on top
    cards.sort((a, b) => a.zIndex - b.zIndex);

    return cards;
  }, [items, totalTrackLength, containerWidth, isMobile, itemStride, currentOffset, effectiveCardWidth]);

  // Identify currently focused center index
  const activeIndex = useMemo(() => {
    if (!items.length || totalTrackLength === 0) return 0;
    const centerCard = reelCards.reduce((closest, card) => {
      return card.distanceFromCenter < closest.distanceFromCenter ? card : closest;
    }, reelCards[0]);

    return centerCard ? centerCard.originalIndex : 0;
  }, [reelCards, items.length, totalTrackLength]);

  return {
    containerRef,
    reelCards,
    isDragging,
    hasInteracted,
    activeIndex,
    containerWidth,
    effectiveCardWidth,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onMouseEnter,
    onMouseLeave,
    next,
    prev,
    goToIndex
  };
}
