import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ onOpenTerminal }) {
  const location = useLocation()

  // Helper to detect an active route
  const isActive = (path) => location.pathname === path

  const linkClass = (path) =>
    `hover:text-white transition-colors whitespace-nowrap ${isActive(path) ? 'text-white decoration-[#818cf8] underline underline-offset-4 decoration-2' : ''}`

  return (
    <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4 items-center mb-16 text-sm md:text-base text-gray-500 w-full px-2">
      
      <Link to="/insights" className={linkClass('/insights')}>[i] insights</Link>
      <Link to="/specs" className={linkClass('/specs')}>[s] specs</Link>
      <Link to="/#highlights" className="hover:text-white transition-colors whitespace-nowrap">[h] highlights</Link>
      <Link to="/about" className={linkClass('/about')}>[a] about me</Link>
      <a href="mailto:ishankumax@gmail.com" className="hover:text-white transition-colors whitespace-nowrap">[n] network</a>
      <Link to="/experience" className={linkClass('/experience')}>[x] experience</Link>

      {/* Terminal trigger — only shown on Home */}
      {onOpenTerminal && (
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer whitespace-nowrap group"
          aria-label="Open Terminal"
          title="Press ` or Ctrl+K"
        >
          <span className="text-gray-700 group-hover:text-gray-400 transition-colors">[</span>
          <span className="font-mono">{'>'}_</span>
          <span className="text-gray-700 group-hover:text-gray-400 transition-colors">]</span>
          <span className="text-[10px] text-gray-700 group-hover:text-gray-500 transition-colors hidden md:inline ml-0.5">terminal</span>
        </button>
      )}
    </nav>
  )
}

export default Navbar
