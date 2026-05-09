import type { AttendanceDataPoint, MonthlyData, ComparisonData, StatCardData } from '../types';

export const statCardsData: StatCardData[] = [
  {
    label: 'Average Weekly',
    value: 1640,
    change: '6.2%',
    changeLabel: 'vs last week',
    positive: true,
  },
  {
    label: 'Peak attendance',
    value: 2152,
    date: 'Mar 5, week 11',
  },
  {
    label: 'Lowest drop-off',
    value: 165,
    change: '39%',
    changeLabel: 'from peak',
    positive: false,
  },
  {
    label: 'Year to year growth',
    value: '+ 8.4%',
    change: 'vs 2.1',
    changeLabel: 'prior to last year',
    positive: true,
  },
];

export const attendanceData: AttendanceDataPoint[] = [
  { time: 'W4', value: 620 },
  { time: 'W5', value: 780 },
  { time: 'W6', value: 820 },
  { time: 'W7', value: 1050 },
  { time: 'W8', value: 980 },
  { time: 'W9', value: 920 },
  { time: 'W10', value: 1180 },
  { time: 'W11', value: 850 },
  { time: 'W12', value: 920 },
  { time: 'W13', value: 1100 },
  { time: 'W14', value: 1250 },
  { time: 'W15', value: 1080 },
  { time: 'W16', value: 1664 },
  { time: 'W17', value: 920 },
  { time: 'W18', value: 1280 },
  { time: 'W19', value: 1180 },
  { time: 'W20', value: 1150 },
  { time: 'W21', value: 1220 },
  { time: 'W22', value: 1320 },
  { time: 'W23', value: 1080 },
  { time: 'W24', value: 1150 },
  { time: 'W25', value: 1280 },
  { time: 'W26', value: 1350 },
  { time: 'W27', value: 1420 },
  { time: 'W28', value: 720 },
  { time: 'W29', value: 880 },
  { time: 'W30', value: 780 },
  { time: 'W31', value: 1150 },
  { time: 'W32', value: 1180 },
  { time: 'W33', value: 1480 },
  { time: 'W34', value: 1420 },
  { time: 'W35', value: 1380 },
  { time: 'W36', value: 1550 },
  { time: 'W37', value: 1320 },
  { time: 'W38', value: 1280 },
  { time: 'W39', value: 1350 },
  { time: 'W40', value: 1420 },
  { time: 'W41', value: 1080 },
  { time: 'W42', value: 1350 },
  { time: 'W43', value: 1420 },
  { time: 'W44', value: 1320 },
  { time: 'W45', value: 1380 },
  { time: 'W46', value: 1350 },
  { time: 'W47', value: 1280 },
  { time: 'W48', value: 1450 },
];

export const monthlyData: MonthlyData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series1: [7000, 6200, 7100, 6300, 6200, 6300, 6200, 6100, 6300, 6900, 5300, 5700],
  series2: [5500, 5200, 6000, 5400, 5700, 5600, 5700, 6400, 5600, 6100, 4500, 4900],
};

export const comparisonData: ComparisonData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
  series: [
    { name: '2024', data: [8200, 15500, 12800, 15500, 19600], color: '#3B82F6' },
    { name: '2024', data: [8000, 13500, 11200, 11500, 14800], color: '#22C55E' },
    { name: '2025', data: [4200, 11500, 8000, 9500, 19000], color: '#8B5CF6' },
  ],
};