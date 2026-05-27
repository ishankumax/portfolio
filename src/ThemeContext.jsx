/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

// Curated theme presets inspired by Monkeytype
export const THEME_PRESETS = [
  {
    id: 'shadow',
    name: 'Shadow',
    accent: '#ffffff',
    accentDim: '#d4d4d8',
    bgBase: '#09090b',
    bgBase95: 'rgba(9, 9, 11, 0.95)',
    bgSurface: '#18181b',
    bgElevated: '#27272a',
    bgNavbar: 'rgba(9, 9, 11, 0.80)',
    bgCard: 'rgba(255, 255, 255, 0.02)',
    textPrimary: '#f4f4f5',
    textSecondary: '#a1a1aa',
    textMuted: '#52525b',
    borderSubtle: 'rgba(255, 255, 255, 0.04)',
    borderCard: 'rgba(161, 161, 170, 0.15)',
    selectionBg: 'rgba(255, 255, 255, 0.15)',
    selectionText: '#ffffff',
    scrollbarThumb: 'rgba(255, 255, 255, 0.15)',
    scrollbarHover: 'rgba(255, 255, 255, 0.35)',
    dotsColor: '#52525b',
    ghLevel0: '#18181b',
    ghLevel1: 'rgba(255, 255, 255, 0.15)',
    ghLevel2: 'rgba(255, 255, 255, 0.35)',
    ghLevel3: 'rgba(255, 255, 255, 0.65)',
    ghLevel4: '#ffffff',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    accent: '#ff79c6',
    accentDim: '#bd93f9',
    bgBase: '#1e1f29',
    bgBase95: 'rgba(30, 31, 41, 0.95)',
    bgSurface: '#282a36',
    bgElevated: '#343746',
    bgNavbar: 'rgba(30, 31, 41, 0.80)',
    bgCard: 'rgba(255, 121, 198, 0.03)',
    textPrimary: '#f8f8f2',
    textSecondary: '#a4b5ff',
    textMuted: '#6272a4',
    borderSubtle: 'rgba(98, 114, 164, 0.15)',
    borderCard: 'rgba(189, 147, 249, 0.25)',
    selectionBg: 'rgba(189, 147, 249, 0.30)',
    selectionText: '#f8f8f2',
    scrollbarThumb: 'rgba(189, 147, 249, 0.20)',
    scrollbarHover: 'rgba(255, 121, 198, 0.40)',
    dotsColor: '#6272a4',
    ghLevel0: '#21222c',
    ghLevel1: 'rgba(255, 121, 198, 0.15)',
    ghLevel2: 'rgba(255, 121, 198, 0.35)',
    ghLevel3: 'rgba(255, 121, 198, 0.65)',
    ghLevel4: '#ff79c6',
  },
  {
    id: 'taro',
    name: 'Taro',
    accent: '#b3a3e4',
    accentDim: '#8b7ca6',
    bgBase: '#131217',
    bgBase95: 'rgba(19, 18, 23, 0.95)',
    bgSurface: '#1d1b26',
    bgElevated: '#282535',
    bgNavbar: 'rgba(19, 18, 23, 0.80)',
    bgCard: 'rgba(179, 163, 228, 0.03)',
    textPrimary: '#eceaf4',
    textSecondary: '#a39eb8',
    textMuted: '#625e75',
    borderSubtle: 'rgba(179, 163, 228, 0.06)',
    borderCard: 'rgba(179, 163, 228, 0.20)',
    selectionBg: 'rgba(179, 163, 228, 0.25)',
    selectionText: '#eceaf4',
    scrollbarThumb: 'rgba(179, 163, 228, 0.20)',
    scrollbarHover: 'rgba(179, 163, 228, 0.40)',
    dotsColor: '#625e75',
    ghLevel0: '#1d1b26',
    ghLevel1: 'rgba(179, 163, 228, 0.15)',
    ghLevel2: 'rgba(179, 163, 228, 0.35)',
    ghLevel3: 'rgba(179, 163, 228, 0.65)',
    ghLevel4: '#b3a3e4',
  },
  {
    id: 'nord',
    name: 'Nord',
    accent: '#88c0d0',
    accentDim: '#81a1c1',
    bgBase: '#2e3440',
    bgBase95: 'rgba(46, 52, 64, 0.95)',
    bgSurface: '#3b4252',
    bgElevated: '#434c5e',
    bgNavbar: 'rgba(46, 52, 64, 0.80)',
    bgCard: 'rgba(136, 192, 208, 0.03)',
    textPrimary: '#eceff4',
    textSecondary: '#d8dee9',
    textMuted: '#4c566a',
    borderSubtle: 'rgba(216, 222, 233, 0.05)',
    borderCard: 'rgba(136, 192, 208, 0.20)',
    selectionBg: 'rgba(136, 192, 208, 0.25)',
    selectionText: '#eceff4',
    scrollbarThumb: 'rgba(136, 192, 208, 0.20)',
    scrollbarHover: 'rgba(136, 192, 208, 0.40)',
    dotsColor: '#4c566a',
    ghLevel0: '#3b4252',
    ghLevel1: 'rgba(136, 192, 208, 0.15)',
    ghLevel2: 'rgba(136, 192, 208, 0.35)',
    ghLevel3: 'rgba(136, 192, 208, 0.65)',
    ghLevel4: '#88c0d0',
  },
  {
    id: 'matrix',
    name: 'Matrix',
    accent: '#39ff14',
    accentDim: '#22c55e',
    bgBase: '#000000',
    bgBase95: 'rgba(0, 0, 0, 0.95)',
    bgSurface: '#050c05',
    bgElevated: '#0a140a',
    bgNavbar: 'rgba(0, 0, 0, 0.80)',
    bgCard: 'rgba(57, 255, 20, 0.03)',
    textPrimary: '#39ff14',
    textSecondary: '#1cbd12',
    textMuted: '#0d5c0b',
    borderSubtle: 'rgba(57, 255, 20, 0.08)',
    borderCard: 'rgba(57, 255, 20, 0.22)',
    selectionBg: 'rgba(57, 255, 20, 0.25)',
    selectionText: '#39ff14',
    scrollbarThumb: 'rgba(57, 255, 20, 0.25)',
    scrollbarHover: 'rgba(57, 255, 20, 0.50)',
    dotsColor: '#0d5c0b',
    ghLevel0: '#050c05',
    ghLevel1: 'rgba(57, 255, 20, 0.15)',
    ghLevel2: 'rgba(57, 255, 20, 0.35)',
    ghLevel3: 'rgba(57, 255, 20, 0.65)',
    ghLevel4: '#39ff14',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    accent: '#00f0ff',
    accentDim: '#ff0055',
    bgBase: '#0d0b14',
    bgBase95: 'rgba(13, 11, 20, 0.95)',
    bgSurface: '#161224',
    bgElevated: '#201a33',
    bgNavbar: 'rgba(13, 11, 20, 0.80)',
    bgCard: 'rgba(0, 240, 255, 0.03)',
    textPrimary: '#f0edf5',
    textSecondary: '#bfa5e3',
    textMuted: '#56417a',
    borderSubtle: 'rgba(0, 240, 255, 0.06)',
    borderCard: 'rgba(0, 240, 255, 0.20)',
    selectionBg: 'rgba(0, 240, 255, 0.25)',
    selectionText: '#f0edf5',
    scrollbarThumb: 'rgba(0, 240, 255, 0.20)',
    scrollbarHover: 'rgba(0, 240, 255, 0.40)',
    dotsColor: '#56417a',
    ghLevel0: '#161224',
    ghLevel1: 'rgba(0, 240, 255, 0.15)',
    ghLevel2: 'rgba(0, 240, 255, 0.35)',
    ghLevel3: 'rgba(0, 240, 255, 0.65)',
    ghLevel4: '#00f0ff',
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    accent: '#cba6f7',
    accentDim: '#b4befe',
    bgBase: '#1e1e2e',
    bgBase95: 'rgba(30, 30, 46, 0.95)',
    bgSurface: '#252538',
    bgElevated: '#313244',
    bgNavbar: 'rgba(30, 30, 46, 0.80)',
    bgCard: 'rgba(203, 166, 247, 0.03)',
    textPrimary: '#cdd6f4',
    textSecondary: '#a6adc8',
    textMuted: '#585b70',
    borderSubtle: 'rgba(203, 166, 247, 0.06)',
    borderCard: 'rgba(203, 166, 247, 0.20)',
    selectionBg: 'rgba(203, 166, 247, 0.25)',
    selectionText: '#cdd6f4',
    scrollbarThumb: 'rgba(203, 166, 247, 0.20)',
    scrollbarHover: 'rgba(203, 166, 247, 0.40)',
    dotsColor: '#585b70',
    ghLevel0: '#252538',
    ghLevel1: 'rgba(203, 166, 247, 0.15)',
    ghLevel2: 'rgba(203, 166, 247, 0.35)',
    ghLevel3: 'rgba(203, 166, 247, 0.65)',
    ghLevel4: '#cba6f7',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu Terminal',
    accent: '#df382c',
    accentDim: '#e95420',
    bgBase: '#2c001e',
    bgBase95: 'rgba(44, 0, 30, 0.95)',
    bgSurface: '#3d0c2f',
    bgElevated: '#4f183f',
    bgNavbar: 'rgba(44, 0, 30, 0.80)',
    bgCard: 'rgba(223, 56, 44, 0.03)',
    textPrimary: '#ffffff',
    textSecondary: '#dfdbd2',
    textMuted: '#9c8394',
    borderSubtle: 'rgba(223, 56, 44, 0.06)',
    borderCard: 'rgba(223, 56, 44, 0.20)',
    selectionBg: 'rgba(223, 56, 44, 0.25)',
    selectionText: '#ffffff',
    scrollbarThumb: 'rgba(223, 56, 44, 0.20)',
    scrollbarHover: 'rgba(223, 56, 44, 0.40)',
    dotsColor: '#9c8394',
    ghLevel0: '#3d0c2f',
    ghLevel1: 'rgba(223, 56, 44, 0.15)',
    ghLevel2: 'rgba(223, 56, 44, 0.35)',
    ghLevel3: 'rgba(223, 56, 44, 0.65)',
    ghLevel4: '#df382c',
  }
]

