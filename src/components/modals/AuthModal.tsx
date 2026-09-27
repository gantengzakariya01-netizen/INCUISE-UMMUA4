import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import { Lock, Mail, User, Phone, ShieldAlert, ArrowRight, KeyRound } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, showToast } = useUI();
  const { loginCustomer, loginAdmin, registerCustomer, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER' | 'ADMIN' | 'RESET'>('LOGIN');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await loginCustomer(email, password);
      if (res.success) {
        showToast('Selamat datang kembali di ICUISENE UMMU A4!', 'success');
        setIsAuthOpen(false);
      } else {
        showToast(res.error || 'Login gagal.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        showToast('Portal Admin berhasil diverifikasi. Selamat bertugas!', 'success');
        setIsAuthOpen(false);
      } else {
        showToast(res.error || 'Akses Portal Admin ditolak.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await registerCustomer(name, email, phone, password);
      if (res.success) {
        showToast('Pendaftaran akun keanggotaan VIP berhasil!', 'success');
        setIsAuthOpen(false);
      } else {
        showToast(res.error || 'Pendaftaran gagal.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await resetPassword(email);
      if (res.success) {
        showToast('Instruksi pemulihan kata sandi telah dikirimkan ke email Anda.', 'info');
        setActiveTab('LOGIN');
      } else {
        showToast(res.error || 'Gagal mereset kata sandi.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthOpen}
      onClose={() => setIsAuthOpen(false)}
      title="Autentikasi Keanggotaan Royal"
      subtitle="Akses akun VIP ICUISENE UMMU A4 atau Portal Administrasi."
    >
      <div className="space-y-6">
        
        {/* Tab Headers */}
        <div className="flex border-b border-[#d4af37]/20 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('LOGIN')}
            className={`pb-3 px-4 transition-all relative ${
              activeTab === 'LOGIN' ? 'text-[#d4af37] font-bold border-b-2 border-[#d4af37]' : 'text-white/60 hover:text-white'
            }`}
          >
            Masuk Pelanggan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('REGISTER')}
            className={`pb-3 px-4 transition-all relative ${
              activeTab === 'REGISTER' ? 'text-[#d4af37] font-bold border-b-2 border-[#d4af37]' : 'text-white/60 hover:text-white'
            }`}
          >
            Daftar VIP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ADMIN')}
            className={`pb-3 px-4 transition-all relative ${
              activeTab === 'ADMIN' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-amber-400/60 hover:text-amber-300'
            }`}
          >
            Portal Admin
          </button>
        </div>

        {/* Customer Login Form */}
        {activeTab === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-white/80">Kata Sandi</label>
                <button
                  type="button"
                  onClick={() => setActiveTab('RESET')}
                  className="text-[11px] text-[#d4af37] hover:underline"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{isSubmitting ? 'Verifikasi Sesi...' : 'Masuk Ke Akun Saya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Customer Register Form */}
        {activeTab === 'REGISTER' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap..."
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Nomor WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081298765432"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Buat Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{isSubmitting ? 'Mendaftarkan Keanggotaan...' : 'Daftar Keanggotaan VIP'}</span>
            </button>
          </form>
        )}

        {/* Admin Login Form */}
        {activeTab === 'ADMIN' && (
          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 animate-fade-in p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Akses Terbatas: Super Admin / Admin / Staff</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email Administrator</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cuisene-ummua4.id"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#180a2a] border border-amber-500/40 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Kata Sandi Otorisasi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#180a2a] border border-amber-500/40 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifikasi Otorisasi...' : 'Masuk Portal Admin'}</span>
            </button>
          </form>
        )}

        {/* Reset Password Form */}
        {activeTab === 'RESET' && (
          <form onSubmit={handleResetSubmit} className="space-y-4 animate-fade-in">
            <p className="text-xs text-[#bda8d6]">
              Masukkan alamat email Anda yang terdaftar untuk menerima tautan pemulihan kata sandi.
            </p>
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email Terdaftar</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('LOGIN')}
                className="text-xs text-white/60 hover:text-white"
              >
                Kembali ke Login
              </button>
              <button type="submit" className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold">
                Kirim Instruksi
              </button>
            </div>
          </form>
        )}

      </div>
    </Modal>
  );
};
