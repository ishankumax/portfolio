import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ onToggleDrawer }) {
  return (
    <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5 lg:gap-6 items-center mb-16 text-sm md:text-base text-gray-500 w-full px-2">
      <Link to="/insights" className="hover:text-white transition-colors whitespace-nowrap">[i] insights</Link>
      <Link to="/specs" className="hover:text-white transition-colors whitespace-nowrap">[s] specs</Link>
      <Link to="/#highlights" className="hover:text-white transition-colors whitespace-nowrap">[h] highlights</Link>
      <Link to="/about" className="hover:text-white transition-colors whitespace-nowrap">[a] about me</Link>
      <a href="mailto:ishankumax@gmail.com" className="hover:text-white transition-colors whitespace-nowrap">[n] network</a>
      
      {/* Unified '[x] experience' Button & Hamburger */}
      <button 
        onClick={onToggleDrawer}
        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        aria-label="Toggle Experience Panel"
      >
        <span>[x] experience</span>
        <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
        </svg>
      </button>
    </nav>
  )
}

export default Navbar
