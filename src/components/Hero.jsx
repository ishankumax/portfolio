import React from 'react'
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram, FaGlobe } from 'react-icons/fa6'
import { useContent } from '../ContentContext'

const ICON_MAP = {
  github: <FaGithub size={12} />,
  linkedin: <FaLinkedin size={12} />,
  twitter: <FaXTwitter size={12} />,
  instagram: <FaInstagram size={12} />,
  x: <FaXTwitter size={12} />,
}

/**
 * Hero Component
 * Follows the normalized left-aligned header pattern.
 */
function Hero() {
  const { getContent, getLinksByCategory } = useContent()
  const heroContent = getContent('hero', {
    title: 'ishan kumar',
    subtitle: 'Builder, Designer, Developer',
    description: '20-year-old CS undergrad building software for the next billion users.'
  })
  
  const socialLinks = getLinksByCategory('social')

  return (
    <section className="relative mb-24 md:mb-32">
      {/* Header Pattern */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-4 opacity-50" style={{ color: 'var(--text-primary)' }}>
          portfolio / home
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
          {heroContent.title}<span className="animate-pulse" style={{ color: 'var(--accent)' }}>_</span>
        </h1>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {heroContent.description}
        </p>
      </div>

      {/* Social Links / CTA */}
      <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest items-center">
        {socialLinks.length > 0 ? socialLinks.map((link, idx) => (
          <React.Fragment key={link.id}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              {ICON_MAP[link.label.toLowerCase()] || <FaGlobe size={12} />} {link.label.toLowerCase()}
            </a>
            {idx < socialLinks.length - 1 && <span className="opacity-20">/</span>}
          </React.Fragment>
        )) : (
          <>
            <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
              <FaGithub size={12} /> github
            </a>
            <span className="opacity-20">/</span>
            <a href="https://linkedin.com/in/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
              <FaLinkedin size={12} /> linkedin
            </a>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
