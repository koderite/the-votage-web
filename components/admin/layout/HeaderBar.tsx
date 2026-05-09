'use client'

import { Bell, ChevronDown, Menu, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '../contexts/SidebarContext'

export function HeaderBar() {
  const { collapsed, toggleMobile, toggleCollapse } = useSidebar()

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
        <h1 className="text-xl font-bold text-[#111827]">DashBoard</h1>
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

        <button className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-gray-50 rounded-lg transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.jpg" alt="Admin" />
            <AvatarFallback className="bg-[#3B82F6] text-white text-sm">A</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-[#111827] hidden sm:inline">Admin</span>
          <ChevronDown size={16} className="text-[#6B7280]" />
        </button>
      </div>
    </header>
  )
}