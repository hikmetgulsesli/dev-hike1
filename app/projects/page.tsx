import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Full-stack web uygulamaları, mobil projeler ve açık kaynak çalışmalar. Kullanıcı odaklı ve performanslı dijital ürünler.",
  openGraph: {
    title: "Projeler | Hikmet Güleşli",
    description:
      "Full-stack web uygulamaları, mobil projeler ve açık kaynak çalışmalar. Kullanıcı odaklı ve performanslı dijital ürünler.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary font-mono text-sm">//</span>
          <span className="text-muted font-mono text-sm">PORTFOLIO</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline mb-6">PROJELER</h1>
        <p className="text-secondary text-lg max-w-2xl">
          Full-stack web uygulamaları, mobil projeler ve açık kaynak
          çalışmalar. Kullanıcı odaklı ve performanslı dijital ürünler.
        </p>
      </header>
      <div className="text-secondary">Proje içerikleri yakında eklenecek.</div>
    </main>
  );
}
