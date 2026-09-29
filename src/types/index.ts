git init
git add.
git commit - m "Initial commit"
git branch - M main
git remote add origin https://github.com/AKHILESHAMBATI/Kumar-Laundry-Services.git
git push - u origin mainexport type OrderStatus =
  | 'New'
  | 'Pickup Scheduled'
  | 'Clothes Received'
  | 'Washing'
  | 'Ironing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  whatsappNumber?: string;
  houseNo: string;
  streetArea: string;
  city: string;
  pincode: string;
  landmark?: string;
  fullAddress: string;
}

export interface LaundryDetails {
  clothesCount: number;
  serviceType: 'Washing + Ironing';
  pickupRequired: boolean;
  deliveryRequired: boolean;
  specialInstructions?: string;
}

export interface Order {
  id: string; // e.g. PKL-849201
  customer: CustomerInfo;
  laundry: LaundryDetails;
  pricePerPair: number;
  pairsCount: number;
  totalAmount: number;
  orderDate: string; // ISO string
  expectedReturnDate: string; // ISO string
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string }[];
  paymentStatus: 'Pending' | 'Paid via Cash/UPI on Delivery' | 'Paid Online';
}

export interface PricingConfig {
  pricePerPair: number; // default 40
  turnaroundHours: number; // default 48
  businessPhone: string; // 9441891963
  ownerName: string; // Praveen Kumar
  businessName: string; // Praveen Kumar Laundry Services
  shopAddress: string; // Old Adivivaram, Visakhapatnam, Andhra Pradesh
  deliveryFee: number; // 0 (Free doorstep pickup & delivery)
}
