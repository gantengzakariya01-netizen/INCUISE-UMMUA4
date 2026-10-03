import React from 'react';
import { MessageCircle } from 'lucide-react';
import { RESTAURANT_SETTINGS } from '../../data/restaurantData';

export const WhatsAppButton: React.FC = () => {
  const waNumber = RESTAURANT_SETTINGS.whatsapp_number;
  const message = encodeURIComponent('Halo Muscle Chicken, saya ingin bertanya mengenai pesanan.');
  const waUrl = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-[0_4px_25px_rgba(16,185,129,0.4)] border border-emerald-300/30 group transition-all duration-300 hover:scale-105"
      title="Hubungi WhatsApp Concierge Muscle Chicken"
      data-cursor="ORDER"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" />
      </div>
      <span className="hidden sm:inline font-sans tracking-wide">WhatsApp Concierge</span>
    </a>
  );
};
