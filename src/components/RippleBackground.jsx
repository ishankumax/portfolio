import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

// ─── Config ──────────────────────────────────────────────────────────────────
const CONFIG = {
  dotSpacing:   28,     // grid cell size in px
  dotRadius:    1.2,    // base dot radius
  dotOpacity:   0.18,   // base dot opacity — very subtle

  // Ripple physics
  maxRipples:   12,     // max concurrent ripple sources
  rippleSpeed:  180,    // px/s — expansion speed
  rippleMaxRadius: 320, // px — ripple dies after this
  rippleRings:  3,      // concentric waves per click
  ringGap:      52,     // px between ring peaks
  waveWidth:    38,     // px — gaussian half-width of displacement
  maxDisplace:  9,      // px — max dot displacement at peak
  fadeInDur:    0.12,   // s — fade in
  fadeDuration: 0.6,    // s — hold time before fade out begins

  // Hover effect
  hoverRadius:  150,    // px — distance at which hover starts
  hoverStrength: 0.8,   // 0-1 — intensity of hover effect
}

// ─── Hex → RGB ────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const n = parseInt(hex, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// ─── Gaussian bell — smooth displacement envelope ─────────────────────────────
function gaussian(x, sigma) {
  return Math.exp(-(x * x) / (2 * sigma * sigma))
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RippleBackground({ enabled }) {
  const canvasRef = useRef(null)
  const ripplesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const lastActiveTimeRef = useRef(0)

  const { accentColor, theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Handle high DPI screens for sharp dots
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw(performance.now())
    }
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.addEventListener('resize', resize)

    // Render loop drawing function
    const draw = (now) => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const accent = hexToRgb(accentColor)
      const baseR = theme === 'light' ? 15 : 255
      const baseG = theme === 'light' ? 14 : 255
      const baseB = theme === 'light' ? 23 : 255

      // Cull dead ripples
      ripplesRef.current = ripplesRef.current.filter(r => {
        const age = (now - r.born) / 1000
        return CONFIG.rippleSpeed * age < CONFIG.rippleMaxRadius + CONFIG.ringGap * CONFIG.rippleRings
      })
      const activeRipples = ripplesRef.current

      // Generate static dot grid coordinates
      const spacing = CONFIG.dotSpacing
      const cols = Math.ceil(W / spacing) + 1
      const rows = Math.ceil(H / spacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing
          const by = r * spacing

          let dx = 0, dy = 0
          let rippleInfluence = 0

          // 1. Calculate ripple displacement
          for (const rip of activeRipples) {
            const age = (now - rip.born) / 1000
            const dist = Math.hypot(bx - rip.x, by - rip.y)

            for (let ring = 0; ring < CONFIG.rippleRings; ring++) {
              const ringRadius = CONFIG.rippleSpeed * age - ring * CONFIG.ringGap
              if (ringRadius < 0) continue

              const delta = dist - ringRadius
              const envelope = gaussian(delta, CONFIG.waveWidth)

              const elapsed = age - ring * (CONFIG.ringGap / CONFIG.rippleSpeed)
              if (elapsed < 0) continue
              const fadeIn = Math.min(elapsed / CONFIG.fadeInDur, 1)
              const fadeOut = Math.max(0, 1 - Math.max(0, elapsed - CONFIG.fadeDuration) / 0.8)
              const amp = fadeIn * fadeOut * CONFIG.maxDisplace * (1 - ring * 0.28)

              const rdist = Math.max(dist, 0.01)
              dx += ((bx - rip.x) / rdist) * envelope * amp
              dy += ((by - rip.y) / rdist) * envelope * amp
              rippleInfluence = Math.max(rippleInfluence, envelope * amp / CONFIG.maxDisplace)
            }
          }

          // 2. Calculate hover displacement
          let hoverInfluence = 0
          if (enabled) {
            const distToMouse = Math.hypot(bx - mouseRef.current.x, by - mouseRef.current.y)
            if (distToMouse < CONFIG.hoverRadius) {
              const hoverNorm = 1 - distToMouse / CONFIG.hoverRadius
              hoverInfluence = Math.pow(hoverNorm, 2) * CONFIG.hoverStrength
              
              const angle = Math.atan2(by - mouseRef.current.y, bx - mouseRef.current.x)
              dx += Math.cos(angle) * hoverInfluence * 4
              dy += Math.sin(angle) * hoverInfluence * 4
            }
          }

          const dotX = bx + dx
          const dotY = by + dy

          // Compose color & opacity
          const combinedInfluence = Math.max(rippleInfluence, hoverInfluence)
          const totalOpacity = Math.min(CONFIG.dotOpacity + combinedInfluence * 0.4, 0.95)
          const tint = Math.min(combinedInfluence * 1.4, 1)
          const ir = Math.round(baseR * (1 - tint) + accent.r * tint)
          const ig = Math.round(baseG * (1 - tint) + accent.g * tint)
          const ib = Math.round(baseB * (1 - tint) + accent.b * tint)
          const dotR = CONFIG.dotRadius + combinedInfluence * 0.8

          ctx.beginPath()
          ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${ir},${ig},${ib},${totalOpacity.toFixed(3)})`
          ctx.fill()
        }
      }
    }

    let rafId = null
    let isAnimating = false

    const tick = () => {
      if (!canvasRef.current) {
        isAnimating = false
        return
      }

      const now = performance.now()
      draw(now)

      const hasRipples = ripplesRef.current.length > 0
      const mouseActive = enabled && (mouseRef.current.x !== -1000 || mouseRef.current.y !== -1000)
      const recentlyMoved = now - lastActiveTimeRef.current < 250

      if (hasRipples || (mouseActive && recentlyMoved)) {
        rafId = requestAnimationFrame(tick)
      } else {
        draw(now)
        isAnimating = false
      }
    }

    const startAnimation = () => {
      lastActiveTimeRef.current = performance.now()
      if (!isAnimating) {
        isAnimating = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const getPos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const spawnRipple = (x, y) => {
      const now = performance.now()
      const ripples = ripplesRef.current
      if (ripples.some(r => Math.hypot(r.x - x, r.y - y) < 12 && now - r.born < 80)) return
      if (ripples.length >= CONFIG.maxRipples) ripples.splice(0, 1)
      ripples.push({ x, y, born: now })
    }

    const onDocClick = e => {
      const { x, y } = getPos(e.clientX, e.clientY)
      spawnRipple(x, y)
      startAnimation()
    }

    const onDocTouch = e => {
      for (const t of e.changedTouches) {
        const { x, y } = getPos(t.clientX, t.clientY)
        spawnRipple(x, y)
      }
      startAnimation()
    }

    const onDocMouseMove = e => {
      const { x, y } = getPos(e.clientX, e.clientY)
      mouseRef.current = { x, y }
      startAnimation()
    }

    const onDocMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
      startAnimation()
    }

    if (enabled) {
      document.addEventListener('click',      onDocClick)
      document.addEventListener('touchstart', onDocTouch, { passive: true })
      document.addEventListener('mousemove',  onDocMouseMove)
      document.addEventListener('mouseleave', onDocMouseLeave)
    } else {
      ripplesRef.current = []
      mouseRef.current = { x: -1000, y: -1000 }
    }

    // Render initial static frame
    draw(performance.now())

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      if (enabled) {
        document.removeEventListener('click',      onDocClick)
        document.removeEventListener('touchstart', onDocTouch)
        document.removeEventListener('mousemove',  onDocMouseMove)
        document.removeEventListener('mouseleave', onDocMouseLeave)
      }
    }
  }, [enabled, theme, accentColor])

  return (
    <canvas
      ref={canvasRef}
      id="ripple-bg"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  )
}
