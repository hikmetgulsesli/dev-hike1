interface EmptyStateProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export function EmptyState({ searchQuery, selectedCategory }: EmptyStateProps) {
  const hasFilters = searchQuery || selectedCategory;

  return (
    <div
      className="flex flex-col items-center justify-center py-24 px-6 border border-[#27272a] rounded-lg bg-[#111113]/50"
      data-testid="empty-state"
    >
      <div className="w-16 h-16 mb-6 text-[#6b7280]">
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#fafafa] mb-2">
        Proje Bulunamadı
      </h3>
      <p className="text-[#a1a1aa] text-center max-w-md">
        {hasFilters ? (
          <>
            Arama kriterlerinize uygun proje bulunamadı.
            <br />
            Farklı bir arama terimi deneyin veya filtreleri temizleyin.
          </>
        ) : (
          'Henüz proje eklenmemiş. Daha sonra tekrar kontrol edin.'
        )}
      </p>
    </div>
  );
}
