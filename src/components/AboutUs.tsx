import React from 'react';
import { ShieldCheck, HeartHandshake, MapPin, Clock } from 'lucide-react';
import type { PricingConfig } from '../types';

interface AboutUsProps {
  config: PricingConfig;
}

export const AboutUs: React.FC<AboutUsProps> = ({ config }) => {
  return (
    <section style={{ padding: '70px 0', background: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className="badge-tag" style={{ marginBottom: '12px' }}>
              ABOUT PRAVEEN KUMAR LAUNDRY
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '16px' }}>
              Your Local Laundry Partner
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
              Praveen Kumar Laundry Services provides convenient washing and ironing with doorstep pickup and delivery, making laundry easier for customers in Visakhapatnam, initially focusing on Old Adivivaram and nearby areas.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
              Owned and managed by Praveen Kumar, our goal is to save you time and hassle by taking care of your everyday washing and ironing needs right from your doorstep.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <MapPin className="w-5 h-5 text-sky-600" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '1rem', color: '#0f172a' }}>Local Service Area</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Serving Old Adivivaram & nearby Visakhapatnam neighborhoods.</p>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <Clock className="w-5 h-5 text-teal-600" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '1rem', color: '#0f172a' }}>48-Hour Return</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Prompt processing and doorstep return within 48 hours.</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)', border: '1.5px solid #bae6fd', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Reliable Local Care</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Direct owner contact & accountability</p>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>BUSINESS OWNER</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>{config.ownerName}</div>
              <div style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: '600', marginTop: '4px' }}>📞 {config.businessPhone}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
              <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span>Dedicated to honest pricing, quick response, and personal care for your garments.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
