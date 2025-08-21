/**
 * Funciones utilitarias para el dashboard
 *
 * Contiene funciones de ayuda reutilizables para operaciones comunes
 * en el dashboard como formateo, validaciones y transformaciones.
 */

import type { DashboardSection, Testimonio } from "@/types/dashboard"
import { DASHBOARD_SECTIONS } from "@/constants/dashboard"

/**
 * Genera las iniciales de un nombre completo
 *
 * @param nombre Nombre completo de la persona
 * @returns Iniciales en mayúsculas (máximo 2 caracteres)
 *
 * @example
 * getInitials("Juan Pérez") // "JP"
 * getInitials("María") // "M"
 */
export function getInitials(nombre: string): string {
  if (!nombre || typeof nombre !== "string") return ""

  return nombre
    .trim()
    .split(" ")
    .slice(0, 2) // Tomar máximo 2 palabras
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}

/**
 * Formatea un precio en formato de moneda
 *
 * @param precio Precio numérico
 * @param moneda Código de moneda (por defecto USD)
 * @returns Precio formateado como string
 *
 * @example
 * formatPrice(29.99) // "$29.99"
 * formatPrice(1000, "EUR") // "€1,000.00"
 */
export function formatPrice(precio: number, moneda = "USD"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: moneda,
    minimumFractionDigits: 2,
  }).format(precio)
}

/**
 * Valida si un color hexadecimal es válido
 *
 * @param color String del color en formato hexadecimal
 * @returns true si el color es válido
 *
 * @example
 * isValidHexColor("#FF0000") // true
 * isValidHexColor("#FFF") // true
 * isValidHexColor("red") // false
 */
export function isValidHexColor(color: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexColorRegex.test(color)
}

/**
 * Genera un ID único basado en timestamp
 *
 * @returns String único para usar como ID
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Calcula el progreso de completitud del dashboard
 *
 * @param completedSections Array de secciones completadas
 * @returns Porcentaje de progreso (0-100)
 */
export function calculateProgress(completedSections: DashboardSection[]): number {
  return Math.round((completedSections.length / DASHBOARD_SECTIONS.length) * 100)
}

/**
 * Obtiene la siguiente sección en el flujo del dashboard
 *
 * @param currentSection Sección actual
 * @returns Siguiente sección o null si es la última
 */
export function getNextSection(currentSection: DashboardSection): DashboardSection | null {
  const currentIndex = DASHBOARD_SECTIONS.indexOf(currentSection)
  return DASHBOARD_SECTIONS[currentIndex + 1] || null
}

/**
 * Obtiene la sección anterior en el flujo del dashboard
 *
 * @param currentSection Sección actual
 * @returns Sección anterior o null si es la primera
 */
export function getPreviousSection(currentSection: DashboardSection): DashboardSection | null {
  const currentIndex = DASHBOARD_SECTIONS.indexOf(currentSection)
  return currentIndex > 0 ? DASHBOARD_SECTIONS[currentIndex - 1] : null
}

/**
 * Filtra testimonios destacados
 *
 * @param testimonios Array de testimonios
 * @returns Array de testimonios marcados como destacados
 */
export function getTestimoniosDestacados(testimonios: Testimonio[]): Testimonio[] {
  return testimonios.filter((testimonio) => testimonio.destacado)
}

/**
 * Ordena testimonios poniendo los destacados primero
 *
 * @param testimonios Array de testimonios
 * @returns Array ordenado con destacados primero
 */
export function sortTestimoniosByDestacado(testimonios: Testimonio[]): Testimonio[] {
  return [...testimonios].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1
    if (!a.destacado && b.destacado) return 1
    return 0
  })
}

/**
 * Trunca un texto a una longitud específica
 *
 * @param text Texto a truncar
 * @param maxLength Longitud máxima
 * @param suffix Sufijo a agregar (por defecto "...")
 * @returns Texto truncado
 *
 * @example
 * truncateText("Este es un texto muy largo", 10) // "Este es un..."
 */
export function truncateText(text: string, maxLength: number, suffix = "..."): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Convierte un archivo a base64
 *
 * @param file Archivo a convertir
 * @returns Promise que resuelve con el string base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Valida el formato de un subdominio
 *
 * @param subdominio String del subdominio
 * @returns true si el formato es válido
 *
 * @example
 * isValidSubdomain("mi-comercio") // true
 * isValidSubdomain("mi_comercio") // false
 * isValidSubdomain("123comercio") // true
 */
export function isValidSubdomain(subdominio: string): boolean {
  const subdomainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/
  return subdomainRegex.test(subdominio) && subdominio.length >= 3 && subdominio.length <= 63
}

/**
 * Debounce function para optimizar búsquedas y validaciones
 *
 * @param func Función a ejecutar
 * @param wait Tiempo de espera en milisegundos
 * @returns Función debounced
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Verifica si una sección está disponible para navegación
 *
 * @param section Sección a verificar
 * @param completedSections Secciones completadas
 * @returns true si la sección está disponible
 */
export function isSectionAvailable(section: DashboardSection, completedSections: DashboardSection[]): boolean {
  const sectionIndex = DASHBOARD_SECTIONS.indexOf(section)

  // La primera sección siempre está disponible
  if (sectionIndex === 0) return true

  // Una sección está disponible si la anterior está completada
  const previousSection = DASHBOARD_SECTIONS[sectionIndex - 1]
  return completedSections.includes(previousSection)
}
