import React from 'react';
import { INITIAL_PROMOS } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { soundEffects } from '../../utils/soundEffects';
import { Ticket, Sparkles, Copy, Check } from 'lucide-react';

export const PromoSection: React.FC = () => {
  const { applyPromo, activePromo } = useCart();
  const { showToast } = useUI();

  const handleClaim = (code: string) => {
    soundEffects.playClick();
    const res = applyPromo(code);
    if (res.success) {
      soundEffects.playSuccessChime();
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <section id="promo" className="py-24 relative bg-[#0d0d10] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8c00] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8c00]" />
            LIMITED PRIVILEGES
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            PROMOTIONAL PANELS
          </h2>
          <p className="text-sm text-[#d5d0c8]">
            Klaim voucher eksklusif untuk menikmati hidangan ayam berkelas dengan potongan istimewa.
          </p>
        </div>

        {/* Big Promo Panel Hero */}
        <div className="mb-10 relative rounded-3xl bg-gradient-to-r from-[#1c1c23] via-[#26262e] to-[#141418] border border-[#ff8c00]/40 p-8 sm:p-14 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-widest bg-[#ff8c00] text-[#0d0d10] font-display uppercase">
              WEEKEND SPECIAL
            </span>
            <h3 className="font-display text-4xl sm:text-6xl text-white leading-none">
              WEEKEND CRAVINGS<br />
              <span className="text-amber-gradient">UP TO 30% OFF</span>
            </h3>
            <p className="text-sm text-[#d5d0c8] max-w-lg leading-relaxed">
              Gunakan kode voucher <strong className="text-white font-mono">BEAST30</strong> untuk mendapatkan potongan 30% pada semua menu kombo dan hidangan ayam spesial.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <div className="px-6 py-3 rounded-2xl bg-black/60 border border-white/10 font-mono text-lg font-bold text-[#ff8c00] tracking-widest">
              BEAST30
            </div>
            <button
              onClick={() => handleClaim('BEAST30')}
              data-cursor="ORDER"
              className="btn-amber px-8 py-4 rounded-2xl text-xs font-black tracking-widest uppercase shadow-xl"
            >
              {activePromo?.code === 'BEAST30' ? 'VOUCHER TERPASANG' : 'CLAIM PROMO'}
            </button>
          </div>
        </div>

        {/* Secondary Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_PROMOS.slice(1, 4).map((promo) => {
            const isApplied = activePromo?.code === promo.code;

            return (
              <div
                key={promo.id}
                className={`relative rounded-2xl p-6 glass-panel border transition-all flex flex-col justify-between overflow-hidden group ${
                  isApplied
                    ? 'border-[#ff8c00] bg-[#1c1c23] shadow-[0_0_25px_rgba(255,140,0,0.3)]'
                    : 'border-white/10 hover:border-[#ff8c00]/50'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Ticket className="w-20 h-20 text-[#ff8c00]" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase font-display bg-[#ff8c00]/20 text-[#ff8c00] border border-[#ff8c00]/40">
                      {promo.discount_type === 'PERCENTAGE'
                        ? `DISKON ${promo.discount_amount}%`
                        : `POTONGAN Rp ${(promo.discount_amount / 1000).toFixed(0)}K`}
                    </span>
                    <span className="text-[11px] text-[#8e8a93] font-mono">Kode: {promo.code}</span>
                  </div>

                  <h4 className="font-display text-xl text-white mb-2">
                    {promo.title}
                  </h4>

                  <p className="text-xs text-[#d5d0c8] leading-relaxed mb-4">
                    {promo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-white/50 font-mono">
                    Min. Rp {(promo.min_order_amount / 1000).toFixed(0)}K
                  </span>

                  <button
                    onClick={() => handleClaim(promo.code)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'btn-amber shadow-md'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Terpasang</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Klaim</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
