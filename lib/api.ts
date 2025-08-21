import axios from 'axios';
import { CONFIG } from './config';

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: CONFIG.API_TIMEOUT,
});

// Interceptor para logging de requests
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verificar si el error tiene la estructura esperada
    if (!error) {
      console.error('API Error: Error object is null or undefined');
      return Promise.reject(new Error('Error desconocido'));
    }

    const errorInfo = {
      message: error.message || 'Error desconocido',
      status: error.response?.status || 'N/A',
      statusText: error.response?.statusText || 'N/A',
      data: error.response?.data || 'N/A',
      url: error.config?.url || 'N/A',
      method: error.config?.method || 'N/A',
      requestData: error.config?.data || 'N/A'
    };
    
    console.error('API Error Details:', errorInfo);
    console.error('Full Error Object:', error);
    
    // Log adicional para debugging
    if (error.code) console.error('Error Code:', error.code);
    if (error.stack) console.error('Error Stack:', error.stack);
    
    return Promise.reject(error);
  }
);

// Funciones específicas para el constructor de sitios web
export const siteBuilderAPI = {
  // Obtener secciones disponibles
  getAvailableSections: async () => {
    try {
      console.log('Iniciando petición para obtener secciones...');
      const response = await api.get('/client-templates/available-sections');
      console.log('Respuesta exitosa de secciones:', response.data);
      return { data: { sections: response.data.sections } };
    } catch (error: any) {
      console.error('Error al obtener secciones - Detalles completos:', {
        error,
        message: error?.message,
        response: error?.response,
        config: error?.config,
        code: error?.code,
        stack: error?.stack
      });
      throw error;
    }
  },
  
  // Crear nueva configuración de cliente
  createClientConfiguration: async (data: any) => {
    try {
      console.log('=== CREANDO CLIENTE EN BACKEND ===');
      console.log('URL:', `${CONFIG.API_BASE_URL}/client-templates`);
      console.log('Data enviada:', JSON.stringify(data, null, 2));
      
      const response = await api.post('/client-templates', data);
      console.log('Respuesta exitosa del backend:', response.data);
      return response;
    } catch (error: any) {
      console.error('Error al crear cliente en backend:', {
        error,
        message: error?.message,
        response: error?.response,
        status: error?.response?.status,
        data: error?.response?.data
      });
      throw error;
    }
  },
  
  // Obtener configuración de cliente
  getClientConfiguration: (clientId: string) => api.get(`/client-templates/${clientId}/configuration`),
  
  // Actualizar configuración de cliente
  updateClientConfiguration: (clientId: string, data: any) => 
    api.put(`/client-templates/${clientId}/configuration`, data),
  
  // Previsualizar plantilla de cliente
  previewClientTemplate: (clientId: string) => api.get(`/client-templates/${clientId}/preview`),
  
  // Renderizar plantilla de cliente
  renderClientTemplate: (clientId: string, data?: any) => 
    api.post(`/client-templates/${clientId}/render`, data),
  
  // Obtener página completa del cliente (retorna HTML)
  getClientPage: async (clientId: string) => {
    try {
      const response = await api.get(`/client-templates/${clientId}`, {
        responseType: 'text'
      });
      return response;
    } catch (error) {
      console.error('Error al renderizar página:', error);
      throw error;
    }
  },
  
  // Listar todas las configuraciones
  listClientConfigurations: () => api.get('/client-templates'),
  
  // Eliminar configuración de cliente
  deleteClientConfiguration: (clientId: string) => api.delete(`/client-templates/${clientId}`),
  
  // Obtener productos del cliente
  getClientProducts: async (clientId: string) => {
    try {
      console.log('Cargando productos del cliente:', clientId);
      const response = await api.get(`/client-templates/${clientId}/products`);
      console.log('Productos cargados:', response.data);
      return response;
    } catch (error: any) {
      console.error('Error al cargar productos:', error);
      // Si no hay productos en el backend, devolver array vacío
      return { data: { products: [] } };
    }
  },
  
  // Guardar productos del cliente
  saveClientProducts: async (clientId: string, products: any[]) => {
    try {
      console.log('Guardando productos del cliente:', clientId, products);
      const response = await api.post(`/client-templates/${clientId}/products`, { products });
      console.log('Productos guardados:', response.data);
      return response;
    } catch (error: any) {
      console.error('Error al guardar productos:', error);
      throw error;
    }
  },
};

// Funciones para gestión de imágenes
export const imageAPI = {
  // Función para renombrar archivos según su categoría
  renameFileByCategory: (file: File, category: string): File => {
    const extension = file.name.split('.').pop() || '';
    let newFileName = '';
    
    switch (category) {
      case 'logos':
        newFileName = `logo.${extension}`;
        break;
      case 'favicons':
        newFileName = `favicon.${extension}`;
        break;
      case 'hero-backgrounds':
        newFileName = `banner.${extension}`;
        break;
      case 'about-images':
        newFileName = `about.${extension}`;
        break;
      case 'product-images':
        newFileName = `product.${extension}`;
        break;
      case 'testimonial-images':
        newFileName = `testimonial.${extension}`;
        break;
      case 'services-backgrounds':
        newFileName = `services-bg.${extension}`;
        break;
      case 'contact-backgrounds':
        newFileName = `contact-bg.${extension}`;
        break;
      case 'testimonials-backgrounds':
        newFileName = `testimonials-bg.${extension}`;
        break;
      default:
        newFileName = `image.${extension}`;
    }
    
    // Crear un nuevo archivo con el nombre modificado
    return new File([file], newFileName, { type: file.type });
  },

  // Subir imagen
  uploadImage: (clientId: string, imageFile: File, category?: string) => {
    const formData = new FormData();
    
    // Renombrar el archivo según la categoría
    const renamedFile = category ? imageAPI.renameFileByCategory(imageFile, category) : imageFile;
    
    formData.append('image', renamedFile);
    if (category) {
      formData.append('category', category);
    }
    
    console.log('Subiendo imagen:', {
      originalName: imageFile.name,
      newName: renamedFile.name,
      category: category,
      size: imageFile.size,
      type: imageFile.type
    });
    
    return api.post(`/storage/images/${clientId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Obtener imágenes del cliente
  getClientImages: (clientId: string, category?: string) => {
    const params = category ? { category } : {};
    return api.get(`/storage/images/${clientId}`, { params });
  },
  
  // Eliminar imagen específica
  deleteImage: (clientId: string, imageId: string) => 
    api.delete(`/storage/images/${clientId}/image/${imageId}`),
  
  // Obtener estadísticas de imágenes
  getImageStats: (clientId: string) => api.get(`/storage/images/${clientId}/stats`),
  
  // Obtener categorías de imágenes
  getImageCategories: (clientId: string) => api.get(`/storage/images/${clientId}/categories`),
};

export default api;
