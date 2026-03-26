'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Terminal } from 'lucide-react'
import { TypingAnimation } from '@/components/TypingAnimation'
import { StatusBadge } from '@/components/StatusBadge'
import { SocialLinks } from '@/components/SocialLinks'
import { ProjectCard, Project } from '@/components/ProjectCard'
import { BlogCard, BlogPost } from '@/components/BlogCard'
import { ScrollIndicator } from '@/components/ScrollIndicator'

const roles = [
  'Tam Yığın Geliştirici',
  'UI/UX Tasarımcı',
  'Sistem Mimarı',
  'Açık Kaynak Katkıcısı',
]

const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Vesta Dashboard',
    description: 'Gerçek zamanlı veri görselleştirme, koyu tema ve özelleştirilebilir widget\'lar ile modern analiz panosu.',
    category: 'WEB',
    tech: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/hikmetgulsesli/vesta-dashboard',
    demoUrl: 'https://vesta-demo.vercel.app',
  },
  {
    id: '2',
    title: 'Claw Agent SDK',
    description: 'Birden fazla LLM sağlayıcı desteği ile otonom görev yürütümü için AI ajan framework\'ü.',
    category: 'AÇIK KAYNAK',
    tech: ['TypeScript', 'Node.js', 'OpenAI'],
    githubUrl: 'https://github.com/hikmetgulsesli/claw-agent',
    demoUrl: 'https://claw.dev',
  },
  {
    id: '3',
    title: 'Nomad Navigator',
    description: 'Çevrimdışı haritalar ve yerel önerilerle dijital göçebeler için mobil öncelikli seyahat uygulaması.',
    category: 'MOBİL',
    tech: ['React Native', 'Expo', 'Supabase'],
    githubUrl: 'https://github.com/hikmetgulsesli/nomad-navigator',
    demoUrl: 'https://nomad-navigator.app',
  },
  {
    id: '4',
    title: 'TaskForge',
    description: 'Kanban panoları, zaman takibi ve otomatik iş akışlarıyla ekip işbirliği platformu.',
    category: 'WEB',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/hikmetgulsesli/taskforge',
    demoUrl: 'https://taskforge.io',
  },
  {
    id: '5',
    title: 'DataStream API',
    description: 'WebSocket desteği ve gerçek zamanlı analitiklerle yüksek performanslı veri akışı API\'si.',
    category: 'AÇIK KAYNAK',
    tech: ['Rust', 'WebSockets', 'Redis'],
    githubUrl: 'https://github.com/hikmetgulsesli/datastream',
  },
  {
    id: '6',
    title: 'PixelForge Studio',
    description: 'AI destekli filtreler ve toplu işleme özelliklerine sahip tarayıcı tabanlı görüntü düzenleme aracı.',
    category: 'WEB',
    tech: ['WebGL', 'Canvas API', 'TensorFlow.js'],
    githubUrl: 'https://github.com/hikmetgulsesli/pixelforge',
    demoUrl: 'https://pixelforge.studio',
  },
]

const recentPosts: BlogPost[] = [
  {
    id: '1',
    title: 'React\'i 60fps ve Ötesi İçin Optimize Etmek',
    excerpt: 'Karmaşık React uygulamalarında akıcı animasyonlar ve etkileşimler sağlamak için ileri teknikler.',
    category: 'PERFORMANS',
    date: 'Ağu 12',
    slug: 'optimizing-react-60fps',
  },
  {
    id: '2',
    title: 'Rust vs WASM: Performans Sınırı',
    excerpt: 'Tarayıcı tabanlı hesaplama için ikili derleme hedeflerinin ve dengelerinin incelenmesi.',
    category: 'INFRA',
    date: 'Tem 05',
    slug: 'rust-vs-wasm',
  },
  {
    id: '3',
    title: 'Gerçek Zamanlı WebSocket\'ler İçin Özel Hook\'lar',
    excerpt: 'Ana iş parçacığını boğmadan veya bellek sızıntısına neden olmadan karmaşık soket durumlarını yönetme.',
    category: 'SİSTEM',
    date: 'Haz 28',
    slug: 'custom-hooks-websockets',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: 'linear-gradient(to bottom, transparent 50%, rgba(16, 185, 129, 0.03) 50%)',
        backgroundSize: '100% 4px',
      }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          {/* Terminal Greeting */}
          <motion.div
            className="flex items-center gap-2 text-text-muted font-mono text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal className="w-4 h-4 text-primary" />
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
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary to-accent-alt bg-clip-text text-transparent">
              KINETIC<br className="hidden md:block" /> EXPERIENCES.
            </span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            className="font-mono text-lg md:text-xl text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
            <span className="text-text-primary font-semibold">React, Next.js ve TypeScript</span> ile yüksek performanslı uygulamalar geliştiriyorum. İnsan ve makine arasındaki boşluğu dolduran sürükleyici dijital arayüzler oluşturmaya odaklanıyorum.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-inverse rounded-md font-medium transition-all"
            >
              <span>// Hakkımda Bilgi Al</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border border-outline-variant/30 hover:border-primary/50 text-text-primary rounded-md font-medium transition-all"
            >
              <span>&gt; Projeleri Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-mono text-primary mb-2 block">// featured_projects</span>
              <h2 className="font-heading text-3xl font-bold text-text-primary">SEÇİLMİŞ ÇALIŞMALAR</h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-primary transition-colors"
            >
              <span>Tümünü Gör →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Writing Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono text-primary mb-2 block">// recent_writing</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary">GÜNLÜK & ARAŞTIRMA</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
            {recentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Border */}
      <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="p-8 md:p-12 rounded-2xl bg-surface-container border border-gradient-to-r from-primary/30 via-accent/30 to-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary uppercase">
                Haydi harika bir şey <span className="text-primary">birlikte</span> inşa edelim.
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Yeni projeler ve işbirlikleri için şu an açığım. Üzerinde hassas bir çalışma gerektiren bir zorluğunuz varsa, konuşalım.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-12 py-5 bg-primary hover:bg-primary-hover text-inverse rounded-md font-medium transition-all shadow-glow-primary uppercase"
              >
                <Mail className="w-5 h-5" />
                <span>İletişime Geç</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-text-muted font-mono text-sm">
            © 2024 HİKMET GÜLEŞLİ
          </div>
          <div className="flex gap-6 font-mono text-sm">
            <Link href="/projects" className="text-text-muted hover:text-primary transition-colors">PROJELER</Link>
            <Link href="/stack" className="text-text-muted hover:text-primary transition-colors">STACK</Link>
            <Link href="/blog" className="text-text-muted hover:text-primary transition-colors">BLOG</Link>
            <Link href="/contact" className="text-text-muted hover:text-primary transition-colors">İLETİŞİM</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
