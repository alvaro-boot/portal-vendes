'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { SectionSelector } from '@/components/site-builder/section-selector';
import { BasicInfoForm } from '@/components/site-builder/basic-info-form';
import { SectionDataEditor } from '@/components/site-builder/section-data-editor';
import { PreviewAndPublish } from '@/components/site-builder/preview-and-publish';

import { generateClientId } from '@/utils/site-builder-helpers';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, CheckCircle, Settings, FileText, Eye, Target } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Selecciona las secciones',
    description: 'Elige qué secciones incluir en tu sitio web',
    icon: Settings,
    component: SectionSelector
  },
  {
    id: 2,
    title: 'Información básica',
    description: 'Configura el nombre, logo, colores y estilo de tu empresa',
    icon: FileText,
    component: BasicInfoForm
  },
  {
    id: 3,
    title: 'Configuración del contenido',
    description: 'Personaliza el contenido de cada sección',
    icon: Settings,
    component: SectionDataEditor
  },
  {
    id: 4,
    title: 'Vista previa y publicación',
    description: 'Revisa tu sitio y publícalo',
    icon: Eye,
    component: PreviewAndPublish
  }
];

interface ConstructorSitiosProps {
  activeSection?: "constructor";
  setActiveSection?: (section: "constructor") => void;
  completedSections?: "constructor"[];
  onComplete?: (section: "constructor") => void;
}

export const ConstructorSitios = (props: ConstructorSitiosProps = {}) => {
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
    setLoading,
    setError,
    reset
  } = useSiteBuilder();

  // Generar clientId si no existe
  useEffect(() => {
    if (!clientId) {
      setClientId(generateClientId());
    }
  }, [clientId, setClientId]);

  const handleSectionSelectionComplete = (sections: any[]) => {
    console.log('=== PASO 1 COMPLETADO ===');
    console.log('Secciones seleccionadas:', sections);
    setSelectedSections(sections);
    setCurrentStep(2);
    toast.success('Secciones seleccionadas correctamente');
  };

  const handleBasicInfoComplete = (data: any) => {
    console.log('=== PASO 2 COMPLETADO ===');
    console.log('Información básica:', data);
    setBasicInfo(data);
    setCurrentStep(3);
    toast.success('Información básica guardada');
  };

  const handleSectionDataComplete = (sections: any[]) => {
    console.log('=== PASO 3 COMPLETADO ===');
    console.log('Secciones con datos:', sections);
    setSelectedSections(sections);
    setCurrentStep(4);
    toast.success('Contenido configurado correctamente');
  };

  // Funciones específicas para cada componente
  const getOnNextForStep = (step: number) => {
    switch (step) {
      case 1:
        return handleSectionSelectionComplete;
      case 2:
        return handleBasicInfoComplete;
      case 3:
        return handleSectionDataComplete;
      default:
        return () => {};
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    reset();
    toast.success('Constructor reiniciado');
  };

  const currentStepData = STEPS.find(step => step.id === currentStep);
  const CurrentComponent = currentStepData?.component;

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Constructor de Sitios Web</h1>
        <p className="text-lg text-gray-600">Crea tu sitio web personalizado paso a paso</p>
      </div>

      {/* Indicadores de progreso */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1 rounded-full border-blue-500 bg-blue-50 text-blue-700">
              <Target className="w-3 h-3 mr-1" />
              Paso {currentStep} de {STEPS.length}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs px-3 py-1 rounded-full border-gray-300 hover:bg-gray-50"
            >
              Reiniciar
            </Button>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{Math.round(progress)}%</div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progreso</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-4 gap-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCurrent
                      ? 'bg-blue-600'
                      : isCompleted
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : Icon ? (
                      <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-600'}`} />
                    ) : (
                      <div className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-600'}`} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium ${
                      isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenido del paso actual */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
            {currentStepData?.icon && <currentStepData.icon className="w-5 h-5 text-blue-600" />}
            <span>{currentStepData?.title}</span>
          </CardTitle>
          {currentStepData?.description && (
            <CardDescription className="text-gray-600">
              {currentStepData.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {CurrentComponent && React.createElement(CurrentComponent as any, {
            clientId: clientId || '',
            onNext: getOnNextForStep(currentStep),
            initialData: currentStep === 1
              ? { sections: selectedSections }
              : currentStep === 2
              ? basicInfo || undefined
              : currentStep === 3
              ? { sections: selectedSections }
              : undefined
          })}
        </CardContent>
      </Card>

      {/* Navegación */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-2">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
