'use client'

import { GitBranch, Link2, AtSign, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: GitBranch, href: 'https://github.com/hikmetgulsesli', label: 'GitHub' },
  { icon: Link2, href: 'https://linkedin.com/in/hikmetgulsesli', label: 'LinkedIn' },
  { icon: AtSign, href: 'https://twitter.com/hikmetgulsesli', label: 'X' },
  { icon: Mail, href: 'mailto:hikmet@gulsesli.com', label: 'E-posta' },
]

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  )
}
