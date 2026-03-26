import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hikmet Güleşli | Full-Stack Developer',
  description: 'Modern web teknolojileriyle dijital ürünler inşa ediyorum. Kullanıcı deneyimini ön planda tutan, performans odaklı çözümler geliştiriyorum.',
  keywords: ['Full-Stack Developer', 'UI/UX Designer', 'React', 'TypeScript', 'Next.js', 'Turkey'],
  authors: [{ name: 'Hikmet Güleşli' }],
  openGraph: {
    title: 'Hikmet Güleşli | Full-Stack Developer',
    description: 'Modern web teknolojileriyle dijital ürünler inşa ediyorum.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
