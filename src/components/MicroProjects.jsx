import React from 'react'
import { Link } from 'react-router-dom'
import projectsData from '../data/projects.json'

function MicroProjects() {
  return (
    <section id="projects" className="relative mt-32 md:mt-40">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-4 opacity-50" style={{ color: 'var(--text-primary)' }}>
          portfolio / projects
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          micro projects<span className="animate-pulse" style={{ color: 'var(--accent)' }}>_</span>
        </h2>
        <p className="mt-4 text-sm font-mono max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          a collection of small utilities, tools, and mini-games i've built.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="group relative flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1"
            style={{ 
              borderColor: 'var(--border-card)', 
              backgroundColor: 'var(--bg-card)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px -10px var(--accent-glow)'
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'var(--border-card)'
            }}
          >
            <div>
              <h3 className="font-bold text-lg tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs leading-relaxed font-mono" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: 'var(--accent)' }}>
                Open Project
              </span>
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" style={{ color: 'var(--accent)' }}>
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default MicroProjects
