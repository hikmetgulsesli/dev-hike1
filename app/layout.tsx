import type { Metadata } from "next";
import "./globals.css";
import { CursorGlow } from "@/components/CursorGlow";
import { Scanlines } from "@/components/Scanlines";

export const metadata: Metadata = {
  title: "Hikmet Güleşli",
  description: "Full-Stack Developer, UI/UX Designer. Modern web technologies for digital products.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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
