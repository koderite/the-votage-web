'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'
import { SidebarItem } from './SidebarItem'
import { SidebarGroup } from './SidebarGroup'
import { useSidebar } from '../contexts/SidebarContext'
import { cn } from '@/lib/utils'
import { navEntries, type NavEntry, type NavItem, type NavGroup } from './nav-data'

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href} className="contents">
      {children}
    </Link>
  )
}

function renderNavEntry(entry: NavEntry, collapsed: boolean, isActive: (href: string) => boolean) {
  switch (entry.type) {
    case 'item':
      return (
        <NavLink key={entry.data.href} href={entry.data.href} active={isActive(entry.data.href)}>
          <SidebarItem
            icon={entry.data.icon}
            label={entry.data.label}
            active={isActive(entry.data.href)}
            collapsed={collapsed}
          />
        </NavLink>
      )
    case 'group':
      return (
        <SidebarGroup key={entry.data.label} icon={entry.data.icon} label={entry.data.label} collapsed={collapsed}>
          {entry.data.items.map((item) => (
            <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            </NavLink>
          ))}
        </SidebarGroup>
      )
    case 'separator':
      return collapsed ? (
        <div key="sep" className="border-t border-white/10 my-3 mx-2" />
      ) : (
        <div key="sep" className="px-3 pt-4 pb-2">
          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
            ENGAGEMENT
          </span>
        </div>
      )
  }
}

function renderNav(collapsed: boolean, isActive: (href: string) => boolean) {
  return navEntries.map((entry) => renderNavEntry(entry, collapsed, isActive))
}

export function Sidebar() {
  const { collapsed, mobileOpen, toggleCollapse, closeMobile } = useSidebar()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/a/dashboard') return pathname === '/a' || pathname === '/a/dashboard'
    return pathname.startsWith(href)
  }

  const navContent = renderNav(collapsed, isActive)

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
        {navContent}
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
          {renderNav(false, isActive)}
        </nav>
      </motion.aside>
    </>
  )
}