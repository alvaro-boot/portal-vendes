"use client"

import { useWizard } from "../wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { WEBSITE_STYLES } from "@/lib/constants/website-builder"

export function Step2BasicInfo() {
  const { 
    clientId, 
    siteName, 
    siteDescription, 
    style,
    updateState 
  } = useWizard()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Información básica de tu sitio web</h3>
        <p className="text-muted-foreground">Proporciona la información fundamental que identificará tu sitio web.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalles del sitio</CardTitle>
            <CardDescription>Información principal de tu sitio web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">ID del Cliente *</Label>
              <Input
                id="clientId"
                value={clientId}
                onChange={(e) => updateState({ clientId: e.target.value })}
                placeholder="mi-cliente-001"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Identificador único para tu sitio. Solo letras minúsculas, números y guiones.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteName">Nombre del sitio web *</Label>
              <Input
                id="siteName"
                value={siteName}
                onChange={(e) => updateState({ siteName: e.target.value })}
                placeholder="Mi Empresa Increíble"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Descripción *</Label>
              <Textarea
                id="siteDescription"
                value={siteDescription}
                onChange={(e) => updateState({ siteDescription: e.target.value })}
                placeholder="Describe brevemente de qué trata tu sitio web..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estilo visual</CardTitle>
            <CardDescription>Elige el estilo que mejor represente tu marca</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Estilo de diseño *</Label>
              <div className="grid gap-3">
                {WEBSITE_STYLES.map((styleOption) => (
                  <div
                    key={styleOption.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      style === styleOption.value
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => updateState({ style: styleOption.value as any })}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{styleOption.icon}</span>
                          <h4 className="font-medium text-sm">{styleOption.label}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {styleOption.description}
                        </p>
                      </div>
                      {style === styleOption.value && (
                        <Badge variant="secondary" className="text-xs">
                          Seleccionado
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-secondary/10 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Vista previa de URL</h4>
              <p className="text-sm text-primary font-mono">
                https://render-0akm.onrender.com/api/v1/client-templates/{clientId || "mi-cliente-001"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Nota:</strong> Los campos marcados con * son obligatorios para continuar al siguiente paso.
        </p>
      </div>
    </div>
  )
}
