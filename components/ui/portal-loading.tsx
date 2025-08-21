import { VendesLogoCompact } from "@/components/ui"
import { Crown } from "lucide-react"

export function PortalLoading() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="border-r vendes-border fixed h-screen overflow-y-auto w-64 bg-white/90 backdrop-blur-xl shadow-2xl">
        <div className="p-6 border-b vendes-border bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <VendesLogoCompact size="xl" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#551BB3] rounded-full flex items-center justify-center">
                <Crown className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold vendes-text-primary">
                Portal Vendes
              </h1>
              <p className="text-sm vendes-text-neutral font-medium">Panel de Control Pro</p>
            </div>
          </div>
        </div>
        <div className="px-3 py-4">
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-64 flex-1">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 vendes-border-primary mx-auto mb-4"></div>
            <p className="vendes-text-neutral">Cargando opciones del portal...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
