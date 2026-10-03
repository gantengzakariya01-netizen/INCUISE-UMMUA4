import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only enable on desktop with mouse
    const checkIsTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
      setIsMobile(hasTouch);
    };

    checkIsTouch();
    window.addEventListener('resize', checkIsTouch);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const orderBtn = target.closest('button, a, [data-cursor="ORDER"]');
      const viewTarget = target.closest('[data-cursor="VIEW"], img');

      if (orderBtn && (orderBtn.textContent?.toUpperCase().includes('ORDER') || orderBtn.textContent?.toUpperCase().includes('PESAN') || orderBtn.getAttribute('data-cursor') === 'ORDER')) {
        setIsPointer(true);
        setCursorText('ORDER');
      } else if (viewTarget && (viewTarget.getAttribute('data-cursor') === 'VIEW' || viewTarget.closest('[data-cursor="VIEW"]'))) {
        setIsPointer(true);
        setCursorText('VIEW');
      } else if (orderBtn || target.tagName === 'BUTTON' || target.tagName === 'A' || target.getAttribute('role') === 'button') {
        setIsPointer(true);
        setCursorText('');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkIsTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center font-display tracking-widest text-[9px] font-extrabold uppercase transition-all duration-200 ${
          cursorText
            ? 'w-14 h-14 bg-[#ff8c00] text-[#0d0d10] shadow-[0_0_25px_rgba(255,140,0,0.6)] scale-110'
            : isPointer
            ? 'w-9 h-9 bg-white/20 backdrop-blur-md border border-[#ff8c00] scale-125'
            : 'w-4 h-4 bg-[#ff8c00]/80 border border-[#ebd19a] shadow-[0_0_12px_rgba(255,140,0,0.4)]'
        }`}
      >
        {cursorText}
      </div>
    </div>
  );
};
