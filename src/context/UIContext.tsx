import React, { createContext, useContext, useState } from 'react';
import type { Product, Order } from '../types';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UIContextType {
  // Active Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authInitialTab: 'LOGIN' | 'REGISTER' | 'ADMIN' | 'RESET';
  openAuthModal: (tab?: 'LOGIN' | 'REGISTER' | 'ADMIN' | 'RESET') => void;

  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingOrder: Order | null;
  openTrackingForOrder: (order: Order) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  selectedFoodModal: Product | null;
  setSelectedFoodModal: (product: Product | null) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategorySlug: string;
  setSelectedCategorySlug: (slug: string) => void;

  // Toast System
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'LOGIN' | 'REGISTER' | 'ADMIN' | 'RESET'>('LOGIN');

  const openAuthModal = (tab: 'LOGIN' | 'REGISTER' | 'ADMIN' | 'RESET' = 'LOGIN') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedFoodModal, setSelectedFoodModal] = useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openTrackingForOrder = (order: Order) => {
    setTrackingOrder(order);
    setIsTrackingOpen(true);
  };

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        authInitialTab,
        openAuthModal,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingOrder,
        openTrackingForOrder,
        isAdminOpen,
        setIsAdminOpen,
        selectedFoodModal,
        setSelectedFoodModal,
        searchQuery,
        setSearchQuery,
        selectedCategorySlug,
        setSelectedCategorySlug,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
