import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { MenuItem, MenuCategory } from '../../core/models/menu-item.model';
import { SelectedCustomization } from '../../core/models/cart.model';
import { NotificationModalComponent } from '../../shared/components/modal/notification-modal.component';
import { ProductCustomizationModalComponent } from '../../shared/components/modal/product-customization-modal.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationModalComponent, ProductCustomizationModalComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuService = inject(MenuService);
  cartService = inject(CartService);
  selectedCategory = signal<MenuCategory | null>(null);

  categories = [
    { value: MenuCategory.KEBAB, label: 'Kebabs' },
    { value: MenuCategory.DURUM, label: 'Durums' },
    { value: MenuCategory.PLATO, label: 'Platos' },
    { value: MenuCategory.ENSALADA, label: 'Ensaladas' },
    { value: MenuCategory.BEBIDA, label: 'Bebidas' },
    { value: MenuCategory.POSTRE, label: 'Postres' }
  ];

  searchInput = signal('');
  searchQuery = signal('');

  filteredItems = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery();
    
    // Si no hay categoría ni búsqueda, no mostrar productos
    if (!category && !query) {
      return [];
    }
    
    let items = this.menuService.items();
    
    // Filtrar por categoría si está seleccionada
    if (category) {
      items = items.filter(item => item.category === category);
    }
    
    // Filtrar por búsqueda si hay query
    if (query) {
      const queryLower = query.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(queryLower) ||
        item.description.toLowerCase().includes(queryLower)
      );
    }
    
    return items;
  });

  selectCategory(category: MenuCategory | null): void {
    this.selectedCategory.set(category);
  }

  onSearch(): void {
    this.searchQuery.set(this.searchInput());
  }

  // Modal de personalización
  showCustomizationModal = signal(false);
  selectedProduct = signal<MenuItem | null>(null);

  addToCart(item: MenuItem): void {
    // Si el producto tiene personalizaciones, mostrar el modal
    if (item.customizations && item.customizations.length > 0) {
      this.selectedProduct.set(item);
      this.showCustomizationModal.set(true);
    } else {
      // Si no tiene personalizaciones, añadir directamente al carrito
      try {
        this.cartService.addItem(item, 1, []);
        this.notificationMessage.set(`${item.name} añadido al carrito`);
        this.showNotification.set(true);
      } catch (error) {
        this.notificationMessage.set('Error al añadir el producto');
        this.showNotification.set(true);
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

  showNotification = signal(false);
  notificationMessage = signal('');

  closeNotification(): void {
    this.showNotification.set(false);
  }
}
