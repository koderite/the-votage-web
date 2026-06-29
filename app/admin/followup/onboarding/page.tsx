'use client'

export default function EngagementsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#111827]">Onboarding</h1>
      <p className="text-[#6B7280]">Coming soon.</p>
    </div>
  )
}

/*
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, AlertTriangle, Leaf, Timer, ChevronDown, Phone, MessageSquare, Mail } from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { FollowUpModal } from '@/components/admin/followup/FollowUpModal'
import {
  getOnboardingMembers, getContactAttempts, getNeedAttentionCards, getBirthdays,
  allMembers, computeStats, needsAttention, isNewThisMonth,
} from '@/components/admin/data/members'

const badgeStyle: Record<string, string> = {
  'New': 'bg-green-100 text-green-700',
  'In progress': 'bg-amber-100 text-amber-700',
  'Need attention': 'bg-orange-100 text-orange-700',
  'Completed': 'bg-emerald-100 text-emerald-700',
}

const badgeIcon: Record<string, React.ReactNode> = {
  'New': <Leaf size={11} />,
  'In progress': <Timer size={11} />,
  'Need attention': <AlertTriangle size={11} />,
  'Completed': null,
}

type ContactType = 'call' | 'sms' | 'email' | 'prayer'

function ContactIcon({ type }: { type: ContactType }) {
  const base = 'h-8 w-8 rounded-full flex items-center justify-center shrink-0'
  if (type === 'call') return <div className={`${base} bg-red-100`}><Phone size={14} className="text-red-500" /></div>
  if (type === 'sms') return <div className={`${base} bg-blue-100`}><MessageSquare size={14} className="text-blue-500" /></div>
  if (type === 'email') return <div className={`${base} bg-indigo-100`}><Mail size={14} className="text-indigo-500" /></div>
  return <div className={`${base} bg-amber-50`}><span className="text-sm">🙏</span></div>
}

function SectionDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
      {label}
      <ChevronDown size={14} />
    </button>
  )
}

function OriginalEngagementsPage() {
  const [followUpMember, setFollowUpMember] = useState<{ name: string; context: string } | null>(null)

  const stats = computeStats(allMembers)
  const onboardingMembers = getOnboardingMembers()
  const contactAttempts = getContactAttempts()
  const needAttentionCards = getNeedAttentionCards()
  const birthdays = getBirthdays()

  return (
    <>
      {followUpMember && (
        <FollowUpModal member={followUpMember} onClose={() => setFollowUpMember(null)} />
      )}

      // Greeting + status pills
      <div className="flex flex-wrap items-start justify-between gap-4">
        <AdminGreeting />
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            <AlertTriangle size={14} /> Needs attention({stats.needsAttention})
          </span>
          <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Leaf size={14} /> New this month({stats.newThisMonth})
          </span>
          <span className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <Timer size={14} /> In progress({stats.active})
          </span>
        </div>
      </div>

      // Info row
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="flex items-center gap-3"
      >
        <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
          <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
        </div>
        <p className="text-sm text-[#374151]">
          <span className="font-semibold">Follow up Insight</span>
          {' – '}
          <span className="text-[#6B7280]">Absentes, Birthdays, and Contact log</span>
        </p>
      </motion.div>

      // Top 2-panel row
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        // New members onboarding
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <h3 className="text-[15px] font-semibold text-[#111827] mb-1">New members onboarding</h3>
          <p className="text-[12px] text-[#9CA3AF] mb-5">Complete progress per new member</p>

          <div className="space-y-5">
            {onboardingMembers.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-[#374151]">{m.name}</span>
                  <span className="text-sm text-[#9CA3AF]">{m.percent}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full transition-all"
                    style={{ width: `${m.percent}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {m.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badgeStyle[badge]}`}
                    >
                      {badgeIcon[badge]}
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        // Contacts attempts - right
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] font-semibold text-[#111827]">Contacts attempts</h3>
            <SectionDropdown label="Last 7 days" />
          </div>
          <p className="text-[12px] text-[#9CA3AF] mb-5">Recent call, messages and visits</p>

          <div className="space-y-4 overflow-y-auto max-h-105 pr-1">
            {contactAttempts.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <ContactIcon type={c.icon} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#374151] leading-snug">{c.text}</p>
                </div>
                <span className="text-[12px] text-[#9CA3AF] shrink-0">{c.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      // Bottom 2-panel row
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        // Contacts attempts – need attention
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] font-semibold text-[#111827]">Contacts attempts</h3>
            <SectionDropdown label="Last 7 days" />
          </div>
          <p className="text-[12px] text-[#9CA3AF] mb-5">Recent call, messages and visits</p>

          <div className="space-y-4">
            {needAttentionCards.map((card, i) => (
              <button
                key={i}
                onClick={() =>
                  setFollowUpMember({
                    name: card.name,
                    context: 'Absent for 3 weeks. Last seen 3 weeks ago. Needs follow-up.',
                  })
                }
                className="w-full flex items-start gap-3 text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-sm font-semibold text-[#374151]">
                  {card.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#111827]">{card.name}</p>
                  <p className="text-[12px] text-[#9CA3AF]">{card.lastSeen}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-[11px] font-medium">
                    <AlertTriangle size={10} /> Need attention
                  </span>
                </div>
                <span className="text-[12px] text-[#9CA3AF] shrink-0">{card.time}</span>
              </button>
            ))}
          </div>
        </motion.div>

        // Birth Day & Anniversaries
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] font-semibold text-[#111827]">Birth Day & Anniversaries</h3>
            <SectionDropdown label="Last 7 days" />
          </div>
          <p className="text-[12px] text-[#9CA3AF] mb-5">Recent call, messages and visits</p>

          <div className="space-y-5">
            {birthdays.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-lg">
                  {b.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[#111827]">{b.name}</p>
                  <p className="text-[12px] text-[#9CA3AF]">{b.note}</p>
                </div>
                <span className="text-[12px] text-[#9CA3AF] shrink-0">{b.day}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
*/
