# Componente "Nosotros" (About)

## Fecha: 17 de octubre de 2025

## Descripción

Página institucional que presenta la historia del restaurante, calidad de productos, valores y estadísticas.

---

## 📁 Ubicación

**Archivo**: `src/app/features/about/about.component.ts`  
**Ruta**: `/about`

---

## 🎯 Características

### 1. **Hero Section**
- Imagen de fondo del restaurante
- Título principal: "Nuestra Historia"
- Subtítulo: "Sabor auténtico desde 2005"
- Overlay oscuro para mejorar legibilidad

### 2. **Historia (20 Años de Tradición)**
- **Layout de 2 columnas**:
  - Texto descriptivo con la historia del restaurante
  - Imagen del local
- **Contenido**:
  - Fundación en 2005
  - Evolución de un pequeño local familiar
  - Compromiso con recetas tradicionales
  - 20 años de experiencia

### 3. **Ingredientes de Primera Calidad**
- **Grid de 4 tarjetas**:
  1. 🥩 **Carne Premium**
     - Proveedores locales
     - Marinado 24 horas
     - Especias secretas
  
  2. 🥬 **Verduras Frescas**
     - Entrega diaria
     - Mercado local
     - Máxima frescura
  
  3. 🍞 **Pan Artesanal**
     - Horneado diario
     - Horno tradicional
     - Textura perfecta
  
  4. 🌶️ **Salsas Caseras**
     - Recetas familiares
     - Preparación in-house
     - Sabor único

- **Efectos hover**: Elevación y sombra al pasar el ratón

### 4. **Valores Corporativos**
- **4 valores principales** con checkmarks:
  - ✓ Calidad Sin Compromisos
  - ✓ Tradición y Autenticidad
  - ✓ Servicio Excepcional
  - ✓ Sostenibilidad

- **Diseño**: Lista vertical con iconos verdes

### 5. **Estadísticas Destacadas**
- **Grid de 4 métricas**:
  - 📅 **20+ Años** de Experiencia
  - 👥 **50K+ Clientes** Satisfechos
  - ✅ **100% Ingredientes** Frescos
  - ⭐ **4.8 Valoración** Media

- **Diseño**: Tarjetas con gradiente rojo

### 6. **Call to Action (CTA)**
- Fondo naranja degradado
- 2 botones principales:
  - 🔴 "Ver Menú" (rojo, principal)
  - ⚪ "Contáctanos" (blanco con borde)

---

## 🎨 **Diseño Visual**

### Paleta de Colores:
- **Principal**: #d32f2f (Rojo corporativo)
- **Secundario**: #b71c1c (Rojo oscuro)
- **Fondo claro**: #f9f9f9
- **CTA fondo**: #fff3e0 → #ffe0b2 (gradiente naranja)
- **Texto**: #333 (títulos), #666 (cuerpo)
- **Verde**: #4caf50 (checkmarks)

### Efectos y Animaciones:
```css
/* Hover en tarjetas de calidad */
transform: translateY(-5px);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

/* Hover en imagen del local */
transform: scale(1.02);

/* Hover en valores */
transform: translateX(5px);

/* Hover en botones */
transform: translateY(-2px);
box-shadow: 0 6px 16px rgba(211, 47, 47, 0.4);
```

---

## 📱 **Responsive Design**

### Desktop (> 768px):
- Hero: 350px altura
- Grid de calidad: 2 columnas
- Grid de stats: 4 columnas
- Contenido: 2 columnas (texto + imagen)

### Mobile (≤ 768px):
- Hero: 250px altura
- Grid de calidad: 1 columna
- Grid de stats: 2x2 (2 columnas)
- Contenido: 1 columna (apilado)
- Botones CTA: Columna (uno debajo del otro)

---

## 🖼️ **Imágenes Utilizadas**

### Hero Background:
```
https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1200
```
- Kebab apetitoso
- Con overlay oscuro

### Imagen del Local:
```
https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600
```
- Restaurante acogedor
- Con caption descriptivo

---

## 🔗 **Integración**

### Rutas:
```typescript
{
  path: 'about',
  loadComponent: () => import('./features/about/about.component')
    .then(m => m.AboutComponent)
}
```

### Navegación:
```html
<!-- Header -->
<a routerLink="/about">Nosotros</a>

<!-- Footer -->
<a routerLink="/about">Sobre Nosotros</a>

<!-- CTA -->
<a href="/menu">Ver Menú</a>
<a href="/contact">Contáctanos</a>
```

---

