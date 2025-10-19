import { Component, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="notification-overlay" (click)="close.emit()">
        <div class="notification-modal" (click)="$event.stopPropagation()" [class.success]="type() === 'success'" [class.error]="type() === 'error'" [class.info]="type() === 'info'">
          <div class="notification-modal__icon">
            @if (type() === 'success') {
              <span>✓</span>
            } @else if (type() === 'error') {
              <span>✗</span>
            } @else {
              <span>ℹ</span>
            }
          </div>
          
          <div class="notification-modal__content">
            @if (title()) {
              <h3 class="notification-modal__title">{{ title() }}</h3>
            }
            
            @if (message()) {
              <p class="notification-modal__message">{{ message() }}</p>
            }
          </div>

          <button class="notification-modal__close" (click)="close.emit()" aria-label="Cerrar">
            ✕
          </button>
        </div>
      </div>
    }
  `,
  styles: `
    .notification-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.2s ease-out;
      padding: 2rem;
    }

    .notification-modal {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 450px;
      width: 100%;
      margin-top: 2rem;
      padding: 1.5rem;
      animation: slideDown 0.3s ease-out;
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
      border-left: 4px solid #4caf50;
    }

    .notification-modal.success {
      border-left-color: #4caf50;
    }

    .notification-modal.error {
      border-left-color: #f44336;
    }

    .notification-modal.info {
      border-left-color: #2196f3;
    }

    .notification-modal__icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      background: #e8f5e9;
      color: #4caf50;
    }

    .notification-modal.success .notification-modal__icon {
      background: #e8f5e9;
      color: #4caf50;
    }

    .notification-modal.error .notification-modal__icon {
      background: #ffebee;
      color: #f44336;
    }

    .notification-modal.info .notification-modal__icon {
      background: #e3f2fd;
      color: #2196f3;
    }

    .notification-modal__content {
      flex: 1;
      min-width: 0;
    }

    .notification-modal__title {
      margin: 0 0 0.25rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #333;
    }

    .notification-modal__message {
      margin: 0;
      font-size: 0.9375rem;
      color: #666;
      line-height: 1.5;
    }

    .notification-modal__close {
      flex-shrink: 0;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
      transition: color 0.2s;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .notification-modal__close:hover {
      color: #333;
      background: #f5f5f5;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .notification-overlay {
        padding: 1rem;
        align-items: flex-start;
      }

      .notification-modal {
        margin-top: 1rem;
        padding: 1.25rem;
      }

      .notification-modal__icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      .notification-modal__title {
        font-size: 1rem;
      }

      .notification-modal__message {
        font-size: 0.875rem;
      }
    }
  `
})
export class NotificationModalComponent {
  // Inputs
  isOpen = input<boolean>(false);
  title = input<string>('');
  message = input<string>('');
  type = input<'success' | 'error' | 'info'>('success');
  autoClose = input<boolean>(true);
  autoCloseDelay = input<number>(3000); // 3 segundos por defecto

  // Outputs
  close = output<void>();

  constructor() {
    // Auto-cerrar el modal después del delay si autoClose está activado
    effect(() => {
      if (this.isOpen() && this.autoClose()) {
        const timer = setTimeout(() => {
          this.close.emit();
        }, this.autoCloseDelay());

        // Cleanup del timer cuando el modal se cierre
        return () => clearTimeout(timer);
      }
      return;
    });
  }
}
