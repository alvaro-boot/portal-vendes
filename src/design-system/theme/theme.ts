// Tokens de diseño de Vendes
export const designTokens = {
  colors: {
    primary: {
      main: '#551BB3',
      light: '#7B3FD9',
      dark: '#3D147A',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#A9F04D',
      light: '#B8F36B',
      dark: '#8CDB2E',
      contrast: '#292522',
    },
    neutral: {
      light: '#E2DDD9',
      medium: '#666666',
      dark: '#292522',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
      dark: '#1A1A1A',
    },
    text: {
      primary: '#292522',
      secondary: '#666666',
      disabled: '#999999',
      inverse: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
  },
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Playfair Display, serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

// Tema claro
export const lightTheme = {
  ...designTokens,
  mode: 'light' as const,
  colors: {
    ...designTokens.colors,
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
      secondary: '#F1F5F9',
    },
    text: {
      primary: '#292522',
      secondary: '#666666',
      disabled: '#999999',
      inverse: '#FFFFFF',
    },
  },
};

// Tema oscuro
export const darkTheme = {
  ...designTokens,
  mode: 'dark' as const,
  colors: {
    ...designTokens.colors,
    background: {
      default: '#1A1A1A',
      paper: '#2D2D2D',
      secondary: '#404040',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E5E5',
      disabled: '#A3A3A3',
      inverse: '#292522',
    },
    neutral: {
      light: '#404040',
      medium: '#A3A3A3',
      dark: '#E5E5E5',
    },
  },
};

// Configuración del tema
export const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
  defaultMode: 'light' as const,
};

// Hook para usar el tema
export const useTheme = () => {
  // Aquí se implementaría la lógica para detectar el modo del sistema
  // y permitir cambiar entre temas
  return lightTheme;
};

// Utilidades del tema
export const getThemeColor = (color: string, theme: typeof lightTheme) => {
  const colorPath = color.split('.');
  let value: any = theme.colors;
  
  for (const path of colorPath) {
    value = value[path];
  }
  
  return value;
};

// Configuración de animaciones
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
