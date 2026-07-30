import React from 'react'
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram, FaGlobe } from 'react-icons/fa6'
import { useContent } from '../ContentContext'
import EditableText from './admin/EditableText'
import SocialHoverCard from './ui/SocialHoverCard'

const ICON_MAP = {
  github: <FaGithub size={12} />,
  linkedin: <FaLinkedin size={12} />,
  twitter: <FaXTwitter size={12} />,
  'x.com': <FaXTwitter size={12} />,
  instagram: <FaInstagram size={12} />,
}

// ─── Static fallback social links with hover preview ────────────────────────
const SOCIAL_LINKS = [
  {
    id: 'github',
    platform: 'github',
    label: 'github',
    href: 'https://github.com/ishankumax',
    icon: <FaGithub size={12} />,
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    label: 'linkedin',
    href: 'https://linkedin.com/in/ishankumax',
    icon: <FaLinkedin size={12} />,
  },
  {
    id: 'instagram',
    platform: 'instagram',
    label: 'instagram',
    href: 'https://instagram.com/ishankumax',
    icon: <FaInstagram size={12} />,
  },
  {
    id: 'twitter',
    platform: 'twitter',
    label: 'twitter',
    href: 'https://twitter.com/ishankumax',
    icon: <FaXTwitter size={12} />,
  },
]

function SocialRow({ socialLinks }) {
  return (
    <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest items-center justify-center mt-6">
      {socialLinks.length > 0 ? socialLinks.map((link, idx) => {
        const plat = (link.platform || link.label || link.url || '').toLowerCase()
        return (
          <React.Fragment key={link.id || idx}>
            <SocialHoverCard
              platform={plat}
              href={link.url || link.href}
            >
              <span className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 cursor-pointer">
                {ICON_MAP[plat] || <FaGlobe size={12} />}
                {(link.label || link.platform || '').toLowerCase()}
              </span>
            </SocialHoverCard>
            {idx < socialLinks.length - 1 && <span className="opacity-20">/</span>}
          </React.Fragment>
        )
      }) : (
        <>
          {SOCIAL_LINKS.map((link, idx) => (
            <React.Fragment key={link.id}>
              <SocialHoverCard platform={link.platform} href={link.href}>
                <span className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 cursor-pointer">
                  {link.icon} {link.label}
                </span>
              </SocialHoverCard>
              {idx < SOCIAL_LINKS.length - 1 && (
                <span className="opacity-20">/</span>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  )
}

/**
 * Hero Component
 * Social links now sit directly under the description paragraph,
 * inside the right column — matching the layout reference.
 */
function Hero() {
  const { getLinksByCategory } = useContent()
  const socialLinks = getLinksByCategory('social')

  return (
    <section className="relative mb-12 md:mb-16">
      {/* Two-column layout: portrait image LEFT + text RIGHT */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-8">

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
            defaultText="21-year-old CS undergrad building software for the next billion users."
            className="text-base md:text-lg leading-relaxed max-w-2xl block"
            style={{ color: 'var(--text-secondary)' }}
          />

          {/* Social links sit directly under the intro paragraph */}
          <SocialRow socialLinks={socialLinks} />
        </div>

      </div>
    </section>
  )
}

export default Hero
