'use client'

import * as React from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean
  errorMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    error = false,
    errorMessage,
    leftIcon,
    rightIcon,
    size = 'md',
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'w-full bg-background-elevated border rounded-md text-text-primary placeholder:text-text-muted transition-all duration-150 focus:outline-none'
    
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg'
    }
    
    const borderStyles = error
      ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20 focus:ring-offset-2 focus:ring-offset-background'
      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background'
    
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
    
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${sizeStyles[size]} ${borderStyles} ${disabledStyles} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {rightIcon}
          </div>
        )}
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-error">{errorMessage}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  errorMessage?: string
  showCount?: boolean
  maxLength?: number
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className = '', 
    error = false,
    errorMessage,
    showCount = false,
    maxLength,
    autoResize = false,
    disabled,
    value,
    onChange,
    rows = 4,
    ...props 
  }, ref) => {
    const baseStyles = 'w-full bg-background-elevated border rounded-md text-text-primary placeholder:text-text-muted transition-all duration-150 focus:outline-none resize-y'
    
    const borderStyles = error
      ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20 focus:ring-offset-2 focus:ring-offset-background'
      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background'
    
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
    
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = (node: HTMLTextAreaElement) => {
      textareaRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
      onChange?.(e)
    }
    
    const currentLength = typeof value === 'string' ? value.length : 0
    
    return (
      <div className="relative">
        <textarea
          ref={combinedRef}
          className={`${baseStyles} ${borderStyles} ${disabledStyles} p-4 ${className}`}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {showCount && maxLength && (
          <div className={`absolute bottom-3 right-3 text-xs ${currentLength >= maxLength ? 'text-error' : 'text-text-muted'}`}>
            {currentLength}/{maxLength}
          </div>
        )}
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-error">{errorMessage}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, Textarea }
