'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { DEPARTMENTS, type Member, type Gender, type MaritalStatus, type Department } from '@/components/admin/data/members'

interface EditMemberModalProps {
  member: Member
  onClose: () => void
  onSave: (id: number, data: { name: string; phone: string; email: string; gender: string; department: string; maritalStatus: string }) => void
}

export function EditMemberModal({ member, onClose, onSave }: EditMemberModalProps) {
  const inputClass =
    'w-full px-3 py-3 bg-gray-50 rounded-lg text-sm text-black placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 border border-transparent'
  const nameParts = member.name.split(' ')
  const [form, setForm] = useState({
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: member.email,
    phone: member.phone,
    gender: member.gender,
    department: member.department,
    maritalStatus: member.maritalStatus,
  })

  function handleSubmit() {
    if (!form.firstName) return
    onSave(member.id, {
      name: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.phone,
      email: form.email,
      gender: form.gender,
      department: form.department,
      maritalStatus: form.maritalStatus,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>

        <h2 className="text-xl font-bold text-[#111827] mb-1">Edit Member</h2>
        <p className="text-sm text-[#6B7280] mb-6">Update member details</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">First Name</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="First name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Last name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                type="email"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0803 000 0000"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Gender</label>
              <div className="relative">
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
                  className={`${inputClass} appearance-none pr-8`}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="col-span-1">
              <label className="text-sm text-[#374151] mb-1.5 block">Marital Status</label>
              <div className="relative">
                <select
                  value={form.maritalStatus}
                  onChange={(e) => setForm({ ...form, maritalStatus: e.target.value as MaritalStatus })}
                  className={`${inputClass} appearance-none pr-8`}
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Widowed</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#374151] mb-1.5 block">Department</label>
              <div className="relative">
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      department: e.target.value as Department,
                    })
                  }
                  className={`${inputClass} appearance-none pr-8`}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
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
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
