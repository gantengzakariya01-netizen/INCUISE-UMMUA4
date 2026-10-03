import React from 'react';
import { Flame } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="py-28 relative bg-[#09090b] overflow-hidden flex items-center justify-center text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff8c00]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
          <Flame className="w-4 h-4 text-[#ff8c00]" />
          <span className="font-display tracking-[0.25em] text-xs text-[#ebd19a] uppercase">
            BRAND MANIFESTO
          </span>
        </div>

        {/* Monumental Typography */}
        <div className="space-y-2 select-none">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-white/40 leading-none">
            WE DON'T JUST SERVE
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] tracking-tight text-champagne-gradient leading-none">
            CHICKEN.
          </h2>
          <div className="py-2">
            <h2 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] tracking-tight text-amber-gradient leading-none">
              WE BUILD CRAVINGS.
            </h2>
          </div>
        </div>

        {/* Narrative Paragraph */}
        <p className="font-sans text-sm sm:text-base text-[#d5d0c8] max-w-2xl mx-auto mt-8 leading-relaxed font-normal">
          Bagi kami, ayam bukan komoditas cepat saji biasa. Ini adalah seni mengolah protein murni dengan tekstur kulit renyah berlapis dan kelembutan daging beraroma rempah artisan.
        </p>

      </div>
    </section>
  );
};
