'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-[#10b981] text-white hover:bg-[#059669] hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:-translate-y-px active:scale-[0.98] active:translate-y-0',
      secondary: 'bg-transparent border border-[#27272a] text-[#10b981] hover:border-[#10b981] hover:bg-[#10b981]/10 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-[0.98]',
      ghost: 'bg-transparent text-[#a1a1aa] hover:text-[#10b981] hover:bg-[#1a1a1f] active:scale-[0.98]',
      destructive: 'bg-[#ef4444] text-white hover:bg-[#ef4444]/90 active:scale-[0.98]'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      icon: 'p-2.5 w-10 h-10'
    }
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {!loading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
