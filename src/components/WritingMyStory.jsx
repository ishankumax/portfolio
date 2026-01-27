import React, { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

function WritingMyStory() {
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
  )
}

export default WritingMyStory
