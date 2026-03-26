import { describe, it, expect } from 'vitest';
import {
  EASING,
  TRANSITION,
  fadeVariants,
  fadeUpVariants,
  fadeDownVariants,
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  staggerContainer,
  fastStaggerContainer,
  slowStaggerContainer,
  pageVariants,
  pageScaleVariants,
  SCROLL_ANIMATION_CONFIG,
  scrollFadeUpVariants,
  scrollFadeInVariants,
  scrollFadeDownVariants,
  scrollSlideLeftVariants,
  scrollSlideRightVariants,
  scrollScaleUpVariants,
  scrollBlurInVariants,
  linkUnderlineHover,
  buttonPress,
  cardHoverLift,
  iconHoverBounce,
  pingAnimation,
  pulseAnimation,
  floatAnimation,
  TYPING_CONFIG,
  fadeUpStaggerVariants,
  scaleUpStaggerVariants,
  slideLeftStaggerVariants,
  slideRightStaggerVariants,
  GENTLE_SPRING,
  BOUNCY_SPRING,
  SNAPPY_SPRING,
  getVariantByName,
} from '../../lib/animations';

describe('EASING', () => {
  it('should have all required easing curves defined', () => {
    expect(EASING.easeIn).toBeDefined();
    expect(EASING.easeOut).toBeDefined();
    expect(EASING.easeInOut).toBeDefined();
    expect(EASING.spring).toBeDefined();
    expect(EASING.linear).toBeDefined();
  });

  it('should have cubic bezier arrays with 4 values', () => {
    expect(EASING.easeIn).toHaveLength(4);
    expect(EASING.easeOut).toHaveLength(4);
    expect(EASING.easeInOut).toHaveLength(4);
    expect(EASING.spring).toHaveLength(4);
  });
});

describe('TRANSITION', () => {
  it('should have all transition durations defined', () => {
    expect(TRANSITION.instant).toBe(0);
    expect(TRANSITION.fastest).toBe(50);
    expect(TRANSITION.fast).toBe(100);
    expect(TRANSITION.normal).toBe(200);
    expect(TRANSITION.slow).toBe(300);
    expect(TRANSITION.slower).toBe(400);
    expect(TRANSITION.slowest).toBe(500);
  });
});

describe('fadeVariants', () => {
  it('should have hidden, visible, and exit states', () => {
    expect(fadeVariants.hidden).toBeDefined();
    expect(fadeVariants.visible).toBeDefined();
    expect(fadeVariants.exit).toBeDefined();
  });

  it('should animate opacity from 0 to 1', () => {
    expect(fadeVariants.hidden.opacity).toBe(0);
    expect(fadeVariants.visible.opacity).toBe(1);
  });

  it('should have transition config on visible state', () => {
    expect(fadeVariants.visible.transition).toBeDefined();
    const transition = fadeVariants.visible.transition as { duration: number };
    expect(transition.duration).toBe(TRANSITION.slow / 1000);
  });
});

describe('fadeUpVariants', () => {
  it('should have hidden, visible, and exit states', () => {
    expect(fadeUpVariants.hidden).toBeDefined();
    expect(fadeUpVariants.visible).toBeDefined();
    expect(fadeUpVariants.exit).toBeDefined();
  });

  it('should animate opacity and y position', () => {
    expect(fadeUpVariants.hidden.opacity).toBe(0);
    expect(fadeUpVariants.hidden.y).toBe(20);
    expect(fadeUpVariants.visible.opacity).toBe(1);
    expect(fadeUpVariants.visible.y).toBe(0);
  });
});

describe('fadeDownVariants', () => {
  it('should animate from negative y position', () => {
    expect(fadeDownVariants.hidden.y).toBe(-30);
    expect(fadeDownVariants.visible.y).toBe(0);
  });
});

describe('scaleVariants', () => {
  it('should have hidden, visible, hover, tap, and exit states', () => {
    expect(scaleVariants.hidden).toBeDefined();
    expect(scaleVariants.visible).toBeDefined();
    expect(scaleVariants.hover).toBeDefined();
    expect(scaleVariants.tap).toBeDefined();
    expect(scaleVariants.exit).toBeDefined();
  });

  it('should animate scale from 0.95 to 1', () => {
    expect(scaleVariants.hidden.scale).toBe(0.95);
    expect(scaleVariants.visible.scale).toBe(1);
  });

  it('should have press effect on tap', () => {
    expect(scaleVariants.tap.scale).toBe(0.98);
  });

  it('should have hover effect', () => {
    expect(scaleVariants.hover.scale).toBe(1.02);
  });
});

describe('slideLeftVariants', () => {
  it('should slide from right to left', () => {
    expect(slideLeftVariants.hidden.x).toBe(50);
    expect(slideLeftVariants.visible.x).toBe(0);
  });
});

