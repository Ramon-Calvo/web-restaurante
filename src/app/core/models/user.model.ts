import { Address } from './order.model';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  photoURL?: string;
  addresses: Address[];
  favoriteItems: string[];
  notificationToken?: string;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  language: string;
  notifications: NotificationPreferences;
  defaultAddress?: Address;
}

export interface NotificationPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  pushNotifications: boolean;
}
