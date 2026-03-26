import type { Metadata } from "next";
import "./globals.css";
import { CursorGlow } from "@/components/CursorGlow";
import { Scanlines } from "@/components/Scanlines";

const BASE_URL = "https://hikmetgulsesli.com";

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
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
