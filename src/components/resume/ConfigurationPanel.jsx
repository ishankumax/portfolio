import React, { useState } from 'react'
import RoleSidebar from './RoleSidebar'

export default function ConfigurationPanel({ roles, selectedRole, onSelectRole }) {
  const [mode, setMode] = useState('role') // 'role' or 'custom'

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mode Switcher */}
      <div className="flex bg-black/20 p-1 rounded-lg border border-gray-800">
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
      <div className="mt-2">
        {mode === 'role' ? (
          <div className="animate-fade-in">
            <RoleSidebar 
              roles={roles} 
              selectedRole={selectedRole} 
              onSelectRole={onSelectRole} 
            />
          </div>
        ) : (
          <div className="animate-fade-in p-4 border border-dashed border-gray-700 rounded-lg text-center text-gray-500">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Custom Mode</p>
            <p className="text-sm">Filter engine coming in Phase 3.</p>
          </div>
        )}
      </div>
    </div>
  )
}
