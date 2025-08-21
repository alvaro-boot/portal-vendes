import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-transparent",
  {
    variants: {
      variant: {
        default: "border-t-primary border-r-primary",
        gradient: "border-t-primary border-r-secondary",
        dots: "border-t-primary border-r-primary",
        pulse: "border-t-primary border-r-primary",
        bounce: "border-t-primary border-r-primary",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
        "2xl": "w-16 h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  /** Clase CSS adicional */
  className?: string
  /** Texto de carga opcional */
  text?: string
  /** Posición del texto */
  textPosition?: "top" | "bottom" | "left" | "right"
  /** Mostrar overlay de fondo */
  overlay?: boolean
  /** Color personalizado */
  color?: string
}

/**
 * Componente LoadingSpinner mejorado
 *
 * Muestra un spinner animado con múltiples variantes y efectos visuales modernos.
 */
export function LoadingSpinner({ 
  variant = "default", 
  size = "md", 
  className = "", 
  text, 
  textPosition = "bottom",
  overlay = false,
  color
}: LoadingSpinnerProps) {
  const containerClasses = cn(
    "flex items-center justify-center gap-3",
    textPosition === "top" && "flex-col-reverse",
    textPosition === "bottom" && "flex-col",
    textPosition === "left" && "flex-row-reverse",
    textPosition === "right" && "flex-row",
    className
  )

  const spinnerClasses = cn(
    spinnerVariants({ variant, size }),
    color && `border-t-[${color}] border-r-[${color}]`
  )

  const spinnerContent = (
    <div className="relative">
      {/* Spinner principal */}
      <div
        className={spinnerClasses}
        role="status"
        aria-label={text || "Cargando..."}
      />
      
      {/* Efectos adicionales según variante */}
      {variant === "pulse" && (
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      )}
      
      {variant === "dots" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce mx-1" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
      
      {variant === "bounce" && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 animate-pulse" />
      )}
    </div>
  )

  const content = (
    <div className={containerClasses}>
      {spinnerContent}
      {text && (
        <span className="text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </span>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-border/50">
          {content}
        </div>
      </div>
    )
  }

  return content
}

/**
 * Componente de overlay de carga para pantalla completa
 */
export function LoadingOverlay({ 
  text = "Cargando...",
  variant = "default",
  size = "lg"
}: { 
  text?: string
  variant?: LoadingSpinnerProps["variant"]
  size?: LoadingSpinnerProps["size"]
}) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 border border-border/50 hover:shadow-3xl transition-shadow duration-300">
        <LoadingSpinner 
          variant={variant} 
          size={size} 
          text={text} 
          textPosition="bottom" 
        />
      </div>
    </div>
  )
}

/**
 * Componente de carga inline para botones
 */
export function ButtonSpinner({ 
  className = "",
  variant = "default"
}: { 
  className?: string
  variant?: LoadingSpinnerProps["variant"]
}) {
  return (
    <LoadingSpinner 
      variant={variant}
      size="sm" 
      className={cn("inline-flex", className)} 
    />
  )
}

/**
 * Spinner con gradiente animado
 */
export function GradientSpinner({ 
  size = "lg",
  text = "Cargando..."
}: {
  size?: LoadingSpinnerProps["size"]
  text?: string
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className={cn(
          "animate-spin rounded-full border-4 border-transparent",
          size === "sm" && "w-4 h-4",
          size === "md" && "w-6 h-6",
          size === "lg" && "w-8 h-8",
          size === "xl" && "w-12 h-12",
          size === "2xl" && "w-16 h-16",
          "border-t-primary border-r-secondary border-b-primary border-l-secondary"
        )} />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
      </div>
      {text && (
        <span className="text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </span>
      )}
    </div>
  )
}

/**
 * Spinner de puntos animados
 */
export function DotsSpinner({ 
  size = "md",
  text = "Cargando..."
}: {
  size?: LoadingSpinnerProps["size"]
  text?: string
}) {
  const dotSize = size === "sm" ? "w-1 h-1" : size === "md" ? "w-1.5 h-1.5" : "w-2 h-2"
  
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1">
        <div className={cn(dotSize, "bg-primary rounded-full animate-bounce")} style={{ animationDelay: '0ms' }} />
        <div className={cn(dotSize, "bg-primary rounded-full animate-bounce")} style={{ animationDelay: '150ms' }} />
        <div className={cn(dotSize, "bg-primary rounded-full animate-bounce")} style={{ animationDelay: '300ms' }} />
      </div>
      {text && (
        <span className="text-sm font-medium text-muted-foreground">
          {text}
        </span>
      )}
    </div>
  )
}
