'use client';

import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group relative flex flex-col bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#10b981] hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.3)]"
      data-testid="project-card"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-4 right-4 px-2 py-1 bg-[#0a0a0f]/80 backdrop-blur-sm border border-[#27272a] rounded text-xs font-mono text-[#10b981]">
          {project.category.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 border-l-2 border-transparent group-hover:border-[#10b981] transition-colors duration-300">
        <h3 className="text-xl font-bold text-[#fafafa] mb-2" data-testid="project-title">
          {project.title}
        </h3>
        <p
          className="text-[#a1a1aa] text-sm mb-4 line-clamp-2"
          data-testid="project-description"
        >
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4" data-testid="tech-stack">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-1 bg-[#1a1a1f] border border-[#27272a] rounded text-xs text-[#a1a1aa]"
            >
              {tech.name}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs text-[#6b7280]">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex justify-between items-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono text-[#a1a1aa] hover:text-[#10b981] transition-colors"
              data-testid="github-link"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              // GITHUB
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded text-xs text-[#10b981] hover:bg-[#10b981]/20 transition-colors"
              data-testid="demo-link"
            >
              DEMO
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
