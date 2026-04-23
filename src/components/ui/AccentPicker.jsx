import React from 'react'
import { useTheme, ACCENT_PALETTE } from '../../ThemeContext'

/**
 * AccentPicker
 * A premium floating UI to switch the global accent color in real-time.
 */
const AccentPicker = () => {
  const { accentColor, setAccentColor } = useTheme()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
      <div className="flex flex-col gap-2 p-2 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-105" 
           style={{ backgroundColor: 'var(--bg-navbar)', borderColor: 'var(--border-subtle)' }}>
        {ACCENT_PALETTE.map((color) => (
          <button
            key={color.name}
            onClick={() => setAccentColor(color.value)}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 relative group ${
              accentColor === color.value ? 'ring-2 ring-offset-2 ring-offset-transparent' : ''
            }`}
            style={{ 
              backgroundColor: color.value,
              ringColor: color.value,
              boxShadow: accentColor === color.value ? `0 0 10px ${color.value}80` : 'none'
            }}
            title={`Switch to ${color.name} accent`}
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/80 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest border border-white/10">
              {color.name}
            </span>
          </button>
        ))}
      </div>
      
      {/* Label */}
      <span className="text-[9px] font-mono tracking-widest uppercase opacity-40 select-none">theme accent</span>
    </div>
  )
}

export default AccentPicker
