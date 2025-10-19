import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { PaymentService } from '../../core/services/payment.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { DeliveryType, PaymentMethod, DeliveryInfo, PaymentInfo, Address } from '../../core/models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-page">
      <div class="container">
        <h1>Finalizar Pedido</h1>

        <div class="checkout-content">
          <div class="checkout-forms">
            <!-- Delivery Type -->
            <section class="form-section">
              <h2>Tipo de Entrega</h2>
              <div class="delivery-type-selector">
                <button 
                  class="delivery-btn"
                  [class.active]="deliveryType() === 'delivery'"
                  (click)="setDeliveryType('delivery')">
                  <span>🚚</span>
                  Entrega a Domicilio
                </button>
                <button 
                  class="delivery-btn"
                  [class.active]="deliveryType() === 'pickup'"
                  (click)="setDeliveryType('pickup')">
                  <span>🏪</span>
                  Recoger en Tienda
                </button>
              </div>
            </section>

            <!-- Contact Information -->
            <section class="form-section">
              <h2>Información de Contacto</h2>
              <div class="form-grid">
                <input type="text" placeholder="Nombre completo" [(ngModel)]="name" required>
                <input type="tel" placeholder="Teléfono" [(ngModel)]="phone" required>
                <input type="email" placeholder="Email" [(ngModel)]="email" required class="full-width">
              </div>
            </section>

            <!-- Delivery Address (only if delivery) -->
            @if (deliveryType() === 'delivery') {
              <section class="form-section">
                <h2>Dirección de Entrega</h2>
                <div class="form-grid">
                  <input type="text" placeholder="Calle" [(ngModel)]="address.street" required>
                  <input type="text" placeholder="Número" [(ngModel)]="address.number" required>
                  <input type="text" placeholder="Piso (opcional)" [(ngModel)]="address.floor">
                  <input type="text" placeholder="Puerta (opcional)" [(ngModel)]="address.door">
                  <input type="text" placeholder="Ciudad" [(ngModel)]="address.city" required>
                  <input type="text" placeholder="Código Postal" [(ngModel)]="address.postalCode" required>
                  <textarea 
                    placeholder="Información adicional (opcional)" 
                    [(ngModel)]="address.additionalInfo"
                    class="full-width"></textarea>
                </div>
              </section>
            }

            <!-- Payment Method -->
            <section class="form-section">
              <h2>Método de Pago</h2>
              <div class="payment-methods">
                <button 
                  class="payment-btn"
                  [class.active]="paymentMethod() === 'card'"
                  (click)="setPaymentMethod('card')">
                  💳 Tarjeta
                </button>
                <button 
                  class="payment-btn"
                  [class.active]="paymentMethod() === 'paypal'"
                  (click)="setPaymentMethod('paypal')">
                  🅿️ PayPal
                </button>
                <button 
                  class="payment-btn"
                  [class.active]="paymentMethod() === 'cash'"
                  (click)="setPaymentMethod('cash')">
                  💵 Efectivo
                </button>
              </div>

              <!-- Card Payment Form -->
              @if (paymentMethod() === 'card') {
                <div class="card-form">
                  <input type="text" placeholder="Número de tarjeta" [(ngModel)]="cardNumber">
                  <div class="form-row">
                    <input type="text" placeholder="MM/AA" [(ngModel)]="cardExpiry">
                    <input type="text" placeholder="CVV" [(ngModel)]="cardCVV">
                  </div>
                </div>
              }
            </section>
          </div>

          <div class="order-summary">
            <h2>Resumen del Pedido</h2>
            
            <div class="summary-items">
              @for (item of cartService.items(); track item.id) {
                <div class="summary-item">
                  <span>{{ item.quantity }}x {{ item.menuItem.name }}</span>
                  <span>{{ item.totalPrice.toFixed(2) }}€</span>
                </div>
              }
            </div>

            <div class="summary-totals">
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
              @if (deliveryType() === 'delivery') {
                <div class="summary-row">
                  <span>Gastos de envío</span>
                  <span>{{ cart().deliveryFee.toFixed(2) }}€</span>
                </div>
              }
              <div class="summary-row summary-row--total">
                <span>Total a pagar</span>
                <span>{{ cart().total.toFixed(2) }}€</span>
              </div>
            </div>

            <button 
              class="btn btn--place-order"
              [disabled]="processing() || !isFormValid()"
              (click)="placeOrder()">
              @if (processing()) {
                Procesando...
              } @else {
                Realizar Pedido
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
    }

    .checkout-forms {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .form-section h2 {
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .delivery-type-selector,
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .delivery-btn,
    .payment-btn {
      padding: 1rem;
      border: 2px solid #ddd;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .delivery-btn span,
    .payment-btn span {
      font-size: 1.5rem;
    }

    .delivery-btn:hover,
    .payment-btn:hover {
      border-color: #d32f2f;
    }

    .delivery-btn.active,
    .payment-btn.active {
      border-color: #d32f2f;
      background: #ffebee;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    input,
    textarea {
      padding: 0.75rem 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #d32f2f;
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }

    .card-form {
      margin-top: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }

    .order-summary {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: fit-content;
      position: sticky;
      top: 90px;
    }

    .order-summary h2 {
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .summary-items {
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      color: #666;
    }

    .summary-totals {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      color: #666;
    }

    .summary-row--detail {
      font-size: 0.9rem;
      color: #999;
      padding-left: 1rem;
    }

    .summary-row--total {
      border-top: 2px solid #eee;
      padding-top: 1rem;
      margin-top: 0.5rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #333;
    }

    .btn--place-order {
      width: 100%;
      padding: 1rem;
      background: #d32f2f;
      color: white;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      margin-top: 1.5rem;
      transition: all 0.2s;
    }

    .btn--place-order:hover:not(:disabled) {
      background: #b71c1c;
      transform: translateY(-2px);
    }

    .btn--place-order:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    @media (max-width: 968px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .order-summary {
        position: static;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  paymentService = inject(PaymentService);
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  router = inject(Router);

  cart = this.cartService.cart;
  deliveryType = signal<DeliveryType>(DeliveryType.DELIVERY);
  paymentMethod = signal<PaymentMethod>(PaymentMethod.CARD);
  processing = signal(false);

  // Form data
  name = '';
  phone = '';
  email = '';
  address: Address = {
    street: '',
    number: '',
    floor: '',
    door: '',
    city: '',
    postalCode: '',
    additionalInfo: ''
  };
  cardNumber = '';
  cardExpiry = '';
  cardCVV = '';

  setDeliveryType(type: 'delivery' | 'pickup'): void {
    this.deliveryType.set(type as DeliveryType);
  }

  setPaymentMethod(method: 'card' | 'paypal' | 'cash'): void {
    this.paymentMethod.set(method as PaymentMethod);
  }

  isFormValid(): boolean {
    if (!this.name || !this.phone || !this.email) return false;
    
    if (this.deliveryType() === DeliveryType.DELIVERY) {
      if (!this.address.street || !this.address.number || !this.address.city || !this.address.postalCode) {
        return false;
      }
    }

    if (this.paymentMethod() === PaymentMethod.CARD) {
      if (!this.cardNumber || !this.cardExpiry || !this.cardCVV) return false;
    }

    return true;
  }

  async placeOrder(): Promise<void> {
    if (!this.isFormValid()) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    this.processing.set(true);

    try {
      // Prepare delivery info
      const deliveryInfo: DeliveryInfo = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        address: this.address,
        deliveryType: this.deliveryType()
      };

      // Process payment
      const paymentResult = await this.paymentService.processPayment(
        this.cart().total,
        this.paymentMethod(),
        this.paymentMethod() === PaymentMethod.CARD ? {
          cardNumber: this.cardNumber,
          expiry: this.cardExpiry,
          cvv: this.cardCVV
        } : undefined
      );

      if (!paymentResult.success) {
        alert('Error en el pago: ' + paymentResult.error);
        this.processing.set(false);
        return;
      }

      // Prepare payment info
      const paymentInfo: PaymentInfo = {
        method: this.paymentMethod(),
        transactionId: paymentResult.transactionId,
        status: 'completed' as any
      };

      // Create order
      const userId = this.authService.user()?.id || 'guest';
      const order = await this.orderService.createOrder(
        this.cart(),
        deliveryInfo,
        paymentInfo,
        userId
      );

      // Send notification
      this.notificationService.notifyOrderStatus(order.id, order.status);

      // Clear cart
      this.cartService.clearCart();

      // Navigate to order tracking
      this.router.navigate(['/orders', order.id]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
    } finally {
      this.processing.set(false);
    }
  }
}
