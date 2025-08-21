/**
 * Componente de navegación por pasos del dashboard
 *
 * Proporciona una barra de navegación horizontal que muestra
 * el progreso del usuario a través de las diferentes secciones
 * del proceso de configuración.
 *
 * Características:
 * - Indicadores visuales de progreso
 * - Navegación directa entre secciones
 * - Estados visuales (activo, completado, pendiente)
 * - Accesibilidad mejorada
 */

"use client"
import { Check } from "lucide-react"
import { NAVIGATION_ITEMS } from "@/constants/dashboard"
import type { DashboardSection } from "@/types/dashboard"

interface NavigationStepsProps {
  /** Sección actualmente activa */
  activeSection: DashboardSection
  /** Función para cambiar la sección activa */
  setActiveSection: (section: DashboardSection) => void
  /** Lista de secciones completadas */
  completedSections: DashboardSection[]
}

/**
 * Componente NavigationSteps
 *
 * Renderiza una barra de navegación horizontal con indicadores
 * de progreso para cada sección del dashboard.
 */
export function NavigationSteps({ activeSection, setActiveSection, completedSections }: NavigationStepsProps) {
  return (
    <nav className="bg-white border-b" role="navigation" aria-label="Progreso de configuración del dashboard">
      <div className="container mx-auto px-6">
        <div className="flex space-x-8">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            const isCompleted = completedSections.includes(item.id)
            const Icon = item.icon

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  flex items-center gap-2 px-4 py-4 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  ${
                    isActive
                      ? "border-b-2 border-[#551BB3] text-[#551BB3] font-medium"
                      : isCompleted
                        ? "text-[#666666] hover:text-[#292522]"
                        : "text-[#666666] hover:text-[#292522]"
                  }
                `}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${item.title}${isCompleted ? " - Completado" : ""}${isActive ? " - Activo" : ""}`}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  {isCompleted ? (
                    <div
                      className="w-5 h-5 bg-[#666666] rounded-full flex items-center justify-center"
                      aria-label="Sección completada"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : isActive ? (
                    <Icon className="w-5 h-5" aria-label="Sección activa" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-[#E2DDD9] rounded-full" aria-label="Sección pendiente" />
                  )}
                </div>
                <span className="font-medium">{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

/**
 * Hook para obtener información del paso actual
 */
export function useNavigationInfo(activeSection: DashboardSection, completedSections: DashboardSection[]) {
  const currentStepIndex = NAVIGATION_ITEMS.findIndex((item) => item.id === activeSection)
  const totalSteps = NAVIGATION_ITEMS.length
  const completedSteps = completedSections.length
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  return {
    currentStepIndex: currentStepIndex + 1, // 1-indexed para mostrar al usuario
    totalSteps,
    completedSteps,
    progressPercentage,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === totalSteps - 1,
  }
}
