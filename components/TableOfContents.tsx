'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simple visibility observer for TOC
    const handleScroll = () => {
      setIsVisible(window.scrollY < 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-32 space-y-6">
      <div className="font-mono text-[10px] text-[#6b7280] tracking-widest uppercase mb-4">
        // İÇİNDEKİLER
      </div>
      
      <nav className="flex flex-col gap-3 border-l border-[#3c4a42] pl-4">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          const num = String(index + 1).padStart(2, '0');
          
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`
                block text-sm font-medium transition-all duration-200
                ${item.level === 3 ? 'pl-4 text-[13px]' : ''}
                ${isActive 
                  ? 'text-[#10b981]' 
                  : 'text-[#a1a1aa] hover:text-[#fafafa]'
                }
              `}
              style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}
            >
              <span className={`font-mono text-[10px] mr-2 ${isActive ? 'text-[#10b981]' : 'text-[#6b7280]'}`}>
                {num}.
              </span>
              {item.text}
            </a>
          );
        })}
      </nav>

      {/* Status indicator */}
      <div className="p-4 bg-[#1b1b20] border-l-2 border-[#10b981] mt-12">
        <p className="text-[11px] font-mono text-[#a1a1aa] leading-relaxed uppercase">
          Durum: aktif<br />
          Bağlam: production<br />
          Performans: optimize
        </p>
      </div>
    </div>
  );
}
