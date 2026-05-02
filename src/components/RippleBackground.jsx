import { useEffect, useRef, useCallback } from 'react'
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
  const canvasRef    = useRef(null)
  const ripplesRef   = useRef([])
  const rafRef       = useRef(null)
  const lastTimeRef  = useRef(null)
  const { accentColor } = useTheme()
  const accentRgbRef = useRef(hexToRgb(accentColor))

  // Sync accent color to ref whenever theme changes
  useEffect(() => {
    accentRgbRef.current = hexToRgb(accentColor)
  }, [accentColor])

  // ── Spawn ripple ────────────────────────────────────────────────────────────
  const spawnRipple = useCallback((x, y) => {
    const now = performance.now()
    const ripples = ripplesRef.current
    // Throttle: ignore if same origin clicked < 80 ms ago
    if (ripples.some(r => Math.hypot(r.x - x, r.y - y) < 12 && now - r.born < 80)) return
    if (ripples.length >= CONFIG.maxRipples) ripples.splice(0, 1)
    ripples.push({ x, y, born: now })
  }, [])

  // ── Render loop (always running — draws static dots when no ripples) ────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      lastTimeRef.current = timestamp

      const W = canvas.width
      const H = canvas.height
      const now = timestamp

      ctx.clearRect(0, 0, W, H)

      const accent = accentRgbRef.current

      // Cull dead ripples
      ripplesRef.current = ripplesRef.current.filter(r => {
        const age = (now - r.born) / 1000
        return CONFIG.rippleSpeed * age < CONFIG.rippleMaxRadius + CONFIG.ringGap * CONFIG.rippleRings
      })
      const activeRipples = ripplesRef.current

      // ── Static dot grid (no parallax, no hover offset) ────────────────────
      const spacing = CONFIG.dotSpacing
      const cols = Math.ceil(W / spacing) + 1
      const rows = Math.ceil(H / spacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Fixed grid anchored to top-left — never moves
          const bx = c * spacing
          const by = r * spacing

          // ── Ripple displacement (only when there are active ripples) ───────
          let dx = 0, dy = 0
          let rippleInfluence = 0

          for (const rip of activeRipples) {
            const age = (now - rip.born) / 1000
            const dist = Math.hypot(bx - rip.x, by - rip.y)

            for (let ring = 0; ring < CONFIG.rippleRings; ring++) {
              const ringRadius = CONFIG.rippleSpeed * age - ring * CONFIG.ringGap
              if (ringRadius < 0) continue

              const delta    = dist - ringRadius
              const envelope = gaussian(delta, CONFIG.waveWidth)

              const elapsed = age - ring * (CONFIG.ringGap / CONFIG.rippleSpeed)
              if (elapsed < 0) continue
              const fadeIn  = Math.min(elapsed / CONFIG.fadeInDur, 1)
              const fadeOut = Math.max(0, 1 - Math.max(0, elapsed - CONFIG.fadeDuration) / 0.8)
              const amp     = fadeIn * fadeOut * CONFIG.maxDisplace * (1 - ring * 0.28)

              const rdist = Math.max(dist, 0.01)
              dx += ((bx - rip.x) / rdist) * envelope * amp
              dy += ((by - rip.y) / rdist) * envelope * amp
              rippleInfluence = Math.max(rippleInfluence, envelope * amp / CONFIG.maxDisplace)
            }
          }

          const dotX = bx + dx
          const dotY = by + dy

          // ── Compose color & opacity ────────────────────────────────────────
          const totalOpacity = Math.min(CONFIG.dotOpacity + rippleInfluence * 0.4, 0.95)
          const tint = Math.min(rippleInfluence * 1.4, 1)
          const ir = Math.round(255 * (1 - tint) + accent.r * tint)
          const ig = Math.round(255 * (1 - tint) + accent.g * tint)
          const ib = Math.round(255 * (1 - tint) + accent.b * tint)
          const dotR = CONFIG.dotRadius + rippleInfluence * 0.6

          ctx.beginPath()
          ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${ir},${ig},${ib},${totalOpacity.toFixed(3)})`
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Event listeners — only attached when enabled ───────────────────────────
  useEffect(() => {
    if (!enabled) {
      // Clear any lingering ripples when toggled off
      ripplesRef.current = []
      return
    }

    const canvas = canvasRef.current
    const getPos = (clientX, clientY) => {
      if (!canvas) return { x: clientX, y: clientY }
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const onDocClick = e => {
      const { x, y } = getPos(e.clientX, e.clientY)
      spawnRipple(x, y)
    }
    const onDocTouch = e => {
      for (const t of e.changedTouches) {
        const { x, y } = getPos(t.clientX, t.clientY)
        spawnRipple(x, y)
      }
    }

    document.addEventListener('click',      onDocClick)
    document.addEventListener('touchstart', onDocTouch, { passive: true })

    return () => {
      document.removeEventListener('click',      onDocClick)
      document.removeEventListener('touchstart', onDocTouch)
    }
  }, [enabled, spawnRipple])

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
