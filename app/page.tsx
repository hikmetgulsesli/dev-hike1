'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, Terminal } from 'lucide-react'
import { TypingAnimation } from '@/components/TypingAnimation'
import { StatusBadge } from '@/components/StatusBadge'
import { SocialLinks } from '@/components/SocialLinks'
import { ProjectCard, Project } from '@/components/ProjectCard'
import { BlogCard, BlogPost } from '@/components/BlogCard'
import { ScrollIndicator } from '@/components/ScrollIndicator'

const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Sistem Mimarı',
  'Açık Kaynak Katkıcısı',
]

const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Vesta Dashboard',
    description: 'Modern analytics dashboard with real-time data visualization, dark theme, and customizable widgets.',
    category: 'WEB',
    tech: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/hikmetgulsesli/vesta-dashboard',
    demoUrl: 'https://vesta-demo.vercel.app',
  },
  {
    id: '2',
    title: 'Claw Agent SDK',
    description: 'AI agent framework for autonomous task execution with support for multiple LLM providers.',
    category: 'AÇIK KAYNAK',
    tech: ['TypeScript', 'Node.js', 'OpenAI'],
    githubUrl: 'https://github.com/hikmetgulsesli/claw-agent',
    demoUrl: 'https://claw.dev',
  },
  {
    id: '3',
    title: 'Nomad Navigator',
    description: 'Mobile-first travel companion app for digital nomads with offline maps and local recommendations.',
    category: 'MOBİL',
    tech: ['React Native', 'Expo', 'Supabase'],
    githubUrl: 'https://github.com/hikmetgulsesli/nomad-navigator',
    demoUrl: 'https://nomad-navigator.app',
  },
  {
    id: '4',
    title: 'TaskForge',
    description: 'Team collaboration platform with kanban boards, time tracking, and automated workflows.',
    category: 'WEB',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/hikmetgulsesli/taskforge',
    demoUrl: 'https://taskforge.io',
  },
  {
    id: '5',
    title: 'DataStream API',
    description: 'High-performance data streaming API with WebSocket support and real-time analytics.',
    category: 'AÇIK KAYNAK',
    tech: ['Rust', 'WebSockets', 'Redis'],
    githubUrl: 'https://github.com/hikmetgulsesli/datastream',
  },
  {
    id: '6',
    title: 'PixelForge Studio',
    description: 'Browser-based image editing tool with AI-powered filters and batch processing.',
    category: 'WEB',
    tech: ['WebGL', 'Canvas API', 'TensorFlow.js'],
    githubUrl: 'https://github.com/hikmetgulsesli/pixelforge',
    demoUrl: 'https://pixelforge.studio',
  },
]

const recentPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Optimizing React for 60fps and Beyond',
    excerpt: 'Advanced techniques for maintaining smooth animations and interactions in complex React applications.',
    category: 'PERFORMANS',
    date: 'Ağu 12',
    slug: 'optimizing-react-60fps',
  },
  {
    id: '2',
    title: 'Rust vs WASM: The Performance Frontier',
    excerpt: 'Exploration of binary compilation targets for browser-based computation and their trade-offs.',
    category: 'INFRA',
    date: 'Tem 05',
    slug: 'rust-vs-wasm',
  },
  {
    id: '3',
    title: 'Custom Hooks for Real-time WebSockets',
    excerpt: 'How to manage complex socket states without flooding the main thread or causing memory leaks.',
    category: 'SİSTEM',
    date: 'Haz 28',
    slug: 'custom-hooks-websockets',
  },
]

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Scanline Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50" 
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(16, 185, 129, 0.03) 50%)',
          backgroundSize: '100% 4px',
        }}
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-4xl mx-auto w-full space-y-8">
          {/* Terminal Greeting */}
          <motion.div
            className="flex items-center gap-2 text-text-muted font-mono text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>system.init(user: &quot;hikmet&quot;)</span>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatusBadge text="Projeler için uygun" available={true} />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary to-accent-alt bg-clip-text text-transparent">
              KINETIC EXPERIENCES.
            </span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            className="font-mono text-lg md:text-xl text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-primary">&gt;</span>{' '}
            <TypingAnimation phrases={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="text-text-secondary text-lg max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Modern web teknolojileriyle dijital ürünler inşa ediyorum. 
            Kullanıcı deneyimini ön planda tutan, performans odaklı çözümler geliştiriyorum.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-inverse rounded-md font-medium transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span>// Hakkımda Bilgi Al</span>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-primary/50 text-text-primary rounded-md font-medium transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span>&gt; Projeleri Gör</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <SocialLinks />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Featured Projects Section */}
      <section 
        className="py-24 px-6 md:px-12 lg:px-24 bg-background-elevated"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-mono text-primary mb-2 block">// Öne Çıkanlar</span>
              <h2 id="projects-heading" className="font-heading text-3xl font-bold text-text-primary">Selected Works</h2>
            </div>
            <a
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span>Tümünü Gör →</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Writing Section */}
      <section 
        className="py-24 px-6 md:px-12 lg:px-24"
        aria-labelledby="blog-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono text-primary mb-2 block">// Günlük</span>
            <h2 id="blog-heading" className="font-heading text-3xl font-bold text-text-primary">Logs & Research</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
            {recentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Border */}
      <section 
        className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Background Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" 
          aria-hidden="true"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="p-8 md:p-12 rounded-2xl bg-background-elevated border border-gradient-to-r from-primary/30 via-accent/30 to-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" aria-hidden="true" />
            <div className="relative z-10 space-y-6">
              <h2 id="cta-heading" className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
                Birlikte çalışalım
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Yeni bir proje fikriniz mi var? Mevcut bir ürünü mü geliştirmek istiyorsunuz? 
                Hadi birlikte harika bir şey inşa edelim.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-12 py-5 bg-primary hover:bg-primary-hover text-inverse rounded-md font-medium transition-all shadow-glow-primary focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>İletişime Geç</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="w-full py-12 px-6 md:px-12 border-t border-emerald-500/10"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-text-muted font-mono text-sm">
            © {new Date().getFullYear()} Hikmet Güleşli
          </div>
          <nav aria-label="Footer navigation" className="flex gap-6 font-mono text-sm">
            <a href="/projects" className="text-text-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/50">Projeler</a>
            <a href="/stack" className="text-text-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/50">Stack</a>
            <a href="/blog" className="text-text-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/50">Blog</a>
            <a href="/contact" className="text-text-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/50">İletişim</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
