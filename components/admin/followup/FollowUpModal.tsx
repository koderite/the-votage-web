'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface FollowUpModalProps {
  member: { name: string; context: string }
  onClose: () => void
}

const actions = [
  { label: 'Phone call',   emoji: '📞' },
  { label: 'Send SMS',     emoji: '💬' },
  { label: 'Send Email',   emoji: '✉️'  },
  { label: 'Log Prayers',  emoji: '🙏' },
]

export function FollowUpModal({ member, onClose }: FollowUpModalProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>

        <h2 className="text-xl font-bold text-[#111827] mb-1">Follow up – {member.name}</h2>
        <p className="text-sm text-[#6B7280] mb-8">{member.context}</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => setSelected(action.label)}
              className={`flex flex-col items-center justify-center gap-3 py-6 rounded-xl border-2 transition-all ${
                selected === action.label
                  ? 'border-[#111827] bg-gray-50'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-sm text-[#374151]">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={!selected}
            className="px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors disabled:opacity-50"
          >
            Save follow-up
          </button>
        </div>
      </div>
    </div>
  )
}
