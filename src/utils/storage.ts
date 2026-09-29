import type { Order, PricingConfig } from '../types';
import { DEFAULT_CONFIG } from './calculator';

const ORDERS_KEY = 'pkl_orders_db_v1';
const CONFIG_KEY = 'pkl_pricing_config_v1';

// Initial sample orders for realistic visualization
const INITIAL_ORDERS: Order[] = [
  {
    id: 'PKL-894102',
    customer: {
      fullName: 'Ramesh Varma',
      phone: '9848012345',
      houseNo: 'D.No 4-12/A',
      streetArea: 'Near Water Tank, Old Adivivaram',
      city: 'Visakhapatnam',
      pincode: '530028',
      landmark: 'Opposite State Bank',
      fullAddress: 'D.No 4-12/A, Near Water Tank, Old Adivivaram, Visakhapatnam, 530028',
    },
    laundry: {
      clothesCount: 12,
      serviceType: 'Washing + Ironing',
      pickupRequired: true,
      deliveryRequired: true,
      specialInstructions: 'Please fold shirts neatly.',
    },
    pricePerPair: 40,
    pairsCount: 6,
    totalAmount: 240,
    orderDate: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    expectedReturnDate: new Date(Date.now() + 43 * 3600 * 1000).toISOString(),
    status: 'Washing',
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString() },
      { status: 'Pickup Scheduled', timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString() },
      { status: 'Clothes Received', timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString() },
      { status: 'Washing', timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString() },
    ],
    paymentStatus: 'Pending',
  },
  {
    id: 'PKL-741982',
    customer: {
      fullName: 'Srinivas Rao',
      phone: '9440187654',
      houseNo: 'Flat 302, Sai Residency',
      streetArea: 'Main Road, Simhachalam Hill Road',
      city: 'Visakhapatnam',
      pincode: '530028',
      landmark: 'Near Bus Stop',
      fullAddress: 'Flat 302, Sai Residency, Main Road, Simhachalam Hill Road, Visakhapatnam, 530028',
    },
    laundry: {
      clothesCount: 6,
      serviceType: 'Washing + Ironing',
      pickupRequired: true,
      deliveryRequired: true,
      specialInstructions: 'Gentle wash for silk saree if possible.',
    },
    pricePerPair: 40,
    pairsCount: 3,
    totalAmount: 120,
    orderDate: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    expectedReturnDate: new Date(Date.now() + 28 * 3600 * 1000).toISOString(),
    status: 'Ironing',
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString() },
      { status: 'Clothes Received', timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString() },
      { status: 'Washing', timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString() },
      { status: 'Ironing', timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
    ],
    paymentStatus: 'Pending',
  },
  {
    id: 'PKL-512039',
    customer: {
      fullName: 'Anitha Kumari',
      phone: '9989024680',
      houseNo: 'House 12-5',
      streetArea: 'Near Temple Street, Old Adivivaram',
      city: 'Visakhapatnam',
      pincode: '530028',
      fullAddress: 'House 12-5, Near Temple Street, Old Adivivaram, Visakhapatnam, 530028',
    },
    laundry: {
      clothesCount: 4,
      serviceType: 'Washing + Ironing',
      pickupRequired: true,
      deliveryRequired: true,
    },
    pricePerPair: 40,
    pairsCount: 2,
    totalAmount: 80,
    orderDate: new Date(Date.now() - 49 * 3600 * 1000).toISOString(),
    expectedReturnDate: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    status: 'Delivered',
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 49 * 3600 * 1000).toISOString() },
      { status: 'Delivered', timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
    ],
    paymentStatus: 'Paid via Cash/UPI on Delivery',
  }
];

export function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read orders from localStorage', e);
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to localStorage', e);
  }
}

export function addOrder(newOrder: Order): Order[] {
  const existing = getStoredOrders();
  const updated = [newOrder, ...existing];
  saveOrders(updated);
  return updated;
}

export function updateOrderStatus(orderId: string, newStatus: Order['status']): Order[] {
  const existing = getStoredOrders();
  const updated = existing.map((ord) => {
    if (ord.id === orderId) {
      const history = [...ord.statusHistory, { status: newStatus, timestamp: new Date().toISOString() }];
      return {
        ...ord,
        status: newStatus,
        statusHistory: history,
        paymentStatus: newStatus === 'Delivered' ? 'Paid via Cash/UPI on Delivery' : ord.paymentStatus,
      };
    }
    return ord;
  });
  saveOrders(updated);
  return updated;
}

export function getStoredConfig(): PricingConfig {
  try {
    const data = localStorage.getItem(CONFIG_KEY);
    if (!data) {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: PricingConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config', e);
  }
}
