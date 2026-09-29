import React from 'react';
import { Phone, Sparkles, Clock, CheckCircle2, MapPin, Truck } from 'lucide-react';
import type { PricingConfig } from '../types';

interface HeroProps {
  config: PricingConfig;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenOrder }) => {
  return (
    <section className="hero-section" style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Hero Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: '#e0f2fe', borderRadius: '999px', border: '1px solid #bae6fd', color: '#0369a1', fontWeight: '700', fontSize: '0.9rem', marginBottom: '20px' }}>
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Old Adivivaram & Visakhapatnam</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#0f172a', marginBottom: '20px', lineHeight: 1.15 }}>
              Clean Clothes. Fresh Look. <br />
              <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Delivered to Your Door.
              </span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '28px', maxWidth: '580px', lineHeight: 1.6 }}>
              Professional washing and ironing service with convenient doorstep pickup and delivery in Visakhapatnam.
            </p>

            {/* Prominent Pricing Banner */}
            <div style={{ background: '#ffffff', border: '2px solid #38bdf8', borderRadius: '16px', padding: '16px 20px', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', boxShadow: '0 8px 20px rgba(2, 132, 199, 0.1)' }}>
              <div style={{ background: '#0284c7', color: 'white', padding: '10px 16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800' }}>
                <div style={{ fontSize: '1.4rem', lineHeight: '1' }}>₹{config.pricePerPair}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>FOR 2 CLOTHES</div>
              </div>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🧺 Washing + Ironing</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#0284c7', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Clock className="w-4 h-4" />
                  <span>{config.turnaroundHours}-Hour Guaranteed Return</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={onOpenOrder}
                className="btn-primary pulse-badge"
                style={{ padding: '16px 32px', fontSize: '1.1rem' }}
              >
                <Sparkles className="w-5 h-5" />
                <span>Order Laundry Now</span>
              </button>

              <a
                href={`tel:${config.businessPhone}`}
                className="btn-secondary"
                style={{ padding: '16px 28px', fontSize: '1.1rem' }}
              >
                <Phone className="w-5 h-5 text-sky-600" />
                <span>Call Now ({config.businessPhone})</span>
              </a>
            </div>
          </div>

          {/* Right Feature Card Visual */}
          <div style={{ position: 'relative' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', border: '1.5px solid #bae6fd', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Doorstep Express Service</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Fast pickup & delivery across Visakhapatnam</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Fixed ₹40 per 2 clothes formula</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Includes crisp ironing & neat folding</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Returned in under 48 Hours guaranteed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>No payment required upfront (Pay on delivery)</span>
                </div>
              </div>

              {/* Owner Trust Badge */}
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SERVICE MANAGED BY</div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>Praveen Kumar</div>
                </div>
                <div style={{ marginLeft: 'auto', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>
                  Verified Local Business
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
