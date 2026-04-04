import React from 'react'
import { Link } from 'react-router-dom'

function Insights() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* Top Navigation Bar - simplified and robust */}
      <header className="w-full relative z-50">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 w-fit group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>back to home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center -mt-16 md:-mt-32 px-6">
        <p className="text-gray-500/80 text-xl md:text-2xl font-light italic tracking-tight">
          writing insights soon...
        </p>
      </main>
    </div>
  )
}

export default Insights
