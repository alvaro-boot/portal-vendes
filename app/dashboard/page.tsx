"use client"

import React, { Suspense } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { useDashboardState } from "@/hooks/use-dashboard-state"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { DashboardSection } from "@/types/dashboard"

const ConstructorSitios = React.lazy(() =>
  import("@/components/sections/constructor-sitios").then((module) => ({
    default: module.ConstructorSitios,
  })),
)

export default function DashboardPage() {
  const { 
    activeSection, 
    completedSections, 
    setActiveSection, 
    markSectionComplete,
    updateIdentidad,
    updatePersonalizacion,
    updateProductos,
    updateNosotros,
    updateTestimonios
  } = useDashboardState()

  const handleSectionComplete = React.useCallback(
    (section: DashboardSection) => {
      markSectionComplete(section)
    },
    [markSectionComplete],
  )

  const renderActiveSection = React.useMemo(() => {
    const commonProps = {
      activeSection,
      setActiveSection,
      completedSections,
      onComplete: handleSectionComplete,
      updateIdentidad,
      updatePersonalizacion,
      updateProductos,
      updateNosotros,
      updateTestimonios,
    }

    const sectionComponents = {
      constructor: <ConstructorSitios {...commonProps} />,
    } as const

    return sectionComponents[activeSection] || sectionComponents.constructor
  }, [activeSection, setActiveSection, completedSections, handleSectionComplete, updateIdentidad, updatePersonalizacion, updateProductos, updateNosotros, updateTestimonios])

  return (
    <PortalShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <LoadingSpinner size="xl" className="text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl animate-pulse" />
              </div>
            </div>
          }
        >
          <div className="animate-fade-in">
            {renderActiveSection}
          </div>
        </Suspense>
      </div>
    </PortalShell>
  )
}


