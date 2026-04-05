import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { timelineData } from '../data/timelineData'

// ============================================================================
// COMPONENT: ImageMarquee
// Infinite horizontal scroll gallery — pauses on hover, swipeable on mobile
// Uses CSS transform/translateX for GPU-accelerated smooth performance
// ============================================================================
function ImageMarquee({ images }) {
  const [isPaused, setIsPaused] = useState(false)
  const [zoomedImg, setZoomedImg] = useState(null)
  const trackRef = useRef(null)

  if (!images || images.length === 0) return null

  // Duplicate images for seamless infinite loop
  const duplicated = [...images, ...images, ...images]

  return (
    <>
      {/* Marquee Container — desktop: auto-scroll, mobile: swipe */}
      <div 
        className="mt-6 -mx-6 md:-mx-8 overflow-hidden relative marquee-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Desktop: animated marquee track */}
        <div className="hidden md:block">
          <div 
            ref={trackRef}
            className={`marquee-track flex gap-4 py-3 ${isPaused ? 'marquee-paused' : ''}`}
            style={{ width: 'max-content' }}
          >
            {duplicated.map((img, i) => (
              <div
                key={i}
                className="marquee-img-wrapper shrink-0 w-44 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:z-20 relative"
              >
                <div className="h-28 rounded-lg overflow-hidden shadow-lg shadow-black/40">
                  <img 
                    src={img.src} 
                    alt={img.caption || ''} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {img.caption && (
                  <p className="text-[10px] text-gray-500 mt-1.5 leading-tight w-44 break-words overflow-hidden">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal swipe scroll */}
        <div 
          className="flex md:hidden gap-3 py-3 px-6 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-40 snap-start cursor-pointer active:scale-95 transition-transform duration-200"
              onClick={() => setZoomedImg(img.src)}
            >
              <div className="h-26 rounded-lg overflow-hidden shadow-lg shadow-black/40">
                <img 
                  src={img.src} 
                  alt={img.caption || ''} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <p className="text-[10px] text-gray-500 mt-1.5 leading-tight w-40 break-words overflow-hidden">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile tap-to-zoom overlay */}
      {zoomedImg && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 md:hidden"
          onClick={() => setZoomedImg(null)}
        >
          <img 
            src={zoomedImg} 
            alt="" 
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
          <button 
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
            onClick={() => setZoomedImg(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}

// ============================================================================
// COMPONENT: Experience
// ============================================================================
function Experience() {
  const location = useLocation()
  const sectionRefs = useRef({})

  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash].scrollIntoView({ behavior: 'smooth', block: 'center' })
        sectionRefs.current[hash].classList.add('experience-highlight')
        setTimeout(() => {
          sectionRefs.current[hash]?.classList.remove('experience-highlight')
        }, 2000)
      }, 150)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Top Navigation */}
      <header className="w-full relative z-50">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 w-fit group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>back to home</span>
          </Link>
        </div>
      </header>

      {/* Page Title */}
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">experience</h1>
        <p className="text-gray-500 text-sm md:text-base mb-16 max-w-xl leading-relaxed">
          a detailed look at every role, team, and community i've been part of — 
          from founding startups to leading campus chapters.
        </p>
      </div>

      {/* Experience Sections grouped by year */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {timelineData.map((yearGroup, groupIndex) => (
          <div key={yearGroup.year} className="mb-16">
            {/* Year Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <span className="text-2xl md:text-3xl font-bold text-white tracking-widest">
                  {yearGroup.year}
                </span>
                {groupIndex === 0 && (
                  <div className="absolute -right-3 -top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                )}
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
            </div>

            {/* Role Cards */}
            <div className="flex flex-col gap-6 pl-2 md:pl-4">
              {yearGroup.items.map((item) => (
                <section
                  key={item.id}
                  id={item.slug}
                  ref={el => sectionRefs.current[item.slug] = el}
                  className="group relative bg-black border border-gray-800/60 rounded-xl p-6 md:p-8 transition-all duration-500 hover:border-gray-600/80 hover:bg-white/[0.02] overflow-hidden"
                >
                  {/* Subtle ambient glow on hover */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    {/* Role Header */}
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-4">
                      <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
                        {item.role}
                      </h2>
                      <span className="text-[10px] md:text-xs text-gray-500 font-mono tracking-wider shrink-0">
                        {item.date}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-sm text-gray-400 mb-5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 inline-block" />
                      {item.company}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-800/60 mb-5" />

                    {/* Bullets */}
                    <ul className="flex flex-col gap-3">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400 leading-relaxed">
                          <span className="mr-3 text-gray-600 mt-[3px] text-xs">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Image Marquee Gallery */}
                    <ImageMarquee images={item.images} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-800/40 text-center">
          <p className="text-gray-600 text-xs italic">
            and the story continues...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Experience
