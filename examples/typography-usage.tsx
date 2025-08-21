import React from 'react';
import {
  VendesTitle,
  VendesSubtitle,
  VendesBody,
  VendesCaption,
  VendesHeading1,
  VendesHeading2,
  VendesHeading3,
  VendesHeading4,
  VendesTextLarge,
  VendesTextSmall,
  VendesTextMuted
} from '@/components/ui';

export const TypographyExample = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#551BB3] mb-4">
          Guía de Tipografía - Portal Vendes
        </h1>
        <p className="text-lg text-[#666666]">
          Ejemplos de uso de la tipografía oficial de Vendes
        </p>
      </div>

      {/* Jerarquía de Títulos */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Jerarquía de Títulos
        </h2>
        
        <div className="space-y-4">
          <VendesHeading1>
            Título Principal (Heading 1) - Bold, Púrpura
          </VendesHeading1>
          
          <VendesHeading2>
            Título Secundario (Heading 2) - Semibold, Púrpura
          </VendesHeading2>
          
          <VendesHeading3>
            Título Terciario (Heading 3) - Semibold, Púrpura
          </VendesHeading3>
          
          <VendesHeading4>
            Título Cuaternario (Heading 4) - Semibold, Púrpura
          </VendesHeading4>
        </div>
      </section>

      {/* Tipografía de Contenido */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Tipografía de Contenido
        </h2>
        
        <div className="space-y-4">
          <VendesTitle>
            Título de Sección - Bold, Púrpura
          </VendesTitle>
          
          <VendesSubtitle>
            Subtítulo de Sección - Semibold, Púrpura
          </VendesSubtitle>
          
          <VendesBody>
            Este es el texto de cuerpo principal del portal Vendes. Utiliza peso Regular (400) 
            y color gris medio (#666666) para máxima legibilidad en contenido extenso.
          </VendesBody>
          
          <VendesTextLarge>
            Texto grande para contenido destacado - Regular, Gris
          </VendesTextLarge>
          
          <VendesTextSmall>
            Texto pequeño para información secundaria - Regular, Gris
          </VendesTextSmall>
          
          <VendesTextMuted>
            Texto atenuado para información de ayuda - Regular, Gris Claro
          </VendesTextMuted>
          
          <VendesCaption>
            Captión para etiquetas y texto de ayuda - Regular, Gris
          </VendesCaption>
        </div>
      </section>

      {/* Ejemplos de Uso en Contexto */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Ejemplos de Uso en Contexto
        </h2>
        
        {/* Ejemplo de Card */}
        <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
          <VendesHeading3 className="mb-3">
            Tarjeta de Producto
          </VendesHeading3>
          
          <VendesBody className="mb-4">
            Descripción del producto con texto de cuerpo que mantiene la legibilidad 
            y sigue las pautas de tipografía de Vendes.
          </VendesBody>
          
          <div className="flex items-center justify-between">
            <VendesTextLarge className="font-semibold text-[#551BB3]">
              $299.99
            </VendesTextLarge>
            <VendesCaption>
              Disponible
            </VendesCaption>
          </div>
        </div>

        {/* Ejemplo de Formulario */}
        <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
          <VendesHeading3 className="mb-4">
            Formulario de Contacto
          </VendesHeading3>
          
          <div className="space-y-4">
            <div>
              <VendesSubtitle as="label" className="block mb-2">
                Nombre Completo
              </VendesSubtitle>
              <input 
                type="text" 
                className="w-full p-3 border border-[#E2DDD9] rounded-lg focus:ring-2 focus:ring-[#551BB3] focus:border-transparent"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            
            <div>
              <VendesSubtitle as="label" className="block mb-2">
                Mensaje
              </VendesSubtitle>
              <textarea 
                className="w-full p-3 border border-[#E2DDD9] rounded-lg focus:ring-2 focus:ring-[#551BB3] focus:border-transparent"
                rows={4}
                placeholder="Escribe tu mensaje aquí..."
              />
              <VendesCaption className="mt-1">
                Máximo 500 caracteres
              </VendesCaption>
            </div>
          </div>
        </div>

        {/* Ejemplo de Navegación */}
        <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
          <VendesHeading3 className="mb-4">
            Menú de Navegación
          </VendesHeading3>
          
          <nav className="space-y-2">
            <a href="#" className="block p-3 rounded-lg hover:bg-[#E2DDD9] transition-colors">
              <VendesSubtitle className="text-[#551BB3]">
                Inicio
              </VendesSubtitle>
            </a>
            <a href="#" className="block p-3 rounded-lg hover:bg-[#E2DDD9] transition-colors">
              <VendesSubtitle className="text-[#551BB3]">
                Productos
              </VendesSubtitle>
            </a>
            <a href="#" className="block p-3 rounded-lg hover:bg-[#E2DDD9] transition-colors">
              <VendesSubtitle className="text-[#551BB3]">
                Servicios
              </VendesSubtitle>
            </a>
            <a href="#" className="block p-3 rounded-lg hover:bg-[#E2DDD9] transition-colors">
              <VendesSubtitle className="text-[#551BB3]">
                Contacto
              </VendesSubtitle>
            </a>
          </nav>
        </div>
      </section>

      {/* Clases CSS Directas */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Clases CSS Directas
        </h2>
        
        <div className="space-y-4">
          <h1 className="vendes-title">
            Título con clase vendes-title
          </h1>
          
          <h2 className="vendes-subtitle">
            Subtítulo con clase vendes-subtitle
          </h2>
          
          <p className="vendes-body">
            Texto de cuerpo con clase vendes-body
          </p>
          
          <span className="vendes-caption">
            Captión con clase vendes-caption
          </span>
        </div>
      </section>

      {/* Información Técnica */}
      <section className="bg-[#E2DDD9] rounded-lg p-6">
        <VendesHeading3 className="mb-4">
          Información Técnica
        </VendesHeading3>
        
        <div className="space-y-2 text-sm">
          <VendesTextSmall>
            <strong>Familia de fuente:</strong> Inter, system-ui, sans-serif
          </VendesTextSmall>
          <VendesTextSmall>
            <strong>Pesos utilizados:</strong> 400 (Regular), 600 (Semibold), 700 (Bold)
          </VendesTextSmall>
          <VendesTextSmall>
            <strong>Colores:</strong> #551BB3 (Púrpura), #666666 (Gris), #999999 (Gris claro)
          </VendesTextSmall>
          <VendesTextSmall>
            <strong>Accesibilidad:</strong> Cumple estándares WCAG 2.1
          </VendesTextSmall>
        </div>
      </section>
    </div>
  );
};
