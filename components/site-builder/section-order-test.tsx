'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestSection {
  id: string;
  name: string;
  order: number;
  enabled: boolean;
}

export const SectionOrderTest = () => {
  const [sections, setSections] = useState<TestSection[]>([
    { id: 'hero', name: 'Sección Hero', order: 1, enabled: true },
    { id: 'about', name: 'Sobre Nosotros', order: 2, enabled: true },
    { id: 'products', name: 'Productos', order: 3, enabled: true },
    { id: 'services', name: 'Servicios', order: 4, enabled: true },
    { id: 'testimonials', name: 'Testimonios', order: 5, enabled: true },
    { id: 'gallery', name: 'Galería', order: 6, enabled: true },
  ]);

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    console.log('=== MOVIENDO SECCIÓN ===');
    console.log('Section ID:', sectionId);
    console.log('Direction:', direction);
    console.log('Sections before:', sections);
    
    setSections(prev => {
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
        return prev;
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Prueba de Reordenamiento de Secciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sections
              .filter(section => section.enabled)
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div key={section.id} className="flex items-center p-3 bg-gray-100 rounded-lg border">
                  <span className="mr-3 font-bold w-8 h-8 bg-[#551BB3] text-white rounded-full flex items-center justify-center text-sm">
                    {section.order}
                  </span>
                  <span className="flex-1 font-medium">{section.name}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveSection(section.id, 'up')}
                      disabled={section.order === 1}
                      className="h-8 w-8 p-0"
                    >
                      ↑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveSection(section.id, 'down')}
                      disabled={section.order === sections.filter(s => s.enabled).length}
                      className="h-8 w-8 p-0"
                    >
                      ↓
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Estado actual:</h4>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto">
              {JSON.stringify(sections.filter(s => s.enabled).sort((a, b) => a.order - b.order), null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
