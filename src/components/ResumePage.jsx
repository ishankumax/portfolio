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
  const [isFullscreen, setIsFullscreen] = useState(false)

  const downloadFilename = `Ishan_Kumar_Resume_${mode === 'role' ? selectedRole.replace(/\s+/g, '_') : 'Custom'}.pdf`

  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Configuration Panel - fixed width on desktop, scrolls */}
      <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            Resume Builder
          </h1>
          <p className="text-sm opacity-70 mb-4" style={{ color: 'var(--text-secondary)' }}>
            Build role-specific resumes in real time.
          </p>
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

      {/* Main Resume Content - fills remaining space on desktop, sticky */}
      {/* Hidden on mobile unless drawer is open, visible on tablet/desktop */}
      <div className={`
        fixed inset-0 z-50 bg-black/90 lg:bg-transparent lg:static
        flex-1 lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] 
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

        {/* Fullscreen Overlay Mode (Box 1) */}
        {isFullscreen && (
          <div className="fixed inset-0 z-[60] bg-black/95 flex justify-center items-center overflow-y-auto p-4 lg:p-10 custom-scrollbar">
            <button 
              onClick={() => setIsFullscreen(false)}
              className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full text-white shadow-lg hover:bg-gray-700 z-[70] transition-colors"
            >
              ✕
            </button>
            <div className="relative">
              <div className="min-w-[800px] bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200">
                <ResumePreview 
                  resumeData={resumeData} 
                  selectedRole={selectedRole}
                  mode={mode}
                  customSelections={customSelections}
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full overflow-auto pt-6 pb-24 lg:pb-8 px-2 lg:px-0 custom-scrollbar flex justify-center items-start max-w-full relative group">
          <div 
            onClick={() => setIsFullscreen(true)}
            className="flex justify-center transition-all duration-300 cursor-zoom-in group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:border-gray-400 origin-top scale-[0.85] lg:scale-[0.55] -mb-[170px] lg:-mb-[508px] lg:-mx-[180px]" 
            style={{ 
              width: '800px',
              height: '1131px', // 800 * 1.414 (A4 ratio)
            }}
          >
            <div className="w-[800px] bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200">
              <ResumePreview 
                resumeData={resumeData} 
                selectedRole={selectedRole}
                mode={mode}
                customSelections={customSelections}
              />
            </div>
          </div>

          {/* Download Button on Bottom Right of Preview (Box 2) */}
          <div className="absolute bottom-10 lg:bottom-4 right-4 lg:right-4 z-20 transition-transform hover:scale-105 hidden lg:block">
            <PDFExporter 
              targetId="resume-pdf-container" 
              filename={downloadFilename} 
            />
          </div>
        </div>

        {/* Mobile PDF Exporter inside drawer */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <PDFExporter 
            targetId="resume-pdf-container" 
            filename={downloadFilename} 
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
