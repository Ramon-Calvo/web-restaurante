import { CartItem } from './cart.model';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: Date;
  notes?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface DeliveryInfo {
  name: string;
  phone: string;
  email: string;
  address: Address;
  deliveryType: DeliveryType;
}

export enum DeliveryType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup'
}

export interface Address {
  street: string;
  number: string;
  floor?: string;
  door?: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  transactionId?: string;
  status: PaymentStatus;
}

export enum PaymentMethod {
  CARD = 'card',
  PAYPAL = 'paypal',
  CASH = 'cash'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}
