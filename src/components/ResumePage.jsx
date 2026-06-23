import React, { useState } from 'react'
import resumeData from '../data/resumeData.json'
import RoleSidebar from './resume/RoleSidebar'
import ResumePreview from './resume/ResumePreview'
import PDFExporter from './resume/PDFExporter'

export default function ResumePage() {
  const roles = Object.keys(resumeData.summaries)
  const [selectedRole, setSelectedRole] = useState(roles[0])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <RoleSidebar 
        roles={roles} 
        selectedRole={selectedRole} 
        onSelectRole={setSelectedRole} 
      />

      {/* Main Resume Content */}
      <div className="flex-1 max-w-full overflow-hidden">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
              Resume Builder
            </h1>
            <p className="text-sm opacity-70" style={{ color: 'var(--text-secondary)' }}>
              Tailored for <strong className="text-[var(--accent)] font-semibold">{selectedRole}</strong>
            </p>
          </div>
          
          <PDFExporter 
            targetId="resume-pdf-container" 
            filename={`Ishan_Kumar_Resume_${selectedRole.replace(/\s+/g, '_')}.pdf`} 
          />
        </div>

        {/* Scrollable Container for the A4 Preview */}
        <div className="overflow-x-auto pb-8 rounded-xl no-scrollbar">
          <div className="min-w-[800px] flex justify-center">
            <ResumePreview 
              resumeData={resumeData} 
              selectedRole={selectedRole} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
