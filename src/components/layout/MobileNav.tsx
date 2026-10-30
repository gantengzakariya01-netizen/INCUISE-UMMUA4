import React from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Home, Flame, UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const MobileNav: React.FC = () => {
  const { cart, latestOrder } = useCart();
  const { setIsCartOpen, setIsAuthOpen, setIsProfileOpen, openTrackingForOrder } = useUI();
  const { user } = useAuth();

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D1120]/95 backdrop-blur-xl border-t border-[#FFB347]/20 py-2 px-3 shadow-[0_-5px_25px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-around">
        <a
          href="#hero"
          onClick={() => soundEffects.playClick()}
          className="flex flex-col items-center gap-1 text-[#ECE8DE]/60 hover:text-[#FFB347] transition-colors"
        >
          <Home className="w-5 h-5 text-[#FFB347]" />
          <span className="text-[9px] font-mono font-bold tracking-wider">HOME</span>
        </a>

        <a
          href="#chicken-reels"
          onClick={() => soundEffects.playClick()}
          className="flex flex-col items-center gap-1 text-[#ECE8DE]/60 hover:text-[#FF7A36] transition-colors"
        >
          <Flame className="w-5 h-5 text-[#FF7A36] animate-pulse" />
          <span className="text-[9px] font-mono font-bold tracking-wider">REELS</span>
        </a>

        <a
          href="#menu-catalog"
          onClick={() => soundEffects.playClick()}
          className="flex flex-col items-center gap-1 text-[#ECE8DE]/60 hover:text-[#FFB347] transition-colors"
        >
          <UtensilsCrossed className="w-5 h-5 text-[#ECE8DE]/80" />
          <span className="text-[9px] font-mono font-bold tracking-wider">MENU</span>
        </a>

        <button
          onClick={() => {
            soundEffects.playClick();
            setIsCartOpen(true);
          }}
          className="relative flex flex-col items-center gap-1 text-[#ECE8DE]/60 hover:text-[#FFB347] transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#FFB347]" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#FF7A36] text-[#0D1120] text-[10px] font-black flex items-center justify-center font-mono animate-pulse shadow-md">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono font-bold tracking-wider">CART</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            if (latestOrder) {
              openTrackingForOrder(latestOrder);
            } else if (user) {
              setIsProfileOpen(true);
            } else {
              setIsAuthOpen(true);
            }
          }}
          className="flex flex-col items-center gap-1 text-[#ECE8DE]/60 hover:text-[#FFB347] transition-colors"
        >
          <User className="w-5 h-5 text-[#ECE8DE]/80" />
          <span className="text-[9px] font-mono font-bold tracking-wider">
            {latestOrder ? 'TRACK' : user ? 'PROFILE' : 'SIGN IN'}
          </span>
        </button>
      </div>
    </div>
  );
};
