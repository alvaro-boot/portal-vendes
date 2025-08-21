"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PortalShell } from "@/components/portal/portal-shell"

export default function SettingsPage() {
  return (
    <PortalShell>
      <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[#292522]">Ajustes</h1>
        <p className="text-[#666666] text-sm">Preferencias de tu cuenta</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferencias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#292522]">Notificaciones por correo</div>
              <div className="text-sm text-[#666666]">Recibe alertas y novedades</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#292522]">Modo compacto</div>
              <div className="text-sm text-[#666666]">Reduce espacios y paddings</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Nombre" />
          <Input placeholder="Email" type="email" />
          <Button className="bg-[#551BB3] hover:bg-[#551BB3]/90 text-white">Guardar cambios</Button>
        </CardContent>
      </Card>
    </div>
    </PortalShell>
  )
}


