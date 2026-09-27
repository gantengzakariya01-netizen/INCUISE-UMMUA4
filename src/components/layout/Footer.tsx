import React from 'react';
import { MapPin, Phone, Mail, Clock, Share2, Globe, Award, ShieldCheck } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const Footer: React.FC = () => {
  const { openAuthModal } = useUI();
  return (
    <footer className="w-full bg-[#07020e] border-t border-[#d4af37]/20 pt-16 pb-24 md:pb-12 text-[#bda8d6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2a0e4a] via-[#5c2494] to-[#d4af37] p-[1px]">
                <div className="w-full h-full bg-[#0b0416] rounded-[11px] flex items-center justify-center text-lg">
                  👑
                </div>
              </div>
              <span className="font-luxury text-2xl font-bold text-gold-gradient">
                ICUISENE UMMU A4
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Platform kuliner kelas atas dengan cita rasa istimewa. Dibuat dengan bahan organik pilihan dan sentuhan magis racikan Chef Bintang Lima.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#d4af37]">
              <Award className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-wide uppercase">Top Culinary Award 2026</span>
            </div>
          </div>

          {/* Col 2: Jam Operasional & Layanan */}
          <div className="space-y-3">
            <h4 className="font-luxury text-lg font-bold text-white tracking-wide border-b border-[#d4af37]/20 pb-2">
              Jam Operasional & Delivery
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>Senin - Minggu: 10:00 - 22:30 WIB</span>
              </div>
              <p className="text-white/60 pl-6">Pengiriman kilat dengan armada eksklusif dengan wadah pemanas khusus.</p>
              <div className="flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Jaminan Higienitas & Jaminan Kualitas 100%</span>
              </div>
            </div>
          </div>

          {/* Col 3: Cabang Utama */}
          <div className="space-y-3">
            <h4 className="font-luxury text-lg font-bold text-white tracking-wide border-b border-[#d4af37]/20 pb-2">
              Cabang Utama
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Jl. H.O.S. Cokroaminoto No. 42, Menteng, Jakarta Pusat</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+62 21-3190-8888 / +62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>vip@cuisene-ummua4.id</span>
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Newsletter & Social */}
          <div className="space-y-3">
            <h4 className="font-luxury text-lg font-bold text-white tracking-wide border-b border-[#d4af37]/20 pb-2">
              VIP Club Newsletter
            </h4>
            <p className="text-xs text-white/70">
              Dapatkan racikan promosi tersembunyi dan undangan VIP tasting bulanan.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Email Anda..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#180a2a] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
              />
              <button type="submit" className="btn-gold px-4 py-2 rounded-lg text-xs font-bold shrink-0">
                Gabung
              </button>
            </form>
            <div className="flex items-center gap-4 pt-3">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#d4af37] transition-all" title="Bagikan">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#d4af37] transition-all" title="Website Resmi">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© 2026 ICUISENE UMMU A4. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <button
              onClick={() => openAuthModal('ADMIN')}
              className="hover:text-[#d4af37] transition-colors"
            >
              Portal Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
