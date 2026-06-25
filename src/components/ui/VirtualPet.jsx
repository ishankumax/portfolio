import React, { useState, useEffect, useRef } from 'react'

const PET_SIZE = 40
const HOUSE_SIZE = 60

export default function VirtualPet() {
  const [pos, setPos] = useState({ x: 50, y: window.innerHeight - 100 })
  const [target, setTarget] = useState(null)
  const [state, setState] = useState('sit') // sit, stand, walk, drag, sleep
  const [facingRight, setFacingRight] = useState(true)
  const [inHouse, setInHouse] = useState(false)
  
  const houseRef = useRef(null)
  const isDragging = useRef(false)
  const posRef = useRef(pos)
  
  // Sync state pos to ref for event listeners
  useEffect(() => {
    posRef.current = pos
  }, [pos])

  // Initial position to be near the bottom left
  useEffect(() => {
    setPos({ x: 50, y: window.innerHeight - 100 })
  }, [])

  // Handle global click to set target
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Ignore if clicking on pet, house, or if dragging/in-house
      if (isDragging.current || inHouse) return
      if (e.target.closest('.virtual-pet-element')) return

      // Add a small offset so the pet goes near the cursor, not exactly on it
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

        const speed = 4 // pixels per frame
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

  // Idle timer to sit
  useEffect(() => {
    if (state === 'stand') {
      const timer = setTimeout(() => {
        setState('sit')
      }, 4000)
      return () => clearTimeout(timer)
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
      
      // Check if dropped in house
      if (houseRef.current) {
        const rect = houseRef.current.getBoundingClientRect()
        // Adding a bit of padding to make it easier to drop
        const dropX = e.clientX
        const dropY = e.clientY
        if (
          dropX >= rect.left - 20 &&
          dropX <= rect.right + 20 &&
          dropY >= rect.top - 20 &&
          dropY <= rect.bottom + 20
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
    // Place outside the house
    if (houseRef.current) {
      const rect = houseRef.current.getBoundingClientRect()
      setPos({ x: rect.left - PET_SIZE - 20, y: rect.bottom - PET_SIZE })
      setTarget(null)
    }
  }

  // Pet Sprite (simple SVG representation of a dog)
  const renderPet = () => {
    // A simple minimalist pixel/vector dog
    return (
      <div 
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: facingRight ? 'scaleX(-1)' : 'scaleX(1)',
          transition: 'transform 0.2s',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <span 
          style={{ 
            fontSize: '32px', 
            lineHeight: 1, 
            filter: state === 'drag' ? 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' : 'none',
            transform: state === 'drag' ? 'translateY(-10px)' : 'none',
            transition: 'all 0.2s ease',
            cursor: state === 'drag' ? 'grabbing' : 'grab'
          }}
        >
          {state === 'sit' ? '🐕‍🦺' : state === 'sleep' ? '💤' : '🐕'}
        </span>
      </div>
    )
  }

  return (
    <>
      {/* The Dog House */}
      <div 
        ref={houseRef}
        className="virtual-pet-element fixed z-50 flex flex-col items-center justify-end cursor-pointer"
        style={{ 
          bottom: '24px', 
          right: '24px', 
          width: HOUSE_SIZE, 
          height: HOUSE_SIZE,
          transition: 'transform 0.2s ease'
        }}
        onClick={coaxOut}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title={inHouse ? "Click to call out" : "Dog House"}
      >
        <div style={{
          width: '100%',
          height: '80%',
          backgroundColor: '#222',
          border: '2px solid var(--border-card)',
          borderBottom: 'none',
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '30px',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Door */}
          <div style={{
            width: '40%',
            height: '60%',
            backgroundColor: '#0a0a0a',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }} />

          {/* Pet sleeping inside */}
          {inHouse && (
            <div style={{ position: 'absolute', bottom: '2px', fontSize: '20px' }}>
              💤
            </div>
          )}
        </div>
        {/* Roof */}
        <div style={{
          position: 'absolute',
          top: '0',
          width: '120%',
          height: '20px',
          backgroundColor: 'var(--accent)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          opacity: 0.8
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
          {renderPet()}
          {state === 'walk' && (
            <div className="absolute -bottom-2 w-full text-center text-[8px] text-[var(--accent)] font-mono opacity-50">
              *pitter patter*
            </div>
          )}
        </div>
      )}
    </>
  )
}
