import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FounderOf from './components/FounderOf'
import WritingMyStory from './components/WritingMyStory'
import Footer from './components/Footer'

function App() {
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

export default App
