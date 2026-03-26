export function ProjectSkeleton() {
  return (
    <div
      className="relative flex flex-col bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden animate-pulse"
      data-testid="project-skeleton"
    >
      {/* Thumbnail skeleton */}
      <div className="relative aspect-video bg-[#1a1a1f]" />

      {/* Content skeleton */}
      <div className="flex flex-col flex-grow p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-[#1a1a1f] rounded mb-2 w-3/4" />

        {/* Description skeleton */}
        <div className="h-4 bg-[#1a1a1f] rounded mb-1 w-full" />
        <div className="h-4 bg-[#1a1a1f] rounded mb-4 w-2/3" />

        {/* Tech stack skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-[#1a1a1f] rounded" />
          <div className="h-6 w-20 bg-[#1a1a1f] rounded" />
          <div className="h-6 w-14 bg-[#1a1a1f] rounded" />
        </div>

        {/* Links skeleton */}
        <div className="mt-auto flex justify-between items-center">
          <div className="h-4 w-20 bg-[#1a1a1f] rounded" />
          <div className="h-8 w-24 bg-[#1a1a1f] rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      data-testid="project-skeleton-grid"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
  );
}
