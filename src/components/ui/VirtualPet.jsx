import React, { useState, useEffect, useRef } from 'react'

const PET_SIZE = 50
const HOUSE_SIZE = 80

// CSS Animations
const styles = `
  @keyframes sheroWalk {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-8px) rotate(-3deg); }
    75% { transform: translateY(-4px) rotate(3deg); }
  }
  @keyframes sheroSleep {
    0%, 100% { transform: scaleY(1) translateY(0); }
    50% { transform: scaleY(0.9) translateY(4px); }
  }
  @keyframes zzz {
    0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
    50% { opacity: 1; transform: translate(10px, -15px) scale(1); }
    100% { opacity: 0; transform: translate(20px, -30px) scale(1.5); }
  }
`

export default function VirtualPet() {
  const [pos, setPos] = useState({ x: 100, y: window.innerHeight - 150 })
  const [target, setTarget] = useState(null)
  const [state, setState] = useState('sit') // sit, stand, walk, drag, sleep
  const [facingRight, setFacingRight] = useState(true)
  const [inHouse, setInHouse] = useState(false)
  
  const houseRef = useRef(null)
  const isDragging = useRef(false)
  const posRef = useRef(pos)
  
  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useEffect(() => {
    setPos({ x: 100, y: window.innerHeight - 150 })
  }, [])

  // Click to set target
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (isDragging.current || inHouse) return
      if (e.target.closest('.virtual-pet-element')) return

      const targetX = e.clientX - PET_SIZE / 2
      const targetY = e.clientY - PET_SIZE / 2

      setTarget({ x: targetX, y: targetY })
      setState('walk')
      if (targetX > posRef.current.x) setFacingRight(true)
      else if (targetX < posRef.current.x) setFacingRight(false)
    }

    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [inHouse])

  // Movement loop
  useEffect(() => {
    if (state !== 'walk' || inHouse || !target) return

    let raf
    const move = () => {
      setPos(prev => {
        const dx = target.x - prev.x
        const dy = target.y - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 5) {
          setState('stand')
          return target
        }

        const speed = 4
        return { 
          x: prev.x + (dx / dist) * speed, 
          y: prev.y + (dy / dist) * speed 
        }
      })
      raf = requestAnimationFrame(move)
    }
    raf = requestAnimationFrame(move)
    return () => cancelAnimationFrame(raf)
  }, [state, target, inHouse])

  // Idle timer to sit -> sleep
  useEffect(() => {
    if (state === 'stand' || state === 'sit') {
      const sitTimer = setTimeout(() => {
        if (state === 'stand') setState('sit')
      }, 3000)
      
      const sleepTimer = setTimeout(() => {
        if (state === 'sit') setState('sleep')
      }, 8000)

      return () => {
        clearTimeout(sitTimer)
        clearTimeout(sleepTimer)
      }
    }
  }, [state])

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return
      setPos({ x: e.clientX - PET_SIZE / 2, y: e.clientY - PET_SIZE / 2 })
    }

    const handleMouseUp = (e) => {
      if (!isDragging.current) return
      isDragging.current = false
      
      if (houseRef.current) {
        const rect = houseRef.current.getBoundingClientRect()
        if (
          e.clientX >= rect.left - 20 &&
          e.clientX <= rect.right + 20 &&
          e.clientY >= rect.top - 20 &&
          e.clientY <= rect.bottom + 20
        ) {
          setInHouse(true)
          setState('sleep')
          return
        }
      }
      setState('stand')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (inHouse) return
    isDragging.current = true
    setState('drag')
  }

  const coaxOut = () => {
    if (!inHouse) return
    setInHouse(false)
    setState('stand')
    if (houseRef.current) {
      const rect = houseRef.current.getBoundingClientRect()
      setPos({ x: rect.left - PET_SIZE - 20, y: rect.bottom - PET_SIZE })
      setTarget(null)
    }
  }

  // Shero SVG Rendering
  const renderShero = () => {
    const isSleeping = state === 'sleep'
    const isWalking = state === 'walk'
    const isDraggingLocal = state === 'drag'

    return (
      <div style={{
        width: '100%', height: '100%',
        position: 'relative',
        transform: `scaleX(${facingRight ? -1 : 1})`,
        transition: 'transform 0.3s ease',
      }}>
        {/* Sleeping Zzzs */}
        {isSleeping && !inHouse && (
          <div style={{ position: 'absolute', top: '-20px', right: '-10px', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
            <span style={{ animation: 'zzz 2s infinite linear', display: 'inline-block' }}>Z</span>
            <span style={{ animation: 'zzz 2s infinite linear 0.6s', display: 'inline-block', position: 'absolute', left: '8px' }}>z</span>
            <span style={{ animation: 'zzz 2s infinite linear 1.2s', display: 'inline-block', position: 'absolute', left: '16px' }}>z</span>
          </div>
        )}

        <svg 
          viewBox="0 0 100 100" 
          style={{
            width: '100%',
            height: '100%',
            filter: isDraggingLocal ? 'drop-shadow(0 15px 15px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
            animation: isWalking ? 'sheroWalk 0.4s infinite linear' : isSleeping ? 'sheroSleep 2s infinite ease-in-out' : 'none',
            transform: isDraggingLocal ? 'translateY(-10px)' : 'none',
            transition: 'transform 0.2s',
            cursor: isDraggingLocal ? 'grabbing' : 'grab'
          }}
        >
          {/* Fluffy Body (Cotton Candy shape) */}
          <path 
            d="M 30 50 C 30 35, 45 30, 50 30 C 65 30, 75 40, 75 50 C 85 50, 85 65, 75 75 C 75 85, 60 85, 50 85 C 35 85, 25 75, 30 65 C 20 60, 20 50, 30 50 Z" 
            fill="#FFFFFF" 
            stroke="#111" 
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Ears */}
          <path d="M 35 45 C 25 40, 15 50, 25 60" fill="#FFFFFF" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          
          {/* Eyes */}
          {isSleeping ? (
            <>
              {/* Closed Eyes */}
              <path d="M 58 45 Q 62 48 66 45" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 72 45 Q 76 48 80 45" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Open Eyes */}
              <circle cx="62" cy="45" r="3" fill="#111" />
              <circle cx="76" cy="45" r="3" fill="#111" />
            </>
          )}

          {/* Nose */}
          <circle cx="70" cy="52" r="2.5" fill="#111" />

          {/* Collar */}
          <path d="M 55 60 Q 65 65 75 60" fill="none" stroke="#4B9CD3" strokeWidth="4" strokeLinecap="round" />

          {/* Legs */}
          {!isSleeping && (
            <>
              <line x1="45" y1="80" x2="45" y2="90" stroke="#111" strokeWidth="3" strokeLinecap="round" />
              <line x1="60" y1="82" x2="60" y2="92" stroke="#111" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>
    )
  }

  return (
    <>
      <style>{styles}</style>
      {/* Dog House */}
      <div 
        ref={houseRef}
        className="virtual-pet-element fixed z-50 flex flex-col items-center justify-end cursor-pointer"
        style={{ 
          bottom: '24px', 
          right: '24px', 
          width: HOUSE_SIZE, 
          height: HOUSE_SIZE + 20,
          transition: 'transform 0.2s ease'
        }}
        onClick={coaxOut}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title={inHouse ? "Click to call Shero out" : "Shero's House"}
      >
        <div style={{
          width: '100%',
          height: '75%',
          backgroundColor: '#e24a4a', // Shin-chan style red roof/house
          border: '3px solid #111',
          borderBottom: 'none',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Door */}
          <div style={{
            width: '45%',
            height: '65%',
            backgroundColor: '#111',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
          }} />

          {/* Shero sleeping inside */}
          {inHouse && (
            <div style={{ position: 'absolute', bottom: '0', width: '50px', height: '50px', transform: 'translateY(10px)' }}>
              <svg viewBox="0 0 100 100">
                <path d="M 30 50 C 30 35, 45 30, 50 30 C 65 30, 75 40, 75 50 C 85 50, 85 65, 75 75 C 75 85, 60 85, 50 85 C 35 85, 25 75, 30 65 C 20 60, 20 50, 30 50 Z" fill="#FFFFFF" />
                <path d="M 58 45 Q 62 48 66 45" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 72 45 Q 76 48 80 45" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
        {/* Roof */}
        <div style={{
          position: 'absolute',
          top: '0',
          width: '120%',
          height: '35px',
          backgroundColor: '#4B9CD3', // Blue roof
          border: '3px solid #111',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
        }} />
      </div>

      {/* The Pet */}
      {!inHouse && (
        <div 
          className="virtual-pet-element fixed z-50 select-none"
          style={{
            left: pos.x,
            top: pos.y,
            width: PET_SIZE,
            height: PET_SIZE,
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
        >
          {renderShero()}
        </div>
      )}
    </>
  )
}
