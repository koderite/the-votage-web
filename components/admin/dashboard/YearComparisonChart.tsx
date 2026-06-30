import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ComparisonData } from '../types/index';

interface YearComparisonChartProps {
  data: ComparisonData;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1D29] text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-[12px]" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function CustomLegend() {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
        <span className="text-[13px] text-[#111827]">2024</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]" />
        <span className="text-[13px] text-[#111827]">2025</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]" />
        <span className="text-[13px] text-[#111827]">2026</span>
      </div>
    </div>
  );
}

export function YearComparisonChart({ data }: YearComparisonChartProps) {
  const isEmpty = !data || data.labels.length === 0 || data.series.every(s => s.data.every(v => v === 0))

  const chartData = isEmpty ? [] : data.labels.map((label: string, index: number) => ({
    label,
    series1: data.series[0].data[index],
    series2: data.series[1].data[index],
    series3: data.series[2].data[index],
  }));

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <h3 className="text-[15px] font-semibold text-[#111827] mb-2">Year to year comparison</h3>
        <div className="flex flex-col items-center justify-center h-[240px]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="30" width="70" height="55" rx="6" stroke="#E5E7EB" strokeWidth="2" fill="#FAFAFA"/>
            <path d="M15 38h70" stroke="#E5E7EB" strokeWidth="2"/>
            <circle cx="50" cy="60" r="10" stroke="#D1D5DB" strokeWidth="2"/>
            <path d="M46 60h8M50 56v8" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
            <rect x="32" y="76" width="36" height="3" rx="1.5" fill="#E5E7EB"/>
          </svg>
          <p className="mt-3 text-sm text-[#9CA3AF]">No comparison data available</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <h3 className="text-[15px] font-semibold text-[#111827] mb-2">Year to year comparison</h3>
      <CustomLegend />
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, 1600]}
              ticks={[0, 400, 800, 1200, 1600]}
              tickFormatter={(value) => String(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="series1"
              name="2024"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={{ fill: '#3B82F6', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="series2"
              name="2025"
              stroke="#22C55E"
              strokeWidth={2.5}
              dot={{ fill: '#22C55E', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#22C55E', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="series3"
              name="2026"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              dot={{ fill: '#8B5CF6', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}