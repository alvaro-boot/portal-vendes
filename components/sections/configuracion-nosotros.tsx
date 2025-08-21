"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Bold, Italic, List, Eye, Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react"
import { NavigationSteps } from "@/components/navigation-steps"
import type { DashboardSection } from "@/types/dashboard"

interface ConfiguracionNosotrosProps {
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
  completedSections: DashboardSection[]
  onComplete: (section: DashboardSection) => void
}

export function ConfiguracionNosotros({
  activeSection,
  setActiveSection,
  completedSections,
  onComplete,
}: ConfiguracionNosotrosProps) {
  const [formData, setFormData] = useState({
    quienesSomos: "",
    mision: "",
    contact: {
      email: "",
      phone: "",
      address: "",
      social: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      },
      hours: ""
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete("nosotros" as DashboardSection)
  }

  const updateContactField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }))
  }

  const updateSocialField = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        social: {
          ...prev.contact.social,
          [platform]: value
        }
      }
    }))
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
                <h2 className="text-2xl font-bold text-[#292522] mb-2">Configuración "Nosotros"</h2>
                <p className="text-[#666666]">
                  Define la identidad corporativa de tu comercio para generar confianza con tus clientes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Quiénes somos */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-[#292522]">Quiénes somos</Label>
                    <p className="text-sm text-[#666666] mt-1">
                      Cuenta la historia de tu comercio, cuándo empezaste, qué te motiva y qué te hace único.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#292522]">Descripción de la empresa</Label>
                    <Textarea
                      placeholder="Escribe aquí la historia de tu empresa, sus valores y lo que la hace especial..."
                      value={formData.quienesSomos}
                      onChange={(e) => setFormData({ ...formData, quienesSomos: e.target.value })}
                      rows={8}
                      className="resize-none bg-[#E2DDD9] border-[#E2DDD9] text-[#292522]"
                    />
                    <p className="text-sm text-[#666666]">
                      Este texto aparecerá en la sección "Acerca de nosotros" de tu tienda online.
                    </p>
                  </div>
                </div>

                {/* Misión */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-[#292522]">Misión</Label>
                    <p className="text-sm text-[#666666] mt-1">
                      Define la misión de tu empresa con formato enriquecido para destacar los puntos importantes.
                    </p>
                  </div>

                  {/* Rich Text Editor Toolbar */}
                  <div className="border rounded-lg bg-white">
                    <div className="flex items-center gap-2 p-3 border-b bg-gray-50">
                      <Button variant="ghost" size="sm" type="button" className="h-8 w-8 p-0">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" type="button" className="h-8 w-8 p-0">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" type="button" className="h-8 w-8 p-0">
                        <List className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-gray-500 ml-2">Selecciona texto para aplicar formato</span>
                    </div>

                    <div className="p-4">
                      <Label className="text-sm font-medium text-[#292522] mb-2 block">Declaración de misión</Label>
                      <Textarea
                        placeholder="Nuestra misión es... **texto en negrita** *texto en cursiva*

• Primer punto importante
• Segundo punto importante"
                        value={formData.mision}
                        onChange={(e) => setFormData({ ...formData, mision: e.target.value })}
                        rows={6}
                        className="border-0 resize-none focus-visible:ring-0 p-0 bg-transparent text-[#292522]"
                      />
                      <p className="text-sm text-[#666666] mt-3">
                        Usa **negrita**, *cursiva* y • para listas. La misión aparecerá destacada en tu tienda.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium text-[#292522]">Información de Contacto</Label>
                    <p className="text-sm text-[#666666] mt-1">
                      Proporciona información de contacto para que tus clientes puedan comunicarse contigo fácilmente.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#292522] flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Correo electrónico
                      </Label>
                      <Input
                        type="email"
                        placeholder="info@tuempresa.com"
                        value={formData.contact.email}
                        onChange={(e) => updateContactField('email', e.target.value)}
                        className="bg-[#E2DDD9] border-[#E2DDD9]"
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#292522] flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Teléfono
                      </Label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.contact.phone}
                        onChange={(e) => updateContactField('phone', e.target.value)}
                        className="bg-[#E2DDD9] border-[#E2DDD9]"
                      />
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-[#292522] flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Dirección
                      </Label>
                      <Input
                        placeholder="123 Calle Principal, Ciudad, Estado, CP"
                        value={formData.contact.address}
                        onChange={(e) => updateContactField('address', e.target.value)}
                        className="bg-[#E2DDD9] border-[#E2DDD9]"
                      />
                    </div>

                    {/* Horarios */}
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-[#292522] flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Horarios de atención
                      </Label>
                      <Input
                        placeholder="Lunes - Viernes: 9:00 AM - 6:00 PM"
                        value={formData.contact.hours}
                        onChange={(e) => updateContactField('hours', e.target.value)}
                        className="bg-[#E2DDD9] border-[#E2DDD9]"
                      />
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-[#292522]">Redes Sociales</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-[#666666] flex items-center gap-2">
                          <Facebook className="w-3 h-3" />
                          Facebook
                        </Label>
                        <Input
                          placeholder="https://facebook.com/tuempresa"
                          value={formData.contact.social.facebook}
                          onChange={(e) => updateSocialField('facebook', e.target.value)}
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-[#666666] flex items-center gap-2">
                          <Instagram className="w-3 h-3" />
                          Instagram
                        </Label>
                        <Input
                          placeholder="https://instagram.com/tuempresa"
                          value={formData.contact.social.instagram}
                          onChange={(e) => updateSocialField('instagram', e.target.value)}
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-[#666666] flex items-center gap-2">
                          <Linkedin className="w-3 h-3" />
                          LinkedIn
                        </Label>
                        <Input
                          placeholder="https://linkedin.com/company/tuempresa"
                          value={formData.contact.social.linkedin}
                          onChange={(e) => updateSocialField('linkedin', e.target.value)}
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-[#666666] flex items-center gap-2">
                          <Twitter className="w-3 h-3" />
                          Twitter
                        </Label>
                        <Input
                          placeholder="https://twitter.com/tuempresa"
                          value={formData.contact.social.twitter}
                          onChange={(e) => updateSocialField('twitter', e.target.value)}
                          className="bg-[#E2DDD9] border-[#E2DDD9] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consejos para una mejor presentación */}
                <div className="bg-[#551BB3]/10 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-5 h-5 vendes-text-primary" />
                    <h3 className="font-medium text-[#551BB3]">Consejos para una mejor presentación</h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium text-[#292522] mb-2">Para "Quiénes somos":</h4>
                      <ul className="space-y-1 text-[#666666]">
                        <li>• Cuenta tu historia de manera personal y auténtica</li>
                        <li>• Menciona cuándo empezaste y qué te inspiró</li>
                        <li>• Incluye los valores que guían tu negocio</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#292522] mb-2">Para la "Misión":</h4>
                      <ul className="space-y-1 text-[#666666]">
                        <li>• Sé conciso pero inspiracional</li>
                        <li>• Enfócate en el valor que aportas a tus clientes</li>
                        <li>• Usa formato para destacar puntos clave</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#292522] mb-2">Para la información de contacto:</h4>
                      <ul className="space-y-1 text-[#666666]">
                        <li>• Proporciona múltiples formas de contacto</li>
                        <li>• Mantén actualizada la información</li>
                        <li>• Incluye horarios claros de atención</li>
                        <li>• Las redes sociales son opcionales pero recomendadas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Botón de guardar */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white font-medium rounded-lg"
                  >
                    Guardar información corporativa
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
