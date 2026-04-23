import React from 'react'
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram } from 'react-icons/fa6'

/**
 * Hero Component
 * Follows the normalized left-aligned header pattern.
 */
function Hero() {
  return (
    <section className="relative mb-24 md:mb-32">
      {/* Header Pattern */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-4 opacity-50" style={{ color: 'var(--text-primary)' }}>
          portfolio / home
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
          ishan kumar<span className="animate-pulse" style={{ color: 'var(--accent)' }}>_</span>
        </h1>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          20-year-old CS undergrad building software for the next billion users. 
          founder of <span className="border-b" style={{ borderColor: 'var(--accent)' }}>InTheBox</span>, 
          leading tech communities, and documenting the messy journey of a developer.
        </p>
      </div>

      {/* Social Links / CTA */}
      <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest items-center">
        <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
          <FaGithub size={12} /> github
        </a>
        <span className="opacity-20">/</span>
        <a href="https://linkedin.com/in/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
          <FaLinkedin size={12} /> linkedin
        </a>
        <span className="opacity-20">/</span>
        <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
          <FaXTwitter size={12} /> x.com
        </a>
        <span className="opacity-20">/</span>
        <a href="mailto:ishankumax@gmail.com" className="hover:text-[var(--accent)] transition-colors">
          email
        </a>
      </div>
    </section>
  )
}

export default Hero
