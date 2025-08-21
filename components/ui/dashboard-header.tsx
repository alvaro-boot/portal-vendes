"use client"

import Image from "next/image"
import VendesLogo from "@/utils/images/vendes-logo.jpg"
// Botón de cerrar sesión removido: se gestiona a nivel de PortalShell

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({
  title = "¡Bienvenido a Vendes!",
  description = "Configura tu comercio en pocos pasos y comienza a vender en línea",
}: DashboardHeaderProps) {
  return (
    <div className="bg-[#551BB3] text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-4">
              <Image
                src={VendesLogo}
                alt="Vendes Logo"
                width={90}
                height={90}
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
              <h4 className="text-3xl font-bold">{title}</h4>
            </div>
            <div>
              <p className="text-white/90">{description}</p>
            </div>
          </div>

          {/* Cerrar sesión se muestra en el PortalShell (layout del portal) */}
        </div>
      </div>
    </div>
  )
}
