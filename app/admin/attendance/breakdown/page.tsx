'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Lightbulb, ChevronDown, BookUser, Users, Building2, ClipboardList, Search, SlidersHorizontal, Plus, TrendingUp } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'

// ── Data ──────────────────────────────────────────────────────────────────────

const dateRangeOptions  = ['Last 4 weeks', 'Last 5 weeks', 'Last 3 months', 'Last 6 months', 'Last year']
const serviceTypeOptions = ['First service', 'Second service', 'Third service', 'All services']
const departmentOptions  = ['Kids church', 'Youth', 'Main hall', 'All departments']

const statCards = [
  { label: 'Total Attendance', value: 1640, subtitle: 'All service combined',  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'yellow' as const, icon: BookUser      },
  { label: 'Physical meeting',  value: 1120, subtitle: 'In-person attendees',  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'blue'   as const, icon: Users          },
  { label: 'Online',            value: 395,  subtitle: 'Live stream viewers',  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'green'  as const, icon: Building2      },
  { label: 'New Visitors',      value: 89,   subtitle: 'First-timer Visitors', change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'purple' as const, icon: ClipboardList  },
]

const attendancePerService = [
  { date: '2026-05-23', s1: 220, s2: 310, s3: 180 },
  { date: '2026-05-09', s1: 260, s2: 200, s3: 150 },
  { date: '2026-04-19', s1: 310, s2: 492, s3: 220 },
  { date: '2026-05-19', s1: 160, s2: 290, s3: 210 },
  { date: '2026-05-27', s1: 200, s2: 260, s3: 195 },
]

const checkInMethodData = [
  { name: 'Physical', value: 72, color: '#3B82F6' },
  { name: 'Online',   value: 22, color: '#F43F5E' },
  { name: 'Visitors', value: 6,  color: '#F59E0B' },
]

const events = [
  { title: 'Men Conference',              date: 'May 20,2026', attendance: 547,  change: '6.2% vs prev'      },
  { title: 'Benin Fire Cnference',        date: 'May 30,2026', attendance: 4875, change: '6.2% vs last year' },
  { title: 'My 2 In 1 conference',        date: 'May 30,2026', attendance: 674,  change: '6.2% vs last year' },
  { title: 'Easter Sunday',              date: 'May 30,2026', attendance: 89,   change: '6.2% vs last year' },
  { title: 'VOTAGE Thanks-giving Service',date: 'May 30,2026', attendance: 89,   change: '6.2% vs last year' },
  { title: 'Tribe Sunday',               date: 'May 30,2026', attendance: 89,   change: '6.2% vs last year' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServiceBreakdownPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'

  const [dateRange,    setDateRange]    = useState('Last 4 weeks')
  const [serviceType,  setServiceType]  = useState('First service')
  const [department,   setDepartment]   = useState('Kids church')
  const [chartPeriod,  setChartPeriod]  = useState('Last 5 weeks')
  const [eventSearch,  setEventSearch]  = useState('')

  const filteredEvents = events.filter(e =>
    eventSearch === '' || e.title.toLowerCase().includes(eventSearch.toLowerCase())
  )

  return (
    <>
      {/* Greeting */}
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

      {/* Top card: filters + stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
            <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
          </div>
          <p className="text-sm text-[#374151]">
            Service performance, program events and attendance breakdown –{' '}
            <span className="text-[#3B82F6] cursor-pointer hover:underline">todays evaluation metrics</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Data Range</label>
            <FilterDropdown options={dateRangeOptions}   value={dateRange}   onChange={setDateRange}   />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Service Type</label>
            <FilterDropdown options={serviceTypeOptions} value={serviceType} onChange={setServiceType} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Department</label>
            <FilterDropdown options={departmentOptions}  value={department}  onChange={setDepartment}  />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statCards.map((card, i) => (
            <ColoredStatCard key={card.label} {...card} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Attendance Per Service – stacked bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-semibold text-[#111827]">Attendance Per Service</h3>
            <ChartDropdown value={chartPeriod} onChange={setChartPeriod} options={['Last 5 weeks', 'Last 4 weeks', 'Last 3 weeks']} />
          </div>
          <div className="h-65">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendancePerService} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barSize={18}>
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
                  formatter={(value) => <span style={{ color: '#6B7280' }}>{value}</span>}
                />
                <Bar dataKey="s1" name="1st Service" stackId="a" fill="#F87171" radius={[0, 0, 0, 0]} />
                <Bar dataKey="s2" name="2nd Service" stackId="a" fill="#2DD4BF" radius={[0, 0, 0, 0]} />
                <Bar dataKey="s3" name="3rd Service" stackId="a" fill="#818CF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Check In Method – donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
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
              <SlidersHorizontal size={14} className="text-[#6B7280]" />
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
