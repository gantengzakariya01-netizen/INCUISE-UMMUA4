import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface OpeningLoaderProps {
  onComplete: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 45);

    // Safety timeout in case timer gets throttled in background tab
    const safety = setTimeout(() => {
      setIsFading(true);
      setTimeout(onComplete, 400);
    }, 2200);

    return () => {
      clearInterval(timer);
      clearTimeout(safety);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#09090b] flex flex-col items-center justify-center transition-all duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] bg-[#ff8c00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Flame Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1c1c23] via-[#ff8c00]/20 to-[#ebd19a]/30 border border-[#ff8c00]/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,140,0,0.3)] animate-pulse-amber">
          <Flame className="w-8 h-8 text-[#ff8c00] animate-bounce" />
        </div>

        {/* Large Typography: MUSCLE CHICKEN */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider text-champagne-gradient leading-none mb-2">
          MUSCLE<br />
          <span className="text-amber-gradient">CHICKEN</span>
        </h1>

        {/* Subtitle: INDONESIA */}
        <p className="font-sans text-xs sm:text-sm font-extrabold tracking-[0.4em] text-[#d5d0c8] uppercase mb-8">
          INDONESIA
        </p>

        {/* Progress Bar & Counter */}
        <div className="w-48 sm:w-64">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#8e8a93] mb-1.5">
            <span>PREPARING KITCHEN</span>
            <span className="text-[#ff8c00] font-bold">{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d8b26e] to-[#ff8c00] transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
