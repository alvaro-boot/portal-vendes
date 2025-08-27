"use client"

import { useWizard } from "./wizard-context"
import { cn } from "@/lib/utils"

const steps = [
  { number: 1, title: "Selecciona las secciones" },
  { number: 2, title: "Información básica" },
  { number: 3, title: "Configuración del contenido" },
  { number: 4, title: "Vista previa y publicación" },
]

export function ProgressBar() {
  const { currentStep } = useWizard()
  const progress = (currentStep / steps.length) * 100

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Paso {currentStep} de {steps.length}
        </h2>
        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-colors",
                step.number <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {step.number}
            </div>
            <span
              className={cn(
                "text-xs text-center max-w-24",
                step.number <= currentStep ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
