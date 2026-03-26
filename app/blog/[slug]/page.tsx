'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { TableOfContents } from '@/components/TableOfContents';
import { ShareButtons } from '@/components/ShareButtons';
import { AuthorBio } from '@/components/AuthorBio';
import { RelatedPosts } from '@/components/RelatedPosts';
import Link from 'next/link';

// Types for TOC
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Mock post data for demo
const MOCK_POST: BlogPost = {
  id: '1',
  slug: 'optimizing-react-60fps',
  title: 'Optimizing React for 60fps and Low Latency',
  excerpt: 'In modern web development, achieving a fluid 60 frames per second isn\'t just a luxury—it\'s the baseline for user experience.',
  content: `
## Introduction

In modern web development, achieving a fluid 60 frames per second (fps) isn't just a luxury—it's the baseline for user experience. When React applications scale, reconciliation overhead can lead to dropped frames and perceptible input lag. This guide dives into the sentinel strategies for reclaiming performance.

## Identifying Bottlenecks

Before we optimize, we must measure. The React Profiler is our primary diagnostic tool. Look for "Commits" that take longer than 16ms. This is the threshold for a single frame at 60Hz. If your task takes 20ms, the browser cannot paint the next frame in time, resulting in "jank".

### Using the Profiler

The React Profiler API allows us to capture timing information programmatically:

\`\`\`typescript
const profilerCallback = (
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  if (actualDuration > 16) {
    console.warn(\`Slow render detected: \${id} took \${actualDuration}ms\`);
  }
};
\`\`\`

## Rendering Strategies

Unnecessary re-renders are the silent killers of performance. In a complex dashboard, a single state update at the root can trigger a cascade of reconciliation across hundreds of components.

### Component memoization

React.memo is a higher-order component that memoizes a component:

\`\`\`tsx
const MemoizedList = React.memo(({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} data={item} />
      ))}
    </ul>
  );
}, (prev, next) => {
  return prev.items.length === next.items.length;
});
\`\`\`

## Memoization Patterns

Beyond React.memo, we have useMemo and useCallback for value and function memoization.

### useMemo

Use useMemo to memoize expensive computations:

\`\`\`tsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
\`\`\`

### useCallback

Use useCallback to memoize callbacks passed to child components:

\`\`\`tsx
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);
\`\`\`

## Concurrent React

With React 18, we can now mark updates as "non-urgent" using startTransition. This allows the browser to remain responsive to user inputs while heavy UI updates are calculated in the background.

### startTransition

\`\`\`tsx
import { startTransition } from 'react';

startTransition(() => {
  setSearchQuery(input);
});
\`\`\`

### useDeferredValue

For search inputs, useDeferredValue provides a deferred version of your value:

\`\`\`tsx
const deferredQuery = useDeferredValue(query);
\`\`\`

## Conclusion

Performance optimization is an iterative process. Measure first, then optimize the bottlenecks you find. React 18's concurrent features give us powerful tools to build fluid interfaces without sacrificing developer experience.
`,
  featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
  category: 'teknik',
  tags: ['React', 'Performance', 'TypeScript', 'Frontend'],
  readTime: 8,
  publishedAt: '2024-10-24T10:00:00Z',
  updatedAt: '2024-10-24T10:00:00Z',
  status: 'published',
  author: {
    id: '1',
    name: 'Hikmet Güleşli',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    title: 'Senior Full-Stack Developer',
    bio: 'Senior Full-Stack Developer specializing in low-latency interfaces and high-performance React ecosystems. Building the future of the web, one frame at a time.',
    location: 'İstanbul, Türkiye',
    social: {
      github: 'https://github.com/hikmetgulsesli',
      linkedin: 'https://linkedin.com/in/hikmetgulsesli',
      twitter: 'https://twitter.com/hikmetgulsesli',
      email: 'hikmet@hikmetgulsesli.com'
    }
  },
  featured: true,
  pinned: false
};

