'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Search, SlidersHorizontal, Plus, Pencil, Trash2, BookUser, Users, Building2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'
import { AddMemberModal } from '@/components/admin/members/AddMemberModal'
import { EditMemberModal } from '@/components/admin/members/EditMemberModal'
import { allMembers, computeStats, isActive, type Member, type Department } from '@/components/admin/data/members'

const topCardsMeta = [
  { label: 'Total members',     color: 'yellow' as const, icon: BookUser   },
  { label: 'Active members',    color: 'blue'   as const, icon: Users       },
  { label: 'Returning Members', color: 'green'  as const, icon: Building2   },
  { label: 'New This Month',    color: 'purple' as const, icon: Sparkles    },
]

export default function ManageMembersPage() {
  const [members, setMembers]         = useState<Member[]>(allMembers)
  const [search, setSearch]           = useState('')
  const [deptFilter, setDeptFilter]   = useState<string>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteId, setDeleteId]       = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [page, setPage]               = useState(1)
  const pageSize = 10

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchSearch = search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase())
      const matchDept = deptFilter === 'All' || m.department === deptFilter
      return matchSearch && matchDept
    })
  }, [members, search, deptFilter])

  const stats = useMemo(() => computeStats(filtered), [filtered])

  function confirmDelete(id: number) {
    setDeleteId(id)
  }

  function executeDelete() {
    if (deleteId !== null) {
      setMembers((prev) => prev.filter((m) => m.id !== deleteId))
      setDeleteId(null)
    }
  }

  const departments = ['All', ...new Set(allMembers.map(m => m.department))] as (string | Department)[]

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => { setPage(1) }, [search, deptFilter])

  function handleEditSave(id: number, data: { name: string; phone: string; email: string; gender: string; department: string; maritalStatus: string }) {
    setMembers((prev) => prev.map((m) =>
      m.id === id ? { ...m, ...data, department: data.department as Department, gender: data.gender as 'Male' | 'Female', maritalStatus: data.maritalStatus as 'Single' | 'Married' | 'Widowed' } : m
    ))
  }

  let nextId = members.length + 1

  function handleAddMember(member: { name: string; phone: string; email: string; gender: string; department: string; maritalStatus: string; joined: string }) {
    const newMember: Member = {
      id: nextId++,
      name: member.name,
      phone: member.phone,
      email: member.email,
      gender: member.gender as 'Male' | 'Female',
      department: member.department as Department,
      membershipLevel: 'Regular',
      maritalStatus: member.maritalStatus as 'Single' | 'Married' | 'Widowed',
      joined: member.joined,
      attendance: [],
    }
    setMembers((prev) => [...prev, newMember])
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
            Add member <Plus size={15} />
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
              {' '}<span className="text-[#6B7280]">– {filtered.length} members</span>
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
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Phone', 'Email', 'Gender', 'Department', 'Marital Status', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((m) => {
                const active = isActive(m)
                return (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.name}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.phone}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.email}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.gender}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.department}</td>
                    <td className="py-3 px-4 text-sm text-[#374151]">{m.maritalStatus}</td>
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
                          onClick={() => setEditingMember(m)}
                          className="p-1.5 rounded-lg text-[#6B7280] hover:bg-blue-50 hover:text-blue-500 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => confirmDelete(m.id)}
                          className="p-1.5 rounded-lg text-[#6B7280] hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-[#6B7280]">
              Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
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
