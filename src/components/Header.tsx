import React from 'react';
import { Shirt, Phone, Search, ShieldCheck, Sparkles } from 'lucide-react';
import type { PricingConfig } from '../types';

interface HeaderProps {
  config: PricingConfig;
  onOpenOrder: () => void;
  onOpenTrack: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenOrder,
  onOpenTrack,
  onOpenAdmin,
}) => {
  return (
    <header className="header">
      <div className="container nav-container">
        <div className="logo-group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <Shirt className="w-6 h-6" />
          </div>
          <div>
            <div className="logo-title">{config.businessName}</div>
            <div className="logo-subtitle">Washing + Ironing • Visakhapatnam</div>
          </div>
        </div>

        <div className="nav-actions">
          <a
            href={`tel:${config.businessPhone}`}
            className="call-pill hidden-mobile"
            title="Call Laundry"
          >
            <Phone className="w-4 h-4 text-sky-600" />
            <span>{config.businessPhone}</span>
          </a>

          <button
            onClick={onOpenTrack}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Search className="w-4 h-4" />
            <span className="hidden-mobile">Track Order</span>
          </button>

          <button
            onClick={onOpenOrder}
            className="btn-primary pulse-badge"
            style={{ padding: '9px 20px', fontSize: '0.92rem' }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Order Laundry</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <span className="hidden-mobile">Owner Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
