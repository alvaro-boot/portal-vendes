"use client"

import { VendesLogoHeader } from "@/components/ui/vendes-logo"
import { CONTACT_INFO, SOCIAL_LINKS, VENDES_COLORS } from "@/constants/dashboard"

export function PortalFooter() {
  return (
    <footer className="mt-12" style={{ backgroundColor: VENDES_COLORS.PRIMARY, color: "#fff" }}>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <VendesLogoHeader size="xl" />
            <p className="text-white/80">Toda tu tienda online personalizada</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-white">Soporte</h3>
            <p className="text-white/80">{CONTACT_INFO.EMAIL}</p>
            <p className="text-white/80">{CONTACT_INFO.SUPPORT_TEXT}</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Síguenos</h3>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.FACEBOOK} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: VENDES_COLORS.SECONDARY }} aria-label="Facebook" />
              <a href={SOCIAL_LINKS.INSTAGRAM} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: VENDES_COLORS.SECONDARY }} aria-label="Instagram" />
              <a href={SOCIAL_LINKS.LINKEDIN} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: VENDES_COLORS.SECONDARY }} aria-label="LinkedIn" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


