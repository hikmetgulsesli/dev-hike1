'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect user's reduced motion preference
 * 
 * Returns true if the user has enabled reduced motion via:
 * - prefers-reduced-motion: reduce CSS media query
 * 
 * @returns {boolean} true if reduced motion is preferred
 * 
 * @example
 * const shouldReduceMotion = useReducedMotion()
 * 
 * if (shouldReduceMotion) {
 *   // Skip animations
 * } else {
 *   // Play animations
 * }
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return
    }

    // Check media query for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Legacy API (older browsers)
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}
