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
// COMPONENT: CollapsibleTimelineSidebar
// Right-side sticky sidebar — expanded = full timeline, collapsed = slim bar
// with vertical writing-mode labels (OVERVIEW, 2026, 2025…) like LeetCode
// ============================================================================
function CollapsibleTimelineSidebar({ activeYear }) {
  const [collapsed, setCollapsed] = useState(false)

  // Years derived from data for the slim bar labels
  const years = timelineData.map(g => g.year)

  return (
    <aside
      className={`exp-sidebar ${collapsed ? 'exp-sidebar--collapsed' : 'exp-sidebar--expanded'}`}
      aria-label="Experience timeline sidebar"
    >
      {/* ── Toggle button ─────────────────────────────────────────────── */}
      <button
        className="exp-sidebar__toggle"
        onClick={() => setCollapsed(c => !c)}
        title={collapsed ? 'Expand timeline' : 'Collapse timeline'}
        aria-expanded={!collapsed}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`exp-sidebar__toggle-icon ${collapsed ? 'exp-sidebar__toggle-icon--flipped' : ''}`}
        >
          <path d="M10 3L6 8l4 5" />
        </svg>
      </button>

      {/* ── EXPANDED: full timeline ────────────────────────────────────── */}
      <div className="exp-sidebar__full">
        <h3 className="exp-sidebar__heading">Timeline Overview</h3>
        <Timeline isMobileMode={false} activeYear={activeYear} />
      </div>

      {/* ── COLLAPSED: slim vertical label bar ───────────────────────── */}
      <div className="exp-sidebar__slim" onClick={() => setCollapsed(false)}>
        <div className="exp-sidebar__slim-inner">
          <span className="exp-sidebar__slim-label exp-sidebar__slim-label--title">
            OVERVIEW
          </span>
          {years.map(y => (
            <span
              key={y}
              className={`exp-sidebar__slim-label ${activeYear === y ? 'exp-sidebar__slim-label--active' : ''}`}
            >
              {y}
            </span>
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

  // IntersectionObserver — track which year is in view for timeline sync
  useEffect(() => {
    const yearEls = {}
    timelineData.forEach(g => {
      const el = document.getElementById(`year-section-${g.year}`)
      if (el) yearEls[g.year] = el
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const yr = entry.target.dataset.year
            if (yr) setActiveYear(yr)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    Object.values(yearEls).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen text-white font-mono">

      {/* Page Header */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="success-header">
          <p className="success-header__eyebrow">portfolio / experience</p>
          <h1 className="success-header__title">every chapter<span className="success-header__cursor">_</span></h1>
          <p className="success-header__sub">
            a detailed look at every role, team, and community i've been part of —
            from founding startups to leading campus chapters.
          </p>
        </div>
      </div>

      {/* ── Two-column layout: content + right sidebar ─────────────────────── */}
      <div className="exp-layout">

        {/* Main Content */}
        <main className="exp-layout__content">
          {timelineData.map((yearGroup, groupIndex) => (
            <div
              key={yearGroup.year}
              id={`year-section-${yearGroup.year}`}
              data-year={yearGroup.year}
              className="mb-16"
            >
              {/* Year Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <span className="text-2xl md:text-3xl font-bold text-white tracking-widest">
                    {yearGroup.year}
                  </span>
                  {groupIndex === 0 && (
                    <div className="absolute -right-3 -top-1 w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: 'var(--accent-purple)' }} />
                  )}
                </div>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, var(--border-subtle), transparent)' }} />
              </div>

              {/* Role Cards */}
              <div className="flex flex-col gap-6 pl-2 md:pl-4">
                {yearGroup.items.map((item) => (
                  <section
                    key={item.id}
                    id={item.slug}
                    ref={el => sectionRefs.current[item.slug] = el}
                    className="group relative border rounded-2xl p-10 md:p-14 transition-all duration-700 overflow-hidden"
                    style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}
                  >
                    {/* Ambient glow on hover */}
                    <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: 'var(--accent-purple-faint)' }} />

                    <div className="relative z-10">
                      {/* Role Header */}
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {item.role}
                        </h2>
                        <span className="text-[11px] md:text-xs font-mono tracking-widest uppercase opacity-70" style={{ color: 'var(--text-muted)' }}>
                          {item.date}
                        </span>
                      </div>

                      {/* Company */}
                      <p className="text-sm mb-8 flex items-center gap-2 font-light" style={{ color: 'var(--text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: 'var(--accent-purple-border)' }} />
                        {item.website ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="company-link brightness-125"
                          >
                            {item.company}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="company-link-icon">
                              <path d="M2 10L10 2M10 2H5M10 2v5" />
                            </svg>
                          </a>
                        ) : item.company}
                      </p>

                      <div className="border-t mb-5" style={{ borderColor: 'var(--border-subtle)' }} />

                      {/* Bullets */}
                      <ul className="flex flex-col gap-6 mb-12">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start text-sm md:text-base leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mr-5 mt-[10px] text-[10px]" style={{ color: 'var(--accent-purple-border)' }}>/</span>
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

          <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>and the story continues...</p>
          </div>
        </main>

        {/* Right Sidebar — Desktop only */}
        <CollapsibleTimelineSidebar activeYear={activeYear} />

      </div>
    </div>
  )
}

export default Experience
