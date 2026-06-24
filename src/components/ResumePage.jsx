import React, { useState, useEffect } from 'react'
import resumeData from '../data/resumeData.json'
import ConfigurationPanel from './resume/ConfigurationPanel'
import ResumePreview from './resume/ResumePreview'
import PDFExporter from './resume/PDFExporter'
import { filterAndSortByRole } from '../utils/resumeFilter'

export default function ResumePage() {
  const roles = Object.keys(resumeData.summaries)
  const [selectedRole, setSelectedRole] = useState(roles[0])
  
  // Custom Mode State
  const [mode, setMode] = useState('role')
  const [customSelections, setCustomSelections] = useState({
    skills: [],
    projects: [],
    experience: [],
    certs: []
  })

  // Initialize Custom Selections from the selected role on first load
  useEffect(() => {
    if (mode === 'role') {
      const skills = filterAndSortByRole(resumeData.skills, selectedRole).flatMap(g => g.items).map(s => `skill_${s}`)
      const projects = filterAndSortByRole(resumeData.projects, selectedRole).map(p => `proj_${p.name}`)
      
      const experience = []
      resumeData.experience.forEach(e => {
        const matchingBullets = filterAndSortByRole(e.bullets, selectedRole)
        if (matchingBullets.length > 0) {
          experience.push(`exp_${e.company}`)
        }
      })
      
      // Select all certs by default for the role
      const certs = resumeData.certifications.map(c => `cert_${c}`)

      setCustomSelections({
        skills,
        projects,
        experience,
        certs
      })
    }
  }, [selectedRole, mode]) // Syncs when in role mode

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-24 lg:pb-16 px-4 lg:px-8 max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
      {/* Configuration Panel - 32% width on desktop, scrolls */}
      <div className="w-full lg:w-[32%] flex-shrink-0 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            Resume Builder
          </h1>
          <p className="text-sm opacity-70 mb-4" style={{ color: 'var(--text-secondary)' }}>
            Build role-specific resumes in real time.
          </p>
          <div className="hidden lg:block">
            <PDFExporter 
              targetId="resume-pdf-container" 
              filename={`Ishan_Kumar_Resume_${mode === 'role' ? selectedRole.replace(/\s+/g, '_') : 'Custom'}.pdf`} 
            />
          </div>
        </div>

        <ConfigurationPanel 
          roles={roles} 
          selectedRole={selectedRole} 
          onSelectRole={setSelectedRole} 
          mode={mode}
          setMode={setMode}
          resumeData={resumeData}
          customSelections={customSelections}
          setCustomSelections={setCustomSelections}
        />
      </div>

      {/* Main Resume Content - 68% width on desktop, sticky */}
      {/* Hidden on mobile unless drawer is open, visible on tablet/desktop */}
      <div className={`
        fixed inset-0 z-50 bg-black/90 lg:bg-transparent lg:static
        lg:w-[68%] lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] 
        flex flex-col justify-start lg:justify-center items-center overflow-y-auto lg:overflow-visible
        transition-transform duration-250 ease-out
        ${isMobileDrawerOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}>
        {/* Mobile Header for Drawer */}
        <div className="w-full bg-[#111] border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-10 lg:hidden shadow-lg">
          <span className="font-bold text-white">Preview Resume</span>
          <button 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-white"
          >
            ✕
          </button>
        </div>

        <div className="w-full overflow-auto pt-6 pb-24 lg:pb-8 px-2 lg:px-0 rounded-xl no-scrollbar flex justify-center max-w-full">
          <div className="min-w-[800px] flex justify-center bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200 transition-all duration-200" style={{ transform: 'scale(0.85) lg:scale(0.9)', transformOrigin: 'top center' }}>
            <ResumePreview 
              resumeData={resumeData} 
              selectedRole={selectedRole}
              mode={mode}
              customSelections={customSelections}
            />
          </div>
        </div>

        {/* Mobile PDF Exporter inside drawer */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <PDFExporter 
            targetId="resume-pdf-container" 
            filename={`Ishan_Kumar_Resume_${mode === 'role' ? selectedRole.replace(/\s+/g, '_') : 'Custom'}.pdf`} 
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar to open drawer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a]/80 backdrop-blur-md border-t border-gray-800 flex justify-center lg:hidden z-40">
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="w-full max-w-md bg-[var(--accent)] text-black font-bold py-3 rounded-xl shadow-[0_0_15px_var(--accent-faint)] active:scale-95 transition-transform"
        >
          View Resume Preview
        </button>
      </div>
    </div>
  )
}
