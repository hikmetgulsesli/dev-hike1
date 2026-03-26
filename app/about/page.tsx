import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkında",
  description:
    "Hikmet Güleşli - Full-Stack Developer & UI/UX Designer. Modern web teknolojileri ile kullanıcı odaklı dijital ürünler geliştiriyorum.",
  openGraph: {
    title: "Hakkında | Hikmet Güleşli",
    description:
      "Hikmet Güleşli - Full-Stack Developer & UI/UX Designer. Modern web teknolojileri ile kullanıcı odaklı dijital ürünler geliştiriyorum.",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <section className="flex flex-col items-center mb-24">
        <div className="relative mb-8">
          <div className="w-48 h-48 rounded-full bg-[#111113] border-4 border-primary flex items-center justify-center">
            <span className="text-6xl font-headline text-primary">HG</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-headline mb-2">Hakkında</h1>
          <h3 className="text-xl text-secondary mb-6">Full-Stack Developer & UI/UX Designer</h3>
          <p className="text-secondary max-w-2xl text-center">
            Modern web teknolojileri ile kullanıcı odaklı dijital ürünler
            geliştiriyorum. Full-stack geliştirme, performans optimizasyonu
            ve kullanıcı deneyimi tasarımı konularında uzmanlaşmış bir yazılım
            geliştiricisiyim.
          </p>
        </div>
      </section>
      <section className="mb-24">
        <h2 className="text-2xl font-headline mb-8 flex items-center gap-4">
          <span className="text-primary font-mono">//</span> Deneyim Geçmişi
        </h2>
        <div className="space-y-8">
          <div className="p-6 bg-[#111113] rounded-lg border-l-2 border-primary">
            <h3 className="text-lg font-bold mb-1">Senior Full-Stack Developer</h3>
            <p className="text-secondary mb-2">TechCorp Yazılım</p>
            <p className="text-muted text-sm">2022 - Günümüz</p>
          </div>
          <div className="p-6 bg-[#111113] rounded-lg border-l-2 border-border">
            <h3 className="text-lg font-bold mb-1">Full-Stack Developer</h3>
            <p className="text-secondary mb-2">StartupXYZ</p>
            <p className="text-muted text-sm">2020 - 2022</p>
          </div>
          <div className="p-6 bg-[#111113] rounded-lg border-l-2 border-border">
            <h3 className="text-lg font-bold mb-1">Junior Frontend Developer</h3>
            <p className="text-secondary mb-2">Digital Agency</p>
            <p className="text-muted text-sm">2018 - 2020</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-headline mb-8 flex items-center gap-4">
          <span className="text-primary font-mono">//</span> Teknik Yetkinlikler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-[#111113] rounded-lg border border-border">
            <h3 className="font-bold mb-4">Frontend</h3>
            <div className="space-y-3">
              <div><span className="text-secondary">React / Next.js</span><div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden mt-1"><div className="h-full bg-primary rounded-full" style={{width: '90%'}}/></div></div>
              <div><span className="text-secondary">TypeScript</span><div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden mt-1"><div className="h-full bg-primary rounded-full" style={{width: '85%'}}/></div></div>
              <div><span className="text-secondary">Tailwind CSS</span><div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden mt-1"><div className="h-full bg-primary rounded-full" style={{width: '95%'}}/></div></div>
            </div>
          </div>
          <div className="p-6 bg-[#111113] rounded-lg border border-border">
            <h3 className="font-bold mb-4">Backend</h3>
            <div className="space-y-3">
              <div><span className="text-secondary">Node.js</span><div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden mt-1"><div className="h-full bg-primary rounded-full" style={{width: '80%'}}/></div></div>
              <div><span className="text-secondary">PostgreSQL</span><div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden mt-1"><div className="h-full bg-primary rounded-full" style={{width: '75%'}}/></div></div>
              <div><span className="text-secondary">REST APIs</span><div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden mt-1"><div className="h-full bg-primary rounded-full" style={{width: '85%'}}/></div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
