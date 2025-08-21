import React from 'react';
import {
  VendesLogo,
  VendesLogoHeader,
  VendesLogoCompact,
  VendesLogoLight,
  VendesLogoDark
} from '@/components/ui';

export const LogoExample = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#551BB3] mb-4">
          Componentes de Logo - Portal Vendes
        </h1>
        <p className="text-lg text-[#666666]">
          Ejemplos de uso de los diferentes componentes de logo de Vendes
        </p>
      </div>

      {/* Variantes de Logo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Variantes de Logo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Logo Completo */}
          <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
            <h3 className="font-semibold text-[#551BB3] mb-4">Logo Completo</h3>
            <div className="flex justify-center">
              <VendesLogo size="xl" />
            </div>
            <p className="text-sm text-[#666666] mt-4">
              Logo con nombre completo de Vendes
            </p>
          </div>

          {/* Logo Compacto */}
          <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
            <h3 className="font-semibold text-[#551BB3] mb-4">Logo Compacto</h3>
            <div className="flex justify-center">
              <VendesLogoCompact size="xl" />
            </div>
            <p className="text-sm text-[#666666] mt-4">
              Solo el icono del logo
            </p>
          </div>

          {/* Logo para Header */}
          <div className="bg-[#551BB3] rounded-lg border border-[#551BB3] p-6 shadow-sm">
            <h3 className="font-semibold text-white mb-4">Logo para Header</h3>
            <div className="flex justify-center">
              <VendesLogoHeader size="xl" />
            </div>
            <p className="text-sm text-white/80 mt-4">
              Logo optimizado para fondos oscuros
            </p>
          </div>
        </div>
      </section>

      {/* Tamaños de Logo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Tamaños Disponibles
        </h2>
        
        <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-center">
              <VendesLogo size="sm" />
              <p className="text-xs text-[#666666] mt-2">Small (32px)</p>
            </div>
            <div className="text-center">
              <VendesLogo size="md" />
              <p className="text-xs text-[#666666] mt-2">Medium (48px)</p>
            </div>
            <div className="text-center">
              <VendesLogo size="lg" />
              <p className="text-xs text-[#666666] mt-2">Large (64px)</p>
            </div>
            <div className="text-center">
              <VendesLogo size="xl" />
              <p className="text-xs text-[#666666] mt-2">Extra Large (80px)</p>
            </div>
            <div className="text-center">
              <VendesLogo size="2xl" />
              <p className="text-xs text-[#666666] mt-2">2XL (96px)</p>
            </div>
            <div className="text-center">
              <VendesLogo size="3xl" />
              <p className="text-xs text-[#666666] mt-2">3XL (128px)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logos en Diferentes Fondos */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Logos en Diferentes Fondos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fondo Claro */}
          <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
            <h3 className="font-semibold text-[#551BB3] mb-4">Fondo Claro</h3>
            <div className="flex justify-center">
              <VendesLogoLight size="xl" />
            </div>
            <p className="text-sm text-[#666666] mt-4">
              Logo optimizado para fondos claros
            </p>
          </div>

          {/* Fondo Oscuro */}
          <div className="bg-[#292522] rounded-lg border border-[#292522] p-6 shadow-sm">
            <h3 className="font-semibold text-white mb-4">Fondo Oscuro</h3>
            <div className="flex justify-center">
              <VendesLogoDark size="xl" />
            </div>
            <p className="text-sm text-white/80 mt-4">
              Logo optimizado para fondos oscuros
            </p>
          </div>
        </div>
      </section>

      {/* Ejemplos de Uso en Contexto */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#551BB3] mb-4">
          Ejemplos de Uso en Contexto
        </h2>
        
        {/* Header de Navegación */}
        <div className="bg-[#551BB3] rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <VendesLogoHeader size="lg" />
            <nav className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-[#A9F04D] transition-colors">Inicio</a>
              <a href="#" className="text-white hover:text-[#A9F04D] transition-colors">Productos</a>
              <a href="#" className="text-white hover:text-[#A9F04D] transition-colors">Contacto</a>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#292522] rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <VendesLogoDark size="md" />
            <div className="text-white/60 text-sm">
              © 2024 Vendes. Todos los derechos reservados.
            </div>
          </div>
        </div>

        {/* Tarjeta de Producto */}
        <div className="bg-white rounded-lg border border-[#E2DDD9] p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <VendesLogoCompact size="md" />
            <div>
              <h3 className="font-semibold text-[#551BB3]">Producto Vendes</h3>
              <p className="text-sm text-[#666666]">
                Descripción del producto con el logo compacto como icono.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Información Técnica */}
      <section className="bg-[#E2DDD9] rounded-lg p-6">
        <h3 className="font-semibold text-[#551BB3] mb-4">
          Información Técnica
        </h3>
        
        <div className="space-y-2 text-sm">
          <p className="text-[#666666]">
            <strong>Imágenes utilizadas:</strong> vendes-logo.jpg y vendes-logo-nombre.jpg
          </p>
          <p className="text-[#666666]">
            <strong>Optimización:</strong> Next.js Image component con lazy loading
          </p>
          <p className="text-[#666666]">
            <strong>Responsive:</strong> Tamaños adaptables para diferentes dispositivos
          </p>
          <p className="text-[#666666]">
            <strong>Accesibilidad:</strong> Alt text descriptivo incluido
          </p>
        </div>
      </section>
    </div>
  );
};
