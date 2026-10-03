import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { Modal } from '../ui/Modal';
import { Lock, Mail, User, Phone, ShieldAlert, ArrowRight, KeyRound, Sparkles, Flame } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, authInitialTab, setIsAdminOpen, showToast } = useUI();
  const { loginCustomer, loginAdmin, registerCustomer, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER' | 'ADMIN' | 'RESET'>('LOGIN');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthOpen && authInitialTab) {
      setActiveTab(authInitialTab);
      if (authInitialTab === 'ADMIN') {
        setEmail('AMALIA ROSVALITA');
        setPassword('akhsya.ais.afi.aira');
      }
    }
  }, [isAuthOpen, authInitialTab]);

  if (!isAuthOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsSubmitting(true);
    try {
      const res = await loginCustomer(email, password);
      if (res.success) {
        soundEffects.playSuccess();
        showToast('Welcome back to Muscle Chicken Indonesia!', 'success');
        setIsAuthOpen(false);
      } else {
        showToast(res.error || 'Login failed.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsSubmitting(true);
    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        soundEffects.playSuccess();
        showToast('Authorized as Super Admin AMALIA ROSVALITA! Launching Terminal...', 'success');
        setIsAuthOpen(false);
        setIsAdminOpen(true);
      } else {
        showToast(res.error || 'Access denied. Invalid credentials.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsSubmitting(true);
    try {
      const res = await registerCustomer(name, email, phone, password);
      if (res.success) {
        soundEffects.playSuccess();
        showToast('Beast Club membership registered successfully!', 'success');
        setIsAuthOpen(false);
      } else {
        showToast(res.error || 'Registration failed.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsSubmitting(true);
    try {
      const res = await resetPassword(email);
      if (res.success) {
        soundEffects.playSuccess();
        showToast('Password recovery instructions sent to your email.', 'info');
        setActiveTab('LOGIN');
      } else {
        showToast(res.error || 'Failed to send recovery email.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthOpen}
      onClose={() => {
        soundEffects.playClick();
        setIsAuthOpen(false);
      }}
      title="BEAST PORTAL ACCESS"
      subtitle="Sign into your Patron Account or unlock the Executive Management Terminal."
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        
        {/* Tab Headers */}
        <div className="flex border-b border-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('LOGIN');
            }}
            className={`pb-3 px-4 transition-all relative font-accent ${
              activeTab === 'LOGIN' ? 'text-[#ff8c00] font-bold border-b-2 border-[#ff8c00]' : 'text-white/50 hover:text-white'
            }`}
          >
            Patron Login
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('REGISTER');
            }}
            className={`pb-3 px-4 transition-all relative font-accent ${
              activeTab === 'REGISTER' ? 'text-[#ff8c00] font-bold border-b-2 border-[#ff8c00]' : 'text-white/50 hover:text-white'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('ADMIN');
              setEmail('AMALIA ROSVALITA');
              setPassword('akhsya.ais.afi.aira');
            }}
            className={`pb-3 px-4 transition-all relative font-accent flex items-center gap-1.5 ${
              activeTab === 'ADMIN' ? 'text-[#d8b26e] font-bold border-b-2 border-[#d8b26e]' : 'text-[#d8b26e]/60 hover:text-[#d8b26e]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#d8b26e]" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Customer Login Form */}
        {activeTab === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#ff8c00]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-white/80">Secret Key / Password</label>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveTab('RESET');
                  }}
                  className="text-[11px] text-[#ff8c00] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#ff8c00]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-amber py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg tracking-wider"
            >
              <span>{isSubmitting ? 'AUTHENTICATING...' : 'SIGN IN TO MUSCLE CHICKEN'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Customer Register Form */}
        {activeTab === 'REGISTER' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-[#ff8c00]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Zack Muscle"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#ff8c00]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">WhatsApp Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-[#ff8c00]" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#ff8c00]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-amber py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg tracking-wider"
            >
              <span>{isSubmitting ? 'JOINING...' : 'REGISTER BEAST ACCOUNT'}</span>
            </button>
          </form>
        )}

        {/* Admin Login Form */}
        {activeTab === 'ADMIN' && (
          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 animate-fade-in p-5 rounded-2xl bg-[#181822] border border-[#d8b26e]/40 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-[#d8b26e] text-xs font-bold font-accent">
                <ShieldAlert className="w-4 h-4 text-[#d8b26e]" />
                <span>Executive Terminal: AMALIA ROSVALITA</span>
              </div>
            </div>

            {/* Quick Fill Box */}
            <div className="p-3 rounded-xl bg-[#d8b26e]/10 border border-[#d8b26e]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="text-[11px] text-white/80 leading-tight">
                <div><span className="text-white/50">Admin:</span> <strong className="text-white">AMALIA ROSVALITA</strong></div>
                <div><span className="text-white/50">Pass:</span> <strong className="text-[#d8b26e] font-mono">akhsya.ais.afi.aira</strong></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setEmail('AMALIA ROSVALITA');
                  setPassword('akhsya.ais.afi.aira');
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#d8b26e]/20 hover:bg-[#d8b26e]/30 text-[#d8b26e] text-[10px] font-bold border border-[#d8b26e]/40 flex items-center gap-1 transition-all shrink-0"
              >
                <Sparkles className="w-3 h-3 text-[#d8b26e]" />
                <span>Auto Fill</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/90 mb-1">Username / Identifier</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="AMALIA ROSVALITA"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#121216] border border-[#d8b26e]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d8b26e] focus:ring-1 focus:ring-[#d8b26e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/90 mb-1">Security Passphrase</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="akhsya.ais.afi.aira"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#121216] border border-[#d8b26e]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#d8b26e] focus:ring-1 focus:ring-[#d8b26e] font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#d8b26e] via-[#e5c583] to-[#c79e56] hover:brightness-110 text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(216,178,110,0.3)] transition-all uppercase tracking-wider"
            >
              <KeyRound className="w-4 h-4 text-black" />
              <span>{isSubmitting ? 'VERIFYING...' : 'AUTHORIZE AS AMALIA ROSVALITA'}</span>
            </button>
          </form>
        )}

        {/* Reset Password Form */}
        {activeTab === 'RESET' && (
          <form onSubmit={handleResetSubmit} className="space-y-4 animate-fade-in">
            <p className="text-xs text-white/60">
              Enter your registered patron email address to receive password reset instructions.
            </p>
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Registered Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@gmail.com"
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#121216] border border-white/15 text-white focus:outline-none focus:border-[#ff8c00]"
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('LOGIN');
                }}
                className="text-xs text-white/60 hover:text-white"
              >
                Back to Login
              </button>
              <button type="submit" className="btn-amber px-6 py-2.5 rounded-xl text-xs font-bold">
                Send Reset Link
              </button>
            </div>
          </form>
        )}

      </div>
    </Modal>
  );
};
