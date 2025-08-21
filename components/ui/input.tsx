import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "border-input hover:border-primary/50 focus-visible:border-primary",
        filled: "border-transparent bg-muted/50 hover:bg-muted focus-visible:bg-background focus-visible:border-primary",
        outline: "border-2 border-primary/20 hover:border-primary/40 focus-visible:border-primary",
        ghost: "border-transparent bg-transparent hover:bg-muted/50 focus-visible:bg-muted/50",
        glass: "border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 focus-visible:bg-white/30",
      },
      size: {
        default: "h-10",
        sm: "h-8 px-2 text-sm",
        lg: "h-12 px-4 text-lg",
        xl: "h-14 px-6 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  error?: boolean
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, icon, iconPosition = "left", error, success, ...props }, ref) => {
    return (
      <div className="relative group">
        {/* Icono izquierdo */}
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
            {icon}
          </div>
        )}
        
        {/* Input principal */}
      <input
        className={cn(
            inputVariants({ variant, size }),
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
            success && "vendes-border-secondary focus-visible:ring-vendes-secondary",
          className
        )}
        ref={ref}
        {...props}
      />
        
        {/* Icono derecho */}
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
            {icon}
          </div>
        )}
        
        {/* Efecto de brillo en focus */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Indicador de estado */}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </div>
        )}
        
        {success && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-2 h-2 bg-[#551BB3] rounded-full" />
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
