import { describe, it, expect } from 'vitest';
import {
  fadeVariants,
  fadeUpVariants,
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  pageTransitionVariants,
  staggerContainerVariants,
  staggerItemVariants,
  scrollAnimationSettings,
  microInteractions,
  defaultTransition,
  springTransition,
} from '@/lib/animations/variants';

describe('Animation Variants', () => {
  describe('fadeVariants', () => {
    it('should have hidden state with opacity 0', () => {
      expect(fadeVariants.hidden).toEqual({ opacity: 0 });
    });

    it('should have visible state with opacity 1 and transition', () => {
      expect(fadeVariants.visible).toHaveProperty('opacity', 1);
      expect(fadeVariants.visible).toHaveProperty('transition');
      expect(fadeVariants.visible.transition).toHaveProperty('duration', 0.3);
    });

    it('should have exit state with opacity 0', () => {
      expect(fadeVariants.exit).toHaveProperty('opacity', 0);
      expect(fadeVariants.exit).toHaveProperty('transition');
    });
  });

  describe('fadeUpVariants', () => {
    it('should have hidden state with opacity 0 and y offset', () => {
      expect(fadeUpVariants.hidden).toEqual({
        opacity: 0,
        y: 20,
      });
    });

    it('should have visible state with opacity 1 and y 0', () => {
      expect(fadeUpVariants.visible).toHaveProperty('opacity', 1);
      expect(fadeUpVariants.visible).toHaveProperty('y', 0);
      expect(fadeUpVariants.visible).toHaveProperty('transition');
      expect(fadeUpVariants.visible.transition).toHaveProperty('duration', 0.4);
    });

    it('should have exit state with opacity 0 and y offset', () => {
      expect(fadeUpVariants.exit).toHaveProperty('opacity', 0);
    });
  });

  describe('scaleVariants', () => {
    it('should have hidden state with opacity 0 and scale 0.9', () => {
      expect(scaleVariants.hidden).toEqual({
        opacity: 0,
        scale: 0.9,
      });
    });

    it('should have visible state with opacity 1 and scale 1', () => {
      expect(scaleVariants.visible).toHaveProperty('opacity', 1);
      expect(scaleVariants.visible).toHaveProperty('scale', 1);
      expect(scaleVariants.visible.transition).toHaveProperty('duration', 0.3);
    });

    it('should have exit state with reduced scale', () => {
      expect(scaleVariants.exit).toHaveProperty('scale', 0.95);
    });
  });

  describe('slideLeftVariants', () => {
    it('should have hidden state with x offset to the right', () => {
      expect(slideLeftVariants.hidden).toHaveProperty('x', 30);
      expect(slideLeftVariants.hidden).toHaveProperty('opacity', 0);
    });

    it('should have visible state with x 0', () => {
      expect(slideLeftVariants.visible).toHaveProperty('x', 0);
      expect(slideLeftVariants.visible).toHaveProperty('opacity', 1);
    });

    it('should have exit state with x offset to the left', () => {
      expect(slideLeftVariants.exit).toHaveProperty('x', -30);
    });
  });

  describe('slideRightVariants', () => {
    it('should have hidden state with x offset to the left', () => {
      expect(slideRightVariants.hidden).toHaveProperty('x', -30);
      expect(slideRightVariants.hidden).toHaveProperty('opacity', 0);
    });

    it('should have visible state with x 0', () => {
      expect(slideRightVariants.visible).toHaveProperty('x', 0);
      expect(slideRightVariants.visible).toHaveProperty('opacity', 1);
    });

    it('should have exit state with x offset to the right', () => {
      expect(slideRightVariants.exit).toHaveProperty('x', 30);
    });
  });

  describe('pageTransitionVariants', () => {
    it('should have hidden state with opacity 0 and y offset', () => {
      expect(pageTransitionVariants.hidden).toEqual({
        opacity: 0,
        y: 10,
      });
    });

    it('should have visible state with staggerChildren', () => {
      expect(pageTransitionVariants.visible).toHaveProperty('opacity', 1);
      expect(pageTransitionVariants.visible).toHaveProperty('y', 0);
      expect(pageTransitionVariants.visible.transition).toHaveProperty('staggerChildren', 0.05);
    });

    it('should have exit state with y offset', () => {
      expect(pageTransitionVariants.exit).toHaveProperty('y', -10);
    });
  });

  describe('staggerContainerVariants', () => {
    it('should have empty hidden state', () => {
      expect(staggerContainerVariants.hidden).toEqual({});
    });

    it('should have visible state with staggerChildren and delayChildren', () => {
      expect(staggerContainerVariants.visible).toHaveProperty('transition');
      expect(staggerContainerVariants.visible.transition).toHaveProperty('staggerChildren', 0.08);
      expect(staggerContainerVariants.visible.transition).toHaveProperty('delayChildren', 0.05);
    });
  });

  describe('staggerItemVariants', () => {
    it('should have hidden state with opacity 0 and y offset', () => {
      expect(staggerItemVariants.hidden).toEqual({
        opacity: 0,
        y: 15,
      });
    });

    it('should have visible state with opacity 1 and y 0', () => {
      expect(staggerItemVariants.visible).toHaveProperty('opacity', 1);
      expect(staggerItemVariants.visible).toHaveProperty('y', 0);
    });
  });

  describe('scrollAnimationSettings', () => {
    it('should have threshold of 0.1', () => {
      expect(scrollAnimationSettings.threshold).toBe(0.1);
    });

    it('should have rootMargin defined', () => {
      expect(scrollAnimationSettings.rootMargin).toBe('0px 0px -50px 0px');
    });

    it('should have triggerOnce set to true', () => {
      expect(scrollAnimationSettings.triggerOnce).toBe(true);
    });
  });

  describe('microInteractions', () => {
    describe('linkUnderline', () => {
      it('should have initial, hover, and exit states', () => {
        expect(microInteractions.linkUnderline).toHaveProperty('initial');
        expect(microInteractions.linkUnderline).toHaveProperty('hover');
        expect(microInteractions.linkUnderline).toHaveProperty('exit');
      });

      it('should scale from 0 to 1 on hover', () => {
        expect(microInteractions.linkUnderline.initial).toHaveProperty('scaleX', 0);
        expect(microInteractions.linkUnderline.hover).toHaveProperty('scaleX', 1);
      });
    });

    describe('buttonPress', () => {
      it('should scale down on tap', () => {
        expect(microInteractions.buttonPress.tap).toHaveProperty('scale', 0.97);
      });

      it('should have transition defined', () => {
        expect(microInteractions.buttonPress).toHaveProperty('transition');
      });
    });

    describe('cardHover', () => {
      it('should have rest and hover states', () => {
        expect(microInteractions.cardHover).toHaveProperty('rest');
        expect(microInteractions.cardHover).toHaveProperty('hover');
      });

      it('should translate up on hover', () => {
        expect(microInteractions.cardHover.rest).toHaveProperty('y', 0);
        expect(microInteractions.cardHover.hover).toHaveProperty('y', -4);
      });
    });

    describe('iconBounce', () => {
      it('should have tap and hover states', () => {
        expect(microInteractions.iconBounce).toHaveProperty('tap');
        expect(microInteractions.iconBounce).toHaveProperty('hover');
        expect(microInteractions.iconBounce).toHaveProperty('transition');
      });

      it('should scale down and rotate on tap', () => {
        expect(microInteractions.iconBounce.tap).toHaveProperty('scale', 0.85);
        expect(microInteractions.iconBounce.tap).toHaveProperty('rotate', -10);
      });
    });
  });

  describe('defaultTransition', () => {
    it('should have duration of 0.3', () => {
      expect(defaultTransition.duration).toBe(0.3);
    });

    it('should have ease array defined', () => {
      expect(defaultTransition.ease).toEqual([0.25, 0.1, 0.25, 1]);
    });
  });

  describe('springTransition', () => {
    it('should be type spring', () => {
      expect(springTransition.type).toBe('spring');
    });

    it('should have stiffness and damping defined', () => {
      expect(springTransition.stiffness).toBe(400);
      expect(springTransition.damping).toBe(25);
    });
  });
});
