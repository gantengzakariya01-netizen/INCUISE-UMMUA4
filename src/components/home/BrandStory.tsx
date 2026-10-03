import React from 'react';
import { ShieldCheck, Flame, Award, Heart } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#ff8c00]" />,
      title: 'Premium Ingredients',
      desc: 'Hanya menggunakan ayam pedaging grade A segar harian tanpa suntikan hormon buatan dan bahan pengawet.'
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-300" />,
      title: 'Carefully Prepared',
      desc: 'Proses marinasi basah dan kering selama 24 jam dengan kombinasi 16 rempah alami nusantara dan internasional.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Made Fresh Every Order',
      desc: 'Tidak pernah memanaskan kembali ayam lama. Setiap potongan digoreng atau dipanggang saat tiket pesanan Anda tercetak.'
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      title: 'Built for Better Taste',
      desc: 'Keseimbangan rasa asin, gurih, manis karamel, dan sengatan pedas yang dirancang untuk memicu kepuasan kuliner absolut.'
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#09090b] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8c00] uppercase tracking-wider">
              ORIGIN & PHILOSOPHY
            </div>

            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none">
              THE MUSCLE<br />
              <span className="text-amber-gradient">BEHIND THE CHICKEN.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#d5d0c8] leading-relaxed">
              Muscle Chicken Indonesia lahir dari satu obsesi sederhana: mendefinisikan ulang standar ayam goreng dan panggangan di Asia Tenggara. Kami menolak daging ayam hambar, kulit lembek berminyak, dan bumbu instan murahan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((item, i) => (
                <div key={i} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-display text-lg text-white font-bold">{item.title}</h4>
                  <p className="text-xs text-[#8e8a93] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#d8b26e]/30 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                alt="Chefs Preparing Chicken"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                <span className="font-display text-xl text-white block">
                  CRAFTED WITH PRECISION
                </span>
                <span className="text-xs text-[#d5d0c8]">
                  From farm-raised poultry to high-heat culinary mastery.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
