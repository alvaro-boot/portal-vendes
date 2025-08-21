/**
 * Ejemplo de uso del Constructor de Sitios Web
 * 
 * Este archivo muestra cómo integrar y usar el constructor
 * en diferentes contextos de la aplicación.
 */

import { SiteBuilder } from '@/components/site-builder';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Settings, Eye } from 'lucide-react';
import Link from 'next/link';

// Ejemplo 1: Página completa del constructor
export function SiteBuilderPage() {
  return (
    <div className="min-h-screen">
      <SiteBuilder />
    </div>
  );
}

// Ejemplo 2: Widget del constructor en dashboard
export function SiteBuilderWidget() {
  const { currentStep, clientId, basicInfo } = useSiteBuilder();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Constructor de Sitios Web
        </CardTitle>
        <CardDescription>
          Crea tu sitio web personalizado en pocos pasos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {clientId ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progreso:</span>
              <Badge variant="outline">
                Paso {currentStep} de 4
              </Badge>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {basicInfo?.company?.name && (
              <div className="text-sm text-gray-600">
                <strong>Sitio:</strong> {basicInfo.company.name}
              </div>
            )}

            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href="/site-builder">
                  Continuar
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Comienza creando tu sitio web personalizado. 
              Elige un estilo, selecciona secciones y personaliza el contenido.
            </p>
            <Button asChild className="w-full">
              <Link href="/site-builder">
                Crear Sitio Web
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Ejemplo 3: Modal del constructor
export function SiteBuilderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Constructor de Sitios Web</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <div className="h-full overflow-auto">
          <SiteBuilder />
        </div>
      </div>
    </div>
  );
}

// Ejemplo 4: Integración con sistema de templates
export function TemplateGallery() {
  const templates = [
    {
      id: 'moderno',
      name: 'Moderno',
      description: 'Diseño limpio y contemporáneo',
      image: '/templates/moderno.jpg',
      style: 'moderno'
    },
    {
      id: 'clasico',
      name: 'Clásico',
      description: 'Estilo tradicional y elegante',
      image: '/templates/clasico.jpg',
      style: 'clasico'
    },
    {
      id: 'colorido',
      name: 'Colorido',
      description: 'Diseño vibrante y llamativo',
      image: '/templates/colorido.jpg',
      style: 'colorido'
    },
    {
      id: 'minimalista',
      name: 'Minimalista',
      description: 'Simplicidad y elegancia',
      image: '/templates/minimalista.jpg',
      style: 'minimalista'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Galería de Plantillas</h2>
        <p className="text-gray-600">
          Selecciona una plantilla para comenzar a crear tu sitio web
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
              <Globe className="h-12 w-12 text-gray-400" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <Button asChild size="sm" className="w-full">
                <Link href={`/site-builder?template=${template.id}`}>
                  Usar Plantilla
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Ejemplo 5: Hook personalizado para gestión de sitios
export function useSiteManagement() {
  const { clientId, basicInfo, selectedSections, reset } = useSiteBuilder();

  const createNewSite = () => {
    reset();
    // Lógica adicional para crear nuevo sitio
  };

  const duplicateSite = (sourceClientId: string) => {
    // Lógica para duplicar sitio existente
    console.log('Duplicando sitio:', sourceClientId);
  };

  const exportSite = () => {
    if (!clientId) return;
    
    const siteData = {
      clientId,
      basicInfo,
      selectedSections,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(siteData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `site-${clientId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSite = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const siteData = JSON.parse(e.target?.result as string);
        // Lógica para importar datos del sitio
        console.log('Importando sitio:', siteData);
      } catch (error) {
        console.error('Error al importar sitio:', error);
      }
    };
    reader.readAsText(file);
  };

  return {
    clientId,
    basicInfo,
    selectedSections,
    createNewSite,
    duplicateSite,
    exportSite,
    importSite
  };
}

// Ejemplo 6: Componente de estadísticas del constructor
export function SiteBuilderStats() {
  const { currentStep, clientId, basicInfo, selectedSections } = useSiteBuilder();

  const stats = {
    totalSteps: 4,
    currentStep,
    progress: Math.round((currentStep / 4) * 100),
    sectionsSelected: selectedSections.filter(s => s.enabled).length,
    hasBasicInfo: !!(basicInfo?.company?.name),
    isComplete: currentStep === 4
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progreso del Constructor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Progreso general</span>
            <span className="text-sm font-medium">{stats.progress}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${stats.progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Paso actual:</span>
              <div className="font-medium">{stats.currentStep} de {stats.totalSteps}</div>
            </div>
            <div>
              <span className="text-gray-600">Secciones:</span>
              <div className="font-medium">{stats.sectionsSelected}</div>
            </div>
            <div>
              <span className="text-gray-600">Información básica:</span>
              <div className="font-medium">
                {stats.hasBasicInfo ? '✅ Completada' : '❌ Pendiente'}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Estado:</span>
              <div className="font-medium">
                {stats.isComplete ? '✅ Completado' : '🔄 En progreso'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Ejemplo 7: Integración con sistema de notificaciones
export function SiteBuilderNotifications() {
  const { clientId, currentStep } = useSiteBuilder();

  const getNotificationMessage = () => {
    if (!clientId) {
      return {
        title: '¡Bienvenido al Constructor!',
        message: 'Comienza creando tu sitio web personalizado',
        type: 'info'
      };
    }

    switch (currentStep) {
      case 1:
        return {
          title: 'Paso 1 Completado',
          message: 'Información básica guardada correctamente',
          type: 'success'
        };
      case 2:
        return {
          title: 'Secciones Seleccionadas',
          message: 'Continúa configurando el contenido',
          type: 'info'
        };
      case 3:
        return {
          title: 'Configuración en Progreso',
          message: 'Personaliza el contenido de cada sección',
          type: 'warning'
        };
      case 4:
        return {
          title: '¡Sitio Listo!',
          message: 'Revisa y publica tu sitio web',
          type: 'success'
        };
      default:
        return null;
    }
  };

  const notification = getNotificationMessage();
  
  if (!notification) return null;

  return (
    <div className={`p-4 rounded-lg border ${
      notification.type === 'success' ? 'bg-green-50 border-green-200' :
      notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
      'bg-blue-50 border-blue-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`} />
        <div>
          <h4 className="font-medium text-gray-900">{notification.title}</h4>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </div>
      </div>
    </div>
  );
}
