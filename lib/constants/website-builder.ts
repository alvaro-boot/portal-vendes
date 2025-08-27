// Constantes para el Website Builder

export const WEBSITE_STYLES = [
  { 
    value: 'clasico', 
    label: 'Clásico', 
    description: 'Elegante y romántico con efectos de pétalos',
    icon: '🌹'
  },
  { 
    value: 'moderno', 
    label: 'Moderno', 
    description: 'Limpio y profesional',
    icon: '💼'
  },
  { 
    value: 'minimalista', 
    label: 'Minimalista', 
    description: 'Ultra minimalista sin efectos',
    icon: '⚪'
  },
  { 
    value: 'colorido', 
    label: 'Colorido', 
    description: 'Vibrante con animaciones y efectos de confeti',
    icon: '🎨'
  }
] as const;

export const COLOR_PRESETS = [
  { 
    name: "Portal Vendes", 
    primary: "#551BB3", 
    secondary: "#A9F04D",
    description: "Colores oficiales del portal"
  },
  { 
    name: "Océano", 
    primary: "#0EA5E9", 
    secondary: "#06B6D4",
    description: "Azules refrescantes"
  },
  { 
    name: "Bosque", 
    primary: "#059669", 
    secondary: "#10B981",
    description: "Verdes naturales"
  },
  { 
    name: "Atardecer", 
    primary: "#DC2626", 
    secondary: "#F59E0B",
    description: "Rojos y naranjas cálidos"
  },
  { 
    name: "Elegante", 
    primary: "#1F2937", 
    secondary: "#6B7280",
    description: "Grises sofisticados"
  },
  { 
    name: "Lavanda", 
    primary: "#7C3AED", 
    secondary: "#A78BFA",
    description: "Púrpuras suaves"
  },
] as const;

export const DEFAULT_COLORS = {
  primary: "#551BB3",
  secondary: "#A9F04D",
  background: "#FFFFFF",
  foreground: "#000000"
} as const;

export const API_ENDPOINTS = {
  BASE_URL: 'https://render-0akm.onrender.com/api/v1',
  AVAILABLE_SECTIONS: '/client-templates/available-sections',
  CREATE_TEMPLATE: '/client-templates',
  GET_CONFIGURATION: (clientId: string) => `/client-templates/${clientId}/configuration`,
  UPDATE_CONFIGURATION: (clientId: string) => `/client-templates/${clientId}/configuration`,
  DELETE_TEMPLATE: (clientId: string) => `/client-templates/${clientId}`,
  PREVIEW: (clientId: string) => `/client-templates/${clientId}/preview`,
  RENDER: (clientId: string) => `/client-templates/${clientId}/render`,
  FINAL_URL: (clientId: string) => `/client-templates/${clientId}`
} as const;

export const VALIDATION_RULES = {
  CLIENT_ID: {
    pattern: /^[a-z0-9-]+$/,
    message: 'El ID del cliente solo puede contener letras minúsculas, números y guiones'
  },
  REQUIRED_FIELDS: {
    clientId: 'El ID del cliente es obligatorio',
    siteName: 'El nombre del sitio es obligatorio',
    siteDescription: 'La descripción es obligatoria',
    headerText: 'El texto del encabezado es obligatorio'
  }
} as const;

export const SECTION_TYPES = {
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  PRODUCTS: 'products',
  TESTIMONIALS: 'testimonials',
  GALLERY: 'gallery',
  CONTACT: 'contact',
  BLOG: 'blog'
} as const;

export const ERROR_MESSAGES = {
  API_ERROR: 'Error de conexión con el servidor',
  VALIDATION_ERROR: 'Por favor, revisa los datos ingresados',
  NOT_FOUND: 'Recurso no encontrado',
  SERVER_ERROR: 'Error del servidor. Intenta nuevamente más tarde',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
  UNKNOWN_ERROR: 'Error inesperado. Intenta nuevamente'
} as const;

export const SUCCESS_MESSAGES = {
  CONFIGURATION_SAVED: 'Configuración guardada exitosamente',
  SITE_PUBLISHED: 'Sitio web publicado exitosamente',
  PREVIEW_GENERATED: 'Vista previa generada correctamente'
} as const;
