import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

/**
 * GitHubActivity Component
 * Displays a high-quality SVG contribution graph for @ishankumax.
 * Uses a reliable SVG embed to avoid CORS and dependency-level fetch errors.
 */
function GitHubActivity() {
  const [isHovered, setIsHovered] = useState(false)
  const username = 'ishankumax'
  
  // High-reliability SVG endpoint that renders the contribution graph
  // We use a custom color (gray/white scale) to match the portfolio aesthetic.
  const chartUrl = `https://ghchart.rshah.org/444444/${username}`

  return (
    <section className="mt-20 mb-16 pt-16 border-t border-gray-900/60 max-w-4xl mx-auto px-1">
      <div className="flex items-center justify-between mb-8 group pl-2">
        <div className="flex items-center gap-3">
          <FaGithub className="text-gray-500 group-hover:text-white transition-colors duration-300" size={20} />
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300">
            Commit Activity
          </h2>
        </div>
        <a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-mono text-gray-600 hover:text-white transition-colors uppercase tracking-widest"
        >
          @{username}
        </a>
      </div>

      <div 
        className="relative bg-[#0a0a0a] border border-gray-900 rounded-2xl p-6 md:p-8 overflow-hidden group hover:border-gray-800 transition-all duration-500 shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle glow effect on hover */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-white/[0.03] blur-[60px] rounded-full pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* SVG Embed — Inverted for Dark Mode & Greyscale theme */}
        <div className="github-chart-container overflow-hidden rounded-lg">
          <div className="flex justify-center p-2 md:p-4 overflow-x-auto no-scrollbar">
            <img 
              src={chartUrl} 
              alt={`${username}'s GitHub contribution chart`}
              className="max-w-full h-auto min-w-[700px] md:min-w-0 invert brightness-150 opacity-80 group-hover:opacity-100 transition-all duration-700 filter grayscale"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<p class="text-gray-600 text-[10px] font-mono p-10 italic">Activity stream currently unavailable.</p>';
              }}
            />
          </div>
        </div>

        {/* Legend / Info */}
        <div className="flex justify-between items-center mt-6 px-1">
          <p className="text-[10px] text-gray-600 font-mono italic opacity-60">
            // public contributions tracked over the last 12 months
          </p>
          <div className="flex items-center gap-1.5 grayscale opacity-40">
            <span className="text-[9px] text-gray-600 font-mono mr-1 lowercase">less</span>
            <div className="w-2.5 h-2.5 bg-gray-900 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-gray-700 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-gray-500 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm" />
            <span className="text-[9px] text-gray-600 font-mono ml-1 lowercase">more</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
