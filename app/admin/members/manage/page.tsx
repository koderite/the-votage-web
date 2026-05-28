'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Lightbulb, Search, SlidersHorizontal, ChevronRight, Plus, Pencil, Trash2, BookUser, Users, Building2, ClipboardList } from 'lucide-react'
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
  id: number; name: string; phone: string; email: string; gender: string; department: string; status: Status
}

const initialMembers: Member[] = [
  { id: 1,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active'   },
  { id: 2,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Active'   },
  { id: 3,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Inactive' },
  { id: 4,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Choir',          status: 'Active'   },
  { id: 5,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Regular member', status: 'Inactive' },
  { id: 6,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Media',          status: 'Active'   },
  { id: 7,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Media',          status: 'Inactive' },
  { id: 8,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Ushering',       status: 'Active'   },
  { id: 9,  name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'VIP',            status: 'Inactive' },
  { id: 10, name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Choir',          status: 'Active'   },
  { id: 11, name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Male',   department: 'Ushering',       status: 'Active'   },
  { id: 12, name: 'Bisoye Micheal', phone: '09022174444', email: 'bisoye@micheal.gmail.com', gender: 'Female', department: 'Protocol',       status: 'Active'   },
]

export default function ManageMembersPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'

  const [members, setMembers]         = useState<Member[]>(initialMembers)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteId, setDeleteId]       = useState<number | null>(null)

  const filtered = members.filter((m) => {
    const matchSearch = search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  function toggleStatus(id: number) {
    setMembers((prev) =>
      prev.map((m) => m.id === id ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m)
    )
  }

  function confirmDelete(id: number) {
    setDeleteId(id)
  }

  function executeDelete() {
    if (deleteId !== null) {
      setMembers((prev) => prev.filter((m) => m.id !== deleteId))
      setDeleteId(null)
    }
  }

  return (
    <>
      {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} />}

      {/* Delete confirmation dialog */}
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
          {topCards.map((card, i) => (
            <ColoredStatCard key={card.label} {...card} index={i} />
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
                {['Name', 'Phone No', 'Email', 'Gender', 'Department', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.name}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.phone}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.email}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.gender}</td>
                  <td className="py-3 px-4 text-sm text-[#374151]">{m.department}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(m.id)}
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                        m.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                      }`}
                    >
                      {m.status}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-[#6B7280] hover:bg-blue-50 hover:text-blue-500 transition-colors">
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
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  )
}
