import React from 'react'
import { Link } from 'react-router-dom'

function Insights() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 w-full">
        
        {/* Back to Home */}
        <Link to="/" className="text-gray-500 hover:text-white transition-colors mb-12 inline-block">
          ← back to home
        </Link>

      </div>

      {/* Centered Coming Soon */}
      <div className="flex-1 flex items-center justify-center -mt-32">
        <p className="text-gray-500 text-xl md:text-2xl italic">writing insights soon...</p>
      </div>
    </div>
  )
}

export default Insights
