/**
 * Componente de configuración de testimonios
 *
 * Permite a los usuarios gestionar testimonios de clientes para mostrar
 * en su tienda online. Incluye funcionalidades para:
 * - Agregar nuevos testimonios
 * - Editar testimonios existentes
 * - Marcar testimonios como destacados
 * - Vista previa del carrusel móvil
 * - Validación de formularios
 */

"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Upload,
  Star,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"

import { NavigationSteps } from "@/components/navigation-steps"
import { VendesLogoHeader } from "@/components/ui/vendes-logo"
import { useFormValidation, validationConfigs } from "@/hooks/use-form-validation"
import { getInitials, generateUniqueId, sortTestimoniosByDestacado } from "@/utils/dashboard-helpers"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/constants/dashboard"
import type { SectionProps, Testimonio } from "@/types/dashboard"

/** Props específicas del componente de testimonios */
interface TestimoniosProps extends SectionProps {}

/** Estado del formulario de nuevo testimonio */
interface NuevoTestimonioForm {
  nombre: string
  resena: string
  rol: string
  imagen: File | null
  destacado: boolean
}

/** Estado inicial del formulario */
const INITIAL_FORM_STATE: NuevoTestimonioForm = {
  nombre: "",
  resena: "",
  rol: "",
  imagen: null,
  destacado: false,
}

/** Testimonios de ejemplo para demostración */
const TESTIMONIOS_EJEMPLO: Testimonio[] = [
  {
    id: "1",
    nombre: "María González",
    resena: "Excelente servicio y productos de calidad. Siempre encuentro lo que busco.",
    rol: "Cliente frecuente",
    destacado: true,
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    resena: "La atención al cliente es fantástica. Entrega rápida y producto tal como se describe.",
    rol: "Comprador online",
    destacado: false,
  },
]

/**
 * Componente principal de configuración de testimonios
 */
