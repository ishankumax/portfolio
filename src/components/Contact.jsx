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
      className="group flex items-center justify-between gap-4 p-5 border border-gray-800/70 rounded-xl hover:border-gray-600 hover:bg-white/[0.02] transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-gray-500 group-hover:text-white transition-all duration-300 shrink-0">
          {item.icon}
        </div>
        <div>
          <p className="text-sm font-bold text-white font-mono">{item.label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-gray-600 font-mono hidden sm:block">{item.value}</span>
        <button
          onClick={handleCopy}
          className="text-[10px] text-gray-600 hover:text-white border border-gray-800 hover:border-gray-600 rounded px-2 py-1 transition-all duration-200 font-mono"
          aria-label="Copy to clipboard"
        >
          {copied ? 'copied!' : 'copy'}
        </button>
        <span className="text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 text-sm">→</span>
      </div>
    </a>
  )
}

function Contact() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="w-full relative z-50">
        <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
          <Link
            to="/"
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 w-fit group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>back to home</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        {/* Title */}
        <div className="mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">let's talk</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md">
            open to collaborations, opportunities, startup chats, and everything in between.
            pick the channel that works best for you.
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-10 p-3 border border-gray-800/60 rounded-lg w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400 font-mono">available for opportunities</span>
        </div>

        {/* Contact links */}
        <div className="flex flex-col gap-3">
          {CONTACT_LINKS.map((item) => (
            <ContactCard key={item.label} item={item} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-gray-700 text-center">
          i usually reply within 24 hours — i don't ghost.
        </p>
      </div>
    </div>
  )
}

export default Contact
