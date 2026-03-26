'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/projects', label: 'Projeler' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'i\u0307letişim' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link
          href="/"
          className="font-mono text-sm text-primary"
          aria-current="page"
        >
          hikmet.dev
        </Link>
        <div className="flex gap-4 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
