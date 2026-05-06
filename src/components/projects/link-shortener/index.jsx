import React from 'react';
import ProjectLayout from '../ProjectLayout';
import projectsData from '../../../data/projects.json';

export default function LinkShortener() {
  const project = projectsData.find(p => p.slug === 'link-shortener');

  return (
    <ProjectLayout slug={project.slug} title={project.title} description={project.description}>
      <div 
        className="w-full min-h-[40vh] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center"
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}
      >
        <div className="w-12 h-12 rounded-xl mb-6 border flex items-center justify-center animate-pulse" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'var(--bg-navbar)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2 font-mono" style={{ color: 'var(--text-primary)' }}>System Initializing...</h3>
        <p className="text-sm font-mono max-w-md" style={{ color: 'var(--text-muted)' }}>
          The interactive component for <strong>{project.title}</strong> is currently being scaffolded. Check back later.
        </p>
      </div>
    </ProjectLayout>
  );
}
