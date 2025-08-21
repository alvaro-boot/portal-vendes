# Tipografía - Portal Vendes

## Descripción

Esta es la guía de tipografía oficial del portal Vendes que debe ser utilizada consistentemente en todo el proyecto para mantener la identidad visual y la legibilidad.

## Jerarquía Tipográfica

### 🟣 **Títulos (Bold)**
- **Uso**: Títulos principales, encabezados de sección, elementos de marca
- **Peso**: Bold (700)
- **Aplicaciones**: 
  - Títulos de páginas principales
  - Encabezados de sección
  - Nombres de marca
  - Elementos destacados
- **Color**: Púrpura profundo (#551BB3)
- **Clase CSS**: `font-bold text-[#551BB3]`

### 🟣 **Subtítulos (Semibold)**
- **Uso**: Subtítulos, encabezados secundarios, elementos de navegación
- **Peso**: Semibold (600)
- **Aplicaciones**:
  - Subtítulos de sección
  - Elementos de navegación
  - Etiquetas importantes
  - Descripciones destacadas
- **Color**: Púrpura profundo (#551BB3)
- **Clase CSS**: `font-semibold text-[#551BB3]`

### 🟣 **Texto Regular (Regular)**
- **Uso**: Texto de cuerpo, contenido principal, descripciones
- **Peso**: Regular (400)
- **Aplicaciones**:
  - Texto de cuerpo principal
  - Descripciones y contenido
  - Información secundaria
  - Texto de formularios
- **Color**: Gris medio (#666666)
- **Clase CSS**: `font-normal text-[#666666]`

## Implementación en Tailwind CSS

### Configuración en `tailwind.config.ts`

```typescript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Familia de fuente principal (ajustar según la fuente elegida)
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        // Pesos específicos de Vendes
        'vendes-bold': '700',
        'vendes-semibold': '600',
        'vendes-regular': '400',
      },
      fontSize: {
        // Tamaños específicos para la jerarquía
        'vendes-title': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'vendes-subtitle': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'vendes-body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
      },
    },
  },
}
```

### Clases CSS Personalizadas

```css
/* Clases de tipografía de Vendes */
.vendes-title {
  @apply font-bold text-[#551BB3] text-2xl leading-tight;
}

.vendes-subtitle {
  @apply font-semibold text-[#551BB3] text-xl leading-tight;
}

.vendes-body {
  @apply font-normal text-[#666666] text-base leading-relaxed;
}

.vendes-caption {
  @apply font-normal text-[#666666] text-sm leading-normal;
}
```

## Uso en Componentes

### Títulos Principales
```tsx
<h1 className="vendes-title">Título Principal</h1>
<h1 className="font-bold text-[#551BB3] text-2xl">Título Principal</h1>
```

### Subtítulos
```tsx
<h2 className="vendes-subtitle">Subtítulo de Sección</h2>
<h2 className="font-semibold text-[#551BB3] text-xl">Subtítulo de Sección</h2>
```

### Texto de Cuerpo
```tsx
<p className="vendes-body">Este es el texto de cuerpo principal del portal.</p>
<p className="font-normal text-[#666666] text-base">Este es el texto de cuerpo principal del portal.</p>
```

### Texto de Captión
```tsx
<span className="vendes-caption">Texto de ayuda o descripción</span>
<span className="font-normal text-[#666666] text-sm">Texto de ayuda o descripción</span>
```

## Aplicaciones Específicas

### 🏠 **Página de Inicio**
- **Título principal**: Bold, púrpura (#551BB3)
- **Subtítulos de sección**: Semibold, púrpura (#551BB3)
- **Descripciones**: Regular, gris (#666666)

### 📝 **Formularios**
- **Etiquetas de campo**: Semibold, púrpura (#551BB3)
- **Texto de placeholder**: Regular, gris claro (#999999)
- **Texto de ayuda**: Regular, gris (#666666)

### 🧭 **Navegación**
- **Elementos de menú**: Semibold, púrpura (#551BB3)
- **Elementos activos**: Bold, púrpura (#551BB3)
- **Elementos secundarios**: Regular, gris (#666666)

### 📊 **Dashboard**
- **Títulos de tarjetas**: Semibold, púrpura (#551BB3)
- **Valores numéricos**: Bold, púrpura (#551BB3)
- **Descripciones**: Regular, gris (#666666)

## Mejores Prácticas

### ✅ **Hacer**
- Usar Bold para títulos principales y elementos de marca
- Usar Semibold para subtítulos y elementos de navegación
- Usar Regular para texto de cuerpo y contenido principal
- Mantener consistencia en la jerarquía tipográfica
- Asegurar contraste adecuado para accesibilidad

### ❌ **No Hacer**
- Mezclar pesos de fuente inconsistentemente
- Usar colores diferentes a los especificados
- Ignorar la jerarquía tipográfica establecida
- Usar fuentes que no estén en la guía
- Comprometer la legibilidad por diseño

## Accesibilidad

### Contraste de Color
- **Púrpura sobre blanco**: Cumple estándares WCAG 2.1
- **Gris sobre blanco**: Cumple estándares WCAG 2.1
- **Tamaños mínimos**: 16px para texto de cuerpo

### Escalabilidad
- Los tamaños de fuente deben escalar correctamente
- Mantener proporciones de línea adecuadas
- Considerar usuarios con problemas de visión

## Variables CSS

```css
:root {
  /* Colores de tipografía */
  --vendes-text-primary: #551BB3;    /* Púrpura para títulos */
  --vendes-text-secondary: #666666;  /* Gris para texto de cuerpo */
  --vendes-text-muted: #999999;      /* Gris claro para texto secundario */
  
  /* Pesos de fuente */
  --vendes-font-bold: 700;
  --vendes-font-semibold: 600;
  --vendes-font-regular: 400;
  
  /* Tamaños de fuente */
  --vendes-text-title: 2rem;
  --vendes-text-subtitle: 1.5rem;
  --vendes-text-body: 1rem;
  --vendes-text-caption: 0.875rem;
}
```

## Implementación en Componentes

### Ejemplo de Componente con Tipografía Vendes

```tsx
interface VendesTypographyProps {
  variant: 'title' | 'subtitle' | 'body' | 'caption';
  children: React.ReactNode;
  className?: string;
}

export const VendesTypography = ({ 
  variant, 
  children, 
  className = '' 
}: VendesTypographyProps) => {
  const baseClasses = 'font-sans';
  
  const variantClasses = {
    title: 'font-bold text-[#551BB3] text-2xl leading-tight',
    subtitle: 'font-semibold text-[#551BB3] text-xl leading-tight',
    body: 'font-normal text-[#666666] text-base leading-relaxed',
    caption: 'font-normal text-[#666666] text-sm leading-normal'
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};
```

## Verificación de Implementación

Para verificar que la tipografía está correctamente implementada:

1. **Revisar archivos de configuración**:
   - `tailwind.config.ts`
   - `globals.css`

2. **Verificar componentes principales**:
   - Páginas de login/registro
   - Dashboard principal
   - Formularios
   - Navegación

3. **Probar en diferentes dispositivos**:
   - Escritorio
   - Tablet
   - Móvil

4. **Verificar accesibilidad**:
   - Contraste de colores
   - Tamaños de fuente
   - Escalabilidad

Esta guía de tipografía debe ser seguida consistentemente en todo el portal Vendes para mantener la identidad visual y la experiencia de usuario coherente.
