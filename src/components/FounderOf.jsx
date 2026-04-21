import React, { useState } from 'react'

const METRICS = [
  { value: '50+', label: 'clients served' },
  { value: '₹1.25L', label: 'won at TiE U' },
  { value: '3+', label: 'media features' },
  { value: '2025', label: 'incorporated' },
]

const CASE_STUDY = [
  {
    step: '01',
    title: 'The Problem',
    body: 'Businesses in tier-2 cities were spending huge on generic packaging that did nothing for their brand — no premium feel, no differentiation, no story.'
  },
  {
    step: '02',
    title: 'The Insight',
    body: 'Packaging is a product touchpoint. The unboxing moment is free marketing if you get it right. Most SMBs had zero access to customised packaging at reasonable MOQs.'
  },
  {
    step: '03',
    title: 'What We Built',
    body: 'InTheBox bridges brands with premium manufacturers, handling design to delivery. Low MOQ, fully custom, and priced for growing businesses — not enterprise budgets.'
  },
  {
    step: '04',
    title: 'Traction',
    body: 'Incorporated Pvt. Ltd. in 2025, featured in Hindustan Times, national winner at TiE U, and currently serving 50+ clients across India.'
  },
]

function FounderOf() {
  const [caseOpen, setCaseOpen] = useState(false)

  return (
    <section className="mb-20">
      <h2 className="text-xl md:text-2xl mb-8 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span className="text-xs font-mono not-italic" style={{ color: 'var(--accent-purple)' }}>#</span> founder of
      </h2>

      {/* Company header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <div className="shrink-0 mx-auto md:mx-0">
          <img
            src="/intheboxpvt_logo.jpg"
            alt="InTheBox Logo"
            className="w-24 h-24 rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-baseline mb-2">
            <h3 className="font-bold text-2xl font-mono" style={{ color: 'var(--text-primary)' }}>InTheBox</h3>
            <span className="text-sm font-mono mt-1 md:mt-0" style={{ color: 'var(--text-muted)' }}>april 2025 - today</span>
          </div>
          <p className="font-mono leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            Where Packaging Meets Innovation —{' '}
            building Custom, Premium Designs for brands that care about the unboxing moment.
          </p>

          {/* Impact metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {METRICS.map((m) => (
              <div key={m.label} className="border rounded-lg p-3 text-left transition-all duration-500 group/metric" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}>
                <p className="font-bold text-lg font-mono group-hover/metric:text-[color:var(--accent-purple)] transition-colors" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
                <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study toggle */}
      <div className="border rounded-xl overflow-hidden group/case transition-colors" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}>
        <button
          onClick={() => setCaseOpen(!caseOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-mono transition-all duration-300 group"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="flex items-center gap-2">
            <span className="transition-colors" style={{ color: 'var(--text-muted)' }}>{'>'}</span>
            case study — how inthebox works
          </span>
          <span className={`transition-transform duration-300 ${caseOpen ? 'rotate-180 text-[color:var(--accent-purple)]' : ''}`} style={{ color: 'var(--text-muted)' }}>
            ↓
          </span>
        </button>

        {caseOpen && (
          <div className="border-t px-5 py-6 grid grid-cols-1 md:grid-cols-2 gap-5" style={{ borderColor: 'var(--border-subtle)' }}>
            {CASE_STUDY.map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-[11px] font-mono mt-0.5 shrink-0" style={{ color: 'var(--text-muted)' }}>{item.step}</span>
                <div>
                  <p className="font-bold text-sm font-mono mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FounderOf
