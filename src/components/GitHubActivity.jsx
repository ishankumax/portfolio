import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../ThemeContext'

// ─── Config ───────────────────────────────────────────────────────────────────
const USERNAME    = 'ishankumax'
const YEARS       = [2026]
const CELL_SIZE   = 11   // px, size of each square
const CELL_GAP    = 3    // px, gap between squares
const WEEK_DAYS   = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Purple gradient: 0 = empty, 1 = low, 2 = medium, 3 = high, 4 = max
const LEVEL_COLORS = [
  'var(--gh-level-0)',
  'var(--gh-level-1)',
  'var(--gh-level-2)',
  'var(--gh-level-3)',
  'var(--gh-level-4)',
]

const LEVEL_LABELS = ['No activity', 'Low', 'Medium', 'High', 'Peak']

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getLevel(count) {
  if (count === 0) return 0
  if (count <= 2)  return 1
  if (count <= 6)  return 2
  if (count <= 12) return 3
  return 4
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GitHubActivity() {
  const [selectedYear, setSelectedYear] = useState(YEARS[0])
  const [data, setData]                 = useState([])   // array of { date, count, level }
  const [total, setTotal]               = useState(0)
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(false)
  const [tooltip, setTooltip]           = useState(null) // { x, y, count, date }
  const containerRef                    = useRef(null)
  
  // Theme-aware colors
  const levelColors = LEVEL_COLORS

  // ── Fetch ──
  const fetchData = useCallback(async (year) => {
    setLoading(true)
    setError(false)
    setData([])
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`,
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) throw new Error('bad response')
      const json = await res.json()
      const contributions = json.contributions || []
      const cells = contributions.map(c => ({
        date:  c.date,
        count: c.count,
        level: getLevel(c.count),
      }))
      setData(cells)
      setTotal(cells.reduce((s, c) => s + c.count, 0))
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData(selectedYear) }, [selectedYear, fetchData])

  // ── Build grid (weeks × 7) ──
  const weeks = []
  if (data.length) {
    // Pad start so first day aligns to correct weekday (Sun=0)
    const firstDay = new Date(data[0].date + 'T00:00:00').getDay() // 0=Sun
    const padded   = Array(firstDay).fill(null).concat(data)
    for (let w = 0; w < Math.ceil(padded.length / 7); w++) {
      weeks.push(padded.slice(w * 7, w * 7 + 7))
    }
  }

  // ── Month label positions ──
  const monthLabels = []
  if (weeks.length) {
    let lastMonth = -1
    weeks.forEach((week, wi) => {
      const firstCell = week.find(c => c !== null)
      if (firstCell) {
        const m = new Date(firstCell.date + 'T00:00:00').getMonth()
        if (m !== lastMonth) {
          monthLabels.push({ label: MONTHS[m], weekIndex: wi })
          lastMonth = m
        }
      }
    })
  }

  const STEP = CELL_SIZE + CELL_GAP
  const gridW = weeks.length * STEP
  const gridH = 7 * STEP

  // ── Tooltip ──
  const handleCellEnter = (e, cell) => {
    if (!cell) return
    const rect = e.target.getBoundingClientRect()
    const parentRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    setTooltip({
      x: rect.left - parentRect.left + CELL_SIZE / 2,
      y: rect.top  - parentRect.top,
      count: cell.count,
      date:  cell.date,
    })
  }

  return (
    <section className="mt-20 mb-16 pt-16 border-t border-[color:var(--accent)]/10 w-full overflow-hidden">
      {/* ── Header Row ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 group cursor-default">
          <FaGithub
            size={18}
            className="transition-colors duration-300"
            style={{ color: 'var(--text-muted)' }}
          />
          <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] group-hover:text-[color:var(--text-primary)] transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
            <span className="not-italic" style={{ color: 'var(--accent)' }}>#</span> Commit Activity
          </h2>
          {!loading && !error && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-faint)', border: '1px solid var(--accent-border)' }}>
              {total}
            </span>
          )}
        </div>

        {/* Year toggle */}
        <div className="flex items-center gap-1 border rounded-xl p-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          {YEARS.map(yr => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1 text-[10px] md:text-[11px] font-mono rounded-lg transition-all duration-200 ${
                selectedYear === yr
                  ? 'bg-[color:var(--accent)] text-white font-bold'
                  : ''
              }`}
              style={{ color: selectedYear === yr ? '' : 'var(--text-muted)' }}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Card ── */}
      <div
        ref={containerRef}
        className="relative border rounded-2xl p-4 md:p-8 overflow-hidden transition-all duration-500 group"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
      >
        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: 'var(--accent-faint)' }} />

        {/* ── Loading/Error/Graph ── */}
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent-faint)', borderTopColor: 'var(--accent)' }} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>failed to fetch activity.</p>
            <button onClick={() => fetchData(selectedYear)} className="text-[10px] hover:underline" style={{ color: 'var(--accent)' }}>retry</button>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
            <div className="inline-block min-w-full pb-2">
              <div style={{ width: gridW + 40, position: 'relative' }}>
                {/* Month Labels */}
                <div className="relative mb-3" style={{ marginLeft: 32, height: 16 }}>
                {monthLabels.map(({ label, weekIndex }) => (
                  <span
                    key={label + weekIndex}
                    className="absolute text-[10px] font-mono"
                    style={{ left: weekIndex * STEP, color: 'var(--text-muted)' }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Weekday labels + Grid */}
              <div className="flex gap-0">
                {/* Day labels */}
                <div className="flex flex-col justify-between mr-3 pb-[3px]" style={{ height: gridH, paddingTop: 0 }}>
                  {WEEK_DAYS.map((d, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono leading-none"
                      style={{ height: CELL_SIZE, lineHeight: `${CELL_SIZE}px`, color: 'var(--text-muted)' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Columns of weeks */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((cell, di) => (
                        <div
                          key={di}
                          style={{
                            width:  CELL_SIZE,
                            height: CELL_SIZE,
                            borderRadius: 2,
                            backgroundColor: cell ? levelColors[cell.level] : 'transparent',
                            transition: 'transform 0.1s, box-shadow 0.15s',
                            cursor: cell?.count > 0 ? 'pointer' : 'default',
                          }}
                          onMouseEnter={e => cell && handleCellEnter(e, cell)}
                          onMouseLeave={() => setTooltip(null)}
                          className={cell?.count > 0 ? 'hover:scale-125 hover:shadow-[0_0_6px_rgba(57,211,83,0.7)] hover:z-10 relative' : ''}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* ── Tooltip ── */}
        {tooltip && (
          <div
            className="absolute z-50 pointer-events-none rounded-lg px-3 py-2 text-[11px] font-mono border"
            style={{
              left: tooltip.x,
              top:  tooltip.y - 56,
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--accent-border)',
              color: 'var(--text-primary)',
            }}
          >
            <span className="font-bold" style={{ color: 'var(--accent)' }}>{tooltip.count} commit{tooltip.count !== 1 ? 's' : ''}</span>
            <span className="mx-1" style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>{formatDate(tooltip.date)}</span>
            {/* Arrow */}
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 border-b border-r rotate-45" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--accent-border)' }} />
          </div>
        )}

        {/* ── Legend ── */}
        {!loading && !error && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t px-1" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono mr-1" style={{ color: 'var(--text-muted)' }}>less</span>
              {levelColors.map((color, i) => (
                <div
                  key={i}
                  title={LEVEL_LABELS[i]}
                  className="rounded-[2px] transition-transform hover:scale-110"
                  style={{ width: 10, height: 10, backgroundColor: color, border: '1px solid var(--border-subtle)' }}
                />
              ))}
              <span className="text-[9px] font-mono ml-1" style={{ color: 'var(--text-muted)' }}>more</span>
            </div>
          </div>
        )}
      </div>

      {/* Profile link */}
      <div className="flex justify-end mt-3 pr-1">
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono transition-colors uppercase tracking-widest flex items-center gap-1"
          style={{ color: 'var(--text-muted)' }}
        >
          <FaGithub size={10} />
          @{USERNAME}
        </a>
      </div>
    </section>
  )
}
