

'use client'

import { motion } from 'framer-motion'
import { StatsRow } from '@/components/admin/dashboard/StatsRow'
import { AttendanceChart } from '@/components/admin/dashboard/AttendanceChart'
import { MonthlyOverviewChart } from '@/components/admin/dashboard/MonthlyOverviewChart'
import { YearComparisonChart } from '@/components/admin/dashboard/YearComparisonChart'
import { statCardsData, attendanceData, monthlyData, comparisonData } from '@/components/admin/data/dashboardData'
import { OnboardStatsRow } from '@/components/admin/onboarding/OnboardStatsRow'
import { OnboardStats } from '@/components/admin/onboarding/OnboardStats'
import { OnboardStatsData } from '@/components/admin/data/onboardData'
      import { Lightbulb, Search } from 'lucide-react';
import { MemberInsight } from '@/components/admin/onboarding/MemberInsight'


export default function OnboardingPage() {
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

      <OnboardStatsRow data={OnboardStatsData} />
      <MemberInsight data={attendanceData} />




    </>
  )
}