describe('slideRightVariants', () => {
  it('should slide from left to right', () => {
    expect(slideRightVariants.hidden.x).toBe(-50);
    expect(slideRightVariants.visible.x).toBe(0);
  });
});

describe('staggerContainer', () => {
  it('should have stagger children timing', () => {
    const visible = staggerContainer.visible as {
      transition: { staggerChildren: number; delayChildren: number };
    };
    expect(visible.transition.staggerChildren).toBe(TRANSITION.slow / 1000);
    expect(visible.transition.delayChildren).toBe(TRANSITION.normal / 1000);
  });
});

describe('fastStaggerContainer', () => {
  it('should have faster stagger timing', () => {
    const visible = fastStaggerContainer.visible as {
      transition: { staggerChildren: number; delayChildren: number };
    };
    expect(visible.transition.staggerChildren).toBe(TRANSITION.fast / 1000);
    expect(visible.transition.delayChildren).toBe(TRANSITION.fast / 1000);
  });
});

describe('slowStaggerContainer', () => {
  it('should have slower stagger timing', () => {
    const visible = slowStaggerContainer.visible as {
      transition: { staggerChildren: number; delayChildren: number };
    };
    expect(visible.transition.staggerChildren).toBe(TRANSITION.slower / 1000);
    expect(visible.transition.delayChildren).toBe(TRANSITION.slow / 1000);
  });
});

describe('pageVariants', () => {
  it('should have initial, animate, and exit states', () => {
    expect(pageVariants.initial).toBeDefined();
    expect(pageVariants.animate).toBeDefined();
    expect(pageVariants.exit).toBeDefined();
  });

  it('should animate opacity and y for page transitions', () => {
    expect(pageVariants.initial.opacity).toBe(0);
    expect(pageVariants.initial.y).toBe(20);
    expect(pageVariants.animate.opacity).toBe(1);
    expect(pageVariants.animate.y).toBe(0);
  });
});

describe('pageScaleVariants', () => {
  it('should use scale for page transitions', () => {
    expect(pageScaleVariants.initial.scale).toBe(0.98);
    expect(pageScaleVariants.animate.scale).toBe(1);
  });
});

describe('SCROLL_ANIMATION_CONFIG', () => {
  it('should have correct threshold', () => {
    expect(SCROLL_ANIMATION_CONFIG.threshold).toBe(0.1);
  });

  it('should have rootMargin set', () => {
    expect(SCROLL_ANIMATION_CONFIG.rootMargin).toBe('0px 0px -50px 0px');
  });

  it('should have once set to true', () => {
    expect(SCROLL_ANIMATION_CONFIG.once).toBe(true);
  });
});

describe('scroll animation variants', () => {
  it('scrollFadeUpVariants should animate y from 30 to 0', () => {
    expect(scrollFadeUpVariants.hidden.y).toBe(30);
    expect(scrollFadeUpVariants.visible.y).toBe(0);
  });

  it('scrollFadeInVariants should only animate opacity', () => {
    expect(scrollFadeInVariants.hidden.opacity).toBe(0);
    expect(scrollFadeInVariants.visible.opacity).toBe(1);
  });

  it('scrollFadeDownVariants should animate from negative y', () => {
    expect(scrollFadeDownVariants.hidden.y).toBe(-30);
    expect(scrollFadeDownVariants.visible.y).toBe(0);
  });

  it('scrollSlideLeftVariants should slide from right', () => {
    expect(scrollSlideLeftVariants.hidden.x).toBe(50);
    expect(scrollSlideLeftVariants.visible.x).toBe(0);
  });

  it('scrollSlideRightVariants should slide from left', () => {
    expect(scrollSlideRightVariants.hidden.x).toBe(-50);
    expect(scrollSlideRightVariants.visible.x).toBe(0);
  });

  it('scrollScaleUpVariants should scale from 0.9', () => {
    expect(scrollScaleUpVariants.hidden.scale).toBe(0.9);
    expect(scrollScaleUpVariants.visible.scale).toBe(1);
  });

  it('scrollBlurInVariants should animate blur', () => {
    expect(scrollBlurInVariants.hidden.filter).toBe('blur(10px)');
    expect(scrollBlurInVariants.visible.filter).toBe('blur(0px)');
  });
});

describe('micro-interaction configs', () => {
  it('linkUnderlineHover should animate width from 0 to 100%', () => {
    expect(linkUnderlineHover.initial.width).toBe(0);
    expect(linkUnderlineHover.hover.width).toBe('100%');
  });

  it('buttonPress should have scale 0.98 for tap', () => {
    expect(buttonPress.whileTap.scale).toBe(0.98);
  });

  it('cardHoverLift should lift card on hover', () => {
    expect(cardHoverLift.initial.y).toBe(0);
    expect(cardHoverLift.hover.y).toBe(-4);
  });

  it('iconHoverBounce should rotate and scale on hover', () => {
    expect(iconHoverBounce.initial.rotate).toBe(0);
    expect(iconHoverBounce.hover.rotate).toBe(5);
    expect(iconHoverBounce.hover.scale).toBe(1.1);
  });
});

