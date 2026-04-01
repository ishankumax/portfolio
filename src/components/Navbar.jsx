import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ onToggleDrawer }) {
  return (
    <nav className="flex justify-between items-center mb-16 text-sm md:text-base text-gray-500 w-full">
      
      {/* Navigation Links (Responsive) */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-12 pl-2">
        <Link to="/insights" className="hover:text-white transition-colors">[i] insights</Link>
        <Link to="/specs" className="hover:text-white transition-colors">[s] specs</Link>
        <Link to="/#highlights" className="hover:text-white transition-colors">[h] highlights</Link>
        <Link to="/about" className="hover:text-white transition-colors">[a] about me</Link>
        <a href="mailto:ishankumax@gmail.com" className="hover:text-white transition-colors">[n] network</a>
      </div>

      {/* Hamburger Menu (Experience Timeline Drawer Toggle) - always visible */}
      <div className="flex items-center ml-4">
        <button 
          onClick={onToggleDrawer}
          className="p-2.5 border border-gray-800/60 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/30 transition-all cursor-pointer shadow-sm"
          aria-label="Open Experience Menu"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>

    </nav>
  )
}

export default Navbar
