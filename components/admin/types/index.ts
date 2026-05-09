export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: string;
  changeLabel?: string;
  positive?: boolean;
  date?: string;
}

export interface AttendanceDataPoint {
  time: string;
  value: number;
}

export interface MonthlyData {
  months: string[];
  series1: number[];
  series2: number[];
}

export interface ComparisonSeries {
  name: string;
  data: number[];
  color: string;
}

export interface ComparisonData {
  labels: string[];
  series: ComparisonSeries[];
}