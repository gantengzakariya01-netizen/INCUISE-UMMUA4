import React from 'react';
import { ShieldCheck, Truck, Sparkles, ChefHat } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <ChefHat className="w-8 h-8 text-[#d4af37]" />,
      title: 'Chef Bintang Lima',
      desc: 'Setiap menu diracik oleh Master Chef berpengalaman internasional dengan filosofi rasa otentik mewah.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-300" />,
      title: '100% Bahan Baku Organik',
      desc: 'Hanya menggunakan Wagyu A5 Miyazaki asli, hasil laut segar harian, dan rempah-rempah pilihan kelas satu.'
    },
    {
      icon: <Truck className="w-8 h-8 text-purple-300" />,
      title: 'Armada Pengiriman VIP',
      desc: 'Kotak penganan berteknologi pengatur suhu agar rasa dan kehangatan hidangan tetap sempurna di meja Anda.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: 'Standar Sterilisasi Tinggi',
      desc: 'Dapur bersertifikasi standar higienitas tertinggi dengan protokol pengolahan steril dan aman.'
    }
  ];

  return (
    <section id="why-us" className="py-20 relative bg-[#0e051d]/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest block">
            Keunggulan ICUISENE UMMU A4
          </span>
          <h2 className="font-luxury text-3xl sm:text-4xl font-extrabold text-white">
            Mengapa Memilih Santapan Mewah Kami?
          </h2>
          <p className="text-sm text-[#bda8d6]">
            Kami menggabungkan seni kuliner haute cuisine dengan kenyamanan platform pemesanan modern kelas atas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1e0a38] border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-[#5c2494]/30 transition-all">
                {item.icon}
              </div>
              <h3 className="font-luxury text-lg font-bold text-white mb-2 group-hover:text-gold-gradient transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#bda8d6] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
