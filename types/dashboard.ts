import type React from "react"
/**
 * Tipos TypeScript para el Dashboard de Vendes
 *
 * Este archivo centraliza todas las definiciones de tipos utilizadas
 * en el dashboard para mantener consistencia y facilitar el mantenimiento.
 */

/** Identificadores únicos para las secciones del dashboard */
export type DashboardSection = "constructor"

/** Configuración de identidad del comercio */
export interface IdentidadComercio {
  /** Nombre comercial del negocio */
  nombreComercio: string
  /** Plantilla seleccionada para el diseño */
  plantilla: PlantillaId
  /** Tipo de configuración de dominio */
  tipodominio: "subdominio" | "propio"
  /** Subdominio personalizado (ej: micomercio.vendes.com) */
  subdominio: string
  /** Dominio propio del cliente */
  dominioPropio: string
  /** Color primario en formato hexadecimal */
  colorPrimario: string
  /** Color secundario en formato hexadecimal */
  colorSecundario: string
  /** Archivo de logo subido */
  logo: File | null
}

/** Identificadores de plantillas disponibles */
export type PlantillaId = "moderno" | "clasico" | "colorido" | "minimalista"

/** Configuración de plantilla disponible */
export interface PlantillaConfig {
  /** Identificador único de la plantilla */
  id: PlantillaId
  /** Nombre descriptivo de la plantilla */
  name: string
  /** URL de imagen de vista previa */
  preview: string
  /** Clases CSS para el gradiente de vista previa */
  gradient: string
}

/** Configuración de personalización de plantilla */
export interface PersonalizacionPlantilla {
  /** Archivo de imagen para el banner principal */
  imagenBanner: File | null
  /** Frase destacada para mostrar en la página principal */
  fraseDestacada: string
  /** Indica si el negocio ofrece servicios que requieren citas */
  ofrecerServicios: boolean
}

/** Información de un producto en el catálogo */
export interface Producto {
  /** Identificador único del producto */
  id: string
  /** Nombre del producto */
  nombre: string
  /** Precio del producto */
  precio: number
  /** Categoría a la que pertenece */
  categoria: string
  /** Cantidad disponible en inventario */
  inventario: number
  /** Estado actual del producto */
  estado: "Activo" | "Inactivo"
}

/** Información corporativa del negocio */
export interface InformacionNosotros {
  /** Historia y descripción de la empresa */
  quienesSomos: string
  /** Declaración de misión de la empresa */
  mision: string
}

/** Testimonio de cliente */
export interface Testimonio {
  /** Identificador único del testimonio */
  id: string
  /** Nombre completo del cliente */
  nombre: string
  /** Contenido de la reseña */
  resena: string
  /** Rol o descripción del cliente */
  rol: string
  /** URL de imagen del cliente (opcional) */
  imagen?: string
  /** Indica si el testimonio debe destacarse */
  destacado: boolean
}

/** Estado completo del dashboard */
export interface DashboardState {
  /** Sección actualmente visible */
  activeSection: DashboardSection
  /** Lista de secciones completadas por el usuario */
  completedSections: DashboardSection[]
  /** Datos de configuración de identidad */
  identidad: IdentidadComercio
  /** Datos de personalización de plantilla */
  personalizacion: PersonalizacionPlantilla
  /** Lista de productos configurados */
  productos: Producto[]
  /** Información corporativa */
  nosotros: InformacionNosotros
  /** Lista de testimonios */
  testimonios: Testimonio[]
  /** Datos del constructor de sitios */
  constructor?: any
}

/** Props comunes para componentes de sección */
export interface SectionProps {
  /** Sección actualmente activa */
  activeSection: DashboardSection
  /** Función para cambiar la sección activa */
  setActiveSection: (section: DashboardSection) => void
  /** Lista de secciones completadas */
  completedSections: DashboardSection[]
  /** Callback ejecutado al completar una sección */
  onComplete: (section: DashboardSection) => void
}

/** Configuración de elemento de menú del dashboard */
export interface MenuItem {
  /** Identificador único del elemento */
  id: DashboardSection
  /** Título descriptivo */
  title: string
  /** Componente de icono de Lucide React */
  icon: React.ComponentType<{ className?: string }>
  /** Descripción breve del elemento */
  description: string
}

/** Elemento de navegación en los pasos */
export interface NavigationItem {
  /** Identificador único */
  id: DashboardSection
  /** Título para mostrar */
  title: string
  /** Componente de icono */
  icon: React.ComponentType<{ className?: string }>
}

/** Información de usuario registrado */
export interface Usuario {
  /** Identificador único del usuario */
  id: string
  /** Email del usuario */
  email: string
  /** Contraseña hasheada del usuario */
  password: string
  /** Nombres completos del usuario */
  nombres: string
  /** Número de teléfono del usuario */
  telefono: string
  /** Número de documento de identidad */
  documento: string
  /** Fecha de registro */
  fechaRegistro: Date
  /** Estado del usuario */
  estado: "activo" | "inactivo"
  /** Rol del usuario */
  rol: "admin" | "cliente"
  /** ID de la página web creada (solo para clientes) */
  paginaWebId?: string
}

/** Datos para registro de nuevo usuario */
export interface DatosRegistro {
  /** Email del usuario */
  email: string
  /** Contraseña del usuario */
  password: string
  /** Confirmación de contraseña */
  confirmPassword: string
  /** Nombres completos del usuario */
  nombres: string
  /** Número de teléfono del usuario */
  telefono: string
  /** Número de documento de identidad */
  documento: string
  /** Rol seleccionado por el usuario */
  rolSeleccionado: "admin" | "cliente"
  /** Clave de administrador (requerida si es admin) */
  claveAdmin?: string
}

/** Datos para inicio de sesión */
export interface DatosLogin {
  /** Email del usuario */
  email: string
  /** Contraseña del usuario */
  password: string
}

/** Estado de autenticación */
export interface AuthState {
  /** Error de autenticación */
  error?: string
  /** Mensaje de éxito */
  success?: string
  /** Indica si está en modo registro */
  isRegister?: boolean
}
