# Logos - Portal Vendes

## Descripción

Esta documentación describe el uso de los logos oficiales de Vendes en el portal. Los logos están disponibles en diferentes variantes y tamaños para adaptarse a diferentes contextos de uso.

## Imágenes Disponibles

### 📁 **vendes-logo.jpg**
- **Descripción**: Logo compacto con solo el icono de Vendes
- **Uso**: Espacios reducidos, favicons, iconos de aplicación
- **Dimensiones**: Optimizado para diferentes tamaños

### 📁 **vendes-logo-nombre.jpg**
- **Descripción**: Logo completo con icono y texto "vendes"
- **Uso**: Headers, footers, material promocional
- **Dimensiones**: Optimizado para diferentes tamaños

## Componentes Disponibles

### 🎯 **VendesLogo**
Componente principal que renderiza el logo oficial de Vendes.

```tsx
import { VendesLogo } from '@/components/ui';

// Uso básico
<VendesLogo />

// Con tamaño personalizado
<VendesLogo size="xl" />

// Solo icono (sin texto)
<VendesLogo showText={false} />

// Con clase CSS adicional
<VendesLogo className="my-custom-class" />
```

### 🎯 **VendesLogoHeader**
Variante optimizada para headers con fondo púrpura.

```tsx
import { VendesLogoHeader } from '@/components/ui';

// Logo para header
<VendesLogoHeader size="xl" />
```

### 🎯 **VendesLogoCompact**
Variante compacta que muestra solo el icono.

```tsx
import { VendesLogoCompact } from '@/components/ui';

// Logo compacto
<VendesLogoCompact size="md" />
```

### 🎯 **VendesLogoLight**
Variante para fondos claros.

```tsx
import { VendesLogoLight } from '@/components/ui';

// Logo para fondo claro
<VendesLogoLight size="xl" />
```

### 🎯 **VendesLogoDark**
Variante para fondos oscuros (con filtro invert).

```tsx
import { VendesLogoDark } from '@/components/ui';

// Logo para fondo oscuro
<VendesLogoDark size="md" />
```

## Tamaños Disponibles

| Tamaño | Dimensiones | Clase CSS | Uso Recomendado |
|--------|-------------|-----------|-----------------|
| `sm`   | 32x32px     | `h-8`     | Iconos pequeños, favicons |
| `md`   | 48x48px     | `h-12`    | Navegación, botones |
| `lg`   | 64x64px     | `h-16`    | Headers, tarjetas |
| `xl`   | 80x80px     | `h-20`    | Páginas principales, hero sections |
| `2xl`  | 96x96px     | `h-24`    | Logos destacados, landing pages |
| `3xl`  | 128x128px   | `h-32`    | Logos muy grandes, banners |

## Ejemplos de Uso

### 🏠 **Header de Navegación**
```tsx
<header className="bg-[#551BB3] p-4">
  <div className="flex items-center justify-between">
    <VendesLogoHeader size="xl" />
    <nav className="flex items-center gap-4">
      <a href="#" className="text-white hover:text-[#A9F04D]">Inicio</a>
      <a href="#" className="text-white hover:text-[#A9F04D]">Productos</a>
      <a href="#" className="text-white hover:text-[#A9F04D]">Contacto</a>
    </nav>
  </div>
</header>
```

### 📄 **Footer**
```tsx
<footer className="bg-[#292522] p-6">
  <div className="flex items-center justify-between">
    <VendesLogoDark size="md" />
    <div className="text-white/60 text-sm">
      © 2024 Vendes. Todos los derechos reservados.
    </div>
  </div>
</footer>
```

### 🎨 **Tarjeta de Producto**
```tsx
<div className="bg-white rounded-lg border p-4">
  <div className="flex items-start gap-4">
    <VendesLogoCompact size="md" />
    <div>
      <h3 className="font-semibold text-[#551BB3]">Producto Vendes</h3>
      <p className="text-sm text-[#666666]">
        Descripción del producto con el logo compacto como icono.
      </p>
    </div>
  </div>
</div>
```

### 🚀 **Página Principal**
```tsx
<div className="text-center space-y-4">
  <VendesHeading2 className="vendes-text-dark">
    Logo Oficial de Vendes
  </VendesHeading2>
  <div className="flex justify-center">
    <VendesLogo size="2xl" />
  </div>
  <VendesBody>
    El logo oficial de Vendes representa nuestra identidad visual.
  </VendesBody>
</div>
```

## Configuración Técnica

### 🔧 **API Route**
Los logos se sirven a través de un API route personalizado:

```typescript
// app/api/images/[...path]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Lógica para servir imágenes desde utils/images/
}
```

### 🖼️ **Next.js Image Component**
Todos los logos utilizan el componente `Image` de Next.js para optimización automática:

- **Lazy loading** automático
- **Optimización** de formato y tamaño
- **Responsive** design
- **Accesibilidad** con alt text

### 📁 **Estructura de Archivos**
```
portal-vendes/
├── utils/
│   └── images/
│       ├── vendes-logo.jpg
│       └── vendes-logo-nombre.jpg
├── app/
│   └── api/
│       └── images/
│           └── [...path]/
│               └── route.ts
└── components/
    └── ui/
        └── vendes-logo.tsx
```

## Mejores Prácticas

### ✅ **Hacer**
- Usar el tamaño apropiado para cada contexto
- Mantener la proporción original del logo
- Usar la variante correcta según el fondo
- Incluir alt text descriptivo
- Optimizar para dispositivos móviles

### ❌ **No Hacer**
- Distorsionar la proporción del logo
- Usar colores diferentes a los oficiales
- Colocar el logo sobre fondos que comprometan la legibilidad
- Usar versiones de baja calidad
- Ignorar las guías de marca

## Accesibilidad

### 🎯 **Alt Text**
Todos los logos incluyen alt text descriptivo:
```tsx
<Image
  src="/api/images/vendes-logo-nombre.jpg"
  alt="Vendes Logo"
  width={48}
  height={48}
/>
```

### 🎨 **Contraste**
- **Fondo claro**: Logo original
- **Fondo oscuro**: Logo con filtro invert
- **Contraste mínimo**: 4.5:1 para cumplir WCAG 2.1

## Performance

### ⚡ **Optimizaciones**
- **Lazy loading** automático
- **Formatos modernos** (WebP cuando sea posible)
- **Tamaños responsivos** automáticos
- **Cache** agresivo para logos estáticos

### 📊 **Métricas**
- **Tiempo de carga**: < 100ms
- **Tamaño de archivo**: Optimizado para web
- **Cache hit ratio**: > 95%

## Mantenimiento

### 🔄 **Actualizaciones**
Para actualizar los logos:

1. Reemplazar los archivos en `utils/images/`
2. Mantener los mismos nombres de archivo
3. Verificar que las dimensiones sean apropiadas
4. Probar en diferentes contextos

### 🧪 **Testing**
- Verificar en diferentes tamaños de pantalla
- Probar en diferentes navegadores
- Validar accesibilidad con lectores de pantalla
- Comprobar rendimiento en conexiones lentas

Esta documentación debe ser seguida para mantener la consistencia visual y la identidad de marca de Vendes en todo el portal.
