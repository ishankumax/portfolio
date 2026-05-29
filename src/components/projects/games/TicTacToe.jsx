import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../../../ThemeContext'

// Web Audio API Sound Synthesizer
const playSound = (type) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()

    if (type === 'move') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(400, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } else if (type === 'win') {
      const notes = [261.63, 329.63, 392.00, 523.25]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
        gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + i * 0.1)
        osc.stop(ctx.currentTime + i * 0.1 + 0.2)
      })
    } else if (type === 'draw') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } else if (type === 'click') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(350, ctx.currentTime)
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

// Winning combinations
const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

// Pure helper function to check game state
const checkGameState = (tempBoard) => {
  for (let i = 0; i < WINNING_COMBOS.length; i++) {
    const [a, b, c] = WINNING_COMBOS[i]
    if (tempBoard[a] && tempBoard[a] === tempBoard[b] && tempBoard[a] === tempBoard[c]) {
      return { winner: tempBoard[a], line: WINNING_COMBOS[i] }
    }
  }
  if (tempBoard.every(cell => cell !== null)) {
    return { winner: 'draw', line: [] }
  }
  return null
}

// Minimax implementation helper
const minimax = (tempBoard, depth, isMaxing) => {
  const result = checkGameState(tempBoard)
  if (result) {
    if (result.winner === 'O') return 10 - depth
    if (result.winner === 'X') return depth - 10
    if (result.winner === 'draw') return 0
  }

  if (isMaxing) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (tempBoard[i] === null) {
        tempBoard[i] = 'O'
        best = Math.max(best, minimax(tempBoard, depth + 1, false))
        tempBoard[i] = null
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (tempBoard[i] === null) {
        tempBoard[i] = 'X'
        best = Math.min(best, minimax(tempBoard, depth + 1, true))
        tempBoard[i] = null
      }
    }
    return best
  }
}

// Get best AI move helper
const getBestMove = (tempBoard) => {
  let bestVal = -Infinity
  let bestMove = -1

  for (let i = 0; i < 9; i++) {
    if (tempBoard[i] === null) {
      tempBoard[i] = 'O'
      const moveVal = minimax(tempBoard, 0, false)
      tempBoard[i] = null

      if (moveVal > bestVal) {
        bestVal = moveVal
        bestMove = i
      }
    }
  }
  return bestMove
}

