"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Store, BarChart3, Settings, User, CheckCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "website",
    title: "Sitio web 'Mi Empresa' actualizado",
    description: "Se actualizó la sección de servicios",
    time: "Hace 2 horas",
    icon: Globe,
    status: "completed",
  },
  {
    id: 2,
    type: "store",
    title: "Nueva venta registrada",
    description: "Producto: Camiseta Premium - $29.99",
    time: "Hace 4 horas",
    icon: Store,
    status: "completed",
  },
  {
    id: 3,
    type: "analytics",
    title: "Reporte semanal generado",
    description: "1,234 visitantes únicos esta semana",
    time: "Hace 6 horas",
    icon: BarChart3,
    status: "completed",
  },
  {
    id: 4,
    type: "settings",
    title: "Configuración de perfil guardada",
    description: "Se actualizó la información de contacto",
    time: "Ayer",
    icon: Settings,
    status: "completed",
  },
  {
    id: 5,
    type: "user",
    title: "Nuevo usuario registrado",
    description: "juan.perez@email.com se unió a tu sitio",
    time: "Hace 2 días",
    icon: User,
    status: "new",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
        <CardDescription>Últimas acciones realizadas en tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    {activity.status === "new" && (
                      <Badge variant="secondary" className="text-xs">
                        Nuevo
                      </Badge>
                    )}
                    {activity.status === "completed" && <CheckCircle className="h-3 w-3 text-secondary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
