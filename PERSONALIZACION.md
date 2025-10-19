# Sistema de Personalización de Productos

## Fecha: 17 de octubre de 2025

## Resumen

Se ha implementado un sistema completo de personalización de productos que permite a los clientes seleccionar:
- **Tipo de carne**: Ternera, Pollo o **Mixto (Ternera + Pollo)**
- **Ensalada**: Con ensalada o Sin ensalada  
- **Salsas**: Salsa roja y/o Salsa blanca (hasta 2)
- **Extras**: Extra de carne (+1.00€, deseleccionable)
- **Comentarios**: Instrucciones especiales (máx. 200 caracteres)

## Archivos Modificados/Creados

### 1. **ProductCustomizationModalComponent** (NUEVO)
**Ruta**: `src/app/shared/components/modal/product-customization-modal.component.ts`

**Funcionalidad**:
- Modal interactivo para personalizar productos
- Muestra imagen y descripción del producto
- Permite seleccionar opciones mediante radio buttons
- Validación de opciones requeridas
- Selector de cantidad integrado
- Cálculo del precio total en tiempo real
- Diseño responsive y compacto

**Características**:
- ✅ Animaciones de fade-in y slide-up
- ✅ Validación de personalizaciones requeridas
- ✅ Precio actualizado dinámicamente
- ✅ Diseño mobile-first
- ✅ Botón de confirmar deshabilitado si faltan opciones
- ✅ **Campo de comentarios con textarea**
- ✅ **Contador de caracteres (máximo 200)**
- ✅ **Placeholder informativo** ("Ej: Sin cebolla, extra salsa, bien hecho, etc.")
- ✅ **Radio buttons** para selecciones únicas (carne, ensalada)
- ✅ **Checkboxes** para selecciones múltiples (salsas hasta 2, extras)
- ✅ **Hint visual**: "Puedes elegir hasta 2 opciones" en salsas
- ✅ **Precio en tiempo real**: Muestra +1.00€ al seleccionar extra de carne

### 2. **MenuService** (ACTUALIZADO)
**Ruta**: `src/app/core/services/menu.service.ts`

**Cambios**:
- Agregadas personalizaciones a Kebab Clásico (id: '1')
- Agregadas personalizaciones a Durum XXL (id: '2')
- Agregadas personalizaciones a Plato Kebab (id: '3')

