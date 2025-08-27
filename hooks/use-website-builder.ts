import { useState, useEffect, useCallback } from 'react';
import { 
  getAvailableSections, 
  createClientTemplate, 
  getClientConfiguration,
  updateClientConfiguration,
  previewCustom,
  getFinalUrl,
  handleAPIError,
  type Section,
  type ClientTemplate,
  type AvailableSectionsResponse
} from '@/lib/api/client-templates';

export interface WebsiteBuilderState {
  // Step 1: Sections
  availableSections: Section[];
  selectedSections: string[];
  categories: Record<string, string>;
  
  // Step 2: Basic Information
  clientId: string;
  siteName: string;
  siteDescription: string;
  style: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  
  // Step 3: Content Configuration
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  headerText: string;
  footerText: string;
  
  // Step 4: Preview and Publication
  isPublished: boolean;
  previewHtml: string;
  finalUrl: string;
  
  // UI State
  loading: boolean;
  error: string | null;
  currentStep: number;
}

const initialState: WebsiteBuilderState = {
  availableSections: [],
  selectedSections: ['hero'], // Hero es obligatorio
  categories: {},
  clientId: '',
  siteName: '',
  siteDescription: '',
  style: 'colorido',
  primaryColor: '#551BB3',
  secondaryColor: '#A9F04D',
  logo: '',
  headerText: '',
  footerText: '',
  isPublished: false,
  previewHtml: '',
  finalUrl: '',
  loading: false,
  error: null,
  currentStep: 1,
};

export function useWebsiteBuilder() {
  const [state, setState] = useState<WebsiteBuilderState>(initialState);

  // Cargar secciones disponibles al inicializar
  useEffect(() => {
    loadAvailableSections();
  }, []);

  const loadAvailableSections = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response: AvailableSectionsResponse = await getAvailableSections();
      setState(prev => ({
        ...prev,
        availableSections: response.sections,
        categories: response.categories,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleAPIError(error),
        loading: false
      }));
    }
  }, []);

  const updateState = useCallback((updates: Partial<WebsiteBuilderState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    if (canGoNext()) {
      setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
    }
  }, [state]);

  const prevStep = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
  }, []);

  const canGoNext = useCallback(() => {
    switch (state.currentStep) {
      case 1:
        return state.selectedSections.length > 0;
      case 2:
        return state.clientId.trim() !== '' && 
               state.siteName.trim() !== '' && 
               state.siteDescription.trim() !== '';
      case 3:
        return state.headerText.trim() !== '';
      case 4:
        return false; // Last step
      default:
        return false;
    }
  }, [state.currentStep, state.selectedSections, state.clientId, state.siteName, state.siteDescription, state.headerText]);

  const canGoPrev = useCallback(() => {
    return state.currentStep > 1;
  }, [state.currentStep]);

  const toggleSection = useCallback((sectionId: string) => {
    setState(prev => {
      const isSelected = prev.selectedSections.includes(sectionId);
      const updatedSections = isSelected
        ? prev.selectedSections.filter(id => id !== sectionId)
        : [...prev.selectedSections, sectionId];
      
      return { ...prev, selectedSections: updatedSections };
    });
  }, []);

  const generatePreview = useCallback(async () => {
    if (!state.clientId) {
      setState(prev => ({ ...prev, error: 'Se requiere un ID de cliente para generar la vista previa' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const templateData = buildTemplateData();
      const html = await previewCustom(state.clientId, templateData);
      
      setState(prev => ({
        ...prev,
        previewHtml: html,
        finalUrl: getFinalUrl(state.clientId),
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleAPIError(error),
        loading: false
      }));
    }
  }, [state]);

  const saveConfiguration = useCallback(async () => {
    if (!state.clientId) {
      setState(prev => ({ ...prev, error: 'Se requiere un ID de cliente para guardar la configuración' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const templateData = buildTemplateData();
      
      // Intentar actualizar primero, si no existe, crear nuevo
      try {
        await updateClientConfiguration(state.clientId, templateData);
      } catch (error) {
        // Si no existe, crear nuevo
        await createClientTemplate(templateData);
      }
      
      setState(prev => ({
        ...prev,
        isPublished: true,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleAPIError(error),
        loading: false
      }));
    }
  }, [state]);

  const buildTemplateData = useCallback((): ClientTemplate => {
    // Convertir colores hex a HSL
    const hexToHsl = (hex: string): string => {
      // Implementación simplificada - en producción usar una librería como colord
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      
      if (max === min) {
        return `0 0% ${Math.round(l * 100)}%`;
      }
      
      const d = max - min;
      const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      let h = 0;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    const sections: any[] = state.selectedSections.map((sectionId, index) => {
      const baseData = {
        id: sectionId,
        enabled: true,
        order: index + 1,
        data: {}
      };

      // Agregar datos específicos según el tipo de sección
      switch (sectionId) {
        case 'hero':
          baseData.data = {
            title: state.siteName,
            subtitle: state.siteDescription,
            backgroundImage: state.logo || '/images/default-hero.jpg',
            ctaButtons: [
              {
                text: 'Ver más',
                href: '#about',
                style: 'primary'
              }
            ]
          };
          break;
        case 'about':
          baseData.data = {
            title: 'Sobre Nosotros',
            content: state.siteDescription,
            image: state.logo || '/images/default-about.jpg'
          };
          break;
        case 'services':
          baseData.data = {
            title: 'Nuestros Servicios',
            subtitle: 'Descubre lo que ofrecemos',
            services: [
              {
                id: 'servicio-1',
                name: 'Servicio Principal',
                description: 'Descripción del servicio principal',
                icon: '⭐',
                price: 'Consultar'
              }
            ]
          };
          break;
        case 'products':
          baseData.data = {
            title: 'Nuestros Productos',
            subtitle: 'Descubre nuestra colección',
            featuredProducts: [
              {
                id: 'producto-1',
                name: 'Producto Destacado',
                description: 'Descripción del producto',
                price: 99.99,
                image: '/images/default-product.jpg',
                imageAlt: 'Producto Destacado',
                category: 'General',
                features: ['Característica 1', 'Característica 2']
              }
            ],
            categories: ['General']
          };
          break;
        case 'contact':
          baseData.data = {
            title: 'Contáctanos',
            subtitle: 'Estamos aquí para ayudarte',
            address: 'Dirección de la empresa',
            phone: '+1 234 567 890',
            email: 'info@empresa.com',
            schedule: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
            socialMedia: {
              facebook: '',
              instagram: '',
              twitter: '',
              linkedin: ''
            }
          };
          break;
      }

      return baseData;
    });

    return {
      clientId: state.clientId,
      name: state.siteName,
      description: state.siteDescription,
      style: state.style,
      sections,
      company: {
        name: state.siteName,
        tagline: state.headerText,
        description: state.siteDescription,
        logo: state.logo,
        favicon: '/favicon.ico'
      },
      theme: {
        colors: {
          primary: hexToHsl(state.primaryColor),
          primaryForeground: '0 0% 100%',
          secondary: hexToHsl(state.secondaryColor),
          secondaryForeground: '0 0% 100%',
          background: '0 0% 100%',
          foreground: '222.2 84% 4.9%',
          accent: '330 100% 50%',
          accentForeground: '0 0% 100%'
        },
        fonts: {
          heading: "'Fredoka One', cursive",
          body: "'Nunito', sans-serif"
        }
      }
    };
  }, [state]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    updateState,
    setCurrentStep,
    nextStep,
    prevStep,
    canGoNext,
    canGoPrev,
    toggleSection,
    generatePreview,
    saveConfiguration,
    clearError,
    loadAvailableSections
  };
}
