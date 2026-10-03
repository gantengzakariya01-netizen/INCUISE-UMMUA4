import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';
import type { PaymentMethod, StructuredAddress } from '../../types';
import { INITIAL_DELIVERY_ZONES } from '../../data/restaurantData';
import {
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ShieldCheck,
  MapPin,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundEffects';

type CheckoutStep = 1 | 2 | 3 | 4 | 5;

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

  const [step, setStep] = useState<CheckoutStep>(1);

  // Step 1: Contact
  const [customerName, setCustomerName] = useState(user?.full_name || 'Beast Patron');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '081299887766');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'patron@musclechicken.id');

  // Step 2: Structured Address
  const [address, setAddress] = useState<StructuredAddress>({
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Kebayoran Baru',
    village: 'Senayan',
    street: 'Jl. Senopati No. 88',
    houseNumber: 'Blok B3 / Lt. 2',
    postalCode: '12190',
    additionalDetails: 'Dekat lobby barat, titip receptionist jika security'
  });

  // Step 3: Courier Mode
  const [courierMode, setCourierMode] = useState<'EXPRESS' | 'STANDARD' | 'PICKUP'>('EXPRESS');

  // Step 4: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');
  const [customerNote, setCustomerNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff8c00', '#d8b26e', '#ff3e00', '#ffffff']
    });
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (step === 1) {
      if (!customerName.trim() || !customerPhone.trim()) {
        showToast('Please enter your name and phone number.', 'error');
        return;
      }
    } else if (step === 2) {
      if (!address.city.trim() || !address.street.trim()) {
        showToast('Please specify city and street address.', 'error');
        return;
      }
    }
    setStep((prev) => Math.min(5, prev + 1) as CheckoutStep);
  };

  const handleBack = () => {
    soundEffects.playClick();
    setStep((prev) => Math.max(1, prev - 1) as CheckoutStep);
  };

  const compiledAddressString = `${address.street}, ${address.houseNumber}, Kel. ${address.village}, Kec. ${address.district}, ${address.city}, ${address.province} ${address.postalCode}. (${address.additionalDetails || ''})`;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsSubmitting(true);

    try {
      const finalNote = [
        `Courier: ${courierMode}`,
        customerNote ? `Note: ${customerNote}` : ''
      ].filter(Boolean).join(' | ');

      const result = await placeOrder(
        customerName,
        customerPhone,
        compiledAddressString,
        paymentMethod,
        finalNote
      );

      if (result.success && result.order) {
        soundEffects.playSuccess();
        triggerConfetti();
        showToast(`Order ${result.order.order_number} confirmed! Beast is cooking!`, 'success');
        setIsCheckoutOpen(false);
        setStep(1);
        openTrackingForOrder(result.order);
      } else {
        showToast(result.error || 'Failed to place order.', 'error');
      }
    } catch {
      showToast('Error occurred during order placement.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isCheckoutOpen}
      onClose={() => {
        soundEffects.playClick();
        setIsCheckoutOpen(false);
      }}
      title="BEAST ORDER CHECKOUT"
      subtitle="Complete your coordinates and payment method for high-heat dispatch."
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          {[
            { num: 1, label: 'Contact' },
            { num: 2, label: 'Address' },
            { num: 3, label: 'Delivery' },
            { num: 4, label: 'Payment' },
            { num: 5, label: 'Review' }
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                    isCurrent
                      ? 'bg-[#ff8c00] text-black ring-2 ring-[#ff8c00]/40'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </div>
                <span className={`text-[11px] font-semibold hidden sm:inline ${isCurrent ? 'text-white' : 'text-white/40'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: CONTACT */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider flex items-center gap-2 font-accent">
              <ShieldCheck className="w-4 h-4 text-[#ff8c00]" />
              Patron Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Zack Muscle"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">WhatsApp / Phone</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Email (For Instant Digital Invoice)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="patron@gmail.com"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: STRUCTURED ADDRESS */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider flex items-center gap-2 font-accent">
              <MapPin className="w-4 h-4 text-[#ff8c00]" />
              Structured Delivery Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-white/70 mb-1">Provinsi (Province)</label>
                <input
                  type="text"
                  value={address.province}
                  onChange={(e) => setAddress({ ...address, province: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/70 mb-1">Kota / Kabupaten (City)</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/70 mb-1">Kecamatan (District)</label>
                <input
                  type="text"
                  value={address.district}
                  onChange={(e) => setAddress({ ...address, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/70 mb-1">Kelurahan / Desa (Village)</label>
                <input
                  type="text"
                  value={address.village}
                  onChange={(e) => setAddress({ ...address, village: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-white/70 mb-1">Nama Jalan (Street Name)</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="e.g. Jl. Senopati No. 88"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/70 mb-1">Nomor Rumah / Unit / Lantai</label>
                <input
                  type="text"
                  value={address.houseNumber}
                  onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                  placeholder="e.g. Blok B No. 12"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-white/70 mb-1">Kode Pos (Postal Code)</label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  placeholder="e.g. 12190"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-white/70 mb-1">Patokan / Catatan Pengemudi</label>
                <input
                  type="text"
                  value={address.additionalDetails}
                  onChange={(e) => setAddress({ ...address, additionalDetails: e.target.value })}
                  placeholder="e.g. Pagar hitam, samping mini market, titip pos"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DELIVERY ZONE & OPTIONS */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider flex items-center gap-2 font-accent">
              <Truck className="w-4 h-4 text-[#ff8c00]" />
              Select Delivery Tier & Kitchen Radius
            </h4>

            {/* Courier Tier Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'EXPRESS',
                  title: 'Express Beast Courier',
                  time: '15-25 mins',
                  desc: 'Thermal hotbox insulated delivery, priority dispatch',
                  badge: 'FASTEST',
                  icon: <Zap className="w-4 h-4 text-[#ff8c00]" />
                },
                {
                  id: 'STANDARD',
                  title: 'Standard Beast Fleet',
                  time: '30-45 mins',
                  desc: 'Regular scheduled courier routes',
                  badge: 'REGULAR',
                  icon: <Clock className="w-4 h-4 text-[#d8b26e]" />
                },
                {
                  id: 'PICKUP',
                  title: 'Self Store Pickup',
                  time: 'Ready in 15m',
                  desc: 'Pick up hot at Muscle Chicken Flagship Counter',
                  badge: 'ZERO FEE',
                  icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setCourierMode(c.id as any);
                  }}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    courierMode === c.id
                      ? 'border-[#ff8c00] bg-[#ff8c00]/10 shadow-[0_0_15px_rgba(255,140,0,0.2)]'
                      : 'border-white/10 bg-[#121216] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 rounded-lg bg-white/5">{c.icon}</div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/80">
                        {c.badge}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white">{c.title}</div>
                    <div className="text-[10px] text-[#ff8c00] font-mono mt-0.5">{c.time}</div>
                    <p className="text-[10px] text-white/50 mt-1 leading-snug">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Radius Zones */}
            <div className="pt-2">
              <label className="block text-[11px] text-white/70 mb-1.5 font-semibold">Flagship Outlet Dispatch Zone</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INITIAL_DELIVERY_ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedZone(zone);
                    }}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-left border transition-all ${
                      selectedZone.id === zone.id
                        ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white'
                        : 'border-white/10 bg-[#121216] text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-white text-[11px] truncate">{zone.zone_name}</div>
                    <div className="text-[10px] text-[#d8b26e] mt-1 font-mono">
                      Rp {zone.delivery_fee.toLocaleString('id-ID')} • ~{zone.estimated_minutes} min
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT METHOD */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider flex items-center gap-2 font-accent">
              <CreditCard className="w-4 h-4 text-[#ff8c00]" />
              Select Payment Gateway
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setPaymentMethod('QRIS');
                }}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'QRIS'
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white shadow-[0_0_15px_rgba(255,140,0,0.2)]'
                    : 'border-white/10 bg-[#121216] text-white/70 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#ff8c00]" />
                <div className="text-left">
                  <div className="font-bold">QRIS Instant</div>
                  <div className="text-[9px] text-white/40">GoPay, OVO, ShopeePay</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setPaymentMethod('BANK_TRANSFER_BCA');
                }}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'BANK_TRANSFER_BCA'
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white shadow-[0_0_15px_rgba(255,140,0,0.2)]'
                    : 'border-white/10 bg-[#121216] text-white/70 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4 text-sky-400" />
                <div className="text-left">
                  <div className="font-bold">BCA VA</div>
                  <div className="text-[9px] text-white/40">Virtual Account</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setPaymentMethod('BANK_TRANSFER_MANDIRI');
                }}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'BANK_TRANSFER_MANDIRI'
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white shadow-[0_0_15px_rgba(255,140,0,0.2)]'
                    : 'border-white/10 bg-[#121216] text-white/70 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold">Mandiri Livin</div>
                  <div className="text-[9px] text-white/40">Bill Payment</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setPaymentMethod('CREDIT_CARD');
                }}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white shadow-[0_0_15px_rgba(255,140,0,0.2)]'
                    : 'border-white/10 bg-[#121216] text-white/70 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="font-bold">Visa / Master</div>
                  <div className="text-[9px] text-white/40">Credit or Debit</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setPaymentMethod('CASH_ON_DELIVERY');
                }}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'border-[#ff8c00] bg-[#ff8c00]/15 text-white shadow-[0_0_15px_rgba(255,140,0,0.2)]'
                    : 'border-white/10 bg-[#121216] text-white/70 hover:text-white'
                }`}
              >
                <Banknote className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="font-bold">Cash On Delivery</div>
                  <div className="text-[9px] text-white/40">Pay upon arrival</div>
                </div>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">
                Special Kitchen Request (Sauce separation, cutlery, etc.)
              </label>
              <input
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="e.g. Extra hot sambal on the side, no plastic cutlery"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & SUMMARY */}
        {step === 5 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider flex items-center gap-2 font-accent">
              <CheckCircle2 className="w-4 h-4 text-[#ff8c00]" />
              Final Order Confirmation
            </h4>

            {/* Recipient summary card */}
            <div className="p-3.5 rounded-xl bg-[#121216] border border-white/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-white/50">Patron:</span>
                <span className="font-bold text-white">{customerName} ({customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Destination:</span>
                <span className="text-right text-white/80 max-w-[280px]">{compiledAddressString}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Courier Tier:</span>
                <span className="text-[#ff8c00] font-semibold">{courierMode} (~{selectedZone.estimated_minutes} min)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Payment Gateway:</span>
                <span className="text-[#d8b26e] font-semibold">{paymentMethod}</span>
              </div>
            </div>

            {/* Items table preview */}
            <div className="p-3.5 rounded-xl bg-[#121216] border border-white/10 max-h-36 overflow-y-auto custom-scrollbar space-y-2 text-xs">
              {cart.map((c) => (
                <div key={c.id} className="flex justify-between items-center text-white/80">
                  <span>{c.quantity}x {c.product.name} {c.selectedVariant ? `(${c.selectedVariant})` : ''}</span>
                  <span className="font-mono">Rp {c.subtotal.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            {/* Financial summary breakdown */}
            <div className="p-4 rounded-xl bg-[#1a1a24] border border-[#ff8c00]/30 space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal Items ({cart.reduce((s, i) => s + i.quantity, 0)} Pcs):</span>
                <span className="font-mono text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount:</span>
                  <span className="font-mono">- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between text-white/70">
                <span>Courier Fee ({selectedZone.zone_name}):</span>
                <span className="font-mono">Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Restaurant Tax (PB1 10%):</span>
                <span className="font-mono">Rp {taxAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Thermal Packaging (5%):</span>
                <span className="font-mono">Rp {serviceFeeAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-white items-baseline">
                <span className="font-display tracking-wider text-base">TOTAL PAYMENT:</span>
                <span className="font-display tracking-wider text-xl text-[#ff8c00]">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-[10px] text-white/60">
              <Info className="w-3.5 h-3.5 text-[#ff8c00] shrink-0" />
              <span>By clicking confirm, your order is dispatched immediately into the kitchen preparation pipeline.</span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setIsCheckoutOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl text-xs text-white/40 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-amber px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmOrder}
              className="btn-amber px-8 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xl tracking-wider"
            >
              <Zap className="w-4 h-4" />
              <span>{isSubmitting ? 'DISPATCHING ORDER...' : 'FIRE UP THE GRILL (CONFIRM)'}</span>
            </button>
          )}
        </div>

      </div>
    </Modal>
  );
};
