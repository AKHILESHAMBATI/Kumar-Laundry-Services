import type { PricingConfig } from '../types';

export const DEFAULT_CONFIG: PricingConfig = {
  pricePerPair: 40,
  turnaroundHours: 48,
  businessPhone: '9441891963',
  ownerName: 'Praveen Kumar',
  businessName: 'Praveen Kumar Laundry Services',
  shopAddress: 'Old Adivivaram, Visakhapatnam, Andhra Pradesh',
  deliveryFee: 0,
};

/**
 * Calculates pairs count and total price based on clothes count
 * Formula: Math.ceil(clothes / 2) * pricePerPair
 */
export function calculatePrice(clothesCount: number, pricePerPair: number = 40) {
  if (clothesCount <= 0) {
    return { pairsCount: 0, totalAmount: 0 };
  }
  const pairsCount = Math.ceil(clothesCount / 2);
  const totalAmount = pairsCount * pricePerPair;
  return { pairsCount, totalAmount };
}

/**
 * Dynamically calculates expected return date (Order Date + turnaroundHours)
 */
export function calculateExpectedReturn(orderDateISO?: string, turnaroundHours: number = 48): {
  returnISO: string;
  formattedOrderTime: string;
  formattedReturnTime: string;
  relativeFormatted: string;
} {
  const baseDate = orderDateISO ? new Date(orderDateISO) : new Date();
  const returnDate = new Date(baseDate.getTime() + turnaroundHours * 60 * 60 * 1000);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedOrderTime = baseDate.toLocaleString('en-IN', options);
  const formattedReturnTime = returnDate.toLocaleString('en-IN', options);

  const relativeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const relativeFormatted = `Within ${turnaroundHours} hours (${returnDate.toLocaleString('en-IN', relativeOptions)})`;

  return {
    returnISO: returnDate.toISOString(),
    formattedOrderTime,
    formattedReturnTime,
    relativeFormatted,
  };
}

/**
 * Formats a unique Order ID like PKL-894102
 */
export function generateOrderId(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `PKL-${random}`;
}

/**
 * Formats structured WhatsApp order message
 */
export function buildWhatsAppMessage(order: {
  id: string;
  customerName: string;
  phone: string;
  clothesCount: number;
  fullAddress: string;
  landmark?: string;
  totalAmount: number;
  expectedReturnFormatted: string;
  specialInstructions?: string;
}): string {
  const text = `Hello Praveen Kumar Laundry Services,

I would like to place a laundry order.

📋 Order ID: ${order.id}
👤 Name: ${order.customerName}
📞 Phone: ${order.phone}
🧺 Number of Clothes: ${order.clothesCount}
📍 Address: ${order.fullAddress}${order.landmark ? ` (Landmark: ${order.landmark})` : ''}
✨ Service: Washing + Ironing
💰 Price: ₹40 per 2 clothes
💵 Estimated Total: ₹${order.totalAmount}
🕒 Expected Return: ${order.expectedReturnFormatted}
${order.specialInstructions ? `📝 Special Instructions: ${order.specialInstructions}\n` : ''}
Please confirm my doorstep pickup.`;

  return encodeURIComponent(text);
}
