import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hikmetgulsesli.com";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  readTime: number;
}

// Available blog posts - in production this would come from CMS/database
const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-react-60fps",
    title: "Optimizing React for 60fps",
    excerpt:
      "Performance optimization techniques for React applications to achieve smooth 60fps animations and interactions.",
    publishedAt: "2024-06-12",
    updatedAt: "2024-06-12",
    category: "teknik",
    tags: ["react", "performance", "optimization"],
    featuredImage: "/blog/optimizing-react.jpg",
    author: {
      name: "Hikmet Güleşli",
      avatar: "/avatar.jpg",
      title: "Full-Stack Developer",
    },
    readTime: 8,
  },
];

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${BASE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.featuredImage
        ? [
            {
              url: `${BASE_URL}${post.featuredImage}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [`${BASE_URL}${post.featuredImage}`] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? `${BASE_URL}${post.featuredImage}` : undefined,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Hikmet Güleşli",
      url: BASE_URL,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };

  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-muted font-mono">
                {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-primary">//</span>
              <span className="text-sm text-muted">
                {post.readTime} min okuma
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline mb-6">
              {post.title}
            </h1>
            <div className="h-1 w-24 bg-primary" />
          </header>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="text-secondary">
              Blog içeriği yakında eklenecek.
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
