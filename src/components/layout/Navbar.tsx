import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Search, User, ShieldAlert, LogOut, Truck, Menu, X, ArrowRight } from 'lucide-react';
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
    { label: 'Menu', href: '#menu-catalog' },
    { label: 'Our Products', href: '#chicken-reels' },
    { label: 'About Us', href: '#about-story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleOrderNow = () => {
    soundEffects.playClick();
    if (cart.length > 0) {
      setIsCartOpen(true);
    } else {
      const el = document.getElementById('chicken-reels') || document.getElementById('menu-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0D1120]/90 backdrop-blur-xl border-b border-[#FFB347]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5 sm:py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Custom Circular Chicken Logo + Brand Name: CHICKENLINE */}
          <a
            href="#hero"
            onClick={() => soundEffects.playClick()}
            className="flex items-center gap-3 group"
          >
            {/* Custom Circular Chicken-Inspired Logo */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#0D1120] via-[#151A2E] to-[#FF7A36] border-2 border-[#FFB347] flex items-center justify-center p-[2px] shadow-[0_0_20px_rgba(255,179,71,0.4)] group-hover:scale-105 transition-transform">
              {/* Outer pulsing ring */}
              <div className="absolute -inset-1 rounded-full bg-[#FFB347]/20 blur-sm pointer-events-none group-hover:bg-[#FFB347]/40 transition-colors" />
              
              {/* Chicken-Inspired Custom SVG Emblem */}
              <svg
                viewBox="0 0 40 40"
                className="w-7 h-7 relative z-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Crest */}
                <path
                  d="M19 8C17 9.5 15 8.5 14 11C13 13.5 15 15 17 15"
                  stroke="#FF7A36"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#FF7A36"
                />
                <circle cx="21" cy="7" r="1.8" fill="#FFB347" />
                {/* Body & Beak */}
                <path
                  d="M17 14C21 14 24 17 24 21C24 26 20 29 15 29C13 29 11 28 9.5 26.5C11 26 12 24.5 12 23C12 21 10.5 19.5 9 19.5C10 16 13 14 17 14Z"
                  fill="url(#chickenGradient)"
                />
                {/* Eye */}
                <circle cx="20.5" cy="18" r="1.4" fill="#0D1120" />
                <circle cx="21" cy="17.6" r="0.5" fill="#FFF" />
                {/* Beak */}
                <path
                  d="M23.5 19L28 20.5L23.5 22.5Z"
                  fill="#FFD18A"
                />
                {/* High heat wing curl */}
                <path
                  d="M16 21C18 21 19.5 22.5 19.5 24.5C19.5 26 18 27 16 27"
                  stroke="#FF7A36"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="chickenGradient" x1="9" y1="14" x2="24" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFD18A" />
                    <stop offset="0.5" stopColor="#FFB347" />
                    <stop offset="1" stopColor="#FF7A36" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-golden-orange-gradient leading-none">
                CHICKENLINE
              </span>
              <span className="font-sans text-[9px] font-extrabold tracking-[0.3em] text-[#9AA0B4] uppercase">
                REELS & RECEPTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Section 4) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase font-display text-[#ECE8DE]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundEffects.playClick()}
                className="relative py-1 text-[#ECE8DE]/80 hover:text-[#FFB347] transition-colors group tracking-widest text-sm"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FFB347] to-[#FF7A36] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Hand Actions: Search, Sound, User, Cart, Golden "Order Now" CTA */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            
            {/* Search Input Bar (Expandable) */}
            <div className="relative">
              {isSearchVisible ? (
                <div className="flex items-center bg-[#151A2E] rounded-full px-3 py-1.5 border border-[#FFB347]/30 shadow-inner animate-fade-in">
                  <Search className="w-3.5 h-3.5 text-[#FFB347] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chicken..."
                    className="bg-transparent text-xs text-[#ECE8DE] placeholder-[#9AA0B4] focus:outline-none w-36 font-sans"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchVisible(false);
                      setSearchQuery('');
                    }}
                    className="text-[#9AA0B4] hover:text-[#ECE8DE] text-xs ml-1"
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
                  className="p-2 rounded-full bg-[#151A2E]/80 hover:bg-[#FFB347]/20 text-[#ECE8DE] hover:text-[#FFB347] transition-colors border border-white/10"
                  title="Search Chicken Menu"
                  aria-label="Search Chicken Menu"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sound Toggle */}
            <SoundToggle />

            {/* User Login / Profile Button (Section 4) */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsProfileOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151A2E] border border-[#FFB347]/30 text-xs text-[#ECE8DE] hover:border-[#FFB347] transition-all"
                  title="Account Coordinates"
                >
                  <User className="w-3.5 h-3.5 text-[#FFB347]" />
                  <span className="max-w-[80px] truncate font-sans text-xs">{user.full_name}</span>
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    logout();
                  }}
                  className="p-1.5 rounded-full text-[#9AA0B4] hover:text-rose-400"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  openAuthModal('LOGIN');
                }}
                className="px-4 py-2 rounded-full border border-white/15 hover:border-[#FFB347] text-xs font-display tracking-widest text-[#ECE8DE] hover:text-[#FFB347] transition-all uppercase"
              >
                Login
              </button>
            )}

            {/* Super Admin Terminal trigger if role has clearance */}
            {['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(role) && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsAdminOpen(true);
                }}
                className="p-2 rounded-full bg-[#FF7A36]/20 text-[#FF7A36] border border-[#FF7A36]/40 hover:bg-[#FF7A36]/40 transition-colors"
                title="Open Executive Terminal"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>
            )}

            {/* Cart Trigger Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsCartOpen(true);
              }}
              className="relative p-2 rounded-full bg-[#151A2E]/80 hover:bg-[#FFB347]/20 text-[#ECE8DE] hover:text-[#FFB347] transition-colors border border-white/10"
              title="Cart Items"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF7A36] text-[#0D1120] text-[9px] font-black flex items-center justify-center font-mono shadow-md animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Golden "Order Now" CTA (Section 4) */}
            <button
              onClick={handleOrderNow}
              data-cursor="ORDER NOW"
              className="btn-golden-pill px-5 py-2.5 rounded-full text-xs font-display font-black tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,179,71,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compact View for <820px Mobile Screen (Section 10) */}
          <div className="flex lg:hidden items-center gap-2.5">
            {/* Quick Order Now Button */}
            <button
              onClick={handleOrderNow}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FFB347] to-[#FF7A36] text-[#0D1120] font-display text-[11px] font-black tracking-wider uppercase shadow-md"
            >
              Order Now
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsCartOpen(true);
              }}
              className="relative p-2 rounded-full bg-[#151A2E] text-[#ECE8DE] border border-white/10"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFB347]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF7A36] text-[#0D1120] text-[9px] font-black flex items-center justify-center font-mono">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-[#151A2E] text-[#ECE8DE] border border-white/10 hover:border-[#FFB347]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (<820px) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0D1120]/95 backdrop-blur-2xl border-b border-[#FFB347]/30 shadow-2xl p-6 animate-slide-in-top space-y-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundEffects.playClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block py-2.5 text-base font-display font-bold uppercase tracking-widest text-[#ECE8DE] hover:text-[#FFB347] border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-[#9AA0B4]">SOUND FX</span>
            <SoundToggle />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsMobileMenuOpen(false);
                  setIsProfileOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#151A2E] border border-[#FFB347]/30 text-xs font-bold text-[#ECE8DE] flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#FFB347]" />
                <span>My Profile ({user.full_name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsMobileMenuOpen(false);
                  openAuthModal('LOGIN');
                }}
                className="w-full py-2.5 rounded-xl bg-[#151A2E] border border-white/20 text-xs font-display tracking-widest text-[#ECE8DE] uppercase"
              >
                Login to Account
              </button>
            )}

            {latestOrder && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsMobileMenuOpen(false);
                  openTrackingForOrder(latestOrder);
                }}
                className="w-full py-2.5 rounded-xl bg-[#FFB347]/10 border border-[#FFB347]/30 text-xs font-mono text-[#FFD18A] flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-[#FFB347]" />
                <span>Track Active Order: {latestOrder.order_number}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
