import { MenuItem } from './menu-item.model';

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  totalPrice: number;
  specialInstructions?: string;
}

export interface SelectedCustomization {
  customizationId: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}
