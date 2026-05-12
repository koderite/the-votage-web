'use client'

import { motion } from 'framer-motion'
import { StatsRow } from '@/components/admin/dashboard/StatsRow'
import { AttendanceChart } from '@/components/admin/dashboard/AttendanceChart'
import { MonthlyOverviewChart } from '@/components/admin/dashboard/MonthlyOverviewChart'
import { YearComparisonChart } from '@/components/admin/dashboard/YearComparisonChart'
import { statCardsData, attendanceData, monthlyData, comparisonData } from '@/components/admin/data/dashboardData'

export default function AdminDashboardPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h2 className="text-xl font-semibold text-[#111827]">Welcome back, Admin!</h2>
        <p className="text-sm text-[#6B7280] mt-1">
          Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </motion.div>

      <StatsRow data={statCardsData} />

      <AttendanceChart data={attendanceData} />

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
