'use client';

import { useRef, useEffect, useState } from 'react';
import {
  SCROLL_ANIMATION_CONFIG,
  type ScrollAnimationOptions,
} from '@/lib/animations';

type UseScrollAnimationOptions = ScrollAnimationOptions;

export function useScrollAnimation({
  threshold = SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin = SCROLL_ANIMATION_CONFIG.rootMargin,
  once = SCROLL_ANIMATION_CONFIG.once,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

export function useStaggerAnimation(
  itemCount: number,
  staggerDelay: number = 0.1
) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => [...prev, i]);
      }, i * staggerDelay * 1000);
      timers.push(timer);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [itemCount, staggerDelay]);

  return visibleItems;
}

// Helper to get initial reduced motion preference without triggering setState in effect
function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
