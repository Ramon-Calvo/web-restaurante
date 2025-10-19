import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ConfirmModalComponent } from '../../shared/components/modal/confirm-modal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmModalComponent],
  template: `
    <div class="cart-page">
      <div class="container">
        <h1>Carrito de Compras</h1>

        @if (cartService.itemCount() === 0) {
          <div class="empty-cart">
            <div class="empty-cart__icon">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>Añade algunos productos deliciosos del menú</p>
            <a routerLink="/menu" class="btn btn--primary">Ver Menú</a>
          </div>
        } @else {
          <div class="cart-content">
            <div class="cart-items">
              @for (item of cartService.items(); track item.id) {
                <div class="cart-item">
                  <img [src]="item.menuItem.image" [alt]="item.menuItem.name" />
                  
                  <div class="cart-item__details">
                    <h3>{{ item.menuItem.name }}</h3>
                    <p>{{ item.menuItem.description }}</p>
                    
                    @if (item.selectedCustomizations.length > 0) {
                      <div class="customizations">
                        <strong>Personalizaciones:</strong>
                        <ul>
                          @for (custom of item.selectedCustomizations; track custom.optionId) {
                            <li>
                              {{ custom.optionName }}
                              @if (custom.price > 0) {
                                <span class="price-indicator">(+{{ custom.price.toFixed(2) }}€)</span>
                              }
                            </li>
                          }
                        </ul>
                      </div>
                    }

                    @if (item.specialInstructions) {
                      <div class="special-instructions">
                        <strong>Instrucciones:</strong> {{ item.specialInstructions }}
                      </div>
                    }
                  </div>

                  <div class="cart-item__quantity">
                    <button (click)="decreaseQuantity(item.id)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="increaseQuantity(item.id)">+</button>
                  </div>

                  <div class="cart-item__price">
                    {{ item.totalPrice.toFixed(2) }}€
                  </div>

                  <button class="cart-item__remove" (click)="removeItem(item.id)">
                    ✕
                  </button>
                </div>
              }
            </div>

            <div class="cart-summary">
              <h2>Resumen del Pedido</h2>
              
              <div class="summary-row">
                <span>Subtotal (IVA incluido)</span>
                <span>{{ cart().subtotal.toFixed(2) }}€</span>
              </div>

              <div class="summary-row summary-row--detail">
                <span>- Base imponible</span>
                <span>{{ (cart().subtotal - cart().tax).toFixed(2) }}€</span>
              </div>

              <div class="summary-row summary-row--detail">
                <span>- IVA (21%)</span>
                <span>{{ cart().tax.toFixed(2) }}€</span>
              </div>

              <div class="summary-row">
                <span>Gastos de envío</span>
                <span>{{ cart().deliveryFee.toFixed(2) }}€</span>
              </div>

              <div class="summary-row summary-row--total">
                <span>Total a pagar</span>
                <span>{{ cart().total.toFixed(2) }}€</span>
              </div>

              <button class="btn btn--checkout" routerLink="/checkout">
                Proceder al Pago
              </button>

              <button class="btn btn--clear" (click)="openClearCartModal()">
                Vaciar Carrito
              </button>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Modal de confirmación para eliminar item -->
    <app-confirm-modal
      [isOpen]="showDeleteModal()"
      [title]="'Eliminar producto'"
      [message]="'¿Estás seguro de que quieres eliminar este producto del carrito?'"
      [confirmText]="'Eliminar'"
      [cancelText]="'Cancelar'"
      (confirm)="confirmRemoveItem()"
      (cancel)="cancelRemoveItem()">
    </app-confirm-modal>

    <!-- Modal de confirmación para vaciar carrito -->
    <app-confirm-modal
      [isOpen]="showClearModal()"
      [title]="'Vaciar carrito'"
      [message]="'¿Estás seguro de que quieres vaciar todo el carrito? Esta acción no se puede deshacer.'"
      [confirmText]="'Vaciar carrito'"
      [cancelText]="'Cancelar'"
      (confirm)="confirmClearCart()"
      (cancel)="cancelClearCart()">
    </app-confirm-modal>
  `,
  styles: [`
    .cart-page {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 1rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.75rem;
    }

    .empty-cart {
      text-align: center;
      padding: 2.5rem 1.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .empty-cart__icon {
      font-size: 3.5rem;
      margin-bottom: 0.75rem;
    }

    .empty-cart h2 {
      color: #333;
      margin-bottom: 0.4rem;
      font-size: 1.4rem;
    }

    .empty-cart p {
      color: #666;
      margin-bottom: 1.25rem;
      font-size: 0.95rem;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 1.25rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 85px 1fr auto auto auto;
      gap: 1rem;
      background: white;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      align-items: center;
    }

    .cart-item img {
      width: 85px;
      height: 85px;
      object-fit: cover;
      border-radius: 8px;
    }

    .cart-item__details h3 {
      color: #333;
      margin-bottom: 0.2rem;
      font-size: 1.05rem;
    }

    .cart-item__details p {
      color: #666;
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
    }

    .customizations {
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.4rem;
    }

    .customizations ul {
      margin: 0.2rem 0 0 0.8rem;
      padding: 0;
    }

    .customizations .price-indicator {
      color: #d32f2f;
      font-weight: 600;
      margin-left: 0.3rem;
    }

    .special-instructions {
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.4rem;
    }

    .cart-item__quantity {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: #f5f5f5;
      padding: 0.4rem;
      border-radius: 20px;
    }

    .cart-item__quantity button {
      width: 28px;
      height: 28px;
      border: none;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .cart-item__quantity button:hover {
      background: #e0e0e0;
    }

    .cart-item__quantity span {
      font-weight: 600;
      min-width: 25px;
      text-align: center;
      font-size: 0.95rem;
    }

    .cart-item__price {
      font-size: 1.15rem;
      font-weight: bold;
      color: #d32f2f;
      min-width: 70px;
      text-align: right;
    }

    .cart-item__remove {
      width: 30px;
      height: 30px;
      border: none;
      background: #ffebee;
      color: #d32f2f;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.15rem;
      transition: background 0.2s;
    }

    .cart-item__remove:hover {
      background: #ffcdd2;
    }

    .cart-summary {
      background: white;
      padding: 1.25rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: fit-content;
      position: sticky;
      top: 80px;
    }

    .cart-summary h2 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      color: #666;
      font-size: 0.95rem;
    }

    .summary-row--detail {
      font-size: 0.85rem;
      color: #999;
      padding: 0.35rem 0 0.35rem 0.75rem;
    }

    .summary-row--total {
      border-top: 2px solid #eee;
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      font-size: 1.15rem;
      font-weight: bold;
      color: #333;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .btn--primary {
      background: #d32f2f;
      color: white;
    }

    .btn--primary:hover {
      background: #b71c1c;
    }

    .btn--checkout {
      background: #d32f2f;
      color: white;
      margin-top: 1rem;
      font-size: 1.05rem;
    }

    .btn--checkout:hover {
      background: #b71c1c;
      transform: translateY(-2px);
    }

    .btn--clear {
      background: #f5f5f5;
      color: #666;
      margin-top: 0.6rem;
    }

    .btn--clear:hover {
      background: #e0e0e0;
    }

    @media (max-width: 968px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
      }

      .cart-item {
        grid-template-columns: 70px 1fr;
        gap: 0.75rem;
      }

      .cart-item img {
        width: 70px;
        height: 70px;
      }

      .cart-item__quantity,
      .cart-item__price,
      .cart-item__remove {
        grid-column: 2;
      }
    }
  `]
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.cart;

  increaseQuantity(itemId: string): void {
    const item = this.cartService.items().find(i => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartService.items().find(i => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  // Signals para controlar los modales
  showDeleteModal = signal(false);
  showClearModal = signal(false);
  itemToDelete = signal<string | null>(null);

  // Métodos para eliminar un item con modal
  removeItem(itemId: string): void {
    this.itemToDelete.set(itemId);
    this.showDeleteModal.set(true);
  }

  confirmRemoveItem(): void {
    const itemId = this.itemToDelete();
    if (itemId) {
      this.cartService.removeItem(itemId);
    }
    this.showDeleteModal.set(false);
    this.itemToDelete.set(null);
  }

  cancelRemoveItem(): void {
    this.showDeleteModal.set(false);
    this.itemToDelete.set(null);
  }

  // Métodos para vaciar el carrito con modal
  openClearCartModal(): void {
    this.showClearModal.set(true);
  }

  confirmClearCart(): void {
    this.cartService.clearCart();
    this.showClearModal.set(false);
  }

  cancelClearCart(): void {
    this.showClearModal.set(false);
  }
}
