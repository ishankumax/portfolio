import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { timelineData } from '../data/timelineData'
import Timeline from './Timeline'

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
      <header className="w-full h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-white transition-all flex items-center gap-2 w-fit group text-sm font-light tracking-widest"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="uppercase">[ back to home ]</span>
          </Link>
        </div>
      </header>

      {/* Page Title */}
      {/* Page Title & Intro — Centered for better balance */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white uppercase">experience</h1>
        <div className="w-20 h-px bg-white/20 mx-auto mb-10" />
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light brightness-110">
          a detailed look at every role, team, and community i've been part of — 
          from founding startups to leading campus chapters.
        </p>
      </div>

      {/* Two Column Layout — Detailed cards on left, Timeline on right */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        
        {/* Detailed Role Cards (Main Content) */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          <h3 className="lg:hidden text-white font-mono text-[10px] uppercase tracking-[0.3em] mb-8 opacity-50">Detailed Experience</h3>
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
                    className="group relative bg-black border border-white/5 rounded-2xl p-10 md:p-14 transition-all duration-700 hover:border-white/10 hover:bg-white/[0.01] overflow-hidden"
                  >
                    {/* Subtle ambient glow on hover */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10">
                      {/* Role Header */}
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                          {item.role}
                        </h2>
                        <span className="text-[11px] md:text-xs text-gray-500 font-mono tracking-widest uppercase opacity-70">
                          {item.date}
                        </span>
                      </div>

                      {/* Company — external link if website is provided */}
                      <p className="text-sm text-gray-400 mb-8 flex items-center gap-2 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block shrink-0" />
                        {item.website ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="company-link brightness-125"
                          >
                            {item.company}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              className="company-link-icon"
                            >
                              <path d="M2 10L10 2M10 2H5M10 2v5" />
                            </svg>
                          </a>
                        ) : (
                          item.company
                        )}
                      </p>

                      {/* Divider */}
                      <div className="border-t border-gray-800/60 mb-5" />

                      {/* Bullets */}
                      <ul className="flex flex-col gap-6 mb-12">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start text-sm md:text-base text-gray-400 leading-relaxed font-light">
                            <span className="mr-5 text-white/20 mt-[10px] text-[10px]">/</span>
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

        {/* Sticky Timeline Sidebar — Desktop only, Right aligned */}
        <aside className="hidden lg:block lg:w-[32%] max-w-lg shrink-0 order-1 lg:order-2">
          <div className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar py-4 border-l border-white/5 pl-10">
            <h3 className="text-white font-mono text-[10px] uppercase tracking-[0.5em] mb-10 opacity-30">Timeline Overview</h3>
            <Timeline isMobileMode={false} />
          </div>
        </aside>

      </div>
    </div>
  )
}

export default Experience
