import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiQrCodeLine, RiLinksLine, RiGamepadLine } from 'react-icons/ri'

const PROJECTS = [
  { slug: 'qr-generator', title: 'QR Generator', icon: <RiQrCodeLine size={20} />, path: '/qr' },
  { slug: 'link-shortener', title: 'Link Shortener', icon: <RiLinksLine size={20} />, path: '/projects/link-shortener' },
  { slug: 'games', title: 'Mini Games', icon: <RiGamepadLine size={20} />, path: '/projects/games' },
]

export default function ProjectSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)
  const location = useLocation()

  // Auto-close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Auto-close on route change
  useEffect(() => {
    const handle = setTimeout(() => setIsOpen(false), 0)
    return () => clearTimeout(handle)
  }, [location.pathname])

  return (
    <div 
      ref={sidebarRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-[150] transition-all duration-300 ease-in-out border-y border-r rounded-r-xl backdrop-blur-3xl overflow-hidden`}
      style={{
        backgroundColor: 'var(--bg-navbar)',
        borderColor: 'var(--border-subtle)',
        width: isOpen ? '220px' : '60px',
        boxShadow: isOpen ? '8px 0 32px var(--accent-glow)' : '8px 0 24px rgba(0,0,0,0.3)'
      }}
    >
      <div className="flex flex-col py-6 w-full font-mono">
        {PROJECTS.map((project) => {
          const isActive = location.pathname === (project.path || `/projects/${project.slug}`)
          return (
            <Link 
              key={project.slug} 
              to={project.path || `/projects/${project.slug}`}
              className="relative flex items-center h-12 w-full group transition-colors"
            >
              {/* Active Indicator Line */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
                style={{ backgroundColor: 'var(--accent)' }}
              />

              {/* Icon Container (Fixed Width to match collapsed state) */}
              <div 
                className="flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{ 
                  width: '60px',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)'
                }}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
              </div>

              {/* Label (Visible when expanded) */}
              <div 
                className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              >
                <span 
                  className="text-xs font-bold tracking-widest uppercase transition-colors duration-300"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  {project.title}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
