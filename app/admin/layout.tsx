'use client'

import { SidebarProvider, useSidebar } from '@/components/admin/contexts/SidebarContext'
import { Sidebar } from '@/components/admin/layout/Sidebar'
import { HeaderBar } from '@/components/admin/layout/HeaderBar'

function AdminShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-[#F0F2F5]">
      <Sidebar />
      <main
        className={[
          'flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out',
          'lg:ml-[260px]',
          collapsed ? 'lg:ml-[72px]' : '',
        ].join(' ')}
      >
        <HeaderBar />
        <div className="flex-1 p-4 lg:p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminShell>{children}</AdminShell>
    </SidebarProvider>
  )
}