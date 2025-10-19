import { Injectable, signal } from '@angular/core';
import { OrderStatus } from '../models/order.model';

export interface Notification {
  id: string;
  title: string;
  body: string;
  data?: any;
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = signal<Notification[]>([]);
  private pushToken = signal<string | null>(null);
  private permissionGranted = signal<boolean>(false);

  readonly allNotifications = this.notifications.asReadonly();
  readonly unreadCount = signal(0);
  readonly token = this.pushToken.asReadonly();

  /**
   * Solicita permiso para notificaciones push
   */
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.permissionGranted.set(true);
      await this.initializePushNotifications();
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      this.permissionGranted.set(granted);
      
      if (granted) {
        await this.initializePushNotifications();
      }
      
      return granted;
    }

    return false;
  }

  /**
   * Inicializa las notificaciones push
   * En producción, esto se integraría con Firebase Cloud Messaging
   */
  private async initializePushNotifications(): Promise<void> {
    // TODO: Integrar con Firebase Cloud Messaging
    console.log('Initializing push notifications...');
    
    // Generar token simulado
    const token = `FCM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.pushToken.set(token);
    
    // Aquí se enviaría el token al backend para asociarlo con el usuario
  }

  /**
   * Muestra una notificación local
   */
  showNotification(title: string, body: string, data?: any): void {
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      title,
      body,
      data,
      timestamp: new Date(),
      read: false
    };

    this.notifications.update(notifs => [notification, ...notifs]);
    this.updateUnreadCount();

    // Mostrar notificación del navegador si hay permiso
    if (this.permissionGranted() && 'Notification' in window) {
      new window.Notification(title, {
        body,
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        tag: notification.id
      });
    }
  }

  /**
   * Notifica sobre cambio de estado de pedido
   */
  notifyOrderStatus(orderId: string, status: OrderStatus): void {
    const messages: Record<OrderStatus, { title: string; body: string }> = {
      [OrderStatus.PENDING]: {
        title: 'Pedido Recibido',
        body: `Tu pedido #${orderId} ha sido recibido`
      },
      [OrderStatus.CONFIRMED]: {
        title: 'Pedido Confirmado',
        body: `Tu pedido #${orderId} ha sido confirmado`
      },
      [OrderStatus.PREPARING]: {
        title: 'Preparando Pedido',
        body: `Estamos preparando tu pedido #${orderId}`
      },
      [OrderStatus.READY]: {
        title: 'Pedido Listo',
        body: `Tu pedido #${orderId} está listo`
      },
      [OrderStatus.OUT_FOR_DELIVERY]: {
        title: 'En Camino',
        body: `Tu pedido #${orderId} está en camino`
      },
      [OrderStatus.DELIVERED]: {
        title: 'Pedido Entregado',
        body: `Tu pedido #${orderId} ha sido entregado. ¡Buen provecho!`
      },
      [OrderStatus.CANCELLED]: {
        title: 'Pedido Cancelado',
        body: `Tu pedido #${orderId} ha sido cancelado`
      }
    };

    const message = messages[status];
    this.showNotification(message.title, message.body, { orderId, status });
  }

  /**
   * Marca una notificación como leída
   */
  markAsRead(notificationId: string): void {
    this.notifications.update(notifs =>
      notifs.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    this.updateUnreadCount();
  }

  /**
   * Marca todas las notificaciones como leídas
   */
  markAllAsRead(): void {
    this.notifications.update(notifs =>
      notifs.map(n => ({ ...n, read: true }))
    );
    this.updateUnreadCount();
  }

  /**
   * Elimina una notificación
   */
  deleteNotification(notificationId: string): void {
    this.notifications.update(notifs =>
      notifs.filter(n => n.id !== notificationId)
    );
    this.updateUnreadCount();
  }

  /**
   * Actualiza el contador de no leídas
   */
  private updateUnreadCount(): void {
    const count = this.notifications().filter(n => !n.read).length;
    this.unreadCount.set(count);
  }
}
