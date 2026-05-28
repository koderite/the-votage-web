'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Lightbulb, ChevronDown, BookUser, Users, Building2, ClipboardList } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'

const dateRangeOptions   = ['Last 4 weeks', 'Last 3 months', 'Last 6 months', 'Last year']
const serviceTypeOptions  = ['First service', 'Second service', 'Third service', 'All services']
const departmentOptions   = ['Kids church', 'Youth', 'Main hall', 'All departments']

const statCards = [
  { label: 'Total Attendance',  value: 1640, subtitle: 'All service combined',   change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'yellow' as const, icon: BookUser     },
  { label: 'Physical meeting',  value: 1120, subtitle: 'In-person attendees',    change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'blue'   as const, icon: Users        },
  { label: 'Online',            value: 395,  subtitle: 'Live stream viewers',    change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'green'  as const, icon: Building2    },
  { label: 'New Visitors',      value: 89,   subtitle: 'First-timer Visitors',   change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'purple' as const, icon: ClipboardList },
]

function FilterDropdown({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] bg-white hover:bg-gray-50 transition-colors min-w-[140px]"
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

export default function ServiceBreakdownPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'

  const [dateRange,    setDateRange]    = useState('Last 4 weeks')
  const [serviceType,  setServiceType]  = useState('First service')
  const [department,   setDepartment]   = useState('Kids church')

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        {/* Info row */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-50 rounded-lg flex-shrink-0">
            <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
          </div>
          <p className="text-sm text-[#374151]">
            Service performance, program events and attendance breakdown –{' '}
            <span className="text-[#3B82F6] cursor-pointer hover:underline">todays evaluation metrics</span>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Data Range</label>
            <FilterDropdown options={dateRangeOptions}  value={dateRange}   onChange={setDateRange}   />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Service Type</label>
            <FilterDropdown options={serviceTypeOptions} value={serviceType} onChange={setServiceType} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6B7280] font-medium">Department</label>
            <FilterDropdown options={departmentOptions} value={department}  onChange={setDepartment}  />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statCards.map((card, i) => (
            <ColoredStatCard key={card.label} {...card} index={i} />
          ))}
        </div>
      </motion.div>
    </>
  )
}
