import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import FounderOf from './FounderOf'
import WritingMyStory from './WritingMyStory'
import Footer from './Footer'

function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Navbar />
        <Hero />
        <FounderOf />
        <WritingMyStory />
        <Footer />
      </div>
    </div>
  )
}

export default Home
