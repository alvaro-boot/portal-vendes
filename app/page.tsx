/**
 * Página principal del Dashboard de Vendes
 *
 * Punto de entrada principal de la aplicación que orquesta
 * la navegación entre secciones y el estado global del dashboard.
 *
 * Características principales:
 * - Gestión de estado centralizada
 * - Navegación fluida entre secciones
 * - Persistencia del progreso del usuario
 * - Renderizado condicional optimizado
 */

"use client"

import Link from "next/link"
import { PortalShell } from "@/components/portal/portal-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  VendesHeading1,
  VendesHeading2,
  VendesHeading3,
  VendesBody,
  VendesTextLarge,
  VendesTextSmall
} from "@/components/ui"
import { 
  Rocket, 
  Sparkles, 
  ArrowRight,
  Building2,
  ShoppingCart,
  BarChart3,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  Star,
  Zap
} from "lucide-react"

export default function HomePage() {
  return (
    <PortalShell>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-[#551BB3] rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <VendesHeading1 className="vendes-text-primary">
              ¡Bienvenido a Vendes!
            </VendesHeading1>
            <div className="w-12 h-12 vendes-gradient-reverse rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <VendesTextLarge className="max-w-2xl mx-auto vendes-text-neutral">
            Tu plataforma de comercio digital profesional. Configura tu comercio en pocos pasos y comienza a vender en línea.
          </VendesTextLarge>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-white !block" />
                </div>
                <div className="flex-1">
                  <VendesHeading3 className="vendes-text-primary">Constructor de Sitios</VendesHeading3>
                  <VendesTextSmall className="vendes-text-neutral">Crea tu página web profesional</VendesTextSmall>
                </div>
                <ArrowRight className="w-5 h-5 vendes-text-neutral group-hover:text-[#551BB3] transition-colors duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <VendesHeading3 className="vendes-text-primary">Mi Tienda</VendesHeading3>
                  <VendesTextSmall className="vendes-text-neutral">Gestiona tus productos y ventas</VendesTextSmall>
                </div>
                <ArrowRight className="w-5 h-5 vendes-text-neutral group-hover:text-[#551BB3] transition-colors duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <VendesHeading3 className="vendes-text-primary">Analítica</VendesHeading3>
                  <VendesTextSmall className="vendes-text-neutral">Analiza el rendimiento de tu negocio</VendesTextSmall>
                </div>
                <ArrowRight className="w-5 h-5 vendes-text-neutral group-hover:text-[#551BB3] transition-colors duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white !block" />
                </div>
                <div>
                  <VendesHeading2 className="vendes-text-primary">10,000+</VendesHeading2>
                  <VendesTextSmall className="vendes-text-neutral">Comercios activos</VendesTextSmall>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white !block" />
                </div>
                <div>
                  <VendesHeading2 className="vendes-text-primary">$2.5M+</VendesHeading2>
                  <VendesTextSmall className="vendes-text-neutral">Ventas generadas</VendesTextSmall>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <VendesHeading2 className="vendes-text-primary">150+</VendesHeading2>
                  <VendesTextSmall className="vendes-text-neutral">Países alcanzados</VendesTextSmall>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#551BB3] rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <VendesHeading3 className="vendes-text-primary">Características Principales</VendesHeading3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#551BB3]" />
                    <VendesBody className="vendes-text-neutral">Configuración rápida y sencilla</VendesBody>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#551BB3]" />
                    <VendesBody className="vendes-text-neutral">Diseños profesionales y modernos</VendesBody>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#551BB3]" />
                    <VendesBody className="vendes-text-neutral">Herramientas de análisis avanzadas</VendesBody>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#551BB3]" />
                    <VendesBody className="vendes-text-neutral">Soporte técnico especializado</VendesBody>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#551BB3] rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <VendesHeading3 className="vendes-text-primary">¿Por qué elegir Vendes?</VendesHeading3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 vendes-bg-primary rounded-full" />
                    <VendesBody className="vendes-text-neutral">Plataforma todo en uno</VendesBody>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 vendes-bg-primary rounded-full" />
                    <VendesBody className="vendes-text-neutral">Sin conocimientos técnicos requeridos</VendesBody>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 vendes-bg-primary rounded-full" />
                    <VendesBody className="vendes-text-neutral">Escalable según tu crecimiento</VendesBody>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 vendes-bg-primary rounded-full" />
                    <VendesBody className="vendes-text-neutral">Precios competitivos y transparentes</VendesBody>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-2xl bg-white">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-[#551BB3] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <VendesHeading2 className="vendes-text-primary">
                ¿Listo para comenzar?
              </VendesHeading2>
              <VendesBody className="max-w-md mx-auto vendes-text-neutral">
                Únete a miles de comerciantes que ya están vendiendo en línea con Vendes.
              </VendesBody>
              <Button size="lg" className="bg-[#551BB3] hover:opacity-90 px-8 py-3 rounded-xl font-semibold text-white">
                <Rocket className="w-5 h-5 mr-2" />
                Crear mi sitio web
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
