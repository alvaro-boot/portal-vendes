"use client"

import { useWizard } from "../wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, Type, ImageIcon, Eye } from "lucide-react"
import { COLOR_PRESETS } from "@/lib/constants/website-builder"

export function Step3ContentConfig() {
  const { 
    primaryColor, 
    secondaryColor, 
    logo, 
    headerText, 
    footerText,
    updateState 
  } = useWizard()

  const handleColorPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    updateState({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Configuración del contenido</h3>
        <p className="text-muted-foreground">Personaliza la apariencia y el contenido principal de tu sitio web.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Colores del sitio
            </CardTitle>
            <CardDescription>Define la paleta de colores de tu sitio web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Color primario</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => updateState({ primaryColor: e.target.value })}
                    className="w-12 h-10 p-1 rounded"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => updateState({ primaryColor: e.target.value })}
                    placeholder="#551BB3"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Color secundario</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => updateState({ secondaryColor: e.target.value })}
                    className="w-12 h-10 p-1 rounded"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => updateState({ secondaryColor: e.target.value })}
                    placeholder="#A9F04D"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Paletas predefinidas</Label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handleColorPreset(preset)}
                    className="h-8 p-1 flex items-center gap-1"
                    title={preset.description}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Vista previa de colores */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Vista previa de colores
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span className="text-sm">Color primario</span>
                  <Badge variant="secondary" className="text-xs">
                    {primaryColor}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <span className="text-sm">Color secundario</span>
                  <Badge variant="secondary" className="text-xs">
                    {secondaryColor}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Logo y marca
            </CardTitle>
            <CardDescription>Sube tu logo o define el texto de marca</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">URL del logo</Label>
              <Input
                id="logo"
                value={logo}
                onChange={(e) => updateState({ logo: e.target.value })}
                placeholder="https://ejemplo.com/mi-logo.png"
              />
              <p className="text-xs text-muted-foreground">Deja vacío para usar el nombre del sitio como texto</p>
            </div>

            {logo && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Vista previa del logo:</p>
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Logo preview"
                  className="max-h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Contenido principal
            </CardTitle>
            <CardDescription>Define los textos principales de tu sitio web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="headerText">Texto del encabezado *</Label>
                <Textarea
                  id="headerText"
                  value={headerText}
                  onChange={(e) => updateState({ headerText: e.target.value })}
                  placeholder="Bienvenido a nuestro sitio web increíble..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerText">Texto del pie de página</Label>
                <Textarea
                  id="footerText"
                  value={footerText}
                  onChange={(e) => updateState({ footerText: e.target.value })}
                  placeholder="© 2024 Mi Empresa. Todos los derechos reservados."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
