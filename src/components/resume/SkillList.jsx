import React from 'react'

export default function SkillList({ skills }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 text-gray-800">
        CORE SKILLS
      </h3>
      <div className="flex flex-col gap-1.5 text-[13px] leading-snug">
        {skills.map((skillGroup, idx) => (
          <div key={idx} className="flex">
            <span className="font-semibold text-gray-800 min-w-[160px]">
              {skillGroup.group}:
            </span>
            <span className="text-gray-700">
              {skillGroup.items.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
