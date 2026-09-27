import React from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Home, Utensils, ShoppingBag, Truck, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { cart, latestOrder } = useCart();
  const { setIsCartOpen, setIsAuthOpen, setIsProfileOpen, openTrackingForOrder } = useUI();
  const { user } = useAuth();

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel-heavy border-t border-[#d4af37]/20 py-2.5 px-4">
      <div className="flex items-center justify-around">
        <a href="#hero" className="flex flex-col items-center gap-1 text-white/70 hover:text-[#d4af37] transition-colors">
          <Home className="w-5 h-5 text-[#d4af37]" />
          <span className="text-[10px] font-medium">Beranda</span>
        </a>

        <a href="#menu" className="flex flex-col items-center gap-1 text-white/70 hover:text-[#d4af37] transition-colors">
          <Utensils className="w-5 h-5 text-[#d4af37]" />
          <span className="text-[10px] font-medium">Menu</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-white/70 hover:text-[#d4af37] transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-[#d4af37] text-[#0b0416] text-[10px] font-bold flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Keranjang</span>
        </button>

        {latestOrder && (
          <button
            onClick={() => openTrackingForOrder(latestOrder)}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <Truck className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-medium">Lacak</span>
          </button>
        )}

        <button
          onClick={() => (user ? setIsProfileOpen(true) : setIsAuthOpen(true))}
          className="flex flex-col items-center gap-1 text-white/70 hover:text-[#d4af37] transition-colors"
        >
          <User className="w-5 h-5 text-[#d4af37]" />
          <span className="text-[10px] font-medium">{user ? 'Akun' : 'Masuk'}</span>
        </button>
      </div>
    </div>
  );
};
