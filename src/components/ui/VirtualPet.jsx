import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

const PET_SIZE = 80 // Increased size for 3D model
const HOUSE_SIZE = 80

// CSS Animations for the 2D elements (sleep Zzzs)
const styles = `
  @keyframes zzz {
    0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
    50% { opacity: 1; transform: translate(10px, -15px) scale(1); }
    100% { opacity: 0; transform: translate(20px, -30px) scale(1.5); }
  }
`

// 3D Model Component
function SheroModel({ state, facingRight }) {
  // This will load the GLB file from your public folder.
  // Note: You must place the downloaded shero.glb in the public/ folder!
  const { scene } = useGLTF('/shero.glb')
  const modelRef = useRef()

  useFrame((rootState, delta) => {
    if (!modelRef.current) return

    const isWalking = state === 'walk'
    const isSleeping = state === 'sleep'
    const isDragging = state === 'drag'

    // Walking animation (bobbing)
    if (isWalking) {
      modelRef.current.position.y = Math.abs(Math.sin(rootState.clock.elapsedTime * 15)) * 0.2
      modelRef.current.rotation.z = Math.sin(rootState.clock.elapsedTime * 10) * 0.1
    } 
    // Sleeping animation (squish and breathe)
    else if (isSleeping) {
      const breathe = 0.9 + Math.sin(rootState.clock.elapsedTime * 2) * 0.05
      modelRef.current.position.y = -0.2
      modelRef.current.scale.set(1, breathe, 1)
      modelRef.current.rotation.z = 0
    } 
    // Dragging animation
    else if (isDragging) {
      modelRef.current.position.y = 0.5
      modelRef.current.rotation.z = Math.sin(rootState.clock.elapsedTime * 5) * 0.2
      modelRef.current.scale.set(1, 1, 1)
    }
    // Idle/Sitting
    else {
      modelRef.current.position.y = 0
      modelRef.current.rotation.z = 0
      modelRef.current.scale.set(1, 1, 1)
    }
    
    // Smoothly turn to face the correct direction
    const targetRotY = facingRight ? Math.PI / 2 : -Math.PI / 2
    modelRef.current.rotation.y += (targetRotY - modelRef.current.rotation.y) * 10 * delta
  })

  // We clone the scene so it can be re-mounted if needed, though useGLTF caches it.
  return <primitive ref={modelRef} object={scene} scale={2} position={[0, -0.5, 0]} />
}

export default function VirtualPet() {
  const [pos, setPos] = useState({ x: 100, y: window.innerHeight - 150 })
  const [target, setTarget] = useState(null)
  const [state, setState] = useState('sit') // sit, stand, walk, drag, sleep
  const [facingRight, setFacingRight] = useState(true)
  const [inHouse, setInHouse] = useState(false)
  const [modelError, setModelError] = useState(false)
  
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

          {/* Zzz when sleeping inside */}
          {inHouse && !modelError && (
            <div style={{ position: 'absolute', bottom: '0', width: '50px', height: '50px', transform: 'translateY(10px)' }}>
               <div style={{ position: 'absolute', top: '0', right: '0', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
                <span style={{ animation: 'zzz 2s infinite linear', display: 'inline-block' }}>Z</span>
                <span style={{ animation: 'zzz 2s infinite linear 0.6s', display: 'inline-block', position: 'absolute', left: '8px' }}>z</span>
              </div>
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

      {/* The 3D Pet */}
      {!inHouse && (
        <div 
          className="virtual-pet-element fixed z-50 select-none"
          style={{
            left: pos.x,
            top: pos.y,
            width: PET_SIZE,
            height: PET_SIZE,
            touchAction: 'none',
            cursor: state === 'drag' ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
        >
          {state === 'sleep' && (
            <div style={{ position: 'absolute', top: '-20px', right: '-10px', color: '#fff', fontSize: '14px', fontWeight: 'bold', zIndex: 10 }}>
              <span style={{ animation: 'zzz 2s infinite linear', display: 'inline-block' }}>Z</span>
              <span style={{ animation: 'zzz 2s infinite linear 0.6s', display: 'inline-block', position: 'absolute', left: '8px' }}>z</span>
              <span style={{ animation: 'zzz 2s infinite linear 1.2s', display: 'inline-block', position: 'absolute', left: '16px' }}>z</span>
            </div>
          )}
          
          {modelError ? (
            <div className="flex items-center justify-center w-full h-full text-xs text-red-500 bg-red-500/10 rounded-full border border-red-500/30 p-2 text-center shadow-lg backdrop-blur">
              Missing shero.glb in /public
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', filter: state === 'drag' ? 'drop-shadow(0 15px 15px rgba(0,0,0,0.5))' : 'none' }}>
              <Canvas camera={{ position: [0, 1, 5], fov: 40 }} gl={{ alpha: true }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <Suspense fallback={null}>
                  <SheroModel state={state} facingRight={facingRight} />
                </Suspense>
              </Canvas>
            </div>
          )}
        </div>
      )}
    </>
  )
}
