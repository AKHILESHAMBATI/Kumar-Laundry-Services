import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import type { PricingConfig } from '../types';

interface MobileBottomNavProps {
  config: PricingConfig;
  onOpenOrder: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ config, onOpenOrder }) => {
  const whatsappUrl = `https://wa.me/91${config.businessPhone}?text=${encodeURIComponent(
    'Hello Praveen Kumar Laundry Services, I would like to place a laundry order.'
  )}`;

  return (
    <div className="mobile-bottom-bar">
      <a href={`tel:${config.businessPhone}`} className="mobile-nav-btn call">
        <Phone className="w-5 h-5" />
        <span>Call Now</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-nav-btn whatsapp"
      >
        <MessageSquare className="w-5 h-5" />
        <span>WhatsApp</span>
      </a>

      <button onClick={onOpenOrder} className="mobile-nav-btn primary">
        <Sparkles className="w-5 h-5" />
        <span>Order Laundry</span>
      </button>
    </div>
  );
};
