'use client'

import { useState } from 'react'
import { X, ChevronDown, Plus } from 'lucide-react'

interface AddMemberModalProps {
  onClose: () => void
}

const roles    = ['Viewer', 'Member', 'Leader', 'Admin']
const statuses = ['Pending', 'Active', 'Inactive']

export function AddMemberModal({ onClose }: AddMemberModalProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Viewer',
    status: 'Pending',
  })

  const inputClass =
    'w-full px-3 py-3 bg-gray-50 rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 border border-transparent'

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>

        <h2 className="text-xl font-bold text-[#111827] mb-1">Add New Members</h2>
        <p className="text-sm text-[#6B7280] mb-6">Fill in the details to register new member</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">First Name</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Ada"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Stella"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#374151] mb-1.5 block">Email Address</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="mike@gmail.com"
              type="email"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Role</label>
              <div className="relative">
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className={`${inputClass} appearance-none pr-8`}
                >
                  {roles.map((r) => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Status</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className={`${inputClass} appearance-none pr-8`}
                >
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Add member
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors">
            <Plus size={14} />
            Add member
          </button>
        </div>
      </div>
    </div>
  )
}
