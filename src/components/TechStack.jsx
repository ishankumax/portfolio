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
        <span className="text-xs font-mono group-hover:text-[color:var(--accent)] transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>{name}</span>
        <span className="text-[10px] font-mono transition-colors duration-300" style={{ color: 'var(--text-muted)' }}></span>
      </div>
      <div className="h-px rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${level}%`, backgroundColor: 'var(--accent)' }}
        />
      </div>
    </div>
  )
}

function TechStack() {
  return (
    <section className="mb-20">
      <h2 className="text-xl md:text-2xl mb-8 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span className="text-xs font-mono not-italic" style={{ color: 'var(--accent)' }}>#</span> tech stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STACK.map((col) => (
          <div
            key={col.category}
            className="border rounded-xl p-5 transition-all duration-300"
            style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{col.icon}</span>
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>{col.category}</span>
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
