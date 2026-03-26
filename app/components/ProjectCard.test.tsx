import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { ProjectSkeleton, ProjectSkeletonGrid } from './ProjectSkeleton';
import { EmptyState } from './EmptyState';
import { Project } from '@/lib/types';

const mockProject: Project = {
  id: 'proj-1',
  slug: 'vesta-dashboard',
  title: 'Vesta Dashboard',
  description: 'Finansal veri görselleştirme ve analiz platformu',
  shortDescription: 'Finansal veri görselleştirme ve analiz platformu',
  thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  images: [],
  category: 'web',
  techStack: [
    { id: 'tech-1', name: 'React', category: 'frontend' },
    { id: 'tech-2', name: 'TypeScript', category: 'frontend' },
    { id: 'tech-3', name: 'Tailwind CSS', category: 'frontend' },
    { id: 'tech-4', name: 'Node.js', category: 'backend' },
    { id: 'tech-5', name: 'PostgreSQL', category: 'database' },
  ],
  liveUrl: 'https://vesta-dashboard.vercel.app',
  githubUrl: 'https://github.com/hikmetgulsesli/vesta-dashboard',
  featured: true,
  publishedAt: '2024-01-15',
  status: 'published',
  content: '',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
};

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByTestId('project-title')).toHaveTextContent('Vesta Dashboard');
    expect(screen.getByTestId('project-description')).toHaveTextContent(mockProject.shortDescription);
  });

  it('displays category badge', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    expect(container.textContent).toContain('WEB');
  });

  it('renders tech stack pills (max 4 with overflow indicator)', () => {
    render(<ProjectCard project={mockProject} />);

    const techStack = screen.getByTestId('tech-stack');
    expect(techStack).toHaveTextContent('React');
    expect(techStack).toHaveTextContent('TypeScript');
    expect(techStack).toHaveTextContent('Tailwind CSS');
    expect(techStack).toHaveTextContent('Node.js');
    expect(techStack).toHaveTextContent('+1');
  });

  it('has required hover effect classes', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = container.querySelector('[data-testid="project-card"]');

    expect(card).toHaveClass('hover:border-[#10b981]');
    expect(card).toHaveClass('hover:-translate-y-1');
    expect(card?.className).toContain('shadow');
  });

  it('renders GitHub link when githubUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', mockProject.githubUrl);
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders demo link when liveUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);

    const demoLink = screen.getByTestId('demo-link');
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', mockProject.liveUrl);
    expect(demoLink).toHaveAttribute('target', '_blank');
  });

  it('renders thumbnail with correct aspect ratio container', () => {
    render(<ProjectCard project={mockProject} />);
    const aspectContainer = document.querySelector('.aspect-video');

    expect(aspectContainer).not.toBeNull();
  });

  it('description is limited to 2 lines', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const description = screen.getByTestId('project-description');

    expect(description).toHaveClass('line-clamp-2');
  });
});

describe('ProjectSkeleton', () => {
  it('renders skeleton placeholder', () => {
    render(<ProjectSkeleton />);

    expect(screen.getByTestId('project-skeleton')).toBeInTheDocument();
  });
});

describe('ProjectSkeletonGrid', () => {
  it('renders 6 skeletons by default', () => {
    render(<ProjectSkeletonGrid />);

    const grid = screen.getByTestId('project-skeleton-grid');
    expect(grid.children).toHaveLength(6);
  });

  it('renders specified count of skeletons', () => {
    render(<ProjectSkeletonGrid count={3} />);

    const grid = screen.getByTestId('project-skeleton-grid');
    expect(grid.children).toHaveLength(3);
  });

  it('has responsive grid layout classes', () => {
    const { container } = render(<ProjectSkeletonGrid />);
    const grid = container.querySelector('[data-testid="project-skeleton-grid"]');

    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('Proje Bulunamadı')).toBeInTheDocument();
  });

  it('shows filter-specific message when filters are active', () => {
    render(<EmptyState searchQuery="react" selectedCategory="web" />);

    expect(screen.getByText(/Arama kriterlerinize uygun proje bulunamadı/)).toBeInTheDocument();
  });

  it('shows default message when no filters', () => {
    render(<EmptyState />);

    expect(screen.getByText(/Henüz proje eklenmemiş/)).toBeInTheDocument();
  });
});
