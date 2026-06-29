'use client'

import { useState, useEffect } from 'react'
import { BookUser, Users, Building2, Sparkles, Download, Loader2 } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { StatsRow } from '@/components/admin/dashboard/StatsRow'
import { AttendanceChart } from '@/components/admin/dashboard/AttendanceChart'
import { MonthlyOverviewChart } from '@/components/admin/dashboard/MonthlyOverviewChart'
import { YearComparisonChart } from '@/components/admin/dashboard/YearComparisonChart'
import { precomputedStats, getYearlyMonthlyData, getYearlyComparisonData } from '@/components/admin/data/members'
import { statCardsData, attendanceData } from '@/components/admin/data/dashboardData'
import { toast } from 'sonner'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(precomputedStats)
  const [downloading, setDownloading] = useState(false)
  const monthlyMembership = getYearlyMonthlyData()
  const comparison = getYearlyComparisonData()

  const handleDownload = async () => {
    setDownloading(true)
    const toastId = toast.loading('Generating attendance report...')
    try {
      console.log('[Dashboard] Triggering report download from /api/dashboard/report/attendance...')
      const res = await fetch('/api/dashboard/report/attendance')
      if (!res.ok) {
        throw new Error('Failed to generate report')
      }
      
      const contentType = res.headers.get('content-type') || ''
      
      if (contentType.includes('application/json')) {
        // Case A: The API returns JSON containing a download URL
        const data = await res.json()
        const downloadUrl = data.url || data.download_url || data.link || data.downloadFile
        
        if (!downloadUrl) {
          throw new Error('No download link found in the JSON response')
        }
        
        console.log('[Dashboard] Opening download link:', downloadUrl)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = 'attendance_monthly.csv'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        a.remove()
      } else {
        // Case B: The API returns the file blob directly
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        
        // Attempt to get filename from Content-Disposition header
        const contentDisposition = res.headers.get('content-disposition')
        let filename = 'attendance_monthly.csv'
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/)
          if (match && match[1]) filename = match[1]
        }
        
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      }
      
      toast.success('Report downloaded successfully!', { id: toastId })
    } catch (err) {
      console.error('[Dashboard] Error downloading report:', err)
      toast.error('Could not download the report. Please try again.', { id: toastId })
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    // 1. Fetch and log dashboard summary
    async function fetchDashboardSummary() {
      try {
        console.log('[Dashboard] Fetching /api/dashboard/summary...');
        const res = await fetch('/api/dashboard/summary')
        if (res.ok) {
          const data = await res.json()
          console.log('[Dashboard] /api/dashboard/summary response loaded:', data)
          if (data.stats) {
            setStats({
              total: data.stats.total_members ?? precomputedStats.total,
              active: data.stats.active_members ?? precomputedStats.active,
              returning: data.stats.returning_members ?? precomputedStats.returning,
              newThisMonth: Math.round((data.stats.total_members ?? precomputedStats.total) * 0.05),
              needsAttention: Math.round((data.stats.total_members ?? precomputedStats.total) * 0.08),
            })
          }
        } else {
          console.error('[Dashboard] /api/dashboard/summary fetch failed status:', res.status)
        }
      } catch (err) {
        console.error('[Dashboard] /api/dashboard/summary exception:', err)
      }
    }

    // 2. Fetch and log /api/home/
    async function fetchHomeOverview() {
      try {
        console.log('[Dashboard] Fetching /api/home...');
        const res = await fetch('/api/home')
        if (res.ok) {
          const data = await res.json()
          console.log('[Dashboard] /api/home response loaded:', data)
        } else {
          console.error('[Dashboard] /api/home fetch failed status:', res.status)
        }
      } catch (err) {
        console.error('[Dashboard] /api/home exception:', err)
      }
    }

    // 3. Fetch and log /api/home/stats
    async function fetchHomeStats() {
      try {
        console.log('[Dashboard] Fetching /api/home/stats...');
        const res = await fetch('/api/home/stats')
        if (res.ok) {
          const data = await res.json()
          console.log('[Dashboard] /api/home/stats response loaded:', data)
        } else {
          console.error('[Dashboard] /api/home/stats fetch failed status:', res.status)
        }
      } catch (err) {
        console.error('[Dashboard] /api/home/stats exception:', err)
      }
    }

    fetchDashboardSummary()
    fetchHomeOverview()
    fetchHomeStats()
  }, [])

  const topCards = [
    { label: 'Total members',      value: stats.total,       change: `${stats.active} active`, changeLabel: 'this month', positive: true,  color: 'yellow' as const, icon: BookUser     },
    { label: 'Active members',     value: stats.active,      change: `${Math.round(stats.active / (stats.total || 1) * 100)}%`, changeLabel: 'of total', positive: true,  color: 'blue'   as const, icon: Users        },
    { label: 'Returning Members',  value: stats.returning,   change: `${stats.newThisMonth} new`, changeLabel: 'this month', positive: true,  color: 'green'  as const, icon: Building2    },
    { label: 'New This Month',     value: stats.newThisMonth, change: `${stats.needsAttention} need attention`, changeLabel: '', positive: false, color: 'purple' as const, icon: Sparkles      },
  ]

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <AdminGreeting />
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-start sm:self-auto shadow-sm"
        >
          {downloading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Download size={15} />
          )}
          {downloading ? 'Downloading...' : 'Download Report'}
        </button>
      </div>

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

