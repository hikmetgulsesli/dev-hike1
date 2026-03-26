'use client';

import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import {
  fadeVariants,
  fadeUpVariants,
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  staggerContainerVariants,
  staggerItemVariants,
  scrollAnimationSettings,
  defaultTransition,
} from './variants';

/**
 * Animated container component with configurable variants
 */
export interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'viewport'> {
  variant?: 'fade' | 'fadeUp' | 'scale' | 'slideLeft' | 'slideRight' | 'staggerContainer' | 'staggerItem';
  delay?: number;
  duration?: number;
  viewport?: boolean;
  viewportAmount?: number;
  children: React.ReactNode;
}

const variantMap: Record<string, Variants> = {
  fade: fadeVariants,
  fadeUp: fadeUpVariants,
  scale: scaleVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  staggerContainer: staggerContainerVariants,
  staggerItem: staggerItemVariants,
};

export function AnimatedContainer({
  variant = 'fadeUp',
  delay = 0,
  duration,
  viewport = false,
  viewportAmount = scrollAnimationSettings.threshold,
  children,
  ...props
}: AnimatedContainerProps): React.ReactElement {
  const selectedVariant = variantMap[variant] || fadeUpVariants;
  
  const customTransition = duration
    ? { ...defaultTransition, duration, delay }
    : { ...defaultTransition, delay };

  const viewportProps = viewport
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: {
          once: scrollAnimationSettings.triggerOnce,
          amount: viewportAmount,
          margin: scrollAnimationSettings.rootMargin,
        },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  return (
    <motion.div
      variants={selectedVariant}
      transition={customTransition}
      {...viewportProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated page wrapper with page transition variants
 */
export interface AnimatedPageProps extends HTMLMotionProps<'main'> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedPage({
  children,
  className,
  ...props
}: AnimatedPageProps): React.ReactElement {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeUpVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.main>
  );
}

/**
 * Stagger container for animating lists of items
 */
export function StaggerContainer({
  children,
  className,
  ...props
}: Omit<AnimatedContainerProps, 'variant'>): React.ReactElement {
  return (
    <AnimatedContainer
      variant="staggerContainer"
      className={className}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
}

/**
 * Stagger item for use inside StaggerContainer
 */
export function StaggerItem({
  children,
  className,
  ...props
}: Omit<AnimatedContainerProps, 'variant'>): React.ReactElement {
  return (
    <AnimatedContainer
      variant="staggerItem"
      className={className}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
}

/**
 * Animated link with underline effect
 */
export interface AnimatedLinkProps extends HTMLMotionProps<'a'> {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
}

export function AnimatedLink({
  children,
  className,
  underlineColor = 'currentColor',
  ...props
}: AnimatedLinkProps): React.ReactElement {
  return (
    <motion.a
      className={`relative inline-block ${className || ''}`}
      whileHover="hover"
      initial="initial"
      {...props}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] w-full origin-left"
        style={{ backgroundColor: underlineColor }}
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1, transition: { duration: 0.25, ease: 'easeOut' } },
        }}
      />
    </motion.a>
  );
}

/**
 * Animated button with press effect
 */
export interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({
  children,
  className,
  ...props
}: AnimatedButtonProps): React.ReactElement {
  return (
    <motion.button
      className={className}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/**
 * Animated card with hover effect
 */
export interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({
  children,
  className,
  ...props
}: AnimatedCardProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: {
          y: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
        },
        hover: {
          y: -4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated icon with bounce effect
 */
export interface AnimatedIconProps extends HTMLMotionProps<'span'> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedIcon({
  children,
  className,
  ...props
}: AnimatedIconProps): React.ReactElement {
  return (
    <motion.span
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85, rotate: -10 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
