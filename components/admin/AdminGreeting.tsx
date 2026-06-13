'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'

function timeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function AdminGreeting() {
  const { user } = useAuth()
  const name = user?.username ?? 'Admin'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <h2 className="text-xl font-semibold text-[#111827]">
        {timeBasedGreeting()}, {name}!
      </h2>
      <p className="text-sm text-[#6B7280] mt-1">
        Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </motion.div>
  )
}
