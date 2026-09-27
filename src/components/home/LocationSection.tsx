import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 relative bg-[#090312]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest block">
                Lokasi & Restoran
              </span>
              <h2 className="font-luxury text-3xl font-extrabold text-gold-gradient">
                Kunjungi Flagship Lounge Kami
              </h2>
              <p className="text-sm text-[#bda8d6]">
                Rasakan kehangatan suasana fine dining yang nyaman dan mewah secara langsung di kawasan prestisius Menteng & Senopati.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="glass-panel p-4 rounded-2xl border border-[#d4af37]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a0e4a] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Cabang Menteng Flagship</h4>
                  <p className="text-xs text-[#bda8d6]">
                    Jl. H.O.S. Cokroaminoto No. 42, Menteng, Jakarta Pusat
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-[#d4af37]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a0e4a] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Jam Operational</h4>
                  <p className="text-xs text-[#bda8d6]">
                    Setiap Hari: 10:00 - 22:30 WIB (Last Order 21:45 WIB)
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-[#d4af37]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a0e4a] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Reservasi Meja VIP</h4>
                  <p className="text-xs text-[#bda8d6]">
                    +62 21-3190-8888 / WhatsApp: +62 812-3456-7890
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Map Visual Box */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl glass-panel-heavy p-3 border border-[#d4af37]/30 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center text-center group">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Restaurant Interior"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0416] via-[#0b0416]/60 to-transparent" />

              <div className="relative z-10 space-y-3 p-6 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#d4af37] text-[#0b0416] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                  <Navigation className="w-7 h-7" />
                </div>
                <h3 className="font-luxury text-2xl font-bold text-white">
                  ICUISENE UMMU A4 — Menteng
                </h3>
                <p className="text-xs text-[#bda8d6]">
                  Layanan pesan antar eksklusif menjangkau seluruh kawasan Jakarta & sekitarnya.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex btn-gold px-6 py-2.5 rounded-full text-xs font-bold items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
