'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Lightbulb, Search, SlidersHorizontal, ChevronRight, BookUser, Users, Building2, ClipboardList } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const topCards = [
  { label: 'Total members',     value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'yellow' as const, icon: BookUser     },
  { label: 'Active members',    value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'blue'   as const, icon: Users        },
  { label: 'Returning Members', value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'green'  as const, icon: Building2    },
  { label: 'Engagments',        value: '87%', change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'purple' as const, icon: ClipboardList },
]

const departmentData = [
  { dept: 'Choir',       count: 312, color: '#3B82F6' },
  { dept: 'Ushering',    count: 245, color: '#22C55E' },
  { dept: 'Media',       count: 198, color: '#F59E0B' },
  { dept: 'VIP',         count: 174, color: '#A855F7' },
  { dept: 'Protocol',    count: 143, color: '#F43F5E' },
  { dept: 'Regular',     count: 568, color: '#6B7280' },
]

type Status = 'Active' | 'Inactive'

interface Member {
  name: string; phone: string; email: string; gender: string; department: string; status: Status; joined: string
}

const members: Member[] = [
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active',   joined: 'Jan 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Active',   joined: 'Mar 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Inactive', joined: 'Jun 2022' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Choir',          status: 'Active',   joined: 'Aug 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Regular member', status: 'Inactive', joined: 'Dec 2022' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Media',          status: 'Active',   joined: 'Feb 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Media',          status: 'Inactive', joined: 'Apr 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Active',   joined: 'Jul 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Inactive', joined: 'Sep 2022' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active',   joined: 'Nov 2023' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Ushering',       status: 'Active',   joined: 'Jan 2024' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Protocol',       status: 'Active',   joined: 'Mar 2024' },
]

export default function InsightsPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All')

  const filtered = members.filter((m) => {
    const matchSearch  = search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase())
    const matchStatus  = statusFilter === 'All' || m.status === statusFilter
    return matchSearch && matchStatus
  })

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

      {/* Stat cards */}
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
            Member insights, department breakdown and engagement overview –{' '}
            <span className="text-[#3B82F6] cursor-pointer hover:underline">todays evaluation metrix</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {topCards.map((card, i) => (
            <ColoredStatCard key={card.label} {...card} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Department breakdown chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <h3 className="text-[15px] font-semibold text-[#111827] mb-1">Department Breakdown</h3>
        <p className="text-[12px] text-[#9CA3AF] mb-6">Member count per ministry department</p>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#1A1D29', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              />
              <Bar dataKey="count" name="Members" radius={[6, 6, 0, 0]}>
                {departmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Member table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              <span className="font-semibold text-[#111827]">Members Insight</span>
              {' '}<span className="text-[#6B7280]">– breakdown of departmental attendance</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 w-44"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={15} className="text-[#6B7280]" />
            </button>
            <button
              onClick={() => setStatusFilter(statusFilter === 'All' ? 'Active' : statusFilter === 'Active' ? 'Inactive' : 'All')}
              className="flex items-center gap-1 text-sm text-[#374151] hover:text-[#111827] transition-colors"
            >
              {statusFilter === 'All' ? 'All status' : statusFilter}
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
            <button className="flex items-center gap-1 text-sm text-[#374151] hover:text-[#111827] transition-colors">
              See all <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Phone No', 'Email', 'Gender', 'Department', 'Joined', 'Status'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.name}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.phone}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.email}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.gender}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.department}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.joined}</td>
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
      </motion.div>
    </>
  )
}
