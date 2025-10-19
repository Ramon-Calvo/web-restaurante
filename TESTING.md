# 🔧 Instrucciones de Prueba - Paso a Paso

## ✅ Cambios Realizados

He añadido **console.log extensivos** para depurar exactamente dónde está el problema:

### 1. MenuService
- Log al iniciar constructor
- Log al cargar menú
- Log cuando el menú está cargado

### 2. MenuComponent  
- Log al inicializar
- Log con cantidad de items

### 3. CartService
- Log detallado en `addItem()` con cada paso
- Log del estado final después de añadir

### 4. HeaderComponent
- Log al inicializar
- Log cada vez que el contador cambia

### 5. Estilos Globales
- Añadido reset CSS completo
- Variables de color
- Estilos base para toda la aplicación

## 📋 PASOS PARA PROBAR

### **PASO 1: Limpia el Navegador**

1. Abre el navegador en `http://localhost:4200`
2. Presiona **F12** para abrir DevTools
3. Ve a la pestaña **"Console"**
4. Escribe y presiona Enter:
   ```javascript
   localStorage.clear()
   ```
5. Presiona **Ctrl+F5** para recargar con caché limpia

### **PASO 2: Verifica la Página de Inicio**

Deberías ver en la consola:
```
🎯 HeaderComponent: Inicializado
🎯 HeaderComponent: CartService items: []
🛒 HeaderComponent: Contador del carrito actualizado: 0
```

### **PASO 3: Ve al Menú**

1. Haz clic en el botón **"Menú"** en el header
2. En la consola deberías ver:
   ```
   🍕 MenuService: Constructor llamado
   🍕 MenuService: Iniciando carga del menú...
   📋 MenuComponent: Constructor llamado
   📋 MenuComponent: Items en el menú: 0
   (después de 500ms)
   🍕 MenuService: Menú cargado con 6 items
   ```

### **PASO 4: Añade un Producto**

1. Haz clic en **"Añadir al Carrito"** en cualquier producto
2. En la consola deberías ver:
   ```
   Añadiendo al carrito: {id: "1", name: "Kebab Clásico", ...}
   🛒 CartService.addItem llamado: {...}
   🛒 CartService: Nuevo cartItem creado: {...}
   🛒 CartService: Items actualizados. Total: 1
   🛒 CartService: Estado final - itemCount: 1
   Item añadido. Total items: 1
   🛒 HeaderComponent: Contador del carrito actualizado: 1
   ```
3. Deberías ver una **alerta** con el mensaje
4. En el header, el icono del carrito 🛒 debería mostrar un **badge rojo con "1"**

### **PASO 5: Ve al Carrito**

1. Haz clic en el **icono del carrito** en el header
2. Deberías ver el producto añadido con:
   - Imagen
   - Nombre
   - Precio
   - Botones de cantidad
   - Resumen del pedido

## 🐛 Si NO Funciona

### Si no ves los logs:

1. **Verifica que estés en la pestaña "Console"** (no "Network" ni otras)
2. **Asegúrate de que no haya filtros activos** en la consola
3. **Busca mensajes con emojis**: 🍕 🛒 🎯 📋

### Si ves errores en rojo:

1. **Copia el error completo**
2. **Pégalo aquí** para analizar
3. Busca especialmente estos errores:
   - `Cannot read property of undefined`
   - `signal is not a function`
   - `inject() must be called from an injection context`

### Si los botones no responden:

1. **Revisa si hay errores de JavaScript** (aparecen en rojo)
2. **Intenta hacer clic derecho** en un botón → "Inspeccionar elemento"
3. Ve a la pestaña **"Event Listeners"** para ver si tienen eventos

### Si el carrito no actualiza:

1. En la consola, escribe:
   ```javascript
   // Revisa el localStorage
   console.log('LocalStorage:', localStorage.getItem('kebab-cart'))
   ```
2. Si está vacío pero añadiste productos, hay un problema con `localStorage`

## 🔄 Si Nada Funciona

### Reinicia el servidor:

```powershell
# Detén el servidor actual (Ctrl+C en la terminal)
# Luego ejecuta:
npm start
```

### Limpia completamente:

```powershell
# Detén el servidor
# Luego:
Remove-Item -Recurse -Force .angular
npm start
```

## 📸 Captura lo que ves

Si después de estos pasos sigues teniendo problemas:

1. **Haz una captura de pantalla** de la consola con los logs
2. **Copia cualquier error** en texto
3. **Describe exactamente** qué botón no funciona

---

**El servidor debe estar corriendo en: `http://localhost:4200/`**
