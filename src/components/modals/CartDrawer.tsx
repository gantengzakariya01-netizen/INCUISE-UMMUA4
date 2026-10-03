import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { X, Trash2, Plus, Minus, Ticket, ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { soundEffects } from '../../utils/soundEffects';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    taxAmount,
    serviceFeeAmount,
    grandTotal,
    activePromo,
    applyPromo,
    removePromo
  } = useCart();
  const { isCartOpen, setIsCartOpen, setIsCheckoutOpen, showToast } = useUI();

  const [promoCodeInput, setPromoCodeInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    if (!promoCodeInput.trim()) return;
    const res = applyPromo(promoCodeInput);
    if (res.success) {
      soundEffects.playSuccess();
      showToast(res.message, 'success');
      setPromoCodeInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleProceedToCheckout = () => {
    soundEffects.playClick();
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => {
          soundEffects.playClick();
          setIsCartOpen(false);
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#121216] border-l border-white/10 shadow-2xl flex flex-col justify-between z-10 animate-slide-in-right">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#16161c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff8c00]/15 flex items-center justify-center border border-[#ff8c00]/30">
              <ShoppingBag className="w-4 h-4 text-[#ff8c00]" />
            </div>
            <div>
              <h3 className="font-display tracking-wider text-lg text-white">YOUR BEAST CART</h3>
              <p className="text-[10px] text-white/50 tracking-widest font-mono">MUSCLE CHICKEN INDONESIA</p>
            </div>
            <Badge variant="gold">{cart.length} ITEMS</Badge>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsCartOpen(false);
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-white/50">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <ShoppingBag className="w-8 h-8 text-[#ff8c00]/70" />
              </div>
              <p className="font-display tracking-wider text-xl text-white mb-1">CART IS EMPTY</p>
              <p className="text-xs text-white/50 mb-6 max-w-xs">
                Your high-protein feast awaits. Choose from our beastly crispy & smoked creations to begin.
              </p>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsCartOpen(false);
                  const el = document.getElementById('menu-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-amber px-6 py-2.5 rounded-xl text-xs font-bold"
              >
                EXPLORE MENU
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#181820] p-3.5 rounded-xl border border-white/10 hover:border-[#ff8c00]/30 transition-all flex gap-3 items-center group"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0 group-hover:scale-105 transition-transform"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate font-body">{item.product.name}</h4>
                  {item.selectedVariant && (
                    <span className="text-[10px] text-[#d8b26e] block">Cut: {item.selectedVariant}</span>
                  )}
                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                    <span className="text-[9px] text-white/40 block truncate">
                      Add-ons: {item.selectedAddons.join(', ')}
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#ff8c00] block mt-1">
                    Rp {item.itemPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Quantity Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      removeFromCart(item.id);
                    }}
                    className="text-white/40 hover:text-rose-400 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 bg-[#121216] px-2 py-1 rounded-lg border border-white/15 text-xs">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        updateQuantity(item.id, item.quantity - 1);
                      }}
                      className="text-white/70 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-white px-1 text-xs">{item.quantity}</span>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        updateQuantity(item.id, item.quantity + 1);
                      }}
                      className="text-white/70 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#16161c] space-y-4">
            
            {/* Promo Code Voucher Form */}
            {activePromo ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/30 text-xs">
                <div className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#ff8c00]" />
                  <span>Promo <strong>{activePromo.code}</strong> Applied</span>
                </div>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    removePromo();
                  }}
                  className="text-xs text-rose-400 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-2.5 w-4 h-4 text-[#ff8c00]" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Promo Code (BEAST30, MUSCLE50K)"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00] uppercase font-mono"
                    />
                  </div>
                  <button type="submit" className="btn-outline-amber px-4 py-2 rounded-xl text-xs font-bold">
                    APPLY
                  </button>
                </form>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/50">
                  <Sparkles className="w-3 h-3 text-[#d8b26e]" />
                  <span>Try: <strong className="text-[#d8b26e] cursor-pointer" onClick={() => setPromoCodeInput('BEAST30')}>BEAST30</strong> (30% OFF) or <strong className="text-[#d8b26e] cursor-pointer" onClick={() => setPromoCodeInput('MUSCLE50K')}>MUSCLE50K</strong></span>
                </div>
              </div>
            )}

            {/* Price Summary Breakdown */}
            <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Subtotal Items</span>
                <span className="text-white font-mono">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Voucher Discount</span>
                  <span className="font-mono">- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Delivery</span>
                <span className="text-white font-mono">Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between">
                <span>Restaurant Tax (PB1 10%)</span>
                <span className="text-white font-mono">Rp {taxAmount.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between">
                <span>Thermal Packaging (5%)</span>
                <span className="text-white font-mono">Rp {serviceFeeAmount.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white items-baseline">
                <span className="font-display tracking-wider text-base">TOTAL PAYMENT</span>
                <span className="font-display tracking-wider text-xl text-[#ff8c00]">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full btn-amber py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl tracking-wider"
            >
              <span>PROCEED TO ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
