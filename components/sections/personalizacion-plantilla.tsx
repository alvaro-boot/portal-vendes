"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, Smartphone, Facebook, Instagram, Linkedin } from "lucide-react"
import { NavigationSteps } from "@/components/navigation-steps"
import type { DashboardSection } from "@/types/dashboard"

interface PersonalizacionPlantillaProps {
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
  completedSections: DashboardSection[]
  onComplete: (section: DashboardSection) => void
}

export function PersonalizacionPlantilla({
  activeSection,
  setActiveSection,
  completedSections,
  onComplete,
}: PersonalizacionPlantillaProps) {
  const [formData, setFormData] = useState({
    imagenBanner: null as File | null,
    fraseDestacada: "",
    ofrecerServicios: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete("personalizacion")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Steps */}
      <NavigationSteps
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        completedSections={completedSections}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#292522] mb-2">Personalización de Plantilla</h2>
                <p className="text-[#666666]">Ajusta el diseño de la página principal para adaptarlo a tu negocio.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Toggle de servicios */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base font-medium text-[#292522]">Mi negocio ofrece servicios</Label>
                    <p className="text-sm text-[#666666]">
                      Activa esta opción si ofreces servicios que requieren citas
                    </p>
                  </div>
                  <Switch
                    checked={formData.ofrecerServicios}
                    onCheckedChange={(checked) => setFormData({ ...formData, ofrecerServicios: checked })}
                    className="data-[state=checked]:bg-[#551BB3]"
                  />
                </div>

                {/* Imagen de banner */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#292522]">Imagen de banner principal</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <Button
                      variant="default"
                      type="button"
                      className="mb-3 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white"
                    >
                      Subir imagen de banner
                    </Button>
                    <div className="text-sm text-[#666666] space-y-1">
                      <p>Recomendado: 1200x400px o proporción 3:1</p>
                      <p>JPG o PNG, máximo 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Frase destacada */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#292522]">Frase destacada</Label>
                  <Textarea
                    placeholder="Escribe una frase que represente tu negocio y atraiga a tus clientes..."
                    value={formData.fraseDestacada}
                    onChange={(e) => setFormData({ ...formData, fraseDestacada: e.target.value })}
                    rows={4}
                    className="resize-none bg-[#E2DDD9] border-[#E2DDD9]"
                    maxLength={200}
                  />
                  <p className="text-sm text-[#666666]">
                    Esta frase aparecerá prominentemente en tu página principal. Máximo 200 caracteres.
                  </p>
                </div>

                {/* Vista previa */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#292522]">Vista previa</Label>
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4 text-[#551BB3]">
                      <Smartphone className="w-5 h-5" />
                      <span className="font-medium">Vista previa móvil</span>
                    </div>

                    <div className="max-w-sm mx-auto">
                      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                        {/* Banner area */}
                        <div className="h-32 bg-gradient-to-br from-purple-200 to-green-200 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">Imagen de banner</span>
                        </div>

                        {/* Content area */}
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de guardar */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white font-medium rounded-lg"
                  >
                    Guardar personalización
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
