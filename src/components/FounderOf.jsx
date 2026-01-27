import React from 'react'

function FounderOf() {
  return (
    <section className="mb-20">
      <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-2">
        <span className="text-gray-600">#</span> founder of
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Logo Placeholder */}
        <div className="shrink-0 w-24 h-24 border-2 border-white rounded-lg mx-auto md:mx-0"></div>
        
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-baseline mb-2">
            <h3 className="font-bold text-2xl font-mono">InTheBox</h3>
            <span className="text-sm text-gray-500 font-mono mt-1 md:mt-0">april 2025 - today</span>
          </div>
          <p className="text-gray-400 font-mono leading-relaxed">
            Where Packaging Meets Innovation <br className="hidden md:block" />
            building Custom, Premium Designs
          </p>
        </div>
      </div>
    </section>
  )
}

export default FounderOf
