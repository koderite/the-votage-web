'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  maxSelect?: number;
  placeholder?: string;
  delay?: number;
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  maxSelect = 2,
  placeholder = 'Select options',
  delay = 0
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else if (selected.length < maxSelect) {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter(v => v !== value));
  };

  const selectedLabels = options
    .filter(opt => selected.includes(opt.value))
    .map(opt => opt.label);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col gap-2 items-start relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-col font-['Arial',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d6d6d] text-[14px] w-full">
        <p className="leading-[normal] font-copperplate font-bold text-black whitespace-pre-wrap">
          {label} {maxSelect > 1 && `(${selected.length}/${maxSelect} max)`}
        </p>
      </div>

      <div className="relative w-full">
        <motion.button
          ref={buttonRef}
          type="button"
          className="h-[54px] relative rounded-[8px] shrink-0 w-full flex items-center justify-between px-4 bg-transparent border border-solid transition-colors duration-200"
          style={{ borderColor: isOpen ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)' }}
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            borderColor: isOpen ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            {selected.length === 0 ? (
              <span className="text-[#959595] font-['Arial',sans-serif] text-[16px]">
                {placeholder}
              </span>
            ) : (
              selected.map((value, idx) => (
                <motion.span
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-black text-white text-[14px] rounded-full"
                >
                  {options.find(o => o.value === value)?.label}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRemove(value);
                      }
                    }}
                    className="hover:text-gray-300 cursor-pointer p-1"
                  >
                    <X className="w-3 h-3" />
                  </div>
                </motion.span>
              ))
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-[8px] shadow-lg z-50 max-h-[200px] overflow-y-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full px-4 py-3 text-left font-['Arial',sans-serif] text-[16px] transition-colors ${
                    selected.includes(option.value)
                      ? 'bg-gray-100 text-black'
                      : 'hover:bg-gray-50 text-black'
                  } ${
                    selected.length >= maxSelect && !selected.includes(option.value)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                  disabled={selected.length >= maxSelect && !selected.includes(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
