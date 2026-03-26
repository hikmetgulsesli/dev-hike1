import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/CursorGlow";
import { Scanlines } from "@/components/Scanlines";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hikmetgulsesli.com";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hikmet Güleşli",
    template: "%s | Hikmet Güleşli",
  },
  description:
    "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
  keywords: [
    "web developer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "portfolio",
    "full-stack developer",
    "ui/ux designer",
  ],
  authors: [{ name: "Hikmet Güleşli", url: BASE_URL }],
  creator: "Hikmet Güleşli",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE_URL,
    siteName: "Hikmet Güleşli",
    title: "Hikmet Güleşli",
    description:
      "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hikmet Güleşli - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hikmetgulsesli",
    creator: "@hikmetgulsesli",
    title: "Hikmet Güleşli",
    description:
      "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hikmet Güleşli",
              url: BASE_URL,
              jobTitle: "Full-Stack Developer",
              description:
                "Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
              sameAs: [
                "https://github.com/hikmetgulsesli",
                "https://linkedin.com/in/hikmetgulsesli",
                "https://twitter.com/hikmetgulsesli",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "UI/UX Design",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-[#fafafa] antialiased min-h-screen overflow-x-hidden">
        <CursorGlow />
        <Scanlines opacity={0.03} />
        {children}
      </body>
    </html>
  );
}
