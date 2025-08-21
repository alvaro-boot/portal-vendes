/**
 * Paleta de colores oficial de Vendes
 * 
 * Esta paleta debe ser utilizada consistentemente en todo el portal
 * para mantener la identidad visual de la marca.
 */

export const VENDES_COLORS = {
  // Colores principales
  primary: {
    purple: "#551BB3",   // Púrpura profundo - Color PRINCIPAL
    green: "#A9F04D",    // Verde lima vibrante - Color SECUNDARIO
  },
  
  // Colores neutros
  neutral: {
    light: "#E2DDD9",    // Gris claro cálido
    medium: "#666666",   // Gris medio
    dark: "#292522",     // Gris muy oscuro
    white: "#FFFFFF",    // Blanco puro
  },
  
  // Variaciones y estados
  states: {
    success: "#A9F04D",  // Verde para éxito
    warning: "#FFB800",  // Amarillo para advertencias
    error: "#FF4757",    // Rojo para errores
    info: "#551BB3",     // Púrpura para información
  },
  
  // Gradientes
  gradients: {
    primary: "linear-gradient(135deg, #551BB3 0%, #A9F04D 100%)",
    secondary: "linear-gradient(135deg, #A9F04D 0%, #551BB3 100%)",
    background: "linear-gradient(135deg, #551BB3 0%, #6b2fd3 50%, #A9F04D 100%)",
    card: "linear-gradient(135deg, #FFFFFF 0%, #E2DDD9 100%)",
  },
  
  // Opacidades
  opacity: {
    light: "0.1",
    medium: "0.3",
    heavy: "0.7",
  }
} as const

/**
 * Clases CSS de Tailwind para los colores de Vendes
 */
export const VENDES_CLASSES = {
  // Fondos
  bg: {
    primary: "bg-[#551BB3]",    // Púrpura - Color principal
    secondary: "bg-[#A9F04D]",  // Verde - Color secundario
    neutral: "bg-[#E2DDD9]",
    dark: "bg-[#292522]",
    white: "bg-[#FFFFFF]",
  },
  
  // Texto
  text: {
    primary: "text-[#551BB3]",    // Púrpura - Color principal
    secondary: "text-[#A9F04D]",  // Verde - Color secundario
    neutral: "text-[#666666]",
    dark: "text-[#292522]",
    white: "text-[#FFFFFF]",
  },
  
  // Bordes
  border: {
    primary: "border-[#551BB3]",    // Púrpura - Color principal
    secondary: "border-[#A9F04D]",  // Verde - Color secundario
    neutral: "border-[#E2DDD9]",
    dark: "border-[#292522]",
  },
  
  // Estados
  states: {
    success: "bg-[#A9F04D] text-[#292522]",
    warning: "bg-[#FFB800] text-[#292522]",
    error: "bg-[#FF4757] text-[#FFFFFF]",
    info: "bg-[#551BB3] text-[#FFFFFF]",
  }
} as const

/**
 * Función para obtener colores con opacidad
 */
export function getColorWithOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Configuración de tema para componentes
 */
export const VENDES_THEME = {
  colors: VENDES_COLORS,
  classes: VENDES_CLASSES,
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  }
} as const
