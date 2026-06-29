'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Search, SlidersHorizontal, Plus, Pencil, Trash2, BookUser, Users, Building2, Sparkles, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AddMemberModal } from '@/components/admin/members/AddMemberModal'
import { EditMemberModal } from '@/components/admin/members/EditMemberModal'
import { DEPARTMENTS, getDepartmentDistribution, type Department } from '@/components/admin/data/members'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const topCardsMeta = [
  { label: 'Total members',     color: 'yellow' as const, icon: BookUser   },
  { label: 'Active members',    color: 'blue'   as const, icon: Users       },
  { label: 'Returning Members', color: 'green'  as const, icon: Building2   },
  { label: 'New This Month',    color: 'purple' as const, icon: Sparkles    },
]

export default function ManageMembersPage() {
  const [members, setMembers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState<string>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [editingMember, setEditingMember] = useState<any | null>(null)
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
        console.log('[Management] Fetching dashboard summary stats...');
        const res = await fetch('/api/dashboard/summary')
        if (res.ok) {
          const data = await res.json()
          console.log('[Management] Dashboard stats loaded successfully:', data.stats)
          setDashboardStats(data.stats)
          setError(null)
        } else {
          console.warn('[Management] Dashboard stats fetch returned non-OK status:', res.status)
          if (res.status === 401) {
            setError('Unauthorized. Please sign in to access admin data.')
          } else {
            setError(`Failed to retrieve dashboard stats (Status: ${res.status}).`)
          }
        }
      } catch (err) {
        console.error('[Management] Failed to load dashboard stats:', err)
        setError('Network error: Unable to connect to authentication server.')
      }
    }
    loadStats()
  }, [])

  // Fetch members function
  const loadMembers = useCallback(async () => {
    setIsLoading(true)
    try {
      const query = new URLSearchParams()
      query.append('page', String(page))
      query.append('page_size', '10')
      if (search) {
        query.append('search', search)
      }

      console.log(`[Management] Fetching members list (Page: ${page}, Search: "${search}")...`);
      const res = await fetch(`/api/members?${query.toString()}`)
      if (res.ok) {
        const data = await res.json()
        console.log('[Management] Members list received from backend:', data)
        setMembers(data.results || [])
        setTotalPages(data.total_pages || 1)
        setTotalCount(data.count || 0)
        setError(null)
      } else {
        console.warn(`[Management] Members fetch failed with status ${res.status}.`);
        if (res.status === 401) {
          setError('Unauthorized. Please sign in to access admin data.')
        } else {
          setError(`Failed to retrieve members list (Status: ${res.status}).`)
        }
      }
    } catch (err) {
      console.error('[Management] Failed to load members:', err)
      setError('Network error: Connection to backend API timed out.')
    } finally {
      setIsLoading(false)
    }
  }, [page, search])

  // Fetch members list
  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  // Reset page when filter changes
  useEffect(() => {
    setPage(1)
  }, [search, deptFilter])

  const filtered = useMemo(() => {
    // Filter currently fetched page by department if selected
    return members.filter((m) => {
      const deptName = m.department_name || 'Regular member'
      return deptFilter === 'All' || deptName === deptFilter
    })
  }, [members, deptFilter])

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
    return {
      total: 1053,
      active: 842,
      returning: 124,
      newThisMonth: 53,
      needsAttention: 84,
    }
  }, [dashboardStats])

  const departmentData = useMemo(() => getDepartmentDistribution(), [])

  function confirmDelete(id: string | number) {
    setDeleteId(id)
  }

  async function executeDelete() {
    if (deleteId !== null) {
      try {
        console.log(`[Management] DELETE-ing member with ID ${deleteId} from backend...`);
        const res = await fetch(`/api/members/${deleteId}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          console.log(`[Management] Member with ID ${deleteId} deleted successfully.`);
          loadMembers()
          setError(null)
        } else {
          console.warn(`[Management] Failed to delete member ${deleteId}. Status:`, res.status);
          setError(`Failed to delete member (Status: ${res.status}).`)
        }
      } catch (err) {
        console.error('[Management] Failed to delete member:', err)
        setError('Network error: Unable to delete member from the backend.')
      } finally {
        setDeleteId(null)
      }
    }
  }

  const departments = ['All', ...DEPARTMENTS] as (string | Department)[]

  async function handleEditSave(id: string | number, data: { name: string; phone: string; email: string; gender: string; department: string; maritalStatus: string }) {
    try {
      const nameParts = data.name.trim().split(/\s+/)
      const firstName = nameParts[0] || 'Unknown'
      const lastName = nameParts.slice(1).join(' ') || 'Unknown'

      const payload = {
        first_name: firstName,
        last_name: lastName,
        phone_number: data.phone,
        email: data.email,
        gender: data.gender,
      };
      console.log(`[Management] PATCH-ing updated member ID ${id} to backend:`, payload);

      const res = await fetch(`/api/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const updated = await res.json();
        console.log('[Management] Member updated successfully in backend:', updated);
        loadMembers()
        setError(null)
      } else {
        console.warn(`[Management] Failed to update member ${id}. Status:`, res.status);
        setError(`Failed to update member (Status: ${res.status}).`)
      }
    } catch (err) {
      console.error('[Management] Failed to edit member:', err)
      setError('Network error: Unable to update member on the backend.')
    }
  }

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
      console.log('[Management] POSTing new member payload to /api/members:', payload);

      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const created = await res.json();
        console.log('[Management] Member created successfully in backend:', created);
        setPage(1)
        loadMembers()
        setError(null)
      } else {
        console.warn('[Management] Failed to create member. Status:', res.status);
        setError(`Failed to create member (Status: ${res.status}).`)
      }
    } catch (err) {
      console.error('[Management] Failed to create member:', err)
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

      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleEditSave}
        />
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#111827] mb-2">Remove member?</h3>
            <p className="text-sm text-[#6B7280] mb-6">This action cannot be undone. The member record will be permanently deleted.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={executeDelete} className="px-5 py-2.5 rounded-full text-sm text-white bg-red-500 hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <AdminGreeting />
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] transition-colors self-start sm:self-auto shadow-sm"
        >
          Add member <Plus size={15} />
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

      {/* Department breakdown chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
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

      {/* Members management table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              <span className="font-semibold text-[#111827]">Members</span>
              {' '}<span className="text-[#6B7280]">– {totalCount} members</span>
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border rounded-lg hover:bg-gray-50 transition-colors ${showFilters ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
            >
              <SlidersHorizontal size={15} className="text-[#6B7280]" />
            </button>
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
                  {['Name', 'Phone', 'Email', 'Gender', 'Department', 'Marital Status', 'Status', 'Actions'].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-sm text-red-500 font-medium">
                      ⚠️ {error}
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-sm text-[#9CA3AF]">
                      No members found
                    </td>
                  </tr>
                ) : (
                  filtered.map((m) => {
                    const id = m.id
                    const name = m.full_name || `${m.first_name} ${m.last_name}`
                    const phone = m.phone_number || '-'
                    const email = m.email || '-'
                    const gender = m.gender || '-'
                    const dept = m.department_name || 'Regular member'
                    const marital = '-'
                    const active = true

                    const modalMemberObj = {
                      id,
                      name,
                      phone,
                      email,
                      gender,
                      department: dept,
                      maritalStatus: marital,
                      joined: m.date_joined,
                      attendance: []
                    }

                    return (
                      <tr key={id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-[#374151]">{name}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{phone}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{email}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{gender}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{dept}</td>
                        <td className="py-3 px-4 text-sm text-[#374151]">{marital}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                            active ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-600'
                          }`}>
                            {active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingMember(modalMemberObj)}
                              className="p-1.5 rounded-lg text-[#6B7280] hover:bg-blue-50 hover:text-blue-500 transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => confirmDelete(id)}
                              className="p-1.5 rounded-lg text-[#6B7280] hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
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
