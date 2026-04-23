import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

// Curated high-contrast accent colors
export const ACCENT_PALETTE = [
  { name: 'green',  value: '#39ff14' }, // Neon Green (Original)
  { name: 'purple', value: '#a855f7' }, // Purple
  { name: 'blue',   value: '#3b82f6' }, // Blue
  { name: 'orange', value: '#f97316' }, // Orange
  { name: 'pink',   value: '#ec4899' }, // Pink
]

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('portfolio-theme')
    return stored ?? 'dark'
  })

  const [accentColor, setAccentColor] = useState(() => {
    const stored = localStorage.getItem('portfolio-accent')
    return stored ?? ACCENT_PALETTE[0].value
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('portfolio-accent', accentColor)
    document.documentElement.style.setProperty('--accent', accentColor)
    
    // Also derive some utility colors from the accent
    document.documentElement.style.setProperty('--accent-faint', `${accentColor}14`)
    document.documentElement.style.setProperty('--accent-glow', `${accentColor}47`)
    document.documentElement.style.setProperty('--accent-border', `${accentColor}38`)

    // Dynamic GitHub Contribution Levels
    document.documentElement.style.setProperty('--gh-level-0', theme === 'dark' ? '#161b22' : '#e5e7eb') // More visible in light
    document.documentElement.style.setProperty('--gh-level-1', `${accentColor}33`) // 20%
    document.documentElement.style.setProperty('--gh-level-2', `${accentColor}66`) // 40%
    document.documentElement.style.setProperty('--gh-level-3', `${accentColor}aa`) // 66%
    document.documentElement.style.setProperty('--gh-level-4', accentColor)        // 100%
  }, [accentColor, theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
