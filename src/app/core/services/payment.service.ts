import { Injectable, signal } from '@angular/core';
import { PaymentMethod, PaymentStatus } from '../models/order.model';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private processing = signal<boolean>(false);
  
  readonly isProcessing = this.processing.asReadonly();

  /**
   * Procesa un pago
   * En producción, esto se integraría con Stripe, PayPal, etc.
   */
  async processPayment(
    amount: number,
    method: PaymentMethod,
    paymentDetails?: any
  ): Promise<PaymentResult> {
    this.processing.set(true);

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      switch (method) {
        case PaymentMethod.CARD:
          return await this.processCardPayment(amount, paymentDetails);
        case PaymentMethod.PAYPAL:
          return await this.processPayPalPayment(amount);
        case PaymentMethod.CASH:
          return this.processCashPayment();
        default:
          throw new Error('Método de pago no soportado');
      }
    } catch (error) {
      console.error('Payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    } finally {
      this.processing.set(false);
    }
  }

  /**
   * Procesa pago con tarjeta
   * Aquí se integraría Stripe
   */
  private async processCardPayment(amount: number, cardDetails: any): Promise<PaymentResult> {
    // TODO: Integrar con Stripe
    console.log('Processing card payment:', amount, cardDetails);
    
    // Simulación
    if (Math.random() > 0.1) { // 90% éxito
      return {
        success: true,
        transactionId: `TXN-CARD-${Date.now()}`
      };
    } else {
      return {
        success: false,
        error: 'Tarjeta rechazada'
      };
    }
  }

  /**
   * Procesa pago con PayPal
   */
  private async processPayPalPayment(amount: number): Promise<PaymentResult> {
    // TODO: Integrar con PayPal
    console.log('Processing PayPal payment:', amount);
    
    return {
      success: true,
      transactionId: `TXN-PAYPAL-${Date.now()}`
    };
  }

  /**
   * Procesa pago en efectivo
   */
  private processCashPayment(): PaymentResult {
    return {
      success: true,
      transactionId: `TXN-CASH-${Date.now()}`
    };
  }

  /**
   * Valida datos de tarjeta
   */
  validateCardNumber(cardNumber: string): boolean {
    // Algoritmo de Luhn
    const digits = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(digits)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  /**
   * Valida fecha de expiración
   */
  validateExpiryDate(month: string, year: string): boolean {
    const now = new Date();
    const expiry = new Date(parseInt(year), parseInt(month) - 1);
    return expiry > now;
  }

  /**
   * Valida CVV
   */
  validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }
}
