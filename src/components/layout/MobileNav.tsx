import React from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Home, UtensilsCrossed, ShoppingBag, Truck, User } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const MobileNav: React.FC = () => {
  const { cart, latestOrder } = useCart();
  const { setIsCartOpen, setIsAuthOpen, setIsProfileOpen, openTrackingForOrder } = useUI();
  const { user } = useAuth();

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d10]/95 backdrop-blur-xl border-t border-white/10 py-2.5 px-4 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around">
        <a
          href="#hero"
          onClick={() => soundEffects.playClick()}
          className="flex flex-col items-center gap-1 text-white/60 hover:text-[#ff8c00] transition-colors"
        >
          <Home className="w-5 h-5 text-[#ff8c00]" />
          <span className="text-[10px] font-accent tracking-wider">HOME</span>
        </a>

        <a
          href="#menu-catalog"
          onClick={() => soundEffects.playClick()}
          className="flex flex-col items-center gap-1 text-white/60 hover:text-[#ff8c00] transition-colors"
        >
          <UtensilsCrossed className="w-5 h-5 text-white/80" />
          <span className="text-[10px] font-accent tracking-wider">MENU</span>
        </a>

        <button
          onClick={() => {
            soundEffects.playClick();
            setIsCartOpen(true);
          }}
          className="relative flex flex-col items-center gap-1 text-white/60 hover:text-[#ff8c00] transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#ff8c00]" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#ff8c00] text-black text-[10px] font-extrabold flex items-center justify-center font-mono animate-pulse">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-accent tracking-wider">CART</span>
        </button>

        {latestOrder && (
          <button
            onClick={() => {
              soundEffects.playClick();
              openTrackingForOrder(latestOrder);
            }}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-[#ff8c00] transition-colors"
          >
            <Truck className="w-5 h-5 text-[#d8b26e]" />
            <span className="text-[10px] font-accent tracking-wider">TRACK</span>
          </button>
        )}

        <button
          onClick={() => {
            soundEffects.playClick();
            user ? setIsProfileOpen(true) : setIsAuthOpen(true);
          }}
          className="flex flex-col items-center gap-1 text-white/60 hover:text-[#ff8c00] transition-colors"
        >
          <User className="w-5 h-5 text-white/80" />
          <span className="text-[10px] font-accent tracking-wider">{user ? 'ACCOUNT' : 'SIGN IN'}</span>
        </button>
      </div>
    </div>
  );
};
