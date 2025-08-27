import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Mail, MessageCircle, Book } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Centro de ayuda</h1>
        <p className="text-muted-foreground mt-2">Próximamente - Estamos preparando recursos de ayuda para ti</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Documentación
            </CardTitle>
            <CardDescription>Guías y tutoriales detallados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Próximamente disponible</p>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat en vivo
            </CardTitle>
            <CardDescription>Soporte en tiempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Próximamente disponible</p>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Soporte por email
            </CardTitle>
            <CardDescription>Contacta con nuestro equipo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Próximamente disponible</p>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Preguntas frecuentes
            </CardTitle>
            <CardDescription>Respuestas a dudas comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Próximamente disponible</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
