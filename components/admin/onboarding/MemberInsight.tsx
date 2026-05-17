import { motion } from 'framer-motion';
import { Lightbulb, Search } from 'lucide-react';
import type { AttendanceDataPoint } from '../types/index';

interface AttendanceChartProps {
  data: AttendanceDataPoint[];
}

export function MemberInsight({ data }: AttendanceChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] min-h-120"
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Lightbulb
              size={18}
              className="text-yellow-500"
              fill="currentColor"
            />
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-[#111827]">
              Members Insight ~ breakdown of departmental attendance
            </h3>
          </div>
        </div>

        <div className="relative w-full max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search members..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
}