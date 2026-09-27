import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import { Truck, LogOut, Save } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const CustomerProfileModal: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { orders } = useCart();
  const { isProfileOpen, setIsProfileOpen, openTrackingForOrder, showToast } = useUI();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!isProfileOpen || !user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateProfile({
        full_name: fullName,
        phone,
        avatar_url: avatarUrl
      });
      if (res.success) {
        showToast('Profil keanggotaan berhasil diperbarui!', 'success');
      } else {
        showToast(res.error || 'Gagal memperbarui profil.', 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isProfileOpen}
      onClose={() => setIsProfileOpen(false)}
      title="Profil Keanggotaan Royal"
      subtitle={`Email terverifikasi: ${user.email}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Profile Card Header */}
        <div className="p-5 rounded-2xl glass-panel border border-[#d4af37]/30 flex flex-col sm:flex-row items-center gap-5">
          <img
            src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={user.full_name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#d4af37] shadow-xl"
          />

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-luxury text-xl font-bold text-white">{user.full_name}</h3>
              <Badge variant="gold">{user.role}</Badge>
            </div>
            <p className="text-xs text-[#bda8d6]">{user.email}</p>
            <p className="text-xs text-white/50">{user.phone || 'Nomor HP belum diisi'}</p>
          </div>

          <button
            onClick={() => {
              logout();
              setIsProfileOpen(false);
            }}
            className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="p-4 rounded-xl glass-card border border-[#d4af37]/20 space-y-3">
          <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Sunting Profil Saya</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#180a2a] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Nomor Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#180a2a] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/70 mb-1">URL Foto Profil Avatar</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#180a2a] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Profil'}</span>
            </button>
          </div>
        </form>

        {/* Order History Section */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Riwayat Pesanan Saya ({orders.length})</h4>

          {orders.length === 0 ? (
            <p className="text-xs text-white/40 py-4 text-center">Belum ada riwayat pesanan.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
              {orders.map((ord) => (
                <div key={ord.id} className="p-3.5 rounded-xl glass-panel border border-[#d4af37]/20 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{ord.order_number}</span>
                      <Badge variant="purple">{ord.order_status}</Badge>
                    </div>
                    <span className="text-[10px] text-white/50 block mt-1">
                      {new Date(ord.created_at).toLocaleDateString('id-ID')} • {ord.items.length} Hidangan • Rp {ord.total.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      openTrackingForOrder(ord);
                    }}
                    className="btn-outline-gold px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Lacak</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};
