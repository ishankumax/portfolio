import React from 'react'

export default function RoleSidebar({ roles, selectedRole, onSelectRole }) {
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (index + 1) % roles.length
      document.getElementById(`role-btn-${next}`).focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = (index - 1 + roles.length) % roles.length
      document.getElementById(`role-btn-${prev}`).focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelectRole(roles[index])
    }
  }

  return (
    <div className="w-full md:w-[220px] md:sticky md:top-24 flex-shrink-0 mb-8 md:mb-0">
      <h2 className="text-xs uppercase tracking-[0.2em] mb-4 opacity-50 font-mono" style={{ color: 'var(--text-primary)' }}>
        Select Role Angle
      </h2>
      <div 
        className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0"
        role="tablist"
        aria-orientation="vertical"
      >
        {roles.map((role, idx) => {
          const isActive = selectedRole === role
          return (
            <button
              key={role}
              id={`role-btn-${idx}`}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectRole(role)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="text-left px-4 py-3 text-sm rounded-lg transition-all whitespace-nowrap md:whitespace-normal font-medium"
              style={{
                backgroundColor: isActive ? 'var(--accent-faint)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
                boxShadow: isActive ? '0 0 10px var(--accent-faint)' : 'none'
              }}
            >
              {role}
            </button>
          )
        })}
      </div>
    </div>
  )
}
