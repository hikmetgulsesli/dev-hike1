'use client'

import * as React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'featured'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className = '', 
    variant = 'default',
    padding = 'md',
    hover = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'bg-[#111113] border border-[#27272a] rounded-xl transition-all duration-200 ease-out'
    
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
    
    const interactiveStyles = hover || variant === 'interactive' 
      ? 'hover:border-[#10b981] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#10b981]/10 cursor-pointer'
      : ''
    
    const featuredStyles = variant === 'featured'
      ? 'border-[#10b981]/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
      : ''
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${paddingStyles[padding]} ${interactiveStyles} ${featuredStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
