import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  ClipboardCheck,
  Users,
  UserSearch,
  UserCog,
  UserPlus,
  Eye,
  Mail,
  UserPlus2,
  FileText,
  Settings,
  Building2,
  Trash2,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export interface NavGroup {
  label: string
  icon: LucideIcon
  items: NavItem[]
}

export type NavEntry = { type: 'item'; data: NavItem } | { type: 'group'; data: NavGroup } | { type: 'separator' }

export const navEntries: NavEntry[] = [
  { type: 'item', data: { href: '/a/dashboard', label: 'Dashboard', icon: LayoutDashboard } },
  {
    type: 'group',
    data: {
      label: 'Attendance',
      icon: TrendingUp,
      items: [
        { href: '/a/attendance/trend', label: 'Trend & Analytics', icon: TrendingUp },
        { href: '/a/attendance/breakdown', label: 'Service Breakdown', icon: BarChart3 },
        // { href: '/a/attendance/checkin', label: 'Check-In Activity', icon: ClipboardCheck },
      ],
    },
  },
  {
    type: 'group',
    data: {
      label: 'Members',
      icon: Users,
      items: [
        // { href: '/a/members/insights', label: 'Member Insights', icon: UserSearch },
        { href: '/a/members/manage', label: 'Manage Members', icon: UserCog },
      ],
    },
  },
  {
    type: 'group',
    data: {
      label: 'Visitors Report',
      icon: UserPlus,
      items: [
        { href: '/a/visitors/tracking', label: 'Visitors Tracking', icon: Eye },
        { href: '/a/visitors/metrics', label: 'First-Timer Metrics', icon: TrendingUp },
      ],
    },
  },
  { type: 'separator' },
  {
    type: 'group',
    data: {
      label: 'Follow-Up',
      icon: Mail,
      items: [
        { href: '/a/followup/onboarding', label: 'Onboarding', icon: UserPlus2 },
      ],
    },
  },
  { type: 'item', data: { href: '/a/reports', label: 'Reports', icon: FileText } },
  {
    type: 'group',
    data: {
      label: 'Administration',
      icon: Settings,
      items: [
        { href: '/a/aistration/add-edit', label: 'Add/Edit members', icon: UserPlus2 },
        { href: '/a/aistration/departments', label: 'Assign Departments', icon: Building2 },
        { href: '/a/aistration/delete', label: 'Delete a member', icon: Trash2 },
      ],
    },
  },
]
