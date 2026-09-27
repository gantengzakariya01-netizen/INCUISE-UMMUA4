import React from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Star, Plus, Eye, Flame, Crown, Fish, Cake, Wine } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const FeaturedMenu: React.FC = () => {
  const { addToCart } = useCart();
  const {
    setSelectedFoodModal,
    showToast,
    searchQuery,
    setSearchQuery,
    selectedCategorySlug,
    setSelectedCategorySlug
  } = useUI();

  // Category Icon Resolver
  const renderCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Fish': return <Fish className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Wine': return <Wine className="w-4 h-4" />;
      default: return null;
    }
  };

  // Filter products by category & search query
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategorySlug === 'all' ||
      product.category_id === INITIAL_CATEGORIES.find((c) => c.slug === selectedCategorySlug)?.id;
    
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#f3e5ab] uppercase tracking-wider">
            Sajian Kuliner Terbaik
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl font-extrabold text-gold-gradient">
            Koleksi Menu Royal ICUISENE UMMU A4
          </h2>
          <p className="text-sm text-[#bda8d6]">
            Setiap racikan diolah secara segar dengan presisi tinggi oleh Chef Master bersertifikat internasional.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 custom-scrollbar">
          <button
            onClick={() => setSelectedCategorySlug('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategorySlug === 'all'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b0416] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-[#180a2a] text-white/70 hover:text-white border border-[#d4af37]/20 hover:border-[#d4af37]/50'
            }`}
          >
            Semua Menu ({INITIAL_PRODUCTS.length})
          </button>

          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategorySlug(cat.slug)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategorySlug === cat.slug
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b0416] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#180a2a] text-white/70 hover:text-white border border-[#d4af37]/20 hover:border-[#d4af37]/50'
              }`}
            >
              {renderCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Filter / Search Indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl glass-panel text-xs text-white/80">
            <span>
              Menampilkan hasil pencarian untuk: <strong className="text-[#d4af37]">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#d4af37] underline hover:text-white"
            >
              Hapus Filter
            </button>
          </div>
        )}

        {/* Dish Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl p-8">
            <p className="text-[#bda8d6] text-base mb-4">Tidak ada hidangan yang cocok dengan kriteria pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategorySlug('all');
              }}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              Tampilkan Semua Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-2xl p-4 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                      {product.is_best_seller && (
                        <Badge variant="gold">Terlaris</Badge>
                      )}
                      {product.promo_price && (
                        <Badge variant="purple">Hemat Special</Badge>
                      )}
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 text-white text-[11px] font-bold border border-white/20 backdrop-blur-md flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <span className="text-[11px] font-semibold text-[#bda8d6] uppercase tracking-wider block mb-1">
                    {product.category_name}
                  </span>
                  <h3 className="font-luxury text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Footer Pricing & Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    {product.promo_price ? (
                      <div>
                        <span className="text-[11px] text-white/40 line-through block">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <span className="font-luxury text-base font-bold text-gold-gradient">
                          Rp {product.promo_price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ) : (
                      <span className="font-luxury text-base font-bold text-gold-gradient">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFoodModal(product)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 text-white/70 hover:text-white transition-all"
                      title="Lihat Detail & Kustomisasi"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`${product.name} ditambahkan ke keranjang!`);
                      }}
                      className="btn-gold px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
