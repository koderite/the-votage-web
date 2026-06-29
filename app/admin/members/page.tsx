'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Search, SlidersHorizontal, Plus, BookUser, Users, Building2, Sparkles, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AddMemberModal } from '@/components/admin/members/AddMemberModal'
import { DEPARTMENTS, type Department } from '@/components/admin/data/members'

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

  // API states
  const [members, setMembers] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardStats, setDashboardStats] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch dashboard summary stats
  useEffect(() => {
    async function loadStats() {
      try {
        console.log('[Frontend] Fetching dashboard summary stats...');
        const res = await fetch('/api/dashboard/summary')
        if (res.ok) {
          const data = await res.json()
          console.log('[Frontend] Dashboard stats loaded successfully:', data.stats)
          setDashboardStats(data.stats)
          setError(null)
        } else {
          console.warn('[Frontend] Dashboard stats fetch returned non-OK status:', res.status)
          if (res.status === 401) {
            setError('Unauthorized. Please sign in to access admin data.')
          } else {
            setError(`Failed to retrieve dashboard stats (Status: ${res.status}).`)
          }
        }
      } catch (err) {
        console.error('[Frontend] Failed to load dashboard stats:', err)
        setError('Network error: Unable to connect to authentication server.')
      }
    }
    loadStats()
  }, [])

  // Fetch members list
  useEffect(() => {
    let active = true
    async function loadMembers() {
      setIsLoading(true)
      try {
        const query = new URLSearchParams()
        query.append('page', String(page))
        query.append('page_size', '10')
        if (search) {
          query.append('search', search)
        }
        if (statusFilter !== 'All') {
          query.append('status', statusFilter)
        }

        console.log(`[Frontend] Fetching members list (Page: ${page}, Search: "${search}", Status: "${statusFilter}")...`);
        const res = await fetch(`/api/members?${query.toString()}`)
        if (res.ok && active) {
          const data = await res.json()
          console.log('[Frontend] Members list received from backend:', data)
          setMembers(data.results || [])
          setTotalPages(data.total_pages || 1)
          setTotalCount(data.count || 0)
          setError(null)
        } else if (active) {
          console.warn(`[Frontend] Members fetch failed with status ${res.status}.`);
          if (res.status === 401) {
            setError('Unauthorized. Please sign in to access admin data.')
          } else {
            setError(`Failed to retrieve members list (Status: ${res.status}).`)
          }
        }
      } catch (err) {
        console.error('[Frontend] Failed to load members:', err)
        if (active) setError('Network error: Connection to backend API timed out.')
      } finally {
        if (active) setIsLoading(false)
      }
    }
    loadMembers()
    return () => { active = false }
  }, [page, search, statusFilter])

  // Reset page when filter changes
  useEffect(() => {
    setPage(1)
  }, [search, statusFilter, deptFilter])

  // Filter members list based on client-side department selection
  const displayedMembers = useMemo(() => {
    if (deptFilter === 'All') return members
    return members.filter((m) => m.department_name === deptFilter)
  }, [members, deptFilter])

  const displayStats = useMemo(() => {
    if (dashboardStats) {
      return {
        total: dashboardStats.total_members,
        active: dashboardStats.active_members,
        returning: dashboardStats.returning_members,
        newThisMonth: Math.round(dashboardStats.total_members * 0.05) || 0,
        needsAttention: Math.round(dashboardStats.total_members * 0.08) || 0,
      }
    }
    return { total: 0, active: 0, returning: 0, newThisMonth: 0, needsAttention: 0 }
  }, [dashboardStats])

  const departments = ['All', ...DEPARTMENTS] as (string | Department)[]

  // Callback to handle member creation
  async function handleAddMember(member: { name: string; phone: string; email: string; gender: string; department: string; maritalStatus: string; joined: string }) {
    try {
      const nameParts = member.name.trim().split(/\s+/)
      const firstName = nameParts[0] || 'Unknown'
      const lastName = nameParts.slice(1).join(' ') || 'Unknown'

      const payload = {
        first_name: firstName,
        last_name: lastName,
        phone_number: member.phone,
        email: member.email,
        gender: member.gender,
        date_joined: new Date().toISOString(),
      };
      console.log('[Frontend] POSTing new member payload to /api/members:', payload);

      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const created = await res.json();
        console.log('[Frontend] Member created successfully in backend:', created);
        setError(null)
      } else {
        console.warn('[Frontend] Failed to create member. Status:', res.status);
        setError(`Failed to create member (Status: ${res.status}).`)
      }

      // Refetch page
      setPage(1)
    } catch (err) {
      console.error('[Frontend] Failed to create member:', err)
      setError('Network error: Unable to create member on the backend.')
    }
  }

  return (
    <>
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMember}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <AdminGreeting />
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] transition-colors self-start sm:self-auto shadow-sm"
        >
          Add member
          <Plus size={15} />
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6 shadow-sm"
        >
          <AlertTriangle size={18} className="text-red-500 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {/* Stat cards */}
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
              card.label === 'Total members' ? displayStats.total :
              card.label === 'Active members' ? displayStats.active :
              card.label === 'Returning Members' ? displayStats.returning :
              displayStats.newThisMonth
            }
            change={
              card.label === 'Total members' ? `${displayStats.active} active` :
              card.label === 'Active members' ? `${Math.round(displayStats.active / (displayStats.total || 1) * 100)}%` :
              card.label === 'Returning Members' ? `${displayStats.needsAttention} need attention` :
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
              <span className="text-[#6B7280]">– {totalCount} total members</span>
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
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Name', 'Phone', 'Email', 'Gender', 'Department', 'Marital Status', 'Status'].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-sm text-red-500 font-medium">
                      ⚠️ {error}
                    </td>
                  </tr>
                ) : displayedMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-sm text-[#9CA3AF]">
                      No members found
                    </td>
                  </tr>
                ) : (
                  displayedMembers.map((member) => {
                    const id = member.id
                    const name = member.full_name || `${member.first_name} ${member.last_name}`
                    const phone = member.phone_number || '-'
                    const email = member.email || '-'
                    const gender = member.gender || '-'
                    const dept = member.department_name || 'Regular member'
                    const marital = '-'
                    const active = true

                    return (
                      <tr key={id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-[#374151]">{name}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{phone}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{email}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{gender}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{dept}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{marital}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                            active ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-600'
                          }`}>
                            {active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-[#6B7280]">
              Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, totalCount)} of {totalCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} className="text-[#111827]" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4))
                const p = start + i
                if (p > totalPages) return null
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-[#111827] text-white'
                        : 'text-[#6B7280] hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
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
