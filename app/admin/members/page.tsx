'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Search, SlidersHorizontal, Plus, BookUser, Users, Building2, Sparkles, ChevronRight } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AddMemberModal } from '@/components/admin/members/AddMemberModal'
import { allMembers, computeStats, isActive, type Department } from '@/components/admin/data/members'

const topCardsMeta = [
  { label: 'Total members',     color: 'yellow' as const, icon: BookUser   },
  { label: 'Active members',    color: 'blue'   as const, icon: Users       },
  { label: 'Returning Members', color: 'green'  as const, icon: Building2   },
  { label: 'New This Month',    color: 'purple' as const, icon: Sparkles    },
]

export default function MembersPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return allMembers.filter((m) => {
      const matchSearch =
        search === '' ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.department.toLowerCase().includes(search.toLowerCase())
      const matchDept = deptFilter === 'All' || m.department === deptFilter
      const matchStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && isActive(m)) ||
        (statusFilter === 'Inactive' && !isActive(m))
      return matchSearch && matchDept && matchStatus
    })
  }, [search, deptFilter, statusFilter])

  const stats = useMemo(() => computeStats(filtered), [filtered])

  const departments = ['All', ...new Set(allMembers.map(m => m.department))] as (string | Department)[]

  return (
    <>
      {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} />}

      <AdminGreeting />

      {/* Stat cards */}
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
          {topCardsMeta.map((card, i) => (
            <ColoredStatCard
              key={card.label}
              label={card.label}
              value={
                card.label === 'Total members' ? stats.total :
                card.label === 'Active members' ? stats.active :
                card.label === 'Returning Members' ? stats.returning :
                stats.newThisMonth
              }
              change={
                card.label === 'Total members' ? `${stats.active} active` :
                card.label === 'Active members' ? `${Math.round(stats.active / (stats.total || 1) * 100)}%` :
                card.label === 'Returning Members' ? `${stats.needsAttention} need attention` :
                undefined
              }
              changeLabel={
                card.label === 'Active members' ? 'of total' :
                card.label === 'Total members' ? 'this month' :
                card.label === 'Returning Members' ? 'to follow up' :
                undefined
              }
              positive={card.label !== 'New This Month'}
              color={card.color}
              icon={card.icon}
              index={i}
            />
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              <span className="font-semibold text-[#111827]">Members</span>{' '}
              <span className="text-[#6B7280]">– {filtered.length} of {allMembers.length} members</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 w-44"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border rounded-lg hover:bg-gray-50 transition-colors ${showFilters ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
            >
              <SlidersHorizontal size={15} className="text-[#6B7280]" />
            </button>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
            >
              <option value="All">All status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  deptFilter === dept
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-[#6B7280] border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Phone', 'Email', 'Gender', 'Department', 'Marital Status', 'Status'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => {
                const active = isActive(member)
                return (
                  <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#374151]">{member.name}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{member.phone}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{member.email}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{member.gender}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{member.department}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{member.maritalStatus}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                        active ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-600'
                      }`}>
                        {active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  )
}
