import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private authenticated = signal<boolean>(false);
  private loading = signal<boolean>(false);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = this.authenticated.asReadonly();
  readonly isLoading = this.loading.asReadonly();

  constructor() {
    this.checkAuthStatus();
  }

  /**
   * Verifica el estado de autenticación
   */
  private checkAuthStatus(): void {
    if (typeof window === 'undefined') return;
    
    // TODO: Integrar con Firebase Auth
    const storedUser = localStorage.getItem('kebab-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
        this.authenticated.set(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }

  /**
   * Inicia sesión con email y contraseña
   */
  async signIn(email: string, password: string): Promise<User> {
    this.loading.set(true);

    try {
      // TODO: Integrar con Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user: User = {
        id: 'user-' + Date.now(),
        email,
        name: 'Usuario Demo',
        phone: '+34 600 000 000',
        addresses: [],
        favoriteItems: [],
        preferences: {
          language: 'es',
          notifications: {
            orderUpdates: true,
            promotions: true,
            newsletter: false,
            pushNotifications: true
          }
        },
        createdAt: new Date()
      };

      this.currentUser.set(user);
      this.authenticated.set(true);
      localStorage.setItem('kebab-user', JSON.stringify(user));

      return user;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async signUp(email: string, password: string, name: string, phone: string): Promise<User> {
    this.loading.set(true);

    try {
      // TODO: Integrar con Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        phone,
        addresses: [],
        favoriteItems: [],
        preferences: {
          language: 'es',
          notifications: {
            orderUpdates: true,
            promotions: true,
            newsletter: false,
            pushNotifications: true
          }
        },
        createdAt: new Date()
      };

      this.currentUser.set(user);
      this.authenticated.set(true);
      localStorage.setItem('kebab-user', JSON.stringify(user));

      return user;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Cierra sesión
   */
  async signOut(): Promise<void> {
    this.loading.set(true);

    try {
      // TODO: Integrar con Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 500));

      this.currentUser.set(null);
      this.authenticated.set(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kebab-user');
      }
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Actualiza el perfil del usuario
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const current = this.currentUser();
    if (!current) throw new Error('No user logged in');

    const updated = { ...current, ...updates };
    this.currentUser.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kebab-user', JSON.stringify(updated));
    }

    return updated;
  }
}