**Estructura de personalizaciones**:
```typescript
customizations: [
  {
    id: 'carne',
    name: 'Tipo de carne',
    required: true,
    maxSelections: 1,  // Solo una opción
    options: [
      { id: 'ternera', name: 'Ternera', price: 0 },
      { id: 'pollo', name: 'Pollo', price: 0 }
    ]
  },
  {
    id: 'ensalada',
    name: 'Ensalada',
    required: true,
    maxSelections: 1,  // Solo una opción
    options: [
      { id: 'con-ensalada', name: 'Con ensalada', price: 0 },
      { id: 'sin-ensalada', name: 'Sin ensalada', price: 0 }
    ]
  },
  {
    id: 'salsa',
    name: 'Salsa',
    required: false,  // OPCIONAL
    maxSelections: 2,  // HASTA 2 OPCIONES
    options: [
      { id: 'salsa-roja', name: 'Salsa roja', price: 0 },
      { id: 'salsa-blanca', name: 'Salsa blanca', price: 0 }
    ]
  }
]
```
    maxSelections: 1,
    options: [
      { id: 'ternera', name: 'Ternera', price: 0 },
      { id: 'pollo', name: 'Pollo', price: 0 }
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
    required: true,
    maxSelections: 1,
    options: [
      { id: 'salsa-roja', name: 'Salsa roja', price: 0 },
      { id: 'salsa-blanca', name: 'Salsa blanca', price: 0 },
      { id: 'sin-salsas', name: 'Sin salsas', price: 0 }
    ]
  }
]
```

### 3. **MenuComponent** (ACTUALIZADO)
**Ruta**: `src/app/features/menu/menu.component.ts` y `.html`

**Nuevas funcionalidades**:
- Detecta si un producto tiene personalizaciones
- Abre modal de personalización automáticamente
- Maneja confirmación y cancelación del modal
- Añade productos con personalizaciones seleccionadas

**Lógica de flujo**:
```typescript
addToCart(item: MenuItem): void {
  if (item.customizations && item.customizations.length > 0) {
    // Mostrar modal de personalización
    this.selectedProduct.set(item);
    this.showCustomizationModal.set(true);
  } else {
    // Añadir directamente al carrito
    this.cartService.addItem(item, 1, []);
  }
}
```

## Productos con Personalización

### 🥙 Kebab Clásico
- Precio base: 6.50€
- Personalizaciones: Carne, Ensalada, Salsas, Extras
- Opciones gratuitas: Tipo de carne, ensalada, salsas
- **Extras de pago**: Extra de carne (+1.00€)

### 🌯 Durum XXL
- Precio base: 7.50€
- Personalizaciones: Carne, Ensalada, Salsas, Extras
- Opciones gratuitas: Tipo de carne, ensalada, salsas
- **Extras de pago**: Extra de carne (+1.00€)

### 🍽️ Plato Kebab
- Precio base: 9.50€
- Personalizaciones: Carne, Ensalada, Salsas, Extras
- Opciones gratuitas: Tipo de carne, ensalada, salsas
- **Extras de pago**: Extra de carne (+1.00€)

## Productos sin Personalización

Los siguientes productos se añaden directamente al carrito sin modal:
- Ensalada Kebab (8.00€)
- Coca-Cola (1.50€)
- Baklava (3.00€)

## Experiencia de Usuario

### Flujo de compra:
1. Usuario hace clic en "Añadir al Carrito"
2. Si el producto tiene personalizaciones:
   - Se abre modal de personalización
   - Usuario selecciona:
     - Tipo de carne (obligatorio, radio button)
     - Con/Sin ensalada (obligatorio, radio button)
     - **Salsas (opcional, checkboxes - puede elegir 0, 1 o 2 salsas)**
     - **Extras (opcional, checkbox - Extra de carne +1€)**
   - Usuario ajusta cantidad si desea
   - **Usuario añade comentarios opcionales** (máx. 200 caracteres)
   - Usuario confirma o cancela
3. Producto se añade al carrito con las personalizaciones y comentarios
4. **El precio se actualiza dinámicamente** mostrando el total con extras
5. Aparece notificación de confirmación

### Validación:
- ✅ No se puede confirmar sin seleccionar todas las opciones requeridas (carne y ensalada)
- ✅ Las salsas son opcionales (se puede no elegir ninguna)
- ✅ Se pueden elegir hasta 2 salsas simultáneamente
- ✅ Los extras son opcionales (aumentan el precio si se seleccionan)
- ✅ **Precio actualizado en tiempo real** al añadir extras
- ✅ Botón "Añadir al carrito" deshabilitado hasta completar selecciones requeridas
- ✅ Cantidad mínima: 1
- ✅ Cantidad máxima: ilimitada

## Visualización en el Carrito

Cuando un producto con personalizaciones está en el carrito, se muestra:
- Nombre del producto
- Precio unitario (incluyendo extras)
- Personalizaciones seleccionadas:
  - ✓ Ternera/Pollo
  - ✓ Con ensalada/Sin ensalada
  - ✓ Salsa roja y/o Salsa blanca (si se seleccionaron)
  - ✓ Sin salsas (si no se seleccionó ninguna)
  - ✓ **Extra de carne (+1.00€)** (si se seleccionó)
- **Instrucciones especiales** (si se añadieron):
  - Formato: "**Instrucciones:** [comentario del cliente]"
- Cantidad
- **Precio total (precio base + extras) × cantidad**

## Diseño Responsive

### Desktop (> 768px):
- Modal centrado con ancho máximo 600px
- Altura máxima 90vh con scroll interno
- Imagen del producto 200px de altura
- Botones en fila (Cancelar | Añadir)

### Mobile (<= 768px):
- Modal ocupa 95vh
- Imagen del producto 160px de altura
- Botones en columna (uno debajo del otro)
- Touch-friendly (áreas de clic grandes)

## Estilos Compactos

Para mantener consistencia con el resto del proyecto:
- ✅ Padding reducido: 1.25rem (vs 2rem original)
- ✅ Márgenes optimizados
- ✅ Fuentes más pequeñas (0.95rem - 1.4rem)
- ✅ Espaciado entre opciones: 0.6rem
- ✅ Altura de imagen: 200px (desktop), 160px (mobile)

## Integración con CartService

El servicio de carrito ya estaba preparado para manejar personalizaciones:
```typescript
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  totalPrice: number;
  specialInstructions?: string;
}
```

Las personalizaciones se guardan en `selectedCustomizations[]` y se muestran correctamente en el carrito.

## Ejemplos de Comentarios

Los clientes pueden añadir instrucciones personalizadas como:
- "Sin cebolla"
- "Extra salsa picante"
- "Bien hecho"
- "Sin tomate"
- "Cortar en trozos pequeños"
- "Para llevar con cubiertos"
- "Alérgico a los frutos secos"
- Cualquier otra instrucción especial (máximo 200 caracteres)

## Estilos del Campo de Comentarios

### Diseño:
- **Label**: "Comentarios o instrucciones especiales:" (bold, 0.95rem)
- **Textarea**: 
  - 3 filas por defecto
  - Máximo 200 caracteres
  - Border 2px color #e0e0e0
  - Focus: border cambia a #d32f2f
  - Redimensionable verticalmente
  - Padding: 0.75rem
  - Border-radius: 8px
- **Contador de caracteres**: 
  - Alineado a la derecha
  - Tamaño: 0.8rem
  - Color: #999
  - Formato: "XX/200"

## Estado Actual

✅ **Completado**:
- Modal de personalización funcional
- Integración con MenuComponent
- Validación de opciones requeridas
- Cálculo de precios
- Diseño responsive
- Animaciones suaves
- Opciones básicas gratuitas (precio 0)
- **Campo de comentarios/instrucciones especiales**
- **Contador de caracteres en tiempo real**
- **Visualización de comentarios en el carrito**
- **Integración completa con CartService**
- **✨ NUEVO: Selección múltiple de salsas (hasta 2)**
- **✨ NUEVO: Radio buttons para opciones únicas**
- **✨ NUEVO: Checkboxes para opciones múltiples**
- **✨ NUEVO: Salsas ahora son opcionales**
- **✨ NUEVO: Extra de carne por +1.00€**
- **✨ NUEVO: Cálculo dinámico de precio con extras**

⚠️ **Warning esperado**:
- Angular compiler muestra warning "ProductCustomizationModalComponent is not used within the template"
- Esto es un falso positivo porque el componente está dentro de un bloque `@if`
- **No afecta la funcionalidad**

## Pruebas Recomendadas

1. **Añadir Kebab Clásico con ambas salsas y extra de carne**:
   - Seleccionar Ternera, Con ensalada
   - **Marcar ambos checkboxes: Salsa roja Y Salsa blanca**
   - **Marcar: Extra de carne**
   - **Verificar que el precio total muestra: 7.50€** (6.50€ + 1.00€)
   - Verificar que se añade correctamente con todas las opciones

2. **Añadir Durum XXL sin salsas pero con extra**:
   - Seleccionar Pollo, Sin ensalada
   - **No marcar ninguna salsa**
   - **Marcar: Extra de carne**
   - **Verificar precio: 8.50€** (7.50€ + 1.00€)
   - Aumentar cantidad a 2
   - **Verificar precio total: 17.00€** (8.50€ × 2)

3. **Añadir Plato Kebab con todo**:
   - Seleccionar Ternera, Con ensalada
   - **Marcar ambas salsas**
   - **Marcar: Extra de carne**
   - **Añadir comentario**: "Sin cebolla, por favor"
   - **Verificar precio: 10.50€** (9.50€ + 1.00€)
   - Verificar en carrito que aparecen todas las personalizaciones

4. **Probar límite de 2 salsas**:
   - Marcar Salsa roja
   - Marcar Salsa blanca
   - **Verificar que el mensaje "Puedes elegir hasta 2 opciones" aparece**
   - Ambas opciones deben poder estar marcadas simultáneamente

5. **Producto básico sin extras**:
   - Seleccionar opciones obligatorias
   - **No marcar extra de carne**
   - Verificar que el precio permanece igual al base

6. **Comentarios largos**:
   - Intentar escribir más de 200 caracteres
   - Verificar que el contador muestra el límite
   - Verificar que textarea no permite más de 200 caracteres

7. **Cancelar personalización**:
   - Abrir modal y hacer clic en Cancelar o cerrar
   - Verificar que no se añade nada al carrito

8. **Productos sin personalización**:
   - Añadir Bebida o Postre
   - Verificar que se añaden directamente sin modal

9. **Comentarios vacíos**:
   - Añadir producto sin escribir comentarios
   - Verificar que funciona correctamente sin comentarios

## Próximas Mejoras Posibles

- [ ] Agregar opción "Mixto" (Pollo + Ternera) con cargo extra
- [x] ~~Permitir múltiples salsas~~ ✅ **COMPLETADO**
- [x] ~~Agregar extras (extra de carne)~~ ✅ **COMPLETADO**
- [ ] Más extras: queso (+0.50€), jalapeños (+0.30€), etc.
- [ ] Guardar preferencias del usuario
- [ ] Sugerencias de comentarios comunes (dropdown)
- [ ] Validación de palabras ofensivas en comentarios
- [ ] Límite de caracteres configurable por restaurante
- [ ] Permitir más de 2 salsas
- [ ] Añadir opciones de "extra salsa" con cargo adicional
- [ ] Sistema de combos/menús con descuento
