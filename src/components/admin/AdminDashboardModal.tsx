import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import type { OrderStatus, Product } from '../../types';
import { INITIAL_PRODUCTS, INITIAL_PROMOS } from '../../data/restaurantData';
import {
  Package,
  ShoppingBag,
  Ticket,
  BarChart3,
  Flame,
  Search,
  Eye,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { soundEffects } from '../../utils/soundEffects';

export const AdminDashboardModal: React.FC = () => {
  const { user, role, hasPermission, logout } = useAuth();
  const { isAdminOpen, setIsAdminOpen, showToast, openTrackingForOrder } = useUI();
  const { orders, updateOrderStatus } = useCart();

  const [adminTab, setAdminTab] = useState<'ORDERS' | 'PRODUCTS' | 'PROMOS' | 'REPORTS'>('ORDERS');
  const [productList, setProductList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [promosList, setPromosList] = useState(INITIAL_PROMOS);
  const [orderFilter, setOrderFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Live WIB Clock
  const [wibTime, setWibTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as WIB (UTC+7)
      const formatted = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(now);
      setWibTime(formatted + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isAdminOpen) return null;

  // Security guard check
  if (!['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(role)) {
    return (
      <Modal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        title="ACCESS RESTRICTED"
      >
        <div className="text-center py-8 space-y-4">
          <p className="text-rose-400 text-sm font-semibold">
            You do not possess the required clearance to access the Muscle Chicken Executive Terminal.
          </p>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="btn-amber px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            CLOSE
          </button>
        </div>
      </Modal>
    );
  }

  // Handle stock toggle
  const toggleStockAvailability = (productId: string) => {
    soundEffects.playClick();
    setProductList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_available: !p.is_available } : p))
    );
    showToast('Product inventory availability updated.', 'info');
  };

  // Handle promo toggle
  const togglePromoActive = (promoId: string) => {
    soundEffects.playClick();
    setPromosList((prev) =>
      prev.map((pr) => (pr.id === promoId ? { ...pr, is_active: !pr.is_active } : pr))
    );
    showToast('Promo voucher state toggled.', 'info');
  };

  // Calculations for Reports tab
  const totalRevenue = orders
    .filter((o) => o.order_status === 'COMPLETED' || o.order_status === 'DELIVERED' || o.payment_status === 'PAID')
    .reduce((sum, o) => sum + o.total, 0);

  const completedOrdersCount = orders.filter(
    (o) => o.order_status === 'COMPLETED' || o.order_status === 'DELIVERED'
  ).length;

  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / (orders.length || 1)) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'ALL' || o.order_status === orderFilter;
    const matchesSearch =
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const allStatuses: OrderStatus[] = [
    'ORDER RECEIVED',
    'PAYMENT CONFIRMED',
    'PREPARING INGREDIENTS',
    'COOKING ON HIGH HEAT',
    'PACKED & READY',
    'OUT FOR DELIVERY',
    'COMPLETED',
    'CANCELLED'
  ];

  return (
    <Modal
      isOpen={isAdminOpen}
      onClose={() => {
        soundEffects.playClick();
        setIsAdminOpen(false);
      }}
      title="MUSCLE CHICKEN EXECUTIVE TERMINAL"
      subtitle={`Authenticated as ${user?.full_name || 'AMALIA ROSVALITA'} • Realtime Central Hub`}
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        
        {/* Terminal Header Bar with Live WIB Clock */}
        <div className="p-4 rounded-2xl bg-[#14141c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff8c00]/15 flex items-center justify-center border border-[#ff8c00]/30">
              <Flame className="w-5 h-5 text-[#ff8c00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display tracking-wider text-base text-white">HEADQUARTERS TERMINAL</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  OPERATIONAL: OPEN
                </span>
              </div>
              <p className="text-[11px] text-white/50">Admin: <strong className="text-[#d8b26e]">{user?.full_name}</strong> ({role})</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#0e0e12] px-3.5 py-1.5 rounded-xl border border-white/10 text-right">
              <span className="text-[10px] text-white/40 block font-mono">LIVE CLOCK</span>
              <span className="text-xs font-mono font-bold text-[#ff8c00]">{wibTime}</span>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                logout();
                setIsAdminOpen(false);
                showToast('Signed out of admin terminal.', 'info');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/50 hover:text-rose-400 transition-colors border border-white/10"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 text-xs font-semibold overflow-x-auto pb-1 gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setAdminTab('ORDERS');
            }}
            className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all font-accent ${
              adminTab === 'ORDERS' ? 'border-[#ff8c00] text-[#ff8c00] font-bold' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Dispatch ({orders.length})</span>
          </button>

          {hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setAdminTab('PRODUCTS');
              }}
              className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all font-accent ${
                adminTab === 'PRODUCTS' ? 'border-[#ff8c00] text-[#ff8c00] font-bold' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Menu Inventory ({productList.length})</span>
            </button>
          )}

          {hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setAdminTab('PROMOS');
              }}
              className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all font-accent ${
                adminTab === 'PROMOS' ? 'border-[#ff8c00] text-[#ff8c00] font-bold' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Promo Vouchers</span>
            </button>
          )}

          {hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setAdminTab('REPORTS');
              }}
              className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all font-accent ${
                adminTab === 'REPORTS' ? 'border-[#ff8c00] text-[#ff8c00] font-bold' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Revenue & Analytics</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {adminTab === 'ORDERS' && (
          <div className="space-y-4 animate-fade-in">
            {/* Search & Filter row */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search order #, patron name, or phone..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#121216] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {['ALL', 'ORDER RECEIVED', 'PREPARING INGREDIENTS', 'COOKING ON HIGH HEAT', 'OUT FOR DELIVERY', 'COMPLETED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      soundEffects.playClick();
                      setOrderFilter(st);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      orderFilter === st
                        ? 'bg-[#ff8c00] text-black font-bold'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    {st === 'ALL' ? 'All Orders' : st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-[#14141a] rounded-xl border border-white/10 text-white/40">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-white/20" />
                <p className="text-xs">No orders match the current criteria.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#14141a] border border-white/10 hover:border-[#ff8c00]/30 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display tracking-wider text-base text-[#ff8c00]">
                            {ord.order_number}
                          </span>
                          <Badge variant="gold">{ord.order_status}</Badge>
                          <Badge variant={ord.payment_status === 'PAID' ? 'gold' : 'purple'}>
                            {ord.payment_status} ({ord.payment_method})
                          </Badge>
                        </div>
                        <span className="text-[10px] text-white/50 block font-mono mt-0.5">
                          {new Date(ord.created_at).toLocaleString('id-ID')} WIB • {ord.customer_name} ({ord.customer_phone})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            openTrackingForOrder(ord);
                          }}
                          className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#ff8c00]" />
                          <span>Track View</span>
                        </button>
                        <span className="font-display tracking-wider text-base text-white font-mono">
                          Rp {ord.total.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-white/80 space-y-1">
                      <p className="text-white/60 text-[11px]"><strong className="text-white/90">Address:</strong> {ord.delivery_address}</p>
                      <p className="text-white/60 text-[11px]"><strong className="text-white/90">Items:</strong> {ord.items.map((i) => `${i.product_name} (${i.quantity}x)`).join(', ')}</p>
                      {ord.customer_note && <p className="text-white/60 text-[11px]"><strong className="text-amber-400">Note:</strong> {ord.customer_note}</p>}
                    </div>

                    {/* Quick 7-Status Dispatch Buttons */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase font-mono text-white/40 mr-1">Advance Status:</span>

                      {allStatuses.map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            soundEffects.playClick();
                            updateOrderStatus(ord.id, st, `Status updated via Executive Terminal by ${user?.full_name}`);
                            showToast(`Order ${ord.order_number} set to ${st}`, 'success');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            ord.order_status === st
                              ? 'bg-[#ff8c00] text-black font-extrabold shadow-[0_0_10px_rgba(255,140,0,0.5)]'
                              : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MENU INVENTORY */}
        {adminTab === 'PRODUCTS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-accent">
                Active Kitchen Inventory & Pricing ({productList.length} Items)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {productList.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-xl bg-[#14141a] border border-white/10 flex gap-3.5 items-center hover:border-white/20 transition-all"
                >
                  <img
                    src={prod.image_url}
                    alt={prod.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate font-accent">{prod.name}</h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-bold text-[#ff8c00]">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                      {prod.promo_price && (
                        <span className="text-[10px] text-white/40 line-through font-mono">
                          Rp {prod.promo_price.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/40 block mt-0.5">
                      Stock: {prod.stock} portions • Sold: {prod.sold_count}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleStockAvailability(prod.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0 ${
                      prod.is_available
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30'
                    }`}
                  >
                    {prod.is_available ? 'IN STOCK' : 'SOLD OUT'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROMO VOUCHERS */}
        {adminTab === 'PROMOS' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-accent">
              Active Marketing Vouchers
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {promosList.map((pr) => (
                <div key={pr.id} className="p-4 rounded-xl bg-[#14141a] border border-white/10 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-display tracking-wider text-base text-[#ff8c00]">{pr.code}</span>
                      <Badge variant="gold">{pr.discount_type}</Badge>
                    </div>
                    <button
                      onClick={() => togglePromoActive(pr.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                        pr.is_active
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {pr.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </div>
                  <p className="text-xs text-white/80">{pr.title}</p>
                  <p className="text-[11px] text-white/50">{pr.description}</p>
                  <div className="text-[10px] text-white/40 pt-1 border-t border-white/5 flex justify-between">
                    <span>Min. Order: Rp {pr.min_order_amount.toLocaleString('id-ID')}</span>
                    <span className="text-[#d8b26e]">Discount: {pr.discount_type === 'PERCENTAGE' ? `${pr.discount_amount}%` : `Rp ${pr.discount_amount.toLocaleString('id-ID')}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REPORTS & ANALYTICS */}
        {adminTab === 'REPORTS' && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-accent">
              Executive Performance Summary
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#14141a] border border-white/10 text-center">
                <span className="text-[10px] text-white/40 uppercase block font-mono">Gross Revenue</span>
                <span className="font-display tracking-wider text-2xl text-[#ff8c00] mt-1 block">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </span>
                <span className="text-[9px] text-emerald-400">Paid & Delivered orders</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#14141a] border border-white/10 text-center">
                <span className="text-[10px] text-white/40 uppercase block font-mono">Total Dispatches</span>
                <span className="font-display tracking-wider text-2xl text-white mt-1 block">
                  {completedOrdersCount} / {orders.length}
                </span>
                <span className="text-[9px] text-white/50">Completed batches</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#14141a] border border-white/10 text-center">
                <span className="text-[10px] text-white/40 uppercase block font-mono">Avg. Order Value</span>
                <span className="font-display tracking-wider text-2xl text-[#d8b26e] mt-1 block">
                  Rp {averageOrderValue.toLocaleString('id-ID')}
                </span>
                <span className="text-[9px] text-white/50">Per transaction</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#14141a] border border-white/10 text-center">
                <span className="text-[10px] text-white/40 uppercase block font-mono">Patron Rating</span>
                <span className="font-display tracking-wider text-2xl text-amber-400 mt-1 block">
                  4.98 ★
                </span>
                <span className="text-[9px] text-emerald-400">12,400+ Verified reviews</span>
              </div>
            </div>

            {/* Hub Operational Insights */}
            <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff8c00]" />
                <h5 className="font-accent text-xs font-bold text-white uppercase tracking-wider">
                  Kitchen Efficiency Score
                </h5>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/50 text-[11px] block">Avg. High-Heat Cook Time</span>
                  <span className="font-bold text-white text-sm font-mono">11.4 mins</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/50 text-[11px] block">Beast Express Courier Speed</span>
                  <span className="font-bold text-white text-sm font-mono">18.2 mins</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/50 text-[11px] block">Repeat Patron Rate</span>
                  <span className="font-bold text-white text-sm font-mono">87.6%</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