// Expose legacy ACCENT_PALETTE for compatibility
export const ACCENT_PALETTE = THEME_PRESETS.map(p => ({
  name: p.id,
  value: p.accent
}))

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('portfolio-theme')
    return stored ?? 'dark'
  })

  const [activePresetId, setActivePresetId] = useState(() => {
    const stored = localStorage.getItem('portfolio-accent-preset')
    return stored ?? 'matrix'
  })

  const activePreset = THEME_PRESETS.find(p => p.id === activePresetId) || THEME_PRESETS[4]

  const [rippleEnabled, setRippleEnabled] = useState(() => {
    const stored = localStorage.getItem('portfolio-ripple')
    return stored !== null ? stored === 'true' : false // OFF by default
  })

  const toggleRipple = () => setRippleEnabled(prev => {
    const next = !prev
    localStorage.setItem('portfolio-ripple', String(next))
    return next
  })

  const selectPreset = (presetId) => {
    if (THEME_PRESETS.some(p => p.id === presetId)) {
      setActivePresetId(presetId)
      localStorage.setItem('portfolio-accent-preset', presetId)
    }
  }

  // Compatibility helper: mapping accentColor and setAccentColor
  const accentColor = activePreset.accent
  const setAccentColor = (color) => {
    const found = THEME_PRESETS.find(p => p.accent.toLowerCase() === color.toLowerCase())
    if (found) {
      selectPreset(found.id)
    }
  }

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.style.setProperty('--accent', activePreset.accent)
      root.style.setProperty('--accent-dim', activePreset.accentDim)
      root.style.setProperty('--accent-faint', activePreset.accentFaint || `${activePreset.accent}14`)
      root.style.setProperty('--accent-glow', activePreset.accentGlow || `${activePreset.accent}47`)
      root.style.setProperty('--accent-border', activePreset.accentBorder || `${activePreset.accent}38`)
      
      root.style.setProperty('--bg-base', activePreset.bgBase)
      root.style.setProperty('--bg-base-95', activePreset.bgBase95)
      root.style.setProperty('--bg-surface', activePreset.bgSurface)
      root.style.setProperty('--bg-elevated', activePreset.bgElevated)
      root.style.setProperty('--bg-navbar', activePreset.bgNavbar)
      root.style.setProperty('--bg-card', activePreset.bgCard)
      
      root.style.setProperty('--text-primary', activePreset.textPrimary)
      root.style.setProperty('--text-secondary', activePreset.textSecondary)
      root.style.setProperty('--text-muted', activePreset.textMuted)
      
      root.style.setProperty('--border-subtle', activePreset.borderSubtle)
      root.style.setProperty('--border-card', activePreset.borderCard)
      
      root.style.setProperty('--selection-bg', activePreset.selectionBg)
      root.style.setProperty('--selection-text', activePreset.selectionText)
      
      root.style.setProperty('--scrollbar-thumb', activePreset.scrollbarThumb)
      root.style.setProperty('--scrollbar-hover', activePreset.scrollbarHover)
      
      root.style.setProperty('--dots-color', activePreset.dotsColor)
      
      root.style.setProperty('--gh-level-0', activePreset.ghLevel0)
      root.style.setProperty('--gh-level-1', activePreset.ghLevel1)
      root.style.setProperty('--gh-level-2', activePreset.ghLevel2)
      root.style.setProperty('--gh-level-3', activePreset.ghLevel3)
      root.style.setProperty('--gh-level-4', activePreset.ghLevel4)
    } else {
      // Light Mode: Clear overrides to let CSS variables take effect
      const varsToClear = [
        '--bg-base', '--bg-base-95', '--bg-surface', '--bg-elevated', '--bg-navbar', '--bg-card',
        '--text-primary', '--text-secondary', '--text-muted',
        '--border-subtle', '--border-card',
        '--selection-bg', '--selection-text',
        '--scrollbar-thumb', '--scrollbar-hover',
        '--dots-color'
      ]
      varsToClear.forEach(v => root.style.removeProperty(v))
      
      // Apply preset's accent (light-adapted)
      const accent = activePreset.accent
      root.style.setProperty('--accent', accent)
      root.style.setProperty('--accent-dim', activePreset.accentDim)
      
      root.style.setProperty('--accent-faint', `${accent}14`)
      root.style.setProperty('--accent-glow', `${accent}33`)
      root.style.setProperty('--accent-border', `${accent}40`)
      
      root.style.setProperty('--gh-level-0', '#e5e7eb')
      root.style.setProperty('--gh-level-1', `${accent}22`)
      root.style.setProperty('--gh-level-2', `${accent}55`)
      root.style.setProperty('--gh-level-3', `${accent}88`)
      root.style.setProperty('--gh-level-4', accent)
    }
  }, [activePreset, theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      accentColor, 
      setAccentColor, 
      rippleEnabled, 
      toggleRipple,
      activePreset,
      selectPreset
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
