import React from 'react';
import { Flame, Clock, MapPin, Phone, Mail, Award, ShieldCheck, Globe } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { RESTAURANT_SETTINGS } from '../../data/restaurantData';
import { soundEffects } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  const { openAuthModal } = useUI();

  return (
    <footer id="contact" className="w-full bg-[#060608] border-t border-white/5 pt-16 pb-24 md:pb-12 text-[#8e8a93]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#141418] via-[#26262e] to-[#ff8c00]/40 border border-[#ff8c00]/50 flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(255,140,0,0.3)]">
                <Flame className="w-5 h-5 text-[#ff8c00]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-wider text-champagne-gradient">
                  MUSCLE CHICKEN
                </span>
                <span className="font-sans text-[9px] font-extrabold tracking-[0.3em] text-[#d5d0c8] uppercase">
                  INDONESIA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#d5d0c8] leading-relaxed">
              Brand kuliner ayam modern kelas dunia. Menghadirkan kerenyahan bertingkat dengan kaldu daging luar biasa juicy dan rempah artisan 24 jam.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[#ebd19a]">
              <Award className="w-4 h-4 text-[#ff8c00]" />
              <span className="text-xs font-mono font-bold uppercase">GOLDEN POULTRY MASTER 2026</span>
            </div>
          </div>

          {/* Col 2: Jam Operasional & Layanan */}
          <div className="space-y-3">
            <h4 className="font-display text-lg tracking-wider text-white border-b border-white/10 pb-2">
              HOURS & DELIVERY
            </h4>
            <div className="space-y-2 text-xs text-[#d5d0c8]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ff8c00]" />
                <span>{RESTAURANT_SETTINGS.operating_hours}</span>
              </div>
              <p className="text-[#8e8a93] pl-6">
                Armada pengantaran berwadah insulasi termal khusus untuk menjaga kerenyahan optimal.
              </p>
              <div className="flex items-center gap-2 pt-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-mono text-[11px]">100% STERILE & FRESH GUARANTEED</span>
              </div>
            </div>
          </div>

          {/* Col 3: Central Flagship Hub */}
          <div className="space-y-3">
            <h4 className="font-display text-lg tracking-wider text-white border-b border-white/10 pb-2">
              FLAGSHIP HUB
            </h4>
            <ul className="space-y-2.5 text-xs text-[#d5d0c8]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff8c00] shrink-0 mt-0.5" />
                <span>{RESTAURANT_SETTINGS.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff8c00] shrink-0" />
                <span>+{RESTAURANT_SETTINGS.whatsapp_number}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff8c00] shrink-0" />
                <span>{RESTAURANT_SETTINGS.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Newsletter & Portal Admin */}
          <div className="space-y-3">
            <h4 className="font-display text-lg tracking-wider text-white border-b border-white/10 pb-2">
              CHAMPION CLUB
            </h4>
            <p className="text-xs text-[#d5d0c8]">
              Dapatkan voucher rahasia mingguan dan rilis varian ayam terbatas.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Email Anda..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00]"
              />
              <button
                type="submit"
                onClick={() => soundEffects.playClick()}
                className="btn-amber px-4 py-2 rounded-xl text-xs font-black uppercase font-mono tracking-wider shrink-0"
              >
                JOIN
              </button>
            </form>
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-[#ff8c00]/20 text-[#ebd19a] hover:text-[#ff8c00] transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-[#ff8c00]/20 text-[#ebd19a] hover:text-[#ff8c00] transition-colors"
                title="Official Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Admin Trigger */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e8a93] gap-4">
          <p>© 2026 MUSCLE CHICKEN INDONESIA. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <button
              onClick={() => {
                openAuthModal('ADMIN');
                soundEffects.playClick();
              }}
              className="text-[#ff8c00] hover:underline font-mono font-bold"
            >
              Portal Admin (AMALIA ROSVALITA)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
