import React from 'react';
import { INITIAL_CATEGORIES } from '../../data/restaurantData';
import { useUI } from '../../context/UIContext';
import { Crown, Flame, Fish, Cake, Wine, ChevronRight } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { setSelectedCategorySlug } = useUI();

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-6 h-6 text-[#d4af37]" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-400" />;
      case 'Fish': return <Fish className="w-6 h-6 text-sky-400" />;
      case 'Cake': return <Cake className="w-6 h-6 text-purple-300" />;
      case 'Wine': return <Wine className="w-6 h-6 text-[#d4af37]" />;
      default: return <Crown className="w-6 h-6 text-[#d4af37]" />;
    }
  };

  return (
    <section className="py-16 relative border-y border-white/5 bg-[#0e051d]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest block mb-1">
              Kategori Kuliner
            </span>
            <h2 className="font-luxury text-3xl font-bold text-white">
              Eksplorasi Kelezatan Berdasarkan Kategori
            </h2>
          </div>
          <a
            href="#menu"
            className="text-xs font-semibold text-[#d4af37] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Lihat Semua Katalog</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {INITIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategorySlug(cat.slug);
                const el = document.getElementById('menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-card rounded-2xl p-6 cursor-pointer group hover:border-[#d4af37]/60 transition-all flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2a0e4a]/60 border border-[#d4af37]/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#d4af37]/20 transition-all">
                {renderIcon(cat.icon)}
              </div>
              <div>
                <h3 className="font-luxury text-lg font-bold text-white group-hover:text-gold-gradient transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#bda8d6] line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
