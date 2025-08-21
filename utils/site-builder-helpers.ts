import { StyleOption, CategoryFilter, Theme, ThemeColors } from '@/types/site-builder';

// Generar ID único para cliente
export const generateClientId = (): string => {
  return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Opciones de estilo disponibles
export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'moderno',
    name: 'Moderno',
    gradient: 'from-purple-400 to-green-300',
    description: 'Diseño limpio y contemporáneo',
    icon: '🎨'
  },
  {
    id: 'clasico',
    name: 'Clásico',
    gradient: 'from-gray-100 to-gray-200',
    description: 'Estilo tradicional y elegante',
    icon: '🏛️'
  },
  {
    id: 'colorido',
    name: 'Colorido',
    gradient: 'from-pink-400 to-yellow-300',
    description: 'Diseño vibrante y llamativo',
    icon: '🌈'
  },
  {
    id: 'minimalista',
    name: 'Minimalista',
    gradient: 'from-gray-50 to-gray-100',
    description: 'Simplicidad y elegancia',
    icon: '⚪'
  }
];

// Filtros de categorías
export const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: 'all', name: 'Todas', icon: '📋' },
  { id: 'content', name: 'Contenido', icon: '📝' },
  { id: 'commerce', name: 'Comercio', icon: '🛒' },
  { id: 'social', name: 'Social', icon: '👥' },
  { id: 'contact', name: 'Contacto', icon: '📞' }
];

// Tema por defecto
export const DEFAULT_THEME: Theme = {
  colors: {
    primary: '#551BB3',
    primaryForeground: '#FFFFFF',
    secondary: '#F3F4F6',
    secondaryForeground: '#171717',
    background: '#FFFFFF',
    foreground: '#171717',
    accent: '#551BB3',
    accentForeground: '#FFFFFF'
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif'
  }
};

// Colores por estilo (formato HEX)
export const STYLE_COLORS: Record<string, ThemeColors> = {
  moderno: {
    primary: '#551BB3',
    primaryForeground: '#FFFFFF',
    secondary: '#F3F4F6',
    secondaryForeground: '#171717',
    background: '#FFFFFF',
    foreground: '#171717',
    accent: '#551BB3',
    accentForeground: '#FFFFFF'
  },
  clasico: {
    primary: '#2C3E50',
    primaryForeground: '#FFFFFF',
    secondary: '#F8F9FA',
    secondaryForeground: '#6C757D',
    background: '#FFFFFF',
    foreground: '#2C3E50',
    accent: '#6C757D',
    accentForeground: '#FFFFFF'
  },
  minimalista: {
    primary: '#6C757D',
    primaryForeground: '#FFFFFF',
    secondary: '#F8F9FA',
    secondaryForeground: '#6C757D',
    background: '#FFFFFF',
    foreground: '#2C3E50',
    accent: '#6C757D',
    accentForeground: '#FFFFFF'
  },
  colorido: {
    primary: '#FFD700',
    primaryForeground: '#FFFFFF',
    secondary: '#28A745',
    secondaryForeground: '#FFFFFF',
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    accent: '#FF1493',
    accentForeground: '#FFFFFF'
  }
};

// Obtener tema basado en estilo
export const getThemeByStyle = (style: string): Theme => {
  return {
    colors: STYLE_COLORS[style] || STYLE_COLORS.moderno,
    fonts: DEFAULT_THEME.fonts
  };
};

// Validar datos de formulario
export const validateBasicInfo = (data: any): string | null => {
  if (!data.company?.name?.trim()) {
    return 'El nombre de la empresa es requerido';
  }
  if (!data.company?.tagline?.trim()) {
    return 'El slogan es requerido';
  }
  if (!data.company?.description?.trim()) {
    return 'La descripción es requerida';
  }
  return null;
};

