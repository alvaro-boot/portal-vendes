
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, Eye, Palette, AlertCircle, CheckCircle, Layers } from "lucide-react"
import { NavigationSteps } from "@/components/navigation-steps"
import type { DashboardSection } from "@/types/dashboard"
import vendesLogo from "@/utils/images/vendes-logo.jpg"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VendesLogoHeader } from "@/components/ui/vendes-logo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PLANTILLAS_DISPONIBLES } from "@/constants/dashboard"
import { ColorPicker } from "@/components/ui/color-picker"
import type {
  DashboardState,
  IdentidadComercio,
  PersonalizacionPlantilla,
  Producto,
  InformacionNosotros,
  Testimonio,
} from "@/types/dashboard"

interface IdentidadComercioProps {
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
  completedSections: DashboardSection[]
  onComplete: (section: DashboardSection) => void
}

interface FormData {
  nombreComercio: string
  slogan: string
  plantilla: string
  tipodominio: string
  subdominio: string
  dominioPropio: string
  colorPrimario: string
  colorSecundario: string
  accentColor: string
  backgroundColor: string
  textColor: string
  mutedTextColor: string
  cardBackground: string
  borderColor: string
  font: string
  logo: File | null
  icono: File | null
}

interface ValidationErrors {
  nombreComercio?: string
  slogan?: string
  subdominio?: string
  dominioPropio?: string
  colorPrimario?: string
  colorSecundario?: string
  accentColor?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  cardBackground?: string
  borderColor?: string
  logo?: string
  icono?: string
}

interface TouchedFields {
  nombreComercio: boolean
  slogan: boolean
  subdominio: boolean
  dominioPropio: boolean
  colorPrimario: boolean
  colorSecundario: boolean
  accentColor: boolean
  backgroundColor: boolean
  textColor: boolean
  mutedTextColor: boolean
  cardBackground: boolean
  borderColor: boolean
  logo: boolean
  icono: boolean
}

// Función para validar formato de color hexadecimal
const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexRegex.test(color)
}

// Función para validar formato de dominio
const isValidDomain = (domain: string): boolean => {
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return domainRegex.test(domain)
}

// Función para validar subdominio
const isValidSubdomain = (subdomain: string): boolean => {
  const subdomainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/
  return subdomainRegex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63
}

// Función para validar archivo de imagen
const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']
  const maxSize = 5 * 1024 * 1024 // 5MB
  return validTypes.includes(file.type) && file.size <= maxSize
}

