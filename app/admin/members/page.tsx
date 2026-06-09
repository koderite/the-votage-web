'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Lightbulb, Search, SlidersHorizontal, Plus, BookUser, Users, Building2, ClipboardList, ChevronRight } from 'lucide-react'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AddMemberModal } from '@/components/admin/members/AddMemberModal'

const topCards = [
  { label: 'Total members',     value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'yellow' as const, icon: BookUser     },
  { label: 'Active members',    value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'blue'   as const, icon: Users        },
  { label: 'Returning Members', value: 1640,  change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'green'  as const, icon: Building2    },
  { label: 'Engagments',        value: '87%', change: '6.2%', changeLabel: 'vs lat year', positive: true, color: 'purple' as const, icon: ClipboardList },
]

type Status = 'Active' | 'Inactive'

interface Member {
  name: string
  phone: string
  email: string
  gender: string
  department: string
  status: Status
}

const members: Member[] = [
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Choir',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Regular member', status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Media',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Media',          status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Inactive' },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Ushering',       status: 'Active'   },
  { name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Protocol',       status: 'Active'   },
]

export default function MembersPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All')
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = members.filter((m) => {
    const matchesSearch =
      search === '' ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} />}

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

      {/* Top stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              Manage members, track and view insight{' '}
              <span className="text-[#3B82F6] cursor-pointer hover:underline">todays evaluation metrix</span>
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] transition-colors"
          >
            Add member
            <Plus size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {topCards.map((card, i) => (
            <ColoredStatCard key={card.label} {...card} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Members table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        {/* Table header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              <span className="font-semibold text-[#111827]">Members Insight</span>{' '}
              <span className="text-[#6B7280]">– breakdown of departmental attendance</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 w-44"
              />
            </div>

            {/* Filter icon */}
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={15} className="text-[#6B7280]" />
            </button>

            {/* Status filter */}
            <button
              onClick={() => setStatusFilter(statusFilter === 'All' ? 'Active' : statusFilter === 'Active' ? 'Inactive' : 'All')}
              className="flex items-center gap-1 text-sm text-[#374151] hover:text-[#111827] transition-colors"
            >
              {statusFilter === 'All' ? 'All status' : statusFilter}
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>

            <button className="flex items-center gap-1 text-sm text-[#374151] hover:text-[#111827] transition-colors">
              See all
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Phone No', 'Email', 'Gender', 'Department', 'Status'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-[#374151]">{member.name}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{member.phone}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{member.email}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{member.gender}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{member.department}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                        member.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      {member.status}
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
