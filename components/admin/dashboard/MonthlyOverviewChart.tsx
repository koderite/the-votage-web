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
  const chartData = data.months.map((month, index) => ({
    month,
    series1: data.series1[index],
    series2: data.series2[index],
    series3: data.series3[index],
  }));

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