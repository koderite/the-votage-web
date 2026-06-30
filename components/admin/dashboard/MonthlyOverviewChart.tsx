import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyOverviewChartProps {
  data: {
    months: string[];
    series1: number[];
    series2: number[];
    series3: number[];
  };
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

export function MonthlyOverviewChart({ data }: MonthlyOverviewChartProps) {
  const isEmpty = !data || data.months.length === 0 || data.series1.every(v => v === 0)

  const chartData = isEmpty ? [] : data.months.map((month, index) => ({
    month,
    series1: data.series1[index],
    series2: data.series2[index],
    series3: data.series3[index],
  }));

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <h3 className="text-[15px] font-semibold text-[#111827] mb-6">Monthly Overview</h3>
        <div className="flex flex-col items-center justify-center h-[280px]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="30" width="70" height="55" rx="6" stroke="#E5E7EB" strokeWidth="2" fill="#FAFAFA"/>
            <path d="M15 38h70" stroke="#E5E7EB" strokeWidth="2"/>
            <circle cx="50" cy="60" r="10" stroke="#D1D5DB" strokeWidth="2"/>
            <path d="M46 60h8M50 56v8" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
            <rect x="32" y="76" width="36" height="3" rx="1.5" fill="#E5E7EB"/>
          </svg>
          <p className="mt-3 text-sm text-[#9CA3AF]">No monthly data available</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <h3 className="text-[15px] font-semibold text-[#111827] mb-6">Monthly Overview</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
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
            <Bar
              dataKey="series1"
              name="2024"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="series2"
              name="2025"
              fill="#22C55E"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="series3"
              name="2026"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}