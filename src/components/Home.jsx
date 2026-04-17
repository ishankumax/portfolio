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
    <div className="w-full max-w-4xl mx-auto px-6 pb-24 md:pb-20 relative z-10 flex flex-col gap-24 md:gap-0">
      <Hero />
      <FounderOf />
      <TechStack />
      <GitHubActivity />
      <WritingMyStory />
      <Footer />
    </div>
  )
}

export default Home
