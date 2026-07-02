import React from 'react'
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram } from 'react-icons/fa6'

const LINKS = [
  { id: 'github',    label: 'github',    href: 'https://github.com/ishankumax',    icon: FaGithub },
  { id: 'linkedin',  label: 'linkedin',  href: 'https://linkedin.com/in/ishankumax',  icon: FaLinkedin },
  { id: 'x',         label: 'x.com',     href: 'https://x.com/ishankumax',         icon: FaXTwitter },
  { id: 'instagram', label: 'instagram', href: 'https://instagram.com/ishankumax', icon: FaInstagram },
]

/**
 * SocialLinks
 * Reusable social link row with dynamic accent hovers.
 */
const SocialLinks = ({ showIcons = true, className = "" }) => (
  <div className={`flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest items-center ${className}`}>
    {LINKS.map((link, i) => (
      <React.Fragment key={link.id}>
        <a 
          href={link.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
        >
          {showIcons && <link.icon size={12} />}
          {link.label}
        </a>
        {i < LINKS.length - 1 && <span className="opacity-20">/</span>}
      </React.Fragment>
    ))}
  </div>
)

export default SocialLinks
