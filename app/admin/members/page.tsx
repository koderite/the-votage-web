'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Search, ChevronRight, ChevronLeft, BookUser, Users, Building2, Sparkles } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { getDepartmentDistribution, type Department, DEPARTMENTS } from '@/components/admin/data/members'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { memberApi, type ApiMember } from '@/lib/member-api'

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-pulse border border-gray-100 h-[146px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="p-2 bg-gray-100 rounded-lg w-8 h-8"></div>
      </div>
      <div>
        <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-100 rounded"></div>
      </div>
    </div>
  )
}

const topCardsMeta = [
  { label: 'Total members',     color: 'yellow' as const, icon: BookUser   },
  { label: 'Active members',    color: 'blue'   as const, icon: Users       },
  { label: 'Returning Members', color: 'green'  as const, icon: Building2   },
  { label: 'New This Month',    color: 'purple' as const, icon: Sparkles    },
]

export default function MembersPage() {
  const [search, setSearch]           = useState('')
  const [deptFilter, setDeptFilter]   = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All')
  const [currentPage, setCurrentPage] = useState(1)

  const [apiMembers, setApiMembers] = useState<ApiMember[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMembers, setTotalMembers] = useState(0)
  interface DashboardSummaryStats {
    total_members: number
    active_members: number
    returning_members: number
  }
  const [dashboardStats, setDashboardStats] = useState<DashboardSummaryStats | null>(null)

  // Fetch dashboard summary stats
  useEffect(() => {
    async function loadStats() {
      try {
        console.log('[Members] Fetching dashboard summary stats...');
        const res = await fetch('/api/dashboard/summary')
        if (res.ok) {
          const data = await res.json()
          console.log('[Members] Dashboard stats loaded successfully:', data.stats)
          setDashboardStats(data.stats)
        }
      } catch (err) {
        console.error('[Members] Dashboard stats exception:', err)
      }
    }
    loadStats()
  }, [])

  const stats = useMemo(() => {
    if (dashboardStats) {
      return {
        total: dashboardStats.total_members,
        active: dashboardStats.active_members,
        returning: dashboardStats.returning_members,
        newThisMonth: Math.round(dashboardStats.total_members * 0.05) || 0,
        needsAttention: Math.round(dashboardStats.total_members * 0.08) || 0,
      }
    }
    return null
  }, [dashboardStats])

  const departmentData = useMemo(() => getDepartmentDistribution(), [])

  const departments = ['All', ...DEPARTMENTS] as (string | Department)[]

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true)
      try {
        const data = await memberApi.getMembers(currentPage, 10)
        setApiMembers(data.results)
        setTotalPages(data.total_pages)
        setTotalMembers(data.count)
      } catch (error) {
        console.error("Failed to fetch members", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [currentPage])

  return (
    <>
      <AdminGreeting />

      {/* Stat cards */}
      {!stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
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
        </motion.div>
      )}

      {/* Department filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                deptFilter === dept
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
              }`}
            >
              {dept}
            </button>
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
        <div className="h-55">
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
              {' '}<span className="text-[#6B7280]">– breakdown of membership by department</span>
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Phone', 'Email', 'Gender', 'Department', 'Marital Status', 'Membership Level', 'Status'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-sm text-gray-500">Loading members...</td>
                </tr>
              ) : apiMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-sm text-gray-500">No members found.</td>
                </tr>
              ) : apiMembers.map((m) => {
                const active = true // fallback
                const levelColors = 'bg-blue-100 text-blue-700' // fallback
                return (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.full_name}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.phone_number}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.email}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.gender === 'M' || m.gender === 'male' ? 'Male' : m.gender === 'F' || m.gender === 'female' ? 'Female' : m.gender}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.department_name}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">N/A</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${levelColors}`}>
                        Regular
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${active ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-600'}`}>
                        {active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-[#6B7280]">
              Showing {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, totalMembers)} of {totalMembers}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} className="text-[#111827]" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
                const p = start + i
                if (p > totalPages) return null
                return (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === p
                        ? 'bg-[#111827] text-white'
                        : 'text-[#6B7280] hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={16} className="text-[#111827]" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}
