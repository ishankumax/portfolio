import React, { useRef } from 'react'
import './index.css'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub, FaMedium, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

function App() {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* Navbar */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 mb-20 text-sm md:text-base text-gray-500">
          <a href="#insights" className="hover:text-white transition-colors">[i] insights</a>
          <a href="#specs" className="hover:text-white transition-colors">[x] specs</a>
          <a href="#highlights" className="hover:text-white transition-colors">[h] highlights</a>
          <a href="#about" className="hover:text-white transition-colors">[a] about me</a>
          <a href="#network" className="hover:text-white transition-colors">[n] network</a>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-24 items-start">
          {/* Profile Image */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-200 rounded-lg grayscale"></div>
          </div>

          {/* Profile Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">ishan kumar</h1>
            <p className="text-gray-500 mb-6">@ishankumax</p>
            
            <div className="flex justify-center md:justify-start gap-4 mb-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded hover:bg-white hover:text-black transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded hover:bg-white hover:text-black transition-all">
                <FaLinkedin size={18} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded hover:bg-white hover:text-black transition-all">
                <FaXTwitter size={18} />
              </a>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-2xl">
              i'm a 20 y/o cs undergrad. i love building businesses and solving problems. interested in growth, startups, networking and infra. when i'm not cooking stuff, i'm prolly locking another client for my business - inthebox.
            </p>
          </div>
        </div>

        {/* Founder Of Section */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-gray-600">#</span> founder of
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo Placeholder */}
            <div className="shrink-0 w-24 h-24 border-2 border-white rounded-lg mx-auto md:mx-0"></div>
            
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-baseline mb-2">
                <h3 className="font-bold text-2xl font-mono">InTheBox</h3>
                <span className="text-sm text-gray-500 font-mono mt-1 md:mt-0">april 2025 - today</span>
              </div>
              <p className="text-gray-400 font-mono leading-relaxed">
                Where Packaging Meets Innovation <br className="hidden md:block" />
                building Custom, Premium Designs
              </p>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-gray-600">#</span> writing my story
          </h2>
          
          {/* Horizontal Scrollable Cards with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* Cards Container */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="shrink-0 w-64 h-80 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer"></div>
              <div className="shrink-0 w-64 h-80 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer"></div>
              <div className="shrink-0 w-64 h-80 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer"></div>
              <div className="shrink-0 w-64 h-80 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer"></div>
              <div className="shrink-0 w-64 h-80 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer"></div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-6 pb-6 mt-10 border-t border-gray-700">
          <div className="flex flex-wrap justify-between gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all">
              <FaInstagram size={18} />
              <span className="text-sm">Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all">
              <FaLinkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all">
              <FaXTwitter size={18} />
              <span className="text-sm">Twitter</span>
            </a>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App
