import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import BlogDetailPage from './page';

// Mock useParams
vi.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'test-slug' }),
}));

// Mock IntersectionObserver
beforeEach(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(
      _callback: IntersectionObserverCallback,
      _options?: IntersectionObserverInit
    ) {}
    disconnect() {}
    observe(_element: Element) {}
    unobserve(_element: Element) {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
  };
});

describe('BlogDetailPage', () => {
  it('renders loading state initially', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });
    
    // Should show skeleton elements
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });

  it('renders post title after loading', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const title = screen.getByText(/Optimizing React for 60fps/);
      expect(title).toBeTruthy();
    });
  });

  it('renders author information', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const authorName = screen.getByText('Hikmet Güleşli');
      expect(authorName).toBeTruthy();
    });
  });

  it('renders table of contents', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const toc = screen.getByText(/\/\/ İÇİNDEKİLER/);
      expect(toc).toBeTruthy();
    });
  });

  it('renders related posts section', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const relatedSection = screen.getByText('İlgili Yazılar');
      expect(relatedSection).toBeTruthy();
    });
  });

  it('renders share buttons', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const twitterBtn = screen.getByLabelText(/Twitter.*paylaş/);
      const linkedinBtn = screen.getByLabelText(/LinkedIn.*paylaş/);
      const copyBtn = screen.getByLabelText(/Linki kopyala/);
      
      expect(twitterBtn).toBeTruthy();
      expect(linkedinBtn).toBeTruthy();
      expect(copyBtn).toBeTruthy();
    });
  });

  it('renders category badge', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const categoryBadge = screen.getByText('Teknik');
      expect(categoryBadge).toBeTruthy();
    });
  });

  it('renders tags', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const tag = screen.getByText('#React');
      expect(tag).toBeTruthy();
    });
  });

  it('renders comments placeholder', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const commentsSection = screen.getByText('Yorumlar');
      expect(commentsSection).toBeTruthy();
    });
  });

  it('renders read time', async () => {
    await act(async () => {
      render(<BlogDetailPage />);
    });

    await waitFor(() => {
      const readTime = screen.getByText(/8 Min Okuma/);
      expect(readTime).toBeTruthy();
    });
  });
});
