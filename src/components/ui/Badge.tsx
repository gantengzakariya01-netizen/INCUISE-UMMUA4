import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'purple' | 'success' | 'warning' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#d4af37]/20 to-[#996515]/30 text-[#f3e5ab] border border-[#d4af37]/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]',
    purple: 'bg-gradient-to-r from-[#6b21a8]/30 to-[#341261]/50 text-[#e6dbf8] border border-[#9333ea]/30',
    success: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40',
    warning: 'bg-amber-950/60 text-amber-300 border border-amber-500/40',
    outline: 'bg-black/30 text-white/80 border border-white/20'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
