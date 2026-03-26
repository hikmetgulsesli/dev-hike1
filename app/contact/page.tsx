import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Hikmet Güleşli ile iletişime geçin. Proje talepleriniz, iş teklifleriniz veya sorularınız için benimle iletişime geçebilirsiniz.",
  openGraph: {
    title: "İletişim | Hikmet Güleşli",
    description:
      "Hikmet Güleşli ile iletişime geçin. Proje talepleriniz, iş teklifleriniz veya sorularınız için benimle iletişime geçebilirsiniz.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-5xl font-headline mb-4">ESTABLISH_CONNECTION</h1>
          <p className="text-secondary text-lg mb-8">
            Proje talepleriniz, iş teklifleriniz veya sorularınız için benimle iletişime geçebilirsiniz.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-secondary">Ad</label>
                <input
                  type="text"
                  placeholder="Adınız"
                  className="w-full px-4 py-3 bg-[#111113] border border-[#27272a] rounded-lg text-[#fafafa] placeholder-[#6b7280] focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-secondary">Soyad</label>
                <input
                  type="text"
                  placeholder="Soyadınız"
                  className="w-full px-4 py-3 bg-[#111113] border border-[#27272a] rounded-lg text-[#fafafa] placeholder-[#6b7280] focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-secondary">E-posta</label>
              <input
                type="email"
                placeholder="ornek@email.com"
                className="w-full px-4 py-3 bg-[#111113] border border-[#27272a] rounded-lg text-[#fafafa] placeholder-[#6b7280] focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-secondary">Konu</label>
              <input
                type="text"
                placeholder="Mesajınızın konusu"
                className="w-full px-4 py-3 bg-[#111113] border border-[#27272a] rounded-lg text-[#fafafa] placeholder-[#6b7280] focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-secondary">Mesaj</label>
              <textarea
                placeholder="Mesajınızı buraya yazın..."
                rows={5}
                className="w-full px-4 py-3 bg-[#111113] border border-[#27272a] rounded-lg text-[#fafafa] placeholder-[#6b7280] focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-primary text-white rounded-md flex items-center justify-center gap-4 hover:bg-[#059669] transition-colors"
            >
              TRANSMIT_MESSAGE
              <span>send</span>
            </button>
          </form>
        </div>
        <div className="space-y-8">
          <div className="p-6 bg-[#111113] rounded-lg border border-[#27272a]">
            <h3 className="font-bold mb-4">İletişim Bilgileri</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary">mail</span>
                <a href="mailto:iletisim@hikmetgulsesli.com" className="text-secondary hover:text-primary transition-colors">
                  iletisim@hikmetgulsesli.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">location_on</span>
                <span className="text-secondary">Türkiye</span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-[#111113] rounded-lg border border-[#27272a]">
            <h3 className="font-bold mb-4">Sosyal Medya</h3>
            <div className="flex gap-4">
              <a href="https://github.com/hikmetgulsesli" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#1a1a1f] rounded-md text-secondary hover:text-primary hover:bg-[#10b981]/10 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/hikmetgulsesli" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#1a1a1f] rounded-md text-secondary hover:text-primary hover:bg-[#10b981]/10 transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com/hikmetgulsesli" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#1a1a1f] rounded-md text-secondary hover:text-primary hover:bg-[#10b981]/10 transition-colors">
                Twitter
              </a>
            </div>
          </div>
          <div className="p-6 bg-[#111113] rounded-lg border border-[#27272a]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-secondary">Şu an müsaitim</span>
            </div>
            <p className="text-muted text-sm">
              Hızlı yanıt süreleri için sosyal medya üzerinden de iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
