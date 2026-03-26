import { describe, it, expect } from 'vitest';

// Test that all exports are available from the animations module
describe('Animations Module Exports', () => {
  it('should export all variants from main index', async () => {
    const module = await import('@/lib/animations');
    
    expect(module.fadeVariants).toBeDefined();
    expect(module.fadeUpVariants).toBeDefined();
    expect(module.scaleVariants).toBeDefined();
    expect(module.slideLeftVariants).toBeDefined();
    expect(module.slideRightVariants).toBeDefined();
    expect(module.pageTransitionVariants).toBeDefined();
    expect(module.staggerContainerVariants).toBeDefined();
    expect(module.staggerItemVariants).toBeDefined();
  });

  it('should export scroll settings from main index', async () => {
    const module = await import('@/lib/animations');
    
    expect(module.scrollAnimationSettings).toBeDefined();
    expect(module.scrollAnimationSettings.threshold).toBe(0.1);
  });

  it('should export micro-interactions from main index', async () => {
    const module = await import('@/lib/animations');
    
    expect(module.microInteractions).toBeDefined();
    expect(module.microInteractions.linkUnderline).toBeDefined();
    expect(module.microInteractions.buttonPress).toBeDefined();
    expect(module.microInteractions.cardHover).toBeDefined();
    expect(module.microInteractions.iconBounce).toBeDefined();
  });

  it('should export transitions from main index', async () => {
    const module = await import('@/lib/animations');
    
    expect(module.defaultTransition).toBeDefined();
    expect(module.springTransition).toBeDefined();
  });

  it('should export components from main index', async () => {
    const module = await import('@/lib/animations');
    
    expect(module.AnimatedContainer).toBeDefined();
    expect(module.AnimatedPage).toBeDefined();
    expect(module.AnimatedLink).toBeDefined();
    expect(module.AnimatedButton).toBeDefined();
    expect(module.AnimatedCard).toBeDefined();
    expect(module.AnimatedIcon).toBeDefined();
    expect(module.StaggerContainer).toBeDefined();
    expect(module.StaggerItem).toBeDefined();
  });
});
