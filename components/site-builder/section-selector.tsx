'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  VendesHeading3,
  VendesBody,
  VendesTextSmall,
  VendesCaption
} from '@/components/ui';
import { Section, SectionConfiguration } from '@/types/site-builder';
import { CATEGORY_FILTERS, generateDefaultSectionData } from '@/utils/site-builder-helpers';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { siteBuilderAPI } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface SectionSelectorProps {
  clientId: string;
  onNext: (sections: SectionConfiguration[]) => void;
}

export const SectionSelector = ({ clientId, onNext }: SectionSelectorProps) => {
  const { setLoading, setError } = useSiteBuilder();
  const [availableSections, setAvailableSections] = useState<Section[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'content' | 'commerce' | 'social' | 'contact'>('all');
  const [selectedSections, setSelectedSections] = useState<SectionConfiguration[]>([]);
  const [loading, setLocalLoading] = useState(true);

  // Cargar secciones disponibles
  useEffect(() => {
    const loadSections = async () => {
      try {
        setLocalLoading(true);
        console.log('Cargando secciones disponibles...');
        
        let sections: Section[] = [];
        
        // Cargar secciones desde el backend con manejo de errores mejorado
        try {
          const response = await siteBuilderAPI.getAvailableSections();
          console.log('Respuesta de secciones del backend:', response.data);
          
          if (response.data && response.data.sections) {
            sections = response.data.sections;
            console.log('Secciones cargadas del backend:', sections);
          } else {
            throw new Error('Estructura de respuesta inválida del backend');
          }
        } catch (apiError: any) {
          console.error('Error específico de la API:', apiError);
          
          // Crear secciones por defecto si la API falla
          console.log('Creando secciones por defecto debido a error de API...');
          sections = [
            {
              id: 'hero',
              name: 'Sección Hero',
              description: 'Sección principal con imagen de fondo y llamada a la acción',
              required: true,
              order: 1,
              template: 'hero',
              category: 'content',
              icon: '🏠',
              dataSchema: {}
            },
            {
              id: 'about',
              name: 'Sobre Nosotros',
              description: 'Información sobre la empresa',
              required: false,
              order: 2,
              template: 'about',
              category: 'content',
              icon: 'ℹ️',
              dataSchema: {}
            },
            {
              id: 'products',
              name: 'Productos',
              description: 'Catálogo de productos',
              required: false,
              order: 3,
              template: 'products',
              category: 'commerce',
              icon: '🛍️',
              dataSchema: {}
            },
            {
              id: 'services',
              name: 'Servicios',
              description: 'Servicios ofrecidos',
              required: false,
              order: 4,
              template: 'services',
              category: 'content',
              icon: '🔧',
              dataSchema: {}
            },
            {
              id: 'contact',
              name: 'Contacto',
              description: 'Información de contacto',
              required: false,
              order: 5,
              template: 'contact',
              category: 'contact',
              icon: '📞',
              dataSchema: {}
            },
            {
              id: 'testimonials',
              name: 'Testimonios',
              description: 'Opiniones de clientes',
              required: false,
              order: 6,
              template: 'testimonials',
              category: 'social',
              icon: '💬',
              dataSchema: {}
            },
            {
              id: 'gallery',
              name: 'Galería',
              description: 'Galería de imágenes',
              required: false,
              order: 7,
              template: 'gallery',
              category: 'content',
              icon: '🖼️',
              dataSchema: {}
            }
          ];
        }
        
        setAvailableSections(sections);
        
        // Inicializar secciones seleccionadas
        const initialSections = sections.map(section => ({
          id: section.id,
          enabled: section.required,
          order: section.order,
          data: generateDefaultSectionData(section.template)
        }));
        
        setSelectedSections(initialSections);
        
      } catch (error: any) {
        console.error('Error cargando secciones:', error);
        setError('Error al cargar las secciones disponibles');
        toast.error('Error al cargar las secciones');
      } finally {
        setLocalLoading(false);
      }
    };

    loadSections();
  }, [setError]);

  // Filtrar secciones por categoría
  const filteredSections = availableSections.filter(section => {
    if (selectedCategory === 'all') return true;
    return section.category === selectedCategory;
  });

  // Manejar selección/deselección de secciones
  const handleSectionToggle = (sectionId: string, enabled: boolean) => {
    setSelectedSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, enabled }
          : section
      )
    );
  };

  // Mover sección arriba o abajo
  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    console.log('=== MOVIENDO SECCIÓN ===');
    console.log('Section ID:', sectionId);
    console.log('Direction:', direction);
    console.log('Selected sections before:', selectedSections);
    
    setSelectedSections(prev => {
      const enabledSections = prev.filter(s => s.enabled);
      const currentIndex = enabledSections.findIndex(s => s.id === sectionId);
      
      console.log('Enabled sections:', enabledSections);
      console.log('Current index:', currentIndex);
      
      if (currentIndex === -1) {
        console.log('Section not found in enabled sections');
        return prev;
      }
      
      let newIndex: number;
      if (direction === 'up' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (direction === 'down' && currentIndex < enabledSections.length - 1) {
        newIndex = currentIndex + 1;
      } else {
        console.log('Cannot move section in this direction');
        return prev; // No se puede mover
      }
      
      console.log('New index:', newIndex);
      
      // Crear una copia del array para no mutar el original
      const newEnabledSections = [...enabledSections];
      
      // Intercambiar las secciones
      [newEnabledSections[currentIndex], newEnabledSections[newIndex]] = [newEnabledSections[newIndex], newEnabledSections[currentIndex]];
      
      // Actualizar los valores de order
      newEnabledSections.forEach((section, index) => {
        section.order = index + 1;
      });
      
      console.log('Enabled sections after reorder:', newEnabledSections);
      
      // Reconstruir el array completo con las secciones habilitadas actualizadas
      const disabledSections = prev.filter(s => !s.enabled);
      const result = [...newEnabledSections, ...disabledSections];
      
      console.log('Final result:', result);
      return result;
    });
  };

  // Guardar y continuar
  const handleSave = () => {
    const enabledSections = selectedSections.filter(s => s.enabled);
    
    if (enabledSections.length === 0) {
      toast.error('Debes seleccionar al menos una sección');
      return;
    }
    
    // Ordenar por el orden actual
    const sortedSections = enabledSections.sort((a, b) => a.order - b.order);
    
    onNext(sortedSections);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-vendes-spin mx-auto mb-4 text-vendes-purple" />
          <VendesBody>Cargando secciones disponibles...</VendesBody>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Filtros por categoría compactos */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="vendes-heading-4">Filtrar por Categoría</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2 flex-wrap">
            {CATEGORY_FILTERS.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-1 text-sm px-3 py-1"
                size="sm"
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de secciones compactas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filteredSections.map((section) => {
          const isSelected = selectedSections.find(s => s.id === section.id)?.enabled;
          const isRequired = section.required;
          
          return (
            <Card
              key={section.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-vendes-purple bg-vendes-purple/5' 
                  : 'hover:ring-1 hover:ring-vendes-neutral'
              } ${isRequired ? 'bg-yellow-50 ring-2 ring-yellow-300' : ''}`}
              onClick={() => !isRequired && handleSectionToggle(section.id, !isSelected)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{section.icon}</span>
                  <div className="flex items-center gap-1">
                    {isRequired && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5">
                        Requerida
                      </Badge>
                    )}
                    {!isRequired && (
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => handleSectionToggle(section.id, (e.target as HTMLInputElement).checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                </div>
                <VendesHeading3 className="mb-1 vendes-text-dark text-sm">{section.name}</VendesHeading3>
                <VendesTextSmall className="mb-2">{section.description}</VendesTextSmall>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {section.category}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Secciones seleccionadas ordenadas compactas */}
      {selectedSections.filter(s => s.enabled).length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="vendes-heading-4">Orden de las Secciones</CardTitle>
            <CardDescription className="vendes-text-small">
              Arrastra para reordenar o usa los botones para mover secciones
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {selectedSections
                .filter(section => section.enabled)
                .sort((a, b) => a.order - b.order)
                .map((section, index) => {
                  const sectionInfo = availableSections.find(s => s.id === section.id);
                  return (
                    <div key={section.id} className="flex items-center p-3 bg-vendes-neutral/20 rounded-lg border border-vendes-border hover:bg-vendes-neutral/30 transition-colors">
                      <span className="mr-3 vendes-text-neutral font-bold w-8 h-8 bg-[#551BB3] text-white rounded-full flex items-center justify-center text-sm">
                        {section.order}
                      </span>
                      <span className="mr-3 text-xl">{sectionInfo?.icon}</span>
                      <span className="flex-1 font-medium text-sm vendes-text-dark">{sectionInfo?.name}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={section.order === 1}
                          className="h-8 w-8 p-0 hover:bg-[#551BB3] hover:text-white transition-colors"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={section.order === selectedSections.filter(s => s.enabled).length}
                          className="h-8 w-8 p-0 hover:bg-[#551BB3] hover:text-white transition-colors"
                        >
                          ↓
                        </Button>
                        <Badge variant="outline" className="text-xs px-2 py-1 bg-white">
                          {sectionInfo?.category}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center pt-2">
        <VendesCaption>
          {selectedSections.filter(s => s.enabled).length} secciones seleccionadas
        </VendesCaption>
        <Button 
          onClick={handleSave}
          size="default"
          className="px-6 vendes-button-primary"
          disabled={selectedSections.filter(s => s.enabled).length === 0}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
