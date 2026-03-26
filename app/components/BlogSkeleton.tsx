'use client';

interface BlogSkeletonProps {
  count?: number;
  featured?: boolean;
}

export function BlogSkeleton({ count = 4, featured = false }: BlogSkeletonProps) {
  if (featured) {
    return (
      <div className="bg-[#111113] border-l-4 border-[#27272a] p-8 md:p-12 animate-pulse" data-testid="blog-skeleton-featured">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="aspect-video bg-[#1a1a1f] rounded-lg" />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-6 bg-[#1a1a1f] rounded" />
              <div className="w-24 h-4 bg-[#1a1a1f] rounded" />
              <div className="w-20 h-4 bg-[#1a1a1f] rounded" />
            </div>
            <div className="h-8 bg-[#1a1a1f] rounded w-3/4" />
            <div className="h-4 bg-[#1a1a1f] rounded w-full" />
            <div className="h-4 bg-[#1a1a1f] rounded w-2/3" />
            <div className="h-6 bg-[#1a1a1f] rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="blog-skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[#111113] border border-[#27272a] p-6 md:p-8 animate-pulse"
          data-testid="blog-skeleton"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-5 bg-[#1a1a1f] rounded" />
            <div className="w-20 h-4 bg-[#1a1a1f] rounded" />
          </div>
          <div className="h-7 bg-[#1a1a1f] rounded w-4/5 mb-3" />
          <div className="h-7 bg-[#1a1a1f] rounded w-3/5 mb-4" />
          <div className="h-4 bg-[#1a1a1f] rounded w-full mb-2" />
          <div className="h-4 bg-[#1a1a1f] rounded w-2/3 mb-4" />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#27272a]/50">
            <div className="w-16 h-4 bg-[#1a1a1f] rounded" />
            <div className="w-6 h-6 bg-[#1a1a1f] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
