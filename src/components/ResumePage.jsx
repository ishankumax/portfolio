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

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-8 max-w-[1500px] mx-auto flex flex-col md:flex-row gap-8">
      {/* Configuration Panel - 32% width on desktop */}
      <div className="w-full md:w-[32%] flex-shrink-0 flex flex-col gap-6 h-[calc(100vh-140px)] sticky top-28">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            Resume Builder
          </h1>
          <p className="text-sm opacity-70 mb-4" style={{ color: 'var(--text-secondary)' }}>
            Build role-specific resumes in real time.
          </p>
          <PDFExporter 
            targetId="resume-pdf-container" 
            filename={`Ishan_Kumar_Resume_${mode === 'role' ? selectedRole.replace(/\s+/g, '_') : 'Custom'}.pdf`} 
          />
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

      {/* Main Resume Content - 68% width on desktop, scrollable independently */}
      <div className="w-full md:w-[68%] relative">
        <div className="overflow-x-auto pb-8 rounded-xl no-scrollbar flex justify-center w-full">
          <div className="min-w-[800px] flex justify-center bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200 mb-20">
            <ResumePreview 
              resumeData={resumeData} 
              selectedRole={selectedRole}
              mode={mode}
              customSelections={customSelections}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
