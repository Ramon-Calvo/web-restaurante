import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { MenuItem } from '../../core/models/menu-item.model';
import { SelectedCustomization } from '../../core/models/cart.model';
import { NotificationModalComponent } from '../../shared/components/modal/notification-modal.component';
import { ProductCustomizationModalComponent } from '../../shared/components/modal/product-customization-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NotificationModalComponent, ProductCustomizationModalComponent],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero__content">
          <h1>Kebab Restaurant</h1>
          <p>El auténtico sabor mediterráneo</p>
        </div>
      </section>

      <!-- Popular Items -->
      <section class="popular">
        <div class="container">
          <h2>Platos Populares</h2>
          <div class="popular__grid">
            <div class="popular-card">
              <div class="popular-card__image">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2021/04/kebab-que-es.jpg" alt="Kebab Clásico">
              </div>
              <h3>Kebab Clásico</h3>
              <span class="price">6.50€</span>
              <button (click)="addProductToCart('1')" class="btn-add">Añadir al carrito</button>
            </div>
            <div class="popular-card">
              <div class="popular-card__image">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2020/04/durum-kebab.jpg" alt="Durum XXL">
              </div>
              <h3>Durum XXL</h3>
              <span class="price">7.50€</span>
              <button (click)="addProductToCart('2')" class="btn-add">Añadir al carrito</button>
            </div>
            <div class="popular-card">
              <div class="popular-card__image">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2022/04/receta-kebab-con-arroz.jpg" alt="Plato Kebab">
              </div>
              <h3>Plato Kebab</h3>
              <span class="price">9.50€</span>
              <button (click)="addProductToCart('3')" class="btn-add">Añadir al carrito</button>
            </div>
            <div class="popular-card">
              <div class="popular-card__image">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2024/11/receta-pizza-de-kebab.jpg" alt="Pizza Kebab">
              </div>
              <h3>Pizza Kebab</h3>
              <span class="price">8.50€</span>
              <button (click)="addProductToCart('8')" class="btn-add">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2>¿Por qué elegirnos?</h2>
          <div class="features__grid">
            <div class="feature-card">
              <div class="feature-icon">🌮</div>
              <h3>Productos frescos</h3>
              <p>Ingredientes de calidad</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🚚</div>
              <h3>Rápido</h3>
              <p>En 30 minutos</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💳</div>
              <h3>Seguro</h3>
              <p>Pago confiable</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Notificaciones</h3>
              <p>El estado de tu pedido en tiempo real</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Notification Modal -->
      <app-notification-modal 
        [isOpen]="showNotification()" 
        [message]="notificationMessage()"
        type="success"
        (close)="closeNotification()">
      </app-notification-modal>

      <!-- Modal de personalización -->
      @if (showCustomizationModal() && selectedProduct()) {
        <app-product-customization-modal
          [show]="showCustomizationModal()"
          [product]="selectedProduct()!"
          (confirm)="onConfirmCustomization($event)"
          (cancel)="onCancelCustomization()"
        ></app-product-customization-modal>
      }

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <h2>¿Listo para disfrutar?</h2>
          <a routerLink="/menu" class="btn btn--large">Ordenar Ahora</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
    }

    .hero {
      background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
      color: white;
      padding: 3.5rem 1rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .hero__content h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
      font-weight: bold;
    }

    .hero__content p {
      font-size: 1.1rem;
      margin-bottom: 0;
      opacity: 0.95;
    }

    .btn {
      padding: 0.9rem 2.25rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s;
      display: inline-block;
    }

    .btn--small {
      padding: 0.45rem 1.25rem;
      font-size: 0.85rem;
    }

    .btn--large {
      padding: 1rem 2.5rem;
      font-size: 1.05rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    section {
      padding: 2.5rem 0;
    }

    h2 {
      text-align: center;
      font-size: 1.75rem;
      margin-bottom: 2rem;
      color: #333;
    }

    .features__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .feature-card {
      text-align: center;
      padding: 1.5rem;
      border-radius: 10px;
      background: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-3px);
    }

    .feature-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 1.15rem;
      font-weight: 600;
    }

    .feature-card p {
      color: #666;
      line-height: 1.4;
      font-size: 0.95rem;
    }

    .popular {
      background: #f5f5f5;
    }

    .popular__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }

    .popular-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .popular-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .popular-card__image {
      width: 100%;
      height: 160px;
      overflow: hidden;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .popular-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .popular-card:hover .popular-card__image img {
      transform: scale(1.05);
    }

    .popular-card h3 {
      padding: 1.25rem 1rem 0.5rem;
      color: #333;
      font-size: 1.1rem;
      margin: 0;
    }

    .price {
      display: block;
      padding: 0 1rem 0.25rem;
      font-size: 1.3rem;
      font-weight: bold;
      color: #d32f2f;
      margin-bottom: 1rem;
    }

    .popular-card .btn-add {
      margin: 0 1rem 1rem;
      padding: 0.6rem 1.2rem;
      background: #d32f2f;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      transition: background 0.2s;
    }

    .popular-card .btn-add:hover {
      background: #b71c1c;
    }

    .cta {
      background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
      color: white;
      text-align: center;
    }

    .cta h2 {
      color: white;
    }

    .cta p {
      font-size: 1.05rem;
      margin-bottom: 1rem;
      opacity: 0.95;
    }

    .cta .btn {
      background: white;
      color: #d32f2f;
    }

    .cta .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      .hero {
        padding: 2rem 1rem;
      }

      .hero__content h1 {
        font-size: 1.6rem;
      }

      .hero__content p {
        font-size: 0.95rem;
      }

      section {
        padding: 2rem 0;
      }

      h2 {
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
      }

      .features__grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }

      .popular__grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  private menuService = inject(MenuService);
  private cartService = inject(CartService);
  
  showNotification = signal(false);
  notificationMessage = signal('');
  
  // Modal de personalización
  showCustomizationModal = signal(false);
  selectedProduct = signal<MenuItem | null>(null);

  addProductToCart(productId: string): void {
    console.log('🔍 HomeComponent: Buscando producto con ID:', productId);
    const product = this.menuService.getItemById(productId);
    console.log('📦 HomeComponent: Producto encontrado:', product);
    console.log('⚙️ HomeComponent: Tiene customizaciones?', product?.customizations?.length);
    
    if (product) {
      // Si el producto tiene personalizaciones, mostrar el modal
      if (product.customizations && product.customizations.length > 0) {
        console.log('✅ HomeComponent: Mostrando modal de personalización');
        this.selectedProduct.set(product);
        this.showCustomizationModal.set(true);
      } else {
        console.log('⚡ HomeComponent: Añadiendo directamente al carrito');
        // Si no tiene personalizaciones, añadir directamente al carrito
        try {
          this.cartService.addItem(product, 1, []);
          this.notificationMessage.set(`${product.name} añadido al carrito`);
          this.showNotification.set(true);
        } catch (error) {
          this.notificationMessage.set('Error al añadir el producto');
          this.showNotification.set(true);
        }
      }
    }
  }

  onConfirmCustomization(data: { customizations: SelectedCustomization[], quantity: number, specialInstructions: string }): void {
    const product = this.selectedProduct();
    if (product) {
      try {
        this.cartService.addItem(product, data.quantity, data.customizations, data.specialInstructions);
        this.notificationMessage.set(`${product.name} añadido al carrito`);
        this.showNotification.set(true);
      } catch (error) {
        this.notificationMessage.set('Error al añadir el producto');
        this.showNotification.set(true);
      }
    }
    this.showCustomizationModal.set(false);
    this.selectedProduct.set(null);
  }

  onCancelCustomization(): void {
    this.showCustomizationModal.set(false);
    this.selectedProduct.set(null);
  }

  closeNotification(): void {
    this.showNotification.set(false);
  }
}
