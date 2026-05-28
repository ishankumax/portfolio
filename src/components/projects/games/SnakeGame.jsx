import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../../../ThemeContext'

// Constants
const GRID_SIZE = 20
const CELL_COUNT = 20
const DIFFICULTY_SPEEDS = {
  easy: 140,
  medium: 95,
  hard: 65
}

// Web Audio API Sound Synthesizer
const playSound = (type) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    
    if (type === 'eat') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } else if (type === 'crash') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.4)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.4)
    } else if (type === 'click') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(300, ctx.currentTime)
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    }
  } catch (e) {
    console.warn('AudioContext failed:', e)
  }
}

export default function SnakeGame() {
  const { accentColor } = useTheme()
  
  // Game states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState('medium')
  
  // Audio state with ref
  const [muted, setMutedState] = useState(false)
  const mutedRef = useRef(false)
  const setMuted = useCallback((val) => {
    mutedRef.current = val
    setMutedState(val)
  }, [])

  // High score state with ref
  const [highScore, setHighScoreState] = useState(() => {
    return parseInt(localStorage.getItem('portfolio-snake-high') || '0', 10)
  })
  const highScoreRef = useRef(highScore)
  const setHighScore = useCallback((val) => {
    highScoreRef.current = val
    setHighScoreState(val)
    localStorage.setItem('portfolio-snake-high', String(val))
  }, [])

  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)
  
  // Mutable game variables to avoid state-lag in loop
  const snakeRef = useRef([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }])
  const dirRef = useRef({ x: 0, y: -1 })
  const lastDirRef = useRef({ x: 0, y: -1 })
  const foodRef = useRef({ x: 5, y: 5 })
  const isSuperFoodRef = useRef(false)
  const particlesRef = useRef([])

  // Create explosion particles when food is eaten
  const createExplosion = useCallback((x, y, color) => {
    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 2
      particlesRef.current.push({
        x: (x + 0.5) * GRID_SIZE,
        y: (y + 0.5) * GRID_SIZE,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        life: 1.0,
        decay: Math.random() * 0.05 + 0.04,
        color: color
      })
    }
  }, [])

  // Generate food position
  const generateFood = useCallback(() => {
    let newFood
    let collision = true

    while (collision) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT)
      }
      collision = snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    }

    foodRef.current = newFood
    isSuperFoodRef.current = Math.random() < 0.2
  }, [])

  // Game over handler
  const triggerGameOver = useCallback(() => {
    if (!mutedRef.current) playSound('crash')
    setIsGameOver(true)
    setIsPlaying(false)
  }, [])

  // Update Game Physics
  const update = useCallback(() => {
    const snake = [...snakeRef.current]
    const dir = dirRef.current
    lastDirRef.current = dir

    const head = {
      x: snake[0].x + dir.x,
      y: snake[0].y + dir.y
    }

    if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
      triggerGameOver()
      return
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      triggerGameOver()
      return
    }

    snake.unshift(head)

    const food = foodRef.current
    if (head.x === food.x && head.y === food.y) {
      const points = isSuperFoodRef.current ? 30 : 10
      setScore(s => {
        const nextScore = s + points
        if (nextScore > highScoreRef.current) {
          setHighScore(nextScore)
        }
        return nextScore
      })

      if (!mutedRef.current) playSound('eat')
      
      const foodColor = isSuperFoodRef.current ? '#e9ff1c' : accentColor
      createExplosion(food.x, food.y, foodColor)
      generateFood()
    } else {
      snake.pop()
    }

    snakeRef.current = snake

    particlesRef.current = particlesRef.current
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - p.decay
      }))
      .filter(p => p.life > 0)
  }, [accentColor, createExplosion, generateFood, triggerGameOver, setHighScore])

  // Canvas drawing routine
  const draw = useCallback((ctx) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    
    ctx.fillStyle = '#0a0a0c'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#18181f'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= CELL_COUNT; i++) {
      ctx.beginPath()
      ctx.moveTo(i * GRID_SIZE, 0)
      ctx.lineTo(i * GRID_SIZE, height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * GRID_SIZE)
      ctx.lineTo(width, i * GRID_SIZE)
      ctx.stroke()
    }

    particlesRef.current.forEach(p => {
      ctx.save()
      ctx.globalAlpha = p.life
      ctx.shadowBlur = 10
      ctx.shadowColor = p.color
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    const food = foodRef.current
    const isSuper = isSuperFoodRef.current
    const foodColor = isSuper ? '#e9ff1c' : accentColor

    ctx.save()
    ctx.shadowBlur = 15
    ctx.shadowColor = foodColor
    ctx.fillStyle = foodColor
    ctx.beginPath()
    
    if (isSuper) {
      const cx = (food.x + 0.5) * GRID_SIZE
      const cy = (food.y + 0.5) * GRID_SIZE
      ctx.moveTo(cx, cy - GRID_SIZE / 2 + 2)
      ctx.lineTo(cx + GRID_SIZE / 2 - 2, cy)
      ctx.lineTo(cx, cy + GRID_SIZE / 2 - 2)
      ctx.lineTo(cx - GRID_SIZE / 2 + 2, cy)
      ctx.closePath()
      ctx.fill()
    } else {
      const pulseRadius = (GRID_SIZE / 2 - 2) + Math.sin(Date.now() / 100) * 1.5
      ctx.arc((food.x + 0.5) * GRID_SIZE, (food.y + 0.5) * GRID_SIZE, Math.max(2, pulseRadius), 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

    const snake = snakeRef.current
    snake.forEach((segment, index) => {
      const isHead = index === 0
      ctx.save()

      if (isHead) {
        ctx.shadowBlur = 18
        ctx.shadowColor = accentColor
        ctx.fillStyle = accentColor
      } else {
        ctx.fillStyle = accentColor
        ctx.globalAlpha = Math.max(0.3, 1 - index / snake.length)
      }

      const margin = 1.5
      const size = GRID_SIZE - margin * 2
      const x = segment.x * GRID_SIZE + margin
      const y = segment.y * GRID_SIZE + margin
      const radius = isHead ? 6 : 4

      ctx.beginPath()
      ctx.roundRect(x, y, size, size, radius)
      ctx.fill()

      if (isHead) {
        ctx.fillStyle = '#000000'
        const eyeSize = 2.5
        const eyeOffset = 5
        const dir = dirRef.current

        ctx.beginPath()
        if (dir.x !== 0) {
          ctx.arc(x + (dir.x > 0 ? size - eyeOffset : eyeOffset), y + eyeOffset, eyeSize, 0, Math.PI * 2)
          ctx.arc(x + (dir.x > 0 ? size - eyeOffset : eyeOffset), y + size - eyeOffset, eyeSize, 0, Math.PI * 2)
        } else {
          ctx.arc(x + eyeOffset, y + (dir.y > 0 ? size - eyeOffset : eyeOffset), eyeSize, 0, Math.PI * 2)
          ctx.arc(x + size - eyeOffset, y + (dir.y > 0 ? size - eyeOffset : eyeOffset), eyeSize, 0, Math.PI * 2)
        }
        ctx.fill()
      }

      ctx.restore()
    })
  }, [accentColor])

  // Reset Game
  const resetGame = useCallback(() => {
    if (!mutedRef.current) playSound('click')
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
    ]
    dirRef.current = { x: 0, y: -1 }
    lastDirRef.current = { x: 0, y: -1 }
    particlesRef.current = []
    setScore(0)
    generateFood()
    setIsGameOver(false)
    setIsPaused(false)
    setIsPlaying(true)
  }, [generateFood])

  // Toggle pause
  const togglePause = useCallback(() => {
    if (!mutedRef.current) playSound('click')
    setIsPaused(p => !p)
  }, [])

  // Effect to handle canvas sizing & rendering static/active states
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    draw(ctx)
  }, [accentColor, draw])

  // Game Loop trigger
  useEffect(() => {
    if (isPlaying && !isPaused && !isGameOver) {
      const interval = DIFFICULTY_SPEEDS[difficulty]
      gameLoopRef.current = setInterval(() => {
        update()
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) draw(ctx)
      }, interval)
    } else {
      clearInterval(gameLoopRef.current)
    }

    return () => clearInterval(gameLoopRef.current)
  }, [isPlaying, isPaused, isGameOver, difficulty, update, draw])

  // Key event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isPaused || isGameOver) return

      const key = e.key.toLowerCase()
      const lastDir = lastDirRef.current

      let nextDir = null

      if ((key === 'arrowup' || key === 'w') && lastDir.y === 0) {
        nextDir = { x: 0, y: -1 }
      } else if ((key === 'arrowdown' || key === 's') && lastDir.y === 0) {
        nextDir = { x: 0, y: 1 }
      } else if ((key === 'arrowleft' || key === 'a') && lastDir.x === 0) {
        nextDir = { x: -1, y: 0 }
      } else if ((key === 'arrowright' || key === 'd') && lastDir.x === 0) {
        nextDir = { x: 1, y: 0 }
      }

      if (nextDir) {
        e.preventDefault()
        dirRef.current = nextDir
        if (!mutedRef.current) playSound('click')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isPaused, isGameOver])

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto font-mono">
      {/* Panel Top Status */}
      <div className="w-full flex justify-between items-center mb-4 px-2 text-sm text-[var(--text-secondary)]">
        <div>
          SCORE: <span className="font-bold text-[color:var(--accent)] font-mono">{score}</span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            HI-SCORE: <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{highScore}</span>
          </div>
          <button 
            onClick={() => setMuted(!muted)} 
            className="hover:text-[color:var(--accent)] transition-colors"
            title={muted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {muted ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V3.75z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Screen container */}
      <div className="relative border rounded-2xl overflow-hidden aspect-square w-full max-w-[400px] md:max-w-[400px] mb-6" style={{ borderColor: 'var(--border-card)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_COUNT}
          height={GRID_SIZE * CELL_COUNT}
          className="w-full h-full block"
        />

        {/* Overlay screens */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h4 className="text-xl font-bold tracking-widest text-[color:var(--accent)] mb-3 animate-pulse">NEON SNAKE</h4>
            <p className="text-xs max-w-[280px] leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Guide the glowing snake using keyboard <span className="text-[color:var(--accent)] font-bold">W-A-S-D</span> or <span className="text-[color:var(--accent)] font-bold">Arrow Keys</span>.
            </p>
            <button 
              onClick={resetGame}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_var(--accent-glow)] hover:scale-105 active:scale-95" 
              style={{ background: 'var(--accent)', color: 'black' }}
            >
              LAUNCH GAME
            </button>
          </div>
        )}

        {isPaused && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <h4 className="text-2xl font-bold tracking-widest text-white mb-4">PAUSED</h4>
            <button 
              onClick={togglePause}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105" 
              style={{ background: 'white', color: 'black' }}
            >
              RESUME
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
            <h4 className="text-2xl font-bold tracking-widest text-red-500 mb-2">SYSTEM CRASH</h4>
            <p className="text-xs uppercase tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>
              Final Score: <span className="text-[color:var(--accent)] font-bold">{score}</span>
            </p>
            <button 
              onClick={resetGame}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
              style={{ background: '#ef4444', color: 'white' }}
            >
              RESTART SYSTEM
            </button>
          </div>
        )}
      </div>

      {/* Control Buttons & difficulty */}
      <div className="w-full flex flex-col gap-4 border rounded-xl p-4" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
        {/* Difficulty Controls */}
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: 'var(--text-muted)' }}>SPEED MULTIPLIER:</span>
          <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
            {['easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => {
                  if (!mutedRef.current) playSound('click')
                  setDifficulty(d)
                }}
                disabled={isPlaying && !isPaused}
                className={`px-3 py-1.5 font-bold uppercase transition-all duration-300 ${
                  difficulty === d 
                    ? 'text-black' 
                    : 'hover:text-[color:var(--accent)]'
                }`}
                style={{ 
                  backgroundColor: difficulty === d ? accentColor : 'transparent',
                  color: difficulty === d ? 'black' : 'var(--text-secondary)',
                  opacity: isPlaying && !isPaused ? 0.4 : 1
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        {isPlaying && (
          <div className="flex gap-2">
            <button 
              onClick={togglePause}
              className="flex-1 py-2 rounded-lg text-xs font-bold border transition-colors hover:bg-white/5"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
            >
              {isPaused ? 'RESUME' : 'PAUSE'}
            </button>
            <button 
              onClick={triggerGameOver}
              className="py-2 px-4 rounded-lg text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
            >
              ABORT
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
