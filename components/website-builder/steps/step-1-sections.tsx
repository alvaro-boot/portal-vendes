"use client"

import { cn } from "@/lib/utils"
import { useWizard } from "../wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export function Step1Sections() {
  const { 
    availableSections, 
    selectedSections, 
    categories, 
    loading, 
    error,
    toggleSection 
  } = useWizard()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando secciones disponibles...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-primary hover:underline"
        >
          Intentar nuevamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Elige qué secciones incluir en tu sitio web</h3>
        <p className="text-muted-foreground">
          Selecciona las secciones que quieres incluir. La sección Hero es obligatoria.
        </p>
      </div>

      {/* Categorías */}
      {Object.keys(categories).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categories).map(([key, name]) => (
            <Badge key={key} variant="secondary" className="text-xs">
              {name}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableSections.map((section) => {
          const isSelected = selectedSections.includes(section.id)
          const isRequired = section.required

          return (
            <Card
              key={section.id}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group",
                isSelected
                  ? "ring-2 ring-primary bg-primary/5 shadow-md transform scale-105"
                  : "hover:shadow-md hover:border-primary/20",
                isRequired && "ring-1 ring-secondary"
              )}
              onClick={() => !isRequired && toggleSection(section.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isRequired}
                    onChange={() => {}} // Handled by card click
                    className="pointer-events-none"
                  />
                  <span className="text-2xl">{section.icon}</span>
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {section.name}
                      {isRequired && (
                        <Badge variant="outline" className="text-xs">
                          Obligatoria
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{section.description}</CardDescription>
                {section.category && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {categories[section.category] || section.category}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedSections.length > 0 && (
        <div className="mt-6 p-4 bg-secondary/10 rounded-lg animate-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm text-foreground">
            <strong>Secciones seleccionadas:</strong> {selectedSections.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedSections.map(id => {
              const section = availableSections.find(s => s.id === id)
              return section?.name
            }).join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}
