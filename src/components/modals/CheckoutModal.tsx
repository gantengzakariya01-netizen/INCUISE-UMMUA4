import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';
import type { PaymentMethod } from '../../types';
import { INITIAL_DELIVERY_ZONES } from '../../data/restaurantData';
import { CreditCard, QrCode, Building, Banknote, ShieldCheck, MapPin, Truck } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, openTrackingForOrder, showToast } = useUI();
  const { user } = useAuth();
  const {
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    taxAmount,
    serviceFeeAmount,
    grandTotal,
    selectedZone,
    setSelectedZone,
    placeOrder
  } = useCart();

  const [customerName, setCustomerName] = useState(user?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('Jl. Menteng Raya No. 15, Jakarta Pusat');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');
  const [customerNote, setCustomerNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      showToast('Mohon lengkapi nama, nomor telepon, dan alamat pengiriman.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await placeOrder(
        customerName,
        customerPhone,
        deliveryAddress,
        paymentMethod,
        customerNote
      );

      if (result.success && result.order) {
        showToast(`Pesanan ${result.order.order_number} berhasil dibuat!`, 'success');
        setIsCheckoutOpen(false);
        openTrackingForOrder(result.order);
      } else {
        showToast(result.error || 'Gagal memproses pesanan.', 'error');
      }
    } catch (err: any) {
      showToast('Terjadi kesalahan saat memproses pesanan.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isCheckoutOpen}
      onClose={() => setIsCheckoutOpen(false)}
      title="Checkout & Pembayaran Royal"
      subtitle="Lengkapi rincian pengiriman dan metode pembayaran pilihan Anda."
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleConfirmOrder} className="space-y-6">
        
        {/* Customer Info Section */}
        <div className="space-y-3 p-4 rounded-xl bg-[#180a2a] border border-[#d4af37]/20">
          <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            Informasi Pemesan
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nama Anda..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#0b0416] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0812xxxxxxxx"
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#0b0416] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Delivery Address & Zone Selection */}
        <div className="space-y-3 p-4 rounded-xl bg-[#180a2a] border border-[#d4af37]/20">
          <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            Alamat & Zona Pengiriman VIP
          </h4>

          <div>
            <label className="block text-[11px] font-semibold text-white/70 mb-1">Pilih Zona Jangkauan</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {INITIAL_DELIVERY_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-2.5 rounded-lg text-xs font-semibold text-left border transition-all ${
                    selectedZone.id === zone.id
                      ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                      : 'border-white/10 bg-[#0b0416] text-white/60 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-white text-[11px] truncate">{zone.zone_name}</div>
                  <div className="text-[10px] text-[#d4af37] mt-1">
                    Rp {zone.delivery_fee.toLocaleString('id-ID')} • ~{zone.estimated_minutes} mnt
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/70 mb-1">Alamat Lengkap Pengiriman</label>
            <textarea
              rows={2}
              required
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Jalan, No. Rumah, Patokan, Kota..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#0b0416] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/70 mb-1">Catatan Khusus Pengantar Driver (Opsional)</label>
            <input
              type="text"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="Contoh: Titip di pos satpam, pagar hitam..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#0b0416] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-3 p-4 rounded-xl bg-[#180a2a] border border-[#d4af37]/20">
          <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#d4af37]" />
            Metode Pembayaran
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setPaymentMethod('QRIS')}
              className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                paymentMethod === 'QRIS'
                  ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                  : 'border-white/10 bg-[#0b0416] text-white/70 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              <span>QRIS Instant</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('BANK_TRANSFER_BCA')}
              className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                paymentMethod === 'BANK_TRANSFER_BCA'
                  ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                  : 'border-white/10 bg-[#0b0416] text-white/70 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4 text-sky-400" />
              <span>BCA Virtual Account</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('BANK_TRANSFER_MANDIRI')}
              className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                paymentMethod === 'BANK_TRANSFER_MANDIRI'
                  ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                  : 'border-white/10 bg-[#0b0416] text-white/70 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4 text-amber-400" />
              <span>Mandiri Livin</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('CREDIT_CARD')}
              className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                paymentMethod === 'CREDIT_CARD'
                  ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                  : 'border-white/10 bg-[#0b0416] text-white/70 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4 text-purple-300" />
              <span>Kartu Kredit / Visa</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
              className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                paymentMethod === 'CASH_ON_DELIVERY'
                  ? 'border-[#d4af37] bg-[#5c2494]/40 text-white shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                  : 'border-white/10 bg-[#0b0416] text-white/70 hover:text-white'
              }`}
            >
              <Banknote className="w-4 h-4 text-emerald-400" />
              <span>Bayar di Tempat (COD)</span>
            </button>
          </div>
        </div>

        {/* Order Items & Grand Total Summary */}
        <div className="p-4 rounded-xl bg-[#120524] border border-[#d4af37]/30 space-y-2 text-xs">
          <div className="flex justify-between text-white/70">
            <span>Jumlah Hidangan:</span>
            <span className="font-bold text-white">{cart.reduce((s, i) => s + i.quantity, 0)} Porsi</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Subtotal:</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-300 font-semibold">
              <span>Diskon Voucher:</span>
              <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="flex justify-between text-white/70">
            <span>Ongkir & Pajak & Layanan:</span>
            <span>Rp {(deliveryFee + taxAmount + serviceFeeAmount).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-white">
            <span>Total Yang Dibayar:</span>
            <span className="font-luxury text-xl text-gold-gradient">
              Rp {grandTotal.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="px-5 py-3 rounded-xl text-xs text-white/60 hover:text-white"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold px-8 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xl"
          >
            <Truck className="w-4 h-4" />
            <span>{isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi & Pesan Sekarang'}</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
