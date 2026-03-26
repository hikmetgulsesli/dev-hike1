import { Variants } from 'framer-motion';

// ============================================================================
// TIMING & EASING
// ============================================================================

export const EASING = {
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
  linear: [0, 0, 0, 0] as const,
} as const;

export const TRANSITION = {
  instant: 0,
  fastest: 50,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
} as const;

export type EasingKey = keyof typeof EASING;
export type TransitionKey = keyof typeof TRANSITION;

// ============================================================================
// BASE VARIANTS
// ============================================================================

/**
 * Fade variants - basic opacity transition
 * Use for: modals, tooltips, any element that simply fades in/out
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: TRANSITION.slow / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: TRANSITION.fast / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

/**
 * Fade up variants - opacity + translateY
 * Use for: cards, sections, any content that slides up while fading
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: TRANSITION.fast / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

/**
 * Fade down variants - opacity + negative translateY
 * Use for: headers, dropdowns appearing from above
 */
export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: TRANSITION.fast / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

/**
 * Scale variants - opacity + scale
 * Use for: buttons on press, cards with zoom effect, modals
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: TRANSITION.fast / 1000,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: TRANSITION.fastest / 1000,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: TRANSITION.fast / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

/**
 * Slide left variants - opacity + slide from right
 * Use for: sidebars, panels entering from the right
 */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

/**
 * Slide right variants - opacity + slide from left
 * Use for: sidebars, panels entering from the left
 */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

// ============================================================================
// STAGGER CONTAINERS
// ============================================================================

/**
 * Stagger container - applies staggered children animation
 * Use for: grids of cards, lists of items, nav menus
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TRANSITION.slow / 1000,
      delayChildren: TRANSITION.normal / 1000,
    },
  },
};

/**
 * Fast stagger container - for smaller items or tighter timing
 */
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TRANSITION.fast / 1000,
      delayChildren: TRANSITION.fast / 1000,
    },
  },
};

/**
 * Slow stagger container - for larger sections or dramatic timing
 */
export const slowStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TRANSITION.slower / 1000,
      delayChildren: TRANSITION.slow / 1000,
    },
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

/**
 * Page transition variants - for route changes
 * Use with AnimatePresence in layout
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

/**
 * Page transition with scale
 */
export const pageScaleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeIn as unknown as string,
    },
  },
};

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

export const SCROLL_ANIMATION_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  once: true,
} as const;

/**
 * Scroll fade up - for elements animating on scroll into view
 */
export const scrollFadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

/**
 * Scroll fade in - simple opacity on scroll
 */
export const scrollFadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: TRANSITION.slow / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

/**
 * Scroll fade down - for elements coming from above
 */
export const scrollFadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

/**
 * Scroll slide left - for elements sliding in from right
 */
export const scrollSlideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

/**
 * Scroll slide right - for elements sliding in from left
 */
export const scrollSlideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

/**
 * Scroll scale up - for elements scaling in
 */
export const scrollScaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

/**
 * Scroll blur in - for dramatic reveal with blur effect
 */
export const scrollBlurInVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: (TRANSITION.slowest / 1000) * 1.5,
      ease: EASING.easeOut as unknown as string,
    },
  },
};

// ============================================================================
// MICRO-INTERACTIONS
// ============================================================================

/**
 * Link underline animation config
 * Use with animated span inside link
 */
export const linkUnderlineHover = {
  initial: { width: 0 },
  hover: {
    width: '100%',
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
} as const;

export const linkUnderlineContainer = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: TRANSITION.fast / 1000,
    },
  },
} as const;

/**
 * Button press effect - for whileTap
 */
export const buttonPress = {
  whileTap: { scale: 0.98 },
  transition: {
    duration: TRANSITION.fastest / 1000,
    ease: EASING.linear as unknown as string,
  },
} as const;

/**
 * Button hover lift
 */
export const buttonHoverLift = {
  initial: { y: 0 },
  hover: {
    y: -1,
    transition: {
      duration: TRANSITION.fast / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
} as const;

/**
 * Card hover lift - for interactive cards
 */
export const cardHoverLift = {
  initial: { y: 0, borderColor: 'var(--border)' },
  hover: {
    y: -4,
    borderColor: 'var(--primary)',
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
} as const;

/**
 * Card hover scale
 */
export const cardHoverScale = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.easeOut as unknown as string,
    },
  },
} as const;

/**
 * Icon bounce on hover
 */
