'use client'

import { GitBranch, Link2, AtSign, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: GitBranch, href: 'https://github.com/hikmetgulsesli', label: 'GitHub profilini ziyaret et', ariaLabel: 'GitHub' },
  { icon: Link2, href: 'https://linkedin.com/in/hikmetgulsesli', label: 'LinkedIn profilini ziyaret et', ariaLabel: 'LinkedIn' },
  { icon: AtSign, href: 'https://twitter.com/hikmetgulsesli', label: 'X hesabını ziyaret et', ariaLabel: 'X (Twitter)' },
  { icon: Mail, href: 'mailto:hikmet@gulsesli.com', label: 'E-posta gönder', ariaLabel: 'E-posta' },
]

export function SocialLinks() {
  return (
    <nav aria-label="Sosyal medya bağlantıları" className="flex items-center gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20 focus-visible:ring-2 focus-visible:ring-primary/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          aria-label={social.ariaLabel}
          title={social.label}
        >
          <social.icon className="w-5 h-5" aria-hidden="true" />
        </motion.a>
      ))}
    </nav>
  )
}