export default function TicTacToe() {
  const { accentColor } = useTheme()

  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [vsAI, setVsAI] = useState(true)
  const [muted, setMuted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [winningLine, setWinningLine] = useState([])
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('portfolio-ttt-stats')
    return saved ? JSON.parse(saved) : { playerWins: 0, aiWins: 0, draws: 0 }
  })

  // Save stats on update
  useEffect(() => {
    localStorage.setItem('portfolio-ttt-stats', JSON.stringify(stats))
  }, [stats])

  // Handle Game End
  const handleGameEnd = useCallback((result) => {
    setIsGameOver(true)
    setWinner(result.winner)
    setWinningLine(result.line)

    if (result.winner === 'X') {
      if (!muted) playSound('win')
      setStats(prev => ({ ...prev, playerWins: prev.playerWins + 1 }))
    } else if (result.winner === 'O') {
      if (!muted) playSound('draw')
      setStats(prev => ({ ...prev, aiWins: prev.aiWins + 1 }))
    } else if (result.winner === 'draw') {
      if (!muted) playSound('draw')
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }))
    }
  }, [muted])

  // Make AI Move
  const makeAIMove = useCallback(() => {
    const newBoard = [...board]
    const bestMoveIndex = getBestMove(newBoard)
    
    if (bestMoveIndex !== -1) {
      newBoard[bestMoveIndex] = 'O'
      if (!muted) playSound('move')
      setBoard(newBoard)

      const gameResult = checkGameState(newBoard)
      if (gameResult) {
        handleGameEnd(gameResult)
      } else {
        setIsXNext(true)
      }
    }
  }, [board, muted, handleGameEnd])

  // Effect to trigger AI move
  useEffect(() => {
    if (vsAI && !isXNext && !isGameOver) {
      const timer = setTimeout(() => {
        makeAIMove()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isXNext, vsAI, isGameOver, makeAIMove])

  // Reset Game
  const resetGame = () => {
    if (!muted) playSound('click')
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setIsGameOver(false)
    setWinner(null)
    setWinningLine([])
  }

  // Handle box clicks
  const handleClick = (index) => {
    if (board[index] || isGameOver || (vsAI && !isXNext)) return

    const newBoard = [...board]
    newBoard[index] = 'X'
    
    if (!muted) playSound('move')
    setBoard(newBoard)

    const gameResult = checkGameState(newBoard)
    if (gameResult) {
      handleGameEnd(gameResult)
    } else {
      setIsXNext(false)
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch font-mono">
      {/* Left Column — Game Board */}
      <div className="w-full max-w-[320px] flex flex-col items-center">
        {/* Top Controls/Scoreboard */}
        <div className="w-full flex justify-between items-center mb-6 px-2 text-sm text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            MODE: 
            <button 
              onClick={() => {
                if (!muted) playSound('click')
                setVsAI(!vsAI)
                resetGame()
              }}
              className="font-bold border rounded px-2.5 py-0.5 text-xs hover:text-[color:var(--accent)] transition-colors"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {vsAI ? 'VS COMPUTER' : 'PASS & PLAY'}
            </button>
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

        {/* Grid container */}
        <div className="relative w-full aspect-square max-w-[320px] grid grid-cols-3 gap-3 p-3 rounded-2xl border bg-black/45" style={{ borderColor: 'var(--border-card)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          {board.map((cell, i) => {
            const isWinningCell = winningLine.includes(i)
            
            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                disabled={isGameOver || cell !== null || (vsAI && !isXNext)}
                className="relative aspect-square rounded-xl border flex items-center justify-center transition-all duration-300 font-sans text-3xl font-bold overflow-hidden"
                style={{
                  borderColor: isWinningCell 
                    ? 'var(--accent)' 
                    : cell 
                      ? 'var(--border-subtle)' 
                      : 'rgba(255,255,255,0.05)',
                  backgroundColor: isWinningCell 
                    ? 'var(--accent-faint)' 
                    : 'var(--bg-navbar)',
                  boxShadow: isWinningCell 
                    ? '0 0 15px var(--accent-glow)' 
                    : 'none'
                }}
              >
                {cell === 'X' && (
                  <span 
                    className="animate-in zoom-in-50 duration-200" 
                    style={{ color: accentColor, textShadow: `0 0 12px ${accentColor}80` }}
                  >
                    X
                  </span>
                )}
                {cell === 'O' && (
                  <span 
                    className="animate-in zoom-in-50 duration-200" 
                    style={{ color: '#ec4899', textShadow: '0 0 12px rgba(236,72,153,0.8)' }}
                  >
                    O
                  </span>
                )}
              </button>
            )
          })}

          {/* AI Thinking Indicator overlay */}
          {vsAI && !isXNext && !isGameOver && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] rounded-2xl flex items-center justify-center pointer-events-none">
              <span className="bg-black/80 px-3 py-1.5 rounded-lg border text-[10px] tracking-[0.2em] animate-pulse uppercase" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                AI THINKING...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column — Score Card & Status Info */}
      <div className="w-full lg:w-[220px] flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-6 mt-2 lg:mt-0" style={{ borderColor: 'var(--border-subtle)' }}>
        {/* Game Info Status */}
        <div className="text-center font-bold text-sm tracking-wider min-h-[20px]">
          {!isGameOver ? (
            <span style={{ color: 'var(--text-primary)' }}>
              {isXNext ? (
                <>PLAYER <span style={{ color: accentColor }}>X</span> TURN</>
              ) : (
                <>AI <span style={{ color: '#ec4899' }}>O</span> TURN</>
              )}
            </span>
          ) : (
            <span className="animate-pulse">
              {winner === 'X' && <span className="text-green-500">VICTORY (X WINS)</span>}
              {winner === 'O' && <span className="text-red-500">DEFEAT (AI WINS)</span>}
              {winner === 'draw' && <span className="text-yellow-500">SYSTEM TIE (DRAW)</span>}
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase border-t pt-3" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
          <div>
            PLAYER X
            <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{stats.playerWins}</p>
          </div>
          <div>
            TIES
            <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{stats.draws}</p>
          </div>
          <div>
            {vsAI ? 'AI O' : 'PLAYER O'}
            <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{stats.aiWins}</p>
          </div>
        </div>

        {/* Restart Button */}
        {isGameOver && (
          <button 
            onClick={resetGame}
            className="w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_var(--accent-glow)] hover:scale-105 active:scale-95" 
            style={{ background: 'var(--accent)', color: 'black' }}
          >
            PLAY AGAIN
          </button>
        )}
      </div>
    </div>
  )
}
