import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hikmetgulsesli.com";

interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  category: "web" | "mobile" | "open-source" | "freelance";
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  publishedAt: string;
}

// Demo project for development - in production this would come from CMS/database
const demoProject: Project = {
  slug: "vesta-dashboard",
  title: "Vesta Dashboard",
  shortDescription:
    "Modern bir finans takip ve analiz platformu. Gerçek zamanlı veri görselleştirme.",
  description:
    "Kullanıcıların finansal verilerini takip etmelerini ve analiz etmelerini sağlayan kapsamlı bir dashboard uygulaması.",
  thumbnail: "/projects/vesta-dashboard.jpg",
  category: "web",
  techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  liveUrl: "https://vesta-dashboard.example.com",
  githubUrl: "https://github.com/hikmetgulsesli/vesta-dashboard",
  featured: true,
  publishedAt: "2024-05-15",
};

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  // In production, fetch project by slug from CMS
  const project =
    slug === demoProject.slug ? demoProject : { ...demoProject, slug };

  const url = `${BASE_URL}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url,
      type: "article",
      images: project.thumbnail
        ? [
            {
              url: project.thumbnail,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = params;
  const project =
    slug === demoProject.slug ? demoProject : { ...demoProject, slug };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.shortDescription,
    image: project.thumbnail,
    author: {
      "@type": "Person",
      name: "Hikmet Güleşli",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Hikmet Güleşli",
      url: BASE_URL,
    },
    datePublished: project.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/projects/${project.slug}`,
    },
  };

  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-lg overflow-hidden border border-border mb-8">
              <div className="w-full h-full bg-[#111113] flex items-center justify-center">
                <span className="text-muted">Proje Görseli</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-headline mb-4">
              {project.title}
            </h1>
            <p className="text-secondary text-lg mb-6">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#1a1a1f] text-sm text-secondary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-white rounded-md flex items-center gap-2 hover:bg-primary-hover transition-colors"
                >
                  Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-border rounded-md flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
