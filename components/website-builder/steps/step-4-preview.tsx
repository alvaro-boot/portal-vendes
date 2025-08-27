"use client"

import { useWizard } from "../wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Globe, Share, CheckCircle, ExternalLink, Loader2, AlertCircle } from "lucide-react"

export function Step4Preview() {
  const { 
    siteName,
    siteDescription,
    clientId,
    selectedSections,
    availableSections,
    primaryColor,
    secondaryColor,
    logo,
    headerText,
    footerText,
    style,
    isPublished,
    previewHtml,
    finalUrl,
    loading,
    error,
    generatePreview,
    saveConfiguration,
    clearError
  } = useWizard()

  const handleGeneratePreview = async () => {
    await generatePreview()
  }

  const handlePublish = async () => {
    await saveConfiguration()
  }

  const siteUrl = finalUrl || `https://render-0akm.onrender.com/api/v1/client-templates/${clientId || "mi-cliente-001"}`

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Vista previa y publicación</h3>
        <p className="text-muted-foreground">Revisa tu sitio web y publícalo cuando esté listo.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button variant="link" size="sm" onClick={clearError} className="p-0 h-auto">
              Cerrar
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Resumen del sitio
            </CardTitle>
            <CardDescription>Información general de tu sitio web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Nombre del sitio</h4>
              <p className="font-semibold">{siteName || "Sin nombre"}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Descripción</h4>
              <p className="text-sm">{siteDescription || "Sin descripción"}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground">ID del Cliente</h4>
              <p className="text-sm font-mono text-primary">{clientId || "Sin ID"}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Estilo</h4>
              <Badge variant="outline" className="text-xs capitalize">
                {style || "Sin estilo"}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Secciones incluidas</h4>
              <div className="flex flex-wrap gap-1">
                {selectedSections.map((sectionId) => {
                  const section = availableSections.find(s => s.id === sectionId)
                  return (
                    <Badge key={sectionId} variant="secondary" className="text-xs">
                      {section?.name || sectionId}
                  </Badge>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Estado de publicación
            </CardTitle>
            <CardDescription>Controla la visibilidad de tu sitio web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isPublished ? "bg-secondary" : "bg-muted-foreground"}`} />
              <span className="font-medium">{isPublished ? "Publicado" : "Borrador"}</span>
            </div>

            {isPublished ? (
              <div className="space-y-4">
                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span className="font-medium text-secondary">¡Sitio publicado exitosamente!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tu sitio web está ahora disponible en línea.</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-transparent"
                    onClick={() => window.open(siteUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver sitio
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-transparent"
                    onClick={() => navigator.clipboard.writeText(siteUrl)}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Copiar URL
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Tu sitio web está en modo borrador. Publícalo para que sea visible en línea.
                </p>

                <div className="space-y-2">
                  <Button 
                    onClick={handleGeneratePreview} 
                    disabled={loading || !clientId} 
                    variant="outline"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generando preview...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Generar Vista Previa
                      </>
                    )}
                  </Button>

                  <Button 
                    onClick={handlePublish} 
                    disabled={loading || !clientId} 
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 mr-2" />
                      Publicar sitio web
                    </>
                  )}
                </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Vista previa del diseño</CardTitle>
            <CardDescription>Así se verá tu sitio web</CardDescription>
          </CardHeader>
          <CardContent>
            {previewHtml ? (
              <div className="border rounded-lg overflow-hidden">
                <iframe
                  srcDoc={previewHtml}
                  title="Vista previa del sitio web"
                  className="w-full h-96"
                  frameBorder="0"
                />
              </div>
            ) : (
            <div
              className="border rounded-lg p-6 bg-white"
              style={{
                  borderColor: primaryColor + "20",
                  background: `linear-gradient(135deg, ${primaryColor}05 0%, ${secondaryColor}05 100%)`,
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                      {logo ? (
                        <img src={logo} alt="Logo" className="h-8 object-contain" />
                    ) : (
                      <div
                        className="px-3 py-1 rounded font-bold text-white"
                          style={{ backgroundColor: primaryColor }}
                      >
                          {siteName || "Mi Sitio"}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm">
                      {selectedSections.slice(0, 4).map((sectionId) => {
                        const section = availableSections.find(s => s.id === sectionId)
                        return (
                          <span key={sectionId} className="capitalize">
                            {section?.name || sectionId}
                      </span>
                        )
                      })}
                    </div>
                </div>

                <div className="text-center py-8">
                    <h1 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                      {headerText || "Bienvenido a nuestro sitio web"}
                  </h1>
                    <p className="text-muted-foreground mb-6">{siteDescription}</p>
                  <button
                    className="px-6 py-2 rounded text-white font-medium"
                      style={{ backgroundColor: secondaryColor, color: "#000" }}
                  >
                    Comenzar
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4">
                    {selectedSections.slice(0, 3).map((sectionId) => {
                      const section = availableSections.find(s => s.id === sectionId)
                      return (
                        <div key={sectionId} className="p-4 bg-white/50 rounded text-center">
                          <div
                            className="w-8 h-8 mx-auto mb-2 rounded flex items-center justify-center text-lg"
                            style={{ backgroundColor: primaryColor + "20" }}
                          >
                            {section?.icon}
                          </div>
                          <p className="text-sm font-medium">{section?.name || sectionId}</p>
                    </div>
                      )
                    })}
                </div>

                <div className="text-center pt-4 border-t text-xs text-muted-foreground">
                    {footerText || "© 2024 Mi Sitio. Todos los derechos reservados."}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