export function Testimonios({ activeSection, setActiveSection, completedSections, onComplete }: TestimoniosProps) {
  // Estado local
  const [testimonios, setTestimonios] = useState<Testimonio[]>(TESTIMONIOS_EJEMPLO)
  const [nuevoTestimonio, setNuevoTestimonio] = useState<NuevoTestimonioForm>(INITIAL_FORM_STATE)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Validación de formularios
  const { errors, validateForm, validateSingleField, clearErrors } = useFormValidation(validationConfigs.testimonio)

  /**
   * Agrega un nuevo testimonio a la lista
   */
  const agregarTestimonio = useCallback(() => {
    // Validar formulario antes de agregar
    if (!validateForm(nuevoTestimonio)) {
      return
    }

    const testimonio: Testimonio = {
      id: generateUniqueId(),
      nombre: nuevoTestimonio.nombre.trim(),
      resena: nuevoTestimonio.resena.trim(),
      rol: nuevoTestimonio.rol.trim(),
      destacado: nuevoTestimonio.destacado,
    }

    setTestimonios((prev) => [...prev, testimonio])
    setNuevoTestimonio(INITIAL_FORM_STATE)
    setDialogOpen(false)
    clearErrors()
  }, [nuevoTestimonio, validateForm, clearErrors])

  /**
   * Elimina un testimonio de la lista
   */
  const eliminarTestimonio = useCallback((id: string) => {
    setTestimonios((prev) => prev.filter((t) => t.id !== id))
  }, [])

  /**
   * Alterna el estado destacado de un testimonio
   */
  const toggleDestacado = useCallback((id: string) => {
    setTestimonios((prev) => prev.map((t) => (t.id === id ? { ...t, destacado: !t.destacado } : t)))
  }, [])

  /**
   * Maneja el envío del formulario principal
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onComplete("testimonios")
    },
    [onComplete],
  )

  /**
   * Maneja cambios en el formulario de nuevo testimonio
   */
  const handleFormChange = useCallback(
    (field: keyof NuevoTestimonioForm, value: any) => {
      setNuevoTestimonio((prev) => ({ ...prev, [field]: value }))

      // Validar campo individual
      if (typeof value === "string" && value.trim()) {
        validateSingleField(field, value.trim())
      }
    },
    [validateSingleField],
  )

  /**
   * Testimonios ordenados con destacados primero
   */
  const testimoniosOrdenados = useMemo(() => sortTestimoniosByDestacado(testimonios), [testimonios])

  /**
   * Testimonio para vista previa (primer destacado o primero disponible)
   */
  const testimonioPreview = useMemo(
    () => testimoniosOrdenados.find((t) => t.destacado) || testimoniosOrdenados[0],
    [testimoniosOrdenados],
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationSteps
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        completedSections={completedSections}
      />

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              {/* Encabezado de sección */}
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[#292522] mb-2">Testimonios</h2>
                <p className="text-[#666666]">
                  Muestra las opiniones de tus clientes para generar confianza y credibilidad.
                </p>
              </header>

              {/* Botón para agregar testimonio */}
              <div className="mb-8">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="gap-2 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white px-6 py-2 rounded-lg font-medium"
                      aria-label="Agregar nuevo testimonio"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar testimonio
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Nuevo Testimonio</DialogTitle>
                      <DialogDescription>Agrega una reseña de cliente a tu tienda</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Campo nombre */}
                      <div className="space-y-2">
                        <Label htmlFor="nombre-cliente">Nombre del cliente *</Label>
                        <Input
                          id="nombre-cliente"
                          value={nuevoTestimonio.nombre}
                          onChange={(e) => handleFormChange("nombre", e.target.value)}
                          placeholder="Ej: Juan Pérez"
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-[#292522]"
                          aria-describedby={errors.nombre ? "nombre-error" : undefined}
                        />
                        {errors.nombre && (
                          <p id="nombre-error" className="text-sm text-red-600">
                            {errors.nombre}
                          </p>
                        )}
                      </div>

                      {/* Campo rol */}
                      <div className="space-y-2">
                        <Label htmlFor="rol-cliente">Rol o descripción *</Label>
                        <Input
                          id="rol-cliente"
                          value={nuevoTestimonio.rol}
                          onChange={(e) => handleFormChange("rol", e.target.value)}
                          placeholder="Ej: Cliente frecuente, Empresario, etc."
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-[#292522]"
                          aria-describedby={errors.rol ? "rol-error" : undefined}
                        />
                        {errors.rol && (
                          <p id="rol-error" className="text-sm text-red-600">
                            {errors.rol}
                          </p>
                        )}
                      </div>

                      {/* Campo reseña */}
                      <div className="space-y-2">
                        <Label htmlFor="resena-cliente">Reseña *</Label>
                        <Textarea
                          id="resena-cliente"
                          value={nuevoTestimonio.resena}
                          onChange={(e) => handleFormChange("resena", e.target.value)}
                          placeholder="Escribe la reseña del cliente..."
                          rows={3}
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-[#292522]"
                          aria-describedby={errors.resena ? "resena-error" : undefined}
                        />
                        {errors.resena && (
                          <p id="resena-error" className="text-sm text-red-600">
                            {errors.resena}
                          </p>
                        )}
                      </div>

                      {/* Campo imagen */}
                      <div className="space-y-3">
                        <Label>Imagen del cliente (opcional)</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground/50" />
                          <div className="mt-2">
                            <Button variant="outline" size="sm" type="button">
                              Subir imagen
                            </Button>
                            <p className="text-xs text-[#666666] mt-1">PNG o JPG, máximo 2MB</p>
                          </div>
                        </div>
                      </div>

                      {/* Switch destacado */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="destacado">Testimonio destacado</Label>
                          <p className="text-sm text-[#666666]">Se mostrará con mayor prominencia</p>
                        </div>
                        <Switch
                          id="destacado"
                          checked={nuevoTestimonio.destacado}
                          onCheckedChange={(checked) => handleFormChange("destacado", checked)}
                          className="data-[state=checked]:bg-[#551BB3]"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDialogOpen(false)
                          setNuevoTestimonio(INITIAL_FORM_STATE)
                          clearErrors()
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={agregarTestimonio}
                        disabled={!nuevoTestimonio.nombre || !nuevoTestimonio.resena || !nuevoTestimonio.rol}
                      >
                        Agregar testimonio
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Lista de testimonios registrados */}
              <section className="space-y-6">
                <h3 className="text-lg font-medium text-[#292522]">Testimonios registrados ({testimonios.length})</h3>

                <div className="space-y-4">
                  {testimoniosOrdenados.map((testimonio) => (
                    <Card key={testimonio.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Avatar del cliente */}
                          <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarImage
                              src={testimonio.imagen || "/placeholder.svg"}
                              alt={`Foto de ${testimonio.nombre}`}
                            />
                            <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                              {getInitials(testimonio.nombre)}
                            </AvatarFallback>
                          </Avatar>

                          {/* Contenido del testimonio */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#292522]">{testimonio.nombre}</h4>
                              {testimonio.destacado && (
                                <Badge className="bg-[#A9F04D]/20 text-[#292522] hover:bg-[#A9F04D]/20 text-xs">
                                  Destacado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#666666]">{testimonio.rol}</p>
                            <p className="text-sm text-[#292522] leading-relaxed">"{testimonio.resena}"</p>

                            {/* Estrellas de calificación */}
                            <div className="flex items-center gap-1" aria-label="5 estrellas">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                              ))}
                            </div>
                          </div>

                          {/* Acciones del testimonio */}
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleDestacado(testimonio.id)}
                              className="h-8 w-8 text-[#666666] hover:text-[#292522]"
                              aria-label={`${testimonio.destacado ? "Quitar" : "Marcar"} como destacado`}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  testimonio.destacado ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                                }`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666666] hover:text-[#292522]"
                              aria-label={`Editar testimonio de ${testimonio.nombre}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => eliminarTestimonio(testimonio.id)}
                              className="h-8 w-8 text-[#666666] hover:text-red-600"
                              aria-label={`Eliminar testimonio de ${testimonio.nombre}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Vista previa móvil del carrusel */}
                {testimonioPreview && (
                  <div className="mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-[#292522]">Vista previa móvil - Carrusel</span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="max-w-sm mx-auto">
                        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                          {/* Avatar en vista previa */}
                          <Avatar className="w-16 h-16 mx-auto mb-4">
                            <AvatarImage src="/placeholder.svg" alt={`Vista previa de ${testimonioPreview.nombre}`} />
                            <AvatarFallback className="bg-[#E2DDD9] text-[#666666] font-medium text-lg">
                              {getInitials(testimonioPreview.nombre)}
                            </AvatarFallback>
                          </Avatar>

                          {/* Estrellas */}
                          <div className="flex justify-center gap-1 mb-4" aria-label="5 estrellas">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                            ))}
                          </div>

                          {/* Reseña */}
                          <p className="text-sm text-[#292522] italic mb-4 leading-relaxed">
                            "{testimonioPreview.resena}"
                          </p>

                          {/* Información del cliente */}
                          <div className="text-center">
                            <p className="font-medium text-[#292522]">{testimonioPreview.nombre}</p>
                            <p className="text-sm text-[#666666]">{testimonioPreview.rol}</p>
                          </div>

                          {/* Controles del carrusel */}
                          <div className="flex items-center justify-between mt-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666666] hover:text-[#292522]"
                              aria-label="Testimonio anterior"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {/* Indicadores de página */}
                            <div className="flex gap-2" role="tablist" aria-label="Indicadores de testimonios">
                              {Array.from({ length: Math.min(testimonios.length, 3) }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#551BB3]" : "bg-[#E2DDD9]"}`}
                                  role="tab"
                                  aria-selected={i === 0}
                                  aria-label={`Testimonio ${i + 1}`}
                                />
                              ))}
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666666] hover:text-[#292522]"
                              aria-label="Siguiente testimonio"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Formulario de guardado */}
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      className="px-8 py-3 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white font-medium rounded-lg"
                    >
                      Guardar testimonios
                    </Button>
                  </div>
                </form>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
