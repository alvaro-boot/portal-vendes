# Paleta de Colores - Portal Vendes

## Descripción

Esta es la paleta de colores oficial de Vendes que debe ser utilizada consistentemente en todo el portal para mantener la identidad visual de la marca.

## Colores Principales

### 🟣 Púrpura Profundo (#551BB3) - COLOR PRINCIPAL
- **Uso**: Color principal de la marca, elementos de navegación, acciones principales
- **Aplicaciones**: Botones principales, enlaces, elementos de navegación, títulos importantes
- **Clase CSS**: `vendes-text-primary`, `vendes-bg-primary`

### 🟢 Verde Lima (#A9F04D) - COLOR SECUNDARIO
- **Uso**: Color secundario, elementos de éxito, acciones positivas
- **Aplicaciones**: Botones de acción secundaria, badges de estado activo, elementos destacados
- **Clase CSS**: `vendes-text-secondary`, `vendes-bg-secondary`

## Colores Neutros

### ⚪ Gris Claro Cálido (#E2DDD9)
- **Uso**: Fondos de formularios, bordes, elementos de interfaz
- **Aplicaciones**: Inputs, cards, separadores
- **Clase CSS**: `vendes-bg-neutral`, `vendes-border`

### ⚫ Gris Medio (#666666)
- **Uso**: Texto secundario, descripciones
- **Aplicaciones**: Texto de ayuda, subtítulos, información adicional
- **Clase CSS**: `vendes-text-neutral`

### ⚫ Gris Muy Oscuro (#292522)
- **Uso**: Texto principal, títulos
- **Aplicaciones**: Títulos, texto de lectura, elementos importantes
- **Clase CSS**: `vendes-text-dark`, `vendes-bg-dark`

### ⚪ Blanco Puro (#FFFFFF)
- **Uso**: Fondos principales, texto sobre colores oscuros
- **Aplicaciones**: Fondos de cards, texto sobre gradientes
- **Clase CSS**: `vendes-bg-white`, `vendes-text-white`

## Gradientes

### Gradiente Principal
```css
background: linear-gradient(135deg, #551BB3 0%, #A9F04D 100%);
```
- **Clase CSS**: `vendes-gradient`
- **Uso**: Elementos destacados, botones principales

### Gradiente Inverso
```css
background: linear-gradient(135deg, #A9F04D 0%, #551BB3 100%);
```
- **Clase CSS**: `vendes-gradient-reverse`
- **Uso**: Elementos alternativos, variaciones

### Gradiente de Fondo
```css
background: linear-gradient(135deg, #551BB3 0%, #6b2fd3 50%, #A9F04D 100%);
```
- **Clase CSS**: `vendes-background`
- **Uso**: Fondos de páginas, pantallas completas

### Gradiente de Card
```css
background: linear-gradient(135deg, #FFFFFF 0%, #E2DDD9 100%);
```
- **Clase CSS**: `vendes-card`
- **Uso**: Fondos de componentes, cards

## Clases CSS Disponibles

### Fondos
- `.vendes-bg-primary` - Fondo púrpura (color principal)
- `.vendes-bg-secondary` - Fondo verde (color secundario)
- `.vendes-bg-neutral` - Fondo gris claro
- `.vendes-bg-dark` - Fondo gris oscuro
- `.vendes-bg-white` - Fondo blanco

### Texto
- `.vendes-text-primary` - Texto púrpura (color principal)
- `.vendes-text-secondary` - Texto verde (color secundario)
- `.vendes-text-neutral` - Texto gris medio
- `.vendes-text-dark` - Texto gris oscuro
- `.vendes-text-white` - Texto blanco

### Bordes
- `.vendes-border` - Borde gris claro
- `.vendes-border-primary` - Borde púrpura (color principal)
- `.vendes-border-secondary` - Borde verde (color secundario)

### Botones
- `.vendes-button-primary` - Botón púrpura (color principal)
- `.vendes-button-secondary` - Botón verde (color secundario)

### Inputs
- `.vendes-input` - Input con estilo Vendes

