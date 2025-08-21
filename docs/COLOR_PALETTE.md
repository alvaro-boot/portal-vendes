# Paleta de Colores - Portal Vendes

## Descripción

Esta documentación describe la paleta de colores oficial de Vendes y cómo aplicarla correctamente en todo el portal.

## Colores Principales

### 🎨 **Color Primario - Púrpura Vendes**
- **Hex**: `#551BB3`
- **RGB**: `85, 27, 179`
- **HSL**: `267, 73%, 40%`
- **Uso**: Títulos principales, elementos de acción, acentos importantes

### 🎨 **Color Secundario - Verde Vendes**
- **Hex**: `#A9F04D`
- **RGB**: `169, 240, 77`
- **HSL**: `84, 100%, 65%`
- **Uso**: Badges, elementos destacados, estados activos

### 🎨 **Color de Fondo Neutro**
- **Hex**: `#E2DDD9`
- **RGB**: `226, 221, 217`
- **HSL**: `30, 9%, 87%`
- **Uso**: Fondos de tarjetas, bordes, elementos neutros

### 🎨 **Color de Texto Principal**
- **Hex**: `#292522`
- **RGB**: `41, 37, 34`
- **HSL**: `30, 9%, 15%`
- **Uso**: Texto principal, títulos secundarios

### 🎨 **Color de Texto Secundario**
- **Hex**: `#666666`
- **RGB**: `102, 102, 102`
- **HSL**: `0, 0%, 40%`
- **Uso**: Texto de cuerpo, descripciones

### 🎨 **Color Blanco**
- **Hex**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **HSL**: `0, 0%, 100%`
- **Uso**: Fondos, texto sobre colores oscuros

## Clases CSS Disponibles

### 📝 **Clases de Texto**
```css
.vendes-text-primary     /* #551BB3 - Púrpura */
.vendes-text-secondary   /* #A9F04D - Verde */
.vendes-text-neutral     /* #666666 - Gris medio */
.vendes-text-dark        /* #292522 - Gris oscuro */
```

### 🎨 **Clases de Fondo**
```css
.vendes-bg-primary       /* #551BB3 - Púrpura */
.vendes-bg-secondary     /* #A9F04D - Verde */
.vendes-bg-neutral       /* #E2DDD9 - Gris claro */
.vendes-bg-dark          /* #292522 - Gris oscuro */
```

### 🔲 **Clases de Bordes**
```css
.vendes-border           /* #E2DDD9 - Gris claro */
.vendes-border-primary   /* #551BB3 - Púrpura */
.vendes-border-secondary /* #A9F04D - Verde */
```

### 🌈 **Gradientes**
```css
.vendes-gradient         /* Púrpura a Verde */
.vendes-gradient-reverse /* Verde a Púrpura */
.vendes-background       /* Gradiente de fondo */
.vendes-card             /* Gradiente de tarjeta */
```

## Aplicación por Tipo de Elemento

### 📋 **Títulos y Encabezados**
```tsx
// Títulos principales
<VendesHeading1 className="vendes-text-primary">
  Título Principal
</VendesHeading1>

// Subtítulos
<VendesHeading2 className="vendes-text-primary">
  Subtítulo
</VendesHeading2>

// Títulos de sección
<VendesHeading3 className="vendes-text-primary">
  Sección
</VendesHeading3>
```

### 📝 **Texto de Cuerpo**
```tsx
// Texto principal
<VendesBody className="vendes-text-neutral">
  Texto de descripción
</VendesBody>

// Texto pequeño
<VendesTextSmall className="vendes-text-neutral">
  Texto secundario
</VendesTextSmall>

// Texto grande
<VendesTextLarge className="vendes-text-neutral">
  Texto destacado
</VendesTextLarge>
```

### 🔘 **Botones**
```tsx
// Botón primario
<Button className="vendes-gradient text-white">
  Acción Principal
</Button>

// Botón secundario
<Button className="vendes-bg-secondary vendes-text-dark">
  Acción Secundaria
</Button>

// Botón outline
<Button className="border-2 vendes-border-primary vendes-text-primary hover:vendes-bg-primary hover:text-white">
  Acción Outline
</Button>
```

### 🃏 **Tarjetas**
```tsx
<Card className="vendes-card border vendes-border">
  <CardContent className="p-6">
    <VendesHeading3 className="vendes-text-primary">
      Título de Tarjeta
    </VendesHeading3>
    <VendesBody className="vendes-text-neutral">
      Contenido de la tarjeta
    </VendesBody>
  </CardContent>
</Card>
```

### 🏷️ **Badges**
```tsx
<Badge className="vendes-bg-secondary vendes-text-dark">
  Badge Verde
</Badge>

<Badge className="vendes-bg-primary text-white">
  Badge Púrpura
</Badge>
```

## Estados y Interacciones

### 🎯 **Estados Activos**
```css
/* Elemento activo */
.isActive {
  @apply vendes-gradient text-white;
}

/* Hover en elementos */
.hover\:vendes-bg-primary:hover {
  @apply vendes-bg-primary;
}

.hover\:vendes-text-primary:hover {
  @apply vendes-text-primary;
}
```

### 🔄 **Transiciones**
```css
/* Transición suave */
.transition-colors {
  transition: all 0.3s ease-in-out;
}

/* Hover con escala */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
```

## Mejores Prácticas

### ✅ **Hacer**
- Usar `vendes-text-primary` para títulos principales
- Usar `vendes-text-neutral` para texto de cuerpo
- Usar `vendes-bg-secondary` para elementos destacados
- Mantener consistencia en toda la aplicación
- Usar gradientes para elementos de acción importantes

### ❌ **No Hacer**
- Usar colores que no estén en la paleta oficial
- Usar texto blanco sobre fondos claros
- Mezclar colores sin seguir la jerarquía visual
- Ignorar el contraste para accesibilidad

## Accesibilidad

### 🎨 **Contraste Mínimo**
- **Texto sobre fondo claro**: 4.5:1
- **Texto sobre fondo oscuro**: 4.5:1
- **Elementos de UI**: 3:1

### 🔍 **Verificación**
```css
/* Texto con buen contraste */
.vendes-text-primary {
  /* #551BB3 sobre blanco = 7.5:1 ✓ */
}

.vendes-text-neutral {
  /* #666666 sobre blanco = 4.6:1 ✓ */
}
```

## Implementación en Componentes

### 🧩 **Componente de Ejemplo**
```tsx
interface CardProps {
  title: string;
  description: string;
  action?: string;
}

export function VendesCard({ title, description, action }: CardProps) {
  return (
    <Card className="vendes-card border vendes-border hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <VendesHeading3 className="vendes-text-primary mb-3">
          {title}
        </VendesHeading3>
        <VendesBody className="vendes-text-neutral mb-4">
          {description}
        </VendesBody>
        {action && (
          <Button className="vendes-gradient text-white">
            {action}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
```

## Herramientas de Desarrollo

### 🎨 **Extensiones Recomendadas**
- **ColorZilla**: Para capturar colores
- **Contrast Checker**: Para verificar contraste
- **Color Picker**: Para seleccionar colores

### 📱 **Testing**
- Verificar en diferentes dispositivos
- Probar en modo oscuro (si aplica)
- Validar con lectores de pantalla

Esta paleta de colores debe ser seguida estrictamente para mantener la identidad visual de Vendes en todo el portal.
