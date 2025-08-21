/**
 * Constantes del Dashboard de Vendes
 *
 * Centraliza todos los valores constantes utilizados en el dashboard
 * para facilitar el mantenimiento y evitar valores mágicos en el código.
 */

import { Store, Palette, Package, Users, MessageSquare, Layers, Globe } from "lucide-react"
import type { DashboardSection, MenuItem, NavigationItem, PlantillaConfig } from "@/types/dashboard"

/** Colores de marca de Vendes */
export const VENDES_COLORS = {
  /** Color primario - Morado Vendes */
  PRIMARY: "#551BB3",
  /** Color secundario - Verde Vendes */
  SECONDARY: "#A9F04D",
  /** Color de texto principal */
  TEXT_PRIMARY: "#292522",
  /** Color de texto secundario */
  TEXT_SECONDARY: "#666666",
  /** Color de fondo neutro */
  BACKGROUND_NEUTRAL: "#E2DDD9",
} as const

/** Configuración de límites de archivos */
export const FILE_LIMITS = {
  /** Tamaño máximo de imagen en bytes (2MB) */
  MAX_IMAGE_SIZE: 2 * 1024 * 1024,
  /** Tipos de archivo permitidos para imágenes */
  ALLOWED_IMAGE_TYPES: ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"],
  /** Dimensiones recomendadas para logos */
  LOGO_DIMENSIONS: "200x200px",
  /** Dimensiones recomendadas para banners */
  BANNER_DIMENSIONS: "1200x400px",
} as const

/** Límites de texto para formularios */
export const TEXT_LIMITS = {
  /** Longitud máxima para frase destacada */
  FRASE_DESTACADA_MAX: 200,
  /** Longitud mínima para nombre de comercio */
  NOMBRE_COMERCIO_MIN: 2,
  /** Longitud máxima para nombre de comercio */
  NOMBRE_COMERCIO_MAX: 50,
} as const

/** Orden de las secciones del dashboard */
export const DASHBOARD_SECTIONS: readonly DashboardSection[] = [
  "constructor",
] as const

/** Configuración de elementos del menú lateral */
export const MENU_ITEMS: readonly MenuItem[] = [
  {
    id: "constructor",
    title: "Construye tu sitio web",
    icon: Globe,
    description: "Crea tu sitio web personalizado",
  },
] as const

/** Configuración de elementos de navegación superior */
export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: "constructor",
    title: "Construye tu sitio web",
    icon: Globe,
  },
] as const

/** Configuración de plantillas disponibles */
export const PLANTILLAS_DISPONIBLES: readonly PlantillaConfig[] = [
  {
    id: "moderno",
    name: "Moderno",
    preview: "/placeholder.svg?height=120&width=200&text=Moderno",
    gradient: "from-purple-200 to-green-200",
  },
  {
    id: "clasico",
    name: "Clásico",
    preview: "/placeholder.svg?height=120&width=200&text=Clásico",
    gradient: "from-gray-200 to-gray-300",
  },
  {
    id: "colorido",
    name: "Colorido",
    preview: "/placeholder.svg?height=120&width=200&text=Colorido",
    gradient: "from-purple-200 to-green-200",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    preview: "/placeholder.svg?height=120&width=200&text=Minimalista",
    gradient: "from-gray-100 to-gray-200",
  },
] as const

/** Mensajes de validación */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Este campo es obligatorio",
  INVALID_EMAIL: "Ingresa un email válido",
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max: number) => `No puede exceder ${max} caracteres`,
  INVALID_URL: "Ingresa una URL válida",
  FILE_TOO_LARGE: "El archivo es demasiado grande",
  INVALID_FILE_TYPE: "Tipo de archivo no permitido",
} as const

/** Configuración de usuario por defecto */
export const DEFAULT_USER = {
  name: "Juan Pérez",
  email: "juan@ejemplo.com",
  initials: "JD",
} as const

/** URLs de redes sociales */
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/vendes",
  INSTAGRAM: "https://instagram.com/vendes",
  LINKEDIN: "https://linkedin.com/company/vendes",
} as const

/** Información de contacto */
export const CONTACT_INFO = {
  EMAIL: "contacto@vendes.com",
  SUPPORT_TEXT: "Centro de ayuda",
} as const
