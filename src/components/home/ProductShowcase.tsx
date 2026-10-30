import React, { useState } from 'react';
import { FALLBACK_FOOD_IMAGE } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { soundEffects } from '../../utils/soundEffects';
import { Star, ShoppingBag, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const { products, addToCart } = useCart();
  const showcaseItems = products.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  const { setSelectedFoodModal, setIsCheckoutOpen, showToast } = useUI();

  const current = showcaseItems[activeIndex] || showcaseItems[0];
  const isAvailable = current ? current.is_available && current.stock > 0 : false;

  const handleAddToCart = () => {
    if (!current) return;
    const res = addToCart(current);
    soundEffects.playClick();
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleBuyNow = () => {
    if (!current) return;
    const res = addToCart(current);
    soundEffects.playClick();
    if (res.success) {
      setIsCheckoutOpen(true);
    } else {
      showToast(res.message, 'error');
    }
  };

  if (!current) return null;

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
                    ? 'bg-[#ff8c00] text-black font-black shadow-[0_0_15px_rgba(255,140,0,0.4)]'
                    : 'bg-[#141418] text-[#d5d0c8] border border-white/10 hover:border-white/30'
                }`}
              >
                0{idx + 1} — {item.category_name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Showcase Banner / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141418] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Left Column: Big Visual */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 group cursor-pointer border border-white/5"
              onClick={() => {
                setSelectedFoodModal(current);
                soundEffects.playClick();
              }}
              data-cursor="VIEW"
            >
              <img
                src={current.image_url}
                alt={current.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_FOOD_IMAGE;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Tag */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase font-display tracking-wider shadow-lg ${
                  isAvailable ? 'bg-[#ff8c00] text-black' : 'bg-rose-700 text-white'
                }`}>
                  {isAvailable ? (current.highlight || 'CHEF SELECTION') : 'SOLD OUT'}
                </span>
              </div>

              {/* Nutrition spec badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                {current.calories && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/70 text-[#ebd19a] border border-white/15 backdrop-blur-md">
                    🔥 {current.calories} KCAL
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/70 text-emerald-400 border border-white/15 backdrop-blur-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  HIGH PROTEIN
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/70 text-white/80 border border-white/15 backdrop-blur-md">
                  STOK: {current.stock}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet & Order CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#ff8c00] uppercase tracking-[0.2em] block mb-1">
                INDEX 0{activeIndex + 1} • {current.category_name}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-tight leading-tight">
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
                  disabled={!isAvailable}
                  onClick={handleAddToCart}
                  data-cursor={isAvailable ? "ORDER" : undefined}
                  className={`py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 ${
                    isAvailable
                      ? 'btn-outline-champagne'
                      : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAvailable ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
                </button>

                <button
                  disabled={!isAvailable}
                  onClick={handleBuyNow}
                  data-cursor={isAvailable ? "ORDER" : undefined}
                  className={`py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg ${
                    isAvailable
                      ? 'btn-amber'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <span>{isAvailable ? 'BUY NOW' : 'HABIS'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
