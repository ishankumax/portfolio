import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import FounderOf from './FounderOf'
import WritingMyStory from './WritingMyStory'
import TechStack from './TechStack'
import Footer from './Footer'
import Terminal, { useTerminal } from './Terminal'
import GitHubActivity from './GitHubActivity'

function Home() {
  const location = useLocation()
  const { open: terminalOpen, setOpen: setTerminalOpen } = useTerminal()

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

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
        />
          <Hero />
          <FounderOf />
          <TechStack />
          <GitHubActivity />
          <WritingMyStory />
          <Footer />
        </main>

    </div>
  )
}

export default Home
