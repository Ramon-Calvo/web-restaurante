import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Cart } from '../models/cart.model';
import { MenuItem } from '../models/menu-item.model';
import { SelectedCustomization } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private readonly TAX_RATE = 0.21; // 21% IVA (España)
  private readonly DELIVERY_FEE = 2.50;

  // Señales computadas
  readonly items = this.cartItems.asReadonly();
  readonly itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  // Subtotal (ya incluye IVA porque los precios del menú ya lo incluyen)
  readonly subtotal = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.totalPrice, 0)
  );
  
  // Base imponible (precio sin IVA): subtotal / 1.21
  readonly baseImponible = computed(() => 
    this.subtotal() / (1 + this.TAX_RATE)
  );
  
  // IVA incluido en el subtotal: subtotal - base imponible
  readonly tax = computed(() => 
    this.subtotal() - this.baseImponible()
  );
  
  // Total: subtotal (que ya incluye IVA) + gastos de envío
  readonly total = computed(() => 
    this.subtotal() + this.DELIVERY_FEE
  );
  
  readonly cart = computed<Cart>(() => ({
    items: this.cartItems(),
    subtotal: this.subtotal(),
    tax: this.tax(),
    deliveryFee: this.DELIVERY_FEE,
    total: this.total()
  }));

  constructor() {
    this.loadCartFromStorage();
  }

  /**
   * Añade un item al carrito
   */
  addItem(
    menuItem: MenuItem,
    quantity: number = 1,
    customizations: SelectedCustomization[] = [],
    specialInstructions?: string
  ): void {
    console.log('🛒 CartService.addItem llamado:', { menuItem, quantity, customizations });
    
    const customizationPrice = customizations.reduce((sum, c) => sum + c.price, 0);
    const itemPrice = (menuItem.price + customizationPrice) * quantity;

    const cartItem: CartItem = {
      id: this.generateCartItemId(),
      menuItem,
      quantity,
      selectedCustomizations: customizations,
      totalPrice: itemPrice,
      specialInstructions
    };

    console.log('🛒 CartService: Nuevo cartItem creado:', cartItem);
    
    this.cartItems.update(items => {
      const newItems = [...items, cartItem];
      console.log('🛒 CartService: Items actualizados. Total:', newItems.length);
      return newItems;
    });
    
    this.saveCartToStorage();
    
    console.log('🛒 CartService: Estado final - itemCount:', this.itemCount());
  }

  /**
   * Actualiza la cantidad de un item
   */
  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item => {
        if (item.id === itemId) {
          const customizationPrice = item.selectedCustomizations.reduce((sum, c) => sum + c.price, 0);
          const newPrice = (item.menuItem.price + customizationPrice) * quantity;
          return { ...item, quantity, totalPrice: newPrice };
        }
        return item;
      })
    );
    this.saveCartToStorage();
  }

  /**
   * Elimina un item del carrito
   */
  removeItem(itemId: string): void {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
    this.saveCartToStorage();
  }

  /**
   * Vacía el carrito
   */
  clearCart(): void {
    this.cartItems.set([]);
    this.saveCartToStorage();
  }

  /**
   * Genera un ID único para el item del carrito
   */
  private generateCartItemId(): string {
    return `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Guarda el carrito en localStorage
   */
  private saveCartToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kebab-cart', JSON.stringify(this.cartItems()));
    }
  }

  /**
   * Carga el carrito desde localStorage
   */
  private loadCartFromStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kebab-cart');
      if (stored) {
        try {
          const items = JSON.parse(stored);
          this.cartItems.set(items);
        } catch (error) {
          console.error('Error loading cart from storage:', error);
        }
      }
    }
  }
}
