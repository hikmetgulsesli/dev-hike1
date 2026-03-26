import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

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
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
