# 🔍 Guía de Depuración del Carrito

## ✅ Pasos para Identificar el Problema

### 1. **Abre la Consola del Navegador**
   - Presiona **F12**
   - Ve a la pestaña **"Console"**

### 2. **Limpia el localStorage**
   ```javascript
   localStorage.clear()
   ```
   - Presiona **Enter**
   - Recarga la página con **Ctrl+F5**

### 3. **Ve al Menú**
   - Navega a `http://localhost:4200/menu`
   - En la consola deberías ver:
     ```
     🍕 MenuService: Constructor llamado
     🍕 MenuService: Iniciando carga del menú...
     📋 MenuComponent: Constructor llamado
     📋 MenuComponent: Items en el menú: 0
     ```

### 4. **Haz clic en "Añadir al Carrito"**
   - Haz clic en el botón de cualquier producto
   - En la consola deberías ver:
     ```
     Añadiendo al carrito: {...}
     🛒 CartService.addItem llamado: {...}
     🛒 CartService: Nuevo cartItem creado: {...}
     🛒 CartService: Items actualizados. Total: 1
     🛒 CartService: Estado final - itemCount: 1
     Item añadido. Total items: 1
     🛒 HeaderComponent: Contador del carrito actualizado: 1
     ```

### 5. **Verifica el Badge del Carrito**
   - Mira el icono del carrito 🛒 en el header
   - Debería aparecer un **número rojo** con la cantidad

### 6. **Haz clic en el Carrito**
   - Haz clic en el icono del carrito
   - Te lleva a `http://localhost:4200/cart`

## 🐛 Posibles Problemas

### ❌ Problema 1: No aparece el badge en el carrito
**Causa:** El signal no se está actualizando
**Solución:** 
```javascript
// En la consola del navegador
localStorage.getItem('kebab-cart')
```
Si retorna `null`, el carrito no se está guardando.

### ❌ Problema 2: La página del carrito está vacía
**Causa:** El CartService no está cargando los items
**Solución:**
```javascript
// En la consola del navegador (cuando estés en /cart)
console.log('Items del carrito:', document.querySelector('app-cart'))
```

### ❌ Problema 3: No se añaden productos
**Causa:** Puede haber un error silencioso
**En la consola busca:**
- Mensajes de error en rojo
- Warnings en amarillo

## 🔧 Comandos de Depuración

Copia y pega estos comandos en la consola del navegador:

```javascript
// 1. Ver el localStorage
console.log('localStorage:', localStorage.getItem('kebab-cart'));

// 2. Parsear el carrito
try {
  const cart = JSON.parse(localStorage.getItem('kebab-cart'));
  console.log('Carrito parseado:', cart);
  console.log('Total items:', cart?.length || 0);
} catch(e) {
  console.error('Error parseando carrito:', e);
}

// 3. Ver todos los items de localStorage
console.log('Todos los items de localStorage:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, '=', localStorage.getItem(key));
}
```

## 📋 Checklist de Verificación

- [ ] ¿El servidor está corriendo? (`http://localhost:4200`)
- [ ] ¿La consola muestra los logs con emojis?
- [ ] ¿Aparece el mensaje "Añadiendo al carrito" cuando haces clic?
- [ ] ¿Hay algún error en rojo en la consola?
- [ ] ¿El badge del carrito se actualiza?
- [ ] ¿El localStorage tiene datos?

## 📸 Información a Reportar

Si sigue sin funcionar, proporciona:

1. **Captura de pantalla** de la consola con todos los logs
2. **Qué acción específica** no funciona:
   - [ ] No se añaden productos al carrito
   - [ ] No aparece el número en el badge
   - [ ] La página /cart está vacía
   - [ ] Los botones de cantidad no funcionan
   - [ ] El botón "Vaciar carrito" no funciona
3. **Mensajes de error** exactos (copia y pega)
4. **Resultado** de ejecutar los comandos de depuración arriba

---

**El carrito debería funcionar perfectamente. Si sigues viendo problemas, ejecuta estos pasos y reporta los resultados.** 🛒
