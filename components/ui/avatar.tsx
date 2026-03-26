'use client'

import * as React from 'react'
import { StatusIndicator } from './status-indicator'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  status?: 'online' | 'offline' | 'busy' | 'away'
  rounded?: boolean
}

const sizeMap = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]' },
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-14 h-14', text: 'text-base' },
  xl: { container: 'w-20 h-20', text: 'text-xl' },
  '2xl': { container: 'w-32 h-32', text: 'text-3xl' }
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className = '', 
    src,
    alt = '',
    fallback,
    size = 'md',
    status,
    rounded = true,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    
    const sizeStyles = sizeMap[size]
    
    const getInitials = (text: string): string => {
      if (!text) return '?'
      const words = text.trim().split(/\s+/)
      if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase()
      }
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    
    const showFallback = !src || imageError
    const initials = showFallback ? (fallback ? getInitials(fallback) : '?') : ''
    
    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center overflow-hidden ${rounded ? 'rounded-full' : 'rounded-lg'} ${sizeStyles.container} ${className}`}
        {...props}
      >
        {showFallback ? (
          <div className="w-full h-full bg-[#10b981] flex items-center justify-center text-white font-medium">
            <span className={sizeStyles.text}>{initials}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {status && (
          <div className="absolute bottom-0 right-0">
            <StatusIndicator 
              status={status} 
              size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} 
              animate={true}
            />
          </div>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
