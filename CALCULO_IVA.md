# 💰 Cambio en el Cálculo del IVA

## ✅ **Cambio Realizado**

### **ANTES** (Incorrecto)
Los precios del menú eran sin IVA, y se añadía el 10% al calcular:
- Kebab: 6.50€
- IVA (10%): +0.65€
- Total: 7.15€

### **AHORA** (Correcto) ✅
Los precios del menú **YA INCLUYEN el 21% de IVA**, como es habitual en España:
- Kebab: 6.50€ (IVA incluido)
  - Base imponible: 5.37€
  - IVA (21%): 1.13€
- Gastos de envío: +2.50€
- Total: 9.00€

---

## 📊 **Fórmulas Aplicadas**

### **Precios del Menú**
Todos los precios en el menú ya incluyen IVA del 21%

### **Cálculo en el Carrito**
1. **Subtotal** = Suma de (Precio × Cantidad)  
   ➔ Este subtotal YA incluye IVA

2. **Base Imponible** = Subtotal / 1.21  
   ➔ Precio sin IVA

3. **IVA** = Subtotal - Base Imponible  
   ➔ IVA incluido en el precio

4. **Total** = Subtotal + Gastos de Envío  
   ➔ Suma final a pagar

---

## 🎨 **Visualización en el Resumen**

```
┌─────────────────────────────────────┐
│    Resumen del Pedido              │
├─────────────────────────────────────┤
│ Subtotal (IVA incluido)    19.50€  │
│   - Base imponible         16.12€  │
│   - IVA (21%)               3.38€  │
│ Gastos de envío             2.50€  │
├─────────────────────────────────────┤
│ Total a pagar              22.00€  │
└─────────────────────────────────────┘
```

---

## 📝 **Archivos Modificados**

### 1. **CartService** (`cart.service.ts`)
```typescript
// Cambio del TAX_RATE
private readonly TAX_RATE = 0.21; // Era 0.10

// Nueva señal: Base imponible
readonly baseImponible = computed(() => 
  this.subtotal() / (1 + this.TAX_RATE)
);

// IVA recalculado
readonly tax = computed(() => 
  this.subtotal() - this.baseImponible()
);

// Total sin duplicar IVA
readonly total = computed(() => 
  this.subtotal() + this.DELIVERY_FEE
);
```

### 2. **CartComponent** (`cart.component.ts`)
- Actualizado el template para mostrar:
  - "Subtotal (IVA incluido)"
  - Desglose de Base imponible
  - Desglose de IVA (21%)
  - "Total a pagar"

### 3. **CheckoutComponent** (`checkout.component.ts`)
- Mismo desglose que el carrito
- Consistencia visual en todo el flujo de compra

---

## 🧪 **Cómo Probarlo**

### **Paso 1: Añade Productos**
1. Ve al menú: `http://localhost:4200/menu`
2. Añade un Kebab Clásico (6.50€)

### **Paso 2: Ve al Carrito**
1. Haz clic en el carrito
2. Verás:
   ```
   Subtotal (IVA incluido): 6.50€
     - Base imponible: 5.37€
     - IVA (21%): 1.13€
   Gastos de envío: 2.50€
   Total a pagar: 9.00€
   ```

### **Paso 3: Prueba con Múltiples Productos**
1. Añade 2 Kebabs (6.50€ × 2 = 13.00€)
2. Añade 1 Durum (7.50€)
3. Subtotal: 20.50€
   - Base imponible: 16.94€
   - IVA (21%): 3.56€
4. Con envío: 23.00€

---

## 💡 **Ejemplo Real**

### Pedido de Ejemplo:
- 2x Kebab Clásico: 13.00€
- 1x Durum XXL: 7.50€
- 1x Coca-Cola: 1.50€

### Desglose:
```
Subtotal (IVA incluido):    22.00€
  - Base imponible:         18.18€
  - IVA (21%):               3.82€
Gastos de envío:             2.50€
─────────────────────────────────
Total a pagar:              24.50€
```

---

## ✅ **Cumple con la Normativa**

Este sistema cumple con:
- ✅ **Ley de IVA en España** (21% general)
- ✅ **Transparencia**: Muestra precio con IVA y desglose
- ✅ **Facturación**: Base imponible e IVA calculados correctamente

---

**Los precios del menú ya no cambiarán. El IVA está incluido desde el principio.** 🎯
