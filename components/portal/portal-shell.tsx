"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useMemo } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VendesLogoCompact } from "@/components/ui"
import { PortalLoading } from "@/components/ui/portal-loading"
import { DEFAULT_USER } from "@/constants/dashboard"
import { PORTAL_ITEMS } from "@/constants/portal"
import { Home, Sparkles, LogOut, Building2, Crown, Zap } from "lucide-react"
import { logout } from "@/app/login/actions"
import { useCurrentUser } from "@/hooks/use-current-user"

interface PortalShellProps {
  children: ReactNode
}

export function PortalShell({ children }: PortalShellProps) {
  const pathname = usePathname()
  const { opcionesNavegacion, loading, usuario } = useCurrentUser()

  // Memoizar las opciones filtradas para evitar recálculos
  const opcionesFiltradas = useMemo(() => {
    if (loading) return []
    
    return PORTAL_ITEMS.filter(item => {
      switch (item.id) {
        case "dashboard":
          return opcionesNavegacion.siteBuilder
        case "analiticas":
          return opcionesNavegacion.analytics
        case "tienda":
          return opcionesNavegacion.store
        case "ajustes":
          return opcionesNavegacion.settings
        case "usuarios":
          return opcionesNavegacion.usuarios
        case "ayuda":
          return true
        default:
          return true
      }
    })
  }, [opcionesNavegacion, loading])

  // Si está cargando, mostrar componente de loading optimizado
  if (loading) {
    return <PortalLoading />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        {/* Sidebar compacto */}
        <Sidebar className="border-r vendes-border fixed h-screen overflow-y-auto w-64 bg-white/90 backdrop-blur-xl shadow-2xl" collapsible="none">
          
          {/* Header compacto */}
          <SidebarHeader className="p-6 border-b vendes-border bg-white">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <VendesLogoCompact size="xl" />
                <div className="absolute -top-2 -right-2 w-4 h-4 vendes-bg-secondary rounded-full flex items-center justify-center">
                  <Crown className="w-2 h-2 vendes-text-dark" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold vendes-text-primary">
                  Portal Vendes
                </h1>
                <p className="text-sm vendes-text-neutral font-medium">Panel de Control Pro</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4">
            <SidebarMenu className="space-y-2">
              {/* Inicio */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/"} 
                  className="h-10 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-vendes-purple/10 hover:to-vendes-green/10 hover:scale-[1.02] hover:shadow-lg group"
                >
                  <Link href="/" className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        pathname === "/" 
                          ? "bg-[#551BB3] shadow-lg" 
                          : "vendes-bg-neutral group-hover:bg-[#551BB3]/10"
                      }`}>
                        <Home className={`w-4 h-4 transition-all duration-300 ${
                          pathname === "/" ? "text-white" : "vendes-text-neutral group-hover:text-vendes-purple"
                        }`} />
                      </div>
                      {pathname === "/" && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#551BB3] rounded-full animate-pulse shadow-lg" />
                      )}
                    </div>
                    <span className={`font-semibold text-sm transition-all duration-300 ${
                      pathname === "/" ? "vendes-text-primary" : "vendes-text-dark group-hover:text-vendes-purple"
                    }`}>
                      Inicio
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Opciones del portal */}
              {opcionesFiltradas.map((item) => {
                const isActive = item.href !== "#" && pathname === item.href
                return (
                  <SidebarMenuItem key={item.id}>
                    {item.disabled || item.href === "#" ? (
                      <SidebarMenuButton 
                        isActive={false} 
                        className="h-10 rounded-xl opacity-60 cursor-not-allowed hover:bg-vendes-neutral/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 vendes-bg-neutral rounded-lg flex items-center justify-center">
                            <item.icon className="w-4 h-4 vendes-text-neutral" />
                          </div>
                          <span className="font-semibold text-sm vendes-text-neutral">{item.title}</span>
                        {item.badge ? (
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full vendes-bg-neutral vendes-text-neutral font-medium">
                            {item.badge}
                          </span>
                        ) : null}
                        </div>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive} 
                        className="h-10 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-vendes-purple/10 hover:to-vendes-green/10 hover:scale-[1.02] hover:shadow-lg group"
                      >
                        <Link href={item.href} className="flex items-center gap-3">
                          <div className="relative">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                              isActive 
                                ? "bg-[#551BB3] shadow-lg" 
                                : "vendes-bg-neutral group-hover:bg-[#551BB3]/10"
                            }`}>
                              <item.icon className={`w-4 h-4 transition-all duration-300 ${
                                isActive ? "text-white" : "vendes-text-neutral group-hover:text-vendes-purple"
                              }`} />
                            </div>
                            {isActive && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#551BB3] rounded-full animate-pulse shadow-lg" />
                            )}
                          </div>
                          <span className={`font-semibold text-sm transition-all duration-300 ${
                            isActive ? "vendes-text-primary" : "vendes-text-dark group-hover:text-vendes-purple"
                          }`}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#551BB3] text-white font-medium">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>

          {/* Footer del sidebar */}
          <SidebarFooter className="p-4 border-t vendes-border bg-white">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="vendes-bg-primary text-white text-xs font-semibold">
                  {DEFAULT_USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold vendes-text-dark truncate">
                  {DEFAULT_USER.name}
                </p>
                <p className="text-xs vendes-text-neutral truncate">
                  {DEFAULT_USER.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="w-8 h-8 p-0 hover:bg-vendes-neutral/50 hover:text-vendes-purple transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Contenido principal */}
        <SidebarInset className="flex-1 ml-64">
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


