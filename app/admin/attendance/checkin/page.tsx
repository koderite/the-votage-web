'use client'

// Note: This page/route is currently deactivated and hidden from the admin sidebar navigation.

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Search, ChevronRight, Video } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import { allMembers, isActive, checkInMethodData, checkinTimelines, defaultServiceCounts, type ServiceName } from '@/components/admin/data/members'

const checkInRows = [
  { name: 'Favour Goodness', ministry: 'Choir',    arrived: '10:33 AM', lateBy: '23 min', flag: '+30 mins',  flagColor: 'bg-pink-100 text-pink-600'  },
  { name: 'Emeka Nwosu',     ministry: 'VIP',      arrived: '10:33 AM', lateBy: '23 min', flag: '+30 mins',  flagColor: 'bg-pink-100 text-pink-600'  },
  { name: 'Funke Adeyemi',   ministry: 'Ushering', arrived: '10:33 AM', lateBy: '23 min', flag: '15+ mins',  flagColor: 'bg-green-100 text-green-700' },
  { name: 'Chioma Okafor',   ministry: 'Choir',    arrived: '10:33 AM', lateBy: '23 min', flag: '+ 22 mins', flagColor: 'bg-pink-100 text-pink-600'  },
  { name: 'Temitope Balogun',ministry: 'Media',    arrived: '10:15 AM', lateBy: '8 min',  flag: '15+ mins',  flagColor: 'bg-green-100 text-green-700' },
  { name: 'Kunle Adegoke',   ministry: 'Protocol', arrived: '10:45 AM', lateBy: '18 min', flag: '+30 mins',  flagColor: 'bg-pink-100 text-pink-600'  },
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sidebar-bg text-white px-3 py-1.5 rounded-lg text-sm">
        {payload[0].value}
      </div>
    )
  }
  return null
}

export default function CheckinPage() {
  const [activeService, setActiveService] = useState<ServiceName>('2nd')
  const [search, setSearch] = useState('')

  const timelineData = useMemo(() => checkinTimelines[activeService], [activeService])
  const serviceCount = defaultServiceCounts[activeService]

  const activeCount = allMembers.filter(isActive).length
  const peakTime = activeService === '1st' ? '7:45' : activeService === '2nd' ? '9:15' : '10:45'

  return (
    <>
      <AdminGreeting />
      <p className="text-sm text-[#6B7280]">Real time checking – Sunday service in progress</p>

      {/* Top 3-card row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Real-Time Check in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <p className="text-sm text-[#6B7280] mb-2">Real -Time Check in</p>
          <p className="text-[42px] font-bold text-[#111827] leading-tight mb-1">
            {activeCount * 15 + 120}
          </p>
          <p className="text-[12px] text-[#9CA3AF] mb-4">Checked in updates every minutes</p>
          <div className="flex items-center gap-2">
            {(['1st', '2nd', '3rd'] as ServiceName[]).map((s) => (
              <button
                key={s}
                onClick={() => setActiveService(s)}
                className={`flex flex-col items-center px-4 py-2 rounded-full text-[12px] transition-colors ${
                  activeService === s
                    ? 'bg-pink-100 text-pink-600 font-semibold'
                    : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
                }`}
              >
                <span>{s}</span>
                <span className="font-bold text-[13px]">{serviceCount}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Check in Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-[#111827]">Check in Method</p>
              <p className="text-[12px] text-[#9CA3AF] mt-0.5">Manual vs Scan/Visual</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <PieChart width={120} height={120}>
              <Pie
                data={checkInMethodData}
                cx={55}
                cy={55}
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
                strokeWidth={0}
              >
                {checkInMethodData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="space-y-2">
              {checkInMethodData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[12px] text-[#374151] flex-1">{item.name}</span>
                  <span className="text-[12px] font-semibold text-[#111827]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Camera / Live feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-sidebar-bg rounded-xl flex flex-col items-center justify-center min-h-45 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <Video size={32} className="text-white/30 mb-2" />
          <p className="text-white/40 text-sm">Live Feed</p>
        </motion.div>
      </div>

      {/* Check-in Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[15px] font-semibold text-[#111827]">Check-in Timeline</h3>
          <span className="px-3 py-1.5 bg-pink-100 text-pink-600 rounded-full text-[12px] font-medium">
            Peak : {peakTime}
          </span>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="checkinGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BAE6FD" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#BAE6FD" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                interval={2}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={peakTime}
                stroke="#94A3B8"
                strokeDasharray="4 4"
                label={{ value: `Peak ${peakTime}`, position: 'top', fill: '#6B7280', fontSize: 11 }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#7DD3FC"
                strokeWidth={2}
                fill="url(#checkinGradient)"
                dot={false}
                activeDot={{ r: 4, fill: '#7DD3FC', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Members Insight table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              <span className="font-semibold text-[#111827]">Members Insight</span>
              {' '}
              <span className="text-[#6B7280]">~ breakdown of departmental attendance</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 w-40"
              />
            </div>
            <button className="flex items-center gap-1 text-sm text-[#374151] hover:text-[#111827] transition-colors">
              See all <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Ministry', 'Arrived', 'Late by', 'Flagged'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {checkInRows
                .filter((r) => search === '' || r.name.toLowerCase().includes(search.toLowerCase()))
                .map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#374151]">{row.name}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{row.ministry}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{row.arrived}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{row.lateBy}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${row.flagColor}`}>
                        {row.flag}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  )
}
