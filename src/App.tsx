import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';

import { OpeningLoader } from './components/ui/OpeningLoader';
import { CustomCursor } from './components/ui/CustomCursor';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { ToastContainer } from './components/ui/ToastContainer';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Home Sections
import { Hero } from './components/home/Hero';
import { ScrollJourney } from './components/home/ScrollJourney';
import { BrandStatement } from './components/home/BrandStatement';
import { ProductShowcase } from './components/home/ProductShowcase';
import { MenuCatalog } from './components/home/MenuCatalog';
import { BrandStory } from './components/home/BrandStory';
import { KitchenExperience } from './components/home/KitchenExperience';
import { FoodCinematic } from './components/home/FoodCinematic';
import { PromoSection } from './components/home/PromoSection';
import { LocationsSection } from './components/home/LocationsSection';
import { ReviewsSection } from './components/home/ReviewsSection';

// Global Interactive Modals & Drawers
import { FoodDetailModal } from './components/modals/FoodDetailModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { OrderTrackingModal } from './components/modals/OrderTrackingModal';
import { AuthModal } from './components/modals/AuthModal';
import { CustomerProfileModal } from './components/modals/CustomerProfileModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

export const AppContent: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#faf7f2] flex flex-col font-sans selection:bg-[#ff8c00] selection:text-black overflow-x-hidden relative">
      {/* Cinematic Opening Loader */}
      {!loaderComplete && (
        <OpeningLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating WhatsApp VIP Concierge */}
      <WhatsAppButton />

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Main Navbar Header */}
      <Navbar />

      {/* Main Cinematic Sections */}
      <main className="flex-1">
        {/* 1. Fullscreen Cinematic Hero */}
        <Hero />

        {/* 2. Interactive Scroll Transformation Journey */}
        <ScrollJourney />

        {/* 3. High-Impact Giant Manifesto Statement */}
        <BrandStatement />

        {/* 4. Fullscreen Product Showcase (01 Crispy, 02 Grilled, 03 Roasted, 04 Burger) */}
        <ProductShowcase />

        {/* 5. Complete Searchable & Filterable Menu Catalog */}
        <MenuCatalog />

        {/* 6. Brand Story & 4 Pillars */}
        <BrandStory />

        {/* 7. Culinary Sequence / Kitchen Experience */}
        <KitchenExperience />

        {/* 8. Food Cinematic Visual Appetite Grid */}
        <FoodCinematic />

        {/* 9. Exclusive Promos & Voucher Claim */}
        <PromoSection />

        {/* 10. Flagship Hub Outlets */}
        <LocationsSection />

        {/* 11. Patron Reviews & Testimonials */}
        <ReviewsSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Interactive Global Modals */}
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
