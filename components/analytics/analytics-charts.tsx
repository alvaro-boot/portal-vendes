"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Eye } from "lucide-react"

// Mock data for charts - in a real app, this would come from an analytics API
const chartData = {
  visitors: [
    { day: "Lun", visitors: 120 },
    { day: "Mar", visitors: 150 },
    { day: "Mié", visitors: 180 },
    { day: "Jue", visitors: 200 },
    { day: "Vie", visitors: 240 },
    { day: "Sáb", visitors: 160 },
    { day: "Dom", visitors: 140 },
  ],
  topPages: [
    { page: "/", views: 1234, percentage: 45 },
    { page: "/productos", views: 567, percentage: 20 },
    { page: "/sobre-nosotros", views: 345, percentage: 12 },
    { page: "/contacto", views: 234, percentage: 8 },
    { page: "/blog", views: 123, percentage: 4 },
  ],
}

export function AnalyticsCharts() {
  const maxVisitors = Math.max(...chartData.visitors.map((d) => d.visitors))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Visitantes por día
          </CardTitle>
          <CardDescription>Últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.visitors.map((data) => (
              <div key={data.day} className="flex items-center space-x-4">
                <div className="w-8 text-sm text-muted-foreground">{data.day}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.visitors / maxVisitors) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium w-12 text-right">{data.visitors}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Páginas más visitadas
          </CardTitle>
          <CardDescription>Distribución de tráfico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.topPages.map((page) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{page.page}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div
                        className="bg-secondary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${page.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground w-8">{page.percentage}%</div>
                  </div>
                </div>
                <div className="text-sm font-medium ml-4">{page.views}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
