'use client'

import * as React from 'react'

export interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animate?: boolean
  className?: string
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = false,
  animate = true,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }
  
  const colorStyles = {
    online: 'bg-success',
    offline: 'bg-text-muted',
    busy: 'bg-error',
    away: 'bg-warning'
  }
  
  const labelText = {
    online: 'Çevrimiçi',
    offline: 'Çevrimdışı',
    busy: 'Meşgul',
    away: 'Uzak'
  }
  
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div 
          className={`${sizeStyles[size]} ${colorStyles[status]} rounded-full`}
        />
        {animate && status === 'online' && (
          <div 
            className={`absolute ${sizeStyles[size]} ${colorStyles[status]} rounded-full animate-ping`}
            style={{
              animationDuration: '2s',
              animationTimingFunction: 'ease-out',
              animationIterationCount: 'infinite'
            }}
          />
        )}
        {animate && status === 'busy' && (
          <div 
            className={`absolute ${sizeStyles[size]} ${colorStyles[status]} rounded-full animate-pulse opacity-75`}
            style={{
              animationDuration: '1.5s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-text-secondary">{labelText[status]}</span>
      )}
    </div>
  )
}

export { StatusIndicator }
