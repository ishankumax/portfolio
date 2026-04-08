import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ============================================================================
// DATA: Short Takes — brief, punchy observations
// ============================================================================
const SHORT_TAKES = [
  {
    id: 'st-1',
    date: 'apr 2025',
    tag: 'startups',
    body: "Everyone told me to get experience before starting a business. I started the business to get experience. Both approaches work — only one of them compounds."
  },
  {
    id: 'st-2',
    date: 'mar 2025',
    tag: 'packaging',
    body: "Packaging isn't a cost centre. It's a marketing channel that most SMBs are paying for and completely ignoring at the same time."
  },
  {
    id: 'st-3',
    date: 'feb 2025',
    tag: 'community',
    body: "After running 3 campus communities, I've learned: the first event gets you members. The second event tells you who actually cares."
  },
  {
    id: 'st-4',
    date: 'jan 2025',
    tag: 'growth',
    body: "Cold outreach has a 95% ignore rate. The 5% that reply are worth more than any warm intro you'll ever get — because they chose you."
  },
  {
    id: 'st-5',
    date: 'dec 2024',
    tag: 'cs',
    body: "The best debugging tool isn't a debugger. It's explaining the problem out loud to someone who doesn't care about code."
  },
  {
    id: 'st-6',
    date: 'nov 2024',
    tag: 'mindset',
    body: "Winning ₹1.25L at TiE U didn't change anything practically. What changed was that I stopped asking myself whether I was allowed to call this a real business."
  },
  {
    id: 'st-7',
    date: 'oct 2024',
    tag: 'marketing',
    body: "Most campus marketing is noise. The campaigns that worked for us were the ones that made people feel like they were missing something — not that they were being sold something."
  },
  {
    id: 'st-8',
    date: 'sep 2024',
    tag: 'cs',
    body: "I spent 3 weeks building a feature nobody asked for. The thing users actually wanted took 2 hours. Ship first, optimise second."
  },
]

// ============================================================================
// DATA: Essays — longer form, some stubs
// ============================================================================
const ESSAYS = [
  {
    id: 'e-1',
    date: 'apr 2025',
    tag: 'entrepreneurship',
    title: 'Why I started InTheBox at 19',
    readTime: '4 min read',
    preview: "It started with a frustrated client call. They'd spent ₹40,000 on packaging that looked like everyone else's. I knew I could fix it — I just didn't know it would become a Pvt. Ltd.",
    body: [
      "The conversation that started InTheBox wasn't about packaging. It was about brand identity, and how a small business owner in Chandigarh was bleeding money on packaging that did nothing for her brand.",
      "I was 19, with a laptop that took 3 minutes to boot and a folder of Canva templates I'd built for ACM events. That was my toolkit. But I had one thing she didn't: I understood that the unboxing moment is the last touchpoint before a customer decides whether to recommend you or forget you.",
      "InTheBox started as a service. I'd source manufacturers, handle the design, and manage delivery. No inventory, no warehouse, just a pipeline. Within 3 months, we had our first 10 clients. By April 2025, we incorporated.",
      "The lesson wasn't about packaging. It was about finding the gap between what businesses pay for and what they actually get. That gap is always a business in disguise."
    ]
  },
  {
    id: 'e-2',
    date: 'mar 2025',
    tag: 'community',
    title: 'What I learned running 3 campus communities',
    readTime: '5 min read',
    preview: " DevLearn. Coding Ninjas. Three communities, three different cultures, one consistent observation: the bottleneck is never resources — it's always activation energy.",
    body: [
      "The first thing everyone gets wrong about campus communities is that they think the hard part is getting people to join. It's not. Students will sign up for anything. The hard part is getting them to show up the second time.",
      "At ACM, we had 200+ members on paper. Actual active contributors: about 30. That 15% number is remarkably consistent across every community I've been part of. The goal isn't to increase members — it's to increase the size of that 15%.",
      "What actually works: make the community feel like a team, not a club. Teams have stakes. Clubs have fees. When someone on a team drops the ball, others feel it. That accountability structure is what makes communities last beyond their founding leadership.",
      "The other thing nobody tells you: the best community events are the ones that make attendees feel like they were invited, not marketed to. The difference is in the copy, the format, and whether people feel like insiders when they walk in."
    ]
  },
  {
    id: 'e-3',
    date: 'feb 2025',
    tag: 'cs',
    title: 'Notes on building before you\'re ready',
    readTime: '3 min read',
    preview: "Every CS undergrad waits until they 'know enough' to build something real. I think that's backwards. You learn the right things faster when something is actually at stake.",
    body: [
      "The portfolio you build in college is usually a todo app, a weather API wrapper, and maybe a half-finished e-commerce site. Nothing wrong with that — but the difference between those projects and real projects isn't the stack. It's the stakes.",
      "When I built the first version of the InTheBox ordering flow, I didn't know Node.js. I learned it because orders were coming in and I needed to manage them. That's a different kind of learning — it sticks, because forgetting would cost you something.",
      "My advice: find a problem someone actually has, then commit to solving it. The git commits will follow. The Stack Overflow dives will follow. The architecture decisions will start to feel real, because they are real."
    ]
  },
]

