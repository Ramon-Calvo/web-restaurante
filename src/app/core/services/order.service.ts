import { Injectable, signal } from '@angular/core';
import { Order, OrderStatus, DeliveryInfo, PaymentInfo } from '../models/order.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentOrder = signal<Order | null>(null);
  private orderHistory = signal<Order[]>([]);
  private loading = signal<boolean>(false);

  readonly order = this.currentOrder.asReadonly();
  readonly history = this.orderHistory.asReadonly();
  readonly isLoading = this.loading.asReadonly();

  /**
   * Crea una nueva orden
   */
  async createOrder(
    cart: Cart,
    deliveryInfo: DeliveryInfo,
    paymentInfo: PaymentInfo,
    userId: string
  ): Promise<Order> {
    this.loading.set(true);

    const order: Order = {
      id: this.generateOrderId(),
      userId,
      items: cart.items,
      status: OrderStatus.PENDING,
      deliveryInfo,
      paymentInfo,
      subtotal: cart.subtotal,
      tax: cart.tax,
      deliveryFee: cart.deliveryFee,
      total: cart.total,
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDeliveryTime: this.calculateEstimatedDeliveryTime()
    };

    // Aquí se enviaría la orden a Firebase/API
    await this.simulateOrderCreation(order);
    
    this.currentOrder.set(order);
    this.orderHistory.update(history => [order, ...history]);
    this.loading.set(false);

    return order;
  }

  /**
   * Actualiza el estado de una orden
   */
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    this.loading.set(true);

    // Simular actualización
    await new Promise(resolve => setTimeout(resolve, 500));

    this.orderHistory.update(history =>
      history.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );

    if (this.currentOrder()?.id === orderId) {
      const updatedOrder = this.orderHistory().find(o => o.id === orderId);
      if (updatedOrder) {
        this.currentOrder.set(updatedOrder);
      }
    }

    this.loading.set(false);
  }

  /**
   * Obtiene una orden por ID
   */
  getOrderById(orderId: string): Order | undefined {
    return this.orderHistory().find(order => order.id === orderId);
  }

  /**
   * Obtiene órdenes por usuario
   */
  getOrdersByUser(userId: string): Order[] {
    return this.orderHistory().filter(order => order.userId === userId);
  }

  /**
   * Cancela una orden
   */
  async cancelOrder(orderId: string): Promise<void> {
    await this.updateOrderStatus(orderId, OrderStatus.CANCELLED);
  }

  /**
   * Genera un ID único para la orden
   */
  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Calcula el tiempo estimado de entrega
   */
  private calculateEstimatedDeliveryTime(): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // 30 minutos por defecto
    return now;
  }

  /**
   * Simula la creación de una orden en el backend
   */
  private async simulateOrderCreation(order: Order): Promise<void> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Order created:', order);
  }
}
