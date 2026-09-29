import React, { useState } from 'react';
import { X, Search, AlertCircle } from 'lucide-react';
import type { Order, OrderStatus, PricingConfig } from '../types';
import { calculateExpectedReturn } from '../utils/calculator';

interface OrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  config: PricingConfig;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  isOpen,
  onClose,
  orders,
  config,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedOrders, setMatchedOrders] = useState<Order[] | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = orders.filter(
      (ord) =>
        ord.id.toLowerCase().includes(query) ||
        ord.customer.phone.includes(query) ||
        ord.customer.fullName.toLowerCase().includes(query)
    );

    setMatchedOrders(found);
  };

  const statusList: OrderStatus[] = [
    'New',
    'Pickup Scheduled',
    'Clothes Received',
    'Washing',
    'Ironing',
    'Ready',
    'Out for Delivery',
    'Delivered',
  ];

  const getStatusIndex = (st: OrderStatus) => statusList.indexOf(st);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ padding: '28px', maxWidth: '700px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
                Track Your Laundry Order
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Enter your Order ID (e.g. PKL-894102) or Phone Number
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Order ID (PKL-XXXXXX) or Phone Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>

        {/* Search Results */}
        {matchedOrders !== null && (
          <div>
            {matchedOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <AlertCircle className="w-10 h-10 text-amber-500" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a' }}>No matching orders found</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                  Please check your Order ID or phone number and try again, or call <strong>{config.businessPhone}</strong>.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {matchedOrders.map((ord) => {
                  const currentIdx = getStatusIndex(ord.status);
                  const expected = calculateExpectedReturn(ord.expectedReturnDate, config.turnaroundHours);

                  return (
                    <div key={ord.id} className="card" style={{ padding: '20px', background: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0284c7' }}>{ord.id}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Customer: {ord.customer.fullName} • {ord.laundry.clothesCount} Clothes</div>
                        </div>
                        <span className={`status-pill status-${ord.status.replace(/\s+/g, '')}`}>
                          {ord.status}
                        </span>
                      </div>

                      {/* Timeline Stepper */}
                      <div style={{ margin: '20px 0' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '12px' }}>
                          LIVE ORDER PROGRESS TIMELINE:
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                          {statusList.map((st, idx) => {
                            const isDone = idx <= currentIdx;
                            const isCurrent = idx === currentIdx;

                            return (
                              <div
                                key={st}
                                style={{
                                  padding: '8px 6px',
                                  borderRadius: '8px',
                                  background: isCurrent ? '#0284c7' : isDone ? '#e0f2fe' : '#f1f5f9',
                                  color: isCurrent ? '#ffffff' : isDone ? '#0369a1' : '#94a3b8',
                                  textAlign: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: isCurrent || isDone ? '700' : '500',
                                  border: isCurrent ? '1px solid #0284c7' : '1px solid transparent',
                                }}
                              >
                                {st}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Estimated Total:</div>
                          <div style={{ fontWeight: '800', color: '#16a34a' }}>₹{ord.totalAmount}</div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Expected Return Time:</div>
                          <div style={{ fontWeight: '700', color: '#075985' }}>{expected.formattedReturnTime}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
