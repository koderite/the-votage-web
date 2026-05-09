import type { StatCardData } from '../../types/index';
import { StatCard } from './StatCard';

interface StatsRowProps {
  data: StatCardData[];
}

export function StatsRow({ data }: StatsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {data.map((stat, index) => (
        <StatCard
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
  );
}