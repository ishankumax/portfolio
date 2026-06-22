import React, { useState } from 'react'

const FilterGroup = ({ title, items, selectedItems, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-4 border border-gray-800 rounded-lg overflow-hidden bg-black/10">
      <button 
        className="w-full flex justify-between items-center p-3 bg-black/20 hover:bg-black/30 transition-colors text-sm font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ color: 'var(--text-primary)' }}>{title} ({selectedItems.length})</span>
        <span className="text-gray-500">{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && (
        <div className="p-3 flex flex-col gap-2 max-h-64 overflow-y-auto custom-scrollbar">
          {items.map((item, idx) => {
            const isChecked = selectedItems.includes(item.id)
            return (
              <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="mt-1 accent-[var(--accent)]"
                  checked={isChecked}
                  onChange={() => onToggle(item.id)}
                />
                <span className={`text-sm ${isChecked ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {item.label}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function CustomFilters({ resumeData, customSelections, setCustomSelections }) {
  const [searchTerm, setSearchTerm] = useState('')

  // Flatten data for checkboxes
  const allSkills = resumeData.skills.flatMap(g => g.items).map(s => ({ id: `skill_${s}`, label: s }))
  const allProjects = resumeData.projects.map(p => ({ id: `proj_${p.name}`, label: p.name }))
  const allExperience = resumeData.experience.map(e => ({ id: `exp_${e.company}`, label: `${e.role} at ${e.company}` }))
  const allCerts = resumeData.certifications.map(c => ({ id: `cert_${c}`, label: c }))

  const handleToggle = (category, id) => {
    setCustomSelections(prev => {
      const current = prev[category] || []
      const updated = current.includes(id) 
        ? current.filter(i => i !== id)
        : [...current, id]
      return { ...prev, [category]: updated }
    })
  }

  const filterBySearch = (items) => {
    if (!searchTerm) return items
    return items.filter(i => i.label.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-4 relative">
        <input 
          type="text" 
          placeholder="Search Filters..." 
          className="w-full bg-black/20 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
        <FilterGroup 
          title="Skills" 
          items={filterBySearch(allSkills)} 
          selectedItems={customSelections.skills || []} 
          onToggle={(id) => handleToggle('skills', id)} 
        />
        <FilterGroup 
          title="Projects" 
          items={filterBySearch(allProjects)} 
          selectedItems={customSelections.projects || []} 
          onToggle={(id) => handleToggle('projects', id)} 
        />
        <FilterGroup 
          title="Experience" 
          items={filterBySearch(allExperience)} 
          selectedItems={customSelections.experience || []} 
          onToggle={(id) => handleToggle('experience', id)} 
        />
        <FilterGroup 
          title="Certificates" 
          items={filterBySearch(allCerts)} 
          selectedItems={customSelections.certs || []} 
          onToggle={(id) => handleToggle('certs', id)} 
        />
      </div>
    </div>
  )
}
