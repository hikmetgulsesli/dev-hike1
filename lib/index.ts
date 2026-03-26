// Animation system exports
export {
  // Timing & Easing
  EASING,
  TRANSITION,
  type EasingKey,
  type TransitionKey,
  
  // Base Variants
  fadeVariants,
  fadeUpVariants,
  fadeDownVariants,
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  
  // Stagger Containers
  staggerContainer,
  fastStaggerContainer,
  slowStaggerContainer,
  
  // Page Transitions
  pageVariants,
  pageScaleVariants,
  
  // Scroll Animations
  SCROLL_ANIMATION_CONFIG,
  scrollFadeUpVariants,
  scrollFadeInVariants,
  scrollFadeDownVariants,
  scrollSlideLeftVariants,
  scrollSlideRightVariants,
  scrollScaleUpVariants,
  scrollBlurInVariants,
  
  // Micro-interactions
  linkUnderlineHover,
  linkUnderlineContainer,
  buttonPress,
  buttonHoverLift,
  cardHoverLift,
  cardHoverScale,
  iconHoverBounce,
  iconHoverWiggle,
  
  // Special Effects
  pingAnimation,
  pulseAnimation,
  floatAnimation,
  glowPulseAnimation,
  
  // Typing
  TYPING_CONFIG,
  
  // Combined Variants
  fadeUpStaggerVariants,
  scaleUpStaggerVariants,
  slideLeftStaggerVariants,
  slideRightStaggerVariants,
  
  // Spring configs
  GENTLE_SPRING,
  BOUNCY_SPRING,
  SNAPPY_SPRING,
  
  // Utilities
  type AnimationVariants,
  getVariantByName,
  type ScrollAnimationOptions,
  DEFAULT_SCROLL_OPTIONS,
} from './animations';
