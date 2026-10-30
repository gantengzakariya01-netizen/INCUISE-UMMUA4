import React, { useState } from 'react';
import { INITIAL_CATEGORIES, FALLBACK_FOOD_IMAGE } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { soundEffects } from '../../utils/soundEffects';
import { Star, Plus, Eye, Flame, Crown, Utensils, Soup, Wine, Trophy, Sparkles, Ban } from 'lucide-react';

export const MenuCatalog: React.FC = () => {
  const { products, addToCart } = useCart();
  const {
    setSelectedFoodModal,
    showToast,
    searchQuery,
    setSearchQuery,
    selectedCategorySlug,
    setSelectedCategorySlug
  } = useUI();

  const [sortBy, setSortBy] = useState<'POPULAR' | 'RATING' | 'PRICE_ASC' | 'PRICE_DESC'>('POPULAR');

  // Icon Resolver
  const renderCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Soup': return <Soup className="w-4 h-4" />;
      case 'Wine': return <Wine className="w-4 h-4" />;
      case 'Trophy': return <Trophy className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filter & Sort over persistent products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategorySlug === 'all' ||
      product.category_id === INITIAL_CATEGORIES.find((c) => c.slug === selectedCategorySlug)?.id;

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'PRICE_ASC') return (a.promo_price || a.price) - (b.promo_price || b.price);
    if (sortBy === 'PRICE_DESC') return (b.promo_price || b.price) - (a.promo_price || a.price);
    if (sortBy === 'RATING') return b.rating - a.rating;
    return b.sold_count - a.sold_count;
  });

  return (
    <section id="menu-catalog" className="py-24 relative bg-[#0d0d10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8c00] uppercase tracking-wider">
            COMPLETE MENU SELECTION
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight">
            THE MUSCLE <span className="text-amber-gradient">CATALOG</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d5d0c8]">
            Setiap hidangan dipersiapkan dari daging ayam fresh pilihan dengan marinasi rempah 24 jam dan penggorengan high-heat berstandar internasional.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 justify-start lg:justify-center">
          <button
            onClick={() => {
              setSelectedCategorySlug('all');
              soundEffects.playClick();
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-display tracking-wider uppercase transition-all shrink-0 flex items-center gap-2 border ${
              selectedCategorySlug === 'all'
                ? 'bg-[#ff8c00] text-black border-[#ff8c00] font-black shadow-[0_0_15px_rgba(255,140,0,0.4)]'
                : 'bg-[#141418] text-[#d5d0c8] border-white/10 hover:border-white/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALL DISHES</span>
          </button>

          {INITIAL_CATEGORIES.map((cat) => {
            const isActive = selectedCategorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategorySlug(cat.slug);
                  soundEffects.playClick();
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-display tracking-wider uppercase transition-all shrink-0 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#ff8c00] text-black border-[#ff8c00] font-black shadow-[0_0_15px_rgba(255,140,0,0.4)]'
                    : 'bg-[#141418] text-[#d5d0c8] border-white/10 hover:border-white/30'
                }`}
              >
                {renderCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu (misal: Beast Crispy, Burger, Smoked...)"
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#141418] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00] font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-white/50 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8e8a93] uppercase">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00] font-mono cursor-pointer"
            >
              <option value="POPULAR">Most Popular</option>
              <option value="RATING">Highest Rating</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#141418] rounded-3xl border border-white/5 p-8 max-w-md mx-auto">
            <Ban className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <h3 className="font-display text-2xl text-white mb-2">MENU TIDAK DITEMUKAN</h3>
            <p className="text-xs text-white/50 mb-6">
              Tidak ada hidangan yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau pilih kategori lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategorySlug('all');
                soundEffects.playClick();
              }}
              className="btn-outline-amber px-5 py-2.5 rounded-xl text-xs font-black uppercase font-mono tracking-wider"
            >
              RESET FILTER
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAvailable = product.is_available && product.stock > 0;

              return (
                <div
                  key={product.id}
                  className={`group relative rounded-2xl bg-[#141418] border border-white/10 hover:border-[#ff8c00]/50 p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
                    !isAvailable ? 'opacity-80' : ''
                  }`}
                >
                  <div>
                    {/* Image Box */}
                    <div
                      className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-black/60 cursor-pointer"
                      onClick={() => {
                        setSelectedFoodModal(product);
                        soundEffects.playClick();
                      }}
                      data-cursor="VIEW"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = FALLBACK_FOOD_IMAGE;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                        {!isAvailable ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-700 text-white shadow-md font-display">
                            SOLD OUT
                          </span>
                        ) : (
                          <>
                            {product.is_best_seller && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ff8c00] text-[#0d0d10] shadow-md font-display">
                                BEST SELLER
                              </span>
                            )}
                            {product.promo_price && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-md font-display">
                                PROMO
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Rating & Stock Pill */}
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/80 text-white text-[11px] font-bold border border-white/20 backdrop-blur-md flex items-center gap-1 font-mono">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    {/* Title & Category */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#ff8c00] uppercase tracking-wider block">
                        {product.category_name}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        {isAvailable ? `Sisa: ${product.stock}` : 'Habis'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl text-white group-hover:text-[#ff8c00] transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#d5d0c8] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing & Add to Cart Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      {product.promo_price ? (
                        <div>
                          <span className="text-[10px] text-white/40 line-through block font-mono">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                          <span className="font-display text-lg text-amber-gradient font-bold">
                            Rp {product.promo_price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      ) : (
                        <span className="font-display text-lg text-amber-gradient font-bold">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedFoodModal(product);
                          soundEffects.playClick();
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        disabled={!isAvailable}
                        onClick={() => {
                          soundEffects.playClick();
                          const res = addToCart(product);
                          if (res.success) {
                            showToast(res.message, 'success');
                          } else {
                            showToast(res.message, 'error');
                          }
                        }}
                        data-cursor={isAvailable ? "ORDER" : undefined}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md ${
                          isAvailable
                            ? 'btn-amber'
                            : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isAvailable ? 'ORDER' : 'HABIS'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
