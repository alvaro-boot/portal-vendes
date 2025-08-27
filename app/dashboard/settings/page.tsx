import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, User, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ajustes</h1>
        <p className="text-muted-foreground mt-2">Configura tu cuenta y preferencias</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información personal
            </CardTitle>
            <CardDescription>Actualiza tu información de perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <Button>Guardar cambios</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seguridad
            </CardTitle>
            <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contraseña actual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button>Cambiar contraseña</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones por email</p>
                <p className="text-sm text-muted-foreground">Recibe actualizaciones por correo</p>
              </div>
              <Button variant="outline" size="sm">
                Activar
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones push</p>
                <p className="text-sm text-muted-foreground">Recibe notificaciones en el navegador</p>
              </div>
              <Button variant="outline" size="sm">
                Activar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Preferencias
            </CardTitle>
            <CardDescription>Personaliza tu experiencia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tema oscuro</p>
                <p className="text-sm text-muted-foreground">Cambiar apariencia de la interfaz</p>
              </div>
              <Button variant="outline" size="sm">
                Próximamente
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Idioma</p>
                <p className="text-sm text-muted-foreground">Español (ES)</p>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
