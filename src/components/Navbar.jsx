import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext'
import { useAdmin } from '../AdminContext'

function Navbar({ onOpenTerminal }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme, rippleEnabled, toggleRipple } = useTheme()
  const { user } = useAdmin()
  
  // Track keystrokes for 'admin'
  const keysRef = useRef('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      
      const key = e.key.toLowerCase()
      keysRef.current += key
      
      if (keysRef.current.length > 5) {
        keysRef.current = keysRef.current.slice(-5)
      }

      if (keysRef.current === 'admin') {
        navigate('/admin')
        keysRef.current = '' // Reset
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  // Helper to detect an active route
  const isActive = (path) => {
    if (path === '/network' && location.pathname === '/contact') return true
    return location.pathname === path
  }

  const linkClass = (path) =>
    `hover:text-[color:var(--accent)] transition-colors whitespace-nowrap ${isActive(path) ? 'text-[color:var(--accent)] font-bold' : ''}`

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b" style={{ backgroundColor: 'var(--bg-navbar)', borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 h-16 md:h-20 flex items-center justify-between font-mono">
        
        {/* Left: Brand + Admin */}
        <div className="flex items-center gap-6 shrink-0">
          <Link 
            to="/"
            className="group flex flex-col justify-center text-left cursor-pointer select-none"
          >
            <span className="group-hover:text-[color:var(--accent)] transition-colors font-bold tracking-tighter text-lg md:text-xl uppercase leading-none" style={{ color: 'var(--text-primary)' }}>
              ishan kumar
            </span>
            <span className="text-[9px] md:text-[10px] font-mono tracking-widest mt-1 opacity-60 group-hover:opacity-100 group-hover:text-[color:var(--accent)] transition-all" style={{ color: 'var(--text-secondary)' }}>
              @ishankumax
            </span>
          </Link>
          
          {/* Admin Toggle (Visible only when logged in) */}
          {user && (
            <Link 
              to="/admin"
              className={`transition-colors whitespace-nowrap font-bold tracking-widest uppercase text-xs flex items-center gap-1.5 px-2 py-1 rounded border`}
              style={{ 
                color: location.pathname === '/admin' ? 'black' : 'var(--accent)',
                backgroundColor: location.pathname === '/admin' ? 'var(--accent)' : 'transparent',
                borderColor: 'var(--accent)'
              }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/admin' ? 'bg-black' : 'bg-[var(--accent)]'}`} />
              Admin
            </Link>
          )}
        </div>
        
        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-6 lg:gap-8 text-gray-500 text-sm">
          <Link to="/insights" className={linkClass('/insights')}>[i] insights</Link>
          <Link to="/success" className={linkClass('/success')}>[s] success</Link>
          <Link to="/#highlights" className="hover:text-[color:var(--accent)] transition-colors whitespace-nowrap">[h] highlights</Link>
          <Link to="/about" className={linkClass('/about')}>[a] about me</Link>
          <Link to="/network" className={linkClass('/network')}>[n] network</Link>
          <Link to="/experience" className={linkClass('/experience')}>[x] experience</Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-4 shrink-0 w-auto md:w-[200px]">
          {/* Ripple toggle */}
          <div className="group relative">
            <button
              id="ripple-toggle"
              onClick={toggleRipple}
              aria-label="Toggle ripple background"
              className="relative w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{
                color: rippleEnabled ? 'var(--accent)' : 'var(--text-muted)',
                filter: rippleEnabled ? 'drop-shadow(0 0 6px var(--accent-glow))' : 'none',
                transition: 'color 0.25s ease, filter 0.25s ease',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={rippleEnabled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={rippleEnabled ? 0 : 1.75} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] transition-all duration-300" style={{ opacity: rippleEnabled ? 1 : 18 }}>
                <path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z" />
              </svg>
            </button>
          </div>

          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="relative w-8 h-8 flex items-center justify-center rounded-full hover:text-[color:var(--accent)] transition-colors cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            {/* Sun icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={`absolute w-[18px] h-[18px] transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            {/* Moon icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={`absolute w-[18px] h-[18px] transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          {/* Terminal button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 hover:text-[color:var(--accent)] transition-colors cursor-pointer group"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="group-hover:text-[color:var(--accent)] transition-colors">[</span>
            <span className="font-mono group-hover:text-[color:var(--accent)] transition-colors">{'>'}_</span>
            <span className="group-hover:text-[color:var(--accent)] transition-colors">]</span>
            <span className="hidden sm:inline ml-0.5 transition-colors">terminal</span>
          </button>
        </div>
      </div>

      {/* Mobile Links Row */}
      <div className="md:hidden flex overflow-x-auto no-scrollbar gap-8 px-6 pb-4 text-[10px] uppercase tracking-[0.2em] border-t pt-4" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-navbar)' }}>
        <Link to="/insights" className={linkClass('/insights')}>insights</Link>
        <Link to="/success" className={linkClass('/success')}>success</Link>
        <Link to="/about" className={linkClass('/about')}>about</Link>
        <Link to="/network" className={linkClass('/network')}>network</Link>
        <Link to="/experience" className={linkClass('/experience')}>experience</Link>
        
        {/* Admin Toggle Mobile */}
        {user && (
          <Link 
            to="/admin"
            className={`transition-colors whitespace-nowrap font-bold`}
            style={{ color: location.pathname === '/admin' ? 'var(--accent)' : 'var(--text-secondary)' }}
          >
            admin
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