describe('special effect animations', () => {
  it('pingAnimation should be infinite', () => {
    expect(pingAnimation.transition.repeat).toBe(Infinity);
  });

  it('pulseAnimation should be infinite', () => {
    expect(pulseAnimation.transition.repeat).toBe(Infinity);
  });

  it('floatAnimation should be infinite and repeat', () => {
    expect(floatAnimation.transition.repeat).toBe(Infinity);
    expect(floatAnimation.y).toContain(0);
    expect(floatAnimation.y).toContain(-10);
  });

  it('TYPING_CONFIG should have speed settings', () => {
    expect(TYPING_CONFIG.speed).toBe(100);
    expect(TYPING_CONFIG.eraseSpeed).toBe(50);
    expect(TYPING_CONFIG.pauseDuration).toBe(2000);
    expect(TYPING_CONFIG.cursorColor).toBe('#10b981');
  });
});

describe('combined stagger variants', () => {
  it('fadeUpStaggerVariants should combine fadeUp with stagger', () => {
    expect(fadeUpStaggerVariants.hidden.opacity).toBe(0);
    expect(fadeUpStaggerVariants.hidden.y).toBe(20);
    const visible = fadeUpStaggerVariants.visible as {
      transition: { staggerChildren: number };
    };
    expect(visible.transition.staggerChildren).toBeDefined();
  });

  it('scaleUpStaggerVariants should combine scale with stagger', () => {
    expect(scaleUpStaggerVariants.hidden.scale).toBe(0.95);
    const visible = scaleUpStaggerVariants.visible as {
      transition: { staggerChildren: number };
    };
    expect(visible.transition.staggerChildren).toBeDefined();
  });

  it('slideLeftStaggerVariants should combine slide with stagger', () => {
    expect(slideLeftStaggerVariants.hidden.x).toBe(50);
    const visible = slideLeftStaggerVariants.visible as {
      transition: { staggerChildren: number };
    };
    expect(visible.transition.staggerChildren).toBeDefined();
  });

  it('slideRightStaggerVariants should combine slide with stagger', () => {
    expect(slideRightStaggerVariants.hidden.x).toBe(-50);
    const visible = slideRightStaggerVariants.visible as {
      transition: { staggerChildren: number };
    };
    expect(visible.transition.staggerChildren).toBeDefined();
  });
});

describe('spring configs', () => {
  it('GENTLE_SPRING should have soft spring settings', () => {
    expect(GENTLE_SPRING.type).toBe('spring');
    expect(GENTLE_SPRING.stiffness).toBe(300);
    expect(GENTLE_SPRING.damping).toBe(30);
  });

  it('BOUNCY_SPRING should have bouncy spring settings', () => {
    expect(BOUNCY_SPRING.type).toBe('spring');
    expect(BOUNCY_SPRING.stiffness).toBe(400);
    expect(BOUNCY_SPRING.damping).toBe(15);
  });

  it('SNAPPY_SPRING should have snappy spring settings', () => {
    expect(SNAPPY_SPRING.type).toBe('spring');
    expect(SNAPPY_SPRING.stiffness).toBe(500);
    expect(SNAPPY_SPRING.damping).toBe(25);
  });
});

describe('getVariantByName', () => {
  it('should return correct variant for each name', () => {
    expect(getVariantByName('fade')).toBe(fadeVariants);
    expect(getVariantByName('fadeUp')).toBe(fadeUpVariants);
    expect(getVariantByName('fadeDown')).toBe(fadeDownVariants);
    expect(getVariantByName('scale')).toBe(scaleVariants);
    expect(getVariantByName('slideLeft')).toBe(slideLeftVariants);
    expect(getVariantByName('slideRight')).toBe(slideRightVariants);
    expect(getVariantByName('page')).toBe(pageVariants);
    expect(getVariantByName('pageScale')).toBe(pageScaleVariants);
    expect(getVariantByName('scrollFadeUp')).toBe(scrollFadeUpVariants);
    expect(getVariantByName('scrollFadeIn')).toBe(scrollFadeInVariants);
    expect(getVariantByName('scrollFadeDown')).toBe(scrollFadeDownVariants);
    expect(getVariantByName('scrollSlideLeft')).toBe(scrollSlideLeftVariants);
    expect(getVariantByName('scrollSlideRight')).toBe(scrollSlideRightVariants);
    expect(getVariantByName('scrollScaleUp')).toBe(scrollScaleUpVariants);
    expect(getVariantByName('scrollBlurIn')).toBe(scrollBlurInVariants);
  });
});
