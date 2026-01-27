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
          {/* InTheBox Founder - Latest */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/InTheBox founder.jpg" alt="InTheBox Founder" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">InTheBox Founder</p>
            </div>
          </div>

          {/* Registered Startup */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/registered my startup.jpg" alt="Registered My Startup" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">Registered My Startup</p>
            </div>
          </div>

          {/* Winner at Microsoft */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/winner at microsoft.jpg" alt="Winner at Microsoft" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">Winner at Microsoft</p>
            </div>
          </div>

          {/* Featured in Hindustan Times */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/featured in hindustan times.jpg" alt="Featured in Hindustan Times" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">Featured in Hindustan Times</p>
            </div>
          </div>

          {/* Entrepreneurship Journey */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/entrepunarship journey.jpg" alt="Entrepreneurship Journey" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">Entrepreneurship Journey</p>
            </div>
          </div>

          {/* HQ Mentor */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/HQ Mentor.jpg" alt="HQ Mentor" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">HQ Mentor</p>
            </div>
          </div>

          {/* Devlearn Founding Member */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/Devlearn Founding Member.jpg" alt="Devlearn Founding Member" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">Devlearn Founding Member</p>
            </div>
          </div>

          {/* ACM Marketing Head */}
          <div className="shrink-0 w-64 border-2 border-white rounded-2xl snap-start hover:border-gray-400 transition-colors cursor-pointer overflow-hidden">
            <img src="/ACM Marketing Head.jpg" alt="ACM Marketing Head" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-400">ACM Marketing Head</p>
            </div>
          </div>
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
