'use client'

import { motion } from 'framer-motion'
import { GitBranch, ExternalLink } from 'lucide-react'

export interface Project {
  id: string
  title: string
  description: string
  category: string
  tech: string[]
  githubUrl?: string
  demoUrl?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative flex flex-col bg-background-elevated rounded-lg overflow-hidden border-l-2 border-transparent hover:border-primary transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="aspect-video bg-background-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="absolute top-4 right-4 px-2 py-1 bg-background/80 backdrop-blur rounded text-xs font-mono text-primary border border-primary/20">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs font-mono bg-background-subtle rounded text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono text-text-secondary hover:text-primary transition-colors"
            >
              <GitBranch className="w-4 h-4" aria-hidden="true" />
              <span>// GITHUB</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-inverse rounded-md text-xs font-medium transition-all"
            >
              <span>DEMO</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
