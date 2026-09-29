import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  User,
  Shirt,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Home,
  Check,
  Phone
} from 'lucide-react';
import type { Order, PricingConfig } from '../types';
import {
  calculatePrice,
  calculateExpectedReturn,
  generateOrderId,
  buildWhatsAppMessage,
} from '../utils/calculator';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PricingConfig;
  onOrderCreated: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  config,
  onOrderCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Customer State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetArea, setStreetArea] = useState('Old Adivivaram');
  const [city, setCity] = useState('Visakhapatnam');
  const [pincode, setPincode] = useState('530028');
  const [landmark, setLandmark] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Laundry State
  const [clothesCount, setClothesCount] = useState<number>(6);
  const [pickupRequired, setPickupRequired] = useState<boolean>(true);
  const [deliveryRequired, setDeliveryRequired] = useState<boolean>(true);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Confirmed Order object
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const fullAddress = `${houseNo ? houseNo + ', ' : ''}${streetArea}, ${landmark ? 'Near ' + landmark + ', ' : ''}${city} - ${pincode}`;

  const { pairsCount, totalAmount } = calculatePrice(clothesCount, config.pricePerPair);
  const expectedTimes = calculateExpectedReturn(undefined, config.turnaroundHours);

  // Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!houseNo.trim()) errs.houseNo = 'Please enter house/flat number';
    if (!streetArea.trim()) errs.streetArea = 'Please enter street or area';
    if (!pincode.trim()) errs.pincode = 'Please enter pincode';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleNextToStep3 = () => {
    if (clothesCount <= 0) {
      alert('Please enter at least 1 cloth');
      return;
    }
    setStep(3);
  };

  const handleConfirmOrder = () => {
    const newOrder: Order = {
      id: generateOrderId(),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        whatsappNumber: whatsappNumber.trim() || undefined,
        houseNo: houseNo.trim(),
        streetArea: streetArea.trim(),
        city: city.trim() || 'Visakhapatnam',
        pincode: pincode.trim(),
        landmark: landmark.trim() || undefined,
        fullAddress,
      },
      laundry: {
        clothesCount,
        serviceType: 'Washing + Ironing',
        pickupRequired,
        deliveryRequired,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      pricePerPair: config.pricePerPair,
      pairsCount,
      totalAmount,
      orderDate: new Date().toISOString(),
      expectedReturnDate: expectedTimes.returnISO,
      status: 'New',
      statusHistory: [{ status: 'New', timestamp: new Date().toISOString() }],
      paymentStatus: 'Pending',
    };

    onOrderCreated(newOrder);
    setConfirmedOrder(newOrder);
    setStep(4);

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignore if confetti unavailable
    }
  };

  const resetForm = () => {
    setStep(1);
    setFullName('');
    setPhone('');
    setHouseNo('');
    setLandmark('');
    setSpecialInstructions('');
    setConfirmedOrder(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Build WhatsApp text link for confirmed order
  const getWhatsAppLink = (ord: Order) => {
    const encoded = buildWhatsAppMessage({
      id: ord.id,
      customerName: ord.customer.fullName,
      phone: ord.customer.phone,
      clothesCount: ord.laundry.clothesCount,
      fullAddress: ord.customer.fullAddress,
      landmark: ord.customer.landmark,
      totalAmount: ord.totalAmount,
      expectedReturnFormatted: calculateExpectedReturn(ord.expectedReturnDate, config.turnaroundHours).formattedReturnTime,
      specialInstructions: ord.laundry.specialInstructions,
    });
    return `https://wa.me/91${config.businessPhone}?text=${encoded}`;
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-content" style={{ padding: '28px' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
                {step === 4 ? 'Order Confirmation' : 'Place Laundry Order'}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {config.businessName} • ₹{config.pricePerPair} / 2 Clothes
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar (Only for steps 1 to 3) */}
        {step <= 3 && (
          <div className="stepper">
            <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
              <div className="step-circle">{step > 1 ? <Check className="w-4 h-4" /> : '1'}</div>
              <span className="step-label">Details</span>
            </div>
            <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
              <div className="step-circle">{step > 2 ? <Check className="w-4 h-4" /> : '2'}</div>
              <span className="step-label">Clothes & Price</span>
            </div>
            <div className={`step-item ${step === 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span className="step-label">Review & Confirm</span>
            </div>
          </div>
        )}

        {/* STEP 1: Customer Info */}
        {step === 1 && (
          <form onSubmit={handleNextToStep2}>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User className="w-4 h-4 text-sky-600" />
              <span>1. Customer & Pickup Address Information</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Praveen Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g. 9441891963"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Number (Optional)</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Same as mobile if blank"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">House / Flat No *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="D.No 4-12"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                />
                {errors.houseNo && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.houseNo}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Street / Area *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Old Adivivaram / Simhachalam"
                  value={streetArea}
                  onChange={(e) => setStreetArea(e.target.value)}
                />
                {errors.streetArea && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.streetArea}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Landmark (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Near Temple / Bank"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pincode *</label>
                <input
                  type="text"
                  className="form-input"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                {errors.pincode && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.pincode}</span>}
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
                <span>Continue to Clothes & Price</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Laundry Details & Calculation */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shirt className="w-4 h-4 text-sky-600" />
              <span>2. Select Clothes & Instant Price Calculation</span>
            </div>

            {/* Clothes Counter Selector */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <label className="form-label" style={{ fontSize: '1rem', fontWeight: '700' }}>
                Number of Clothes to Wash & Iron:
              </label>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '14px 0' }}>
                <button
                  type="button"
                  onClick={() => setClothesCount(Math.max(1, clothesCount - 1))}
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', border: '2px solid #cbd5e1', fontWeight: '800', fontSize: '1.2rem', color: '#334155' }}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="200"
                  className="form-input"
                  style={{ width: '100px', textAlign: 'center', fontSize: '1.4rem', fontWeight: '800', color: '#0284c7' }}
                  value={clothesCount}
                  onChange={(e) => setClothesCount(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  type="button"
                  onClick={() => setClothesCount(clothesCount + 1)}
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#0284c7', border: 'none', fontWeight: '800', fontSize: '1.2rem', color: '#ffffff' }}
                >
                  +
                </button>
              </div>

              {/* Quick Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center' }}>Presets:</span>
                {[4, 6, 8, 10, 15, 20, 30].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setClothesCount(preset)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      background: clothesCount === preset ? '#0284c7' : '#ffffff',
                      color: clothesCount === preset ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    {preset} Clothes
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculation Display Box */}
            <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', color: '#ffffff', padding: '20px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 6px 18px rgba(2,132,199,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.9 }}>AUTOMATIC PRICING BREAKDOWN</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '999px', fontWeight: '700' }}>
                  ₹{config.pricePerPair} / 2 Clothes
                </span>
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>
                {clothesCount} Clothes → {pairsCount} Pair{pairsCount > 1 ? 's' : ''} × ₹{config.pricePerPair}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: '10px', marginTop: '10px' }}>
                <span style={{ fontSize: '1rem', fontWeight: '600' }}>Estimated Total:</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', marginLeft: 'auto' }}>₹{totalAmount}</span>
              </div>
            </div>

            {/* Service Toggles & Special Instructions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={pickupRequired}
                  onChange={(e) => setPickupRequired(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#0284c7' }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Doorstep Pickup Required</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={deliveryRequired}
                  onChange={(e) => setDeliveryRequired(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#0284c7' }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Doorstep Delivery Required</span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Special Instructions (Optional)</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="e.g. Extra starch for white shirts, separate color wash, fold only"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ padding: '10px 20px' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextToStep3}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                <span>Review Order Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Review & Confirmation */}
        {step === 3 && (
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>3. Review & Confirm Your Laundry Order</span>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>CUSTOMER NAME</div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '1.05rem' }}>{fullName}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>PHONE NUMBER</div>
                  <div style={{ fontWeight: '700', color: '#0284c7', fontSize: '1.05rem' }}>📞 {phone}</div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>COMPLETE PICKUP ADDRESS</div>
                <div style={{ fontWeight: '600', color: '#334155', fontSize: '0.95rem', marginTop: '2px' }}>
                  📍 {fullAddress}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>SERVICE SELECTED</div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.92rem' }}>Washing + Ironing</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>NUMBER OF CLOTHES</div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.92rem' }}>{clothesCount} Clothes ({pairsCount} Pairs)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>PRICE PER 2 CLOTHES</div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.92rem' }}>₹{config.pricePerPair}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>PICKUP & DELIVERY</div>
                  <div style={{ fontWeight: '700', color: '#0d9488', fontSize: '0.92rem' }}>Doorstep (Free)</div>
                </div>
              </div>

              {/* Dynamic 48-Hour Return Calculation Banner */}
              <div style={{ marginTop: '16px', background: '#e0f2fe', padding: '12px 16px', borderRadius: '12px', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock className="w-5 h-5 text-sky-700 flex-shrink-0" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '700' }}>EXPECTED RETURN TIME (48 HOURS)</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#075985' }}>
                    {expectedTimes.formattedReturnTime}
                  </div>
                </div>
              </div>

              {specialInstructions && (
                <div style={{ marginTop: '12px', fontSize: '0.88rem', color: '#475569', background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <strong>Special Instructions:</strong> {specialInstructions}
                </div>
              )}
            </div>

            {/* Total Footer Banner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#0284c7', color: 'white', borderRadius: '14px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>ESTIMATED TOTAL AMOUNT</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>₹{totalAmount}</div>
              </div>
              <div style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '999px', fontWeight: '700' }}>
                Pay Cash/UPI on Delivery
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary"
                style={{ padding: '10px 20px' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmOrder}
                className="btn-primary pulse-badge"
                style={{ padding: '14px 32px', fontSize: '1.05rem', background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirm Laundry Order</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Order Confirmation Screen */}
        {step === 4 && confirmedOrder && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '6px' }}>
              Your laundry order has been received!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '24px' }}>
              Thank you {confirmedOrder.customer.fullName}. Praveen Kumar will collect your clothes shortly.
            </p>

            {/* Order Confirmation Card */}
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '18px', border: '1px solid #cbd5e1', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px dashed #cbd5e1', paddingBottom: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>ORDER ID</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0284c7' }}>{confirmedOrder.id}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>TOTAL ESTIMATED</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#16a34a' }}>₹{confirmedOrder.totalAmount}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Customer Name:</div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>{confirmedOrder.customer.fullName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Number of Clothes:</div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>{confirmedOrder.laundry.clothesCount} Clothes</div>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Pickup Address:</div>
                <div style={{ fontWeight: '600', color: '#334155', fontSize: '0.92rem' }}>📍 {confirmedOrder.customer.fullAddress}</div>
              </div>

              <div style={{ background: '#e0f2fe', padding: '12px 16px', borderRadius: '12px', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock className="w-5 h-5 text-sky-700" />
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: '700' }}>EXPECTED 48-HOUR RETURN</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#075985' }}>
                    {calculateExpectedReturn(confirmedOrder.expectedReturnDate, config.turnaroundHours).formattedReturnTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={getWhatsAppLink(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send Order Confirmation via WhatsApp</span>
              </a>

              <a
                href={`tel:${config.businessPhone}`}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                <Phone className="w-5 h-5 text-sky-600" />
                <span>Call Laundry ({config.businessPhone})</span>
              </a>

              <button
                onClick={handleClose}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', background: '#334155' }}
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
