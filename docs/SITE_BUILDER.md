# Constructor de Sitios Web - Portal Vendes

## Descripción General

El Constructor de Sitios Web es una herramienta completa integrada en el dashboard de configuración inicial que permite a los clientes crear sitios web personalizados seleccionando y ordenando secciones, eligiendo estilos visuales, y personalizando el contenido de cada sección. El frontend se conecta con una API de plantillas modulares y refleja los cambios en tiempo real.

## Características Principales

### ✅ Implementadas
- [x] **Integración completa** en el dashboard de configuración inicial
- [x] **Configuración de Axios** con interceptores y manejo de errores global
- [x] **Formulario de información básica** con selector de estilo visual
- [x] **Selector de secciones** con filtros por categoría
- [x] **Editor de datos por sección** con formularios dinámicos
- [x] **Previsualización** con iframe y barra de navegación simulada
- [x] **Sistema de pasos** con indicadores de progreso
- [x] **Manejo de estado global** con Zustand
- [x] **Validación de formularios** con mensajes de error
- [x] **Notificaciones toast** para feedback del usuario
- [x] **Estados de carga** en todas las operaciones
- [x] **Diseño responsive** para todos los dispositivos
- [x] **Tipado completo** con TypeScript
- [x] **Navegación consistente** con el resto del dashboard
- [x] **Indicadores de progreso** visuales
- [x] **Estado de completitud** integrado con el dashboard

### 🚧 Pendientes
- [ ] **Drag & Drop** para reordenar secciones
- [ ] **Auto-guardado** cada 30 segundos
- [ ] **Undo/Redo** para cambios recientes
- [ ] **Keyboard shortcuts** para acciones comunes
- [ ] **Testing** de componentes
- [ ] **Optimización de rendimiento**

## Estructura del Proyecto

```
components/sections/
├── constructor-sitios.tsx     # Componente integrado en el dashboard

components/site-builder/
├── index.ts                    # Exportaciones
├── basic-info-form.tsx        # Paso 1: Información básica
├── section-selector.tsx       # Paso 2: Selección de secciones
├── section-data-editor.tsx    # Paso 3: Configuración de datos
└── preview-and-publish.tsx    # Paso 4: Previsualización

hooks/
├── use-site-builder.ts        # Estado global con Zustand
└── use-dashboard-state.ts     # Estado del dashboard (actualizado)

types/
├── site-builder.ts            # Tipos TypeScript
└── dashboard.ts               # Tipos del dashboard (actualizado)

constants/
└── dashboard.ts               # Constantes del dashboard (actualizado)

utils/
└── site-builder-helpers.ts    # Funciones auxiliares

lib/
└── api.ts                     # Configuración de Axios
```

## Integración en el Dashboard

El Constructor de Sitios Web es ahora la única sección del dashboard de configuración inicial. Esto proporciona:

### Características de Integración
- **Experiencia unificada**: Todo el proceso de configuración está en un solo lugar
- **Flujo simplificado**: No hay navegación entre secciones separadas
- **Estado de completitud**: Se marca como completada cuando se finaliza el sitio
- **Diseño coherente**: Mantiene el mismo estilo visual y UX del dashboard
- **Acceso directo**: Disponible desde el menú principal del portal

### Ubicación
- **Ruta**: `/dashboard` → Constructor de Sitios Web
- **Navegación**: Acceso directo desde el menú principal
- **Proceso**: Flujo completo de 4 pasos en una sola vista

## Flujo de Usuario

### Paso 1: Información Básica
- **Campos requeridos**: Nombre de empresa, slogan, descripción
- **Selector de estilo**: Moderno, Clásico, Colorido, Minimalista
- **Vista previa del tema**: Muestra colores y tipografía en tiempo real
- **Validación**: Campos obligatorios antes de continuar

### Paso 2: Selección de Secciones
- **Filtros por categoría**: Contenido, Comercio, Social, Contacto
- **Secciones requeridas**: Hero (siempre habilitada)
- **Reordenamiento**: Botones para mover secciones arriba/abajo
- **Vista previa**: Lista ordenada de secciones seleccionadas

