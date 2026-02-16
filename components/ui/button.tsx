import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'nav-cta' | 'black';
  size?: 'sm' | 'md' | 'lg';
}

export const  Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center cursor-pointer justify-center rounded-full transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50 disabled:pointer-events-none",
          {
            // Variants
            'bg-white text-black hover:bg-gray-200 border border-transparent': variant === 'primary',
            'bg-black text-white hover:bg-gray-900 border border-transparent': variant === 'black',
            'bg-transparent text-white border border-white hover:bg-white/10': variant === 'outline',
            'bg-transparent text-white hover:bg-white/10': variant === 'ghost',
            'bg-transparent text-white border border-[#9C9B9B] hover:border-white hover:bg-white/5': variant === 'nav-cta',
            
            // Sizes
            'px-6 py-2 text-base': size === 'md',
            'px-8 py-3 text-lg': size === 'lg',
            'px-4 py-1.5 text-sm': size === 'sm',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
