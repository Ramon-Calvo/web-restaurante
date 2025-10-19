import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="header__content">
          <div class="header__logo">
            <a routerLink="/">
              <span class="logo-icon">🥙</span>
              <span>Kebab Restaurant</span>
            </a>
          </div>

          <nav class="header__nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              Inicio
            </a>
            <a routerLink="/menu" routerLinkActive="active">
              Menú
            </a>
            <a routerLink="/about" routerLinkActive="active">
              Nosotros
            </a>
            <a routerLink="/contact" routerLinkActive="active">
              Contacto
            </a>
            @if (authService.isAuthenticated()) {
              <a routerLink="/orders" routerLinkActive="active">
                Mis Pedidos
              </a>
            }
          </nav>

          <div class="header__actions">
            <a routerLink="/cart" class="cart-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              @if (cartItemCount() > 0) {
                <span class="cart-badge">{{ cartItemCount() }}</span>
              }
            </a>

            @if (authService.isAuthenticated()) {
              <div class="user-menu">
                <button class="user-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {{ authService.user()?.name }}
                </button>
              </div>
            } @else {
              <a routerLink="/login" class="login-button">
                Iniciar Sesión
              </a>
            }
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .header__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }

    .header__logo a {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      text-decoration: none;
      color: #333;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .logo-icon {
      font-size: 1.75rem;
    }

    .header__nav {
      display: flex;
      gap: 1.5rem;
    }

    .header__nav a {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s;
    }

    .header__nav a:hover,
    .header__nav a.active {
      color: #d32f2f;
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .cart-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #f5f5f5;
      color: #333;
      font-size: 1.15rem;
      transition: background 0.2s;
      text-decoration: none;
    }

    .cart-button:hover {
      background: #e0e0e0;
    }

    .cart-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #d32f2f;
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 0.95rem;
      color: #333;
    }

    .login-button {
      padding: 0.45rem 1.25rem;
      background: #d32f2f;
      color: white;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      transition: background 0.2s;
    }

    .login-button:hover {
      background: #b71c1c;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header__content {
        height: auto;
        padding: 0.75rem 0;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .header__logo {
        order: 1;
        flex: 1;
      }

      .header__logo a {
        font-size: 1rem;
      }

      .logo-icon {
        font-size: 1.5rem;
      }

      .header__actions {
        order: 2;
        gap: 0.5rem;
      }

      .header__nav {
        order: 3;
        width: 100%;
        justify-content: space-around;
        gap: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid #f0f0f0;
      }

      .header__nav a {
        font-size: 0.85rem;
        padding: 0.25rem 0.5rem;
      }

      .login-button {
        padding: 0.4rem 1rem;
        font-size: 0.85rem;
      }

      .user-button {
        font-size: 0.85rem;
      }

      .user-button svg {
        width: 20px;
        height: 20px;
      }

      .cart-button {
        width: 32px;
        height: 32px;
      }

      .cart-button svg {
        width: 20px;
        height: 20px;
      }
    }

    @media (max-width: 480px) {
      .header__logo a span:last-child {
        display: none;
      }

      .header__nav {
        gap: 0.25rem;
      }

      .header__nav a {
        font-size: 0.8rem;
        padding: 0.25rem 0.35rem;
      }

      .login-button {
        padding: 0.35rem 0.85rem;
        font-size: 0.8rem;
      }

      .user-button span {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  
  cartItemCount = computed(() => {
    const count = this.cartService.itemCount();
    console.log('🛒 HeaderComponent: Contador del carrito actualizado:', count);
    return count;
  });

  constructor() {
    console.log('🎯 HeaderComponent: Inicializado');
    console.log('🎯 HeaderComponent: CartService items:', this.cartService.items());
  }
}
