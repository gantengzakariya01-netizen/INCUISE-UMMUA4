import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import type { OrderStatus, Product } from '../../types';
import { INITIAL_PRODUCTS, INITIAL_PROMOS } from '../../data/restaurantData';
import { Package, ShoppingBag, Ticket, BarChart3, Plus } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const AdminDashboardModal: React.FC = () => {
  const { user, role, hasPermission } = useAuth();
  const { isAdminOpen, setIsAdminOpen, showToast } = useUI();
  const { orders, updateOrderStatus } = useCart();

  const [adminTab, setAdminTab] = useState<'ORDERS' | 'PRODUCTS' | 'PROMOS' | 'REPORTS'>('ORDERS');
  const [productList, setProductList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [promosList] = useState(INITIAL_PROMOS);

  if (!isAdminOpen) return null;

  // Security guard check
  if (!['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(role)) {
    return (
      <Modal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        title="Akses Ditolak"
      >
        <div className="text-center py-8 space-y-4">
          <p className="text-rose-400 text-sm font-semibold">
            Anda tidak memiliki izin otorisasi untuk mengakses Portal Administrasi.
          </p>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      </Modal>
    );
  }

  // Handle stock toggle
  const toggleStockAvailability = (productId: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_available: !p.is_available } : p))
    );
    showToast('Status ketersediaan stok produk diperbarui!', 'info');
  };

  // Calculations for Reports tab
  const totalRevenue = orders
    .filter((o) => o.order_status === 'DELIVERED' || o.payment_status === 'PAID')
    .reduce((sum, o) => sum + o.total, 0);

  const completedOrdersCount = orders.filter((o) => o.order_status === 'DELIVERED').length;

  return (
    <Modal
      isOpen={isAdminOpen}
      onClose={() => setIsAdminOpen(false)}
      title="Portal Administrasi ICUISENE UMMU A4"
      subtitle={`Otorisasi Pengguna: ${user?.full_name} (${role})`}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#d4af37]/20 text-xs font-semibold overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setAdminTab('ORDERS')}
            className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
              adminTab === 'ORDERS' ? 'border-[#d4af37] text-[#d4af37] font-bold' : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Kelola Pesanan ({orders.length})</span>
          </button>

          {hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
            <button
              type="button"
              onClick={() => setAdminTab('PRODUCTS')}
              className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                adminTab === 'PRODUCTS' ? 'border-[#d4af37] text-[#d4af37] font-bold' : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Kelola Produk & Stok ({productList.length})</span>
            </button>
          )}

          {hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
            <button
              type="button"
              onClick={() => setAdminTab('PROMOS')}
              className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                adminTab === 'PROMOS' ? 'border-[#d4af37] text-[#d4af37] font-bold' : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Voucher Promo</span>
            </button>
          )}

          {hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
            <button
              type="button"
              onClick={() => setAdminTab('REPORTS')}
              className={`pb-3 px-4 flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                adminTab === 'REPORTS' ? 'border-[#d4af37] text-[#d4af37] font-bold' : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Laporan & Analitik</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {adminTab === 'ORDERS' && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Manajemen Pesanan Masuk (Realtime)</h4>

            {orders.length === 0 ? (
              <p className="text-xs text-white/40 py-8 text-center glass-panel rounded-xl">Belum ada pesanan masuk dalam sistem.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl glass-card border border-[#d4af37]/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                      <div>
                        <span className="font-luxury text-base font-bold text-gold-gradient">{ord.order_number}</span>
                        <span className="text-[10px] text-white/50 block">
                          {new Date(ord.created_at).toLocaleString('id-ID')} • {ord.customer_name} ({ord.customer_phone})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="purple">Bayar: {ord.payment_method}</Badge>
                        <Badge variant="gold">Status: {ord.order_status}</Badge>
                      </div>
                    </div>

                    <div className="text-xs text-white/80 space-y-1">
                      <p><strong>Alamat:</strong> {ord.delivery_address}</p>
                      <p><strong>Daftar Hidangan:</strong> {ord.items.map((i) => `${i.product_name} (${i.quantity}x)`).join(', ')}</p>
                      <p><strong>Total Transaksi:</strong> <span className="text-gold-gradient font-bold">Rp {ord.total.toLocaleString('id-ID')}</span></p>
                    </div>

                    {/* Quick Status Change Action Buttons */}
                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-white/60 font-semibold mr-1">Ubah Status:</span>

                      {(['PENDING', 'CONFIRMED', 'PREPARING', 'ON_DELIVERY', 'DELIVERED', 'CANCELLED'] as OrderStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            updateOrderStatus(ord.id, st, `Status diperbarui oleh Admin (${user?.full_name})`);
                            showToast(`Status pesanan ${ord.order_number} diubah menjadi ${st}`, 'success');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            ord.order_status === st
                              ? 'bg-[#d4af37] text-black font-extrabold shadow-md'
                              : 'bg-white/5 hover:bg-white/15 text-white/70'
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

        {/* TAB 2: PRODUCTS & STOCK MANAGEMENT */}
        {adminTab === 'PRODUCTS' && hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Katalog Produk & Kontrol Stok</h4>
              <button
                onClick={() => showToast('Form tambah produk baru dibuka.', 'info')}
                className="btn-gold px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Produk</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productList.map((prod) => (
                <div key={prod.id} className="p-3.5 rounded-xl glass-panel border border-[#d4af37]/20 flex gap-3 items-center">
                  <img src={prod.image_url} alt={prod.name} className="w-16 h-16 rounded-lg object-cover border border-[#d4af37]/30 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{prod.name}</h5>
                    <span className="text-[10px] text-[#d4af37] block">Rp {prod.price.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] text-white/50 block">Stok Tersedia: {prod.stock} Porsi</span>
                  </div>

                  <button
                    onClick={() => toggleStockAvailability(prod.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      prod.is_available
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {prod.is_available ? 'Tersedia' : 'Habis'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROMO MANAGEMENT */}
        {adminTab === 'PROMOS' && hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Manajemen Voucher Promo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promosList.map((pr) => (
                <div key={pr.id} className="p-4 rounded-xl glass-card border border-[#d4af37]/30 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#d4af37]">{pr.code}</span>
                    <Badge variant="purple">{pr.discount_type}</Badge>
                  </div>
                  <p className="text-xs text-white/80">{pr.title}</p>
                  <span className="text-[10px] text-white/50 block">Min. Transaksi: Rp {pr.min_order_amount.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REPORTS & ANALYTICS */}
        {adminTab === 'REPORTS' && hasPermission(['SUPER_ADMIN', 'ADMIN']) && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Laporan Ringkasan Penjualan</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl glass-panel border border-[#d4af37]/30 text-center">
                <span className="text-xs text-white/50 block">Total Omset Penjualan</span>
                <span className="font-luxury text-2xl font-bold text-gold-gradient">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-[#d4af37]/30 text-center">
                <span className="text-xs text-white/50 block">Total Transaksi Selesai</span>
                <span className="font-luxury text-2xl font-bold text-white">
                  {completedOrdersCount} Pesanan
                </span>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-[#d4af37]/30 text-center">
                <span className="text-xs text-white/50 block">Rating Kepuasan Pelanggan</span>
                <span className="font-luxury text-2xl font-bold text-amber-300">
                  4.9 / 5.0
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