// Hook personalizado para validaciones con manejo de campos tocados
const useFormValidation = (formData: FormData, touchedFields: TouchedFields) => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValid, setIsValid] = useState(false)

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    // Validación del nombre del comercio (solo si está tocado)
    if (touchedFields.nombreComercio) {
      if (!formData.nombreComercio.trim()) {
        newErrors.nombreComercio = "El nombre del comercio es obligatorio"
      } else if (formData.nombreComercio.trim().length < 3) {
        newErrors.nombreComercio = "El nombre debe tener al menos 3 caracteres"
      } else if (formData.nombreComercio.trim().length > 50) {
        newErrors.nombreComercio = "El nombre no puede exceder 50 caracteres"
      }
    }

    // Validación del slogan (solo si está tocado)
    if (touchedFields.slogan && formData.slogan.trim() && formData.slogan.trim().length > 100) {
      newErrors.slogan = "El slogan no puede exceder 100 caracteres"
    }

    // Validación del subdominio (solo si está tocado y es el tipo seleccionado)
    if (formData.tipodominio === "subdominio" && touchedFields.subdominio) {
      if (!formData.subdominio.trim()) {
        newErrors.subdominio = "El subdominio es obligatorio"
      } else if (!isValidSubdomain(formData.subdominio.trim())) {
        newErrors.subdominio = "El subdominio debe contener solo letras minúsculas, números y guiones, entre 3 y 63 caracteres"
      }
    }

    // Validación del dominio propio (solo si está tocado y es el tipo seleccionado)
    if (formData.tipodominio === "propio" && touchedFields.dominioPropio) {
      if (!formData.dominioPropio.trim()) {
        newErrors.dominioPropio = "El dominio propio es obligatorio"
      } else if (!isValidDomain(formData.dominioPropio.trim())) {
        newErrors.dominioPropio = "Formato de dominio inválido"
      }
    }

    // Validación de colores (solo si están tocados)
    if (touchedFields.colorPrimario && !isValidHexColor(formData.colorPrimario)) {
      newErrors.colorPrimario = "Formato de color inválido (ej: #551BB3)"
    }

    if (touchedFields.colorSecundario && !isValidHexColor(formData.colorSecundario)) {
      newErrors.colorSecundario = "Formato de color inválido (ej: #A9F04D)"
    }

    if (touchedFields.accentColor && !isValidHexColor(formData.accentColor)) {
      newErrors.accentColor = "Formato de color inválido (ej: #FF5733)"
    }

    if (touchedFields.backgroundColor && !isValidHexColor(formData.backgroundColor)) {
      newErrors.backgroundColor = "Formato de color inválido (ej: #FFFFFF)"
    }

    if (touchedFields.textColor && !isValidHexColor(formData.textColor)) {
      newErrors.textColor = "Formato de color inválido (ej: #292522)"
    }

    if (touchedFields.mutedTextColor && !isValidHexColor(formData.mutedTextColor)) {
      newErrors.mutedTextColor = "Formato de color inválido (ej: #666666)"
    }

    if (touchedFields.cardBackground && !isValidHexColor(formData.cardBackground)) {
      newErrors.cardBackground = "Formato de color inválido (ej: #FFFFFF)"
    }

    if (touchedFields.borderColor && !isValidHexColor(formData.borderColor)) {
      newErrors.borderColor = "Formato de color inválido (ej: #E2DDD9)"
    }

    // Validación de archivos (solo si están tocados)
    if (touchedFields.logo && formData.logo && !isValidImageFile(formData.logo)) {
      newErrors.logo = "El archivo debe ser una imagen válida (JPG, PNG, SVG) de máximo 5MB"
    }

    if (touchedFields.icono && formData.icono && !isValidImageFile(formData.icono)) {
      newErrors.icono = "El archivo debe ser una imagen válida (JPG, PNG, SVG) de máximo 5MB"
    }

    return newErrors
  }

  useEffect(() => {
    const newErrors = validateForm()
    setErrors(newErrors)
    
    // El formulario es válido si no hay errores y el nombre del comercio está completo
    const hasRequiredFields = formData.nombreComercio.trim().length > 0
    const hasNoErrors = Object.keys(newErrors).length === 0
    setIsValid(hasRequiredFields && hasNoErrors)
  }, [formData, touchedFields])

  return { errors, isValid, validateForm }
}

