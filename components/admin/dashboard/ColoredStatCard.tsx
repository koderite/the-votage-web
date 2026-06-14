'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'

const variants = {
  yellow: { iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500' },
  blue:   { iconBg: 'bg-blue-50',   iconColor: 'text-blue-500'   },
  green:  { iconBg: 'bg-green-50',  iconColor: 'text-green-500'  },
  purple: { iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
}

interface ColoredStatCardProps {
  label: string
  value: string | number
  subtitle?: string
  change?: string
  changeLabel?: string
  positive?: boolean
  color: 'yellow' | 'blue' | 'green' | 'purple'
  icon: LucideIcon
  index: number
}

export function ColoredStatCard({
  label,
  value,
  subtitle,
  change,
  changeLabel,
  positive = true,
  color,
  icon: Icon,
  index,
}: ColoredStatCardProps) {
  const v = variants[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[13px] font-medium text-[#6B7280]">{label}</p>
        <div className={`p-2 rounded-lg ${v.iconBg}`}>
          <Icon size={16} className={v.iconColor} />
        </div>
      </div>
      <p className="text-[32px] font-bold text-[#111827] leading-tight">{value}</p>
      {subtitle && <p className="text-[12px] text-[#9CA3AF] mt-1">{subtitle}</p>}
      {change && (
        <div className="flex items-center gap-1 mt-2">
          {positive ? (
            <TrendingUp size={13} className="text-[#22C55E]" />
          ) : (
            <TrendingDown size={13} className="text-[#EF4444]" />
          )}
          <span className={`text-[12px] font-medium ${positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {change}{changeLabel ? ` ${changeLabel}` : ''}
          </span>
        </div>
      )}
    </motion.div>
  )
}
