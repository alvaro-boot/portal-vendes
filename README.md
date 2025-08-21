# 🚀 Portal Vendes - Plataforma de Comercio Digital

## 📋 Descripción

Portal Vendes es una plataforma de comercio digital profesional que permite a los usuarios crear, gestionar y optimizar sus negocios en línea. Desarrollada con las mejores prácticas de UX/UI y arquitectura moderna.

## 🎨 Características del Diseño

### Sistema de Diseño Atómico
- **Atoms**: Componentes básicos (Button, Card, Typography, etc.)
- **Molecules**: Combinaciones de átomos (ProductCard, SearchBar, etc.)
- **Organisms**: Secciones complejas (HeroSection, Navigation, etc.)
- **Templates**: Layouts y estructuras de página
- **Pages**: Implementaciones específicas

### Paleta de Colores Vendes
- **Primario**: `#551BB3` (Púrpura Vendes)
- **Secundario**: `#A9F04D` (Verde Vendes)
- **Neutro**: `#E2DDD9`, `#666666`, `#292522`
- **Soporte**: Dark mode y light mode

### Tipografía
- **Primaria**: Inter (Sans-serif)
- **Secundaria**: Playfair Display (Serif)
- **Jerarquía**: H1-H6, Body, Caption, Overline

## 🏗️ Arquitectura del Proyecto

```
portal-vendes/
├── src/
│   ├── design-system/          # Sistema de diseño atómico
│   │   ├── atoms/             # Componentes básicos
│   │   ├── molecules/         # Componentes compuestos
│   │   ├── organisms/         # Secciones complejas
│   │   ├── theme/             # Configuración de temas
│   │   └── tokens/            # Tokens de diseño
│   ├── pages/                 # Páginas de la aplicación
│   ├── hooks/                 # Hooks personalizados
│   ├── utils/                 # Utilidades y helpers
│   ├── config/                # Configuraciones
│   └── types/                 # Tipos TypeScript
├── public/                    # Archivos estáticos
├── docs/                      # Documentación
└── tests/                     # Tests
```

## 🚀 Tecnologías

### Frontend
- **Next.js 14**: Framework React con SSR/SSG
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **Framer Motion**: Animaciones
- **React Hook Form**: Manejo de formularios
- **Zustand**: Estado global

### Herramientas de Desarrollo
- **Storybook**: Documentación de componentes
- **Jest & Testing Library**: Testing
- **ESLint & Prettier**: Linting y formateo
- **Husky**: Git hooks
- **Chromatic**: Visual testing

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/vendes/portal-vendes.git
cd portal-vendes

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run start            # Servidor de producción

# Testing
npm run test             # Ejecutar tests
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Cobertura de tests

# Linting y Type Checking
npm run lint             # ESLint
npm run type-check       # TypeScript check

# Storybook
npm run storybook        # Servidor de Storybook
npm run build-storybook  # Build de Storybook

# Chromatic
npm run chromatic        # Visual testing
```

## 🎯 Componentes Principales

### Atoms
- **Button**: Botones con variantes y estados
- **Card**: Tarjetas con animaciones
- **Typography**: Sistema tipográfico
- **Input**: Campos de entrada
- **Badge**: Etiquetas y badges

### Molecules
- **ProductCard**: Tarjeta de producto con funcionalidad completa
- **SearchBar**: Barra de búsqueda con filtros
- **FilterPanel**: Panel de filtros
- **Pagination**: Navegación de páginas

### Organisms
- **HeroSection**: Sección principal con animaciones
- **Navigation**: Navegación principal
- **ProductGrid**: Grid de productos
- **Dashboard**: Panel de administración

## 🎨 Sistema de Temas

### Configuración
El tema se configura en `src/config/theme.json` y se puede personalizar:

```json
{
  "colors": {
    "primary": "#551BB3",
    "secondary": "#A9F04D"
  },
  "typography": {
    "fontFamily": {
      "primary": "Inter, system-ui, sans-serif"
    }
  }
}
```

### Dark Mode
Soporte completo para modo oscuro con detección automática del sistema:

```typescript
import { useTheme } from '@/hooks/useTheme';

const { theme, mode, toggleTheme, isDark } = useTheme();
```

## ♿ Accesibilidad (WCAG 2.1)

### Características Implementadas
- **Contraste de colores**: Cumple estándares AA/AAA
- **Navegación por teclado**: Soporte completo
- **Screen readers**: Atributos ARIA apropiados
- **Focus management**: Manejo de foco visible
- **Semantic HTML**: Estructura semántica correcta

### Utilidades
```typescript
import { 
  calculateContrastRatio, 
  meetsContrastStandard,
  keyboardNavigation 
} from '@/utils/accessibility';
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0px - 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large**: 1280px+

### Implementación
```typescript
// Tailwind CSS classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## 🧪 Testing

### Testing de Componentes
```bash
# Ejecutar tests
npm run test

# Tests con coverage
npm run test:coverage
```

### Storybook
```bash
# Iniciar Storybook
npm run storybook
```

### Visual Testing
```bash
# Chromatic
npm run chromatic
```

## 📊 Performance

### Optimizaciones Implementadas
- **Lazy Loading**: Componentes y rutas
- **Image Optimization**: Next.js Image component
- **Code Splitting**: División automática de código
- **Bundle Analysis**: Análisis de bundle
- **Caching**: Estrategias de caché

### Métricas
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTFB**: < 600ms

## 🔧 Configuración

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.vendes.com
NEXT_PUBLIC_APP_URL=https://portal.vendes.com
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

### Tailwind Config
```typescript
// tailwind.config.ts
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vendes: {
          purple: '#551BB3',
          green: '#A9F04D',
          // ...
        }
      }
    }
  }
}
```

## 📚 Documentación

### Componentes
- [Sistema de Diseño](./docs/DESIGN_SYSTEM.md)
- [Paleta de Colores](./docs/COLOR_PALETTE.md)
- [Tipografía](./docs/TYPOGRAPHY.md)
- [Accesibilidad](./docs/ACCESSIBILITY.md)

### Guías
- [Guía de Contribución](./docs/CONTRIBUTING.md)
- [Guía de Testing](./docs/TESTING.md)
- [Guía de Performance](./docs/PERFORMANCE.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones
- **Commits**: Conventional Commits
- **Branches**: feature/, bugfix/, hotfix/
- **Code Style**: ESLint + Prettier
- **Testing**: Jest + Testing Library

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- **Documentación**: [docs.vendes.com](https://docs.vendes.com)
- **Issues**: [GitHub Issues](https://github.com/vendes/portal-vendes/issues)
- **Discord**: [Vendes Community](https://discord.gg/vendes)

---

**Desarrollado con ❤️ por el equipo de Vendes**
