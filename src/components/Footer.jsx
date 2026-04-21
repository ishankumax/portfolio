import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="pt-10 pb-8 mt-16 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="flex flex-col gap-8">

        {/* Top row: CTA + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left: Let's Talk CTA */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-2 font-mono" style={{ color: 'var(--text-muted)' }}>got an idea?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border hover:bg-[color:var(--text-primary)] hover:text-[color:var(--bg-base)] transition-all duration-300 px-5 py-2.5 rounded-lg text-sm font-mono group"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-card)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              let's talk
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer"
              className="p-2 border rounded hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-200"
              style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/ishankumax/" target="_blank" rel="noopener noreferrer"
              className="p-2 border rounded hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-200"
              style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
              <FaLinkedin size={16} />
            </a>
            <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer"
              className="p-2 border rounded hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-200"
              style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
              <FaXTwitter size={16} />
            </a>
            <a href="https://www.instagram.com/ishankumax/" target="_blank" rel="noopener noreferrer"
              className="p-2 border rounded hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-200"
              style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        {/* Bottom row: Copyright + quick nav */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            © {year} ishankumax — built with react + vite
          </p>
          <div className="flex gap-4 text-[11px] font-mono">
            <Link to="/insights" className="hover:text-[color:var(--accent-purple)] transition-colors" style={{ color: 'var(--text-muted)' }}>insights</Link>
            <Link to="/experience" className="hover:text-[color:var(--accent-purple)] transition-colors" style={{ color: 'var(--text-muted)' }}>experience</Link>
            <Link to="/specs" className="hover:text-[color:var(--accent-purple)] transition-colors" style={{ color: 'var(--text-muted)' }}>specs</Link>
            <Link to="/network" className="hover:text-[color:var(--accent-purple)] transition-colors" style={{ color: 'var(--text-muted)' }}>contact</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