### Paso 3: Configuración de Datos
- **Formularios dinámicos**: Según el tipo de sección
- **Progreso visual**: Barra de progreso y contador
- **Navegación**: Botones anterior/siguiente
- **Auto-guardado**: Al pasar a la siguiente sección

### Paso 4: Previsualización y Publicación
- **Iframe seguro**: Con sandbox para seguridad
- **Barra de navegación simulada**: Para mejor UX
- **Información del sitio**: ID, URL, estado
- **Acciones**: Ver sitio completo, publicar, copiar URL

## Configuración de la API

### Base URL
```
http://localhost:3002/api/v1
```

### Endpoints Utilizados
- `GET /client-templates/available-sections` - Obtener secciones disponibles
- `GET /client-templates/{clientId}/configuration` - Obtener configuración
- `PUT /client-templates/{clientId}/configuration` - Actualizar configuración
- `POST /client-templates` - Crear nueva configuración
- `GET /client-templates/{clientId}/preview` - Vista previa con datos de ejemplo

### Configuración de Axios
```typescript
const api = axios.create({
  baseURL: 'http://localhost:3002/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

## Tipos de Datos

### Section
```typescript
interface Section {
  id: string;           // 'hero', 'about', 'products', etc.
  name: string;         // 'Sección Hero', 'Sobre Nosotros'
  description: string;  // Descripción de la sección
  required: boolean;    // Si es obligatoria
  order: number;        // Orden por defecto
  template: string;     // Nombre del template Handlebars
  category: 'content' | 'commerce' | 'social' | 'contact';
  icon: string;         // Emoji o icono
  dataSchema: Record<string, any>; // Esquema de datos requeridos
}
```

### ClientConfiguration
```typescript
interface ClientConfiguration {
  clientId: string;
  name: string;
  description?: string;
  style: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  sections: SectionConfiguration[];
  company: CompanyInfo;
  theme: Theme;
  createdAt: Date;
  updatedAt: Date;
}
```

## Estilos Visuales

### Opciones de Estilo
1. **Moderno**: Gradiente púrpura-verde, colores vibrantes
2. **Clásico**: Grises elegantes, diseño tradicional
3. **Colorido**: Rosa-amarillo, diseño llamativo
4. **Minimalista**: Grises claros, simplicidad

### Paleta de Colores
```css
:root {
  --primary: #3B82F6;
  --primary-dark: #2563EB;
  --secondary: #F3F4F6;
  --accent: #10B981;
  --success: #059669;
  --warning: #F59E0B;
  --error: #DC2626;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --border: #E5E7EB;
  --background: #FFFFFF;
}
```

## Secciones Disponibles

### Contenido
- **Hero**: Sección principal de bienvenida (requerida)
- **About**: Información sobre la empresa
- **Testimonials**: Opiniones de clientes

### Comercio
- **Products**: Catálogo de productos
- **Services**: Servicios ofrecidos

### Social
- **Social Media**: Enlaces a redes sociales
- **Newsletter**: Suscripción a boletín

### Contacto
- **Contact**: Información de contacto
- **Map**: Ubicación en mapa

## Formularios Dinámicos

### Hero Section
- Título principal (requerido)
- Subtítulo
- Imagen de fondo
- Texto del botón CTA
- URL del botón CTA

### About Section
- Título (requerido)
- Contenido (requerido)
- Imagen

### Products Section
- Título de la sección (requerido)
- Subtítulo
- Descripción

### Contact Section
- Título de la sección (requerido)
- Email de contacto
- Teléfono
- Dirección

## Manejo de Errores

### Tipos de Error
1. **Errores de red**: Problemas de conectividad
2. **Errores de validación**: Datos incorrectos
3. **Errores del servidor**: Respuestas 4xx/5xx
4. **Errores de timeout**: Tiempo de espera agotado

### Estrategias de Manejo
- **Interceptores globales**: Captura automática de errores
- **Toast notifications**: Feedback inmediato al usuario
- **Fallbacks**: Contenido alternativo en caso de error
- **Reintentos**: Para operaciones críticas

## Estados de Carga

### Indicadores Visuales
- **Spinners**: Para operaciones cortas
- **Skeletons**: Para contenido que se está cargando
- **Progress bars**: Para operaciones largas
- **Disabled states**: Para botones durante operaciones

### Estados Implementados
- Carga de secciones disponibles
- Guardado de información básica
- Actualización de configuración
- Generación de previsualización
- Proceso de publicación

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptaciones
- **Sidebar colapsible**: En dispositivos móviles
- **Grid responsive**: Secciones se apilan en móvil
- **Botones adaptativos**: Tamaños apropiados por dispositivo
- **Tipografía escalable**: Tamaños relativos

## Accesibilidad

### Características Implementadas
- **Labels semánticos**: Para todos los campos de formulario
- **Contraste adecuado**: Cumple estándares WCAG
- **Navegación por teclado**: Tab, Enter, Escape
- **ARIA labels**: Para elementos interactivos
- **Focus management**: Indicadores visuales claros

## Performance

### Optimizaciones
- **Lazy loading**: Componentes cargados bajo demanda
- **Memoización**: React.memo para componentes pesados
- **Debouncing**: Para inputs de texto
- **Code splitting**: Separación por rutas

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Testing

### Estrategia de Testing
- **Unit tests**: Componentes individuales
- **Integration tests**: Flujos completos
- **E2E tests**: Experiencia de usuario completa
- **API tests**: Endpoints y respuestas

### Herramientas Recomendadas
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **Cypress**: Testing E2E
- **MSW**: Mocking de API

## Deployment

### Requisitos
- **Node.js**: >= 18.0.0
- **npm/yarn/pnpm**: Gestor de paquetes
- **API Backend**: Servidor en localhost:3002

### Variables de Entorno
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

### Comandos de Build
```bash
npm run build
npm run start
```

## Troubleshooting

### Problemas Comunes

#### Error de CORS
```
Access to fetch at 'http://localhost:3002/api/v1/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solución**: Configurar CORS en el backend o usar proxy en Next.js

