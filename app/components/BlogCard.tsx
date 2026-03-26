'use client';

import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  teknik: 'Teknik',
  kariyer: 'Kariyer',
  kisisel: 'Kişisel',
  tutorial: 'Tutorial',
  tasarim: 'Tasarım',
};

const CATEGORY_COLORS: Record<string, string> = {
  teknik: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  kariyer: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  kisisel: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  tutorial: 'bg-green-500/20 text-green-400 border-green-500/30',
  tasarim: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (featured) {
    return (
      <article
        className="group relative bg-[#111113] border-l-4 border-[#10b981] p-8 md:p-12 overflow-hidden transition-all duration-300 hover:border-[#10b981]/80"
        data-testid="blog-card-featured"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          {post.featuredImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-[#27272a]">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`px-3 py-1 text-xs font-medium border rounded ${CATEGORY_COLORS[post.category]}`}>
                {CATEGORY_LABELS[post.category]}
              </span>
              <span className="text-[#6b7280] text-sm font-mono">{formattedDate}</span>
              <span className="text-[#6b7280] text-sm">{post.readTime} dk okuma</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] group-hover:text-[#10b981] transition-colors">
              {post.title}
            </h2>
            
            <p className="text-[#a1a1aa] text-base line-clamp-3">
              {post.excerpt}
            </p>
            
            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-[#10b981] font-medium hover:gap-3 transition-all"
            >
              [ DEVAMINI OKU ]
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group bg-[#111113] border border-[#27272a] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#10b981] hover:bg-[#111113]/80 h-full"
      data-testid="blog-card"
    >
      {/* Category & Meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className={`px-2 py-1 text-xs font-medium border rounded ${CATEGORY_COLORS[post.category]}`}>
          {CATEGORY_LABELS[post.category]}
        </span>
        <span className="text-[#6b7280] text-xs font-mono">{formattedDate}</span>
      </div>
      
      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-[#fafafa] mb-3 group-hover:text-[#10b981] transition-colors line-clamp-2" data-testid="blog-title">
        {post.title}
      </h3>
      
      {/* Excerpt */}
      <p className="text-[#a1a1aa] text-sm mb-4 line-clamp-2 flex-grow" data-testid="blog-excerpt">
        {post.excerpt}
      </p>
      
      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#27272a]/50">
        <span className="text-[#6b7280] text-xs">{post.readTime} dk okuma</span>
        <a
          href={`/blog/${post.slug}`}
          className="flex items-center gap-1 text-sm text-[#a1a1aa] hover:text-[#10b981] transition-colors"
          data-testid="read-more-link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
