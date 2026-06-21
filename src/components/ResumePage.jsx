import React, { useState } from 'react'
import resumeData from '../data/resumeData.json'
import ConfigurationPanel from './resume/ConfigurationPanel'
import ResumePreview from './resume/ResumePreview'
import PDFExporter from './resume/PDFExporter'

export default function ResumePage() {
  const roles = Object.keys(resumeData.summaries)
  const [selectedRole, setSelectedRole] = useState(roles[0])

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-8 max-w-[1500px] mx-auto flex flex-col md:flex-row gap-8">
      {/* Configuration Panel - 32% width on desktop */}
      <div className="w-full md:w-[32%] flex-shrink-0 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            Resume Builder
          </h1>
          <p className="text-sm opacity-70 mb-4" style={{ color: 'var(--text-secondary)' }}>
            Build role-specific resumes in real time.
          </p>
          <PDFExporter 
            targetId="resume-pdf-container" 
            filename={`Ishan_Kumar_Resume_${selectedRole.replace(/\s+/g, '_')}.pdf`} 
          />
        </div>

        <ConfigurationPanel 
          roles={roles} 
          selectedRole={selectedRole} 
          onSelectRole={setSelectedRole} 
        />
      </div>

      {/* Main Resume Content - 68% width on desktop, sticky */}
      <div className="w-full md:w-[68%] relative">
        {/* Sticky Container for the A4 Preview */}
        <div className="md:sticky md:top-28 overflow-x-auto pb-8 rounded-xl no-scrollbar flex justify-center w-full">
          <div className="min-w-[800px] flex justify-center bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200">
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
