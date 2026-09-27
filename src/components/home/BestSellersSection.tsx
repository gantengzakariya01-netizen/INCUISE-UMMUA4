import React from 'react';
import { INITIAL_PRODUCTS } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Star, Trophy, Eye } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const BestSellersSection: React.FC = () => {
  const { addToCart } = useCart();
  const { setSelectedFoodModal, showToast } = useUI();

  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.is_best_seller).slice(0, 4);

  return (
    <section className="py-20 relative bg-gradient-to-b from-[#0b0416] via-[#15072c] to-[#0b0416]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
              Pilihan Favorit Pelanggan Setia
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl font-extrabold text-white">
              Menu Terlaris & Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bestSellers.map((item, idx) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-5 border border-[#d4af37]/30 flex flex-col sm:flex-row gap-5 items-center group hover:border-[#d4af37] transition-all"
            >
              {/* Image */}
              <div className="relative w-full sm:w-44 aspect-square rounded-2xl overflow-hidden shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="gold">#{idx + 1} Best Seller</Badge>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-[#bda8d6]">{item.sold_count}+ Pesanan Diterima</span>
                </div>

                <h3 className="font-luxury text-lg font-bold text-white group-hover:text-gold-gradient transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-luxury text-lg font-bold text-gold-gradient">
                      Rp {(item.promo_price || item.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFoodModal(item)}
                      className="btn-outline-gold px-3 py-1.5 rounded-xl text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(item);
                        showToast(`${item.name} ditambahkan ke keranjang!`);
                      }}
                      className="btn-gold px-4 py-1.5 rounded-xl text-xs font-bold"
                    >
                      + Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
