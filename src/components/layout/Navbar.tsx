import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Search, User, ShieldAlert, Sparkles, LogOut, Truck } from 'lucide-react';

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
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[#d4af37]/20 shadow-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#2a0e4a] via-[#5c2494] to-[#d4af37] p-[1.5px] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                <div className="w-full h-full bg-[#0b0416] rounded-[10px] flex items-center justify-center">
                  <span className="text-xl">👑</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-luxury text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient group-hover:scale-[1.01] transition-transform">
                  ICUISENE UMMU A4
                </span>
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#bda8d6] uppercase font-semibold">
                  Royal Fine Dining
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#hero" className="text-white/80 hover:text-[#d4af37] transition-colors relative group py-1">
              Beranda
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#menu" className="text-white/80 hover:text-[#d4af37] transition-colors relative group py-1">
              Menu Sajian
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#promos" className="text-white/80 hover:text-[#d4af37] transition-colors relative group py-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Promo Diraja
            </a>
            <a href="#why-us" className="text-white/80 hover:text-[#d4af37] transition-colors relative group py-1">
              Keunggulan
            </a>
            <a href="#reviews" className="text-white/80 hover:text-[#d4af37] transition-colors relative group py-1">
              Ulasan
            </a>
            <a href="#location" className="text-white/80 hover:text-[#d4af37] transition-colors relative group py-1">
              Lokasi
            </a>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-3">
            
            {/* Quick Search */}
            <div className="relative">
              {isSearchVisible ? (
                <div className="relative flex items-center animate-fade-in">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari hidangan wagyu, lobster..."
                    className="w-44 sm:w-60 px-4 py-2 text-xs rounded-full bg-[#180a2a] border border-[#d4af37]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
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
                  onClick={() => setIsSearchVisible(true)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 text-white/80 hover:text-white transition-all"
                  title="Cari Menu"
                >
                  <Search className="w-4 h-4 text-[#d4af37]" />
                </button>
              )}
            </div>

            {/* Order Tracking Button (If active order exists) */}
            {latestOrder && (
              <button
                onClick={() => openTrackingForOrder(latestOrder)}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#5c2494]/30 hover:bg-[#5c2494]/60 border border-[#9333ea]/40 text-xs font-semibold text-[#e6dbf8] transition-all animate-pulse-glow"
                title="Lacak Pesanan"
              >
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Lacak Pesanan</span>
              </button>
            )}

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#996515]/20 hover:from-[#d4af37]/30 hover:to-[#996515]/40 border border-[#d4af37]/40 text-white transition-all group"
            >
              <ShoppingBag className="w-5 h-5 text-[#f3e5ab] group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d4af37] text-[#0b0416] text-[11px] font-bold flex items-center justify-center shadow-lg">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e0d3a] hover:bg-[#2a0e4a] border border-[#d4af37]/30 text-xs font-semibold text-white transition-all"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-[#d4af37]" />
                  ) : (
                    <User className="w-4 h-4 text-[#d4af37]" />
                  )}
                  <span className="max-w-[100px] truncate hidden lg:inline">{user.full_name}</span>
                </button>

                {/* Admin Portal Toggle (Visible if user has admin/staff role) */}
                {['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(role) && (
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 to-amber-600/35 hover:from-amber-500/45 hover:to-amber-600/55 border border-amber-400/60 text-amber-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse-glow"
                    title="Buka Portal Dashboard Restoran"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Dashboard Admin</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 text-white/50 hover:text-rose-300 transition-all"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('LOGIN')}
                  className="btn-gold px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </button>

                {/* Direct Admin Login Button */}
                <button
                  onClick={() => openAuthModal('ADMIN')}
                  className="px-3 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  title="Login Admin: AMALIA ROSVALITA"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
