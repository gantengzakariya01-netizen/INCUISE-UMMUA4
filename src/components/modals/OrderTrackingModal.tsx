import React from 'react';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import type { OrderStatus } from '../../types';
import { Clock, CheckCircle2, Truck, ChefHat, Sparkles, MapPin, Receipt } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, trackingOrder } = useUI();

  if (!isTrackingOpen || !trackingOrder) return null;

  const order = trackingOrder;

  const steps: { status: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      status: 'PENDING',
      label: 'Pesanan Diterima',
      desc: 'Pesanan masuk ke sistem restoran',
      icon: <Clock className="w-4 h-4" />
    },
    {
      status: 'CONFIRMED',
      label: 'Dikonfirmasi',
      desc: 'Bahan baku disiapkan kitchen staff',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      status: 'PREPARING',
      label: 'Diolah Chef',
      desc: 'Master Chef memasak hidangan royal Anda',
      icon: <ChefHat className="w-4 h-4" />
    },
    {
      status: 'ON_DELIVERY',
      label: 'Pengantaran VIP',
      desc: 'Kurir khusus membawa wadah pemanas',
      icon: <Truck className="w-4 h-4" />
    },
    {
      status: 'DELIVERED',
      label: 'Tiba & Selesai',
      desc: 'Hidangan siap dinikmati di meja Anda',
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  const getStatusIndex = (st: OrderStatus) => {
    switch (st) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PREPARING': return 2;
      case 'ON_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      case 'CANCELLED': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex(order.order_status);

  return (
    <Modal
      isOpen={isTrackingOpen}
      onClose={() => setIsTrackingOpen(false)}
      title={`Lacak Pesanan: ${order.order_number}`}
      subtitle={`Waktu pemesanan: ${new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Realtime Status Progress Bar */}
        <div className="p-5 rounded-2xl glass-panel border border-[#d4af37]/30 bg-[#180a2a]/60">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-white/70">Status Realtime:</span>
            <Badge variant="gold">{order.order_status}</Badge>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-5 gap-2 relative">
            {steps.map((step, idx) => {
              const isCompleted = currentIndex >= idx;
              const isCurrent = currentIndex === idx;

              return (
                <div key={step.status} className="flex flex-col items-center text-center space-y-2 relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#d4af37] text-[#0b0416] ring-4 ring-[#d4af37]/30 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                        : isCompleted
                        ? 'bg-[#5c2494] text-[#d4af37] border border-[#d4af37]/40'
                        : 'bg-white/5 text-white/30 border border-white/10'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className={`text-[11px] font-bold ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Items Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Items */}
          <div className="p-4 rounded-xl glass-card border border-[#d4af37]/20 space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#d4af37]" />
              Daftar Hidangan ({order.items.length})
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs pb-2 border-b border-white/10">
                  <div>
                    <h5 className="font-bold text-white">{item.product_name}</h5>
                    <span className="text-[10px] text-white/50">{item.quantity}x @ Rp {item.price.toLocaleString('id-ID')}</span>
                  </div>
                  <span className="font-bold text-[#d4af37]">
                    Rp {item.subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-bold text-white">
              <span>Total Pembayaran</span>
              <span className="font-luxury text-sm text-gold-gradient">
                Rp {order.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="p-4 rounded-xl glass-card border border-[#d4af37]/20 space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              Tujuan Pengiriman
            </h4>

            <div className="space-y-2 text-xs text-white/80">
              <div>
                <span className="text-white/40 block text-[10px]">Penerima:</span>
                <span className="font-bold text-white">{order.customer_name} ({order.customer_phone})</span>
              </div>

              <div>
                <span className="text-white/40 block text-[10px]">Alamat Pengiriman:</span>
                <p className="text-white/90 leading-relaxed">{order.delivery_address}</p>
              </div>

              <div>
                <span className="text-white/40 block text-[10px]">Metode Pembayaran:</span>
                <Badge variant="purple">{order.payment_method}</Badge>
              </div>
            </div>
          </div>

        </div>

        {/* Status History Logs Timeline */}
        <div className="p-4 rounded-xl glass-panel border border-[#d4af37]/20 space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Riwayat Aktivitas Pesanan</h4>
          <div className="space-y-2">
            {order.status_history.map((hist) => (
              <div key={hist.id} className="flex items-start gap-3 text-xs text-white/70">
                <span className="text-[10px] text-[#d4af37] whitespace-nowrap pt-0.5">
                  {new Date(hist.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div>
                  <span className="font-bold text-white uppercase text-[11px] mr-2">[{hist.status}]</span>
                  <span>{hist.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Modal>
  );
};
