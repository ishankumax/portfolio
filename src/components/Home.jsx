import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import FounderOf from './FounderOf'
import WritingMyStory from './WritingMyStory'
import TechStack from './TechStack'
import Footer from './Footer'
import Timeline from './Timeline'
import Terminal, { useTerminal } from './Terminal'

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  // isOpen: whether sidebar should be showing (controls CSS classes)
  // isVisible: whether sidebar is mounted in the DOM
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const closeTimerRef = useRef(null)
  const { open: terminalOpen, setOpen: setTerminalOpen } = useTerminal()

  const openDrawer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setIsVisible(true)
    // small tick so the element is mounted before we trigger the CSS transition
    requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)))
  }

  const closeDrawer = () => {
    setIsOpen(false)
    // wait for slide-out animation to finish before unmounting
    closeTimerRef.current = setTimeout(() => setIsVisible(false), 420)
  }

  const toggleDrawer = () => {
    if (isOpen) closeDrawer()
    else openDrawer()
  }

  // Prevent background scrolling on mobile when drawer is fully open
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex justify-center overflow-x-hidden">
      
      {/* Terminal overlay */}
      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}

      {/* Flexible width wrapper that handles the sliding split layout shift */}
      <div 
        className="flex w-full transition-[max-width] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[max-width]"
        style={{ maxWidth: isOpen ? '100vw' : '896px', width: '100%' }}
      >
        
        {/* Main Content */}
        <main className="flex-1 min-w-0 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10">
          <Navbar
            onToggleDrawer={toggleDrawer}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
          <Hero />
          <FounderOf />
          <TechStack />
          <WritingMyStory />
          <Footer />
        </main>
        
        {/* Adjacent Slide-out Sidebar Panel — only mounted while visible */}
        {isVisible && (
          <aside 
            className={[
              'fixed inset-0 z-50',
              'md:relative md:inset-auto md:z-auto',
              'flex-shrink-0 overflow-hidden',
              'transition-[width,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
              isOpen
                ? 'w-full md:w-[420px] lg:w-[480px] xl:w-[500px] opacity-100'
                : 'w-0 opacity-0 pointer-events-none'
            ].join(' ')}
          >
            {/* Mobile backdrop */}
            <div
              className={`absolute inset-0 bg-black/60 md:hidden transition-opacity duration-[420ms] ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={closeDrawer}
            />

            <div className="relative z-10 w-full md:w-[420px] lg:w-[480px] xl:w-[500px] h-full md:h-[100dvh] md:sticky top-0 bg-black overflow-y-auto pl-8 pr-6 py-6 sm:pl-20 sm:pr-8 sm:py-8 no-scrollbar">
              
              {/* Drawer Inner Header */}
              <div className="flex justify-between items-center mb-10 pt-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">ishan kumar</h2>
                  <p className="text-xs font-mono text-gray-500">@ishankumax</p>
                </div>
                {/* Close Button */}
                <button 
                  onClick={closeDrawer}
                  className="text-gray-400 hover:text-white p-2 border border-gray-800 rounded-md transition-colors shadow-sm bg-black/50"
                  aria-label="Close experience panel"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Category tab — clicking "experience" navigates to /experience */}
              <div className="flex bg-[#111216] rounded-[20px] p-1 border border-gray-800/60 mb-8 font-mono text-[11px]">
                <button
                  onClick={() => navigate('/experience')}
                  className="flex-1 py-1.5 text-center bg-gray-800/50 text-white rounded-2xl shadow-sm border border-gray-700/50 hover:bg-gray-700/60 transition-colors cursor-pointer"
                >
                  experience
                </button>
              </div>
              
              <h3 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-4 pl-1">Experience</h3>

              {/* Render Timeline Instance safely */}
              <div className="relative">
                <Timeline isMobileMode={false} />
              </div>

            </div>
          </aside>
        )}

      </div>
    </div>
  )
}

export default Home
