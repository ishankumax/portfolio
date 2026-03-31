import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import FounderOf from './FounderOf'
import WritingMyStory from './WritingMyStory'
import Footer from './Footer'
import Timeline from './Timeline'

function Home() {
  const location = useLocation()

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
      <div className="max-w-[1400px] w-full mx-auto px-6 py-12 md:py-20 flex flex-col xl:flex-row relative">
        
        {/* Left Sidebar - Timeline */}
        <aside className="hidden xl:block w-[360px] shrink-0 relative z-50">
          <div className="sticky top-20 tracking-tighter">
            <Timeline />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-5xl mx-auto xl:mx-0 w-full xl:pl-8 relative z-10 block">
          <Navbar />
          <Hero />
          <FounderOf />
          <WritingMyStory />
          <Footer />
        </main>
        
      </div>
    </div>
  )
}

export default Home
