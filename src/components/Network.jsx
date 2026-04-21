import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'

const CONTACT_LINKS = [
  {
    label: 'email',
    value: 'ishankumax@gmail.com',
    href: 'mailto:ishankumax@gmail.com',
    icon: '✉',
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
    label: 'twitter / x',
    value: '@ishankumax',
    href: 'https://x.com/ishankumax',
    icon: <FaXTwitter size={15} />,
    desc: 'dm for quick replies'
  },
  {
    label: 'instagram',
    value: '@ishankumax',
    href: 'https://www.instagram.com/ishankumax/',
    icon: <FaInstagram size={15} />,
    desc: 'the day-to-day stuff'
  },
  {
    label: 'github',
    value: 'ishankumax',
    href: 'https://github.com/ishankumax',
    icon: <FaGithub size={15} />,
    desc: 'open source & projects'
  },
]

function ContactCard({ item }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    // Only copy on the copy button, not the whole card
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
  return (
    <div className="min-h-screen text-white font-mono">
      {/* Page Content */}
      <div className="max-w-2xl mx-auto px-6 pt-4 md:pt-0 pb-24">
        {/* Header */}
        <div className="success-header">
          <p className="success-header__eyebrow">portfolio / network</p>
          <h1 className="success-header__title">let's connect<span className="success-header__cursor">_</span></h1>
          <p className="success-header__sub">
            building bridges across tech, design, and startups.
            reach out for collaborations, coffee chats, or just to say hi.
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-10 p-3 border rounded-lg w-fit" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-purple)' }} />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>open for networking</span>
        </div>

        {/* Contact links */}
        <div className="flex flex-col gap-3">
          {CONTACT_LINKS.map((item) => (
            <ContactCard key={item.label} item={item} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          i'm most active on twitter and linkedin — let's connect.
        </p>
      </div>
    </div>
  )
}

export default Network
