import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { soundEffects } from '../../utils/soundEffects';
import { Star, ShoppingBag, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const showcaseItems = INITIAL_PRODUCTS.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  const { addToCart } = useCart();
  const { setSelectedFoodModal, setIsCheckoutOpen, showToast } = useUI();

  const current = showcaseItems[activeIndex];

  const handleAddToCart = () => {
    addToCart(current);
    soundEffects.playClick();
    showToast(`${current.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(current);
    soundEffects.playClick();
    setIsCheckoutOpen(true);
  };

  return (
    <section id="showcase" className="py-24 relative bg-[#09090b] border-t border-white/5 overflow-hidden">
      {/* Dynamic ambient background glow that shifts */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#ff8c00]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
              <Zap className="w-3.5 h-3.5 text-[#ff8c00]" />
              <span className="font-display tracking-[0.2em] text-[11px] text-[#ebd19a] uppercase">
                HERO PRODUCT LINEUP
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              MASTER CULINARY SHOWCASE
            </h2>
          </div>

          {/* Product Tab Switchers (01, 02, 03, 04) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {showcaseItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx);
                  soundEffects.playClick();
                }}
                className={`px-4 py-2 rounded-xl font-display text-sm tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeIndex === idx
                    ? 'bg-[#ff8c00] text-[#0d0d10] font-black shadow-[0_0_20px_rgba(255,140,0,0.5)] scale-105'
                    : 'bg-[#18181d] text-white/50 hover:text-white border border-white/10'
                }`}
              >
                0{idx + 1} {item.category_name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Fullscreen Showcase Card */}
        <div className="glass-panel-heavy rounded-3xl p-6 sm:p-12 border border-[#d8b26e]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Product Visual */}
            <div className="lg:col-span-7">
              <div
                className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl group cursor-pointer"
                onClick={() => {
                  setSelectedFoodModal(current);
                  soundEffects.playClick();
                }}
                data-cursor="VIEW"
              >
                <img
                  key={current.id}
                  src={current.image_url}
                  alt={current.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 animate-fade-in"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Number */}
                <div className="absolute top-4 left-4">
                  <span className="font-display text-4xl sm:text-5xl text-white/30 font-black">
                    0{activeIndex + 1}
                  </span>
                </div>

                {/* Status Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STOCK READY ({current.stock} Porsi Tersisa)</span>
                  </div>
                  {current.calories && (
                    <span className="text-[#ebd19a] font-bold">
                      🔥 {current.calories} KCAL
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Technical Specs & Instant Order */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div>
                <span className="font-display tracking-[0.2em] text-xs text-[#ff8c00] uppercase block mb-1">
                  {current.highlight || current.category_name}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight">
                  {current.name}
                </h3>
              </div>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{current.rating}</span>
                </div>
                <span className="text-white/30">•</span>
                <span className="text-[#d5d0c8]">{current.sold_count}+ Pesanan Sukses</span>
              </div>

              <p className="text-sm text-[#d5d0c8] leading-relaxed">
                {current.description}
              </p>

              {/* Portion Specs */}
              {current.portion && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#ebd19a]">
                  <strong>STANDAR PORSI:</strong> {current.portion}
                </div>
              )}

              {/* Price & Primary Action CTAs */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl text-amber-gradient font-bold">
                    Rp {(current.promo_price || current.price).toLocaleString('id-ID')}
                  </span>
                  {current.promo_price && (
                    <span className="text-sm text-white/40 line-through font-mono">
                      Rp {current.price.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    data-cursor="ORDER"
                    className="btn-outline-champagne py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    data-cursor="ORDER"
                    className="btn-amber py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>BUY NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
