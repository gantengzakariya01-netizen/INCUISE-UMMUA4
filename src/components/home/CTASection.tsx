import React from 'react';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-[#180a2a] via-[#321456] to-[#180a2a] border border-[#d4af37]/40 p-8 sm:p-14 shadow-2xl text-center overflow-hidden">
          
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9333ea]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              Pengalaman Santap Istimewa
            </div>

            <h2 className="font-luxury text-3xl sm:text-5xl font-extrabold text-gold-gradient leading-tight">
              Siap Memanjakan Selera Anda Hari Ini?
            </h2>

            <p className="text-sm sm:text-base text-[#bda8d6] leading-relaxed">
              Nikmati kenyamanan pengantaran langsung sajian khas ICUISENE UMMU A4 ke kediaman Anda dengan armada berwadah penghangat khusus.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#menu"
                className="w-full sm:w-auto btn-gold px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <span>Pesan Sekarang Online</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto btn-outline-gold px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Reservasi WhatsApp VIP</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
