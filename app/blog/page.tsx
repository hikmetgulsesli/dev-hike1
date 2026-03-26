'use client';

import { useState, useEffect, useCallback } from 'react';
import { BlogPost, Pagination } from '@/lib/types';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { EmptyState } from '../components/EmptyState';

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'teknik', label: 'Teknik' },
  { id: 'kariyer', label: 'Kariyer' },
  { id: 'kisisel', label: 'Kişisel' },
  { id: 'tutorial', label: 'Tutorial' },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
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

  const fetchPosts = useCallback(async () => {
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

      const response = await fetch(`/api/posts?${params.toString()}`);
      const data: { data: BlogPost[]; pagination: Pagination } = await response.json();

      if (data.data) {
        setPosts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Separate pinned and regular posts
  const pinnedPost = posts.find((p) => p.pinned);
  const regularPosts = posts.filter((p) => !p.pinned);

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[#10b981] font-mono text-sm">//</span>
          <span className="text-[#6b7280] font-mono text-sm">LOGS</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-[#fafafa] mb-6">
          Writing
        </h1>
        <p className="text-[#a1a1aa] max-w-2xl text-lg">
          Yazılım geliştirme, teknoloji trendleri ve kariyer deneyimlerim hakkında yazılar.
        </p>
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
              placeholder="EXECUTE_SEARCH --query"
              className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-md text-[#fafafa] placeholder-[#6b7280] focus:outline-none focus:border-[#10b981] transition-colors font-mono text-sm"
              data-testid="blog-search"
            />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        {loading ? (
          <>
            <BlogSkeleton featured />
            <BlogSkeleton count={4} />
          </>
        ) : posts.length === 0 ? (
          <EmptyState
            searchQuery={debouncedSearch}
            selectedCategory={selectedCategory !== 'all' ? selectedCategory : undefined}
          />
        ) : (
          <>
            {/* Pinned/Featured Post */}
            {pinnedPost && !debouncedSearch && selectedCategory === 'all' && (
              <div data-testid="featured-section">
                <BlogCard post={pinnedPost} featured />
              </div>
            )}

            {/* Regular Posts Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              data-testid="blog-grid"
            >
              {(debouncedSearch || selectedCategory !== 'all' ? posts : regularPosts).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}

        {/* Results count */}
        {!loading && posts.length > 0 && (
          <div className="mt-8 text-center text-[#6b7280] text-sm font-mono">
            {pagination?.total || posts.length} yazı gösteriliyor
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8 border-t border-[#27272a]">
            <button
              disabled={!pagination.hasPrev}
              className="px-4 py-2 border border-[#27272a] text-[#a1a1aa] hover:border-[#10b981]/50 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
            >
              [ PREV ]
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => (
                <button
                  key={i + 1}
                  className={`w-10 h-10 text-sm font-mono ${
                    pagination.page === i + 1
                      ? 'bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]'
                      : 'border border-[#27272a] text-[#a1a1aa] hover:border-[#10b981]/50'
                  }`}
                >
                  [ {String(i + 1).padStart(2, '0')} ]
                </button>
              ))}
            </div>
            
            <button
              disabled={!pagination.hasNext}
              className="px-4 py-2 border border-[#27272a] text-[#a1a1aa] hover:border-[#10b981]/50 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
            >
              [ NEXT ]
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
