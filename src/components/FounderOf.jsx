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
      <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-2">
        <span className="text-gray-600">#</span> founder of
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
            <h3 className="font-bold text-2xl font-mono">InTheBox</h3>
            <span className="text-sm text-gray-500 font-mono mt-1 md:mt-0">april 2025 - today</span>
          </div>
          <p className="text-gray-400 font-mono leading-relaxed mb-5">
            Where Packaging Meets Innovation —{' '}
            building Custom, Premium Designs for brands that care about the unboxing moment.
          </p>

          {/* Impact metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {METRICS.map((m) => (
              <div key={m.label} className="border border-gray-800/70 rounded-lg p-3 text-left hover:border-gray-600 transition-colors duration-300">
                <p className="text-white font-bold text-lg font-mono">{m.value}</p>
                <p className="text-gray-600 text-[11px] font-mono mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study toggle */}
      <div className="border border-gray-800/60 rounded-xl overflow-hidden">
        <button
          onClick={() => setCaseOpen(!caseOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-mono text-gray-400 hover:text-white hover:bg-white/[0.02] transition-all duration-300 group"
        >
          <span className="flex items-center gap-2">
            <span className="text-gray-600 group-hover:text-gray-400 transition-colors">{'>'}</span>
            case study — how inthebox works
          </span>
          <span className={`text-gray-600 transition-transform duration-300 ${caseOpen ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>

        {caseOpen && (
          <div className="border-t border-gray-800/60 px-5 py-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {CASE_STUDY.map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-[11px] font-mono text-gray-700 mt-0.5 shrink-0">{item.step}</span>
                <div>
                  <p className="text-white font-bold text-sm font-mono mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.body}</p>
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
