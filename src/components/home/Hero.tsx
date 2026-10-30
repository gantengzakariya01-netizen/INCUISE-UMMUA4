import React from 'react';
import { ArrowRight, Flame, Sparkles, Star, Award, Heart, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface HeroProps {
  onExploreMenu?: () => void;
  onDiscoverStory?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onDiscoverStory }) => {
  const handleExplore = () => {
    soundEffects.playClick();
    if (onExploreMenu) {
      onExploreMenu();
    } else {
      const el = document.getElementById('chicken-reels') || document.getElementById('menu-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStory = () => {
    soundEffects.playClick();
    if (onDiscoverStory) {
      onDiscoverStory();
    } else {
      const el = document.getElementById('about-story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-36 overflow-hidden bg-[#0D1120] text-[#ECE8DE]"
      aria-label="Chickenline Hero"
    >
      {/* Background Cinematic Atmosphere & Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_15%,rgba(255,179,71,0.15),rgba(13,17,32,0.98))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-[#FF7A36]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-[#FFB347]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ECE8DE_0.7px,transparent_0.7px)] [background-size:20px_20px]" />

      {/* Decorative Floating Curve Dotted Connectors SVG (Desktop) */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none text-[#FFB347]/25"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <path
          d="M 220,380 C 340,320 480,420 620,350"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 6"
          className="animate-dash"
        />
        <path
          d="M 820,350 C 960,420 1100,310 1220,380"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 6"
          className="animate-dash"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        {/* Centered Badge */}
        <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#151A2E]/90 border border-[#FFB347]/40 text-xs sm:text-sm font-mono text-[#FFD18A] uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(255,179,71,0.2)] mb-8 animate-pop-in backdrop-blur-md">
          <Flame className="w-4 h-4 text-[#FF7A36] animate-pulse" />
          <span>FRESHLY PREPARED • PREMIUM CHICKEN</span>
        </div>

        {/* Floating Sticker 1: "100% Delicious" (Top Left on desktop) */}
        <div className="hidden lg:flex absolute left-8 xl:left-12 top-28 items-center gap-2 px-4 py-2 rounded-2xl bg-[#FF7A36] text-[#0D1120] font-display font-black text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(255,122,54,0.4)] rotate-[-6deg] animate-float">
          <Award className="w-4 h-4" />
          <span>100% Delicious</span>
        </div>

        {/* Floating Sticker 2: "Fresh Every Day" (Top Right on desktop) */}
        <div className="hidden lg:flex absolute right-8 xl:right-12 top-32 items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFB347] text-[#0D1120] font-display font-black text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(255,179,71,0.4)] rotate-[8deg] animate-float-delayed">
          <ShieldCheck className="w-4 h-4" />
          <span>Fresh Every Day</span>
        </div>

        {/* Floating Sticker 3: "Made With Passion" (Mid Bottom on desktop) */}
        <div className="hidden lg:flex absolute left-24 bottom-14 items-center gap-2 px-4 py-2 rounded-2xl bg-[#151A2E] border border-[#FFB347]/40 text-[#FFD18A] font-display font-black text-xs uppercase tracking-wider shadow-xl rotate-[-4deg] animate-float">
          <Heart className="w-4 h-4 text-[#FF7A36] fill-[#FF7A36]" />
          <span>Made With Passion</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#ECE8DE] max-w-5xl mx-auto mb-6 animate-reveal-blur">
          <span className="block font-medium text-white">More Than Just</span>
          <span className="block font-bold text-golden-orange-gradient drop-shadow-[0_5px_25px_rgba(255,179,71,0.3)]">
            Chicken. It's an Experience.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-[#9AA0B4] max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up">
          Discover delicious chicken creations, perfectly prepared with bold flavors, premium ingredients and unforgettable taste.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto mb-12">
          {/* Primary CTA */}
          <button
            onClick={handleExplore}
            data-cursor="MENU"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#FFB347] via-[#FFC570] to-[#FF7A36] text-[#0D1120] font-display text-base font-black tracking-widest uppercase shadow-[0_0_30px_rgba(255,179,71,0.5)] hover:shadow-[0_0_45px_rgba(255,179,71,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group border border-[#FFF2D6]"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleStory}
            data-cursor="STORY"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-[#151A2E]/80 hover:bg-[#151A2E] text-[#ECE8DE] hover:text-[#FFB347] font-display text-base font-bold tracking-widest uppercase border border-[#FFB347]/30 hover:border-[#FFB347] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#FFB347]" />
            <span>Discover Our Story</span>
          </button>
        </div>

        {/* Mobile floating sticker row (visible below 820px) */}
        <div className="flex lg:hidden flex-wrap items-center justify-center gap-2.5 pt-2">
          <span className="px-3 py-1 rounded-full bg-[#FF7A36] text-[#0D1120] font-display font-black text-[11px] uppercase tracking-wider">
            100% Delicious
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FFB347] text-[#0D1120] font-display font-black text-[11px] uppercase tracking-wider">
            Fresh Every Day
          </span>
          <span className="px-3 py-1 rounded-full bg-[#151A2E] border border-[#FFB347]/40 text-[#FFD18A] font-display font-black text-[11px] uppercase tracking-wider">
            Made With Passion
          </span>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-10 mt-8 border-t border-white/10 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#FFB347] text-lg sm:text-2xl font-black font-display">
              <Star className="w-4 h-4 fill-[#FFB347]" />
              <span>4.98★</span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#9AA0B4] uppercase tracking-wider font-mono">14k+ Happy Patrons</span>
          </div>

          <div className="text-center">
            <div className="text-[#ECE8DE] text-lg sm:text-2xl font-black font-display">
              24H BRINE
            </div>
            <span className="text-[10px] sm:text-xs text-[#9AA0B4] uppercase tracking-wider font-mono">Secret Herb Crust</span>
          </div>

          <div className="text-center">
            <div className="text-[#FF7A36] text-lg sm:text-2xl font-black font-display">
              100% FRESH
            </div>
            <span className="text-[10px] sm:text-xs text-[#9AA0B4] uppercase tracking-wider font-mono">No Frozen Poultry</span>
          </div>
        </div>

      </div>
    </section>
  );
};
