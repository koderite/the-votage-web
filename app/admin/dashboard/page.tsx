'use client'

import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { BookUser, Users, Building2, ClipboardList } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { StatsRow } from '@/components/admin/dashboard/StatsRow'
import { AttendanceChart } from '@/components/admin/dashboard/AttendanceChart'
import { MonthlyOverviewChart } from '@/components/admin/dashboard/MonthlyOverviewChart'
import { YearComparisonChart } from '@/components/admin/dashboard/YearComparisonChart'
import { statCardsData, attendanceData, monthlyData, comparisonData } from '@/components/admin/data/dashboardData'

const topCards = [
  { label: 'Total members',      value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true,  color: 'yellow' as const, icon: BookUser      },
  { label: 'Active members',     value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true,  color: 'blue'   as const, icon: Users          },
  { label: 'Returning Members',  value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true,  color: 'green'  as const, icon: Building2      },
  { label: 'Engagments',         value: '87%', change: '6.2%', changeLabel: 'vs lat year', positive: true,  color: 'purple' as const, icon: ClipboardList  },
]

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h2 className="text-xl font-semibold text-[#111827]">Welcome back, {firstName}!!</h2>
        <p className="text-sm text-[#6B7280] mt-1">
          Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {topCards.map((card, i) => (
          <ColoredStatCard key={card.label} {...card} index={i} />
        ))}
      </div>

      <AttendanceChart data={attendanceData} />

      <StatsRow data={statCardsData} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <MonthlyOverviewChart data={monthlyData} />
        </div>
        <div className="lg:col-span-2">
          <YearComparisonChart data={comparisonData} />
        </div>
      </div>
    </>
  )
}
