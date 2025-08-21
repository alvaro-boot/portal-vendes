'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BasicInfoForm } from './basic-info-form';
import { SectionSelector } from './section-selector';
import { SectionDataEditor } from './section-data-editor';
import { PreviewAndPublish } from './preview-and-publish';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { BasicInfoFormData, SectionConfiguration } from '@/types/site-builder';
import { CheckCircle, Circle } from 'lucide-react';

export const SiteBuilder = () => {
  const {
    currentStep,
    clientId,
    basicInfo,
    selectedSections,
    isLoading,
    error,
    setCurrentStep,
    setClientId,
    setBasicInfo,
    setSelectedSections,
    setError,
    reset
  } = useSiteBuilder();

  // Limpiar errores al cambiar de paso
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [currentStep, error, setError]);

  const handleBasicInfoComplete = (data: BasicInfoFormData) => {
    setBasicInfo(data);
    setCurrentStep(2);
  };

  const handleSectionsComplete = (sections: SectionConfiguration[]) => {
    setSelectedSections(sections);
    setCurrentStep(3);
  };

  const handleDataComplete = () => {
    setCurrentStep(4);
  };

  const handleReset = () => {
    reset();
  };

  const steps = [
    { id: 1, name: 'Información Básica', description: 'Identidad y estilo' },
    { id: 2, name: 'Selección de Secciones', description: 'Elegir contenido' },
    { id: 3, name: 'Configuración de Datos', description: 'Personalizar contenido' },
    { id: 4, name: 'Previsualización', description: 'Revisar y publicar' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con progreso */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">Constructor de Sitios Web</h1>
              {clientId && (
                <Badge variant="outline" className="text-xs">
                  ID: {clientId}
                </Badge>
              )}
            </div>
            
            {/* Indicador de pasos */}
            <div className="hidden md:flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    {currentStep > step.id ? (
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    ) : currentStep === step.id ? (
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{step.id}</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Circle className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Botón de reinicio */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-gray-600"
            >
              Reiniciar
            </Button>
          </div>

          {/* Barra de progreso móvil */}
          <div className="md:hidden mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Paso {currentStep} de {steps.length}</span>
              <span>{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del paso actual */}
      <div className="py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Procesando...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 1 && (
          <BasicInfoForm 
            onNext={handleBasicInfoComplete}
            initialData={basicInfo || undefined}
          />
        )}
        
        {currentStep === 2 && clientId && (
          <SectionSelector 
            clientId={clientId} 
            onNext={handleSectionsComplete} 
          />
        )}
        
        {currentStep === 3 && clientId && selectedSections.length > 0 && (
          <SectionDataEditor 
            clientId={clientId}
            sections={selectedSections}
            onComplete={handleDataComplete}
          />
        )}
        
        {currentStep === 4 && clientId && (
          <PreviewAndPublish clientId={clientId} />
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p>Constructor de Sitios Web - Portal Vendes</p>
            </div>
            <div className="flex items-center gap-4">
              <span>API: http://localhost:3002</span>
              <span>Versión: 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
