# Guía de Depuración

## Problemas Reportados

1. **La página de menú no abre**
2. **Los productos no se añaden al carrito**

## Pasos para Verificar

### 1. Abrir la Consola del Navegador

1. Abre http://localhost:4200 en Chrome o Firefox
2. Presiona F12 para abrir las herramientas de desarrollador
3. Ve a la pestaña "Console"
4. Busca errores en rojo

### 2. Navegar al Menú

1. Haz clic en "Menú" en la navegación
2. O ve directamente a http://localhost:4200/menu
3. Verifica en la consola si hay errores

### 3. Probar Añadir al Carrito

1. En la página del menú, haz clic en "Añadir al Carrito" en cualquier producto
2. Debería aparecer una alerta de JavaScript
3. Verifica los logs en la consola (busca "Añadiendo al carrito:")
4. El número en el icono del carrito (header) debería incrementarse

### 4. Verificar el Carrito

1. Haz clic en el icono del carrito en el header
2. O ve a http://localhost:4200/cart
3. Verifica que los productos añadidos aparecen

## Logs de Depuración

El componente de menú tiene logs de consola:
- `console.log('Añadiendo al carrito:', item)` - Al hacer clic en añadir
- `console.log('Item añadido. Total items:', count)` - Después de añadir

## Posibles Soluciones

### Si el menú no carga:
- Verifica que el MenuService esté cargando los datos
- Abre la consola y escribe: `localStorage.clear()` y recarga

### Si el carrito no funciona:
- Verifica localStorage en la consola: Application > Local Storage
- Limpia el localStorage y vuelve a intentar

### Si hay errores de CORS con imágenes:
- Las imágenes de Unsplash deberían funcionar
- Si no, aparecerá la imagen de placeholder

## Comandos Útiles

```powershell
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
Remove-Item -Recurse -Force node_modules
npm install

# Limpiar y rebuilding
npm run build
```

## Verificación Manual

Puedes probar el servicio directamente en la consola del navegador:

```javascript
// En la consola del navegador después de cargar la página
const menuService = document.querySelector('app-root').__ngContext__[8].get('MenuService');
console.log('Items del menú:', menuService.items());

const cartService = document.querySelector('app-root').__ngContext__[8].get('CartService');
console.log('Items del carrito:', cartService.items());
console.log('Total items:', cartService.itemCount());
```
