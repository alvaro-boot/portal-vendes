// Servicio de API para client-templates
const BASE_URL = 'https://render-0akm.onrender.com/api/v1';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Clase para manejo de errores de API
export class APIError extends Error {
  public status: number;
  public details: any;

  constructor(message: string, status: number, details: any = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

// Función helper para llamadas a la API
const apiCall = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...options
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || response.statusText,
        response.status,
        errorData
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Error de conexión', 0, error);
  }
};

// Tipos de datos
export interface Section {
  id: string;
  name: string;
  description: string;
  required: boolean;
  order: number;
  template: string;
  category: string;
  icon: string;
  dataSchema: Record<string, any>;
}

export interface AvailableSectionsResponse {
  sections: Section[];
  categories: Record<string, string>;
}

export interface Company {
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

export interface Theme {
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
}

export interface SectionData {
  id: string;
  enabled: boolean;
  order: number;
  data: Record<string, any>;
}

export interface ClientTemplate {
  clientId: string;
  name: string;
  description: string;
  style: 'clasico' | 'moderno' | 'minimalista' | 'colorido';
  sections: SectionData[];
  company: Company;
  theme: Theme;
}

// 1. Obtener secciones disponibles
export const getAvailableSections = async (): Promise<AvailableSectionsResponse> => {
  return apiCall(`${BASE_URL}/client-templates/available-sections`);
};

// 2. Crear nueva configuración
export const createClientTemplate = async (configData: ClientTemplate): Promise<any> => {
  return apiCall(`${BASE_URL}/client-templates`, {
    method: 'POST',
    body: JSON.stringify(configData)
  });
};

// 3. Obtener configuración existente
export const getClientConfiguration = async (clientId: string): Promise<ClientTemplate> => {
  return apiCall(`${BASE_URL}/client-templates/${clientId}/configuration`);
};

// 4. Actualizar configuración
export const updateClientConfiguration = async (clientId: string, updateData: Partial<ClientTemplate>): Promise<ClientTemplate> => {
  return apiCall(`${BASE_URL}/client-templates/${clientId}/configuration`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
};

// 5. Listar todas las configuraciones
export const listAllConfigurations = async (includeDisabled: boolean = false): Promise<ClientTemplate[]> => {
  const url = `${BASE_URL}/client-templates${includeDisabled ? '?includeDisabled=true' : ''}`;
  return apiCall(url);
};

// 6. Eliminar configuración
export const deleteClientConfiguration = async (clientId: string): Promise<any> => {
  return apiCall(`${BASE_URL}/client-templates/${clientId}`, {
    method: 'DELETE'
  });
};

// 7. Previsualizar con datos actuales
export const previewCurrent = async (clientId: string): Promise<string> => {
  const response = await fetch(`${BASE_URL}/client-templates/${clientId}/preview`);
  if (!response.ok) {
    throw new APIError('Error al generar preview', response.status);
  }
  return response.text(); // Retorna HTML
};

// 8. Previsualizar con datos personalizados (sin guardar)
export const previewCustom = async (clientId: string, customData: any): Promise<string> => {
  const response = await fetch(`${BASE_URL}/client-templates/${clientId}/render`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(customData)
  });
  
  if (!response.ok) {
    throw new APIError('Error al generar preview personalizado', response.status);
  }
  
  return response.text(); // Retorna HTML
};

// 9. Obtener URL final de la página
export const getFinalUrl = (clientId: string): string => {
  return `${BASE_URL}/client-templates/${clientId}`;
};

// Función helper para manejo de errores
export const handleAPIError = (error: any): string => {
  if (error instanceof APIError) {
    switch (error.status) {
      case 400:
        return 'Datos inválidos. Por favor, revisa la información ingresada.';
      case 404:
        return 'Recurso no encontrado. Verifica el ID del cliente.';
      case 500:
        return 'Error del servidor. Intenta nuevamente más tarde.';
      default:
        return `Error ${error.status}: ${error.message}`;
    }
  }
  return 'Error inesperado. Intenta nuevamente.';
};
