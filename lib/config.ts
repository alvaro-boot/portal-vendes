// Configuración de la aplicación
export const CONFIG = {
  
  // URL del servidor API
  API_BASE_URL: 'http://localhost:3002/api/v1',
  
  // Timeout para las peticiones API
  API_TIMEOUT: 10000,
  
  // Configuración de imágenes
  IMAGE: {
    MAX_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/ico'],
    CATEGORIES: ['logos', 'favicons', 'hero-backgrounds', 'about-images', 'product-images', 'testimonial-images']
  },
  
  // Configuración de estilos
  STYLES: {
    DEFAULT: 'moderno',
    OPTIONS: ['moderno', 'clasico', 'colorido', 'minimalista']
  }
};

// Función para verificar si el servidor está disponible
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/client-templates/available-sections`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(CONFIG.API_TIMEOUT)
    });
    return response.ok;
  } catch (error) {
    console.warn('Server health check failed:', error);
    return false;
  }
};

// Función para obtener el estado del servidor
export const getServerStatus = async (): Promise<{
  available: boolean;
  url: string;
  message: string;
}> => {
  const available = await checkServerHealth();
  
  return {
    available,
    url: CONFIG.API_BASE_URL,
    message: available 
      ? 'Servidor API disponible' 
      : 'Servidor API no disponible'
  };
};
