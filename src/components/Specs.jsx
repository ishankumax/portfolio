import React from 'react'
import { Link } from 'react-router-dom'

function Specs() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* Back to Home */}
        <Link to="/" className="text-gray-500 hover:text-white transition-colors mb-12 inline-block">
          ← back to home
        </Link>

        {/* My Profile Photos */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-400 italic">my profile photoes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/pfp.jpg" alt="Profile Photo 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/profile-pic2.jpg" alt="Profile Photo 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* My Workspace */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-400 italic">my workspace</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/workspace-1.jpg" alt="Workspace 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/workspace-2.jpg" alt="Workspace 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/bag.png" alt="Bag" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* Life in Transit */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-400 italic">life in transit</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/delhi-train.png" alt="Delhi Train" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/jaipur-.png" alt="Jaipur" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 border-white rounded-lg overflow-hidden">
              <img src="/lapinlaptop.jpg" alt="Laptop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-400 italic">baner</h2>
          <div className="border-2 border-white rounded-lg overflow-hidden">
            <img src="/banner.jpg" alt="Banner" className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </section>

      </div>
    </div>
  )
}

export default Specs
