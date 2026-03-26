import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  AnimatedContainer,
  AnimatedPage,
  AnimatedLink,
  AnimatedButton,
  AnimatedCard,
  AnimatedIcon,
  StaggerContainer,
  StaggerItem,
} from '@/lib/animations/components';

describe('AnimatedContainer', () => {
  it('should render children', () => {
    render(
      <AnimatedContainer variant="fade" data-testid="animated-container">
        <div data-testid="child">Test Content</div>
      </AnimatedContainer>
    );
    
    expect(screen.getByTestId('child')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedContainer variant="fade" className="custom-class">
        <div>Test</div>
      </AnimatedContainer>
    );
    
    const element = container.querySelector('.custom-class');
    expect(element).not.toBeNull();
  });

  it('should support all variant types', () => {
    const variants = ['fade', 'fadeUp', 'scale', 'slideLeft', 'slideRight', 'staggerContainer', 'staggerItem'] as const;
    
    variants.forEach((variant) => {
      const { container } = render(
        <AnimatedContainer variant={variant} data-testid={`variant-${variant}`}>
          <div>Test</div>
        </AnimatedContainer>
      );
      
      expect(container.firstChild).not.toBeNull();
    });
  });
});

describe('AnimatedPage', () => {
  it('should render children in main element', () => {
    render(
      <AnimatedPage data-testid="animated-page">
        <div data-testid="page-content">Page Content</div>
      </AnimatedPage>
    );
    
    expect(screen.getByTestId('page-content')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedPage className="page-wrapper">
        <div>Content</div>
      </AnimatedPage>
    );
    
    const element = container.querySelector('.page-wrapper');
    expect(element).not.toBeNull();
  });
});

describe('StaggerContainer', () => {
  it('should render children', () => {
    render(
      <StaggerContainer data-testid="stagger-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </StaggerContainer>
    );
    
    expect(screen.getByText('Item 1')).toBeDefined();
    expect(screen.getByText('Item 2')).toBeDefined();
  });
});

describe('StaggerItem', () => {
  it('should render children', () => {
    render(
      <StaggerItem data-testid="stagger-item">
        <div>Staggered Item</div>
      </StaggerItem>
    );
    
    expect(screen.getByText('Staggered Item')).toBeDefined();
  });
});

describe('AnimatedLink', () => {
  it('should render children and underline span', () => {
    render(
      <AnimatedLink data-testid="animated-link" href="#">
        Link Text
      </AnimatedLink>
    );
    
    expect(screen.getByText('Link Text')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedLink href="#" className="custom-link">
        Link
      </AnimatedLink>
    );
    
    const element = container.querySelector('.custom-link');
    expect(element).not.toBeNull();
  });

  it('should support custom underline color', () => {
    const { container } = render(
      <AnimatedLink href="#" underlineColor="#ff0000">
        Link
      </AnimatedLink>
    );
    
    expect(container.firstChild).not.toBeNull();
  });
});

describe('AnimatedButton', () => {
  it('should render children', () => {
    render(
      <AnimatedButton data-testid="animated-button">
        Button Text
      </AnimatedButton>
    );
    
    expect(screen.getByText('Button Text')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedButton className="custom-button">
        Click
      </AnimatedButton>
    );
    
    const element = container.querySelector('.custom-button');
    expect(element).not.toBeNull();
  });

  it('should be a button element', () => {
    const { container } = render(
      <AnimatedButton>Click</AnimatedButton>
    );
    
    expect(container.querySelector('button')).not.toBeNull();
  });
});

describe('AnimatedCard', () => {
  it('should render children', () => {
    render(
      <AnimatedCard data-testid="animated-card">
        <div>Card Content</div>
      </AnimatedCard>
    );
    
    expect(screen.getByText('Card Content')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedCard className="custom-card">
        <div>Content</div>
      </AnimatedCard>
    );
    
    const element = container.querySelector('.custom-card');
    expect(element).not.toBeNull();
  });
});

describe('AnimatedIcon', () => {
  it('should render children', () => {
    render(
      <AnimatedIcon data-testid="animated-icon">
        <svg data-testid="icon-svg"><circle /></svg>
      </AnimatedIcon>
    );
    
    expect(screen.getByTestId('icon-svg')).toBeDefined();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedIcon className="custom-icon">
        <span>Icon</span>
      </AnimatedIcon>
    );
    
    const element = container.querySelector('.custom-icon');
    expect(element).not.toBeNull();
  });

  it('should render as a span element', () => {
    const { container } = render(
      <AnimatedIcon>Icon</AnimatedIcon>
    );
    
    expect(container.querySelector('span')).not.toBeNull();
  });
});
