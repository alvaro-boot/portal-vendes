"use client"

import React, { Suspense } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const MiTienda = React.lazy(() =>
  import("@/components/sections/mi-tienda").then((module) => ({
    default: module.MiTienda,
  })),
)

export default function StorePage() {
  const { usuario, loading, esAdmin, esCliente, tienePagina, paginaWebId } = useCurrentUser()

  if (loading) {
    return (
      <PortalShell>
        <div className="min-h-[50vh] flex items-center justify-center">
          <LoadingSpinner size="lg" text="Cargando información..." />
        </div>
      </PortalShell>
    )
  }

  // Si es cliente y no tiene página web, mostrar mensaje de restricción
  if (esCliente && !tienePagina) {
    return (
      <PortalShell>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#551BB3] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white text-2xl">🏪</span>
            </div>
            <h1 className="text-3xl font-bold vendes-text-primary">Mi Tienda</h1>
            <p className="text-lg vendes-text-neutral">
              Gestiona tu tienda en línea y configura tu comercio digital
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="text-center">
              <CardTitle className="vendes-text-primary text-xl">No tienes una tienda creada</CardTitle>
              <CardDescription className="vendes-text-neutral">
                Como usuario cliente, necesitas crear tu primera página web para acceder a esta sección
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertDescription className="vendes-text-dark">
                  <strong>Restricción de Usuario Cliente:</strong> Solo puedes crear una página web. 
                  Una vez creada, podrás gestionarla desde esta sección.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline" className="vendes-border-secondary vendes-text-secondary">
                  👤 Usuario Cliente
                </Badge>
                <Badge variant="outline" className="vendes-border-secondary vendes-text-secondary">
                  📄 0 páginas creadas
                </Badge>
              </div>

                             <Button 
                 className="vendes-button-primary"
                 onClick={() => window.location.href = "/dashboard"}
               >
                 Crear Mi Primera Página Web
               </Button>
            </CardContent>
          </Card>
        </div>
      </PortalShell>
    )
  }

  // Si es cliente y tiene página web, mostrar información de su tienda
  if (esCliente && tienePagina) {
    return (
      <PortalShell>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#551BB3] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white text-2xl">🏪</span>
            </div>
            <h1 className="text-3xl font-bold vendes-text-primary">Mi Tienda</h1>
            <p className="text-lg vendes-text-neutral">
              Gestiona tu tienda en línea y configura tu comercio digital
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="vendes-text-primary text-xl">Tu Tienda</CardTitle>
              <CardDescription className="vendes-text-neutral">
                Información de tu página web creada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#551BB3] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌐</span>
                  </div>
                  <div>
                    <p className="font-medium vendes-text-dark">Página Web</p>
                    <p className="text-sm vendes-text-neutral">ID: {paginaWebId}</p>
                  </div>
                </div>
                <Badge variant="outline" className="vendes-border-secondary vendes-text-secondary">
                  Activa
                </Badge>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="vendes-text-dark">
                  <strong>¡Excelente!</strong> Ya tienes tu página web creada. 
                  Como usuario cliente, solo puedes tener una página web. 
                  Puedes editarla desde el Constructor de Sitios.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                                 <Button 
                   variant="outline"
                   className="vendes-button-secondary"
                   onClick={() => window.location.href = "/dashboard"}
                 >
                   Editar Página Web
                 </Button>
                <Button 
                  className="vendes-button-primary"
                >
                  Ver Mi Tienda
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PortalShell>
    )
  }

  // Para administradores, mostrar el componente completo
  return (
    <PortalShell>
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <LoadingSpinner size="lg" text="Cargando tienda..." />
          </div>
        }
      >
        <MiTienda
          activeSection="tienda"
          setActiveSection={() => {}}
          completedSections={[]}
          onComplete={() => {}}
        />
      </Suspense>
    </PortalShell>
  )
}


