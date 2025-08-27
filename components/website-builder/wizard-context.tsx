"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useWebsiteBuilder, type WebsiteBuilderState } from "@/hooks/use-website-builder"

interface WizardContextType extends ReturnType<typeof useWebsiteBuilder> {}

const WizardContext = createContext<WizardContextType | undefined>(undefined)

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const websiteBuilder = useWebsiteBuilder()

  return (
    <WizardContext.Provider value={websiteBuilder}>
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider")
  }
  return context
}
