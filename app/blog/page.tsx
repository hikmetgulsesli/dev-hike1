import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Teknik yazılar, kariyer ipuçları ve kişisel deneyimler. Yazılım geliştirme üzerine düşünceler ve öğrendiklerim.",
  openGraph: {
    title: "Blog | Hikmet Güleşli",
    description:
      "Teknik yazılar, kariyer ipuçları ve kişisel deneyimler. Yazılım geliştirme üzerine düşünceler ve öğrendiklerim.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16 border-l-2 border-primary pl-8">
        <h1 className="font-headline text-5xl mb-4">Writing</h1>
        <p className="text-secondary text-lg">
          Teknik yazılar, kariyer ipuçları ve kişisel deneyimler.
        </p>
      </header>
      <div className="text-secondary">Blog içerikleri yakında eklenecek.</div>
    </main>
  );
}
