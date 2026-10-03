import React from 'react';
import { Flame } from 'lucide-react';

export const FoodCinematic: React.FC = () => {
  const highlights = [
    {
      title: 'Golden Shag Crunch',
      tag: 'TEXTURE & CRUST',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      desc: 'Keriting tepung bertingkat dengan kerenyahan yang memecah di gigitan pertama.'
    },
    {
      title: 'Smoked Flame Glaze',
      tag: 'CHARCOAL ARCADIA',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      desc: 'Kilau saus barbekyu asap kayu apel yang terpanggang mengering sempurna.'
    },
    {
      title: 'Melting Cheddar Lava',
      tag: 'ARTISANAL DIP',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      desc: 'Keju cheddar leleh hangat gurih melimpah di atas patty ayam garing bertumpuk.'
    },
    {
      title: 'Truffle & Herb Fries',
      tag: 'SIGNATURE SIDES',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
      desc: 'Kentang potong tebal dengan serutan keju Grana Padano dan aroma truffle murni.'
    }
  ];

  return (
    <section className="py-24 relative bg-[#09090b] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ff8c00]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8c00] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#ff8c00]" />
            SENSORY EXPERIENCE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            FOOD CINEMATIC
          </h2>
          <p className="text-sm text-[#d5d0c8]">
            Detail visual yang dirancang untuk memanjakan pandangan dan membangkitkan selera.
          </p>
        </div>

        {/* 4 Cinematic Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((tile, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] border border-white/10 hover:border-[#ff8c00]/60 transition-all duration-500 shadow-xl"
            >
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                <span className="font-mono text-[10px] text-[#ff8c00] font-bold tracking-widest uppercase block">
                  {tile.tag}
                </span>
                <h4 className="font-display text-2xl text-white group-hover:text-[#ebd19a] transition-colors">
                  {tile.title}
                </h4>
                <p className="text-xs text-[#d5d0c8] line-clamp-2 leading-relaxed">
                  {tile.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