// Related posts for demo
const RELATED_POSTS: BlogPost[] = [
  {
    id: '2',
    slug: 'rust-vs-wasm',
    title: 'Rust vs WASM: The Performance Frontier',
    excerpt: 'Exploration of binary compilation targets for browser-based computation and their implications for web performance.',
    content: '',
    category: 'teknik',
    tags: ['Rust', 'WebAssembly', 'Performance'],
    readTime: 12,
    publishedAt: '2024-08-12T10:00:00Z',
    updatedAt: '2024-08-12T10:00:00Z',
    status: 'published',
    author: {
      id: '1',
      name: 'Hikmet Güleşli',
      avatar: '',
      title: 'Senior Full-Stack Developer',
      bio: '',
      social: {}
    },
    featured: false,
    pinned: false
  },
  {
    id: '3',
    slug: 'realtime-websockets',
    title: 'Custom Hooks for Real-time WebSockets',
    excerpt: 'How to manage complex socket states without flooding the main thread and maintain 60fps UI.',
    content: '',
    category: 'teknik',
    tags: ['WebSocket', 'React', 'Hooks'],
    readTime: 10,
    publishedAt: '2024-07-05T10:00:00Z',
    updatedAt: '2024-07-05T10:00:00Z',
    status: 'published',
    author: {
      id: '1',
      name: 'Hikmet Güleşli',
      avatar: '',
      title: 'Senior Full-Stack Developer',
      bio: '',
      social: {}
    },
    featured: false,
    pinned: false
  },
  {
    id: '4',
    slug: 'death-of-minimalism',
    title: 'The Death of Minimalism in UI',
    excerpt: 'Why density and data-rich interfaces are returning to the mainstream in modern web design.',
    content: '',
    category: 'tasarim',
    tags: ['UI Design', 'UX', 'Trends'],
    readTime: 6,
    publishedAt: '2024-06-28T10:00:00Z',
    updatedAt: '2024-06-28T10:00:00Z',
    status: 'published',
    author: {
      id: '1',
      name: 'Hikmet Güleşli',
      avatar: '',
      title: 'Senior Full-Stack Developer',
      bio: '',
      social: {}
    },
    featured: false,
    pinned: false
  }
];