export const iconHoverBounce = {
  initial: { rotate: 0, scale: 1 },
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: {
      duration: TRANSITION.normal / 1000,
      ease: EASING.spring as unknown as string,
    },
  },
} as const;

/**
 * Icon wiggle on hover
 */
export const iconHoverWiggle = {
  initial: { rotate: 0 },
  hover: {
    rotate: [-5, 5, -5, 0],
    transition: {
      duration: TRANSITION.slow / 1000,
      ease: EASING.easeInOut as unknown as string,
    },
  },
} as const;

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

/**
 * Ping animation - for status indicators
 */
export const pingAnimation = {
  scale: [1, 2, 2.5],
  opacity: [1, 0.5, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: EASING.easeOut as unknown as string,
  },
} as const;

/**
 * Pulse animation - for subtle emphasis
 */
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: EASING.easeInOut as unknown as string,
  },
} as const;

/**
 * Float animation - for ambient floating effect
 */
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: EASING.easeInOut as unknown as string,
  },
} as const;

/**
 * Glow pulse - for glowing effects
 */
export const glowPulseAnimation = {
  opacity: [0.5, 1, 0.5],
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: EASING.easeInOut as unknown as string,
  },
} as const;

// ============================================================================
// TYPING ANIMATION
// ============================================================================

export const TYPING_CONFIG = {
  speed: 100,
  eraseSpeed: 50,
  pauseDuration: 2000,
  cursorColor: '#10b981',
} as const;

// ============================================================================
// COMBINED VARIANTS
// ============================================================================

/**
 * Fade up with stagger - combines fadeUp with stagger timing
 */
export const fadeUpStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
      staggerChildren: TRANSITION.slow / 1000,
      delayChildren: TRANSITION.normal / 1000,
    },
  },
};

/**
 * Scale up with stagger - for card grids
 */
export const scaleUpStaggerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
      staggerChildren: TRANSITION.slow / 1000,
      delayChildren: TRANSITION.normal / 1000,
    },
  },
};

/**
 * Slide left with stagger - for horizontal lists
 */
export const slideLeftStaggerVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
      staggerChildren: TRANSITION.slow / 1000,
      delayChildren: TRANSITION.normal / 1000,
    },
  },
};

/**
 * Slide right with stagger
 */
export const slideRightStaggerVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TRANSITION.slower / 1000,
      ease: EASING.easeOut as unknown as string,
      staggerChildren: TRANSITION.slow / 1000,
      delayChildren: TRANSITION.normal / 1000,
    },
  },
};

// ============================================================================
// HOVER SPRING CONFIGS
// ============================================================================

/**
 * Gentle spring for subtle interactions
 */
export const GENTLE_SPRING = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

/**
 * Bouncy spring for playful interactions
 */
export const BOUNCY_SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
} as const;

/**
 * Snappy spring for responsive interactions
 */
export const SNAPPY_SPRING = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
} as const;

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type AnimationVariants =
  | 'fade'
  | 'fadeUp'
  | 'fadeDown'
  | 'scale'
  | 'slideLeft'
  | 'slideRight'
  | 'page'
  | 'pageScale'
  | 'scrollFadeUp'
  | 'scrollFadeIn'
  | 'scrollFadeDown'
  | 'scrollSlideLeft'
  | 'scrollSlideRight'
  | 'scrollScaleUp'
  | 'scrollBlurIn';

export const getVariantByName = (name: AnimationVariants): Variants => {
  const variants: Record<AnimationVariants, Variants> = {
    fade: fadeVariants,
    fadeUp: fadeUpVariants,
    fadeDown: fadeDownVariants,
    scale: scaleVariants,
    slideLeft: slideLeftVariants,
    slideRight: slideRightVariants,
    page: pageVariants,
    pageScale: pageScaleVariants,
    scrollFadeUp: scrollFadeUpVariants,
    scrollFadeIn: scrollFadeInVariants,
    scrollFadeDown: scrollFadeDownVariants,
    scrollSlideLeft: scrollSlideLeftVariants,
    scrollSlideRight: scrollSlideRightVariants,
    scrollScaleUp: scrollScaleUpVariants,
    scrollBlurIn: scrollBlurInVariants,
  };

  return variants[name];
};

// ============================================================================
// SCROLL ANIMATION HOOK OPTIONS
// ============================================================================

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const DEFAULT_SCROLL_OPTIONS: ScrollAnimationOptions = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: SCROLL_ANIMATION_CONFIG.rootMargin,
  once: SCROLL_ANIMATION_CONFIG.once,
};
