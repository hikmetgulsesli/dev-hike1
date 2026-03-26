'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  slug: string
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      className="group relative flex-shrink-0 w-[320px] bg-surface-container rounded-lg overflow-hidden border-l-2 border-transparent hover:border-primary transition-all duration-300"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/blog/${post.slug}`} className="block p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-primary">{post.date}</span>
          <span className="text-xs font-mono text-text-muted">// {post.category}</span>
        </div>
        
        <h3 className="font-heading text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>
        
        <span className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary-hover transition-colors">
          <span>[ READ_FULL_ENTRY ]</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.article>
  )
}
