import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

export function SidebarItem({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        active
          ? 'bg-white text-[#1A1D29] shadow-sm'
          : 'text-white/70 hover:text-white hover:bg-white/10',
        collapsed && 'justify-center px-2'
      )}
    >
      <Icon size={20} strokeWidth={1.5} />
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}