"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Globe, Store, BarChart3, Settings, HelpCircle, LogOut, User } from "lucide-react"

const menuItems = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Construye tu sitio web",
    href: "/dashboard/website-builder",
    icon: Globe,
  },
  {
    title: "Mi tienda",
    href: "/dashboard/store",
    icon: Store,
  },
  {
    title: "Analítica",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Ajustes",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Centro de ayuda",
    href: "/dashboard/help",
    icon: HelpCircle,
    disabled: true,
    badge: "Próximamente",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-6">
        <h1 className="text-xl font-bold text-sidebar-primary">Portal Vendes</h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
          <User className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
          <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <div key={item.href} className="relative">
              <Link
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1",
                  item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:translate-x-0",
                )}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
              >
                <Icon className="h-4 w-4 transition-transform duration-200" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="rounded-full bg-sidebar-accent px-2 py-0.5 text-xs text-sidebar-accent-foreground animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 bg-transparent hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}
