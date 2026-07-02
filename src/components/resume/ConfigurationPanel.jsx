import React from 'react'
import RoleSidebar from './RoleSidebar'
import CustomFilters from './CustomFilters'

export default function ConfigurationPanel({ 
  roles, 
  selectedRole, 
  onSelectRole,
  mode,
  setMode,
  resumeData,
  customSelections,
  setCustomSelections
}) {
  return (
    <div className="w-full flex flex-col gap-6 h-full max-h-[calc(100vh-200px)]">
      {/* Mode Switcher */}
      <div className="flex bg-black/20 p-1 rounded-lg border border-gray-800 shrink-0">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            mode === 'role' ? 'bg-[var(--accent)] text-black shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setMode('role')}
        >
          ● Role Mode
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            mode === 'custom' ? 'bg-[var(--accent)] text-black shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setMode('custom')}
        >
          ○ Custom Mode
        </button>
      </div>

      {/* Content based on Mode */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {mode === 'role' ? (
          <div className="animate-fade-in overflow-y-auto no-scrollbar pb-8">
            <RoleSidebar 
              roles={roles} 
              selectedRole={selectedRole} 
              onSelectRole={onSelectRole} 
            />
          </div>
        ) : (
          <CustomFilters 
            resumeData={resumeData}
            customSelections={customSelections}
            setCustomSelections={setCustomSelections}
          />
        )}
      </div>
    </div>
  )
}
