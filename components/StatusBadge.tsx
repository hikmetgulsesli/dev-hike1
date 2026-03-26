'use client'

import { motion } from 'framer-motion'

interface StatusBadgeProps {
  text: string
  available?: boolean
}

export function StatusBadge({ text, available = true }: StatusBadgeProps) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-elevated border border-border"
      role="status"
      aria-label={`${available ? 'Müsait' : 'Müsait değil'}: ${text}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        {available && (
          <>
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
              animate={{ scale: [1, 2], opacity: [0.75, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden="true"
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </>
        )}
        {!available && (
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-text-muted" aria-hidden="true" />
        )}
      </span>
      <span className="text-xs font-mono text-text-secondary">{text}</span>
    </div>
  )
}
