"use client"

import { useWizard } from "./wizard-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function WizardNavigation() {
  const { currentStep, nextStep, prevStep, canGoNext, canGoPrev } = useWizard()

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={!canGoPrev()}
        className="flex items-center gap-2 bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="text-sm text-muted-foreground">Paso {currentStep} de 4</div>

      <Button onClick={nextStep} disabled={!canGoNext()} className="flex items-center gap-2">
        {currentStep === 4 ? "Finalizar" : "Siguiente"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
