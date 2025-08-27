"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Store, BarChart3, Settings, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Sitios Web",
    value: "3",
    change: "+1",
    changeType: "increase" as const,
    description: "desde el mes pasado",
    icon: Globe,
  },
  {
    title: "Tiendas",
    value: "1",
    change: "0",
    changeType: "neutral" as const,
    description: "activa y funcionando",
    icon: Store,
  },
  {
    title: "Visitas",
    value: "1,234",
    change: "+20.1%",
    changeType: "increase" as const,
    description: "desde el mes pasado",
    icon: BarChart3,
  },
  {
    title: "Configuraciones",
    value: "5",
    change: "-2",
    changeType: "decrease" as const,
    description: "pendientes de revisar",
    icon: Settings,
  },
]

export function QuickStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeType === "increase" && <TrendingUp className="h-3 w-3 text-secondary mr-1" />}
                {stat.changeType === "decrease" && <TrendingDown className="h-3 w-3 text-destructive mr-1" />}
                <span
                  className={
                    stat.changeType === "increase"
                      ? "text-secondary"
                      : stat.changeType === "decrease"
                        ? "text-destructive"
                        : ""
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
