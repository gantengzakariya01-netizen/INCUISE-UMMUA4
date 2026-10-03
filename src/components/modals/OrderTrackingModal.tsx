import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { Modal } from '../ui/Modal';
import type { OrderStatus } from '../../types';
import {
  Clock,
  CheckCircle2,
  Truck,
  Flame,
  PackageCheck,
  CreditCard,
  ChefHat,
  MapPin,
  Receipt,
  Sparkles,
  Phone,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { soundEffects } from '../../utils/soundEffects';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, trackingOrder } = useUI();
  const { updateOrderStatus } = useCart();
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isTrackingOpen || !trackingOrder) return null;

  const order = trackingOrder;

  const steps: { status: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      status: 'ORDER RECEIVED',
      label: 'Order Received',
      desc: 'Order logged into Muscle Chicken POS Terminal',
      icon: <Clock className="w-4 h-4" />
    },
    {
      status: 'PAYMENT CONFIRMED',
      label: 'Payment Confirmed',
      desc: 'Gateway verified payment transaction',
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      status: 'PREPARING INGREDIENTS',
      label: 'Prep & Marinate',
      desc: '24-hour herb infused prime cut preparation',
      icon: <ChefHat className="w-4 h-4" />
    },
    {
      status: 'COOKING ON HIGH HEAT',
      label: 'High Heat Searing',
      desc: 'Fired over 250°C charcoal & pressure fryers',
      icon: <Flame className="w-4 h-4" />
    },
    {
      status: 'PACKED & READY',
      label: 'Thermal Sealed',
      desc: 'Packed in steam-vented beast boxes',
      icon: <PackageCheck className="w-4 h-4" />
    },
    {
      status: 'OUT FOR DELIVERY',
      label: 'Out For Delivery',
      desc: 'Beast Courier dispatched on route',
      icon: <Truck className="w-4 h-4" />
    },
    {
      status: 'COMPLETED',
      label: 'Delivered Hot',
      desc: 'Feast ready for prime consumption',
      icon: <CheckCircle2 className="w-4 h-4" />
    }
  ];

  const getStatusIndex = (st: OrderStatus): number => {
    switch (st) {
      case 'ORDER RECEIVED': return 0;
      case 'PAYMENT CONFIRMED': return 1;
      case 'PREPARING INGREDIENTS': return 2;
      case 'COOKING ON HIGH HEAT': return 3;
      case 'PACKED & READY': return 4;
      case 'OUT FOR DELIVERY': return 5;
      case 'COMPLETED': return 6;
      // Fallback for legacy status aliases
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PREPARING': return 3;
      case 'ON_DELIVERY': return 5;
      case 'DELIVERED': return 6;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex(order.order_status);

  // Fast forward simulation for patron demo
  const handleSimulateNextStage = () => {
    soundEffects.playClick();
    if (currentIndex < steps.length - 1) {
      setIsSimulating(true);
      const nextStatus = steps[currentIndex + 1].status;
      updateOrderStatus(order.id, nextStatus, `Advanced by live kitchen terminal simulation`);
      soundEffects.playSuccess();
      setTimeout(() => setIsSimulating(false), 300);
    }
  };

  return (
    <Modal
      isOpen={isTrackingOpen}
      onClose={() => {
        soundEffects.playClick();
        setIsTrackingOpen(false);
      }}
      title={`LIVE TRACKING: ${order.order_number}`}
      subtitle={`Placed at: ${new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB • Muscle Chicken Realtime Hub`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Realtime Status Progress Bar */}
        <div className="p-5 rounded-2xl bg-[#14141a] border border-[#ff8c00]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff8c00]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8c00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff8c00]"></span>
              </span>
              <span className="text-xs uppercase tracking-wider font-bold text-white/80 font-accent">
                Kitchen Stage: <strong className="text-[#ff8c00] ml-1">{order.order_status}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="gold">STEP {currentIndex + 1} OF 7</Badge>
              {currentIndex < steps.length - 1 && (
                <button
                  onClick={handleSimulateNextStage}
                  disabled={isSimulating}
                  className="px-3 py-1 rounded-lg bg-[#ff8c00]/20 hover:bg-[#ff8c00]/30 text-[#ff8c00] border border-[#ff8c00]/40 text-[10px] font-bold flex items-center gap-1.5 transition-all"
                  title="Simulate kitchen progress for demonstration"
                >
                  <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>Simulate Next Stage</span>
                </button>
              )}
            </div>
          </div>

          {/* 7-Step Horizontal / Responsive Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
            {steps.map((step, idx) => {
              const isCompleted = currentIndex > idx;
              const isCurrent = currentIndex === idx;

              return (
                <div key={step.status} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#ff8c00] text-black ring-4 ring-[#ff8c00]/30 scale-110 shadow-[0_0_20px_rgba(255,140,0,0.6)] animate-pulse'
                        : isCompleted
                        ? 'bg-[#ff8c00]/20 text-[#ff8c00] border border-[#ff8c00]/50'
                        : 'bg-white/5 text-white/20 border border-white/10'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="min-h-[32px]">
                    <span
                      className={`text-[11px] font-bold block leading-tight font-accent ${
                        isCurrent ? 'text-[#ff8c00]' : isCompleted ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <p className="text-xs text-white/70 italic">
              "{steps[currentIndex]?.desc}"
            </p>
          </div>
        </div>

        {/* Order Details & Delivery Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Items Receipt */}
          <div className="p-4 rounded-xl bg-[#14141a] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider flex items-center gap-2 font-accent">
              <Receipt className="w-4 h-4 text-[#ff8c00]" />
              Items In This Batch ({order.items.length})
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                  <div>
                    <h5 className="font-bold text-white">{item.product_name}</h5>
                    <span className="text-[10px] text-white/50">{item.quantity}x @ Rp {item.price.toLocaleString('id-ID')}</span>
                  </div>
                  <span className="font-bold text-[#ff8c00] font-mono">
                    Rp {item.subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-bold text-white items-baseline">
              <span>Grand Total</span>
              <span className="font-display tracking-wider text-base text-[#ff8c00]">
                Rp {order.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Delivery Coordinates & Courier Hotline */}
          <div className="p-4 rounded-xl bg-[#14141a] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-[#d8b26e] uppercase tracking-wider flex items-center gap-2 font-accent">
              <MapPin className="w-4 h-4 text-[#d8b26e]" />
              Dispatch Destination & Hotline
            </h4>

            <div className="space-y-2.5 text-xs text-white/80">
              <div>
                <span className="text-white/40 block text-[10px] uppercase font-mono">Recipient:</span>
                <span className="font-bold text-white">{order.customer_name} ({order.customer_phone})</span>
              </div>

              <div>
                <span className="text-white/40 block text-[10px] uppercase font-mono">Address:</span>
                <p className="text-white/90 leading-relaxed text-[11px]">{order.delivery_address}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Payment Status:</span>
                  <Badge variant={order.payment_status === 'PAID' ? 'gold' : 'purple'}>
                    {order.payment_status} ({order.payment_method})
                  </Badge>
                </div>

                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Muscle%20Chicken,%20saya%20ingin%20tanya%20status%20pesanan%20${order.order_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Dispatch</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Event Log */}
        <div className="p-4 rounded-xl bg-[#121216] border border-white/10 space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-accent flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8c00]" />
            Kitchen Event Log
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar">
            {order.status_history.map((hist) => (
              <div key={hist.id} className="flex items-start gap-3 text-xs text-white/70">
                <span className="text-[10px] text-[#ff8c00] font-mono whitespace-nowrap pt-0.5">
                  {new Date(hist.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
                </span>
                <div>
                  <span className="font-bold text-white uppercase text-[10px] bg-white/5 px-1.5 py-0.5 rounded mr-2 font-mono">
                    {hist.status}
                  </span>
                  <span className="text-[11px]">{hist.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Modal>
  );
};
