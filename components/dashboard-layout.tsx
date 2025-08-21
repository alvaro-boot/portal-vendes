"use client"

import type { ReactNode } from "react"
import type { DashboardSection } from "@/types/dashboard"
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/app/login/actions"
import { CheckCircle, Circle, User, Settings, LogOut, Eye, LayoutDashboard, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MENU_ITEMS, DEFAULT_USER } from "@/constants/dashboard"

interface DashboardLayoutProps {
  children: ReactNode
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
  completedSections: DashboardSection[]
}

// Eliminado arreglo local de menú para evitar duplicación; se usa MENU_ITEMS desde constants

export function DashboardLayout({
  children,
  activeSection,
  setActiveSection,
  completedSections,
}: DashboardLayoutProps) {
  const progressPercentage = (completedSections.length / MENU_ITEMS.length) * 100

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r" collapsible="none">
          <SidebarHeader className="p-6 border-b">
            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Progreso de configuración</span>
                <span className="font-bold text-orange-600">
                  {completedSections.length}/{MENU_ITEMS.length}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-orange-50" />
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive className="h-auto p-3">
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Panel general</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Configuración inicial y más opciones</p>
                    </div>
                  </div>
                </SidebarMenuButton>

                <SidebarMenuSub>
                  {MENU_ITEMS.map((item) => {
                    const isCompleted = completedSections.includes(item.id)
                    const isActive = activeSection === item.id

                    return (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton
                          asChild={false}
                          isActive={isActive}
                          onClick={(e) => {
                            e.preventDefault()
                            setActiveSection(item.id)
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 vendes-text-secondary" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          {/* Sin usuario en el footer; la info de usuario va en el header del portal, no repetimos aquí */}
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </Link>
            <div className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              <Eye className="h-4 w-4" />
              Vista previa
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="flex w-full items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