### Gradientes
- `.vendes-gradient` - Gradiente principal
- `.vendes-gradient-reverse` - Gradiente inverso
- `.vendes-background` - Gradiente de fondo
- `.vendes-card` - Gradiente de card

## Animaciones

### Animaciones Personalizadas
- `.animate-vendes-pulse` - Pulso con colores de Vendes
- `.animate-vendes-bounce` - Rebote con colores de Vendes
- `.animate-vendes-spin` - Rotación con colores de Vendes

## Uso en Componentes

### Botones
```tsx
// Botón primario (púrpura)
<Button className="vendes-button-primary">
  Acción Principal
</Button>

// Botón secundario (verde)
<Button className="vendes-button-secondary">
  Acción Secundaria
</Button>
```

### Inputs
```tsx
<Input 
  className="vendes-input"
  placeholder="Tu texto aquí"
/>
```

### Cards
```tsx
<Card className="vendes-card">
  <CardHeader>
    <CardTitle className="vendes-text-dark">Título</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="vendes-text-neutral">Contenido</p>
  </CardContent>
</Card>
```

### Badges
```tsx
<Badge className="vendes-bg-secondary vendes-text-dark">
  Activo
</Badge>
```

## Configuración en Tailwind

Los colores están configurados en `tailwind.config.ts`:

```typescript
colors: {
  vendes: {
    purple: "#551BB3",   // Púrpura profundo - Color PRINCIPAL
    green: "#A9F04D",    // Verde lima vibrante - Color SECUNDARIO
    neutral: {
      light: "#E2DDD9",  // Gris claro cálido
      medium: "#666666", // Gris medio
      dark: "#292522",   // Gris muy oscuro
    },
    white: "#FFFFFF",    // Blanco puro
  },
}
```

## Variables CSS

Los colores también están disponibles como variables CSS:

```css
:root {
  --vendes-purple: #551BB3;  /* Color PRINCIPAL */
  --vendes-green: #A9F04D;   /* Color SECUNDARIO */
  --vendes-neutral-light: #E2DDD9;
  --vendes-neutral-medium: #666666;
  --vendes-neutral-dark: #292522;
  --vendes-white: #FFFFFF;
}
```

## Jerarquía de Colores

### 1. Color Principal (Púrpura #551BB3)
- Botones de acción principal
- Enlaces de navegación
- Títulos importantes
- Elementos de marca

### 2. Color Secundario (Verde #A9F04D)
- Botones de acción secundaria
- Estados de éxito
- Elementos destacados
- Confirmaciones

### 3. Colores Neutros
- Texto de lectura (#292522)
- Texto secundario (#666666)
- Fondos y bordes (#E2DDD9)
- Fondos principales (#FFFFFF)

## Mejores Prácticas

### ✅ Hacer
- Usar el púrpura (#551BB3) para elementos principales y de navegación
- Usar el verde (#A9F04D) para acciones secundarias y estados de éxito
- Aplicar los gradientes para elementos destacados
- Utilizar las clases CSS predefinidas
- Mantener el contraste adecuado para accesibilidad

### ❌ No Hacer
- Usar colores fuera de la paleta oficial
- Modificar los valores hexadecimales directamente
- Ignorar las clases CSS predefinidas
- Usar colores que no tengan suficiente contraste
- Usar el verde para elementos principales (debe ser púrpura)

## Accesibilidad

Todos los colores de la paleta han sido seleccionados para cumplir con los estándares de accesibilidad WCAG 2.1:

- **Contraste mínimo**: 4.5:1 para texto normal
- **Contraste alto**: 7:1 para texto pequeño
- **Distinción de color**: No depende únicamente del color para transmitir información

## Implementación

Para implementar la paleta en nuevos componentes:

1. Importar las clases desde `lib/colors.ts`
2. Usar las clases CSS predefinidas
3. Seguir las mejores prácticas de accesibilidad
4. Mantener consistencia visual
5. **Recordar**: Púrpura es principal, Verde es secundario

```tsx
import { VENDES_CLASSES } from "@/lib/colors"

// Usar las clases
<div className={VENDES_CLASSES.bg.primary}>  {/* Púrpura */}
  <h1 className={VENDES_CLASSES.text.white}>Título Principal</h1>
</div>
```