## 📋 **Secciones Detalladas**

### 1. Hero Section
```html
<section class="about-hero">
  <div class="hero-overlay">
    <h1>Nuestra Historia</h1>
    <p class="subtitle">Sabor auténtico desde 2005</p>
  </div>
</section>
```

### 2. Historia
```html
<section class="history-section">
  <div class="content-grid">
    <div class="text-content">
      <!-- Texto con highlights -->
    </div>
    <div class="image-content">
      <img src="..." alt="Nuestro restaurante">
      <p class="image-caption">...</p>
    </div>
  </div>
</section>
```

### 3. Calidad
```html
<section class="quality-section">
  <div class="quality-grid">
    <div class="quality-card">
      <div class="card-icon">🥩</div>
      <h3>Carne Premium</h3>
      <p>...</p>
    </div>
    <!-- Repetir para 4 tarjetas -->
  </div>
</section>
```

### 4. Valores
```html
<section class="values-section">
  <div class="values-list">
    <div class="value-item">
      <div class="value-icon">✓</div>
      <div class="value-content">
        <h3>...</h3>
        <p>...</p>
      </div>
    </div>
    <!-- Repetir para 4 valores -->
  </div>
</section>
```

### 5. Estadísticas
```html
<section class="stats-section">
  <div class="stat-card">
    <div class="stat-number">20+</div>
    <div class="stat-label">Años de Experiencia</div>
  </div>
  <!-- Repetir para 4 stats -->
</section>
```

### 6. CTA
```html
<section class="cta-section">
  <h2>¿Listo para probar la diferencia?</h2>
  <p>Visítanos o haz tu pedido online</p>
  <div class="cta-buttons">
    <a href="/menu" class="btn-primary">Ver Menú</a>
    <a href="/contact" class="btn-secondary">Contáctanos</a>
  </div>
</section>
```

---

## ✨ **Características Destacadas**

### UX:
- ✅ Navegación clara
- ✅ Secciones bien diferenciadas
- ✅ Iconos visuales para facilitar lectura
- ✅ CTAs estratégicos
- ✅ Información estructurada

### Performance:
- ✅ Lazy loading del componente
- ✅ Imágenes optimizadas de Unsplash
- ✅ CSS inline (sin archivos externos)
- ✅ Sin dependencias externas

### Diseño:
- ✅ Consistente con la marca
- ✅ Responsive en todos los dispositivos
- ✅ Animaciones sutiles
- ✅ Tipografía jerarquizada
- ✅ Espaciado equilibrado

---

## 🎯 **Objetivos de la Página**

1. **Generar confianza**: 20 años de experiencia
2. **Destacar calidad**: Ingredientes premium
3. **Comunicar valores**: Tradición, servicio, sostenibilidad
4. **Impulsar conversión**: CTAs claros a menú y contacto
5. **Contar historia**: Conexión emocional con clientes

---

## 📊 **Métricas y Estadísticas**

### Datos mostrados:
- **20+ años**: Experiencia en el sector
- **50K+ clientes**: Satisfechos a lo largo de los años
- **100%**: Ingredientes frescos garantizados
- **4.8⭐**: Valoración promedio de clientes

*Nota: Estos datos son ejemplos. Actualizar con datos reales del restaurante.*

---

## 🚀 **Mejoras Futuras Posibles**

- [ ] Galería de fotos del restaurante
- [ ] Testimonios de clientes
- [ ] Video de presentación
- [ ] Timeline interactivo (2005-2025)
- [ ] Equipo/Staff del restaurante
- [ ] Certificaciones de calidad
- [ ] Premios y reconocimientos
- [ ] Mapa de ubicación integrado
- [ ] Formulario de contacto inline

---

## 📁 **Archivos Relacionados**

1. **about.component.ts** - Componente principal
2. **app.routes.ts** - Ruta `/about`
3. **header.component.ts** - Enlace "Nosotros" en navegación

---

## ✅ **Estado**

**Implementado**: ✅ Completado  
**Errores**: 0  
**Responsive**: ✅ Sí  
**SEO**: Meta tags pendientes  
**Accesibilidad**: ARIA pendiente  

---

## 🎉 **Resumen**

Página "Nosotros" completamente funcional que presenta:
- Historia del restaurante (desde 2005)
- Calidad de ingredientes (carne, verduras, pan, salsas)
- Valores corporativos (calidad, tradición, servicio, sostenibilidad)
- Estadísticas impresionantes
- CTAs efectivos para conversión

**Acceso**: `http://localhost:4200/about`
