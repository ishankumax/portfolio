import React, { useState, useRef, useEffect } from 'react'
import { useTheme, ACCENT_PALETTE } from '../../ThemeContext'

/**
 * AccentPicker
 * A premium right-side collapsible control to switch global accent colors.
 */
const AccentPicker = () => {
  const { accentColor, setAccentColor } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)

  // Auto-close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div 
      ref={pickerRef}
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-[150] flex items-center transition-all duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-[64px] md:translate-x-[60px]'
      }`}
    >
      {/* Vertical Trigger Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center py-6 px-2 rounded-l-xl border-y border-l backdrop-blur-xl shadow-[-8px_0_24px_rgba(0,0,0,0.3)] hover:shadow-[-8px_0_32px_var(--accent-glow)] transition-all duration-300 group relative"
        style={{ 
          backgroundColor: 'var(--bg-navbar)', 
          borderColor: 'var(--border-subtle)',
          color: isOpen ? 'var(--accent)' : 'var(--text-secondary)',
          minWidth: '32px'
        }}
        aria-label={isOpen ? "Close accent picker" : "Open accent picker"}
      >
        {/* Active Color Indicator on Tab */}
        {!isOpen && (
          <div 
            className="absolute top-2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_var(--accent)]"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        )}

        <span 
          className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
          style={{ 
            writingMode: 'vertical-lr', 
            transform: 'rotate(180deg)',
            color: isOpen ? 'var(--accent)' : 'inherit'
          }}
        >
          theme accent
        </span>
      </button>

      {/* Expanded Panel */}
      <div 
        className="p-4 border-y border-l backdrop-blur-3xl shadow-2xl flex flex-col gap-4 w-[64px] md:w-[60px]"
        style={{ 
          backgroundColor: 'var(--bg-navbar)', 
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex flex-col gap-4 items-center">
          {ACCENT_PALETTE.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                setAccentColor(color.value)
              }}
              className={`w-7 h-7 md:w-6 md:h-6 rounded-full transition-all duration-300 hover:scale-110 relative group flex items-center justify-center ${
                accentColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'hover:ring-1 hover:ring-white/30'
              }`}
              style={{ 
                backgroundColor: color.value,
                boxShadow: accentColor === color.value ? `0 0 15px ${color.value}80` : 'none'
              }}
              title={`Switch to ${color.name} accent`}
            >
              {/* Tooltip */}
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded bg-black/90 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none uppercase tracking-widest border border-white/10 translate-x-2 group-hover:translate-x-0 hidden md:block z-[200]">
                {color.name}
              </span>
              
              {/* Checkmark for active */}
              {accentColor === color.value && (
                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccentPicker
