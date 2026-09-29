import React from 'react';
import { ClipboardList, Truck, Shirt, CheckCircle } from 'lucide-react';

interface StepItem {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const steps: StepItem[] = [
  {
    num: '01',
    title: 'Place Your Order',
    desc: 'Enter your details and number of clothes.',
    icon: ClipboardList,
    color: '#0284c7',
    bg: '#e0f2fe',
  },
  {
    num: '02',
    title: 'Doorstep Pickup',
    desc: 'Our team collects your clothes from your provided address.',
    icon: Truck,
    color: '#0d9488',
    bg: '#ccfbf1',
  },
  {
    num: '03',
    title: 'Washing & Ironing',
    desc: 'Your clothes are professionally washed and ironed.',
    icon: Shirt,
    color: '#7c3aed',
    bg: '#ede9fe',
  },
  {
    num: '04',
    title: 'Doorstep Delivery',
    desc: 'Your cleaned clothes are returned within 48 hours.',
    icon: CheckCircle,
    color: '#16a34a',
    bg: '#dcfce7',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section style={{ padding: '70px 0', background: '#ffffff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 48px' }}>
          <span style={{ color: '#0284c7', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            SIMPLE & FAST
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '6px', color: '#0f172a' }}>
            How It Works
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '8px' }}>
            Get your laundry done in 4 simple steps without stepping out of your home.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="card"
                style={{
                  position: 'relative',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: step.bg,
                      color: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#cbd5e1', fontFamily: 'var(--font-heading)' }}>
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f172a' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.5' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
