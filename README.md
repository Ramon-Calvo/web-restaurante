# 🥙 Kebab Restaurant - Aplicación Web Angular 20

Aplicación web moderna para restaurante de kebabs desarrollada con **Angular 20** utilizando las últimas características: componentes standalone, signals, nueva sintaxis de control de flujo (`@if`, `@for`), y Server-Side Rendering (SSR).

## 🚀 Características Principales

- ✅ **Componentes Standalone** - Arquitectura modular y escalable
- ✅ **Signals** - Gestión de estado reactiva y eficiente
- ✅ **Nueva Sintaxis de Control** - `@if`, `@for`, `@else` de Angular 17+
- ✅ **Server-Side Rendering (SSR)** - Mejor SEO y rendimiento
- ✅ **Lazy Loading** - Carga optimizada de rutas
- ✅ **Responsive Design** - Funciona en todos los dispositivos
- 🔄 **Sistema de Carrito** - Gestión completa de pedidos
- 💳 **Plataforma de Pagos** - Integración con Stripe/PayPal (preparada)
- 📱 **Notificaciones Push** - Alertas de pedidos al móvil (preparada)
- 🔐 **Autenticación** - Sistema de usuarios (preparado para Firebase)

## 📁 Estructura del Proyecto

```
kebab-restaurant/
├── src/
│   ├── app/
│   │   ├── core/                    # Núcleo de la aplicación
│   │   │   ├── models/              # Modelos e interfaces
│   │   │   │   ├── menu-item.model.ts
│   │   │   │   ├── cart.model.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   └── user.model.ts
│   │   │   ├── services/            # Servicios globales
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── menu.service.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   ├── guards/              # Guards de rutas
│   │   │   └── interceptors/        # HTTP Interceptors
│   │   ├── features/                # Módulos de funcionalidades
│   │   │   ├── home/                # Página inicio
│   │   │   ├── menu/                # Menú de productos
│   │   │   ├── cart/                # Carrito de compras
│   │   │   ├── checkout/            # Proceso de pago
│   │   │   └── order-tracking/      # Seguimiento de pedidos
│   │   ├── shared/                  # Componentes compartidos
│   │   │   └── components/
│   │   │       ├── header.component.ts
│   │   │       └── footer.component.ts
│   │   ├── app.ts                   # Componente raíz
│   │   ├── app.html                 # Template principal
│   │   ├── app.routes.ts            # Configuración de rutas
│   │   └── app.routes.server.ts     # Rutas SSR
│   ├── assets/                      # Recursos estáticos
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   └── menu/
│   │   └── icons/
│   └── styles.scss                  # Estilos globales
├── .github/
│   └── copilot-instructions.md      # Instrucciones del proyecto
├── package.json
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **Signals** - Gestión de estado reactiva
- **SSR (Server-Side Rendering)** - Renderizado del lado del servidor
- **Firebase** - Backend (preparado para integración)
- **Stripe/PayPal** - Pasarelas de pago (preparado para integración)

## 📦 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm 9.x o superior

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd Kebab
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start                # Inicia servidor de desarrollo
npm run dev              # Alias de npm start

# Construcción
npm run build            # Construye para producción
npm run build:ssr        # Construye con SSR

# Servidor
npm run serve:ssr        # Sirve la aplicación con SSR

# Pruebas
npm test                 # Ejecuta las pruebas unitarias
npm run test:watch       # Pruebas en modo watch

# Linting
npm run lint             # Analiza el código
```

## 🎯 Funcionalidades Implementadas

### 1. Sistema de Menú
- Visualización de productos por categorías
- Búsqueda de productos
- Filtrado por categoría
- Indicadores de disponibilidad
- Nivel de picante
- Opciones vegetarianas/veganas

### 2. Carrito de Compras
- Añadir/eliminar productos
- Ajustar cantidades
- Personalizaciones de productos
- Instrucciones especiales
- Cálculo automático de totales (subtotal, IVA, envío)
- Persistencia en localStorage

### 3. Proceso de Pedido
- Selección de tipo de entrega (domicilio/recoger)
- Formulario de información de contacto
- Dirección de entrega
- Múltiples métodos de pago (tarjeta, PayPal, efectivo)
- Validación de formularios

### 4. Seguimiento de Pedidos
- Visualización del estado del pedido
- Barra de progreso interactiva
- Tiempo estimado de entrega
- Historial de pedidos

### 5. Sistema de Autenticación
- Login/Registro de usuarios
- Gestión de perfil
- Direcciones guardadas
- Preferencias de notificaciones

## 🔧 Configuración

### Firebase (Opcional)

Para habilitar Firebase, configura las credenciales en `src/environments/`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_AUTH_DOMAIN',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_STORAGE_BUCKET',
    messagingSenderId: 'TU_MESSAGING_SENDER_ID',
    appId: 'TU_APP_ID'
  }
};
```

### Stripe/PayPal

Configura tus claves de API en los servicios correspondientes:
- `src/app/core/services/payment.service.ts`

## 📱 Notificaciones Push

Para habilitar notificaciones push:

1. Configurar Firebase Cloud Messaging
2. Solicitar permisos al usuario
3. El servicio `NotificationService` gestiona las notificaciones

## 🎨 Personalización

### Colores

Modifica los colores en `src/styles.scss`:

```scss
:root {
  --primary-color: #d32f2f;
  --secondary-color: #b71c1c;
  // ...
}
```

### Logo e Imágenes

Coloca tus imágenes en:
- Logo: `src/assets/images/logo/`
- Productos: `src/assets/images/menu/`
- Iconos: `src/assets/icons/`

## 🌐 Deployment

### Producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/kebab-restaurant/browser/`

### Con SSR

```bash
npm run build:ssr
npm run serve:ssr
```

### Plataformas de Deploy

- **Firebase Hosting**
- **Vercel**
- **Netlify**
- **AWS Amplify**
- **Azure Static Web Apps**

## 📚 Aprende Más

- [Documentación de Angular](https://angular.dev)
- [Angular Signals](https://angular.dev/guide/signals)
- [Nueva Sintaxis de Control](https://angular.dev/essentials/conditionals-and-loops)
- [Server-Side Rendering](https://angular.dev/guide/ssr)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Angular 20

## 🙏 Agradecimientos

- Angular Team por el increíble framework
- Comunidad de Angular en español
- Todos los contribuidores

---

**¿Necesitas ayuda?** Abre un issue en el repositorio.

**¿Te gusta el proyecto?** Dale una ⭐ en GitHub!
