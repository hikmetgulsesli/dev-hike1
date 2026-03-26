/**
 * Animation utilities for Framer Motion
 * Centralized export for all animation variants and configurations
 */

export {
  // Variants
  fadeVariants,
  fadeUpVariants,
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  pageTransitionVariants,
  staggerContainerVariants,
  staggerItemVariants,
  
  // Scroll settings
  scrollAnimationSettings,
  
  // Micro-interactions
  microInteractions,
  
  // Transitions
  defaultTransition,
  springTransition,
  
  // Types
  type Variants,
  type Transition,
} from './variants';

export {
  AnimatedContainer,
  AnimatedPage,
  AnimatedLink,
  AnimatedButton,
  AnimatedCard,
  AnimatedIcon,
  StaggerContainer,
  StaggerItem,
  type AnimatedContainerProps,
  type AnimatedPageProps,
} from './components';
