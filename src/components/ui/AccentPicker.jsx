import React, { useState, useRef, useEffect } from 'react'
import { useTheme, THEME_PRESETS } from '../../ThemeContext'

/**
 * AccentPicker
 * A premium right-side collapsible control to switch curated theme presets.
 */
const AccentPicker = () => {
  const { activePreset, selectPreset } = useTheme()
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
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-[150] flex items-center transition-all duration-300 ease-in-out border-y border-l rounded-l-xl backdrop-blur-3xl ${
        isOpen ? 'translate-x-0' : 'translate-x-[150px]'
      }`}
      style={{
        backgroundColor: 'var(--bg-navbar)',
        borderColor: 'var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 32px var(--accent-glow)' : '-8px 0 24px rgba(0,0,0,0.3)'
      }}
    >
      {/* Vertical Trigger Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center py-6 px-2 transition-all duration-300 group relative cursor-pointer"
        style={{ 
          color: isOpen ? 'var(--accent)' : 'var(--text-secondary)',
          minWidth: '32px'
        }}
        aria-label={isOpen ? "Close theme panel" : "Open theme panel"}
      >
        {/* Active Color Indicator on Tab */}
        <div 
          className={`absolute top-4 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100 shadow-[0_0_8px_var(--accent)]'}`}
          style={{ backgroundColor: 'var(--accent)' }}
        />

        <span 
          className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-300"
          style={{ 
            writingMode: 'vertical-lr', 
            transform: 'rotate(180deg)',
            color: isOpen ? 'var(--accent)' : 'inherit'
          }}
        >
          theme presets
        </span>
      </button>

      {/* Expanded Panel */}
      <div 
        className="py-4 pr-4 pl-3 flex flex-col gap-3 w-[150px]"
      >
        <div className="flex flex-col gap-1.5 text-left font-mono">
          {THEME_PRESETS.map((preset) => {
            const isActive = activePreset?.id === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => {
                  selectPreset(preset.id)
                }}
                className="flex items-center gap-2 text-[11px] transition-all duration-250 py-1 px-2 rounded text-left border group/item cursor-pointer w-full"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--accent-faint)' : 'transparent',
                  borderColor: isActive ? 'var(--accent-border)' : 'transparent',
                }}
                title={`Switch to ${preset.name} theme`}
              >
                {/* Custom dot bullet */}
                <span 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                    isActive ? 'scale-110' : 'opacity-40 group-hover/item:opacity-100 group-hover/item:scale-110'
                  }`}
                  style={{
                    backgroundColor: preset.accent,
                    boxShadow: isActive ? `0 0 8px ${preset.accent}` : 'none'
                  }}
                />
                <span className="truncate tracking-wide">{preset.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AccentPicker
