import React, { useState } from 'react';
import { Calculator, CheckCircle2, Sparkles, ShieldAlert } from 'lucide-react';
import { calculatePrice } from '../utils/calculator';
import type { PricingConfig } from '../types';

interface PricingSectionProps {
  config: PricingConfig;
  onOpenOrder: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ config, onOpenOrder }) => {
  const [interactiveCount, setInteractiveCount] = useState<number>(7);

  const { pairsCount, totalAmount } = calculatePrice(interactiveCount, config.pricePerPair);

  const examples = [
    { count: 2, pairs: 1, price: 40 },
    { count: 4, pairs: 2, price: 80 },
    { count: 6, pairs: 3, price: 120 },
    { count: 8, pairs: 4, price: 160 },
    { count: 10, pairs: 5, price: 200 },
    { count: 20, pairs: 10, price: 400 },
    { count: 50, pairs: 25, price: 1000 },
  ];

  return (
    <section style={{ padding: '70px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px' }}>
          <span className="badge-tag" style={{ marginBottom: '12px' }}>
            TRANSPARENT PRICING
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#0f172a' }}>
            Simple & Honest Pricing
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '8px' }}>
            Washing + Ironing included for every cloth with no hidden charges.
          </p>
        </div>

        {/* Main Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', borderRadius: '24px', padding: '32px', color: '#ffffff', boxShadow: '0 16px 30px rgba(2, 132, 199, 0.25)', marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '999px', fontSize: '0.88rem', fontWeight: '700', marginBottom: '16px' }}>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>🧺 Washing + Crisp Ironing</span>
              </div>
              <h3 style={{ fontSize: '2.8rem', color: '#ffffff', fontWeight: '800', lineHeight: 1.1, marginBottom: '8px' }}>
                ₹{config.pricePerPair} <span style={{ fontSize: '1.2rem', fontWeight: '500', opacity: 0.9 }}>/ 2 Clothes</span>
              </h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.5 }}>
                Doorstep Pickup & Delivery • Returned within {config.turnaroundHours} Hours guaranteed
              </p>
            </div>

            {/* Quick Interactive Calculator Box */}
            <div style={{ background: '#ffffff', color: '#0f172a', padding: '24px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: '700', fontSize: '0.95rem', marginBottom: '16px' }}>
                <Calculator className="w-5 h-5" />
                <span>Try Live Price Calculator</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>
                  <span>Number of Clothes:</span>
                  <span style={{ color: '#0284c7', fontWeight: '800', fontSize: '1.1rem' }}>{interactiveCount} Clothes</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={interactiveCount}
                  onChange={(e) => setInteractiveCount(parseInt(e.target.value) || 1)}
                  style={{ width: '100%', accentColor: '#0284c7', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Calculation breakdown:</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155', marginTop: '2px' }}>
                  {interactiveCount} Clothes → {pairsCount} Pair{pairsCount > 1 ? 's' : ''} × ₹{config.pricePerPair}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px dashed #e2e8f0', paddingTop: '14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '700' }}>Estimated Total:</span>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0284c7' }}>₹{totalAmount}</span>
              </div>

              <button
                onClick={onOpenOrder}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
              >
                Order {interactiveCount} Clothes Now (₹{totalAmount})
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Examples Table Grid */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 className="w-5 h-5 text-sky-600" />
            <span>Pricing Reference Table</span>
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '12px 16px', borderRadius: '8px 0 0 8px' }}>Number of Clothes</th>
                  <th style={{ padding: '12px 16px' }}>Pairs Calculated</th>
                  <th style={{ padding: '12px 16px' }}>Rate</th>
                  <th style={{ padding: '12px 16px', borderRadius: '0 8px 8px 0', textAlign: 'right' }}>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((ex, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '700' }}>{ex.count} Clothes</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{ex.pairs} Pair{ex.pairs > 1 ? 's' : ''}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>₹{config.pricePerPair} / 2 clothes</td>
                    <td style={{ padding: '12px 16px', fontWeight: '800', color: '#0284c7', textAlign: 'right', fontSize: '1.05rem' }}>₹{ex.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '20px', padding: '14px 18px', background: '#e0f2fe', borderRadius: '12px', border: '1px solid #bae6fd', fontSize: '0.88rem', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert className="w-5 h-5 text-sky-700 flex-shrink-0" />
            <div>
              <strong>Odd Number Rule:</strong> If you enter an odd number of clothes (e.g. 7 clothes), price is calculated using the next complete pair (7 Clothes = 4 Pairs = ₹160).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
