'use client'

import { useSession, signOut } from 'next-auth/react'
import { Bell, Menu, Settings, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '../contexts/SidebarContext'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/admin/dashboard':                  'DashBoard',
  '/admin/attendance/trend':           'Trend & Analytics',
  '/admin/attendance/breakdown':       'Service Breakdown',
  '/admin/attendance/checkin':         'Check-In Activity',
  '/admin/members':                    'All Members',
  '/admin/members/insights':           'Member Insights',
  '/admin/members/manage':             'Manage Members',
  '/admin/visitors/tracking':          'Visitors Tracking',
  '/admin/visitors/metrics':           'First-Timer Metrics',
  '/admin/followup':                   'Follow-Up',
  '/admin/followup/onboarding':        'Engagements',
  '/admin/reports':                    'Reports and Data',
  '/admin/administration/add-edit':    'Add / Edit Members',
  '/admin/administration/departments': 'Assign Departments',
  '/admin/administration/delete':      'Delete a Member',
}

export function HeaderBar() {
  const { data: session, status } = useSession()
  const { collapsed, toggleMobile, toggleCollapse } = useSidebar()
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] ?? 'DashBoard'
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    await signOut({ callbackUrl: '/sign-in' })
  }

  const userName = session?.user?.name || session?.user?.email || 'User'
  const userImage = session?.user?.image

  if (status === 'loading') {
    return null
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        {collapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold text-[#111827]">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-[#6B7280]" />
          <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 hover:bg-red-500">
            1
          </Badge>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} className="text-[#6B7280]" />
        </button>

        <button
          onClick={handleSignOut}
          aria-label="Sign out"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={20} className="text-[#6B7280]" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Account menu"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {userImage ? (
              <img src={userImage} alt={userName} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-sm font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-[#111827]">{userName}</p>
                <p className="text-sm text-gray-500 truncate">{session?.user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[#DC2626] transition-colors"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}