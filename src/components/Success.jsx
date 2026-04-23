import React, { useState, useEffect, useRef, useCallback } from 'react'
import { successData, TAB_LABELS } from '../data/successData'

/* ─────────────────────────────────────────────────────────────────────────────
   IMAGE CAROUSEL
   ───────────────────────────────────────────────────────────────────────────── */
function Carousel({ images }) {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [animDir, setAnimDir] = useState(null) // 'left' | 'right'
  const timerRef = useRef(null)
  const total = images.length

  const goTo = useCallback(
    (idx, dir) => {
      setAnimDir(dir)
      setCurrent((idx + total) % total)
    },
    [total]
  )

  const next = useCallback(() => goTo(current + 1, 'left'), [current, goTo])
  const prev = useCallback(() => goTo(current - 1, 'right'), [current, goTo])

  // Auto-play
  useEffect(() => {
    if (isHovered || total <= 1) return
    timerRef.current = setInterval(next, 3500)
    return () => clearInterval(timerRef.current)
  }, [isHovered, next, total])

  // Reset carousel when images array changes (tab/item switch)
  useEffect(() => {
    setCurrent(0)
    setAnimDir(null)
  }, [images])

  // Touch / pointer swipe
  const handlePointerDown = (e) => setDragStart(e.clientX)
  const handlePointerUp = (e) => {
    if (dragStart === null) return
    const delta = e.clientX - dragStart
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev()
    setDragStart(null)
  }

  return (
    <div
      className="success-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Slides */}
      <div className="success-carousel__track">
        {images.map((src, i) => (
          <div
            key={src + i}
            className={`success-carousel__slide ${
              i === current
                ? 'success-carousel__slide--active'
                : 'success-carousel__slide--hidden'
            }`}
          >
            <img
              src={src}
              alt={`slide-${i}`}
              className={`success-carousel__img ${isHovered ? 'success-carousel__img--zoomed' : ''}`}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Arrow controls — only show if multiple images */}
      {total > 1 && (
        <>
          <button
            className="success-carousel__arrow success-carousel__arrow--prev"
            onClick={prev}
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="success-carousel__arrow success-carousel__arrow--next"
            onClick={next}
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="success-carousel__dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`success-carousel__dot ${i === current ? 'success-carousel__dot--active' : ''}`}
                onClick={() => goTo(i, i > current ? 'left' : 'right')}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Counter badge */}
      {total > 1 && (
        <span className="success-carousel__counter">
          {current + 1} / {total}
        </span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ITEM LIST — vertical list of selectable entries (left sidebar within section)
   ───────────────────────────────────────────────────────────────────────────── */
function ItemList({ items, activeId, onSelect }) {
  return (
    <ol className="success-itemlist">
      {items.map((item, idx) => (
        <li key={item.id}>
          <button
            className={`success-itemlist__btn ${activeId === item.id ? 'success-itemlist__btn--active' : ''}`}
            onClick={() => onSelect(item)}
          >
            <span className="success-itemlist__num">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="success-itemlist__title">{item.title}</span>
            {activeId === item.id && (
              <span className="success-itemlist__indicator" aria-hidden />
            )}
          </button>
        </li>
      ))}
    </ol>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT PANEL — text side
   ───────────────────────────────────────────────────────────────────────────── */
function ContentPanel({ item, sectionLabel }) {
  if (!item) return null
  return (
    <div className="success-content">
      <span className="success-content__tag">{sectionLabel}</span>
      <h2 className="success-content__title">{item.title}</h2>
      <p className="success-content__desc">{item.description}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUCCESS PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function Success() {
  const [activeTab, setActiveTab] = useState('achievements')
  const [activeItem, setActiveItem] = useState(successData.achievements[0])

  const handleTabChange = (key) => {
    setActiveTab(key)
    setActiveItem(successData[key][0])
  }

  const currentLabel =
    TAB_LABELS.find((t) => t.key === activeTab)?.label ?? ''

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="page-header">
        <p className="page-header__eyebrow">portfolio / success</p>
        <h1 className="page-header__title">
          proof of work<span className="page-header__cursor">_</span>
        </h1>
        <p className="page-header__sub">
          real milestones. visual evidence. the story behind the achievements.
        </p>
      </div>

      {/* ── Tab Bar ────────────────────────────────────────────────────────── */}
      <div className="success-tabs" role="tablist" aria-label="Achievement sections">
        {TAB_LABELS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            className={`success-tabs__tab ${activeTab === key ? 'success-tabs__tab--active' : ''}`}
            onClick={() => handleTabChange(key)}
            id={`tab-${key}`}
          >
            {label}
            {activeTab === key && <span className="success-tabs__underline" />}
          </button>
        ))}
      </div>

      {/* ── Split Grid ─────────────────────────────────────────────────────── */}
      <div className="success-grid">

        {/* Left — media + item list */}
        <div className="success-grid__left">
          {/* Carousel */}
          <Carousel key={activeItem?.id} images={activeItem?.images ?? []} />

          {/* Item selector list */}
          <ItemList
            items={successData[activeTab]}
            activeId={activeItem?.id}
            onSelect={setActiveItem}
          />
        </div>

        {/* Right — content */}
        <div className="success-grid__right">
          <ContentPanel item={activeItem} sectionLabel={currentLabel} />
        </div>

      </div>
    </>
  )
}
