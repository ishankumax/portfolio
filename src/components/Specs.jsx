import React from 'react'

function Specs() {
  return (
    <div className="min-h-screen text-white font-mono">
      <div className="max-w-6xl mx-auto px-6 pt-4 md:pt-0 pb-12 md:pb-20">

        {/* My Profile Photos */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 italic" style={{ color: 'var(--text-muted)' }}>my profile photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/pfp.jpg" alt="Profile Photo 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/profile-pic2.jpg" alt="Profile Photo 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* My Workspace */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 italic" style={{ color: 'var(--text-muted)' }}>my workspace</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/workspace-1.jpg" alt="Workspace 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/workspace-2.jpg" alt="Workspace 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/bag.png" alt="Bag" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* Life in Transit */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 italic" style={{ color: 'var(--text-muted)' }}>life in transit</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/delhi-train.png" alt="Delhi Train" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/jaipur-.png" alt="Jaipur" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
              <img src="/lapinlaptop.jpg" alt="Laptop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 italic" style={{ color: 'var(--text-muted)' }}>baner</h2>
          <div className="border-2 rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border-card)' }}>
            <img src="/banner.jpg" alt="Banner" className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </section>

      </div>
    </div>
  )
}

export default Specs
