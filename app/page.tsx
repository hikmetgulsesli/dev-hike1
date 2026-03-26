import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack Developer & UI/UX Designer",
  description:
    "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#10b981] mb-4">Merhaba</h1>
        <p className="text-[#a1a1aa]">
          Hikmet Güleşli - Full-Stack Developer & UI/UX Designer
        </p>
      </div>
    </main>
  );
}
