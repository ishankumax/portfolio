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

  // Prevent background scrolling when mobile timeline drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
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
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex justify-center">
      <div className="max-w-4xl w-full mx-auto px-6 py-12 md:py-20 relative">
        
        {/* Main Content */}
        <main className="w-full relative z-10 block">
          <Navbar onToggleDrawer={() => setIsDrawerOpen(true)} />
          <Hero />
          <FounderOf />
          <WritingMyStory />
          <Footer />
        </main>
        
      </div>

      {/* Universal Right Edge Drawer Overlay (For both Mobile & Desktop) */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-full max-w-[400px] h-[100dvh] bg-[#0b0c10] border-l border-gray-800 p-6 sm:p-8 overflow-y-auto shadow-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the drawer from closing the overlay
        >
          {/* Drawer Inner Header */}
          <div className="flex justify-between items-center mb-10 pt-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white mb-1">ishan kumar</h2>
              <p className="text-xs font-mono text-gray-500">@ishankumax</p>
            </div>
            {/* Close Button */}
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="text-gray-400 hover:text-white p-2 border border-gray-800 rounded-md transition-colors"
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

          {/* Render Timeline Instance strictly for Mobile Clicks with no Hover locks! */}
          <div className="relative transform -translate-x-[60px]">
             <Timeline isMobileMode={true} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
