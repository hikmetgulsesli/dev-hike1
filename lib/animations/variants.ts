import type { Variants, Transition } from 'framer-motion';

/**
 * Animation variants for Framer Motion
 * Provides fade, slide, scale, and page transition animations
 */

// Fade variants
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade up variants (opacity + translateY)
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide left variants (enter from right, exit to left)
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide right variants (enter from left, exit to right)
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Stagger container config
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Stagger item variants
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Scroll animation settings
export const scrollAnimationSettings = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  triggerOnce: true,
};

// Micro-interaction configs
export const microInteractions = {
  // Link underline animation
  linkUnderline: {
    initial: { scaleX: 0, originX: 0 },
    hover: { scaleX: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { scaleX: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  },

  // Button press animation
  buttonPress: {
    tap: { scale: 0.97 },
    transition: { duration: 0.1 },
  },

  // Card hover animation
  cardHover: {
    rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    hover: {
      y: -4,
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
  },

  // Icon bounce animation
  iconBounce: {
    tap: { scale: 0.85, rotate: -10 },
    hover: { scale: 1.1, transition: { type: 'spring', stiffness: 400 } },
    transition: { type: 'spring', stiffness: 500, damping: 15 },
  },
};

// Default transition
export const defaultTransition: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};

// Spring transition for bouncy effects
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

// Re-export types for convenience
export type { Variants, Transition } from 'framer-motion';
