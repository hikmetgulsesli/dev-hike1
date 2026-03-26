'use client';

import { BlogPost } from '@/lib/types';
import Link from 'next/link';

interface RelatedPostsProps {
  posts: BlogPost[];
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).replace(' ', '');
}

// Get category label
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    teknik: 'Teknik',
    kariyer: 'Kariyer',
    kisisel: 'Kişisel',
    tutorial: 'Tutorial',
    tasarim: 'Tasarım'
  };
  return labels[category] || category;
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-screen-xl mx-auto px-8 mt-32">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="font-mono text-[10px] text-[#10b981] tracking-[0.3em] uppercase block mb-2">
            // SEQUENCE_NEXT
          </span>
          <h2 className="text-4xl font-bold uppercase">
            İlgili Yazılar
          </h2>
        </div>
        <div className="hidden md:block h-px flex-1 mx-12 bg-[#3c4a42]/30" />
        <Link
          href="/blog"
          className="group flex items-center gap-2 font-mono text-xs text-[#a1a1aa] hover:text-[#10b981] transition-all"
        >
          TÜMÜNÜ GÖR
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Related Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block p-6 bg-[#111113] hover:bg-[#1a1a1f] transition-all border-l-2 border-transparent hover:border-[#10b981]"
          >
            {/* Category badge */}
            <div className="text-[10px] font-mono text-[#6b7280] uppercase mb-4">
              {formatDate(post.publishedAt)} // {getCategoryLabel(post.category).toUpperCase()}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-[#fafafa] mb-4 group-hover:text-[#10b981] transition-colors">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-sm text-[#a1a1aa] line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
