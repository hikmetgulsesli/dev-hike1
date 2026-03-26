import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollAnimation, useStaggerAnimation, useReducedMotion } from '../../hooks/useScrollAnimation';

describe('useScrollAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return ref and isVisible state', () => {
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isVisible).toBe('boolean');
  });

  it('should initialize with isVisible as false', () => {
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current.isVisible).toBe(false);
  });
});

describe('useStaggerAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return empty array initially', () => {
    const { result } = renderHook(() => useStaggerAnimation(3));
    
    expect(result.current).toEqual([]);
  });

  it('should reveal items with stagger delay', () => {
    const { result } = renderHook(() => useStaggerAnimation(3, 0.1));
    
    // After 100ms, first item should be visible
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toContain(0);
    
    // After 200ms total, second item should be visible
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toContain(1);
    
    // After 300ms total, third item should be visible
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toContain(2);
  });
});

describe('useReducedMotion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return false when motion is preferred', () => {
    // Mock matchMedia to return false for prefersReducedMotion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((_query: string) => ({
        matches: false,
        media: _query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useReducedMotion());
    
    expect(result.current).toBe(false);
  });

  it('should return true when reduced motion is preferred', () => {
    // Mock matchMedia to return true for prefersReducedMotion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((_query: string) => ({
        matches: true,
        media: _query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useReducedMotion());
    
    expect(result.current).toBe(true);
  });
});
