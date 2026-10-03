import React, { useState } from 'react';
import { Flame, Sparkles, Droplets, Zap } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface JourneyStage {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  description: string;
  stats: string;
  imageUrl: string;
  icon: React.ReactNode;
}

export const ScrollJourney: React.FC = () => {
  const stages: JourneyStage[] = [
    {
      id: 'crispy',
      tag: 'STAGE 01 — THE TEXTURE',
      headline: 'CRISPY',
      subheadline: 'Multi-layer shatter crunch',
      description: 'Dibalur tepung berbumbu ganda dengan teknik penggorengan suhu terkontrol, menghasilkan gelombang renyah yang meledak di gigitan pertama tanpa rasa berminyak.',
      stats: '100% Crunchy Shatter',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
      icon: <Sparkles className="w-5 h-5 text-[#ff8c00]" />
    },
    {
      id: 'juicy',
      tag: 'STAGE 02 — THE MOISTURE',
      headline: 'JUICY',
      subheadline: 'Locked-in moisture at core',
      description: 'Proses perendaman brine rahasia 24 jam mengunci sari alami ayam di setiap serat otot. Begitu kulit digigit, kaldu gurih langsung merekah di lidah Anda.',
      stats: '24-Hour Brine Saturation',
      imageUrl: 'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1000&q=80',
      icon: <Droplets className="w-5 h-5 text-amber-300" />
    },
    {
      id: 'grilled',
      tag: 'STAGE 03 — THE SMOKE',
      headline: 'GRILLED',
      subheadline: 'Applewood charcoal sear',
      description: 'Sentuhan api panggangan kayu apel menghasilkan aroma asap berkelas dengan saus glaze BBQ manis pedas yang terkaramelisasi merata di atas kulit ayam.',
      stats: 'Applewood Flame Sear',
      imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
      icon: <Flame className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'spicy',
      tag: 'STAGE 04 — THE FIRE',
      headline: 'SPICY',
      subheadline: 'Nashville ghost pepper heat',
      description: 'Infusi cabai merah rawit dan ghost pepper racikan khas Muscle Chicken. Sensasi pedas yang membangun adrenalin, bukan sekadar membakar lidah.',
      stats: 'Ghost Pepper Signature Glaze',
      imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80',
      icon: <Zap className="w-5 h-5 text-rose-500" />
    }
  ];

  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];

  return (
    <section className="py-24 relative bg-[#0d0d10] border-y border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff8c00]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-display tracking-[0.25em] text-xs text-[#ff8c00] uppercase block">
            THE ANATOMY OF CRAVING
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            EXPERIENCE THE SENSATION
          </h2>
          <p className="text-xs sm:text-sm text-[#d5d0c8]">
            Klik atau jelajahi setiap fase rasa yang mendefinisikan Muscle Chicken Indonesia.
          </p>
        </div>

        {/* Stage Selector Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {stages.map((st, index) => (
            <button
              key={st.id}
              onClick={() => {
                setActiveStage(index);
                soundEffects.playClick();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display tracking-widest uppercase transition-all duration-300 ${
                activeStage === index
                  ? 'bg-gradient-to-r from-[#ff8c00] to-[#e65100] text-[#0d0d10] font-black shadow-[0_0_20px_rgba(255,140,0,0.5)] scale-105'
                  : 'bg-[#18181d] text-white/60 hover:text-white border border-white/10 hover:border-[#ff8c00]/50'
              }`}
            >
              {st.icon}
              <span>{st.headline}</span>
            </button>
          ))}
        </div>

        {/* Stage Dynamic Showcase Display */}
        <div className="glass-panel-heavy rounded-3xl p-6 sm:p-10 border border-[#d8b26e]/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <span className="font-mono text-xs text-[#ff8c00] tracking-widest uppercase block font-bold">
              {current.tag}
            </span>

            <h3 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
              {current.headline}
            </h3>

            <p className="font-heading text-lg sm:text-xl text-[#ebd19a]">
              {current.subheadline}
            </p>

            <p className="text-sm text-[#d5d0c8] leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                ⭐ {current.stats}
              </div>
              <a
                href="#menu"
                onClick={() => soundEffects.playClick()}
                className="btn-amber px-6 py-2.5 rounded-full text-xs font-black tracking-wider uppercase shadow-md"
              >
                PESAN RASA INI
              </a>
            </div>
          </div>

          {/* Right Imagery */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#d8b26e]/30 shadow-2xl group">
              <img
                src={current.imageUrl}
                alt={current.headline}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10]/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                <span className="text-[#ff8c00] font-bold">MUSCLE LAB ARCHIVE</span>
                <span>GRADE A POULTRY</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
