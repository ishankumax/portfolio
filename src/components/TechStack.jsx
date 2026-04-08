import React from 'react'

const STACK = [
  {
    category: 'frontend',
    icon: '◈',
    items: [
      { name: 'React' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'JavaScript' },
    ]
  },
  {
    category: 'backend & infra',
    icon: '◇',
    items: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Supabase' },
      { name: 'REST APIs' },
    ]
  },
  {
    category: 'tools & workflows',
    icon: '◉',
    items: [
      { name: 'Git / GitHub' },
      { name: 'Figma' },
      { name: 'VS Code' },
      { name: 'Linux / CLI' },
    ]
  },
]

function SkillBar({ name, level }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors duration-300">{name}</span>
        <span className="text-[10px] font-mono text-gray-700 group-hover:text-gray-500 transition-colors duration-300"></span>
      </div>
      <div className="h-px bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-700"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

function TechStack() {
  return (
    <section className="mb-20">
      <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-2">
        <span className="text-gray-600">#</span> tech stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STACK.map((col) => (
          <div
            key={col.category}
            className="border border-gray-800/60 rounded-xl p-5 hover:border-gray-700 hover:bg-white/[0.01] transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-gray-600 text-sm">{col.icon}</span>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{col.category}</span>
            </div>
            <div className="flex flex-col gap-4">
              {col.items.map((item) => (
                <SkillBar key={item.name} name={item.name} level={item.level} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStack
