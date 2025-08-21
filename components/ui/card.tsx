import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-200 ease-in-out group",
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md hover:scale-[1.01]",
        elevated: "shadow-md hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1",
        glass: "bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl",
        gradient: "bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl",
        neon: "shadow-[0_0_20px_rgba(85,27,179,0.1)] hover:shadow-[0_0_30px_rgba(85,27,179,0.2)]",
        bordered: "border-2 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
        cardVariants({ variant, padding }),
        !hover && "hover:scale-100 hover:shadow-none hover:-translate-y-0",
      className
    )}
    {...props}
  />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-gradient",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Nuevos componentes adicionales
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-t-xl -mt-6 -mx-6 mb-6",
      className
    )}
    {...props}
  />
))
CardImage.displayName = "CardImage"

const CardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary",
      className
    )}
    {...props}
  />
))
CardBadge.displayName = "CardBadge"

const CardStats = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
CardStats.displayName = "CardStats"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardImage,
  CardBadge,
  CardStats,
  cardVariants
}
