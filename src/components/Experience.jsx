import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { timelineData } from '../data/timelineData'
import Timeline from './Timeline'

// ============================================================================
// COMPONENT: ImageMarquee
// Infinite horizontal scroll gallery — pauses on hover, swipeable on mobile
// ============================================================================
function ImageMarquee({ images }) {
  const [isPaused, setIsPaused] = useState(false)
  const [zoomedImg, setZoomedImg] = useState(null)
  const trackRef = useRef(null)

  if (!images || images.length === 0) return null

  const duplicated = [...images, ...images, ...images]

  return (
    <>
      <div
        className="mt-6 -mx-6 md:-mx-8 overflow-hidden relative marquee-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />

        <div className="hidden md:block">
          <div
            ref={trackRef}
            className={`marquee-track flex gap-4 py-3 ${isPaused ? 'marquee-paused' : ''}`}
            style={{ width: 'max-content' }}
          >
            {duplicated.map((img, i) => (
              <div
                key={i}
                className="marquee-img-wrapper shrink-0 w-44 cursor-pointer transition-all duration-300 hover:scale-110 hover:z-20 relative"
              >
                <div className="h-28 rounded-lg overflow-hidden shadow-lg shadow-black/40">
                  <img src={img.src} alt={img.caption || ''} className="w-full h-full object-cover" loading="lazy" />
                </div>
                {img.caption && (
                  <p className="text-[10px] mt-1.5 leading-tight w-44 break-words overflow-hidden" style={{ color: 'var(--text-muted)' }}>
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex md:hidden gap-3 py-3 px-6 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {images.map((img, i) => (
            <div key={i} className="shrink-0 w-40 snap-start cursor-pointer active:scale-95 transition-transform duration-200" onClick={() => setZoomedImg(img.src)}>
              <div className="h-26 rounded-lg overflow-hidden shadow-lg shadow-black/40">
                <img src={img.src} alt={img.caption || ''} className="w-full h-full object-cover" loading="lazy" />
              </div>
              {img.caption && (
                <p className="text-[10px] text-gray-500 mt-1.5 leading-tight w-40 break-words overflow-hidden">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {zoomedImg && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 md:hidden" onClick={() => setZoomedImg(null)}>
          <img src={zoomedImg} alt="" className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
          <button className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl" onClick={() => setZoomedImg(null)}>✕</button>
        </div>
      )}
    </>
  )
}

// ============================================================================
// COMPONENT: SlimSidebar
// Integrated 80px sidebar with vertical labels (LeetCode style)
// ============================================================================
function SlimSidebar({ activeYear, onYearClick }) {
  const years = timelineData.map(g => g.year)

  return (
    <aside className="exp-sidebar-new">
      <div className="exp-sidebar-new__inner">
        {/* Overview Label */}
        <div 
          className="exp-sidebar-new__item"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="exp-sidebar-new__label exp-sidebar-new__label--overview">OVERVIEW</span>
        </div>

        {/* Year Labels */}
        <div className="exp-sidebar-new__years">
          {years.map(y => (
            <div 
              key={y}
              className={`exp-sidebar-new__item ${activeYear === y ? 'exp-sidebar-new__item--active' : ''}`}
              onClick={() => onYearClick(y)}
            >
              <span className="exp-sidebar-new__label">{y}</span>
              <div className="exp-sidebar-new__dot" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ============================================================================
// COMPONENT: Experience
// ============================================================================
function Experience() {
  const location = useLocation()
  const sectionRefs = useRef({})
  const [activeYear, setActiveYear] = useState(timelineData[0]?.year ?? null)

  // Scroll to year function
  const scrollToYear = useCallback((year) => {
    const el = document.getElementById(`year-section-${year}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Deep-link scroll on hash
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

  // IntersectionObserver — track which year is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const yr = entry.target.dataset.year
            if (yr) setActiveYear(yr)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    timelineData.forEach(g => {
      const el = document.getElementById(`year-section-${g.year}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="exp-container">
      {/* Main Content Area */}
      <main className="exp-content">
        <div className="exp-content__inner">
          {/* Unified Page Header */}
          <header className="page-header">
            <p className="page-header__eyebrow">portfolio / experience</p>
            <h1 className="page-header__title">every chapter<span className="page-header__cursor">_</span></h1>
            <p className="page-header__sub">
              a detailed look at every role, team, and community i've been part of —
              from founding startups to leading campus chapters.
            </p>
          </header>

          {/* Content Groups */}
          {timelineData.map((yearGroup, groupIndex) => (
            <div
              key={yearGroup.year}
              id={`year-section-${yearGroup.year}`}
              data-year={yearGroup.year}
              className="exp-year-group"
            >
              {/* Year Marker */}
              <div className="exp-year-marker">
                <span className="exp-year-marker__text">{yearGroup.year}</span>
                <div className="exp-year-marker__line" />
              </div>

              {/* Role Cards */}
              <div className="exp-cards">
                {yearGroup.items.map((item) => (
                  <section
                    key={item.id}
                    id={item.slug}
                    ref={el => sectionRefs.current[item.slug] = el}
                    className="exp-card group"
                  >
                    <div className="exp-card__glow" />
                    <div className="relative z-10">
                      <header className="exp-card__header">
                        <h2 className="exp-card__role">{item.role}</h2>
                        <span className="exp-card__date">{item.date}</span>
                      </header>

                      <div className="exp-card__company">
                        <span className="exp-card__dot" />
                        {item.website ? (
                          <a href={item.website} target="_blank" rel="noopener noreferrer" className="exp-company-link">
                            {item.company}
                            <svg className="exp-company-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H5M10 2v5" /></svg>
                          </a>
                        ) : item.company}
                      </div>

                      <ul className="exp-card__bullets">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="exp-card__bullet">
                            <span className="exp-card__bullet-icon">+</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <ImageMarquee images={item.images} />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ))}

          <footer className="exp-footer">
            <p>and the story continues...</p>
          </footer>
        </div>
      </main>

      {/* Sticky Integrated Sidebar */}
      <SlimSidebar activeYear={activeYear} onYearClick={scrollToYear} />
    </div>
  )
}

export default Experience
