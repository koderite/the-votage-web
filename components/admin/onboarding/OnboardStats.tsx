import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { cn } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeLabel?: string;
  positive?: boolean;
  date?: string;
  index: number;
}

export function OnboardStats({ label, value, change, changeLabel, positive, date, index }: StatCardProps) {
  const isStringValue = typeof value === 'string';
  const numericValue = isStringValue ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const hasPlusPrefix = isStringValue && value.startsWith('+');
  const hasPercentSuffix = isStringValue && value.includes('%');

  const [animatedValue] = useCountUp(numericValue, 800);

  const renderValue = () => {
    const parts: string[] = [];
    if (hasPlusPrefix) parts.push('+ ');
    parts.push(animatedValue.toLocaleString());
    if (hasPercentSuffix) parts.push('%');
    return parts.join('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-md transition-shadow"
    >
      <p className="text-[13px] text-[#6B7280] mb-2">{label}</p>
      <p className="text-[32px] font-bold text-[#111827] leading-tight mb-2">
        {renderValue()}
      </p>
      {change && (
        <div className="flex items-center gap-1">
          {positive !== false ? (
            <TrendingUp size={14} className="text-[#22C55E]" />
          ) : (
            <ArrowUpRight size={14} className="text-[#EF4444]" />
          )}
          <span
            className={cn(
              'text-[13px] font-medium',
              positive !== false ? 'text-[#22C55E]' : 'text-[#EF4444]'
            )}
          >
            {change} {changeLabel}
          </span>
        </div>
      )}
      {date && (
        <p className="text-[13px] text-[#6B7280]">{date}</p>
      )}
    </motion.div>
  );
}