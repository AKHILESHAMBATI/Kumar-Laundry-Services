import React from 'react';
import { Shirt, ShieldCheck } from 'lucide-react';
import type { PricingConfig } from '../types';

interface FooterProps {
  config: PricingConfig;
  onOpenAdmin: () => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin, onOpenOrder }) => {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '50px 0 24px', borderTop: '1px solid #1e293b' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shirt className="w-5 h-5" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800 }}>
                {config.businessName}
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94a3b8' }}>
              Professional washing and ironing service with convenient doorstep pickup and delivery in Visakhapatnam.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '14px' }}>Service Info</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li>🧺 Washing + Ironing</li>
              <li>⚡ ₹{config.pricePerPair} per 2 clothes</li>
              <li>🚚 Free Doorstep Pickup & Delivery</li>
              <li>🕒 Returned within 48 Hours</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '14px' }}>Shop & Owner</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <div>👤 Owner: {config.ownerName}</div>
              <div>📍 Address: {config.shopAddress}</div>
              <div>📞 Phone: {config.businessPhone}</div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '14px' }}>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={onOpenOrder}
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: '0.9rem' }}
              >
                Order Laundry Now
              </button>

              <button
                onClick={onOpenAdmin}
                style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Owner Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: '#64748b' }}>
          © {new Date().getFullYear()} {config.businessName}. All rights reserved. • Visakhapatnam, Andhra Pradesh
        </div>
      </div>
    </footer>
  );
};
