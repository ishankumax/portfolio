import React, { useState } from 'react'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa6'
import { RiGlobalLine, RiMailLine, RiGithubLine, RiTwitterXLine, RiLinkedinBoxLine, RiInstagramLine } from 'react-icons/ri'
import { useContent } from '../ContentContext'

// Map icon names from DB to components
const getIcon = (name) => {
  if (!name) return <RiGlobalLine size={15} />
  const lowerName = name.toLowerCase()
  if (lowerName.includes('linkedin')) return <FaLinkedin size={15} />
  if (lowerName.includes('twitter') || lowerName === 'x') return <FaXTwitter size={15} />
  if (lowerName.includes('instagram')) return <FaInstagram size={15} />
  if (lowerName.includes('github')) return <FaGithub size={15} />
  if (lowerName.includes('mail') || lowerName.includes('envelope')) return <FaEnvelope size={15} />
  if (lowerName.includes('whatsapp')) return <FaWhatsapp size={15} />
  return <RiGlobalLine size={15} />
}

const DEFAULT_LINKS = [
  {
    label: 'email',
    value: 'ishankumax@gmail.com',
    href: 'mailto:ishankumax@gmail.com',
    icon: <FaEnvelope size={15} />,
    desc: 'best for collabs & opportunities'
  },
  {
    label: 'linkedin',
    value: 'ishankumax',
    href: 'https://www.linkedin.com/in/ishankumax/',
    icon: <FaLinkedin size={15} />,
    desc: 'professional connect'
  },
  {
    label: 'x',
    value: 'ishankumax',
    href: 'https://twitter.com/ishankumax',
    icon: <FaXTwitter size={15} />,
    desc: 'where i share insights'
  },
  {
    label: 'github',
    value: 'ishankumax',
    href: 'https://github.com/ishankumax',
    icon: <FaGithub size={15} />,
    desc: 'where i build'
  },
  {
    label: 'instagram',
    value: 'ishankumax',
    href: 'https://instagram.com/ishankumax',
    icon: <FaInstagram size={15} />,
    desc: 'my visual journey'
  },
  {
    label: 'whatsapp',
    value: 'ishankumax',
    href: 'https://wa.me/message/ishankumax',
    icon: <FaWhatsapp size={15} />,
    desc: 'drop me a message'
  }
]

function ContactCard({ item }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(item.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <a
      href={item.href}
      target={item.href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 p-5 border rounded-xl transition-all duration-300"
      style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 shrink-0" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
          {item.icon}
        </div>
        <div>
          <p className="text-sm font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-mono hidden sm:block" style={{ color: 'var(--text-muted)' }}>{item.value}</span>
        <button
          onClick={handleCopy}
          className="text-[10px] border rounded px-2 py-1 transition-all duration-200 font-mono"
          style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}
          aria-label="Copy to clipboard"
        >
          {copied ? 'copied!' : 'copy'}
        </button>
        <span className="group-hover:translate-x-0.5 transition-all duration-300 text-sm" style={{ color: 'var(--text-muted)' }}>→</span>
      </div>
    </a>
  )
}

function Network() {
  const { getLinksByCategory, loading } = useContent()
  const socialLinks = getLinksByCategory('social')

  const displayLinks = socialLinks.length > 0 
    ? socialLinks.map(l => ({
        label: l.label,
        value: l.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
        href: l.url,
        icon: getIcon(l.label),
        desc: l.category === 'social' ? 'social connect' : ''
      }))
    : DEFAULT_LINKS

  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="page-header">
        <p className="page-header__eyebrow">portfolio / network</p>
        <h1 className="page-header__title">let's connect<span className="page-header__cursor">_</span></h1>
        <p className="page-header__sub">
          building bridges across tech, design, and startups.
          reach out for collaborations, coffee chats, or just to say hi.
        </p>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-10 p-3 border rounded-lg w-fit" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>open for networking</span>
      </div>

      {/* Contact links */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="text-center py-10 text-[10px] uppercase tracking-widest text-[#444] animate-pulse">Syncing Network...</div>
        ) : (
          displayLinks.map((item) => (
            <ContactCard key={item.label} item={item} />
          ))
        )}
      </div>

      {/* Footer note */}
      <p className="mt-12 text-xs text-left" style={{ color: 'var(--text-muted)' }}>
        i'm most active on twitter and linkedin — let's connect.
      </p>
    </div>
  )
}

export default Network
