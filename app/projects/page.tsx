'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Project, Pagination } from '@/lib/types';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectSkeletonGrid } from '../components/ProjectSkeleton';
import { EmptyState } from '../components/EmptyState';

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobil' },
  { id: 'open-source', label: 'Açık Kaynak' },
  { id: 'freelance', label: 'Freelance' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '50',
      });

      if (selectedCategory !== 'all') {
        params.set('category', selectedCategory);
      }

      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      }

      const response = await fetch(`/api/projects?${params.toString()}`);
      const data: { data: Project[]; pagination: Pagination } = await response.json();

      if (data.data) {
        setProjects(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[#10b981] font-mono text-sm">//</span>
          <span className="text-[#6b7280] font-mono text-sm">WORK</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-[#fafafa] mb-6">
          PROJELER
        </h1>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-[#27272a] py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filters */}
          <div
            className="flex flex-wrap gap-2"
            data-testid="category-filter"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#10b981] text-[#0a0a0f]'
                    : 'bg-[#111113] border border-[#27272a] text-[#a1a1aa] hover:border-[#10b981]/50 hover:text-[#10b981]'
                }`}
                data-testid={`category-btn-${cat.id}`}
                data-active={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-[#6b7280]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Proje Ara..."
              className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-md text-[#fafafa] placeholder-[#6b7280] focus:outline-none focus:border-[#10b981] transition-colors"
              data-testid="project-search"
            />
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        {loading ? (
          <ProjectSkeletonGrid count={6} />
        ) : projects.length === 0 ? (
          <EmptyState
            searchQuery={debouncedSearch}
            selectedCategory={selectedCategory !== 'all' ? selectedCategory : undefined}
          />
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-testid="project-grid"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && projects.length > 0 && (
          <div className="mt-8 text-center text-[#6b7280] text-sm font-mono">
            {pagination?.total || projects.length} proje gösteriliyor
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 border-t border-[#27272a]">
        <div className="max-w-7xl mx-auto px-8 py-16 border-l-4 border-[#10b981] bg-[#111113] relative overflow-hidden">
          <h2 className="text-3xl font-bold text-[#fafafa] mb-4">
            Bir Projeniz mi Var?
          </h2>
          <p className="text-[#a1a1aa] mb-6 max-w-xl">
            Fikirlerinizi hayata geçirmek için birlikte çalışalım. Modern
            teknolojilerle ölçeklenebilir çözümler üretiyorum.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#10b981] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#059669] transition-colors"
          >
            <span>&gt; BAŞLATALIM</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
