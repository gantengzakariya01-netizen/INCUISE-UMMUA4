import React, { useState } from 'react';
import { Sparkles, Utensils, Flame, Box, Truck, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const KitchenExperience: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Marinate',
      subtitle: '24-Hour Brine Deep Infusion',
      desc: 'Setiap potongan ayam direndam dalam ramuan kaldu rempah konsentrat selama 24 jam penuh agar kelezatan meresap hingga sumsum tulang.',
      icon: <Sparkles className="w-5 h-5 text-[#ff8c00]" />
    },
    {
      step: '02',
      title: 'Prepare',
      subtitle: 'Double Dredge Batter Crust',
      desc: 'Pelapisan tepung ganda dengan teknik ayakan khusus untuk menciptakan tekstur keriting tajam dan renyah bertingkat.',
      icon: <Utensils className="w-5 h-5 text-amber-300" />
    },
    {
      step: '03',
      title: 'Cook',
      subtitle: 'Precision Temperature Fry',
      desc: 'Penggorengan dengan minyak berstandar tinggi pada suhu 175°C presisi hingga menghasilkan warna keemasan sempurna dan tekstur garing kering.',
      icon: <Flame className="w-5 h-5 text-amber-500" />
    },
    {
      step: '04',
      title: 'Grill',
      subtitle: 'Charcoal Flame Sear & Glaze',
      desc: 'Untuk varian panggangan, ayam dipanggang di atas arang kayu keras dan disapukan saus glaze karamel yang harum mengepul.',
      icon: <Flame className="w-5 h-5 text-orange-600" />
    },
    {
      step: '05',
      title: 'Pack',
      subtitle: 'Thermal Vented Box Packaging',
      desc: 'Dikemas dalam boks berventilasi khusus yang menjaga uap air keluar sehingga kerenyahan kulit tidak melempem saat pengantaran.',
      icon: <Box className="w-5 h-5 text-emerald-400" />
    },
    {
      step: '06',
      title: 'Deliver',
      subtitle: 'High-Heat Priority Express',
      desc: 'Armada pengantaran ekspres berwadah insulasi panas membawa pesanan Anda langsung ke meja santap dalam kondisi mengepul hangat.',
      icon: <Truck className="w-5 h-5 text-sky-400" />
    }
  ];

  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 relative bg-[#0d0d10] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-display tracking-[0.25em] text-xs text-[#ff8c00] uppercase block">
            CULINARY PIPELINE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            KITCHEN EXPERIENCE
          </h2>
          <p className="text-sm text-[#d5d0c8]">
            Urutan dedikasi dari dapur profesional hingga tiba hangat di tangan Anda.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {steps.map((item, idx) => (
            <button
              key={item.step}
              onClick={() => {
                setActiveStep(idx);
                soundEffects.playClick();
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                activeStep === idx
                  ? 'bg-gradient-to-b from-[#1c1c23] to-[#141418] border-[#ff8c00] shadow-[0_0_20px_rgba(255,140,0,0.3)] scale-105'
                  : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-2xl font-black text-white/30">
                  {item.step}
                </span>
                {item.icon}
              </div>
              <h4 className="font-display text-base text-white tracking-wider uppercase">
                {item.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Active Stage Highlight Box */}
        <div className="glass-panel-heavy rounded-3xl p-6 sm:p-10 border border-[#d8b26e]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff8c00]">
              <CheckCircle2 className="w-4 h-4" />
              <span>STEP {steps[activeStep].step} OF 06</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-white">
              {steps[activeStep].title} — <span className="text-[#ebd19a]">{steps[activeStep].subtitle}</span>
            </h3>
            <p className="text-sm text-[#d5d0c8] leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
                soundEffects.playClick();
              }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white/70"
            >
              ← PREV
            </button>
            <button
              onClick={() => {
                setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
                soundEffects.playClick();
              }}
              className="btn-amber px-6 py-2 rounded-xl text-xs font-black uppercase font-mono tracking-wider shadow-md"
            >
              NEXT STEP →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