// Extract TOC from content
function extractToc(content: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/);
    const h3Match = line.match(/^###\s+(.+)/);
    
    if (h2Match) {
      const text = h2Match[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, text, level: 3 });
    }
  }
  
  return toc;
}

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Get category badge color
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    teknik: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    kariyer: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    kisisel: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    tutorial: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    tasarim: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  };
  return colors[category] || colors.teknik;
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

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchPost = async () => {
      setLoading(true);
      try {
        // In production, this would be: const res = await fetch(`/api/posts/${slug}`);
        // For now, use mock data based on slug
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Find post from mock data or use default
        const foundPost = RELATED_POSTS.find(p => p.slug === slug) || MOCK_POST;
        setPost(foundPost);
        setToc(extractToc(foundPost.content));
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px', threshold: 0 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0f]">
        <div className="pt-32 pb-20 px-8 max-w-screen-xl mx-auto">
          {/* Hero Skeleton */}
          <div className="max-w-4xl mb-16 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 w-24 bg-[#1a1a1f] rounded" />
              <div className="h-4 w-24 bg-[#1a1a1f] rounded" />
              <div className="h-4 w-24 bg-[#1a1a1f] rounded" />
            </div>
            <div className="h-16 w-3/4 bg-[#1a1a1f] rounded mb-4" />
            <div className="h-16 w-1/2 bg-[#1a1a1f] rounded" />
          </div>
          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="h-64 bg-[#1a1a1f] rounded-xl" />
              <div className="space-y-4">
                <div className="h-6 w-full bg-[#1a1a1f] rounded" />
                <div className="h-6 w-5/6 bg-[#1a1a1f] rounded" />
                <div className="h-6 w-4/6 bg-[#1a1a1f] rounded" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="sticky top-32 h-64 bg-[#1a1a1f] rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0a0a0f]">
        <div className="pt-32 pb-20 px-8 max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#fafafa] mb-4">Yazı Bulunamadı</h1>
          <p className="text-[#a1a1aa] mb-8">Aradığınız yazı mevcut değil veya kaldırılmış olabilir.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#10b981] text-[#0a0a0f] rounded-lg font-semibold hover:bg-[#059669] transition-colors"
          >
            <span>←</span> Blog&apos;a Dön
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="max-w-screen-xl mx-auto px-8 mb-16 pt-32">
        <div className="flex flex-col gap-6 max-w-4xl">
          {/* Meta info */}
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-[#10b981]/80 uppercase">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="w-1 h-1 rounded-full bg-[#3c4a42]" />
            <span>{post.readTime} Min Okuma</span>
            <span className="w-1 h-1 rounded-full bg-[#3c4a42]" />
            <span className={`px-2 py-0.5 border rounded ${getCategoryColor(post.category)}`}>
              {getCategoryLabel(post.category)}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-[#fafafa]">
            {post.title}
          </h1>
          
          {/* Accent line */}
          <div className="h-1 w-24 bg-[#10b981]" />
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="max-w-screen-xl mx-auto px-8 mb-12">
          <div className="relative w-full h-[400px] overflow-hidden rounded-xl border border-[#27272a]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Mobile TOC */}
        <div className="lg:hidden col-span-12">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between p-4 bg-[#111113] border border-[#27272a] rounded-lg"
          >
            <span className="font-mono text-xs text-[#a1a1aa] uppercase tracking-widest">
              // İÇİNDEKİLER
            </span>
            <svg
              className={`w-5 h-5 text-[#a1a1aa] transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {mobileTocOpen && (
            <nav className="mt-4 p-4 bg-[#111113] border border-[#27272a] rounded-lg">
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 16}px` }}>
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 text-sm transition-colors ${
                        activeSection === item.id
                          ? 'text-[#10b981]'
                          : 'text-[#a1a1aa] hover:text-[#fafafa]'
                      }`}
                      onClick={() => setMobileTocOpen(false)}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Table of Contents Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <TableOfContents items={toc} activeId={activeSection} />
        </aside>

        {/* Article Content */}
        <article className="lg:col-span-7 space-y-12">
          {/* Article Body */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content
              .replace(/^##\s+(.+)/gm, (_, text) => {
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return `<h2 id="${id}" class="text-3xl font-bold uppercase tracking-tight text-[#fafafa] mb-6 mt-12"><span class="text-[#10b981] mr-2">&gt;</span>${text}</h2>`;
              })
              .replace(/^###\s+(.+)/gm, (_, text) => {
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return `<h3 id="${id}" class="text-xl font-semibold text-[#fafafa] mb-4 mt-8">${text}</h3>`;
              })
              .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<div class="rounded-lg overflow-hidden border border-[#27272a]/30 bg-[#0e0e13] font-mono text-sm my-6">
                  <div class="bg-[#1f1f25] flex items-center justify-between px-4 py-2 border-b border-[#27272a]/20">
                    <span class="text-[10px] text-[#6b7280] uppercase tracking-widest">${lang || 'code'}</span>
                    <button class="text-[#10b981] hover:text-[#4edea3] transition-colors flex items-center gap-1 text-xs">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      COPY
                    </button>
                  </div>
                  <pre class="p-4 overflow-x-auto"><code class="text-[#a1a1aa]">${escapedCode}</code></pre>
                </div>`;
              })
              .replace(/`([^`]+)`/g, '<code class="bg-[#1a1a1f] px-1.5 py-0.5 rounded text-[#10b981] text-sm">$1</code>')
              .replace(/\n\n/g, '</p><p class="text-[#a1a1aa] leading-relaxed mb-4">')
              .replace(/^(?!<[h|p|c|ul|ol|l|div])/gm, '<p class="text-[#a1a1aa] leading-relaxed mb-4">')
              .replace(/(<\/h[23]>)/g, '$1<p class="text-[#a1a1aa] leading-relaxed mb-4">')
            }}
          />

          {/* Share Buttons */}
          <ShareButtons title={post.title} slug={post.slug} />

          {/* Author Bio */}
          <AuthorBio author={post.author} />

          {/* Tags */}
          <div className="pt-8 border-t border-[#27272a]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#111113] border border-[#27272a] rounded-full text-sm text-[#a1a1aa] hover:border-[#10b981]/50 hover:text-[#10b981] transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Empty column for balancing */}
        <div className="lg:col-span-2" />
      </div>

      {/* Related Posts */}
      <RelatedPosts posts={RELATED_POSTS} />

      {/* Giscus Comments Placeholder */}
      <section className="max-w-screen-xl mx-auto px-8 mt-32 pt-12 border-t border-[#27272a]">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#fafafa] mb-4">Yorumlar</h3>
          <p className="text-[#a1a1aa] mb-8">
            Bu yazı hakkında düşüncelerinizi paylaşmak için GitHub hesabınızla yorum yapabilirsiniz.
          </p>
          <div className="max-w-xl mx-auto p-8 bg-[#111113] border border-[#27272a] rounded-xl text-center">
            <p className="font-mono text-xs text-[#6b7280] uppercase tracking-widest mb-2">
              // GISCUS_INTEGRATION_READY
            </p>
            <p className="text-[#a1a1aa] text-sm">
              Yorum sistemi yakında aktif edilecek.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
