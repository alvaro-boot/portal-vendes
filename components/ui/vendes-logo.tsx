import Image from "next/image"

interface VendesLogoProps {
  /** Tamaño del logo */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  /** Clase CSS adicional */
  className?: string
  /** Si debe mostrar el texto "vendes" */
  showText?: boolean
  /** Variante del logo a mostrar */
  variant?: "logo" | "logo-nombre"
}

/** Mapeo de tamaños a dimensiones de imagen */
const sizeConfig = {
  sm: {
    width: 32,
    height: 32,
    container: "h-8",
  },
  md: {
    width: 48,
    height: 48,
    container: "h-12",
  },
  lg: {
    width: 64,
    height: 64,
    container: "h-16",
  },
  xl: {
    width: 80,
    height: 80,
    container: "h-20",
  },
  "2xl": {
    width: 96,
    height: 96,
    container: "h-24",
  },
  "3xl": {
    width: 128,
    height: 128,
    container: "h-32",
  },
} as const

/**
 * Componente VendesLogo
 *
 * Renderiza el logo oficial de Vendes usando las imágenes proporcionadas.
 * Soporta dos variantes: solo el logo y logo con nombre.
 */
export function VendesLogo({ 
  size = "md", 
  className = "", 
  showText = true,
  variant = "logo-nombre"
}: VendesLogoProps) {
  const config = sizeConfig[size]
  
  // Determinar qué imagen usar basado en las props
  const imageVariant = showText ? "logo-nombre" : "logo"
  const imagePath = imageVariant === "logo-nombre" 
    ? "/api/images/vendes-logo-nombre.jpg"
    : "/api/images/vendes-logo.jpg"

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${config.container}`}>
        <Image
          src={imagePath}
          alt="Vendes Logo"
          width={config.width}
          height={config.height}
          className="object-contain"
          priority={size === "lg" || size === "xl"}
        />
      </div>
    </div>
  )
}

/**
 * Variante del logo para headers con fondo púrpura
 * Usa el logo con nombre en blanco
 */
export function VendesLogoHeader({ size = "lg", className = "" }: Omit<VendesLogoProps, "showText" | "variant">) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeConfig[size].container}`}>
        <Image
          src="/api/images/vendes-logo-nombre.jpg"
          alt="Vendes Logo"
          width={sizeConfig[size].width}
          height={sizeConfig[size].height}
          className="object-contain brightness-0 invert"
          priority={true}
        />
      </div>
    </div>
  )
}

/**
 * Variante compacta del logo (solo el icono)
 */
export function VendesLogoCompact({ size = "md", className = "" }: Omit<VendesLogoProps, "showText" | "variant">) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeConfig[size].container}`}>
        <Image
          src="/api/images/vendes-logo.jpg"
          alt="Vendes Logo"
          width={sizeConfig[size].width}
          height={sizeConfig[size].height}
          className="object-contain"
          priority={size === "lg" || size === "xl"}
        />
      </div>
    </div>
  )
}

/**
 * Variante del logo para fondos claros
 */
export function VendesLogoLight({ size = "md", className = "" }: Omit<VendesLogoProps, "showText" | "variant">) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeConfig[size].container}`}>
        <Image
          src="/api/images/vendes-logo-nombre.jpg"
          alt="Vendes Logo"
          width={sizeConfig[size].width}
          height={sizeConfig[size].height}
          className="object-contain"
          priority={size === "lg" || size === "xl"}
        />
      </div>
    </div>
  )
}

/**
 * Variante del logo para fondos oscuros
 */
export function VendesLogoDark({ size = "md", className = "" }: Omit<VendesLogoProps, "showText" | "variant">) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeConfig[size].container}`}>
        <Image
          src="/api/images/vendes-logo-nombre.jpg"
          alt="Vendes Logo"
          width={sizeConfig[size].width}
          height={sizeConfig[size].height}
          className="object-contain brightness-0 invert"
          priority={size === "lg" || size === "xl"}
        />
      </div>
    </div>
  )
}
