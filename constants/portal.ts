import type React from "react"
import { LayoutDashboard, Store, BarChart3, LifeBuoy, SlidersHorizontal, Globe, Users } from "lucide-react"

export interface PortalItem {
  id: string
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  disabled?: boolean
  badge?: string
}

export const PORTAL_ITEMS: readonly PortalItem[] = [
  {
    id: "dashboard",
    title: "Constructor de Sitios",
    description: "Crea tu sitio web personalizado paso a paso",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    id: "tienda",
    title: "Mi tienda",
    description: "Gestiona tu escaparate online",
    href: "/store",
    icon: Store,
    disabled: false,
    badge: undefined,
  },
  {
    id: "analiticas",
    title: "Analítica",
    description: "Métricas y desempeño",
    href: "/analytics",
    icon: BarChart3,
    disabled: false,
  },
  {
    id: "ajustes",
    title: "Ajustes",
    description: "Preferencias de la cuenta",
    href: "/settings",
    icon: SlidersHorizontal,
    disabled: false,
    badge: undefined,
  },
  {
    id: "usuarios",
    title: "Usuarios",
    description: "Administración de usuarios registrados",
    href: "/admin/usuarios",
    icon: Users,
    disabled: false,
    badge: "Admin",
  },
  {
    id: "ayuda",
    title: "Centro de ayuda",
    description: "Documentación y soporte",
    href: "#",
    icon: LifeBuoy,
    disabled: true,
    badge: "Próximamente",
  },
] as const


