import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import FounderOf from './FounderOf'
import WritingMyStory from './WritingMyStory'
import Footer from './Footer'
import Timeline from './Timeline'

function Home() {
  const location = useLocation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Prevent background scrolling strictly on small mobile screens when the panel takes up the whole screen
  useEffect(() => {
    if (isDrawerOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen]);

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
      
      {/* Flexible width wrapper that handles the sliding split layout shift */}
      <div 
        className="flex w-full transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
        style={{
          // Base main layout is ~896px. When opened, container expands dynamically to a full 100% viewport span 
          // forcing the main content block to beautifully slide left as the container occupies all empty space!
          maxWidth: isDrawerOpen ? '100vw' : '896px',
          width: '100%'
        }}
      >
        
        {/* Main Content (Always stays visually centered in its flexible remaining real estate) */}
        <main className="flex-1 min-w-0 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10 transition-transform duration-[400ms]">
          <Navbar onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} />
          <Hero />
          <FounderOf />
          <WritingMyStory />
          <Footer />
        </main>
        
        {/* Adjacent Slide-out Sidebar Panel (Instead of overlay overlay) */}
        <aside 
          className={`flex-shrink-0 transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden ${isDrawerOpen ? 'w-full md:w-[420px] lg:w-[480px] xl:w-[500px] opacity-100' : 'w-0 opacity-0'}`}
        >
          {/* Inner fixed-width container acts identically to the drawer but flows natively adjacent to content.
              Sticky top allowing independent independent scrolling! */}
          <div className="w-full md:w-[420px] lg:w-[480px] xl:w-[500px] h-[100dvh] sticky top-0 bg-black overflow-y-auto pl-14 pr-6 py-6 sm:pl-20 sm:pr-8 sm:py-8 no-scrollbar">
            
            {/* Drawer Inner Header */}
            <div className="flex justify-between items-center mb-10 pt-2">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">ishan kumar</h2>
                <p className="text-xs font-mono text-gray-500">@ishankumax</p>
              </div>
              {/* Close Button */}
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="text-gray-400 hover:text-white p-2 border border-gray-800 rounded-md transition-colors shadow-sm bg-black/50"
              >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>
            </div>

            {/* Filter / Category Toggle */}
            <div className="flex bg-[#111216] rounded-[20px] p-1 border border-gray-800/60 mb-8 font-mono text-[11px]">
               <div className="flex-1 py-1.5 text-center text-gray-500">Insights</div>
               <div className="flex-1 py-1.5 text-center bg-gray-800/50 text-white rounded-2xl shadow-sm border border-gray-700/50">
                 experience
               </div>
            </div>
            
            <h3 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-4 pl-1">Experience</h3>

            {/* Render Timeline Instance safely */}
            <div className="relative">
               <Timeline isMobileMode={false} />
            </div>

          </div>
        </aside>

      </div>
    </div>
  )
}

export default Home
