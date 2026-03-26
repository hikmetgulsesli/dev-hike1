'use client'

import * as React from 'react'
import { X } from 'lucide-react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className = '', 
    variant = 'default',
    size = 'md',
    removable = false,
    onRemove,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full transition-colors duration-150'
    
    const variants = {
      default: 'bg-background-subtle text-text-secondary',
      primary: 'bg-primary/20 text-primary',
      secondary: 'bg-accent/20 text-accent',
      accent: 'bg-accent-alt/20 text-accent-alt',
      success: 'bg-success/20 text-success',
      warning: 'bg-warning/20 text-warning',
      error: 'bg-error/20 text-error'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm'
    }
    
    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 hover:text-error transition-colors"
            aria-label="Kaldır"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
