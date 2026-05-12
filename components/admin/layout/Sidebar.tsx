'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  UserPlus,
  Mail,
  FileText,
  Settings,
  BarChart3,
  ClipboardCheck,
  UserSearch,
  UserCog,
  Eye,
  UserPlus2,
  Building2,
  Trash2,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { SidebarItem } from './SidebarItem'
import { SidebarGroup } from './SidebarGroup'
import { useSidebar } from '../contexts/SidebarContext'
import { cn } from '@/lib/utils'

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href} className="contents">
      {children}
    </Link>
  )
}

export function Sidebar() {
  const { collapsed, mobileOpen, toggleCollapse, closeMobile } = useSidebar()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/a/dashboard') return pathname === '/a' || pathname === '/a/dashboard'
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className={cn(
        'flex items-center h-16 border-b border-white/10',
        collapsed ? 'justify-center px-2' : 'px-4'
      )}>
        {!collapsed ? (
          <>
            <div className="flex-1">
              <h1 className="text-white font-bold text-sm tracking-wider uppercase leading-tight">
                THE VOTAGE<br />CHURCH
              </h1>
            </div>
            <button
              onClick={toggleCollapse}
              className="text-white/50 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <button onClick={toggleCollapse} className="text-white p-1">
            <Menu size={20} />
          </button>
        )}
      </div>

      <nav className={cn(
        'flex-1 overflow-y-auto py-4 space-y-1',
        collapsed ? 'px-2' : 'px-3'
      )}>
        <NavLink href="/a/dashboard" active={isActive('/a/dashboard')}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={isActive('/a/dashboard')} collapsed={collapsed} />
        </NavLink>

        <SidebarGroup icon={TrendingUp} label="Attendance" defaultOpen collapsed={collapsed}>
          <NavLink href="/a/attendance/trend" active={isActive('/a/attendance/trend')}>
            <SidebarItem icon={TrendingUp} label="Trend & Analytics" active={isActive('/a/attendance/trend')} collapsed={collapsed} />
          </NavLink>
          <NavLink href="/a/attendance/breakdown" active={isActive('/a/attendance/breakdown')}>
            <SidebarItem icon={BarChart3} label="Service Breakdown" active={isActive('/a/attendance/breakdown')} collapsed={collapsed} />
          </NavLink>
          <NavLink href="/a/attendance/checkin" active={isActive('/a/attendance/checkin')}>
            <SidebarItem icon={ClipboardCheck} label="Check-In Activity" active={isActive('/a/attendance/checkin')} collapsed={collapsed} />
          </NavLink>
        </SidebarGroup>

        <SidebarGroup icon={Users} label="Members" collapsed={collapsed}>
          <NavLink href="/a/members/insights" active={isActive('/a/members/insights')}>
            <SidebarItem icon={UserSearch} label="Member Insights" active={isActive('/a/members/insights')} collapsed={collapsed} />
          </NavLink>
          <NavLink href="/a/members/manage" active={isActive('/a/members/manage')}>
            <SidebarItem icon={UserCog} label="Manage Members" active={isActive('/a/members/manage')} collapsed={collapsed} />
          </NavLink>
        </SidebarGroup>

        <SidebarGroup icon={UserPlus} label="Visitors Report" collapsed={collapsed}>
          <NavLink href="/a/visitors/tracking" active={isActive('/a/visitors/tracking')}>
            <SidebarItem icon={Eye} label="Visitors Tracking" active={isActive('/a/visitors/tracking')} collapsed={collapsed} />
          </NavLink>
          <NavLink href="/a/visitors/metrics" active={isActive('/a/visitors/metrics')}>
            <SidebarItem icon={TrendingUp} label="First-Timer Metrics" active={isActive('/a/visitors/metrics')} collapsed={collapsed} />
          </NavLink>
        </SidebarGroup>

        {!collapsed && (
          <div className="px-3 pt-4 pb-2">
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
              ENGAGEMENT
            </span>
          </div>
        )}
        {collapsed && <div className="border-t border-white/10 my-3 mx-2" />}

        <SidebarGroup icon={Mail} label="Follow-Up" collapsed={collapsed}>
          <NavLink href="/a/followup/onboarding" active={isActive('/a/followup/onboarding')}>
            <SidebarItem icon={UserPlus2} label="Onboarding" active={isActive('/a/followup/onboarding')} collapsed={collapsed} />
          </NavLink>
        </SidebarGroup>

        <NavLink href="/a/reports" active={isActive('/a/reports')}>
          <SidebarItem icon={FileText} label="Reports" active={isActive('/a/reports')} collapsed={collapsed} />
        </NavLink>

        <SidebarGroup icon={Settings} label="Administration" collapsed={collapsed}>
          <NavLink href="/a/aistration/add-edit" active={isActive('/a/aistration/add-edit')}>
            <SidebarItem icon={UserPlus2} label="Add/Edit members" active={isActive('/a/aistration/add-edit')} collapsed={collapsed} />
          </NavLink>
          <NavLink href="/a/aistration/departments" active={isActive('/a/aistration/departments')}>
            <SidebarItem icon={Building2} label="Assign Departments" active={isActive('/a/aistration/departments')} collapsed={collapsed} />
          </NavLink>
          <NavLink href="/a/aistration/delete" active={isActive('/a/aistration/delete')}>
            <SidebarItem icon={Trash2} label="Delete a member" active={isActive('/a/aistration/delete')} collapsed={collapsed} />
          </NavLink>
        </SidebarGroup>
      </nav>
    </div>
  )

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeMobile} />
      )}

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full bg-[#1A1D29] z-50 hidden lg:flex flex-col"
      >
        {sidebarContent}
      </motion.aside>

      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: mobileOpen ? 0 : -260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full w-[260px] bg-[#1A1D29] z-50 lg:hidden flex flex-col"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <h1 className="text-white font-bold text-sm tracking-wider uppercase leading-tight">
            THE VOTAGE<br />CHURCH
          </h1>
          <button onClick={closeMobile} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavLink href="/a/dashboard" active={isActive('/a/dashboard')}>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={isActive('/a/dashboard')} />
          </NavLink>
          <SidebarGroup icon={TrendingUp} label="Attendance" defaultOpen>
            <NavLink href="/a/attendance/trend" active={isActive('/a/attendance/trend')}>
              <SidebarItem icon={TrendingUp} label="Trend & Analytics" active={isActive('/a/attendance/trend')} />
            </NavLink>
            <NavLink href="/a/attendance/breakdown" active={isActive('/a/attendance/breakdown')}>
              <SidebarItem icon={BarChart3} label="Service Breakdown" active={isActive('/a/attendance/breakdown')} />
            </NavLink>
            <NavLink href="/a/attendance/checkin" active={isActive('/a/attendance/checkin')}>
              <SidebarItem icon={ClipboardCheck} label="Check-In Activity" active={isActive('/a/attendance/checkin')} />
            </NavLink>
          </SidebarGroup>
          <SidebarGroup icon={Users} label="Members">
            <NavLink href="/a/members/insights" active={isActive('/a/members/insights')}>
              <SidebarItem icon={UserSearch} label="Member Insights" active={isActive('/a/members/insights')} />
            </NavLink>
            <NavLink href="/a/members/manage" active={isActive('/a/members/manage')}>
              <SidebarItem icon={UserCog} label="Manage Members" active={isActive('/a/members/manage')} />
            </NavLink>
          </SidebarGroup>
          <SidebarGroup icon={UserPlus} label="Visitors Report">
            <NavLink href="/a/visitors/tracking" active={isActive('/a/visitors/tracking')}>
              <SidebarItem icon={Eye} label="Visitors Tracking" active={isActive('/a/visitors/tracking')} />
            </NavLink>
            <NavLink href="/a/visitors/metrics" active={isActive('/a/visitors/metrics')}>
              <SidebarItem icon={TrendingUp} label="First-Timer Metrics" active={isActive('/a/visitors/metrics')} />
            </NavLink>
          </SidebarGroup>
          <div className="px-3 pt-4 pb-2">
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
              ENGAGEMENT
            </span>
          </div>
          <SidebarGroup icon={Mail} label="Follow-Up">
            <NavLink href="/a/followup/onboarding" active={isActive('/a/followup/onboarding')}>
              <SidebarItem icon={UserPlus2} label="Onboarding" active={isActive('/a/followup/onboarding')} />
            </NavLink>
          </SidebarGroup>
          <NavLink href="/a/reports" active={isActive('/a/reports')}>
            <SidebarItem icon={FileText} label="Reports" active={isActive('/a/reports')} />
          </NavLink>
          <SidebarGroup icon={Settings} label="Administration">
            <NavLink href="/a/aistration/add-edit" active={isActive('/a/aistration/add-edit')}>
              <SidebarItem icon={UserPlus2} label="Add/Edit members" active={isActive('/a/aistration/add-edit')} />
            </NavLink>
            <NavLink href="/a/aistration/departments" active={isActive('/a/aistration/departments')}>
              <SidebarItem icon={Building2} label="Assign Departments" active={isActive('/a/aistration/departments')} />
            </NavLink>
            <NavLink href="/a/aistration/delete" active={isActive('/a/aistration/delete')}>
              <SidebarItem icon={Trash2} label="Delete a member" active={isActive('/a/aistration/delete')} />
            </NavLink>
          </SidebarGroup>
        </nav>
      </motion.aside>
    </>
  )
}