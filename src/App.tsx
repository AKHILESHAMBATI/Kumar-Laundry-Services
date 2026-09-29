import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { AboutUs } from './components/AboutUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { OrderTracker } from './components/OrderTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileBottomNav } from './components/MobileBottomNav';
import type { Order, OrderStatus, PricingConfig } from './types';
import {
  getStoredOrders,
  addOrder,
  updateOrderStatus,
  getStoredConfig,
  saveConfig,
} from './utils/storage';

export function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [config, setConfig] = useState<PricingConfig>(getStoredConfig());

  // Modal Visibility States
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    setOrders(getStoredOrders());
    setConfig(getStoredConfig());
  }, []);

  const handleOrderCreated = (newOrder: Order) => {
    const updated = addOrder(newOrder);
    setOrders(updated);
  };

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    const updated = updateOrderStatus(orderId, status);
    setOrders(updated);
  };

  const handleSaveConfig = (newConfig: PricingConfig) => {
    saveConfig(newConfig);
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Navigation */}
      <Header
        config={config}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenTrack={() => setIsTrackOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Homepage Sections */}
      <main>
        <Hero
          config={config}
          onOpenOrder={() => setIsOrderOpen(true)}
        />

        <HowItWorks />

        <PricingSection
          config={config}
          onOpenOrder={() => setIsOrderOpen(true)}
        />

        <AboutUs config={config} />

        <ContactSection config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Interactive Modals */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        config={config}
        onOrderCreated={handleOrderCreated}
      />

      <OrderTracker
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        orders={orders}
        config={config}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      {/* Fixed Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        config={config}
        onOpenOrder={() => setIsOrderOpen(true)}
      />
    </div>
  );
}

export default App;
