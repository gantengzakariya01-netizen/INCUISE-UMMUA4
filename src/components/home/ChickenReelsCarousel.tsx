import React, { useState } from 'react';
import { CHICKEN_REEL_PRODUCTS, type ChickenReelProduct } from '../../lib/assets';
import { useConvexReel } from '../../hooks/useConvexReel';
import { soundEffects } from '../../utils/soundEffects';
import { Play, Sparkles, Star, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { ChickenReelModal } from '../modals/ChickenReelModal';

interface ChickenReelsCarouselProps {
  onOpenOrderModal?: () => void;
}

export const ChickenReelsCarousel: React.FC<ChickenReelsCarouselProps> = ({ onOpenOrderModal }) => {
  const [selectedProduct, setSelectedProduct] = useState<ChickenReelProduct | null>(null);

  const {
    containerRef,
    reelCards,
    isDragging,
    activeIndex,
    containerWidth,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onMouseEnter,
    onMouseLeave,
    next,
    prev
  } = useConvexReel(CHICKEN_REEL_PRODUCTS, {
    autoDriftSpeed: 0.55,
    friction: 0.93,
    cardBaseWidth: 290,
    gap: 28
  });

  const isMobile = containerWidth < 820;

  const handleCardClick = (product: ChickenReelProduct) => {
    // If was dragging significantly, don't trigger modal click
    if (isDragging) return;
    soundEffects.playClick();
    setSelectedProduct(product);
  };

  const handleOrderCta = () => {
    soundEffects.playClick();
    if (onOpenOrderModal) {
      onOpenOrderModal();
    } else {
      const menuEl = document.getElementById('menu-catalog');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="chicken-reels"
      className="relative py-20 lg:py-28 bg-[#0D1120] text-[#ECE8DE] overflow-hidden select-none"
      aria-label="Cinematic Chicken Food Reels Carousel"
    >
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#FFB347]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-[450px] h-[450px] bg-[#FF7A36]/12 rounded-full blur-[180px] pointer-events-none" />

      {/* Decorative Grid Lines / Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ECE8DE_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151A2E]/80 border border-[#FFB347]/30 text-xs font-mono text-[#FFD18A] uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(255,179,71,0.15)] animate-fade-in">
            <Flame className="w-3.5 h-3.5 text-[#FF7A36] animate-pulse" />
            <span>CINEMATIC PRODUCT REELS • 10 MASTER CREATIONS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#ECE8DE] tracking-tight font-bold">
            TASTE THE <span className="text-golden-orange-gradient">CHICKEN REEL</span>
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-[#9AA0B4] max-w-xl mx-auto leading-relaxed">
            Drag or drift through our signature poultry collection. Each dish crafted with high-heat flame, 24-hour brine, and bold artisan glazes.
          </p>
        </div>

        {/* 3D Convex Carousel Container */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{
            perspective: isMobile ? '900px' : '1400px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Edge Fade Gradients for Cinematic Depth */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0D1120] to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0D1120] to-transparent z-30 pointer-events-none" />

          {/* Cards Track */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {reelCards.map((card) => {
              const { item, virtualKey, x, scale, translateY, rotateY, rotateZ, translateZ, opacity, zIndex, brightness, isCenter } = card;

              return (
                <div
                  key={virtualKey}
                  onClick={() => handleCardClick(item)}
                  className="absolute pointer-events-auto will-change-transform transition-shadow duration-300 group"
                  style={{
                    transform: `translate3d(${x}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: `brightness(${brightness})`,
                    transformOrigin: '50% 50%'
                  }}
                  data-cursor="VIEW REEL"
                >
                  {/* Card Container */}
                  <div
                    className={`relative w-[230px] sm:w-[270px] lg:w-[290px] aspect-[9/14] rounded-3xl overflow-hidden bg-[#151A2E] border transition-all duration-300 ${
                      isCenter
                        ? 'border-[#FFB347]/60 shadow-[0_20px_50px_rgba(255,179,71,0.3)] ring-1 ring-[#FFB347]/40'
                        : 'border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#FFB347]/40'
                    }`}
                  >
                    {/* Food Photography Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />

                    {/* Dark gradient scrims */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1120] via-black/20 to-black/40 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#FF7A36] text-[#0D1120] font-display shadow-md">
                        {item.badge}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[#FFD18A] text-[10px] font-mono">
                        <Star className="w-3 h-3 fill-[#FFB347] text-[#FFB347]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Center Frosted Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCenter
                            ? 'bg-[#FFB347]/30 text-[#ECE8DE] backdrop-blur-md border border-[#FFB347]/50 shadow-[0_0_20px_rgba(255,179,71,0.5)] scale-100 group-hover:scale-110 group-hover:bg-[#FFB347] group-hover:text-black'
                            : 'bg-black/40 text-white/70 backdrop-blur-sm border border-white/20 group-hover:scale-105 group-hover:bg-[#FFB347]/40'
                        }`}
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#FFB347] uppercase tracking-wider block">
                        {item.portion}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl text-[#ECE8DE] font-bold leading-tight drop-shadow-md line-clamp-1 group-hover:text-[#FFD18A] transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-display text-base font-bold text-[#FFB347]">
                          Rp {(item.promoPrice || item.price).toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-[#9AA0B4] font-mono">
                          🔥 {item.calories} kcal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Arrow Controls */}
          <button
            onClick={() => {
              soundEffects.playClick();
              prev();
            }}
            aria-label="Previous Chicken Reel"
            className="hidden sm:flex absolute left-4 z-40 w-11 h-11 rounded-full bg-[#151A2E]/80 hover:bg-[#FFB347] text-[#ECE8DE] hover:text-black border border-white/10 hover:border-[#FFB347] items-center justify-center transition-all shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              next();
            }}
            aria-label="Next Chicken Reel"
            className="hidden sm:flex absolute right-4 z-40 w-11 h-11 rounded-full bg-[#151A2E]/80 hover:bg-[#FFB347] text-[#ECE8DE] hover:text-black border border-white/10 hover:border-[#FFB347] items-center justify-center transition-all shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigation Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-6">
          {CHICKEN_REEL_PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => {
                soundEffects.playClick();
                setSelectedProduct(prod);
              }}
              title={prod.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-7 bg-[#FFB347]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Section 8: Striking CTA Below Carousel */}
        <div className="relative mt-12 sm:mt-16 flex flex-col items-center justify-center text-center">
          {/* Slowly Rotating Dotted Ellipse Container */}
          <div className="relative flex items-center justify-center p-8 sm:p-12">
            
            {/* Rotating Dotted SVG Ellipse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-[340px] sm:w-[460px] h-[140px] sm:h-[180px] animate-spin-slow opacity-30 text-[#FFB347]"
                viewBox="0 0 460 180"
                fill="none"
              >
                <ellipse
                  cx="230"
                  cy="90"
                  rx="220"
                  ry="80"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />
              </svg>
            </div>

            {/* Subtle Golden Glow behind the button */}
            <div className="absolute w-64 h-24 bg-[#FFB347]/20 rounded-full blur-2xl pointer-events-none animate-pulse-amber" />

            {/* Small Peach-Colored Floating Sticker: "Taste the Difference" */}
            <div className="absolute -top-1 sm:top-2 right-4 sm:right-12 z-20 animate-float pointer-events-none">
              <div className="px-3 py-1 rounded-full bg-[#FFD18A] text-[#0D1120] text-[10px] sm:text-xs font-black uppercase tracking-wider font-display shadow-lg border border-[#FFB347] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF7A36]" />
                <span>Taste the Difference</span>
              </div>
            </div>

            {/* Main Golden Pill-Shaped CTA Button */}
            <button
              onClick={handleOrderCta}
              data-cursor="ORDER NOW"
              className="relative z-10 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FFB347] via-[#FFC570] to-[#FF7A36] text-[#0D1120] font-display text-sm sm:text-base lg:text-lg font-black tracking-widest uppercase shadow-[0_0_35px_rgba(255,179,71,0.5)] hover:shadow-[0_0_55px_rgba(255,179,71,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-[#FFF2D6]"
            >
              <span>ORDER YOUR FAVORITE CHICKEN</span>
              <span className="w-2 h-2 rounded-full bg-[#0D1120] animate-ping" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-[#9AA0B4] font-mono mt-1">
            ⚡ Hot high-heat delivery with thermal-sealed containers across Jakarta & beyond
          </p>
        </div>

      </div>

      {/* Chicken Reel Video/Details Modal */}
      <ChickenReelModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
