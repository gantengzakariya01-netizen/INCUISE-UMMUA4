import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { RESTAURANT_SETTINGS } from '../../data/restaurantData';

export const LocationsSection: React.FC = () => {
  return (
    <section id="locations" className="py-24 relative bg-[#09090b] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8c00] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#ff8c00]" />
            FLAGSHIP HUBS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            LOCATIONS & KITCHEN HUBS
          </h2>
          <p className="text-sm text-[#d5d0c8]">
            Kunjungi lounge dine-in kami atau pesan pengantaran hangat langsung ke alamat Anda.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANT_SETTINGS.flagship_branches.map((b, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#ff8c00]/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#ff8c00]">
                    STORE #{i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-[#ff8c00] transition-colors">
                    <Navigation className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-2xl text-white group-hover:text-[#ebd19a] transition-colors">
                  {b.city}
                </h3>

                <p className="text-xs text-[#d5d0c8] leading-relaxed">
                  {b.address}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ff8c00]" />
                  <span>10:00 - 23:00 WIB</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=Muscle+Chicken+${encodeURIComponent(b.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#ff8c00] hover:underline font-bold"
                >
                  MAPS ↗
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
