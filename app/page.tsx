import { HeroScanlines } from "@/components/Scanlines";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex flex-col justify-center px-8 md:px-24 py-20 bg-[#0a0a0f]">
        <HeroScanlines opacity={0.03} />
        <div className="max-w-4xl space-y-8 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-[#111113] border border-[#27272a]/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#6b7280]">Available for work</span>
          </div>
          
          <div className="space-y-4">
            <p className="font-mono text-[#10b981] text-xl tracking-tight">
              &gt; Merhaba, ben Hikmet_
            </p>
            <h1 className="font-bold text-5xl md:text-8xl tracking-tighter leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="bg-gradient-to-r from-[#10b981] to-[#6366f1] bg-clip-text text-transparent">
                KINETIC
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#10b981] to-[#6366f1] bg-clip-text text-transparent">
                EXPERIENCES.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl leading-relaxed">
              Building high-performance applications with{" "}
              <span className="text-[#fafafa] font-semibold">React, Next.js, and TypeScript</span>. 
              Focused on creating immersive digital interfaces that bridge the gap between human and machine.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 bg-[#10b981] text-[#0a0a0f] font-bold rounded-md shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
              <span className="font-mono">//</span> Hakkımda Bilgi Al
            </button>
            <button className="px-8 py-4 border border-[#3f3f46]/30 text-[#fafafa] font-bold rounded-md hover:bg-[#10b981]/5 transition-colors flex items-center gap-2">
              <span className="font-mono">&gt;</span> Projeleri Gör
            </button>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-6 pt-12 text-[#a1a1aa]">
            <a href="#" className="hover:text-[#10b981] transition-colors flex items-center gap-2 font-mono text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GITHUB
            </a>
            <a href="#" className="hover:text-[#10b981] transition-colors flex items-center gap-2 font-mono text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LINKEDIN
            </a>
            <a href="#" className="hover:text-[#10b981] transition-colors flex items-center gap-2 font-mono text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X_SOCIAL
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-8 md:px-24 bg-[#111113]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-mono text-[#10b981] text-sm uppercase tracking-[0.3em] block mb-2">// featured_projects</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Selected Works
            </h2>
          </div>
          <a href="#" className="font-mono text-[#10b981] hover:underline underline-offset-8 transition-all">
            Tümünü Gör →
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="group bg-[#1a1a1f] hover:bg-[#27272a] transition-all duration-300 border-l-2 border-transparent hover:border-[#10b981] overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <div className="w-full h-full bg-gradient-to-br from-[#10b981]/20 to-[#6366f1]/20 flex items-center justify-center">
                <span className="font-mono text-[#10b981]">Sentinel Dashboard</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sentinel Dashboard
              </h3>
              <p className="text-sm text-[#a1a1aa] line-clamp-2">
                Real-time network security monitoring interface with 3D packet visualization.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">REACT</span>
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">TAILWIND</span>
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">D3.JS</span>
              </div>
            </div>
          </div>
          
          {/* Project Card 2 */}
          <div className="group bg-[#1a1a1f] hover:bg-[#27272a] transition-all duration-300 border-l-2 border-transparent hover:border-[#10b981] overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <div className="w-full h-full bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 flex items-center justify-center">
                <span className="font-mono text-[#6366f1]">Claw Open Projects</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Claw Open Projects
              </h3>
              <p className="text-sm text-[#a1a1aa] line-clamp-2">
                A decentralized collaboration platform for open-source hardware developers.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">NEXT.JS</span>
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">TYPESCRIPT</span>
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">POSTGRES</span>
              </div>
            </div>
          </div>
          
          {/* Project Card 3 */}
          <div className="group bg-[#1a1a1f] hover:bg-[#27272a] transition-all duration-300 border-l-2 border-transparent hover:border-[#10b981] overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <div className="w-full h-full bg-gradient-to-br from-[#8b5cf6]/20 to-[#10b981]/20 flex items-center justify-center">
                <span className="font-mono text-[#8b5cf6]">AI Agent Platform</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                AI Agent Platform
              </h3>
              <p className="text-sm text-[#a1a1aa] line-clamp-2">
                Autonomous agent orchestration framework for complex business workflows.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">PYTHON</span>
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">LANGCHAIN</span>
                <span className="px-2 py-1 bg-[#0a0a0f] font-mono text-[10px] text-[#c0c1ff]">FASTAPI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="py-24 px-8 md:px-24 bg-[#0a0a0f]">
        <div className="mb-12">
          <span className="font-mono text-[#10b981] text-sm uppercase tracking-[0.3em] block mb-2">// recent_writing</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Logs & Research
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Blog Post 1 */}
          <article className="space-y-4">
            <div className="font-mono text-xs text-[#c0c1ff] tracking-widest uppercase">MART 12, 2024</div>
            <h3 className="text-2xl font-bold tracking-tight hover:text-[#10b981] transition-colors cursor-pointer leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Optimizing React for 60fps
            </h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              A deep dive into virtualization, memory management, and rendering pipelines in complex dashboards.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#6b7280]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              8 DAKİKA OKUMA
            </div>
          </article>
          
          {/* Blog Post 2 */}
          <article className="space-y-4">
            <div className="font-mono text-xs text-[#c0c1ff] tracking-widest uppercase">ŞUBAT 28, 2024</div>
            <h3 className="text-2xl font-bold tracking-tight hover:text-[#10b981] transition-colors cursor-pointer leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Future of AI Agents
            </h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Why the next shift in UI will be agentic, moving from interfaces to instructions and workflows.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#6b7280]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              12 DAKİKA OKUMA
            </div>
          </article>
          
          {/* Blog Post 3 */}
          <article className="space-y-4">
            <div className="font-mono text-xs text-[#c0c1ff] tracking-widest uppercase">OCAK 15, 2024</div>
            <h3 className="text-2xl font-bold tracking-tight hover:text-[#10b981] transition-colors cursor-pointer leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Building Terminal UIs
            </h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Exploring the psychology of the CLI and how to translate that efficiency to the modern web browser.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#6b7280]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              6 DAKİKA OKUMA
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 md:px-24 bg-[#0e0e13] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#10b981]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let&apos;s build something <span className="text-[#10b981]">amazing</span> together.
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Currently open for new projects and collaborations. If you have a challenge that needs precise execution, let&apos;s talk.
          </p>
          <div className="pt-8">
            <button className="px-12 py-5 bg-[#10b981] text-[#0a0a0f] font-bold rounded-md shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform flex items-center gap-3 mx-auto uppercase tracking-widest">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              İletişime Geç
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0f] border-t border-[#10b981]/10 w-full py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4">
          <div className="text-[#10b981] font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            HIKMET GÜLEŞLI
          </div>
          <div className="font-mono text-xs tracking-mono text-[#6b7280]">
            © 2024 HIKMET GÜLEŞLI // SYSTEM_READY
          </div>
          <div className="flex gap-6 font-mono text-xs tracking-mono">
            <a href="#" className="text-[#6b7280] hover:text-[#10b981] underline decoration-[#10b981]/30 transition-opacity duration-200">
              GITHUB
            </a>
            <a href="#" className="text-[#6b7280] hover:text-[#10b981] underline decoration-[#10b981]/30 transition-opacity duration-200">
              LINKEDIN
            </a>
            <a href="#" className="text-[#6b7280] hover:text-[#10b981] underline decoration-[#10b981]/30 transition-opacity duration-200">
              SOURCE_CODE
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
