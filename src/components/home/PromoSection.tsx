import React from 'react';
import { INITIAL_PROMOS } from '../../data/restaurantData';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Ticket, Sparkles, Copy, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const PromoSection: React.FC = () => {
  const { applyPromo, activePromo } = useCart();
  const { showToast } = useUI();

  const handleClaim = (code: string) => {
    const res = applyPromo(code);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <section id="promos" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9333ea]/20 border border-[#9333ea]/40 text-[#e6dbf8] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Penawaran Eksklusif Royal
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl font-extrabold text-gold-gradient">
            Voucher & Promo Diraja
          </h2>
          <p className="text-sm text-[#bda8d6]">
            Klaim voucher potongan istimewa untuk santapan mewah Anda hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_PROMOS.slice(0, 3).map((promo) => {
            const isApplied = activePromo?.code === promo.code;

            return (
              <div
                key={promo.id}
                className={`relative rounded-2xl p-6 glass-panel border transition-all flex flex-col justify-between overflow-hidden group ${
                  isApplied
                    ? 'border-[#d4af37] bg-[#2a0e4a]/80 shadow-[0_0_25px_rgba(212,175,55,0.3)]'
                    : 'border-[#d4af37]/20 hover:border-[#d4af37]/60'
                }`}
              >
                {/* Background Ticket Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Ticket className="w-24 h-24 text-[#d4af37]" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={isApplied ? 'gold' : 'purple'}>
                      {promo.discount_type === 'PERCENTAGE'
                        ? `DISKON ${promo.discount_amount}%`
                        : `POTONGAN Rp ${(promo.discount_amount / 1000).toFixed(0)}K`}
                    </Badge>
                    <span className="text-[11px] text-[#bda8d6] font-mono">Kode: {promo.code}</span>
                  </div>

                  <h3 className="font-luxury text-lg font-bold text-white mb-2">
                    {promo.title}
                  </h3>

                  <p className="text-xs text-[#bda8d6] leading-relaxed mb-4">
                    {promo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-white/50">
                    Min. Rp {(promo.min_order_amount / 1000).toFixed(0)}K
                  </span>

                  <button
                    onClick={() => handleClaim(promo.code)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'btn-gold shadow-md'
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
                        <span>Klaim Voucher</span>
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
