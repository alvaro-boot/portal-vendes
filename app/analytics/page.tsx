"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VENDES_COLORS } from "@/constants/dashboard"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { PortalShell } from "@/components/portal/portal-shell"

const data = [
  { name: "Lun", visits: 120, sales: 12 },
  { name: "Mar", visits: 180, sales: 18 },
  { name: "Mié", visits: 150, sales: 15 },
  { name: "Jue", visits: 220, sales: 22 },
  { name: "Vie", visits: 260, sales: 26 },
  { name: "Sáb", visits: 200, sales: 20 },
  { name: "Dom", visits: 140, sales: 14 },
]

export default function AnalyticsPage() {
  return (
    <PortalShell>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#292522]">Analítica</h1>
          <p className="text-[#666666] text-sm">Métricas y desempeño de tu tienda</p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <div className="text-sm text-[#666666]">Ingresos</div>
              <div className="text-2xl font-semibold text-[#292522]">$ 12,430</div>
                              <div className="text-xs text-white bg-[#551BB3]/20 inline-block mt-2 px-2 py-0.5 rounded">+8% vs. ayer</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="text-sm text-[#666666]">Pedidos</div>
              <div className="text-2xl font-semibold text-[#292522]">248</div>
                              <div className="text-xs text-white bg-[#551BB3]/20 inline-block mt-2 px-2 py-0.5 rounded">+3% vs. ayer</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="text-sm text-[#666666]">Conversión</div>
              <div className="text-2xl font-semibold text-[#292522]">2.1%</div>
              <div className="text-xs text-red-700 bg-red-100 inline-block mt-2 px-2 py-0.5 rounded">-0.2 pts</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Visitas por día</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  visits: { label: "Visitas", color: VENDES_COLORS.PRIMARY },
                }}
                className="h-56"
              >
                <LineChart data={data}>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="visits" stroke={VENDES_COLORS.PRIMARY} strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ventas por día</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: { label: "Ventas", color: VENDES_COLORS.SECONDARY },
                }}
                className="h-56"
              >
                <LineChart data={data}>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sales" stroke={VENDES_COLORS.SECONDARY} strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  )
}


