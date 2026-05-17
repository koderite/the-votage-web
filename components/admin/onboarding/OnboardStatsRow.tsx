import type { StatCardData } from '../types/index';
import { OnboardStats } from './OnboardStats';
import { Lightbulb, ChevronDown } from 'lucide-react';

interface OnboardStatsRowProps {
  data: StatCardData[];
}

export function OnboardStatsRow({ data }: OnboardStatsRowProps) {
  return (
    <div className="bg-white p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
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
              Attendance Growth rate ~ todays evaluation metric
            </h3>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-[#111827] hover:bg-gray-50 transition-colors"
        >
          Add Member
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {data.map((stat, index) => (
          <OnboardStats
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeLabel={stat.changeLabel}
            positive={stat.positive}
            date={stat.date}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

