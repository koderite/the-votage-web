'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  error?: string;
  delay?: number;
}

export function FormInput({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  error,
  delay = 0,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-2 items-start relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-col font-['Arial',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[14px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">{label}</p>
      </div>
      <motion.div
        className={`h-[54px] relative rounded-[8px] shrink-0 w-full ${
          error ? 'border border-red-500' : ''
        }`}
        animate={{
          borderColor: isFocused
            ? 'rgba(0,0,0,0.4)'
            : error
            ? '#ef4444'
            : 'rgba(0,0,0,0.15)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] transition-colors duration-200 ${
            error ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: isFocused
              ? 'rgba(0,0,0,0.4)'
              : error
              ? '#ef4444'
              : 'rgba(0,0,0,0.15)',
          }}
        />
        <div className="flex flex-row items-center size-full">
          <div className="flex items-center px-4 py-2 relative size-full">
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="w-full h-full bg-transparent border-none outline-none font-['Arial',sans-serif] text-[16px] text-black placeholder:text-[#959595]"
            />
          </div>
        </div>
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-[12px] font-['Arial',sans-serif]"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
