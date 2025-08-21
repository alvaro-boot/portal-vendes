import React from 'react';
import { cn } from '@/lib/utils';

interface VendesTypographyProps {
  variant: 'title' | 'subtitle' | 'body' | 'caption' | 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'text-large' | 'text-small' | 'text-muted';
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const VendesTypography = ({ 
  variant, 
  children, 
  className = '',
  as
}: VendesTypographyProps) => {
  const baseClasses = 'font-sans';
  
  const variantClasses = {
    'title': 'vendes-title',
    'subtitle': 'vendes-subtitle',
    'body': 'vendes-body',
    'caption': 'vendes-caption',
    'heading-1': 'vendes-heading-1',
    'heading-2': 'vendes-heading-2',
    'heading-3': 'vendes-heading-3',
    'heading-4': 'vendes-heading-4',
    'text-large': 'vendes-text-large',
    'text-small': 'vendes-text-small',
    'text-muted': 'vendes-text-muted'
  };
  
  // Determinar el elemento HTML por defecto basado en la variante
  const getDefaultElement = (variant: string): keyof JSX.IntrinsicElements => {
    switch (variant) {
      case 'title':
      case 'heading-1':
      case 'heading-2':
        return 'h1';
      case 'subtitle':
      case 'heading-3':
      case 'heading-4':
        return 'h2';
      case 'body':
      case 'text-large':
        return 'p';
      case 'caption':
      case 'text-small':
      case 'text-muted':
        return 'span';
      default:
        return 'div';
    }
  };
  
  const Element = as || getDefaultElement(variant);
  
  return (
    <Element className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </Element>
  );
};

// Componentes específicos para facilitar el uso
export const VendesTitle = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="title" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesSubtitle = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="subtitle" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesBody = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="body" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesCaption = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="caption" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesHeading1 = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="heading-1" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesHeading2 = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="heading-2" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesHeading3 = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="heading-3" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesHeading4 = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="heading-4" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesTextLarge = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="text-large" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesTextSmall = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="text-small" className={className} as={as}>
    {children}
  </VendesTypography>
);

export const VendesTextMuted = ({ children, className, as }: Omit<VendesTypographyProps, 'variant'>) => (
  <VendesTypography variant="text-muted" className={className} as={as}>
    {children}
  </VendesTypography>
);
