import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';

import { ToastContainer } from './components/ui/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/home/Hero';
import { FeaturedMenu } from './components/home/FeaturedMenu';
import { CategoriesSection } from './components/home/CategoriesSection';
import { BestSellersSection } from './components/home/BestSellersSection';
import { PromoSection } from './components/home/PromoSection';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { ReviewsSection } from './components/home/ReviewsSection';
import { LocationSection } from './components/home/LocationSection';
import { CTASection } from './components/home/CTASection';

import { FoodDetailModal } from './components/modals/FoodDetailModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { OrderTrackingModal } from './components/modals/OrderTrackingModal';
import { AuthModal } from './components/modals/AuthModal';
import { CustomerProfileModal } from './components/modals/CustomerProfileModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0416] text-[#f4efe8] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#0b0416] overflow-x-hidden">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Main Navbar Header */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero />
        <FeaturedMenu />
        <CategoriesSection />
        <BestSellersSection />
        <PromoSection />
        <WhyChooseUs />
        <ReviewsSection />
        <LocationSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Interactive Modals & Drawers */}
      <FoodDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <AuthModal />
      <CustomerProfileModal />
      <AdminDashboardModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <AppContent />
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
