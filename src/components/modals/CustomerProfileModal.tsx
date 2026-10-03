import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import { Truck, LogOut, Save, UserCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { soundEffects } from '../../utils/soundEffects';

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
    soundEffects.playClick();
    setIsSaving(true);
    try {
      const res = await updateProfile({
        full_name: fullName,
        phone,
        avatar_url: avatarUrl
      });
      if (res.success) {
        soundEffects.playSuccess();
        showToast('Patron profile updated successfully!', 'success');
      } else {
        showToast(res.error || 'Failed to update profile.', 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isProfileOpen}
      onClose={() => {
        soundEffects.playClick();
        setIsProfileOpen(false);
      }}
      title="BEAST PATRON PROFILE"
      subtitle={`Verified Account: ${user.email}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        
        {/* Profile Card Header */}
        <div className="p-5 rounded-2xl bg-[#14141a] border border-white/10 flex flex-col sm:flex-row items-center gap-5">
          <img
            src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={user.full_name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#ff8c00] shadow-xl"
          />

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-display tracking-wider text-xl text-white">{user.full_name}</h3>
              <Badge variant="gold">{user.role}</Badge>
            </div>
            <p className="text-xs text-[#d8b26e]">{user.email}</p>
            <p className="text-xs text-white/50">{user.phone || 'Phone not set'}</p>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              logout();
              setIsProfileOpen(false);
            }}
            className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="p-4 rounded-xl bg-[#14141a] border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider font-accent flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#ff8c00]" />
            Edit Coordinates & Info
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#0e0e12] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">WhatsApp Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#0e0e12] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/70 mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#0e0e12] border border-white/10 text-white focus:outline-none focus:border-[#ff8c00]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-amber px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'SAVING...' : 'SAVE CHANGES'}</span>
            </button>
          </div>
        </form>

        {/* Order History Section */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-accent">
            Order Dispatch History ({orders.length})
          </h4>

          {orders.length === 0 ? (
            <p className="text-xs text-white/40 py-4 text-center">No previous order dispatches on record.</p>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar">
              {orders.map((ord) => (
                <div key={ord.id} className="p-3.5 rounded-xl bg-[#14141a] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white font-mono">{ord.order_number}</span>
                      <Badge variant="gold">{ord.order_status}</Badge>
                    </div>
                    <span className="text-[10px] text-white/50 block mt-1">
                      {new Date(ord.created_at).toLocaleDateString('id-ID')} • {ord.items.length} Items • Rp {ord.total.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setIsProfileOpen(false);
                      openTrackingForOrder(ord);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#ff8c00] text-xs font-semibold flex items-center gap-1 border border-white/10 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track</span>
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
