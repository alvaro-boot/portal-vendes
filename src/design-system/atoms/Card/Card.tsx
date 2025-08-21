import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const variants = {
  default: 'bg-card text-card-foreground shadow-sm',
  elevated: 'bg-card text-card-foreground shadow-lg hover:shadow-xl',
  glass: 'backdrop-blur-sm bg-white/10 border border-white/20 text-white',
  neon: 'bg-[#551BB3] text-white shadow-[0_0_20px_rgba(85,27,179,0.5)] hover:shadow-[0_0_30px_rgba(85,27,179,0.7)]',
  gradient: 'bg-[#551BB3] text-white border-transparent shadow-lg',
} as const

const cardVariants = cva(
  'rounded-xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white border-vendes-neutral shadow-sm hover:shadow-md',
        elevated: 'bg-white border-vendes-neutral shadow-lg hover:shadow-xl',
        outlined: 'bg-transparent border-vendes-primary',
        glass: 'bg-white/80 backdrop-blur-sm border-white/20 shadow-lg',
        gradient: 'vendes-gradient text-white border-transparent shadow-lg',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  delay?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover = true, delay = 0, children, ...props }, ref) => {
    const MotionDiv = motion.div;
    
    return (
      <MotionDiv
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold vendes-text-primary', className)}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description Component
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm vendes-text-neutral', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
