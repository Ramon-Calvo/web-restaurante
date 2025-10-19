import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="tracking-page">
      <div class="container">
        @if (order()) {
          <div class="order-header">
            <h1>Pedido #{{ order()!.id }}</h1>
            <span class="order-status" [class]="'status-' + order()!.status">
              {{ getStatusLabel(order()!.status) }}
            </span>
          </div>

          <!-- Progress Tracker -->
          <div class="progress-tracker">
            <div class="progress-step" [class.active]="isStepActive('pending')" [class.completed]="isStepCompleted('pending')">
              <div class="step-icon">📝</div>
              <div class="step-label">Recibido</div>
            </div>
            <div class="progress-line" [class.completed]="isStepCompleted('confirmed')"></div>
            
            <div class="progress-step" [class.active]="isStepActive('confirmed')" [class.completed]="isStepCompleted('confirmed')">
              <div class="step-icon">✅</div>
              <div class="step-label">Confirmado</div>
            </div>
            <div class="progress-line" [class.completed]="isStepCompleted('preparing')"></div>
            
            <div class="progress-step" [class.active]="isStepActive('preparing')" [class.completed]="isStepCompleted('preparing')">
              <div class="step-icon">👨‍🍳</div>
              <div class="step-label">Preparando</div>
            </div>
            <div class="progress-line" [class.completed]="isStepCompleted('ready')"></div>
            
            <div class="progress-step" [class.active]="isStepActive('ready')" [class.completed]="isStepCompleted('ready')">
              <div class="step-icon">📦</div>
              <div class="step-label">Listo</div>
            </div>
            <div class="progress-line" [class.completed]="isStepCompleted('out_for_delivery')"></div>
            
            <div class="progress-step" [class.active]="isStepActive('out_for_delivery')" [class.completed]="isStepCompleted('out_for_delivery')">
              <div class="step-icon">🚚</div>
              <div class="step-label">En Camino</div>
            </div>
            <div class="progress-line" [class.completed]="isStepCompleted('delivered')"></div>
            
            <div class="progress-step" [class.active]="isStepActive('delivered')" [class.completed]="isStepCompleted('delivered')">
              <div class="step-icon">✨</div>
              <div class="step-label">Entregado</div>
            </div>
          </div>

          <!-- Order Details -->
          <div class="order-content">
            <div class="order-items">
              <h2>Artículos del Pedido</h2>
              @for (item of order()!.items; track item.id) {
                <div class="order-item">
                  <img [src]="item.menuItem.image" [alt]="item.menuItem.name" />
                  <div class="item-details">
                    <h3>{{ item.menuItem.name }}</h3>
                    <p>Cantidad: {{ item.quantity }}</p>
                    @if (item.selectedCustomizations.length > 0) {
                      <div class="customizations">
                        @for (custom of item.selectedCustomizations; track custom.optionId) {
                          <span>{{ custom.optionName }}</span>
                        }
                      </div>
                    }
                  </div>
                  <div class="item-price">{{ item.totalPrice.toFixed(2) }}€</div>
                </div>
              }
            </div>

            <div class="order-info">
              <div class="info-section">
                <h2>Información de Entrega</h2>
                <p><strong>Nombre:</strong> {{ order()!.deliveryInfo.name }}</p>
                <p><strong>Teléfono:</strong> {{ order()!.deliveryInfo.phone }}</p>
                <p><strong>Email:</strong> {{ order()!.deliveryInfo.email }}</p>
                @if (order()!.deliveryInfo.deliveryType === 'delivery') {
                  <p><strong>Dirección:</strong></p>
                  <p>
                    {{ order()!.deliveryInfo.address.street }} {{ order()!.deliveryInfo.address.number }}
                    @if (order()!.deliveryInfo.address.floor) {
                      , {{ order()!.deliveryInfo.address.floor }}
                    }
                    @if (order()!.deliveryInfo.address.door) {
                      {{ order()!.deliveryInfo.address.door }}
                    }
                  </p>
                  <p>{{ order()!.deliveryInfo.address.city }}, {{ order()!.deliveryInfo.address.postalCode }}</p>
                } @else {
                  <p><strong>Tipo:</strong> Recoger en tienda</p>
                }
              </div>

              <div class="info-section">
                <h2>Resumen del Pago</h2>
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>{{ order()!.subtotal.toFixed(2) }}€</span>
                </div>
                <div class="summary-row">
                  <span>IVA</span>
                  <span>{{ order()!.tax.toFixed(2) }}€</span>
                </div>
                <div class="summary-row">
                  <span>Envío</span>
                  <span>{{ order()!.deliveryFee.toFixed(2) }}€</span>
                </div>
                <div class="summary-row total">
                  <span>Total</span>
                  <span>{{ order()!.total.toFixed(2) }}€</span>
                </div>
              </div>

              @if (order()!.estimatedDeliveryTime) {
                <div class="info-section estimated-time">
                  <h2>Tiempo Estimado de Entrega</h2>
                  <p class="time">{{ formatTime(order()!.estimatedDeliveryTime!) }}</p>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="not-found">
            <h2>Pedido no encontrado</h2>
            <p>No pudimos encontrar el pedido que buscas</p>
            <a routerLink="/menu" class="btn">Volver al Menú</a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .tracking-page {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .order-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .order-header h1 {
      color: #333;
      margin-bottom: 1rem;
    }

    .order-status {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1rem;
    }

    .status-pending { background: #fff3e0; color: #f57c00; }
    .status-confirmed { background: #e3f2fd; color: #1976d2; }
    .status-preparing { background: #f3e5f5; color: #7b1fa2; }
    .status-ready { background: #e8f5e9; color: #388e3c; }
    .status-out_for_delivery { background: #e1f5fe; color: #0277bd; }
    .status-delivered { background: #c8e6c9; color: #2e7d32; }
    .status-cancelled { background: #ffebee; color: #c62828; }

    .progress-tracker {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow-x: auto;
    }

    .progress-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0.4;
      transition: opacity 0.3s;
    }

    .progress-step.active {
      opacity: 1;
    }

    .progress-step.completed {
      opacity: 1;
    }

    .step-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .progress-step.active .step-icon {
      background: #d32f2f;
      color: white;
      animation: pulse 2s infinite;
    }

    .progress-step.completed .step-icon {
      background: #4caf50;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .step-label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #666;
      white-space: nowrap;
    }

    .progress-line {
      width: 60px;
      height: 3px;
      background: #e0e0e0;
      margin: 0 0.5rem;
      position: relative;
      top: -20px;
    }

    .progress-line.completed {
      background: #4caf50;
    }

    .order-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
    }

    .order-items {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .order-items h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .order-item {
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .order-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-details h3 {
      color: #333;
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
    }

    .item-details p {
      color: #666;
      font-size: 0.9rem;
    }

    .customizations {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .customizations span {
      background: #f5f5f5;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      color: #666;
    }

    .item-price {
      font-size: 1.1rem;
      font-weight: bold;
      color: #d32f2f;
    }

    .order-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .info-section h2 {
      color: #333;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .info-section p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      color: #666;
    }

    .summary-row.total {
      border-top: 2px solid #eee;
      margin-top: 0.5rem;
      padding-top: 1rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #333;
    }

    .estimated-time {
      text-align: center;
    }

    .time {
      font-size: 1.5rem;
      font-weight: bold;
      color: #d32f2f;
    }

    .not-found {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .not-found h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    .not-found p {
      color: #666;
      margin-bottom: 2rem;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      background: #d32f2f;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn:hover {
      background: #b71c1c;
    }

    @media (max-width: 968px) {
      .order-content {
        grid-template-columns: 1fr;
      }

      .progress-tracker {
        padding: 1rem;
      }

      .step-icon {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
      }

      .progress-line {
        width: 40px;
      }

      .step-label {
        font-size: 0.8rem;
      }
    }
  `]
})
export class OrderTrackingComponent implements OnInit {
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);
  
  order = signal<Order | null>(null);

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      const foundOrder = this.orderService.getOrderById(orderId);
      if (foundOrder) {
        this.order.set(foundOrder);
      }
    }
  }

  getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.CONFIRMED]: 'Confirmado',
      [OrderStatus.PREPARING]: 'Preparando',
      [OrderStatus.READY]: 'Listo',
      [OrderStatus.OUT_FOR_DELIVERY]: 'En Camino',
      [OrderStatus.DELIVERED]: 'Entregado',
      [OrderStatus.CANCELLED]: 'Cancelado'
    };
    return labels[status];
  }

  isStepActive(step: string): boolean {
    return this.order()?.status === step;
  }

  isStepCompleted(step: string): boolean {
    const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(this.order()?.status || '');
    const stepIndex = statusOrder.indexOf(step);
    return currentIndex > stepIndex;
  }

  formatTime(date: Date): string {
    const d = new Date(date);
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
}
