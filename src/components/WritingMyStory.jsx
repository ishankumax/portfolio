import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { storyToExperienceMap } from '../data/timelineData'

// Reusable story card component — wraps with Link if a mapping exists
function StoryCard({ imageSrc, altText, label }) {
  const slug = storyToExperienceMap[label]
  
  const cardContent = (
    <div className="shrink-0 w-64 border rounded-2xl snap-start transition-colors cursor-pointer overflow-hidden group" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}>
      <img src={imageSrc} alt={altText} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="p-4 flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</p>
        {slug && (
          <span className="text-xs transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>→</span>
        )}
      </div>
    </div>
  )

  if (slug) {
    return (
      <Link to={`/experience#${slug}`} className="shrink-0">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

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
    <section id="highlights" className="mb-20">
      <h2 className="text-xl md:text-2xl mb-8 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span className="text-xs font-mono not-italic" style={{ color: 'var(--accent-purple)' }}>#</span> writing my story
      </h2>
      
      {/* Horizontal Scrollable Cards with Navigation */}
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-primary)' }}
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Cards Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <StoryCard 
            imageSrc="/InTheBox founder.jpg" 
            altText="InTheBox Founder" 
            label="InTheBox Founder" 
          />
          <StoryCard 
            imageSrc="/ITB Reg..jpg" 
            altText="Registered My Startup" 
            label="Registered My Startup" 
          />
          <StoryCard 
            imageSrc="/tieU.jpg" 
            altText="National Winner at TiE U" 
            label="National Winner at TiE U" 
          />
          <StoryCard 
            imageSrc="/winner at microsoft.jpg" 
            altText="Winner at Microsoft" 
            label="Winner at Microsoft" 
          />
          <StoryCard 
            imageSrc="/featured in hindustan times.jpg" 
            altText="Featured in Hindustan Times" 
            label="Featured in Hindustan Times" 
          />
          <StoryCard 
            imageSrc="/entrepunarship journey.jpg" 
            altText="Entrepreneurship Journey" 
            label="Entrepreneurship Journey" 
          />
          <StoryCard 
            imageSrc="/HQ Mentor.jpg" 
            altText="HQ Mentor" 
            label="HQ Mentor" 
          />
          <StoryCard 
            imageSrc="/Devlearn Founding Member.jpg" 
            altText="Devlearn Founding Member" 
            label="Devlearn Founding Member" 
          />
          <StoryCard 
            imageSrc="/ACM Marketing Head.jpg" 
            altText="ACM Marketing Head" 
            label="ACM Marketing Head" 
          />
        </div>

        {/* Right Arrow */}
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-primary)' }}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}

export default WritingMyStory
