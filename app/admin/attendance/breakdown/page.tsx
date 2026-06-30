'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, BookUser, Users, Building2, ClipboardList, Search, Plus, TrendingUp } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import {
  checkInMethodData, events as allEvents,
} from '@/components/admin/data/members'

// ── Data ──────────────────────────────────────────────────────────────────────

const dateRangeOptions  = ['Last 4 weeks', 'Last 5 weeks', 'Last 3 months', 'Last 6 months', 'Last year']
const serviceTypeOptions = ['All services', '1st Service', '2nd Service', '3rd Service']
const departmentOptions  = ['All departments', 'RMG (Choir)', 'Ushering', 'Media', 'Protocol', 'VIP', 'Next (Youth)', 'Kids', 'Sanitation (Sanctuary)', 'Prayer']

// ── Types ─────────────────────────────────────────────────────────────────────

interface DashboardAttendanceData {
  stats: {
    total_attendance: number
    active_members: number
    returning_members: number
    new_visitors: number
  }
  attendance_per_sunday_service_chart: Array<{
    date: string
    s1: number
    s2: number
    s3: number
  }>
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function FilterDropdown({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] bg-white hover:bg-gray-50 transition-colors min-w-35"
      >
        <span className="flex-1 text-left">{value}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-full">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${opt === value ? 'text-[#3B82F6] font-medium' : 'text-[#111827]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ChartDropdown({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#374151] hover:bg-gray-50 transition-colors"
      >
        {value}
        <ChevronDown size={13} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-full">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${o === value ? 'text-[#3B82F6] font-medium' : 'text-[#111827]'}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-pulse border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="p-2 bg-gray-150 rounded-lg w-8 h-8"></div>
      </div>
      <div className="h-8 w-16 bg-gray-250 rounded mb-2"></div>
      <div className="h-3 w-28 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] animate-pulse h-[348px] flex flex-col justify-between border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="h-5 w-36 bg-gray-200 rounded"></div>
        <div className="h-8 w-24 bg-gray-100 rounded"></div>
      </div>
      <div className="flex items-end gap-6 h-48 px-4 mt-4">
        <div className="w-full bg-gray-150 rounded-t h-[40%]"></div>
        <div className="w-full bg-gray-150 rounded-t h-[75%]"></div>
        <div className="w-full bg-gray-150 rounded-t h-[50%]"></div>
        <div className="w-full bg-gray-150 rounded-t h-[65%]"></div>
        <div className="w-full bg-gray-150 rounded-t h-[80%]"></div>
      </div>
      <div className="h-4 w-48 bg-gray-200 rounded self-center mt-4"></div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="30" width="70" height="55" rx="6" stroke="#E5E7EB" strokeWidth="2" fill="#FAFAFA"/>
        <path d="M15 38h70" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="50" cy="60" r="10" stroke="#D1D5DB" strokeWidth="2"/>
        <path d="M46 60h8M50 56v8" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
        <rect x="32" y="76" width="36" height="3" rx="1.5" fill="#E5E7EB"/>
      </svg>
      <p className="mt-3 text-sm text-[#9CA3AF]">{message}</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServiceBreakdownPage() {

  const [dateRange,    setDateRange]    = useState('Last 4 weeks')
  const [serviceType,  setServiceType]  = useState('All services')
  const [department,   setDepartment]   = useState('All departments')
  const [chartPeriod,  setChartPeriod]  = useState('Last 5 weeks')
  const [eventSearch,  setEventSearch]  = useState('')

  const [data, setData] = useState<DashboardAttendanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (department !== 'All departments') queryParams.append('department', department)
      if (serviceType !== 'All services') queryParams.append('serviceType', serviceType)
      if (dateRange !== 'Last 4 weeks') queryParams.append('dateRange', dateRange)

      const response = await fetch(`/api/dashboard/attendance?${queryParams.toString()}`)
      if (!response.ok) {
        let errMsg = `Failed to fetch attendance data: ${response.statusText}`
        try {
          const errData = await response.json()
          if (errData?.detail) errMsg = errData.detail
        } catch {}
        throw new Error(errMsg)
      }
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [department, serviceType, dateRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredEvents = allEvents.filter(e =>
    eventSearch === '' || e.title.toLowerCase().includes(eventSearch.toLowerCase())
  )

  const chartData = useMemo(() => {
    let rawData = data?.attendance_per_sunday_service_chart
    if (!rawData || rawData.length === 0) {
      return []
    }

    let filtered = rawData.map(d => ({ ...d }))

    // Filter by service type
    if (serviceType === '1st Service') {
      filtered = filtered.map(d => ({ ...d, s2: 0, s3: 0 }))
    } else if (serviceType === '2nd Service') {
      filtered = filtered.map(d => ({ ...d, s1: 0, s3: 0 }))
    } else if (serviceType === '3rd Service') {
      filtered = filtered.map(d => ({ ...d, s1: 0, s2: 0 }))
    }

    // Filter chart period
    const chartPeriodWeeks = chartPeriod === 'Last 5 weeks' ? 5 : chartPeriod === 'Last 4 weeks' ? 4 : 3
    return filtered.slice(-chartPeriodWeeks)
  }, [data, serviceType, chartPeriod])

  const chartDataWithTotal = useMemo(() => {
    return chartData.map(d => ({
      ...d,
      total: d.s1 + d.s2 + d.s3,
    }))
  }, [chartData])

  const noData = !loading && !error && (!data || !data.stats)

  return (
    <>
      <AdminGreeting />

      {/* Filters card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Data Range</label>
            <FilterDropdown options={dateRangeOptions}   value={dateRange}   onChange={setDateRange}   />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Department</label>
            <FilterDropdown options={departmentOptions}  value={department}  onChange={setDepartment}  />
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      {error ? (
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center shadow-sm">
          <p className="text-sm text-red-600 font-medium mb-3">Error loading dashboard: {error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : noData ? (
        <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-gray-100">
          <EmptyState message="No attendance data available for the selected filters." />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          <ColoredStatCard
            label="Total Attendance"
            value={(data?.stats?.total_attendance ?? 0).toLocaleString()}
            subtitle="All service combined"
            change={`${data?.stats?.active_members ?? 0} active members`}
            changeLabel="this period"
            positive={true}
            color="yellow"
            icon={BookUser}
            index={0}
          />
          <ColoredStatCard
            label="Active Members"
            value={data?.stats?.active_members ?? 0}
            subtitle="≥3 of last 4 Sundays"
            change={`${Math.round((data?.stats?.active_members ?? 0) / (data?.stats?.total_attendance || 1) * 100)}%`}
            changeLabel="of total"
            positive={true}
            color="blue"
            icon={Users}
            index={1}
          />
          <ColoredStatCard
            label="Returning"
            value={data?.stats?.returning_members ?? 0}
            subtitle="Back after absence"
            change={`${data?.stats?.new_visitors ?? 0} new`}
            changeLabel="this month"
            positive={true}
            color="green"
            icon={Building2}
            index={2}
          />
          <ColoredStatCard
            label="New Visitors"
            value={data?.stats?.new_visitors ?? 0}
            subtitle="First-timer Visitors"
            change="Requires follow up"
            changeLabel=""
            positive={false}
            color="purple"
            icon={ClipboardList}
            index={3}
          />
        </motion.div>
      )}

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Attendance per Sunday Service – bar chart */}
        {loading ? (
          <div className="lg:col-span-3">
            <ChartSkeleton />
          </div>
        ) : error ? (
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-center h-[348px] border border-gray-100">
            <p className="text-sm text-red-500 font-medium">Failed to load chart data.</p>
          </div>
        ) : noData || chartDataWithTotal.length === 0 ? (
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-center h-[348px] border border-gray-100">
            <EmptyState message="No attendance data available for the selected filters." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-semibold text-[#111827]">Attendance per Sunday Service</h3>
              <ChartDropdown value={chartPeriod} onChange={setChartPeriod} options={['Last 5 weeks', 'Last 4 weeks', 'Last 3 weeks']} />
            </div>
            <div className="h-65">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartDataWithTotal} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#1A1D29', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                    content={() => (
                      <ul className="recharts-default-legend" style={{ padding: 0, margin: '0 auto', textAlign: 'center' }}>
                        <li style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="#3B82F6">
                            <circle cx="4" cy="4" r="4" />
                          </svg>
                          <span style={{ color: '#6B7280', fontSize: 12 }}>Sunday Service</span>
                        </li>
                      </ul>
                    )}
                  />
                  <Bar dataKey="total" name="Sunday Service" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Check In Method – donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          {noData || checkInMethodData.every(d => d.value === 0) ? (
            <EmptyState message="No check-in data available." />
          ) : (
            <>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[15px] font-semibold text-[#111827]">Check In Method</h3>
                <span className="text-[12px] text-[#9CA3AF]">Online vs Physical</span>
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <PieChart width={160} height={160}>
                  <Pie data={checkInMethodData} cx={75} cy={75} innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
                    {checkInMethodData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="w-full space-y-3 mt-4">
                  {checkInMethodData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-[#374151] flex-1">{item.name}</span>
                      <span className="text-sm font-semibold text-[#111827]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Special Programs & Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-[15px] font-semibold text-[#111827]">Special Programs & Events</h3>
            <p className="text-[12px] text-[#9CA3AF] mt-0.5">Total attendance and growth indicator</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search program"
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 w-44"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus size={14} className="text-[#6B7280]" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] transition-colors">
              <Plus size={14} />
              Add event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              <p className="text-[13px] font-semibold text-[#111827]">{event.title}</p>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5 mb-3">{event.date}</p>
              <p className="text-[11px] text-[#9CA3AF] mb-1">Total attendance</p>
              <p className="text-[28px] font-bold text-[#111827] leading-tight">{event.attendance.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={13} className="text-[#22C55E]" />
                <span className="text-[11px] font-medium text-[#22C55E]">{event.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
