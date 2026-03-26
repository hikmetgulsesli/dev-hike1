'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // If reduced motion is preferred, show first phrase statically
    if (shouldReduceMotion) {
      setCurrentText(phrases[0])
      return
    }

    const currentPhrase = phrases[currentPhraseIndex]

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false)
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      }
    } else {
      if (currentText === currentPhrase) {
        setIsPaused(true)
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, shouldReduceMotion])

  // Reduced motion: show static text without cursor animation
  if (shouldReduceMotion) {
    return (
      <span className="inline-flex items-center text-primary">
        {currentText}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center">
      <span className="text-primary">{currentText}</span>
      <motion.span
        className="inline-block w-2 h-5 bg-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </span>
  )
}
