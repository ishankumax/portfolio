import React, { useState, useEffect, useRef } from 'react'

const HOUSE_SIZE = 60

export default function VirtualPet() {
  const [inHouse, setInHouse] = useState(false)
  const houseRef = useRef(null)
  const petRef = useRef(null)
  
  // Refs for animation loop state to avoid React re-renders
  const stateRef = useRef({
    x: 32,
    y: 32,
    mouseX: 0,
    mouseY: 0,
    frameCount: 0,
    idleTime: 0,
    idleAnimation: null,
    idleAnimationFrame: 0,
    isDragging: false,
    inHouse: false
  })

  // Sync inHouse state to ref
  useEffect(() => {
    stateRef.current.inHouse = inHouse
  }, [inHouse])

  // Mouse tracking for follow and dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      const s = stateRef.current
      if (s.isDragging) {
        s.x = e.clientX
        s.y = e.clientY
        if (petRef.current) {
          petRef.current.style.left = `${s.x - 16}px`
          petRef.current.style.top = `${s.y - 16}px`
          petRef.current.style.backgroundPosition = `-96px -96px` // A generic 'grabbed' or idle frame
        }
      } else {
        s.mouseX = e.clientX
        s.mouseY = e.clientY
      }
    }

    const handleMouseUp = (e) => {
      const s = stateRef.current
      if (!s.isDragging) return
      s.isDragging = false
      
      // Check drop in house
      if (houseRef.current) {
        const rect = houseRef.current.getBoundingClientRect()
        if (
          e.clientX >= rect.left - 20 &&
          e.clientX <= rect.right + 20 &&
          e.clientY >= rect.top - 20 &&
          e.clientY <= rect.bottom + 20
        ) {
          setInHouse(true)
          return
        }
      }
      // If dropped outside, wake up and follow cursor again
      s.idleTime = 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Neko Animation Loop
  useEffect(() => {
    if (!petRef.current) return
    const el = petRef.current
    const s = stateRef.current
    const speed = 10

    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    }

    const setSprite = (name, frame) => {
      const sprite = spriteSets[name][frame % spriteSets[name].length]
      if (el) {
        el.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`
      }
    }

    const resetIdleAnimation = () => {
      s.idleAnimation = null
      s.idleAnimationFrame = 0
    }

    const idle = () => {
      s.idleTime += 1
      if (s.idleTime > 10 && Math.floor(Math.random() * 200) === 0 && s.idleAnimation === null) {
        let availableIdle = ["sleeping", "scratchSelf"]
        if (s.x < 32) availableIdle.push("scratchWallW")
        if (s.y < 32) availableIdle.push("scratchWallN")
        if (s.x > window.innerWidth - 32) availableIdle.push("scratchWallE")
        if (s.y > window.innerHeight - 32) availableIdle.push("scratchWallS")
        s.idleAnimation = availableIdle[Math.floor(Math.random() * availableIdle.length)]
      }

      switch (s.idleAnimation) {
        case "sleeping":
          if (s.idleAnimationFrame < 8) {
            setSprite("tired", 0)
            break
          }
          setSprite("sleeping", Math.floor(s.idleAnimationFrame / 4))
          if (s.idleAnimationFrame > 192) resetIdleAnimation()
          break
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(s.idleAnimation, s.idleAnimationFrame)
          if (s.idleAnimationFrame > 9) resetIdleAnimation()
          break
        default:
          setSprite("idle", 0)
          return
      }
      s.idleAnimationFrame += 1
    }

    const frame = () => {
      if (s.inHouse || s.isDragging) return
      
      s.frameCount += 1
      const diffX = s.x - s.mouseX
      const diffY = s.y - s.mouseY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      if (distance < speed || distance < 48) {
        idle()
        return
      }

      s.idleAnimation = null
      s.idleAnimationFrame = 0

      if (s.idleTime > 1) {
        setSprite("alert", 0)
        s.idleTime = Math.min(s.idleTime, 7)
        s.idleTime -= 1
        return
      }

      let direction = ""
      direction = diffY / distance > 0.5 ? "N" : ""
      direction += diffY / distance < -0.5 ? "S" : ""
      direction += diffX / distance > 0.5 ? "W" : ""
      direction += diffX / distance < -0.5 ? "E" : ""
      setSprite(direction, s.frameCount)

      s.x -= (diffX / distance) * speed
      s.y -= (diffY / distance) * speed

      s.x = Math.min(Math.max(16, s.x), window.innerWidth - 16)
      s.y = Math.min(Math.max(16, s.y), window.innerHeight - 16)

      el.style.left = `${s.x - 16}px`
      el.style.top = `${s.y - 16}px`
    }

    let lastFrameTimestamp
    let rafId
    const onAnimationFrame = (timestamp) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frame()
      }
      rafId = requestAnimationFrame(onAnimationFrame)
    }
    rafId = requestAnimationFrame(onAnimationFrame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (inHouse) return
    stateRef.current.isDragging = true
  }

  const coaxOut = () => {
    if (!inHouse) return
    setInHouse(false)
    if (houseRef.current) {
      const rect = houseRef.current.getBoundingClientRect()
      stateRef.current.x = rect.left - 20
      stateRef.current.y = rect.bottom - 20
      stateRef.current.idleTime = 0
    }
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
          <div style={{
            width: '40%',
            height: '60%',
            backgroundColor: '#0a0a0a',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }} />

          {inHouse && (
            <div style={{ position: 'absolute', bottom: '2px', fontSize: '20px' }}>
              💤
            </div>
          )}
        </div>
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

      {/* The Neko Pet */}
      {!inHouse && (
        <div 
          ref={petRef}
          className="virtual-pet-element fixed z-50 select-none"
          style={{
            width: '32px',
            height: '32px',
            imageRendering: 'pixelated',
            backgroundImage: "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')",
            cursor: 'grab',
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
        />
      )}
    </>
  )
}
