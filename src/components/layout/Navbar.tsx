import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Search, User, ShieldAlert, LogOut, Truck, Flame, Menu, X } from 'lucide-react';
import { SoundToggle } from '../ui/SoundToggle';
import { soundEffects } from '../../utils/soundEffects';

export const Navbar: React.FC = () => {
  const { cart, latestOrder } = useCart();
  const {
    setIsCartOpen,
    openAuthModal,
    setIsProfileOpen,
    setIsAdminOpen,
    openTrackingForOrder,
    searchQuery,
    setSearchQuery
  } = useUI();
  const { user, logout, role } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'MENU', href: '#menu' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROMO', href: '#promo' },
    { label: 'LOCATIONS', href: '#locations' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0d0d10]/85 backdrop-blur-xl border-b border-[#d8b26e]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
          : 'bg-transparent py-5 sm:py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => soundEffects.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#141418] via-[#26262e] to-[#ff8c00]/30 border border-[#ff8c00]/50 flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(255,140,0,0.3)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,140,0,0.6)] transition-all">
              <Flame className="w-5 h-5 text-[#ff8c00] group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-wider text-champagne-gradient leading-none group-hover:text-amber-gradient transition-colors">
                MUSCLE CHICKEN
              </span>
              <span className="font-sans text-[9px] font-extrabold tracking-[0.35em] text-[#d5d0c8] uppercase">
                INDONESIA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundEffects.playClick()}
                onMouseEnter={() => soundEffects.playHover()}
                className="font-display tracking-widest text-sm text-white/70 hover:text-[#ff8c00] transition-colors relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#d8b26e] to-[#ff8c00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Quick Search */}
            <div className="relative hidden sm:block">
              {isSearchVisible ? (
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Beast Crispy, Burger..."
                    className="w-48 md:w-56 px-4 py-1.5 text-xs rounded-full bg-[#141418] border border-[#ff8c00]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchVisible(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-3 text-white/50 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsSearchVisible(true);
                    soundEffects.playClick();
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#ff8c00] border border-white/10 transition-colors"
                  title="Search Menu"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sound Toggle */}
            <SoundToggle />

            {/* Order Tracking Button (if order exists) */}
            {latestOrder && (
              <button
                onClick={() => {
                  openTrackingForOrder(latestOrder);
                  soundEffects.playClick();
                }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff8c00]/15 hover:bg-[#ff8c00]/30 border border-[#ff8c00]/50 text-xs font-bold text-[#ff8c00] transition-all animate-pulse-amber"
              >
                <Truck className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">TRACK ORDER</span>
              </button>
            )}

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                soundEffects.playClick();
              }}
              data-cursor="ORDER"
              className="relative p-2.5 rounded-full bg-gradient-to-r from-[#1c1c23] to-[#141418] hover:border-[#ff8c00] border border-[#d8b26e]/30 text-white transition-all group shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#ebd19a] group-hover:scale-110 group-hover:text-[#ff8c00] transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff8c00] text-[#0d0d10] text-[11px] font-black flex items-center justify-center shadow-lg font-mono">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Account / Admin Portal */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsProfileOpen(true);
                    soundEffects.playClick();
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c23] hover:bg-[#26262e] border border-white/10 text-xs font-semibold text-white transition-all"
                >
                  <User className="w-3.5 h-3.5 text-[#ff8c00]" />
                  <span className="max-w-[100px] truncate hidden md:inline">{user.full_name}</span>
                </button>

                {['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(role) && (
                  <button
                    onClick={() => {
                      setIsAdminOpen(true);
                      soundEffects.playClick();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/60 text-amber-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,140,0,0.3)] animate-pulse-amber"
                    title="Buka Portal Admin (AMALIA ROSVALITA)"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline font-mono">ADMIN</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    soundEffects.playClick();
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 text-white/50 hover:text-rose-300 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    openAuthModal('LOGIN');
                    soundEffects.playClick();
                  }}
                  className="btn-amber px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>LOGIN</span>
                </button>

                <button
                  onClick={() => {
                    openAuthModal('ADMIN');
                    soundEffects.playClick();
                  }}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#1c1c23] hover:bg-white/10 border border-[#d8b26e]/40 text-[#ebd19a] hover:text-[#ff8c00] text-xs font-bold flex items-center gap-1 transition-all"
                  title="Portal Admin AMALIA ROSVALITA"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#ff8c00]" />
                  <span className="hidden sm:inline font-mono text-[11px]">ADMIN</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                soundEffects.playClick();
              }}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-panel-heavy border-b border-[#ff8c00]/30 px-6 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  soundEffects.playClick();
                }}
                className="font-display tracking-widest text-lg text-white/80 hover:text-[#ff8c00] py-1 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