export function IdentidadComercio({
  activeSection,
  setActiveSection,
  completedSections,
  onComplete,
}: IdentidadComercioProps) {
  const [formData, setFormData] = useState<FormData>({
    nombreComercio: "",
    slogan: "",
    plantilla: "moderno",
    tipodominio: "subdominio",
    subdominio: "micomercio",
    dominioPropio: "",
    colorPrimario: "#551BB3",
    colorSecundario: "#A9F04D",
    accentColor: "#FF5733",
    backgroundColor: "#FFFFFF",
    textColor: "#292522",
    mutedTextColor: "#666666",
    cardBackground: "#FFFFFF",
    borderColor: "#E2DDD9",
    font: "Inter",
    logo: null,
    icono: null,
  })

  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    nombreComercio: false,
    slogan: false,
    subdominio: false,
    dominioPropio: false,
    colorPrimario: false,
    colorSecundario: false,
    accentColor: false,
    backgroundColor: false,
    textColor: false,
    mutedTextColor: false,
    cardBackground: false,
    borderColor: false,
    logo: false,
    icono: false,
  })

  const { errors, isValid } = useFormValidation(formData, touchedFields)

  const plantillas = PLANTILLAS_DISPONIBLES

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onComplete("identidad")
    }
  }

  const handleFieldBlur = (fieldName: keyof TouchedFields) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }))
  }

  const handleFileChange = (field: 'logo' | 'icono', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
    setTouchedFields(prev => ({ ...prev, [field]: true }))
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
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-[#551BB3]">Identidad del Comercio</CardTitle>
              <CardDescription className="text-[#666666]">
                Define la identidad visual y técnica de tu comercio en la plataforma Vendes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Nombre del comercio */}
                <div className="space-y-3">
                  <Label htmlFor="nombre" className="text-base font-medium text-[#292522]">
                    Nombre del comercio *
                  </Label>
                  <div className="relative">
                    <Input
                      id="nombre"
                      placeholder="Ingresa el nombre de tu comercio"
                      value={formData.nombreComercio}
                      onChange={(e) => setFormData({ ...formData, nombreComercio: e.target.value })}
                      onBlur={() => handleFieldBlur('nombreComercio')}
                      className={`h-12 bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] pr-10 ${
                        touchedFields.nombreComercio && errors.nombreComercio ? 'border-red-500' : ''
                      }`}
                    />
                    {touchedFields.nombreComercio && errors.nombreComercio ? (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    ) : touchedFields.nombreComercio && formData.nombreComercio.trim() && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 vendes-text-secondary" />
                    )}
                  </div>
                  {touchedFields.nombreComercio && errors.nombreComercio && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.nombreComercio}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Slogan del comercio */}
                <div className="space-y-3">
                  <Label htmlFor="slogan" className="text-base font-medium text-[#292522]">
                    Slogan
                  </Label>
                  <Input
                    id="slogan"
                    placeholder="Describe tu comercio en pocas palabras"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    onBlur={() => handleFieldBlur('slogan')}
                    className={`h-12 bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                      touchedFields.slogan && errors.slogan ? 'border-red-500' : ''
                    }`}
                  />
                  {touchedFields.slogan && errors.slogan && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.slogan}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Selección de plantilla */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#292522]">Selecciona una plantilla</Label>
                  <RadioGroup
                    value={formData.plantilla}
                    onValueChange={(value) => setFormData({ ...formData, plantilla: value })}
                    className="grid grid-cols-4 gap-4"
                  >
                    {plantillas.map((plantilla) => (
                      <div key={plantilla.id} className="relative">
                        <RadioGroupItem value={plantilla.id} id={plantilla.id} className="peer sr-only" />
                        <Label
                          htmlFor={plantilla.id}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-[#E2DDD9] bg-white p-4 hover:border-[#551BB3] peer-data-[state=checked]:border-[#551BB3] cursor-pointer transition-colors"
                        >
                          <div className={`w-full h-24 bg-gradient-to-br ${plantilla.gradient} rounded-md mb-3`}></div>
                          <span className="font-medium text-[#292522]">{plantilla.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <Button
                    variant="outline"
                    className="gap-2 text-[#551BB3] border-[#551BB3] hover:bg-[#551BB3] hover:text-white bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                    Previsualizar plantilla
                  </Button>
                </div>

                {/* Configuración de dominio */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#292522]">Configuración de dominio</Label>
                  <RadioGroup
                    value={formData.tipodominio}
                    onValueChange={(value) => setFormData({ ...formData, tipodominio: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="subdominio" id="subdominio" className="text-[#551BB3]" />
                      <Label htmlFor="subdominio" className="flex-1">
                        <div className="font-medium text-[#292522]">Subdominio *.vendes.com (gratuito)</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="propio" id="propio" className="text-[#551BB3]" />
                      <Label htmlFor="propio" className="flex-1">
                        <div className="font-medium text-[#292522]">Dominio propio (requiere validación DNS)</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.tipodominio === "subdominio" && (
                    <div className="space-y-2">
                      <div className="flex items-center bg-[#E2DDD9] rounded-lg p-1 max-w-md">
                        <Input
                          value={formData.subdominio}
                          onChange={(e) => setFormData({ ...formData, subdominio: e.target.value })}
                          onBlur={() => handleFieldBlur('subdominio')}
                          className={`border-0 bg-transparent focus-visible:ring-0 h-10 text-[#292522] ${
                            touchedFields.subdominio && errors.subdominio ? 'border-red-500' : ''
                          }`}
                          placeholder="micomercio"
                        />
                        <span className="text-[#666666] pr-3">.vendes.com</span>
                      </div>
                      {touchedFields.subdominio && errors.subdominio && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.subdominio}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  {formData.tipodominio === "propio" && (
                    <div className="space-y-2">
                      <Input
                        placeholder="www.micomercio.com"
                        value={formData.dominioPropio}
                        onChange={(e) => setFormData({ ...formData, dominioPropio: e.target.value })}
                        onBlur={() => handleFieldBlur('dominioPropio')}
                        className={`h-12 bg-[#E2DDD9] border-[#E2DDD9] max-w-md text-[#292522] ${
                          touchedFields.dominioPropio && errors.dominioPropio ? 'border-red-500' : ''
                        }`}
                      />
                      {touchedFields.dominioPropio && errors.dominioPropio && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.dominioPropio}</AlertDescription>
                        </Alert>
                      )}
                      <p className="text-sm text-[#666666]">Se requiere configuración DNS adicional</p>
                    </div>
                  )}
                </div>

                {/* Colores y Tipografía */}
                <div className="space-y-6">
                  <Label className="text-base font-medium text-[#292522]">Colores y Tipografía</Label>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {/* Color primario y secundario existentes */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color primario (Morado Vendes)</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.colorPrimario }}
                        >
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <Input
                          value={formData.colorPrimario}
                          onChange={(e) => setFormData({ ...formData, colorPrimario: e.target.value })}
                          onBlur={() => handleFieldBlur('colorPrimario')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.colorPrimario && errors.colorPrimario ? 'border-red-500' : ''
                          }`}
                          placeholder="#551BB3"
                        />
                        <ColorPicker
                          value={formData.colorPrimario}
                          onChange={(val) => {
                            setFormData({ ...formData, colorPrimario: val })
                            handleFieldBlur('colorPrimario')
                          }}
                        />
                      </div>
                      {touchedFields.colorPrimario && errors.colorPrimario && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.colorPrimario}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color secundario (Verde Vendes)</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.colorSecundario }}
                        >
                          <Palette className="w-5 h-5 text-[#292522]" />
                        </div>
                        <Input
                          value={formData.colorSecundario}
                          onChange={(e) => setFormData({ ...formData, colorSecundario: e.target.value })}
                          onBlur={() => handleFieldBlur('colorSecundario')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.colorSecundario && errors.colorSecundario ? 'border-red-500' : ''
                          }`}
                          placeholder="#A9F04D"
                        />
                        <ColorPicker
                          value={formData.colorSecundario}
                          onChange={(val) => {
                            setFormData({ ...formData, colorSecundario: val })
                            handleFieldBlur('colorSecundario')
                          }}
                        />
                      </div>
                      {touchedFields.colorSecundario && errors.colorSecundario && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.colorSecundario}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  {/* Nuevos campos de color */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color de acento</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.accentColor }}
                        >
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <Input
                          value={formData.accentColor}
                          onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                          onBlur={() => handleFieldBlur('accentColor')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.accentColor && errors.accentColor ? 'border-red-500' : ''
                          }`}
                          placeholder="#FF5733"
                        />
                        <ColorPicker
                          value={formData.accentColor}
                          onChange={(val) => {
                            setFormData({ ...formData, accentColor: val })
                            handleFieldBlur('accentColor')
                          }}
                        />
                      </div>
                      {touchedFields.accentColor && errors.accentColor && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.accentColor}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color de fondo</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.backgroundColor }}
                        >
                          <Palette className="w-5 h-5 text-[#292522]" />
                        </div>
                        <Input
                          value={formData.backgroundColor}
                          onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                          onBlur={() => handleFieldBlur('backgroundColor')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.backgroundColor && errors.backgroundColor ? 'border-red-500' : ''
                          }`}
                          placeholder="#FFFFFF"
                        />
                        <ColorPicker
                          value={formData.backgroundColor}
                          onChange={(val) => {
                            setFormData({ ...formData, backgroundColor: val })
                            handleFieldBlur('backgroundColor')
                          }}
                        />
                      </div>
                      {touchedFields.backgroundColor && errors.backgroundColor && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.backgroundColor}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color de texto</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.textColor }}
                        >
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <Input
                          value={formData.textColor}
                          onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                          onBlur={() => handleFieldBlur('textColor')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.textColor && errors.textColor ? 'border-red-500' : ''
                          }`}
                          placeholder="#292522"
                        />
                        <ColorPicker
                          value={formData.textColor}
                          onChange={(val) => {
                            setFormData({ ...formData, textColor: val })
                            handleFieldBlur('textColor')
                          }}
                        />
                      </div>
                      {touchedFields.textColor && errors.textColor && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.textColor}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color de texto secundario</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.mutedTextColor }}
                        >
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <Input
                          value={formData.mutedTextColor}
                          onChange={(e) => setFormData({ ...formData, mutedTextColor: e.target.value })}
                          onBlur={() => handleFieldBlur('mutedTextColor')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.mutedTextColor && errors.mutedTextColor ? 'border-red-500' : ''
                          }`}
                          placeholder="#666666"
                        />
                        <ColorPicker
                          value={formData.mutedTextColor}
                          onChange={(val) => {
                            setFormData({ ...formData, mutedTextColor: val })
                            handleFieldBlur('mutedTextColor')
                          }}
                        />
                      </div>
                      {touchedFields.mutedTextColor && errors.mutedTextColor && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.mutedTextColor}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color de fondo de tarjetas</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.cardBackground }}
                        >
                          <Palette className="w-5 h-5 text-[#292522]" />
                        </div>
                        <Input
                          value={formData.cardBackground}
                          onChange={(e) => setFormData({ ...formData, cardBackground: e.target.value })}
                          onBlur={() => handleFieldBlur('cardBackground')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.cardBackground && errors.cardBackground ? 'border-red-500' : ''
                          }`}
                          placeholder="#FFFFFF"
                        />
                        <ColorPicker
                          value={formData.cardBackground}
                          onChange={(val) => {
                            setFormData({ ...formData, cardBackground: val })
                            handleFieldBlur('cardBackground')
                          }}
                        />
                      </div>
                      {touchedFields.cardBackground && errors.cardBackground && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.cardBackground}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium text-[#292522]">Color de bordes</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-[#E2DDD9] flex items-center justify-center"
                          style={{ backgroundColor: formData.borderColor }}
                        >
                          <Palette className="w-5 h-5 text-[#292522]" />
                        </div>
                        <Input
                          value={formData.borderColor}
                          onChange={(e) => setFormData({ ...formData, borderColor: e.target.value })}
                          onBlur={() => handleFieldBlur('borderColor')}
                          className={`font-mono bg-[#E2DDD9] border-[#E2DDD9] text-[#292522] ${
                            touchedFields.borderColor && errors.borderColor ? 'border-red-500' : ''
                          }`}
                          placeholder="#E2DDD9"
                        />
                        <ColorPicker
                          value={formData.borderColor}
                          onChange={(val) => {
                            setFormData({ ...formData, borderColor: val })
                            handleFieldBlur('borderColor')
                          }}
                        />
                      </div>
                      {touchedFields.borderColor && errors.borderColor && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.borderColor}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  {/* Selector de fuente */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-[#292522]">Fuente principal</Label>
                    <Select
                      value={formData.font}
                      onValueChange={(value) => setFormData({ ...formData, font: value })}
                    >
                      <SelectTrigger className="bg-[#E2DDD9] border-[#E2DDD9] text-[#292522]">
                        <SelectValue placeholder="Selecciona una fuente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Vista previa de colores */}
                <div className="bg-[#551BB3]/10 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#551BB3]">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">Vista previa de colores</span>
                  </div>
                  <p className="text-[#551BB3] text-sm">Así se verán los colores en tu tienda</p>

                  {/* Previsualización */}
                  <div 
                    className="rounded-lg p-6 space-y-4"
                    style={{ backgroundColor: formData.backgroundColor }}
                  >
                    {/* Encabezado */}
                    <div className="space-y-2">
                      <h3 
                        className="text-xl font-semibold"
                        style={{ 
                          color: formData.textColor,
                          fontFamily: formData.font 
                        }}
                      >
                        Ejemplo de página
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ color: formData.mutedTextColor }}
                      >
                        Texto secundario y descriptivo
                      </p>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3">
                      <Button 
                        style={{ backgroundColor: formData.colorPrimario }} 
                        className="text-white hover:opacity-90"
                      >
                        Botón Principal
                      </Button>
                      <Button
                        variant="outline"
                        style={{
                          borderColor: formData.colorSecundario,
                          color: formData.colorSecundario,
                        }}
                        className="hover:opacity-90 bg-transparent"
                      >
                        Botón Secundario
                      </Button>
                      <Button
                        variant="outline"
                        style={{
                          borderColor: formData.accentColor,
                          color: formData.accentColor,
                        }}
                        className="hover:opacity-90 bg-transparent"
                      >
                        Botón Acento
                      </Button>
                    </div>

                    {/* Tarjeta de ejemplo */}
                    <div 
                      className="rounded-lg p-4 space-y-3"
                      style={{ 
                        backgroundColor: formData.cardBackground,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: formData.borderColor
                      }}
                    >
                      <h4 
                        style={{ 
                          color: formData.textColor,
                          fontFamily: formData.font 
                        }}
                        className="font-medium"
                      >
                        Tarjeta de contenido
                      </h4>
                      <p 
                        style={{ color: formData.mutedTextColor }}
                        className="text-sm"
                      >
                        Este es un ejemplo de cómo se verán las tarjetas y el contenido en tu tienda. 
                        Los colores y la tipografía se aplicarán en toda la interfaz.
                      </p>
                      <div 
                        className="text-sm font-medium"
                        style={{ color: formData.accentColor }}
                      >
                        Enlace de ejemplo
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logo e Icono del comercio */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-[#292522]">Logo e Icono del comercio</Label>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Logo */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#666666]">Logo</Label>
                      <div className="border-2 border-dashed border-[#E2DDD9] rounded-lg p-4 text-center bg-[#E2DDD9]/30">
                        <Upload className="mx-auto h-8 w-8 text-[#666666] mb-2" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('logo', e.target.files?.[0] || null)}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="inline-block mb-1 bg-transparent border-[#666666] text-[#666666] text-xs px-3 py-1 border rounded cursor-pointer hover:bg-[#666666] hover:text-white transition-colors"
                        >
                          Subir logo
                        </label>
                        <p className="text-xs vendes-text-secondary mt-2">PNG, JPG o SVG<br/>Recomendado: 200x200px</p>
                        {formData.logo && (
                          <p className="text-xs text-green-600 mt-2">
                            ✓ {formData.logo.name} ({(formData.logo.size / 1024).toFixed(1)}KB)
                          </p>
                        )}
                      </div>
                      {touchedFields.logo && errors.logo && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.logo}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {/* Icono */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#666666]">Icono/Favicon</Label>
                      <div className="border-2 border-dashed border-[#E2DDD9] rounded-lg p-4 text-center bg-[#E2DDD9]/30">
                        <Upload className="mx-auto h-8 w-8 text-[#666666] mb-2" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('icono', e.target.files?.[0] || null)}
                          className="hidden"
                          id="icono-upload"
                        />
                        <label
                          htmlFor="icono-upload"
                          className="inline-block mb-1 bg-transparent border-[#666666] text-[#666666] text-xs px-3 py-1 border rounded cursor-pointer hover:bg-[#666666] hover:text-white transition-colors"
                        >
                          Subir icono
                        </label>
                        <p className="text-xs vendes-text-secondary mt-2">PNG o ICO<br/>Recomendado: 32x32px</p>
                        {formData.icono && (
                          <p className="text-xs text-green-600 mt-2">
                            ✓ {formData.icono.name} ({(formData.icono.size / 1024).toFixed(1)}KB)
                          </p>
                        )}
                      </div>
                      {touchedFields.icono && errors.icono && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.icono}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#666666]">
                    El logo se mostrará en el header de tu tienda y el icono aparecerá en la pestaña del navegador
                  </p>
                </div>

                {/* Botón de guardar */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    disabled={!isValid}
                    className={`px-8 py-3 font-medium rounded-lg ${
                      isValid 
                        ? 'bg-[#551BB3] hover:bg-[#551BB3]/90 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isValid ? 'Guardar identidad' : 'Completa los campos requeridos'}
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
