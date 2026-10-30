import React from 'react';
import type { ChickenReelProduct } from '../../lib/assets';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { soundEffects } from '../../utils/soundEffects';
import { X, Star, Flame, Clock, ShoppingBag, ArrowRight } from 'lucide-react';

interface ChickenReelModalProps {
  product: ChickenReelProduct | null;
  onClose: () => void;
}

export const ChickenReelModal: React.FC<ChickenReelModalProps> = ({ product, onClose }) => {
  const { addToCart, products } = useCart();
  const { showToast, setIsCheckoutOpen } = useUI();

  if (!product) return null;

  // Sync with live persistent product if match
  const liveProduct = products.find((p) => p.slug === product.slug || p.name === product.name) || {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    category_id: 'cat-reels',
    category_name: 'Chicken Reel',
    price: product.price,
    promo_price: product.promoPrice,
    image_url: product.image,
    stock: 50,
    rating: product.rating,
    sold_count: 240,
    calories: product.calories,
    portion: product.portion,
    is_available: true
  };

  const handleOrder = () => {
    soundEffects.playClick();
    const res = addToCart(liveProduct, 1, 'Standard Cut', ['House Chili Sauce'], 'Ordered via Chicken Reel');
    if (res.success) {
      soundEffects.playSuccess();
      showToast(`${product.name} added to your order!`, 'success');
      onClose();
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleBuyNow = () => {
    soundEffects.playClick();
    const res = addToCart(liveProduct, 1, 'Standard Cut', ['House Chili Sauce'], 'Ordered via Chicken Reel');
    if (res.success) {
      soundEffects.playSuccess();
      onClose();
      setIsCheckoutOpen(true);
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1120]/90 backdrop-blur-xl animate-fade-in transition-opacity"
        onClick={onClose}
      />

      {/* Reel Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#151A2E] border border-[#FFB347]/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10 animate-scale-in flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0D1120]/80 text-[#ECE8DE] hover:text-[#FFB347] border border-white/10 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Close Chicken Reel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Side (Photography & Reel View) */}
        <div className="md:w-1/2 relative bg-black/50 aspect-square md:aspect-auto overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151A2E] via-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-[#151A2E]" />

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FF7A36] text-[#0D1120] font-display shadow-lg">
              {product.badge}
            </span>
          </div>

          {/* Reel Tag Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-[#ECE8DE]/80">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1120]/80 border border-white/10 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>{product.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1120]/80 border border-white/10 backdrop-blur-md text-[#FFB347]">
              <Star className="w-3.5 h-3.5 fill-[#FFB347]" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Story & Order Information Side */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono text-[#FFB347] font-bold tracking-widest uppercase block mb-1">
                CINEMATIC CHICKEN REEL
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#ECE8DE] leading-tight">
                {product.name}
              </h3>
              <p className="text-xs font-serif italic text-[#FFD18A] mt-1">
                "{product.tagline}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#9AA0B4] leading-relaxed">
              {product.description}
            </p>

            {/* Culinary Specs Box */}
            <div className="p-3.5 rounded-2xl bg-[#0D1120]/60 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9AA0B4]">Craft Method:</span>
                <span className="text-[#ECE8DE] font-semibold text-right max-w-[180px] truncate">
                  {product.cookingMethod}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9AA0B4]">Standard Portion:</span>
                <span className="text-[#ECE8DE] font-semibold">{product.portion}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9AA0B4]">Nutrition:</span>
                <span className="text-[#FFD18A] font-mono font-bold">
                  {product.calories} KCAL • {product.proteinGrams}G PROTEIN
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                <span className="text-[#9AA0B4] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#FF7A36]" />
                  <span>Spice Level:</span>
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-2 h-2 rounded-full ${
                        lvl <= product.spiciness ? 'bg-[#FF7A36]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Order Actions */}
          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono text-[#9AA0B4]">PRICE:</span>
              <div className="text-right">
                {product.promoPrice ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-[#9AA0B4] line-through font-mono">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <span className="font-display text-2xl font-bold text-[#FFB347]">
                      Rp {product.promoPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                ) : (
                  <span className="font-display text-2xl font-bold text-[#FFB347]">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleOrder}
                className="py-3 px-4 rounded-full border border-[#FFB347]/50 text-[#ECE8DE] hover:bg-[#FFB347]/10 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#FFB347]" />
                <span>+ ADD TO ORDER</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-full bg-gradient-to-r from-[#FFB347] to-[#FF7A36] text-[#0D1120] hover:brightness-110 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,179,71,0.4)] transition-all"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
