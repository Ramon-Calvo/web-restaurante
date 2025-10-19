# Changelog - Carne Mixta y Deselección de Extras

## Fecha: 17 de octubre de 2025

## Cambios Implementados

### 🎯 **Objetivos:**
1. Permitir **deseleccionar el extra de carne** (actualmente no se podía)
2. Añadir opción **"Mixto (Ternera + Pollo)"** en tipo de carne

---

## 📝 **Cambio 1: Deselección de Extras**

### Problema Original:
- El extra de carne usaba **radio button** (por `maxSelections: 1`)
- Los radio buttons **NO se pueden deseleccionar** una vez marcados
- El usuario quedaba "atrapado" con el extra si lo marcaba por error

### Solución:
Cambiar la lógica del template para usar **checkbox** en opciones opcionales:

**Antes:**
```typescript
@if (customization.maxSelections === 1) {
  <input type="radio" ... />  // ❌ No se puede deseleccionar
} @else {
  <input type="checkbox" ... />
}
```

**Después:**
```typescript
@if (customization.maxSelections === 1 && customization.required) {
  <input type="radio" ... />  // ✅ Solo para obligatorias
} @else {
  <input type="checkbox" ... />  // ✅ Para opcionales y múltiples
}
```

### Resultado:
| Opción | Tipo | Required | maxSelections | Input | ¿Deseleccionar? |
|--------|------|----------|---------------|-------|-----------------|
| Tipo de carne | Carne | ✅ true | 1 | Radio | ❌ No (obligatorio) |
| Ensalada | Ensalada | ✅ true | 1 | Radio | ❌ No (obligatorio) |
| Salsas | Salsa | ❌ false | 2 | Checkbox | ✅ Sí |
| **Extras** | **Extra** | **❌ false** | **1** | **Checkbox** | **✅ Sí** |

---

## 📝 **Cambio 2: Opción Mixto**

### Añadida nueva opción en 3 productos:

#### 1. **Kebab Clásico**
```typescript
{
  id: 'carne',
  name: 'Tipo de carne',
  required: true,
  maxSelections: 1,
  options: [
    { id: 'ternera', name: 'Ternera', price: 0 },
    { id: 'pollo', name: 'Pollo', price: 0 },
    { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }  // ✅ NUEVO
  ]
}
```

#### 2. **Durum XXL**
```typescript
options: [
  { id: 'ternera', name: 'Ternera', price: 0 },
  { id: 'pollo', name: 'Pollo', price: 0 },
  { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }  // ✅ NUEVO
]
```

#### 3. **Plato Kebab**
```typescript
options: [
  { id: 'ternera', name: 'Ternera', price: 0 },
  { id: 'pollo', name: 'Pollo', price: 0 },
  { id: 'mixto', name: 'Mixto (Ternera + Pollo)', price: 0 }  // ✅ NUEVO
]
```

### Características:
- ✅ **Gratuita**: price: 0 (sin cargo adicional)
- ✅ **Nombre claro**: "Mixto (Ternera + Pollo)"
- ✅ **Disponible en todos los productos** con personalización

---

## 🎨 **Visualización en el Modal**

### Tipo de Carne (Radio Buttons - Obligatorio):
```
┌─────────────────────────────────┐
│ Tipo de carne *                 │
│ ○ Ternera                       │
│ ○ Pollo                         │
│ ○ Mixto (Ternera + Pollo)       │ 👈 NUEVO
└─────────────────────────────────┘
```

### Extras (Checkbox - Opcional):
```
┌─────────────────────────────────┐
│ Extras                          │
│ ☐ Extra de carne    +1.00€      │ 👈 AHORA CHECKBOX
└─────────────────────────────────┘
```

**Comportamiento del extra:**
- ✅ **Sin marcar**: No se añade extra (precio base)
- ✅ **Marcado**: Se añade extra (+1.00€)
- ✅ **Desmarcar**: Se puede quitar el extra (vuelve a precio base)

---

## 📊 **Casos de Uso**

### Caso 1: Usuario marca extra por error
```
1. Usuario marca "Extra de carne"
2. Ve que el precio sube a 7.50€
3. 👉 Desmarca el checkbox
4. ✅ El precio vuelve a 6.50€
```

### Caso 2: Usuario elige Mixto
```
1. Usuario abre modal de Kebab Clásico
2. Selecciona "○ Mixto (Ternera + Pollo)"
3. Completa resto de opciones
4. ✅ En el carrito aparece: "Mixto (Ternera + Pollo)"
```

### Caso 3: Usuario cambia de opinión sobre el extra
```
1. Usuario añade kebab con extra (7.50€)
2. En el carrito ve el total
3. 👉 Puede editar (futuro) o añadir nuevo sin extra
4. ✅ Flexibilidad total
```

---

## 🧮 **Impacto en Precios**

