import { Injectable, signal } from '@angular/core';
import { MenuItem, MenuCategory } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems = signal<MenuItem[]>([]);
  private loading = signal<boolean>(false);

  // Señales públicas de solo lectura
  readonly items = this.menuItems.asReadonly();
  readonly isLoading = this.loading.asReadonly();

  constructor() {
    console.log('🍕 MenuService: Constructor llamado');
    this.loadMenu();
  }

  /**
   * Carga el menú completo
   * En producción, esto se conectaría a Firebase/API
   */
  loadMenu(): void {
    console.log('🍕 MenuService: Iniciando carga del menú...');
    this.loading.set(true);
    
    // Datos de ejemplo - reemplazar con llamada a API/Firebase
    const mockMenu: MenuItem[] = [
      {
        id: '1',
        name: 'Kebab Clásico',
        description: 'Delicioso kebab con carne de ternera, verduras frescas y salsa especial',
        price: 6.50,
        category: MenuCategory.KEBAB,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2021/04/kebab-que-es.jpg',
        available: true,
        ingredients: ['Carne de ternera', 'Lechuga', 'Tomate', 'Cebolla', 'Salsa yogur'],
        spicyLevel: 1,
        customizations: [
          {
            id: 'carne',
            name: 'Tipo de carne',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'ternera', name: 'Ternera', price: 0 },
              { id: 'pollo', name: 'Pollo', price: 0 },
              { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }
            ]
          },
          {
            id: 'ensalada',
            name: 'Ensalada',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'con-ensalada', name: 'Con ensalada', price: 0 },
              { id: 'sin-ensalada', name: 'Sin ensalada', price: 0 }
            ]
          },
          {
            id: 'salsa',
            name: 'Salsa',
            required: false,
            maxSelections: 2,
            options: [
              { id: 'salsa-roja', name: 'Salsa roja', price: 0 },
              { id: 'salsa-blanca', name: 'Salsa blanca', price: 0 }
            ]
          },
          {
            id: 'extras',
            name: 'Extras',
            required: false,
            maxSelections: 1,
            options: [
              { id: 'extra-carne', name: 'Extra de carne', price: 1.00 }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Durum XXL',
        description: 'Durum extra grande con carne al gusto y todos los ingredientes',
        price: 7.50,
        category: MenuCategory.DURUM,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2020/04/durum-kebab.jpg',
        available: true,
        ingredients: ['Carne', 'Verduras', 'Queso', 'Salsas'],
        spicyLevel: 2,
        customizations: [
          {
            id: 'carne',
            name: 'Tipo de carne',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'ternera', name: 'Ternera', price: 0 },
              { id: 'pollo', name: 'Pollo', price: 0 },
              { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }
            ]
          },
          {
            id: 'ensalada',
            name: 'Ensalada',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'con-ensalada', name: 'Con ensalada', price: 0 },
              { id: 'sin-ensalada', name: 'Sin ensalada', price: 0 }
            ]
          },
          {
            id: 'salsa',
            name: 'Salsa',
            required: false,
            maxSelections: 2,
            options: [
              { id: 'salsa-roja', name: 'Salsa roja', price: 0 },
              { id: 'salsa-blanca', name: 'Salsa blanca', price: 0 }
            ]
          },
          {
            id: 'extras',
            name: 'Extras',
            required: false,
            maxSelections: 1,
            options: [
              { id: 'extra-carne', name: 'Extra de carne', price: 1.00 }
            ]
          }
        ]
      },
      {
        id: '3',
        name: 'Plato Kebab',
        description: 'Plato combinado con arroz, carne de kebab, ensalada y patatas',
        price: 9.50,
        category: MenuCategory.PLATO,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2022/04/receta-kebab-con-arroz.jpg',
        available: true,
        ingredients: ['Carne kebab', 'Arroz', 'Ensalada', 'Patatas fritas'],
        spicyLevel: 1,
        customizations: [
          {
            id: 'carne',
            name: 'Tipo de carne',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'ternera', name: 'Ternera', price: 0 },
              { id: 'pollo', name: 'Pollo', price: 0 },
              { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }
            ]
          },
          {
            id: 'ensalada',
            name: 'Ensalada',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'con-ensalada', name: 'Con ensalada', price: 0 },
              { id: 'sin-ensalada', name: 'Sin ensalada', price: 0 }
            ]
          },
          {
            id: 'salsa',
            name: 'Salsa',
            required: false,
            maxSelections: 2,
            options: [
              { id: 'salsa-roja', name: 'Salsa roja', price: 0 },
              { id: 'salsa-blanca', name: 'Salsa blanca', price: 0 }
            ]
          },
          {
            id: 'extras',
            name: 'Extras',
            required: false,
            maxSelections: 1,
            options: [
              { id: 'extra-carne', name: 'Extra de carne', price: 1.00 }
            ]
          }
        ]
      },
      {
        id: '4',
        name: 'Ensalada Kebab',
        description: 'Ensalada fresca con carne de kebab, verduras y aderezo',
        price: 8.00,
        category: MenuCategory.ENSALADA,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2021/11/ensalada-kebab.jpg',
        available: true,
        ingredients: ['Lechuga', 'Tomate', 'Cebolla', 'Maíz', 'Carne kebab'],
        isVegetarian: false
      },
      {
        id: '7',
        name: 'Pedrata Kebab',
        description: 'Pan de pita tostado con carne de kebab, queso fundido y verduras',
        price: 7.00,
        category: MenuCategory.KEBAB,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2023/03/que-es-una-pedrata.jpg',
        available: true,
        ingredients: ['Pan pita', 'Carne kebab', 'Queso', 'Verduras', 'Salsas'],
        spicyLevel: 1,
        customizations: [
          {
            id: 'carne',
            name: 'Tipo de carne',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'ternera', name: 'Ternera', price: 0 },
              { id: 'pollo', name: 'Pollo', price: 0 },
              { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }
            ]
          },
          {
            id: 'salsa',
            name: 'Salsa',
            required: false,
            maxSelections: 2,
            options: [
              { id: 'salsa-roja', name: 'Salsa roja', price: 0 },
              { id: 'salsa-blanca', name: 'Salsa blanca', price: 0 }
            ]
          },
          {
            id: 'extras',
            name: 'Extras',
            required: false,
            maxSelections: 2,
            options: [
              { id: 'extra-carne', name: 'Extra de carne', price: 1.00 },
              { id: 'arroz', name: 'Arroz', price: 1.50 }
            ]
          }
        ]
      },
      {
        id: '5',
        name: 'Coca-Cola',
        description: 'Coca-Cola 33cl',
        price: 1.50,
        category: MenuCategory.BEBIDA,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        available: true,
        ingredients: ['Refresco']
      },
      {
        id: '6',
        name: 'Baklava',
        description: 'Postre tradicional turco con miel y frutos secos',
        price: 3.00,
        category: MenuCategory.POSTRE,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2021/02/baklava-postre-turco.jpg',
        available: true,
        ingredients: ['Pasta filo', 'Miel', 'Nueces', 'Pistachos']
      },
      {
        id: '8',
        name: 'Pizza Kebab',
        description: 'Deliciosa pizza con carne de kebab, verduras frescas y queso',
        price: 8.50,
        category: MenuCategory.KEBAB,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2024/11/receta-pizza-de-kebab.jpg',
        available: true,
        ingredients: ['Masa de pizza', 'Carne de kebab', 'Queso mozzarella', 'Tomate', 'Cebolla', 'Pimientos'],
        customizations: [
          {
            id: 'carne',
            name: 'Tipo de carne',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'ternera', name: 'Ternera', price: 0 },
              { id: 'pollo', name: 'Pollo', price: 0 },
              { id: 'mixto', name: 'Mixto', price: 0.50 }
            ]
          },
          {
            id: 'extras',
            name: 'Extras',
            required: false,
            maxSelections: 3,
            options: [
              { id: 'extra-queso', name: 'Extra queso', price: 1.00 },
              { id: 'aceitunas', name: 'Aceitunas', price: 0.75 },
              { id: 'jalapeños', name: 'Jalapeños', price: 0.75 },
              { id: 'champiñones', name: 'Champiñones', price: 1.00 }
            ]
          }
        ]
      },
      {
        id: '9',
        name: 'Kebab Falafel',
        description: 'Opción vegetariana con deliciosas bolitas de falafel, verduras frescas y salsa de yogur',
        price: 6.00,
        category: MenuCategory.KEBAB,
        image: 'https://www.gourmetkebab.es/wp-content/uploads/2022/06/kebab-de-falafel.jpg',
        available: true,
        ingredients: ['Falafel', 'Lechuga', 'Tomate', 'Cebolla', 'Pepino', 'Salsa de yogur'],
        customizations: [
          {
            id: 'ensalada',
            name: '¿Con ensalada?',
            required: true,
            maxSelections: 1,
            options: [
              { id: 'con-ensalada', name: 'Con ensalada', price: 0 },
              { id: 'sin-ensalada', name: 'Sin ensalada', price: 0 }
            ]
          },
          {
            id: 'extras',
            name: 'Extras',
            required: false,
            maxSelections: 1,
            options: [
              { id: 'queso', name: 'Queso', price: 1.00 }
            ]
          }
        ]
      }
    ];

    // Simular carga asíncrona
    setTimeout(() => {
      console.log('🍕 MenuService: Menú cargado con', mockMenu.length, 'items');
      this.menuItems.set(mockMenu);
      this.loading.set(false);
    }, 500);
  }

  /**
   * Obtiene items por categoría
   */
  getItemsByCategory(category: MenuCategory): MenuItem[] {
    return this.menuItems().filter(item => item.category === category);
  }

  /**
   * Obtiene un item por ID
   */
  getItemById(id: string): MenuItem | undefined {
    return this.menuItems().find(item => item.id === id);
  }

  /**
   * Busca items por nombre
   */
  searchItems(query: string): MenuItem[] {
    const lowerQuery = query.toLowerCase();
    return this.menuItems().filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
  }
}
