import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from './Hero'
import FounderOf from './FounderOf'
import WritingMyStory from './WritingMyStory'
import TechStack from './TechStack'
import Footer from './Footer'
import GitHubActivity from './GitHubActivity'

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
    <div className="w-full max-w-4xl mx-auto px-6 pb-12 md:pb-20 relative z-10">
      <Hero />
      <div className="space-y-32 md:space-y-40">
        <FounderOf />
        <TechStack />
        <GitHubActivity />
        <WritingMyStory />
      </div>
      <Footer />
    </div>
  )
}

export default Home
