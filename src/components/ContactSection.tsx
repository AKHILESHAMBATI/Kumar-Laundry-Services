import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ExternalLink } from 'lucide-react';
import type { PricingConfig } from '../types';

interface ContactSectionProps {
  config: PricingConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Old Adivivaram, Visakhapatnam, Andhra Pradesh')}`;
  const whatsappUrl = `https://wa.me/91${config.businessPhone}?text=${encodeURIComponent('Hello Praveen Kumar Laundry Services, I would like to inquire about laundry pickup.')}`;

  return (
    <section id="contact-section" style={{ padding: '70px 0', background: '#f8fafc' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 48px' }}>
          <span className="badge-tag" style={{ marginBottom: '12px' }}>
            GET IN TOUCH
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#0f172a' }}>
            Contact & Shop Location
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '8px' }}>
            Have questions or need urgent laundry pickup? Reach out to us directly.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '850px', margin: '0 auto', padding: '36px', background: '#ffffff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            
            {/* Contact Details */}
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '20px' }}>
                {config.businessName}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>SHOP ADDRESS</div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '1rem', marginTop: '2px' }}>
                      📍 Old Adivivaram, Visakhapatnam, Andhra Pradesh
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>PHONE NUMBER</div>
                    <a href={`tel:${config.businessPhone}`} style={{ fontWeight: '700', color: '#0284c7', fontSize: '1.1rem', marginTop: '2px', display: 'inline-block' }}>
                      📞 {config.businessPhone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>TURNAROUND TIME</div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '1rem', marginTop: '2px' }}>
                      🕒 Laundry return time: Within 48 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '8px' }}>
                Quick Direct Actions:
              </h4>

              <a
                href={`tel:${config.businessPhone}`}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone className="w-5 h-5" />
                <span>Call Laundry ({config.businessPhone})</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
