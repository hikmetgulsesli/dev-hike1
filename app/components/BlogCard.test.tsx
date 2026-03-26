import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/lib/types';

const mockPost: BlogPost = {
  id: 'post-1',
  slug: 'test-post',
  title: 'Test Blog Post',
  excerpt: 'This is a test excerpt for the blog post.',
  featuredImage: 'https://example.com/image.jpg',
  category: 'teknik',
  tags: ['React', 'TypeScript'],
  readTime: 5,
  publishedAt: '2024-01-15',
  status: 'published',
  content: 'Test content',
  author: {
    id: 'author-1',
    name: 'Hikmet Güleşli',
    avatar: 'https://example.com/avatar.jpg',
    title: 'Developer',
    bio: 'Test bio',
    social: {},
  },
  featured: false,
  pinned: false,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
};

const mockPinnedPost: BlogPost = {
  ...mockPost,
  pinned: true,
  featured: true,
  title: 'Featured Post',
};

describe('BlogCard', () => {
  it('renders regular blog card correctly', () => {
    render(<BlogCard post={mockPost} />);
    
    expect(screen.getByTestId('blog-card')).toBeInTheDocument();
    expect(screen.getByTestId('blog-title')).toHaveTextContent('Test Blog Post');
    expect(screen.getByTestId('blog-excerpt')).toHaveTextContent('This is a test excerpt');
    expect(screen.getByTestId('read-more-link')).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders featured blog card when featured is true', () => {
    render(<BlogCard post={mockPinnedPost} featured />);
    
    expect(screen.getByTestId('blog-card-featured')).toBeInTheDocument();
    expect(screen.getByText('Featured Post')).toBeInTheDocument();
  });

  it('displays correct category label', () => {
    render(<BlogCard post={mockPost} />);
    
    expect(screen.getByText('Teknik')).toBeInTheDocument();
  });

  it('displays correct read time', () => {
    render(<BlogCard post={mockPost} />);
    
    expect(screen.getByText('5 dk okuma')).toBeInTheDocument();
  });

  it('formats date correctly in Turkish locale', () => {
    render(<BlogCard post={mockPost} />);
    
    // Check that date is formatted (actual format may vary)
    const dateElement = screen.getByText(/2024|Ocak|January/);
    expect(dateElement).toBeInTheDocument();
  });

  it('renders all category types correctly', () => {
    const categories: Array<BlogPost['category']> = ['teknik', 'kariyer', 'kisisel', 'tutorial', 'tasarim'];
    
    categories.forEach((cat) => {
      const { unmount } = render(<BlogCard post={{ ...mockPost, category: cat }} />);
      expect(screen.getByTestId('blog-card')).toBeInTheDocument();
      unmount();
    });
  });
});
