import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { Modal } from '../ui/Modal';
import { Star, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const FoodDetailModal: React.FC = () => {
  const { selectedFoodModal, setSelectedFoodModal, showToast } = useUI();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantOption, setSelectedVariantOption] = useState<string>('Standard');
  const [notes, setNotes] = useState('');

  if (!selectedFoodModal) return null;

  const dish = selectedFoodModal;
  const unitPrice = dish.promo_price ?? dish.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedVariantOption, [], notes);
    showToast(`${dish.name} (${quantity}x) berhasil dimasukkan ke keranjang!`);
    setSelectedFoodModal(null);
    setQuantity(1);
    setNotes('');
  };

  return (
    <Modal
      isOpen={Boolean(selectedFoodModal)}
      onClose={() => setSelectedFoodModal(null)}
      title="Detail Hidangan Royal"
    >
      <div className="space-y-6">
        {/* Food Banner Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#d4af37]/30">
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {dish.is_best_seller && <Badge variant="gold">Best Seller</Badge>}
            {dish.promo_price && <Badge variant="purple">Penawaran Khusus</Badge>}
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{dish.rating} / 5.0</span>
          </div>
        </div>

        {/* Info Header */}
        <div>
          <span className="text-xs font-semibold text-[#bda8d6] uppercase tracking-wider block mb-1">
            {dish.category_name}
          </span>
          <h3 className="font-luxury text-2xl font-bold text-white mb-2">
            {dish.name}
          </h3>
          <p className="text-xs text-[#bda8d6] leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Variant Selection (If exists) */}
        {dish.variants && dish.variants.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-white/10">
            {dish.variants.map((v) => (
              <div key={v.id}>
                <label className="block text-xs font-bold text-white mb-2">{v.name}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {v.options.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSelectedVariantOption(opt.name)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                        selectedVariantOption === opt.name
                          ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                          : 'border-white/10 bg-[#180a2a] text-white/70 hover:text-white'
                      }`}
                    >
                      <span>{opt.name}</span>
                      {selectedVariantOption === opt.name && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special Instructions Note */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <label className="block text-xs font-bold text-white">Catatan Khusus Pengolahan</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Pisahkan saus, tanpa alergen kacang..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Quantity Controls & Add Button */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-[#180a2a] p-1.5 rounded-xl border border-[#d4af37]/30">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right flex-1 sm:flex-none">
              <span className="text-[10px] text-white/40 uppercase block">Total Harga</span>
              <span className="font-luxury text-xl font-bold text-gold-gradient">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none btn-gold px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>+ Masukkan Keranjang</span>
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
