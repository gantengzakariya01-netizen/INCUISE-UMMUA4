import React, { useState } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { soundEffects } from '../../utils/soundEffects';
import { Star, Plus, Eye, Flame, Crown, Utensils, Soup, Wine, Trophy, Sparkles } from 'lucide-react';

export const MenuCatalog: React.FC = () => {
  const { addToCart } = useCart();
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

  // Filter & Sort
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
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
    <section id="menu" className="py-24 relative bg-[#0d0d10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8c00] uppercase tracking-wider">
            COMPLETE MENU SELECTION
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            THE MUSCLE CHICKEN CATALOG
          </h2>
          <p className="text-sm text-[#d5d0c8]">
            Setiap porsi dibuat fresh saat pesanan masuk untuk menjaga kerenyahan maksimal.
          </p>
        </div>

        {/* Category Pills & Sorting Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          
          {/* Horizontal Category Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategorySlug('all');
                soundEffects.playClick();
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-display tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedCategorySlug === 'all'
                  ? 'bg-[#ff8c00] text-[#0d0d10] font-black shadow-[0_0_15px_rgba(255,140,0,0.4)]'
                  : 'bg-[#18181d] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              ALL ITEMS ({INITIAL_PRODUCTS.length})
            </button>

            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategorySlug(cat.slug);
                  soundEffects.playClick();
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-display tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-[#ff8c00] text-[#0d0d10] font-black shadow-[0_0_15px_rgba(255,140,0,0.4)]'
                    : 'bg-[#18181d] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {renderCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-white/40">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                soundEffects.playClick();
              }}
              className="px-3 py-2 text-xs rounded-xl bg-[#18181d] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00] font-mono"
            >
              <option value="POPULAR">Most Popular</option>
              <option value="RATING">Highest Rated</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Search Query Feedback */}
        {searchQuery && (
          <div className="mb-8 flex items-center justify-between p-4 rounded-xl glass-panel text-xs text-white">
            <span>
              Showing results for: <strong className="text-[#ff8c00]">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#ff8c00] underline hover:text-white font-mono"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl p-8 max-w-lg mx-auto">
            <p className="text-[#d5d0c8] text-sm mb-4">No culinary creations found matching your filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategorySlug('all');
              }}
              className="btn-amber px-6 py-2.5 rounded-full text-xs font-black tracking-wider uppercase"
            >
              Show All Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-2xl p-4 flex flex-col justify-between group border border-white/10 hover:border-[#ff8c00]/60 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  {/* Image container */}
                  <div
                    className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-black/50 cursor-pointer"
                    onClick={() => {
                      setSelectedFoodModal(product);
                      soundEffects.playClick();
                    }}
                    data-cursor="VIEW"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
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
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/80 text-white text-[11px] font-bold border border-white/20 backdrop-blur-md flex items-center gap-1 font-mono">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <span className="text-[10px] font-mono font-bold text-[#ff8c00] uppercase tracking-wider block mb-1">
                    {product.category_name}
                  </span>
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
                      onClick={() => {
                        addToCart(product);
                        soundEffects.playClick();
                        showToast(`${product.name} added to cart!`);
                      }}
                      data-cursor="ORDER"
                      className="btn-amber px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ORDER</span>
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
