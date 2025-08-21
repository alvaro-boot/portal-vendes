"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Layers } from "lucide-react"
import { NavigationSteps } from "@/components/navigation-steps"
import type { SectionProps } from "@/types/dashboard"

type Categoria = "productos_y_servicios" | "productos" | "servicios"

export function CategoriaComercio({ activeSection, setActiveSection, completedSections, onComplete }: SectionProps) {
  const [categoria, setCategoria] = useState<Categoria>("productos_y_servicios")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete("categoria")
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <NavigationSteps
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        completedSections={completedSections}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2 text-[#551BB3]">
                <Layers className="w-5 h-5" />
                <CardTitle className="text-2xl">Categoría de comercio</CardTitle>
              </div>
              <CardDescription className="text-[#666666]">
                Selecciona el tipo de negocio que mejor describe tu oferta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <RadioGroup value={categoria} onValueChange={(v) => setCategoria(v as Categoria)} className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border border-[#E2DDD9] bg-white p-4">
                    <RadioGroupItem value="productos_y_servicios" id="productos_y_servicios" className="mt-1" />
                    <Label htmlFor="productos_y_servicios" className="cursor-pointer">
                      <div className="font-medium text-[#292522]">Productos y servicios</div>
                      <div className="text-sm text-[#666666]">Vendes productos y también ofreces servicios.</div>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-[#E2DDD9] bg-white p-4">
                    <RadioGroupItem value="productos" id="productos" className="mt-1" />
                    <Label htmlFor="productos" className="cursor-pointer">
                      <div className="font-medium text-[#292522]">Productos</div>
                      <div className="text-sm text-[#666666]">Tu negocio se centra exclusivamente en productos.</div>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-[#E2DDD9] bg-white p-4">
                    <RadioGroupItem value="servicios" id="servicios" className="mt-1" />
                    <Label htmlFor="servicios" className="cursor-pointer">
                      <div className="font-medium text-[#292522]">Servicios</div>
                      <div className="text-sm text-[#666666]">Ofreces servicios, citas o reservaciones.</div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#551BB3] text-white hover:bg-[#45129a]"
                  >
                    Continuar
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

export default CategoriaComercio