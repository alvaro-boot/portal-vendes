# Ejemplo de Integración Completa con la API

## Estructura de Datos Actualizada

### CreateClientRequest
```typescript
interface CreateClientRequest {
  clientId: string;
  name: string;
  description?: string;
  style: 'clasico' | 'moderno' | 'minimalista';
  sections: SectionConfiguration[];
  company: CompanyInfo;
  theme: ThemeConfiguration;
}
```

### SectionConfiguration
```typescript
interface SectionConfiguration {
  id: string;
  enabled: boolean;
  order: number;
  data?: any;
}
```

### CompanyInfo
```typescript
interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  favicon?: string;
}
```

### ThemeConfiguration
```typescript
interface ThemeConfiguration {
  colors: {
    primary: string;           // Formato HSL: "25 95% 53%"
    primaryForeground: string; // Formato HSL: "0 0% 100%"
    secondary: string;         // Formato HSL: "0 0% 96%"
    secondaryForeground: string;
    background: string;
    foreground: string;
    accent: string;
    accentForeground: string;
  };
  fonts: {
    heading: string; // "Playfair Display, serif"
    body: string;    // "Inter, sans-serif"
  };
}
```

## Ejemplo de Datos de Prueba

```typescript
const sampleClientData: CreateClientRequest = {
  clientId: "mi-cliente-001",
  name: "Mi Empresa",
  description: "Descripción de mi empresa",
  style: "moderno",
  sections: [
    {
      id: "hero",
      enabled: true,
      order: 1,
      data: {
        title: "Mi Empresa",
        subtitle: "Descripción de mi empresa",
        backgroundImage: "/images/hero-bg.jpg",
        ctaButtons: [
          {
            text: "Ver Productos",
            href: "#products",
            style: "primary"
          }
        ]
      }
    },
    {
      id: "products",
      enabled: true,
      order: 2,
      data: {
        title: "Nuestros Productos",
        subtitle: "Descubre nuestra colección",
        featuredProducts: [
          {
            name: "Producto 1",
            description: "Descripción del producto",
            price: 99.99,
            image: "/images/product1.jpg",
            category: "Categoría 1"
          }
        ]
      }
    },
    {
      id: "about",
      enabled: false,
      order: 3,
      data: {}
    },
    {
      id: "services",
      enabled: false,
      order: 4,
      data: {}
    },
    {
      id: "testimonials",
      enabled: false,
      order: 5,
      data: {}
    },
    {
      id: "gallery",
      enabled: false,
      order: 6,
      data: {}
    },
    {
      id: "contact",
      enabled: false,
      order: 7,
      data: {}
    },
    {
      id: "cart",
      enabled: false,
      order: 8,
      data: {}
    },
    {
      id: "appointments",
      enabled: false,
      order: 9,
      data: {}
    },
    {
      id: "stats",
      enabled: false,
      order: 10,
      data: {}
    }
  ],
  company: {
    name: "Mi Empresa",
    tagline: "Mi eslogan",
    description: "Descripción de mi empresa",
    logo: "/images/logo.png",
    favicon: "/favicon.ico"
  },
  theme: {
    colors: {
      primary: "25 95% 53%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 96%",
      secondaryForeground: "0 0% 9%",
      background: "0 0% 100%",
      foreground: "0 0% 9%",
      accent: "25 95% 53%",
      accentForeground: "0 0% 100%"
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Inter, sans-serif"
    }
  }
};
```

## Funciones de la API

### 1. Obtener Secciones Disponibles
```typescript
async function getAvailableSections() {
  try {
    const response = await fetch('http://localhost:3001/api/v1/client-templates/available-sections');
    const data = await response.json();
    return data.sections;
  } catch (error) {
    console.error('Error al obtener secciones:', error);
    throw error;
  }
}
```

### 2. Crear Cliente
```typescript
async function createClientTemplate(clientData: CreateClientRequest) {
  try {
    const response = await fetch('http://localhost:3001/api/v1/client-templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear cliente');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 3. Renderizar Página
```typescript
async function renderClientPage(clientId: string) {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/client-templates/${clientId}`);
    if (!response.ok) {
      throw new Error('Cliente no encontrado');
    }
    return await response.text(); // Retorna HTML
  } catch (error) {
    console.error('Error al renderizar página:', error);
    throw error;
  }
}
```

## Validaciones Importantes

- **Sección Hero obligatoria**: Siempre debe estar habilitada (`enabled: true`)
- **Estilos válidos**: Solo `'clasico'`, `'moderno'`, `'minimalista'`
- **Campos requeridos**: `clientId`, `name`, `style`, `sections`, `company`, `theme`
- **Estructura de fonts**: Debe tener `heading` y `body` como strings
- **Todas las secciones**: Deben estar en el array, incluso las deshabilitadas
- **Colores**: Deben ser strings en formato HSL
- **Orden**: Importa para el renderizado

## Endpoints Disponibles

```
GET    /api/v1/client-templates/available-sections
POST   /api/v1/client-templates
GET    /api/v1/client-templates/:clientId
POST   /api/v1/client-templates/:clientId/render
GET    /api/v1/client-templates/:clientId/configuration
PUT    /api/v1/client-templates/:clientId/configuration
DELETE /api/v1/client-templates/:clientId
GET    /api/v1/client-templates/:clientId/preview
```

## Secciones Disponibles

- `hero` (obligatoria)
- `about`
- `products`
- `services`
- `testimonials`
- `gallery`
- `contact`
- `cart`
- `appointments`
- `stats`

## Puntos Clave

1. **Formato HSL**: Los colores deben ser strings en formato HSL (ej: "25 95% 53%")
2. **Fuentes**: El campo `fonts` ahora es un objeto con `heading` y `body`
3. **Sección Hero**: Siempre debe estar habilitada
4. **Orden**: Importa para el renderizado
5. **Todas las secciones**: Deben estar en el array, incluso las deshabilitadas
6. **Datos de sección**: Van en el campo `data`
7. **Campo enabled**: Controla si la sección aparece en la página
