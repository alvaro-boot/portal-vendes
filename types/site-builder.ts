// Tipos para el constructor de sitios web

export interface Section {
  id: string;           // 'hero', 'about', 'products', etc.
  name: string;         // 'Banner Principal', 'Sobre Nosotros'
  description: string;  // Descripción de la sección
  required: boolean;    // Si es obligatoria (hero siempre es true)
  order: number;        // Orden por defecto
  template: string;     // Nombre del template Handlebars
  category: 'content' | 'commerce' | 'social' | 'contact';
  icon: string;         // Emoji o icono
  dataSchema: Record<string, any>; // Esquema de datos requeridos
  defaultData?: Record<string, any>; // Datos por defecto de la sección
}

export interface SectionConfiguration {
  id: string;
  enabled: boolean;
  order: number;
  data?: any; // Datos específicos de la sección
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  favicon?: string;
}

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  accent: string;
  accentForeground: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface ThemeConfiguration {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

export interface Theme extends ThemeConfiguration {}

export interface CreateClientRequest {
  clientId: string;
  name: string;
  description?: string;
  style: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  sections: SectionConfiguration[];
  company: CompanyInfo;
  theme: ThemeConfiguration;
  domain: {
    type: 'subdominio' | 'propio';
    subdomain: string;
    customDomain: string;
  };
}

export interface ClientConfiguration {
  clientId: string;
  name: string;
  description?: string;
  style: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  sections: SectionConfiguration[];
  company: CompanyInfo;
  theme: ThemeConfiguration;
  domain: {
    type: 'subdominio' | 'propio';
    subdomain: string;
    customDomain: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BasicInfoFormData {
  company: CompanyInfo;
  style: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  theme: ThemeConfiguration;
  domain: {
    type: 'subdominio' | 'propio';
    subdomain: string;
    customDomain: string;
  };
}

export interface StyleOption {
  id: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  name: string;
  gradient: string;
  description: string;
  icon?: string;
}

export interface CategoryFilter {
  id: 'all' | 'content' | 'commerce' | 'social' | 'contact';
  name: string;
  icon: string;
}

export interface SiteBuilderState {
  currentStep: number;
  clientId: string | null;
  basicInfo: BasicInfoFormData | null;
  selectedSections: SectionConfiguration[];
  isLoading: boolean;
  error: string | null;
}

export interface SiteBuilderActions {
  setCurrentStep: (step: number) => void;
  setClientId: (id: string) => void;
  setBasicInfo: (info: BasicInfoFormData) => void;
  setSelectedSections: (sections: SectionConfiguration[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
