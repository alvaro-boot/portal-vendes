import { QuickStats } from "@/components/dashboard/quick-stats"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bienvenido a Portal Vendes</h1>
        <p className="text-muted-foreground mt-2">Gestiona tu presencia digital desde un solo lugar</p>
      </div>

      <QuickStats />

      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  )
}