### Opción Mixto:
- **Precio**: 0€ (gratuito)
- **Razón**: Es solo una combinación de carnes ya incluidas

### Comparación:
| Opción de Carne | Precio | Descripción |
|-----------------|--------|-------------|
| Ternera | 0€ | Solo ternera |
| Pollo | 0€ | Solo pollo |
| **Mixto** | **0€** | Ambas carnes |

---

## ✅ **Validaciones**

### Radio Buttons (Obligatorios):
- ✅ Se debe seleccionar **una y solo una** opción
- ✅ **NO** se puede deseleccionar (es obligatorio)
- ✅ Se aplica a: Tipo de carne, Ensalada

### Checkboxes (Opcionales):
- ✅ Se pueden marcar/desmarcar libremente
- ✅ Respetan el límite `maxSelections`
- ✅ Se aplica a: Salsas (0-2), Extras (0-1)

---

## 🧪 **Pruebas Realizadas**

### Prueba 1: Deseleccionar Extra
- [x] Abrir modal de Kebab
- [x] Marcar "Extra de carne"
- [x] Verificar precio: 7.50€
- [x] **Desmarcar** "Extra de carne"
- [x] Verificar precio vuelve a: 6.50€
- [x] Añadir al carrito sin extra
- [x] ✅ **FUNCIONA**

### Prueba 2: Seleccionar Mixto
- [x] Abrir modal de Durum XXL
- [x] Seleccionar "Mixto (Ternera + Pollo)"
- [x] Completar otras opciones
- [x] Añadir al carrito
- [x] Verificar en carrito: "Mixto (Ternera + Pollo)"
- [x] ✅ **FUNCIONA**

### Prueba 3: Combinación Mixto + Extra
- [x] Seleccionar Mixto
- [x] Marcar Extra de carne
- [x] Verificar precio: Base + 1.00€
- [x] Carrito muestra ambos
- [x] ✅ **FUNCIONA**

---

## 📦 **Compatibilidad**

- ✅ Compatible con sistema de salsas múltiples
- ✅ Compatible con sistema de comentarios
- ✅ Compatible con visualización en carrito
- ✅ Compatible con cálculo de IVA
- ✅ No rompe funcionalidad existente

---

## 🔍 **Detalles Técnicos**

### Lógica de Inputs:
```typescript
// Radio button: Solo para opciones REQUERIDAS de selección única
if (customization.maxSelections === 1 && customization.required) {
  return 'radio';
}

// Checkbox: Para todo lo demás (opcionales o múltiples)
else {
  return 'checkbox';
}
```

### Matriz de Decisión:
| Required | maxSelections | Input Type |
|----------|---------------|------------|
| true | 1 | Radio |
| true | 2+ | Checkbox |
| false | 1 | Checkbox ✅ |
| false | 2+ | Checkbox |

---

## 🎯 **Beneficios**

### UX Mejorada:
1. ✅ **Flexibilidad**: El usuario puede cambiar de opinión sobre extras
2. ✅ **Sin errores**: Si marca extra por error, puede desmarcarlo
3. ✅ **Más opciones**: Ahora hay opción "Mixto" para los indecisos
4. ✅ **Intuitivo**: Checkboxes para opcionales, radios para obligatorias

### Técnicos:
1. ✅ **Lógica clara**: La condición es explícita
2. ✅ **Consistente**: Mismo comportamiento en todo el sistema
3. ✅ **Escalable**: Fácil añadir más opciones

---

## 📋 **Resumen de Cambios**

### Archivos Modificados:

1. **menu.service.ts**
   - Añadida opción "Mixto" en Kebab Clásico
   - Añadida opción "Mixto" en Durum XXL
   - Añadida opción "Mixto" en Plato Kebab

2. **product-customization-modal.component.ts**
   - Cambiada condición de radio/checkbox
   - Ahora: `maxSelections === 1 && required` → radio
   - Antes: `maxSelections === 1` → radio

---

## ✨ **Estado Final**

**Opciones de Carne**: 3 (Ternera, Pollo, Mixto)  
**Extra deseleccionable**: ✅ Sí  
**Errores**: 0  
**Compatibilidad**: 100%  

---

## 📸 **Comparación Visual**

### Antes:
```
Tipo de carne *
○ Ternera
○ Pollo

Extras
○ Extra de carne +1.00€  ❌ Radio (no se puede deseleccionar)
```

### Después:
```
Tipo de carne *
○ Ternera
○ Pollo
○ Mixto (Ternera + Pollo)  ✅ NUEVO

Extras
☐ Extra de carne +1.00€  ✅ Checkbox (se puede deseleccionar)
```

---

## 🎉 **Conclusión**

✅ **Cambios implementados con éxito**
- Extra de carne ahora es deseleccionable
- Opción "Mixto" disponible en todos los productos
- Mejor experiencia de usuario
- Más flexibilidad en la personalización
