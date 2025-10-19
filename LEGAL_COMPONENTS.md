# Componentes de Privacidad y Términos

## Componentes Creados

### 1. Privacy Component (`/privacy`)
**Ubicación:** `src/app/features/privacy/`

**Archivos:**
- `privacy.component.ts` - Lógica del componente
- `privacy.component.html` - Template HTML
- `privacy.component.scss` - Estilos SCSS

**Contenido:**
- Información que recopilamos
- Cómo usamos la información
- Protección de datos
- Compartir información
- Cookies y tecnologías similares
- Derechos del usuario (RGPD)
- Retención de datos
- Menores de edad
- Cambios en la política
- Información de contacto

**Características:**
- ✅ Cumple con RGPD (Reglamento General de Protección de Datos)
- ✅ Diseño responsivo
- ✅ Enlaces de contacto funcionales
- ✅ Fecha de última actualización
- ✅ Botón de volver al inicio

---

### 2. Terms Component (`/terms`)
**Ubicación:** `src/app/features/terms/`

**Archivos:**
- `terms.component.ts` - Lógica del componente
- `terms.component.html` - Template HTML
- `terms.component.scss` - Estilos SCSS

**Contenido:**
- Aceptación de términos
- Uso del servicio (registro y pedidos)
- Precios y pagos
- Entrega y recogida
- Cancelaciones y reembolsos
- Calidad y seguridad alimentaria
- Reclamaciones
- Propiedad intelectual
- Limitación de responsabilidad
- Protección de datos
- Modificaciones de términos
- Ley aplicable y jurisdicción
- Información de contacto

**Características:**
- ✅ Cumple con normativa española
- ✅ Diseño responsivo
- ✅ Subsecciones organizadas
- ✅ Enlaces internos (a política de privacidad)
- ✅ Fecha de última actualización
- ✅ Botón de volver al inicio

---

## Rutas Configuradas

```typescript
{
  path: 'privacy',
  loadComponent: () => import('./features/privacy/privacy.component').then(m => m.PrivacyComponent)
},
{
  path: 'terms',
  loadComponent: () => import('./features/terms/terms.component').then(m => m.TermsComponent)
}
```

---

## Acceso a los Componentes

### Desde el Footer
Los enlaces están disponibles en el footer de todas las páginas:
- "Privacidad" → `/privacy`
- "Términos y Condiciones" → `/terms`

### Acceso Directo
- **Política de Privacidad:** `http://localhost:4200/privacy`
- **Términos y Condiciones:** `http://localhost:4200/terms`

---

## Diseño y Estilos

### Elementos Comunes
- **Color principal:** Rojo (#d32f2f) para títulos y acentos
- **Fondo:** Blanco sobre fondo gris claro (#f5f5f5)
- **Tipografía:** Limpia y legible con line-height 1.8
- **Sombras:** Sutiles para dar profundidad (box-shadow)
- **Border-radius:** 12px para tarjetas

### Responsive
- Diseño adaptable para móviles
- Padding y font-size ajustados para pantallas pequeñas
- Botones y enlaces táctiles fáciles de usar

### Iconos
- Uso de emojis para información de contacto (📧, 📞, 📍, 🕐)
- Checkmarks (✓) para listas de términos
- Bullets (•) para listas de privacidad

---

## Cumplimiento Legal

### RGPD (Privacy)
- ✅ Derecho de acceso
- ✅ Derecho de rectificación
- ✅ Derecho de eliminación
- ✅ Derecho de portabilidad
- ✅ Derecho de oposición
- ✅ Derecho de limitación

### Legislación Española (Terms)
- ✅ Ley aplicable: Legislación española
- ✅ Jurisdicción: Tribunales de Madrid
- ✅ IVA: 21% incluido en precios
- ✅ Retención de datos: 5 años (normativa fiscal)
- ✅ Consumidores: Plataforma EU de resolución de litigios

---

## Mantenimiento

### Actualización de Fechas
Para actualizar la fecha de última modificación, edita la propiedad `lastUpdate` en:
- `privacy.component.ts`
- `terms.component.ts`

```typescript
lastUpdate = new Date('2025-10-01'); // Cambiar aquí
```

### Actualización de Contenido
Los textos se pueden modificar en:
- `privacy.component.html`
- `terms.component.html`

---

## Testing

### Para Probar
1. Iniciar servidor: `ng serve`
2. Navegar a: `http://localhost:4200`
3. Scrollear hasta el footer
4. Hacer clic en "Privacidad" o "Términos y Condiciones"
5. Verificar que el contenido se carga correctamente
6. Probar el botón "← Volver al inicio"
7. Verificar responsive en móvil (F12 → Toggle device toolbar)

---

## Próximos Pasos

### Recomendaciones
1. Revisar contenido con un abogado especializado en protección de datos
2. Agregar banner de cookies (cookie consent)
3. Implementar sistema de consentimiento de cookies
4. Añadir formulario de contacto para ejercer derechos RGPD
5. Traducir a otros idiomas si es necesario
6. Agregar versión PDF descargable
