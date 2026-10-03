import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { Modal } from '../ui/Modal';
import { soundEffects } from '../../utils/soundEffects';
import { Star, Plus, Minus, ShoppingBag, Check, Flame, ArrowRight } from 'lucide-react';

export const FoodDetailModal: React.FC = () => {
  const { selectedFoodModal, setSelectedFoodModal, setIsCheckoutOpen, showToast } = useUI();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedCut, setSelectedCut] = useState<string>('Paha Atas & Bawah');
  const [selectedSpicy, setSelectedSpicy] = useState<string>('Original Muscle Herb');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  if (!selectedFoodModal) return null;

  const dish = selectedFoodModal;
  const baseUnitPrice = dish.promo_price ?? dish.price;

  // Calculate extra price
  const extraAddonsPrice = selectedAddons.reduce((sum, addonName) => {
    const addon = dish.addons?.find((a) => a.name === addonName);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const unitPrice = baseUnitPrice + extraAddonsPrice;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addonName: string) => {
    soundEffects.playClick();
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleAddToCart = () => {
    soundEffects.playClick();
    addToCart(dish, quantity, `${selectedCut} • ${selectedSpicy}`, selectedAddons, notes);
    showToast(`${dish.name} (${quantity}x) added to cart!`);
    setSelectedFoodModal(null);
    setQuantity(1);
    setSelectedAddons([]);
    setNotes('');
  };

  const handleBuyNow = () => {
    soundEffects.playClick();
    addToCart(dish, quantity, `${selectedCut} • ${selectedSpicy}`, selectedAddons, notes);
    setSelectedFoodModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <Modal
      isOpen={Boolean(selectedFoodModal)}
      onClose={() => setSelectedFoodModal(null)}
      title="PRODUCT CUSTOMIZATION"
      subtitle="Sesuaikan potongan, tingkat kepedasan, dan topping favorit Anda."
    >
      <div className="space-y-6">
        
        {/* Banner Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl">
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {dish.is_best_seller && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ff8c00] text-[#0d0d10] font-display">
                BEST SELLER
              </span>
            )}
            {dish.promo_price && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white font-display">
                SPECIAL PRICE
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-1 font-mono">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{dish.rating} / 5.0</span>
          </div>
        </div>

        {/* Info Header */}
        <div>
          <span className="text-[10px] font-mono font-bold text-[#ff8c00] uppercase tracking-widest block mb-1">
            {dish.category_name} • {dish.calories ? `${dish.calories} KCAL` : 'FRESH POULTRY'}
          </span>
          <h3 className="font-display text-3xl text-white mb-2 leading-tight">
            {dish.name}
          </h3>
          <p className="text-xs text-[#d5d0c8] leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Spicy Level Selector */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#ff8c00]" />
              <span>PILIHAN TINGKAT KEPEDASAN</span>
            </label>
            <span className="text-[10px] font-mono text-[#ff8c00]">Wajib Pilih 1</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              'Original Muscle Herb',
              'Mild Smokey Pepper (Lvl 1)',
              'Nashville Fire Crunch (Lvl 2)',
              'Ghost Pepper Fury (Lvl 3)'
            ].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setSelectedSpicy(level);
                  soundEffects.playClick();
                }}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                  selectedSpicy === level
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white font-bold shadow-[0_0_12px_rgba(255,140,0,0.25)]'
                    : 'border-white/10 bg-[#141418] text-white/60 hover:text-white'
                }`}
              >
                <span>{level}</span>
                {selectedSpicy === level && <Check className="w-3.5 h-3.5 text-[#ff8c00]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Cut / Bagian Ayam */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <label className="text-xs font-bold font-mono text-white block">
            PILIHAN BAGIAN POTONGAN AYAM
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              'Paha Atas & Bawah',
              'Dada Fillet & Sayap',
              'Double Paha Atas (+Rp 4.000)'
            ].map((cut) => (
              <button
                key={cut}
                type="button"
                onClick={() => {
                  setSelectedCut(cut);
                  soundEffects.playClick();
                }}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                  selectedCut === cut
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white font-bold shadow-[0_0_12px_rgba(255,140,0,0.25)]'
                    : 'border-white/10 bg-[#141418] text-white/60 hover:text-white'
                }`}
              >
                <span>{cut}</span>
                {selectedCut === cut && <Check className="w-3.5 h-3.5 text-[#ff8c00]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Extra Addons (Cheese, Rice, Egg) */}
        {dish.addons && dish.addons.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/10">
            <label className="text-xs font-bold font-mono text-white block">
              TAMBAHAN TOPPING & SAUS (OPSIONAL)
            </label>
            <div className="space-y-2">
              {dish.addons.map((add) => {
                const isSelected = selectedAddons.includes(add.name);
                return (
                  <button
                    key={add.id}
                    type="button"
                    onClick={() => toggleAddon(add.name)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white font-bold'
                        : 'border-white/10 bg-[#141418] text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{add.name}</span>
                    <span className="text-[#ebd19a]">
                      +Rp {add.price.toLocaleString('id-ID')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Kitchen Special Notes */}
        <div className="space-y-1.5 pt-3 border-t border-white/10">
          <label className="block text-xs font-mono font-bold text-white">Catatan Dapur Khusus</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Saus dipisah, jangan terlalu asin, ekstra renyah..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
          />
        </div>

        {/* Quantity Controls & Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-[#141418] p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setQuantity(Math.max(1, quantity - 1));
                soundEffects.playClick();
              }}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-white font-mono">{quantity}</span>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
                soundEffects.playClick();
              }}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right flex-1 sm:flex-none">
              <span className="text-[10px] text-white/40 uppercase block font-mono">Total</span>
              <span className="font-display text-2xl font-bold text-amber-gradient">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              data-cursor="ORDER"
              className="btn-outline-champagne px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>+ CART</span>
            </button>

            <button
              onClick={handleBuyNow}
              data-cursor="ORDER"
              className="btn-amber px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg"
            >
              <span>BUY NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
