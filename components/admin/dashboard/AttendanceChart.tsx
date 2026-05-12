import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { Lightbulb, ChevronDown } from 'lucide-react';
import type { AttendanceDataPoint } from '../types/index';

interface AttendanceChartProps {
  data: AttendanceDataPoint[];
}

const periods = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1D29] text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-medium">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const peakPoint = data.reduce((max, point) => (point.value > max.value ? point : max), data[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Lightbulb size={18} className="text-yellow-500" fill="currentColor" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#111827]">
              Attendance Growth rate ~ todays evaluation metric
            </h3>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#111827] hover:bg-gray-50 transition-colors"
          >
            {selectedPeriod}
            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    period === selectedPeriod ? 'text-[#3B82F6] font-medium' : 'text-[#111827]'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              interval={3}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[600, 2200]}
              ticks={[600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200]}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(1)}K` : String(value)
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#attendanceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
            />
            <ReferenceDot
              x={peakPoint.time}
              y={peakPoint.value}
              r={4}
              fill="#3B82F6"
              stroke="#fff"
              strokeWidth={2}
              label={{
                value: peakPoint.value.toLocaleString(),
                position: 'top',
                fill: '#fff',
                fontSize: 12,
                fontWeight: 500,
              }}
            />
            <text
              x={peakPoint.time}
              y={peakPoint.value - 15}
              textAnchor="middle"
              fill="#fff"
              fontSize={12}
              fontWeight={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}