// ============================================================================
// COMPONENTS
// ============================================================================

const TAG_COLORS = {
  startups: 'text-orange-400/70 border-orange-400/20',
  packaging: 'text-cyan-400/70 border-cyan-400/20',
  community: 'text-purple-400/70 border-purple-400/20',
  growth: 'text-green-400/70 border-green-400/20',
  cs: 'text-blue-400/70 border-blue-400/20',
  mindset: 'text-yellow-400/70 border-yellow-400/20',
  marketing: 'text-pink-400/70 border-pink-400/20',
  entrepreneurship: 'text-orange-400/70 border-orange-400/20',
}

function Tag({ name }) {
  const cls = TAG_COLORS[name] ?? 'text-gray-400/70 border-gray-400/20'
  return (
    <span className={`text-[10px] font-mono border rounded-full px-2 py-0.5 ${cls}`}>
      {name}
    </span>
  )
}

function ShortTakeCard({ item }) {
  return (
    <article className="group border border-gray-800/60 rounded-xl p-5 hover:border-gray-700 hover:bg-white/[0.013] transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <Tag name={item.tag} />
        <span className="text-[10px] text-gray-700 font-mono">{item.date}</span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed font-mono">
        "{item.body}"
      </p>
    </article>
  )
}

function EssayCard({ item }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="border border-gray-800/60 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 hover:bg-white/[0.01] transition-colors duration-300 group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Tag name={item.tag} />
              <span className="text-[10px] text-gray-700 font-mono">{item.date}</span>
              <span className="text-[10px] text-gray-700 font-mono">· {item.readTime}</span>
            </div>
            <h3 className="text-white font-bold text-base font-mono mb-2 group-hover:text-gray-100 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
              {item.preview}
            </p>
          </div>
          <span className={`text-gray-600 shrink-0 mt-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </div>
      </button>

      {/* Body — expandable */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-800/40">
          <div className="pt-5 flex flex-col gap-4">
            {item.body.map((para, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="mt-6 text-[11px] text-gray-600 hover:text-gray-400 font-mono transition-colors"
          >
            ↑ collapse
          </button>
        </div>
      )}
    </article>
  )
}

// ============================================================================
// PAGE: Insights
// ============================================================================
function Insights() {
  const [activeTab, setActiveTab] = useState('takes')

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="w-full relative z-50">
        <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
          <Link
            to="/"
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 w-fit group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>back to home</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pb-24">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">insights</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            things i've noticed, learned, or thought too hard about — from building a startup 
            to running communities to writing code at 2am.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 bg-gray-900/50 border border-gray-800/60 rounded-xl p-1 mb-10 w-fit">
          <button
            onClick={() => setActiveTab('takes')}
            className={`px-5 py-2 rounded-lg text-xs font-mono transition-all duration-250 ${
              activeTab === 'takes'
                ? 'bg-white text-black font-bold'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            short takes
          </button>
          <button
            onClick={() => setActiveTab('essays')}
            className={`px-5 py-2 rounded-lg text-xs font-mono transition-all duration-250 ${
              activeTab === 'essays'
                ? 'bg-white text-black font-bold'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            essays
          </button>
        </div>

        {/* Content */}
        {activeTab === 'takes' && (
          <div className="flex flex-col gap-4">
            <p className="text-[11px] text-gray-700 font-mono mb-2">
              {SHORT_TAKES.length} observations — newest first
            </p>
            {SHORT_TAKES.map(item => (
              <ShortTakeCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === 'essays' && (
          <div className="flex flex-col gap-4">
            <p className="text-[11px] text-gray-700 font-mono mb-2">
              {ESSAYS.length} essays — click to expand
            </p>
            {ESSAYS.map(item => (
              <EssayCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <p className="mt-14 text-xs text-gray-700 text-center">
          writing more — check back soon.
        </p>
      </div>
    </div>
  )
}

export default Insights
