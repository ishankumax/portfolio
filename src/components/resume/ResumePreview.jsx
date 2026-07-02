import React from 'react'
import SkillList from './SkillList'
import { filterAndSortByRole } from '../../utils/resumeFilter'

export default function ResumePreview({ resumeData, selectedRole, mode, customSelections }) {
  // 1. Determine Summary
  const summary = resumeData.summaries[selectedRole] || resumeData.summaries['Business Analyst']

  // Helper to check if item is selected in custom mode
  const isSelected = (category, id) => {
    if (mode === 'role') return true; // Handled by filterAndSortByRole later
    return customSelections[category]?.includes(id)
  }

  // 2. Filter/Reorder Experience Bullets
  let experience = []
  if (mode === 'role') {
    experience = resumeData.experience.map(job => ({
      ...job,
      bullets: filterAndSortByRole(job.bullets, selectedRole)
    })).filter(job => job.bullets.length > 0)
  } else {
    experience = resumeData.experience.filter(job => isSelected('experience', `exp_${job.company}`))
  }

  // 3. Filter/Reorder Projects
  let projects = []
  if (mode === 'role') {
    projects = filterAndSortByRole(resumeData.projects, selectedRole).map(p => ({
      ...p,
      bullets: filterAndSortByRole(p.bullets, selectedRole)
    }))
  } else {
    projects = resumeData.projects.filter(p => isSelected('projects', `proj_${p.name}`))
  }

  // 4. Filter/Reorder Skills
  let skills = []
  if (mode === 'role') {
    skills = filterAndSortByRole(resumeData.skills, selectedRole)
  } else {
    // Reconstruct skills object based on selected individual skills
    skills = resumeData.skills.map(group => {
      const activeItems = group.items.filter(item => isSelected('skills', `skill_${item}`))
      return { ...group, items: activeItems }
    }).filter(group => group.items.length > 0)
  }

  // 5. Certifications
  const certifications = mode === 'role' 
    ? resumeData.certifications 
    : resumeData.certifications.filter(c => isSelected('certs', `cert_${c}`))

  return (
    <div 
      id="resume-pdf-container" 
      className="bg-white p-8 sm:p-12 shadow-2xl rounded-xl mx-auto border relative overflow-hidden transition-all duration-200"
      style={{
        width: '100%',
        maxWidth: '210mm', // A4 Width
        minHeight: '297mm', // A4 Height
        borderColor: 'var(--border-card)',
        '--text-primary': '#111827',     // Force dark ink for h1, h2, h3
        '--text-secondary': '#374151',   // Force dark ink for p
        '--text-muted': '#4b5563',       // Force dark ink for muted text
        color: '#111827'                 // Default text color
      }}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-blue-600 uppercase">
          {resumeData.header.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[13px] text-gray-700 font-medium">
          <span>{resumeData.header.location}</span>
          <span className="hidden sm:inline">|</span>
          <span>{resumeData.header.phone}</span>
          <span className="hidden sm:inline">|</span>
          <span>{resumeData.header.email}</span>
          <span className="hidden sm:inline">|</span>
          <span>{resumeData.header.linkedin}</span>
          <span className="hidden sm:inline">|</span>
          <span>{resumeData.header.website}</span>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800 uppercase">
          Professional Summary
        </h2>
        <p className="text-[13.5px] leading-relaxed text-gray-800 text-justify">
          {summary}
        </p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 text-gray-800 uppercase">
          Education
        </h2>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="text-[14px] font-bold text-gray-900">
                {edu.institution} – <span className="font-semibold">{edu.degree}</span>
              </h3>
              <span className="text-[13px] font-medium text-gray-600 whitespace-nowrap ml-4">
                {edu.location}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-[13px] text-gray-700">
              <span className="italic">Relevant Coursework: {edu.coursework}</span>
              <span className="font-semibold whitespace-nowrap ml-4">{edu.duration}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4 text-gray-800 uppercase">
          Professional Experience
        </h2>
        {experience.map((job, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="text-[14px] font-bold text-gray-900">
                {job.role} <span className="font-normal mx-1">–</span> {job.company}
              </h3>
              <span className="text-[13px] font-semibold text-gray-800 whitespace-nowrap ml-4">
                {job.duration}
              </span>
            </div>
            <div className="text-[13px] text-gray-600 italic mb-2">
              {job.type} {job.location && `| ${job.location}`}
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-gray-800 leading-snug">
              {job.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="text-justify">
                  {bullet.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4 text-gray-800 uppercase">
          Projects
        </h2>
        {projects.map((project, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-baseline mb-1.5">
              <h3 className="text-[14px] font-bold text-gray-900">
                {project.name} <span className="font-normal mx-1">|</span> <span className="italic font-normal">{project.tech}</span>
              </h3>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-gray-800 leading-snug">
              {project.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="text-justify">
                  {bullet.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Core Skills */}
      <SkillList skills={skills} />

      {/* Certifications & Achievements */}
      {(certifications && certifications.length > 0) && (
        <section className="mb-4">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 text-gray-800 uppercase">
            Certifications & Achievements
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-gray-800 leading-snug">
            {certifications.map((cert, idx) => (
              <li key={idx} className="text-justify">
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
