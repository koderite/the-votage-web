'use client'

import { BookUser, Users, Building2, Sparkles } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { StatsRow } from '@/components/admin/dashboard/StatsRow'
import { AttendanceChart } from '@/components/admin/dashboard/AttendanceChart'
import { MonthlyOverviewChart } from '@/components/admin/dashboard/MonthlyOverviewChart'
import { YearComparisonChart } from '@/components/admin/dashboard/YearComparisonChart'
import { precomputedStats, getYearlyMonthlyData, getYearlyComparisonData } from '@/components/admin/data/members'
import { statCardsData, attendanceData } from '@/components/admin/data/dashboardData'

export default function AdminDashboardPage() {
  const stats = precomputedStats
  const monthlyMembership = getYearlyMonthlyData()
  const comparison = getYearlyComparisonData()

  const topCards = [
    { label: 'Total members',      value: stats.total,       change: `${stats.active} active`, changeLabel: 'this month', positive: true,  color: 'yellow' as const, icon: BookUser     },
    { label: 'Active members',     value: stats.active,      change: `${Math.round(stats.active / stats.total * 100)}%`, changeLabel: 'of total', positive: true,  color: 'blue'   as const, icon: Users        },
    { label: 'Returning Members',  value: stats.returning,   change: `${stats.newThisMonth} new`, changeLabel: 'this month', positive: true,  color: 'green'  as const, icon: Building2    },
    { label: 'New This Month',     value: stats.newThisMonth, change: `${stats.needsAttention} need attention`, changeLabel: '', positive: false, color: 'purple' as const, icon: Sparkles      },
  ]

  return (
    <>
      <AdminGreeting />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {topCards.map((card, i) => (
          <ColoredStatCard key={card.label} {...card} index={i} />
        ))}
      </div>

      <AttendanceChart data={attendanceData} />

      <StatsRow data={statCardsData} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-4">
          <MonthlyOverviewChart data={monthlyMembership} />
        </div>
        <div className="lg:col-span-1">
          <YearComparisonChart data={comparison} />
        </div>
      </div>
    </>
  )
}
