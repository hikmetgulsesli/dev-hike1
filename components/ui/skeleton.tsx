'use client'

import * as React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: number | string
  height?: number | string
  animation?: 'pulse' | 'wave' | 'none'
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'wave',
  className = '',
  style,
  ...props
}) => {
  const baseStyles = 'bg-[#1a1a1f]'
  
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl'
  }
  
  const animationClass = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden skeleton-wave',
    none: ''
  }
  
  const customStyle: React.CSSProperties = {
    ...style,
    width: width,
    height: height
  }
  
  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationClass[animation]} ${className}`}
      style={customStyle}
      {...props}
    />
  )
}

export { Skeleton }
