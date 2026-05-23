import React from 'react'
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram, FaGlobe } from 'react-icons/fa6'
import { useContent } from '../ContentContext'
import EditableText from './admin/EditableText'

const ICON_MAP = {
  github: <FaGithub size={12} />,
  linkedin: <FaLinkedin size={12} />,
  twitter: <FaXTwitter size={12} />,
  instagram: <FaInstagram size={12} />,
}

/**
 * Hero Component
 * Follows the normalized left-aligned header pattern.
 */
function Hero() {
  const { getLinksByCategory } = useContent()
  const socialLinks = getLinksByCategory('social')

  return (
    <section className="relative mb-24 md:mb-32">
      {/* Two-column layout: portrait image LEFT + text RIGHT */}
      <div className="flex flex-col md:flex-row md:items-center gap-10 mb-10">

        {/* Profile Picture — portrait, left side */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '230px',
            }}
          >
            
            
            {/* Portrait image */}
            <img
              src="/profile.jpeg"
              loading="lazy"
              alt="Ishan Kumar"
              style={{
                position: 'relative',
                width: '154px',
                height: '224px',
                borderRadius: '14px',
                objectFit: 'cover',
                objectPosition: 'center top',
                border: '3px solid var(--bg-primary)',
                display: 'block',
                margin: '3px',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.boxShadow = '0 0 32px color-mix(in srgb, var(--accent) 35%, transparent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Header Pattern — right side */}
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-4 opacity-50" style={{ color: 'var(--text-primary)' }}>
            portfolio / home
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 flex">
            <EditableText 
              as="span" 
              id="hero_title" 
              section="hero" 
              defaultText="ishan kumar"
            />
            <span className="animate-pulse ml-1" style={{ color: 'var(--accent)' }}>_</span>
          </h1>
          <EditableText 
            as="p" 
            id="hero_description" 
            section="hero" 
            defaultText="20-year-old CS undergrad building software for the next billion users."
            className="text-base md:text-lg leading-relaxed max-w-2xl block"
            style={{ color: 'var(--text-secondary)' }}
          />
        </div>

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
                        <span className="opacity-20">/</span>

            <a href="https://instagram.com/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
              <FaInstagram size={12} /> instagram
            </a>
            <span className="opacity-20">/</span>
            <a href="https://twitter.com/ishankumax" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
              <FaXTwitter size={12} /> TWITTER 
            </a>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
