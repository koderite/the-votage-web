import { useState, useMemo } from 'react';
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
import { Lightbulb } from 'lucide-react';
import type { AttendanceDataPoint } from '../types/index';

interface AttendanceChartProps {
  data: AttendanceDataPoint[];
}

const periods = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'] as const;
type Period = (typeof periods)[number];

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

function aggregateData(data: AttendanceDataPoint[], period: Period): AttendanceDataPoint[] {
  if (period === 'Weekly') return data;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const quarterNames = ['Jan–Mar', 'Apr–Jun', 'Jul–Sep', 'Oct–Dec'];
  const yearNames = ['2023', '2024', '2025', '2026'];

  const groupSize = period === 'Monthly' ? 4 : period === 'Quarterly' ? 12 : 48;
  const labels = period === 'Monthly' ? monthNames : period === 'Quarterly' ? quarterNames : yearNames;
  const result: AttendanceDataPoint[] = [];

  for (let i = 0; i < data.length && result.length < labels.length; i += groupSize) {
    const chunk = data.slice(i, i + groupSize);
    const sum = chunk.reduce((acc, d) => acc + d.value, 0);
    const avg = Math.round(sum / chunk.length);
    result.push({ time: labels[result.length], value: avg });
  }
  return result;
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Weekly');

  const chartData = useMemo(() => aggregateData(data, selectedPeriod), [data, selectedPeriod]);
  const peakPoint = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { time: '', value: 0 };
    }
    return chartData.reduce((max, point) => (point.value > max.value ? point : max), chartData[0]);
  }, [chartData]);

  const isEmpty = !data || data.length === 0 || data.every(d => d.value === 0)

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
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
        </div>
        <div className="flex flex-col items-center justify-center h-[320px]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="30" width="70" height="55" rx="6" stroke="#E5E7EB" strokeWidth="2" fill="#FAFAFA"/>
            <path d="M15 38h70" stroke="#E5E7EB" strokeWidth="2"/>
            <circle cx="50" cy="60" r="10" stroke="#D1D5DB" strokeWidth="2"/>
            <path d="M46 60h8M50 56v8" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
            <rect x="32" y="76" width="36" height="3" rx="1.5" fill="#E5E7EB"/>
          </svg>
          <p className="mt-3 text-sm text-[#9CA3AF]">No attendance data available</p>
        </div>
      </motion.div>
    )
  }

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
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                period === selectedPeriod
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
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
            {chartData.length > 0 && peakPoint.time && (
              <>
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
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}