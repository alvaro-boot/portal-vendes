"use client"

import { WizardProvider, useWizard } from "@/components/website-builder/wizard-context"
import { ProgressBar } from "@/components/website-builder/progress-bar"
import { WizardNavigation } from "@/components/website-builder/wizard-navigation"
import { Step1Sections } from "@/components/website-builder/steps/step-1-sections"
import { Step2BasicInfo } from "@/components/website-builder/steps/step-2-basic-info"
import { Step3ContentConfig } from "@/components/website-builder/steps/step-3-content-config"
import { Step4Preview } from "@/components/website-builder/steps/step-4-preview"

function WizardContent() {
  const { currentStep } = useWizard()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Sections />
      case 2:
        return <Step2BasicInfo />
      case 3:
        return <Step3ContentConfig />
      case 4:
        return <Step4Preview />
      default:
        return <Step1Sections />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Construye tu sitio web</h1>
        <p className="text-muted-foreground">Crea tu sitio web paso a paso con nuestro asistente intuitivo</p>
      </div>

      <ProgressBar />

      <div className="bg-card rounded-lg border p-6">
        {renderStep()}
        <WizardNavigation />
      </div>
    </div>
  )
}

export default function WebsiteBuilderPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  )
}
