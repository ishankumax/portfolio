import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ onOpenTerminal }) {
  const location = useLocation()

  // Helper to detect an active route
  const isActive = (path) => {
    if (path === '/network' && location.pathname === '/contact') return true
    return location.pathname === path
  }

  const linkClass = (path) =>
    `hover:text-[#818cf8] transition-colors whitespace-nowrap ${isActive(path) ? 'text-[#818cf8] font-bold' : 'text-gray-500'}`

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 h-16 md:h-20 flex items-center justify-between font-mono">
        
        {/* Left: Brand */}
        <Link 
          to="/" 
          className="group flex flex-col justify-center shrink-0"
        >
          <span className="text-white group-hover:text-[#818cf8] transition-colors font-bold tracking-tighter text-lg md:text-xl uppercase leading-none">
            ishan kumar
          </span>
          <span className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest mt-1 opacity-60 group-hover:opacity-100 group-hover:text-[#818cf8]/80 transition-all">
            @ishankumax
          </span>
        </Link>
        
        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-500 text-sm">
          <Link to="/insights" className={linkClass('/insights')}>[i] insights</Link>
          <Link to="/specs" className={linkClass('/specs')}>[s] specs</Link>
          <Link to="/#highlights" className="hover:text-[#818cf8] transition-colors whitespace-nowrap">[h] highlights</Link>
          <Link to="/about" className={linkClass('/about')}>[a] about me</Link>
          <Link to="/network" className={linkClass('/network')}>[n] network</Link>
          <Link to="/experience" className={linkClass('/experience')}>[x] experience</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 text-gray-500 hover:text-[#818cf8] transition-colors cursor-pointer group"
          >
            <span className="group-hover:text-[#818cf8] transition-colors">[</span>
            <span className="font-mono group-hover:text-[#818cf8] transition-colors">{'>'}_</span>
            <span className="group-hover:text-[#818cf8] transition-colors">]</span>
            <span className="hidden sm:inline ml-0.5 transition-colors">terminal</span>
          </button>
        </div>
      </div>

      {/* Mobile Links Row */}
      <div className="md:hidden flex overflow-x-auto no-scrollbar gap-8 px-6 pb-4 text-gray-500 text-[10px] uppercase tracking-[0.2em] border-t border-white/5 pt-4 bg-black/40">
        <Link to="/insights" className={linkClass('/insights')}>insights</Link>
        <Link to="/specs" className={linkClass('/specs')}>specs</Link>
        <Link to="/about" className={linkClass('/about')}>about</Link>
        <Link to="/network" className={linkClass('/network')}>network</Link>
        <Link to="/experience" className={linkClass('/experience')}>experience</Link>
      </div>
    </header>
  )
}

export default Navbar
