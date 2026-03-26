import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectsPage from './page';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectSkeleton, ProjectSkeletonGrid } from '../components/ProjectSkeleton';
import { EmptyState } from '../components/EmptyState';
import { Project } from '@/lib/types';

// Mock fetch
global.fetch = vi.fn();

const mockProject: Project = {
  id: 'proj-1',
  slug: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  shortDescription: 'Short description for test',
  thumbnail: 'https://example.com/image.jpg',
  images: [],
  category: 'web',
  techStack: [
    { id: 'tech-1', name: 'React', category: 'frontend' },
    { id: 'tech-2', name: 'TypeScript', category: 'frontend' },
  ],
  liveUrl: 'https://demo.example.com',
  githubUrl: 'https://github.com/test/project',
  featured: true,
  publishedAt: '2024-01-01',
  status: 'published',
  content: '',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByTestId('project-title')).toHaveTextContent('Test Project');
    expect(screen.getByTestId('project-description')).toHaveTextContent('Short description for test');
  });

  it('displays tech stack pills', () => {
    render(<ProjectCard project={mockProject} />);

    const techStack = screen.getByTestId('tech-stack');
    expect(techStack).toHaveTextContent('React');
    expect(techStack).toHaveTextContent('TypeScript');
  });

  it('shows github link when githubUrl exists', () => {
    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
  });

  it('shows demo link when liveUrl exists', () => {
    render(<ProjectCard project={mockProject} />);

    const demoLink = screen.getByTestId('demo-link');
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
  });

  it('has hover effect classes', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = container.querySelector('[data-testid="project-card"]');

    expect(card).toHaveClass('hover:border-[#10b981]');
    expect(card).toHaveClass('hover:-translate-y-1');
  });
});

describe('ProjectSkeleton', () => {
  it('renders skeleton card', () => {
    render(<ProjectSkeleton />);

    expect(screen.getByTestId('project-skeleton')).toBeInTheDocument();
  });
});

describe('ProjectSkeletonGrid', () => {
  it('renders correct number of skeleton cards', () => {
    render(<ProjectSkeletonGrid count={6} />);

    const grid = screen.getByTestId('project-skeleton-grid');
    expect(grid.children).toHaveLength(6);
  });

  it('has responsive grid classes', () => {
    const { container } = render(<ProjectSkeletonGrid count={3} />);
    const grid = container.querySelector('[data-testid="project-skeleton-grid"]');

    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});

describe('EmptyState', () => {
  it('renders empty state with no filters', () => {
    render(<EmptyState />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('Proje Bulunamadı')).toBeInTheDocument();
  });

  it('renders empty state with filters', () => {
    render(<EmptyState searchQuery="react" selectedCategory="web" />);

    expect(screen.getByText(/Arama kriterlerinize uygun proje bulunamadı/)).toBeInTheDocument();
  });
});

describe('ProjectsPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders page header', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { total: 0 },
      }),
    });

    render(<ProjectsPage />);

    expect(screen.getByText('PROJELER')).toBeInTheDocument();
  });

  it('renders category filter buttons', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { total: 0 },
      }),
    });

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('category-filter')).toBeInTheDocument();
    });

    expect(screen.getByTestId('category-btn-all')).toHaveTextContent('Tümü');
    expect(screen.getByTestId('category-btn-web')).toHaveTextContent('Web');
    expect(screen.getByTestId('category-btn-mobile')).toHaveTextContent('Mobil');
    expect(screen.getByTestId('category-btn-open-source')).toHaveTextContent('Açık Kaynak');
    expect(screen.getByTestId('category-btn-freelance')).toHaveTextContent('Freelance');
  });

  it('renders search input', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { total: 0 },
      }),
    });

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('project-search')).toBeInTheDocument();
    });
  });

  it('category buttons are clickable', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { total: 0 },
      }),
    });

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('category-btn-web')).toBeInTheDocument();
    });

    const webButton = screen.getByTestId('category-btn-web');
    fireEvent.click(webButton);

    expect(webButton).toHaveAttribute('data-active', 'true');
  });

  it('search input accepts text', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { total: 0 },
      }),
    });

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('project-search')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('project-search');
    fireEvent.change(searchInput, { target: { value: 'dashboard' } });

    expect(searchInput).toHaveValue('dashboard');
  });

  it('displays projects when data is loaded', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [mockProject],
        pagination: { total: 1 },
      }),
    });

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('project-grid')).toBeInTheDocument();
    });

    expect(screen.getByTestId('project-card')).toBeInTheDocument();
  });

  it('displays empty state when no projects', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { total: 0 },
      }),
    });

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });
  });
});