// Formatear fecha
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Generar datos por defecto para cada sección según la especificación
export const generateDefaultSectionData = (sectionId: string): any => {
  switch (sectionId) {
    case 'hero':
      return {
        title: 'Bienvenido a mi sitio web',
        subtitle: 'Descubre nuestros productos y servicios',
        backgroundImage: '/images/hero-bg.jpg',
        ctaButtons: [
          {
            text: 'Ver Productos',
            href: '#products',
            style: 'primary'
          },
          {
            text: 'Contactar',
            href: '#contact',
            style: 'outline'
          }
        ]
      };
    
    case 'about':
      return {
        title: 'Sobre Nosotros',
        content: [
          'Somos una empresa comprometida con la excelencia y la innovación.',
          'Nuestro equipo está formado por profesionales altamente calificados.',
          'Ofrecemos soluciones personalizadas que se adaptan a tus necesidades.'
        ],
        image: '/images/about-us.jpg',
        imageAlt: 'Nuestro equipo trabajando'
      };
    
    case 'products':
      return {
        title: 'Nuestros Productos',
        subtitle: 'Descubre nuestra colección',
        featuredProducts: [
          {
            id: 'producto-1',
            name: 'Producto Premium',
            description: 'Descripción detallada del producto premium con todas sus características.',
            price: 199.99,
            image: '/images/producto-premium.jpg',
            imageAlt: 'Producto Premium',
            category: 'Premium',
            features: [
              'Calidad superior',
              'Garantía de 2 años',
              'Envío gratuito',
              'Soporte 24/7'
            ]
          }
        ],
        categories: ['Básico', 'Premium', 'Profesional']
      };
    
    case 'services':
      return {
        title: 'Nuestros Servicios',
        subtitle: 'Ofrecemos servicios especializados para tu negocio',
        services: [
          {
            id: 'consultoria',
            name: 'Consultoría Empresarial',
            description: 'Análisis estratégico y planificación para optimizar tu negocio.',
            icon: '📊',
            price: 'Desde $500.00'
          },
          {
            id: 'marketing',
            name: 'Marketing Digital',
            description: 'Estrategias de marketing online para aumentar tu presencia digital.',
            icon: '📱',
            price: 'Desde $300.00'
          }
        ]
      };
    
    case 'testimonials':
      return {
        title: 'Lo que dicen nuestros clientes',
        subtitle: 'Testimonios de clientes satisfechos',
        reviews: [
          {
            id: 'review-1',
            name: 'María García',
            role: 'CEO, TechCorp',
            content: 'Excelente servicio y resultados superiores a nuestras expectativas.',
            rating: 5,
            image: '/images/cliente-1.jpg'
          },
          {
            id: 'review-2',
            name: 'Carlos López',
            role: 'Director, InnovateLab',
            content: 'Profesionalismo y calidad en cada proyecto que realizamos juntos.',
            rating: 5,
            image: '/images/cliente-2.jpg'
          }
        ]
      };
    
    case 'gallery':
      return {
        title: 'Nuestra Galería',
        subtitle: 'Mira algunos de nuestros trabajos más destacados',
        images: [
          {
            id: 'proyecto-1',
            src: '/images/proyecto-1.jpg',
            alt: 'Proyecto de diseño web',
            title: 'Diseño Web Corporativo',
            category: 'Diseño Web'
          },
          {
            id: 'proyecto-2',
            src: '/images/proyecto-2.jpg',
            alt: 'Aplicación móvil',
            title: 'App Móvil E-commerce',
            category: 'Desarrollo Móvil'
          }
        ]
      };
    
    case 'contact':
      return {
        title: 'Contáctanos',
        subtitle: 'Estamos aquí para ayudarte',
        info: {
          address: 'Calle Principal 123, Ciudad, País',
          phone: '+1 234 567 890',
          email: 'contacto@miempresa.com',
          hours: 'Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM'
        },
        map: {
          latitude: 40.7128,
          longitude: -74.0060,
          zoom: 15
        }
      };
    
    case 'cart':
      return {
        title: 'Carrito de Compras',
        subtitle: 'Revisa tus productos seleccionados',
        items: [],
        subtotal: '0.00',
        shipping: '5.00',
        taxes: '0.00',
        total: '5.00'
      };
    
    case 'appointments':
      return {
        title: 'Agenda tu Cita',
        subtitle: 'Reserva una cita personalizada para discutir tus necesidades',
        availableSlots: [
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM'
        ]
      };
    
    case 'stats':
      return {
        title: 'Nuestros Números',
        subtitle: 'Métricas que hablan por sí solas',
        metrics: [
          {
            id: 'clientes',
            number: '500+',
            label: 'Clientes Satisfechos',
            icon: '👥'
          },
          {
            id: 'proyectos',
            number: '1000+',
            label: 'Proyectos Completados',
            icon: '✅'
          },
          {
            id: 'experiencia',
            number: '10+',
            label: 'Años de Experiencia',
            icon: '📈'
          },
          {
            id: 'equipo',
            number: '25+',
            label: 'Profesionales',
            icon: '👨‍💼'
          }
        ]
      };
    
    default:
      return {};
  }
};

// Asegurar que todas las secciones estén incluidas en la configuración
export const ensureAllSections = (selectedSections: any[], availableSections: any[]) => {
  const allSectionIds = availableSections.map(s => s.id);
  const selectedSectionIds = selectedSections.map(s => s.id);
  
  // Agregar secciones faltantes (deshabilitadas)
  const missingSections = allSectionIds
    .filter(id => !selectedSectionIds.includes(id))
    .map(id => {
      const section = availableSections.find(s => s.id === id);
      return {
        id,
        enabled: section?.required || false,
        order: section?.order || 999,
        data: generateDefaultSectionData(id)
      };
    });
  
  return [...selectedSections, ...missingSections]
    .sort((a, b) => a.order - b.order);
};
