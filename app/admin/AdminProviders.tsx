'use client'

import { SidebarProvider } from '@/components/admin/contexts/SidebarContext'
import { Sidebar } from '@/components/admin/layout/Sidebar'
import { HeaderBar } from '@/components/admin/layout/HeaderBar'
import { Toaster } from '@/components/ui'

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#F0F2F5]">
        <Sidebar />
        <main
          className={[
            'flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out',
            'lg:ml-[260px]',
          ].join(' ')}
        >
          <HeaderBar />
          <div className="flex-1 p-4 lg:p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}