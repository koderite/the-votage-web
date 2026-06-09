'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Plus, ChevronDown, Download } from 'lucide-react'

const reportCards = [
  {
    title: 'Weekly attendance Reports',
    description: 'Service by service break down with trend comparison and growth metrics',
    badge: 'Weekly',
    badgeColor: 'bg-green-100 text-green-700',
    exports: ['Excel', 'PDF'],
  },
  {
    title: 'Members Engagement reports',
    description: 'Follow-up status, onboarding, completion and members activities',
    badge: 'Monthly',
    badgeColor: 'bg-orange-100 text-orange-700',
    exports: ['CSV', 'PDF'],
  },
  {
    title: 'Special Events Report',
    description: 'Program attendance totals, Growth indicators and visitors conversion rate',
    badge: 'Per events',
    badgeColor: 'bg-purple-100 text-purple-700',
    exports: ['Excel', 'PDF'],
  },
  {
    title: 'Year-over Year Analysis',
    description: 'Annual attendance comparison, growth rate and trend forecasting repost',
    badge: 'Weekly',
    badgeColor: 'bg-green-100 text-green-700',
    exports: ['Excel', 'PDF'],
  },
  {
    title: 'Birthdays and Anniversaries',
    description: 'Monthly list of members celebrations with contact details and follow-up',
    badge: 'Weekly',
    badgeColor: 'bg-orange-100 text-orange-700',
    exports: ['CSV', 'PDF'],
  },
  {
    title: 'Live Check-in Summary',
    description: 'Timeline data, late arrivals, service breakdown per service',
    badge: 'Weekly',
    badgeColor: 'bg-green-100 text-green-700',
    exports: ['Excel', 'PDF'],
  },
]

const attendanceRows = [
  { date: 'May 6, 2026',  s1: 567, s2: 541, s3: 601, online: 215 },
  { date: 'May 13, 2026', s1: 676, s2: 341, s3: 441, online: 201 },
  { date: 'May 22, 2026', s1: 236, s2: 661, s3: 598, online: 199 },
  { date: 'May 22, 2026', s1: 236, s2: 661, s3: 598, online: 199 },
  { date: 'May 22, 2026', s1: 236, s2: 661, s3: 598, online: 199 },
  { date: 'May 22, 2026', s1: 236, s2: 661, s3: 598, online: 199 },
  { date: 'May 22, 2026', s1: 236, s2: 661, s3: 598, online: 199 },
]

const memberRows = [
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Choir',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Regular member', status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Media',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Media',          status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Inactive' },
]

const serviceMax = { s1: 700, s2: 700, s3: 700, online: 300 }

function ServiceBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#374151] w-8">{value}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.round((value / max) * 100)}%` }}
        />
      </div>
    </div>
  )
}

function ServiceDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const opts = ['All Services', '1st Service', '2nd Service', '3rd Service', 'Online']
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] bg-white hover:bg-gray-50 transition-colors"
      >
        {value}
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-full">
          {opts.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${o === value ? 'text-[#3B82F6] font-medium' : 'text-[#111827]'}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ReportsPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'
  const [serviceFilter, setServiceFilter] = useState('All Services')
  const [dataView, setDataView] = useState<'attendance' | 'members'>('attendance')

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-start justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Welcome back, {firstName}!!</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] transition-colors">
          <Plus size={15} />
          Export All Data
        </button>
      </motion.div>

      {/* Report Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {reportCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <span className="text-2xl mb-3 block">🪴</span>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-1">{card.title}</h3>
            <p className="text-[12px] text-[#6B7280] leading-relaxed mb-4">{card.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${card.badgeColor}`}>
                {card.badge}
              </span>
              {card.exports.map((exp) => (
                <button
                  key={exp}
                  className="px-3 py-1 rounded-full text-[11px] font-medium text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {exp}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Data Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-[16px] font-semibold text-[#111827]">Data Review – last 8 Sundays</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setDataView('attendance')}
                className={`px-3 py-1 rounded-full text-[12px] transition-colors ${dataView === 'attendance' ? 'bg-gray-900 text-white' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Attendance
              </button>
              <button
                onClick={() => setDataView('members')}
                className={`px-3 py-1 rounded-full text-[12px] transition-colors ${dataView === 'members' ? 'bg-gray-900 text-white' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Members
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ServiceDropdown value={serviceFilter} onChange={setServiceFilter} />
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#374151] hover:bg-gray-50 transition-colors">
              <Download size={14} />
              Export Data
            </button>
          </div>
        </div>

        {dataView === 'attendance' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">1st service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">2nd service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">3rd service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Online</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-[#374151]">{row.date}</td>
                    <td className="py-4 px-4"><ServiceBar value={row.s1} max={serviceMax.s1} color="bg-[#F59E0B]" /></td>
                    <td className="py-4 px-4"><ServiceBar value={row.s2} max={serviceMax.s2} color="bg-[#3B82F6]" /></td>
                    <td className="py-4 px-4"><ServiceBar value={row.s3} max={serviceMax.s3} color="bg-[#EC4899]" /></td>
                    <td className="py-4 px-4"><ServiceBar value={row.online} max={serviceMax.online} color="bg-[#22C55E]" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-4 w-8">
                    <input type="checkbox" className="rounded" />
                  </th>
                  {['Name', 'Phone No', 'Email', 'Gender', 'Department', 'Status'].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {memberRows.map((m, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.name}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.phone}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.email}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.gender}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.department}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-600'}`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </>
  )
}
