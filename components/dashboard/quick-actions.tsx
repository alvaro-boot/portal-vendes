"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Store, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Crear nuevo sitio web",
    description: "Inicia el asistente para crear un sitio web",
    icon: Globe,
    href: "/dashboard/website-builder",
    variant: "default" as const,
  },
  {
    title: "Gestionar tienda",
    description: "Administra productos y pedidos",
    icon: Store,
    href: "/dashboard/store",
    variant: "outline" as const,
  },
  {
    title: "Ver estadísticas",
    description: "Analiza el rendimiento de tus sitios",
    icon: BarChart3,
    href: "/dashboard/analytics",
    variant: "outline" as const,
  },
  {
    title: "Configurar cuenta",
    description: "Actualiza tu perfil y preferencias",
    icon: Settings,
    href: "/dashboard/settings",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones rápidas</CardTitle>
        <CardDescription>Realiza las tareas más comunes desde aquí</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.title} href={action.href}>
              <Button
                variant={action.variant}
                className="w-full justify-start h-auto p-4 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-md group"
                size="lg"
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
