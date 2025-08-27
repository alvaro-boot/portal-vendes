import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Eye, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analítica</h1>
        <p className="text-muted-foreground mt-2">Métricas y estadísticas de tu sitio web</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-secondary mr-1" />
              <span className="text-secondary">+20.1%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Páginas vistas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-secondary mr-1" />
              <span className="text-secondary">+12%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:34</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-secondary mr-1" />
              <span className="text-secondary">+5%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de rebote</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-secondary mr-1" />
              <span className="text-secondary">-3%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCharts />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fuentes de tráfico</CardTitle>
            <CardDescription>De dónde vienen tus visitantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Búsqueda orgánica</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Directo</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Redes sociales</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Referencias</span>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
            <CardDescription>Cómo acceden tus usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Móvil</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Escritorio</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tablet</span>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
