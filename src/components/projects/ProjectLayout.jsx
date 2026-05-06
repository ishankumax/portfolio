import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectLayout({ slug, title, description, children }) {
  return (
    <div className="relative z-10 animate-in fade-in max-w-4xl mx-auto w-full pt-10">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-50 hover:opacity-100 transition-opacity" style={{ color: 'var(--text-primary)' }}>
            portfolio / home
          </Link>
          <span className="text-[10px] opacity-50" style={{ color: 'var(--text-secondary)' }}>/</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono" style={{ color: 'var(--text-secondary)' }}>
            {slug}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
          {title}<span className="animate-pulse ml-1" style={{ color: 'var(--accent)' }}>_</span>
        </h1>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl font-mono" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>

      {/* Project Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
