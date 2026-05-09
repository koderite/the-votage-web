import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SidebarGroupProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsed?: boolean;
}

export function SidebarGroup({ icon: Icon, label, children, defaultOpen = false, collapsed }: SidebarGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (collapsed) {
    return (
      <div className="relative group">
        <button className="w-full flex items-center justify-center px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
          <Icon size={20} strokeWidth={1.5} />
        </button>
        <div className="absolute left-full top-0 ml-2 bg-[#1A1D29] rounded-lg p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap">
          <p className="text-white text-sm font-medium px-2 py-1">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} strokeWidth={1.5} />
          <span>{label}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-10 space-y-0.5 py-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}