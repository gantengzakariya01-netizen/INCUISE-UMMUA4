import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { X, Trash2, Plus, Minus, Ticket, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';

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
    if (!promoCodeInput.trim()) return;
    const res = applyPromo(promoCodeInput);
    if (res.success) {
      showToast(res.message, 'success');
      setPromoCodeInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full glass-panel-heavy border-l border-[#d4af37]/30 shadow-2xl flex flex-col justify-between z-10 animate-slide-in-right">
        
        {/* Header */}
        <div className="p-5 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#180a2a]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-luxury text-xl font-bold text-white">Keranjang Pesanan</h3>
            <Badge variant="gold">{cart.length} Jenis</Badge>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#bda8d6]">
              <div className="w-16 h-16 rounded-full bg-[#1e0a38] flex items-center justify-center mb-4 border border-[#d4af37]/30">
                <ShoppingBag className="w-8 h-8 text-[#d4af37]" />
              </div>
              <p className="font-luxury text-lg font-bold text-white mb-1">Keranjang Masih Kosong</p>
              <p className="text-xs text-white/60 mb-6">Pilih sajian royal favorit Anda dari menu untuk memulai.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold"
              >
                Eksplorasi Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="glass-card p-3.5 rounded-xl border border-[#d4af37]/20 flex gap-3 items-center"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#d4af37]/30 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                  {item.selectedVariant && (
                    <span className="text-[10px] text-[#d4af37] block">Varian: {item.selectedVariant}</span>
                  )}
                  <span className="text-xs font-bold text-gold-gradient block mt-1">
                    Rp {item.itemPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Quantity Actions */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-white/40 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 bg-[#180a2a] px-2 py-1 rounded-lg border border-[#d4af37]/30 text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-white/70 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-white px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
          <div className="p-5 border-t border-[#d4af37]/20 bg-[#120524] space-y-4">
            
            {/* Promo Code Voucher Form */}
            {activePromo ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#5c2494]/30 border border-[#9333ea]/40 text-xs">
                <div className="flex items-center gap-2 text-[#e6dbf8]">
                  <Check className="w-4 h-4 text-[#d4af37]" />
                  <span>Voucher <strong>{activePromo.code}</strong> aktif</span>
                </div>
                <button
                  onClick={removePromo}
                  className="text-xs text-rose-300 hover:underline font-semibold"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="absolute left-3 top-2.5 w-4 h-4 text-[#d4af37]" />
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Kode Voucher (ROYAL20, UMMU50K...)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button type="submit" className="btn-outline-gold px-4 py-2 rounded-xl text-xs font-bold">
                  Pasang
                </button>
              </form>
            )}

            {/* Price Summary Breakdown */}
            <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Subtotal Hidangan</span>
                <span className="text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-300">
                  <span>Diskon Promo</span>
                  <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimasi Biaya Antar</span>
                <span className="text-white">Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between">
                <span>Pajak Restoran (10%)</span>
                <span className="text-white">Rp {taxAmount.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between">
                <span>Biaya Layanan (5%)</span>
                <span className="text-white">Rp {serviceFeeAmount.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                <span>Total Pembayaran</span>
                <span className="font-luxury text-lg text-gold-gradient">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full btn-gold py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Lanjut Ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
