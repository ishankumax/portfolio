import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'

export default function ResumeButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/resume')}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-12 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group"
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)'
      }}
      aria-label="View Resume"
    >
      <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 relative z-10 rounded-full" style={{ backgroundColor: 'var(--bg-card)' }}>
        <FileText size={20} className="transform transition-all duration-500 group-hover:text-[var(--accent)] group-hover:-rotate-180" />
      </div>
      <div 
        className="transform transition-all duration-500 ease-out -translate-x-full opacity-0 max-w-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:max-w-[100px] group-hover:pr-6 whitespace-nowrap text-sm font-semibold tracking-wide relative z-0"
      >
        RESUME
      </div>
    </button>
  )
}
