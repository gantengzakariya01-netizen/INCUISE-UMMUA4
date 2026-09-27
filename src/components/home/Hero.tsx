import React from 'react';
import { Sparkles, ArrowRight, Star, Flame } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { INITIAL_PRODUCTS } from '../../data/restaurantData';

export const Hero: React.FC = () => {
  const { addToCart } = useCart();
  const { setSelectedFoodModal, showToast } = useUI();

  const featuredHeroDish = INITIAL_PRODUCTS[0]; // Royal Wagyu A5 Tenderloin

  return (
    <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      
      {/* Background Decorative Purples & Gold Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5c2494]/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#d4af37]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top VIP Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#5c2494]/30 to-transparent border border-[#d4af37]/40 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
              <span className="text-xs font-semibold text-[#f3e5ab] uppercase tracking-widest">
                Fine Dining Royalty • Jakarta
              </span>
            </div>

            {/* Main Headline (As requested) */}
            <h1 className="font-luxury text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-purple-gradient leading-[1.15]">
              Premium Taste.<br />
              <span className="text-gold-gradient">Exceptional Experience.</span>
            </h1>

            {/* Subheadline (As requested) */}
            <p className="text-base sm:text-lg text-[#bda8d6] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Nikmati hidangan berkualitas premium dengan cita rasa terbaik, dibuat dengan bahan pilihan untuk pengalaman kuliner yang istimewa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#menu"
                className="w-full sm:w-auto btn-gold px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#menu"
                className="w-full sm:w-auto btn-outline-gold px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Lihat Menu</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-[#d4af37]">
                  <Star className="w-4 h-4 fill-[#d4af37]" />
                  <span className="text-base font-bold text-white">4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-white/50">2,500+ Ulasan VIP</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-white/10 px-4">
                <span className="text-base font-bold text-[#f3e5ab]">100% Organik</span>
                <span className="text-[11px] text-white/50">Bahan Baku Pilihan</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-base font-bold text-[#d4af37]">Pengiriman VIP</span>
                <span className="text-[11px] text-white/50">Armada Khusus</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glowing Card Border Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37] via-[#9333ea] to-[#d4af37] opacity-40 blur-xl animate-pulse-glow" />

              <div className="relative rounded-3xl glass-panel-heavy border border-[#d4af37]/40 p-5 shadow-2xl overflow-hidden group">
                
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <img
                    src={featuredHeroDish.image_url}
                    alt={featuredHeroDish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0b0416]/80 text-[#d4af37] border border-[#d4af37]/50 backdrop-blur-md flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Signature Dish Chef
                    </span>
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{featuredHeroDish.rating}</span>
                  </div>
                </div>

                {/* Dish Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-luxury text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {featuredHeroDish.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#bda8d6] line-clamp-2 leading-relaxed">
                    {featuredHeroDish.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-xs text-white/50 block line-through">
                        Rp {featuredHeroDish.price.toLocaleString('id-ID')}
                      </span>
                      <span className="font-luxury text-xl font-bold text-gold-gradient">
                        Rp {(featuredHeroDish.promo_price || featuredHeroDish.price).toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedFoodModal(featuredHeroDish)}
                        className="btn-outline-gold px-3 py-2 rounded-xl text-xs font-semibold"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => {
                          addToCart(featuredHeroDish);
                          showToast(`${featuredHeroDish.name} ditambahkan ke keranjang!`);
                        }}
                        className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-md"
                      >
                        + Pesan
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
