import type { AttendanceDataPoint, StatCardData } from '../types';

export const statCardsData: StatCardData[] = [
  {
    label: 'Average Weekly',
    value: 0,
    change: '0%',
    changeLabel: 'vs last week',
    positive: true,
  },
  {
    label: 'Peak attendance',
    value: 0,
    date: '-',
  },
  {
    label: 'Lowest drop-off',
    value: 0,
    change: '0%',
    changeLabel: 'from peak',
    positive: false,
  },
  {
    label: 'Year to year growth',
    value: '+ 0%',
    change: 'vs 0',
    changeLabel: 'prior to last year',
    positive: true,
  },
];

export const attendanceData: AttendanceDataPoint[] = [];

