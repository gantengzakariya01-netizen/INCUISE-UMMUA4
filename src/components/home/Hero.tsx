import React from 'react';
import { ArrowRight, Flame, Sparkles, Star, ShieldCheck, Award } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { INITIAL_PRODUCTS } from '../../data/restaurantData';
import { soundEffects } from '../../utils/soundEffects';

export const Hero: React.FC = () => {
  const { addToCart } = useCart();
  const { setSelectedFoodModal, showToast } = useUI();

  const heroItem = INITIAL_PRODUCTS[0]; // Signature Beast Crispy Chicken

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#09090b]"
    >
      {/* Background Cinematic Atmosphere & Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,140,0,0.18),rgba(13,13,16,0.95))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff8c00]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#d8b26e]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Monumental Brand Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* VIP Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff8c00]/20 via-[#d8b26e]/15 to-transparent border border-[#ff8c00]/40 shadow-sm">
              <Flame className="w-4 h-4 text-[#ff8c00] animate-bounce" />
              <span className="font-display tracking-[0.2em] text-xs text-[#ebd19a] uppercase">
                THE NEW STANDARD OF POULTRY • JAKARTA
              </span>
            </div>

            {/* Giant Cinematic Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.92]">
              NOT JUST<br />
              <span className="text-champagne-gradient">CHICKEN.</span><br />
              <span className="text-xl sm:text-2xl font-sans tracking-[0.3em] font-extrabold text-white/50 block my-1">
                THIS IS
              </span>
              <span className="text-amber-gradient">MUSCLE CHICKEN.</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-[#d5d0c8] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Ayam premium, rasa luar biasa. Diracik dengan 24-jam dry-brine rempah artisan, menghasilkan sensasi krispi berlapis dan daging luar biasa juicy.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                onClick={() => soundEffects.playClick()}
                data-cursor="ORDER"
                className="w-full sm:w-auto btn-amber px-8 py-4 rounded-full text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,140,0,0.5)] group"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#showcase"
                onClick={() => soundEffects.playClick()}
                data-cursor="VIEW"
                className="w-full sm:w-auto btn-outline-champagne px-8 py-4 rounded-full text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#ebd19a]" />
                <span>VIEW SHOWCASE</span>
              </a>
            </div>

            {/* Metric & Quality Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="flex items-center gap-1 text-[#ff8c00] text-sm sm:text-base font-black font-display">
                  <Star className="w-4 h-4 fill-[#ff8c00]" />
                  <span>4.98 / 5.0</span>
                </div>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Top Tier Review</span>
              </div>

              <div className="text-left border-x border-white/10 px-3 sm:px-6">
                <div className="flex items-center gap-1 text-[#ebd19a] text-sm sm:text-base font-black font-display">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% FRESH</span>
                </div>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Farm to Table</span>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1 text-white text-sm sm:text-base font-black font-display">
                  <Award className="w-4 h-4 text-[#ff8c00]" />
                  <span>24H BRINE</span>
                </div>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Secret Crust</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase with Steam & Crumbs */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              {/* Glow Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#ff8c00] via-[#d8b26e] to-[#e65100] opacity-35 blur-2xl animate-pulse-amber" />

              {/* Floating Culinary Card */}
              <div className="relative rounded-3xl glass-panel-heavy border border-[#d8b26e]/30 p-4 sm:p-5 shadow-2xl overflow-hidden">
                
                {/* Visual Container */}
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-black/60 cursor-pointer"
                  onClick={() => {
                    setSelectedFoodModal(heroItem);
                    soundEffects.playClick();
                  }}
                  data-cursor="VIEW"
                >
                  <img
                    src={heroItem.image_url}
                    alt={heroItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Steam Micro Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-white/10 rounded-full blur-xl animate-steam pointer-events-none" />

                  {/* Highlight Floating Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/80 text-[#ff8c00] border border-[#ff8c00]/50 backdrop-blur-md flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      GOLDEN CRUNCH
                    </span>
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-1 font-mono">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{heroItem.rating}</span>
                  </div>
                </div>

                {/* Hero Item Details */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff8c00] block">
                        FLAGSHIP PRODUCT
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#ff8c00] transition-colors leading-tight">
                        {heroItem.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#d5d0c8] line-clamp-2 leading-relaxed">
                    {heroItem.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <span className="text-xs text-white/40 line-through block font-mono">
                        Rp {heroItem.price.toLocaleString('id-ID')}
                      </span>
                      <span className="font-display text-2xl font-bold text-amber-gradient">
                        Rp {(heroItem.promo_price || heroItem.price).toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedFoodModal(heroItem);
                          soundEffects.playClick();
                        }}
                        className="btn-outline-champagne px-3.5 py-2 rounded-xl text-xs font-bold"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => {
                          addToCart(heroItem);
                          soundEffects.playClick();
                          showToast(`${heroItem.name} ditambahkan ke keranjang!`);
                        }}
                        data-cursor="ORDER"
                        className="btn-amber px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg"
                      >
                        + ORDER
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
