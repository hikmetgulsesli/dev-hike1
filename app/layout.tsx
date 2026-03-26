import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hikmet Güleşli',
  description: 'Full-Stack Developer, UI/UX Designer. Modern web technologies for digital products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