#### Error de Timeout
```
Request timeout after 10000ms
```
**Solución**: Aumentar timeout en configuración de Axios o verificar conectividad

#### Error de Validación
```
Validation failed: company.name is required
```
**Solución**: Verificar que todos los campos requeridos estén completos

#### Error de Previsualización
```
Failed to load preview
```
**Solución**: Verificar que el endpoint `/preview` esté funcionando correctamente

## Contribución

### Guías de Desarrollo
1. **Seguir principios SOLID**: Código modular y mantenible
2. **Usar TypeScript**: Tipado estricto en todo el código
3. **Documentar cambios**: Comentarios claros y README actualizado
4. **Testing**: Escribir tests para nuevas funcionalidades
5. **Code review**: Revisión obligatoria antes de merge

### Estructura de Commits
```
feat: agregar nueva sección de productos
fix: corregir validación de formulario
docs: actualizar documentación de API
style: mejorar diseño responsive
refactor: optimizar componente de previsualización
```

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Cómo Usar

### Acceso al Constructor
1. **Navegar al dashboard**: Ve a `/dashboard`
2. **Iniciar el proceso**: El constructor se carga automáticamente
3. **Seguir el flujo**: Completa los 4 pasos del constructor

### Flujo de Pasos
1. **Paso 1 - Información Básica**: Completa nombre, slogan y elige estilo visual
2. **Paso 2 - Selección de Secciones**: Elige y ordena las secciones de tu sitio
3. **Paso 3 - Configuración de Contenido**: Personaliza el contenido de cada sección
4. **Paso 4 - Vista Previa y Publicación**: Revisa y publica tu sitio web

### Completar el Proceso
- Al finalizar, el sitio se marca como completado en el dashboard
- Puedes acceder a tu sitio web desde la URL proporcionada
- Puedes crear múltiples sitios usando el botón "Crear Otro Sitio"

## Contacto

Para soporte técnico o preguntas sobre el Constructor de Sitios Web:
- **Email**: soporte@portal-vendes.com
- **Documentación**: https://docs.portal-vendes.com
- **Issues**: https://github.com/portal-vendes/issues
