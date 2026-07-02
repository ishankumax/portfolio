import React, { useState, useRef, useEffect } from 'react'
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram } from 'react-icons/fa6'
import SOCIAL_STATS from '../../data/socialStats.json'

// ─── Mini contribution heatmap (decorative grid) ────────────────────────────
function ContribGrid({ contributions }) {
  const cols = 18
  const rows = 7

  // If we have real contribution data, build a flattened array of day totals
  // Otherwise fall back to a deterministic decorative pattern
  const realDays = contributions?.slice(-cols * rows) ?? []

  const maxCount = realDays.length
    ? Math.max(...realDays.map(d => d.count || 0), 1)
    : 1

  const level = (c, r) => {
    const idx = c * rows + r
    if (realDays[idx]) {
      const ratio = realDays[idx].count / maxCount
      if (ratio === 0) return 0
      if (ratio < 0.25) return 1
      if (ratio < 0.5) return 2
      if (ratio < 0.75) return 3
      return 4
    }
    // Decorative fallback
    const levels = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4]
    const n = Math.abs(Math.sin(c * 7 + r * 13) * 1000)
    return levels[Math.floor(n % levels.length)]
  }

  const colors = [
    'rgba(57,255,20,0.06)',
    'rgba(57,255,20,0.20)',
    'rgba(57,255,20,0.40)',
    'rgba(57,255,20,0.65)',
    'rgba(57,255,20,0.90)',
  ]

  return (
    <div className="flex gap-[2px] mb-3 overflow-hidden">
      {Array.from({ length: cols }).map((_, c) => (
        <div key={c} className="flex flex-col gap-[2px]">
          {Array.from({ length: rows }).map((_, r) => (
            <div
              key={r}
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                backgroundColor: colors[level(c, r)],
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── GitHub card ─────────────────────────────────────────────────────────────
function GitHubCard({ data, loading }) {
  return (
    <div>
      <ContribGrid contributions={data?.contributions} />

      <div className="flex items-center gap-3 mb-2.5">
        {loading && !data ? (
          <div className="w-10 h-10 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
        ) : (
          <img
            src="/profile.jpeg"
            alt={data?.name || 'Ishan Kumar'}
            className="w-10 h-10 rounded-full border object-cover"
            style={{ borderColor: 'rgba(57,255,20,0.25)' }}
          />
        )}
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#fff' }}>
            {loading && !data ? <span className="animate-pulse">Loading…</span> : (data?.name || 'Ishan Kumar')}
          </p>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>
            @{data?.username || 'ishankumax'}
          </p>
        </div>
        <FaGithub size={16} style={{ color: '#fff', opacity: 0.5, marginLeft: 'auto' }} />
      </div>

      {data?.bio && (
        <p className="text-[11px] mb-2.5 leading-relaxed" style={{ color: '#9ca3af' }}>
          {data.bio.length > 70 ? data.bio.slice(0, 70) + '…' : data.bio}
        </p>
      )}

      {data?.location && (
        <p className="text-[10px] mb-2.5 flex items-center gap-1" style={{ color: '#6b7280' }}>
          📍 {data.location}
        </p>
      )}

      <div
        className="grid grid-cols-3 gap-2 border-t pt-2.5"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Repos', value: data?.repos },
          { label: 'Followers', value: data?.followers },
          { label: 'Contribs', value: data?.contributions_total },
        ].map(s => (
          <div key={s.label} className="flex flex-col">
            <span className="text-sm font-bold leading-none" style={{ color: '#39ff14' }}>
              {loading && s.value == null ? (
                <span className="animate-pulse text-xs" style={{ color: '#4b5563' }}>…</span>
              ) : (
                s.value ?? '—'
              )}
            </span>
            <span className="text-[9px] mt-0.5 uppercase tracking-wide" style={{ color: '#6b7280' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── LinkedIn card ───────────────────────────────────────────────────────────
function LinkedInCard() {
  const s = SOCIAL_STATS.linkedin
  return (
    <div>
      <div className="flex items-center gap-3 mb-2.5">
        <img
          src="/profile.jpeg"
          alt="Ishan Kumar"
          className="w-10 h-10 rounded-full border object-cover object-top"
          style={{ borderColor: 'rgba(10,102,194,0.4)' }}
        />
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#fff' }}>Ishan Kumar</p>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>@ishankumax</p>
        </div>
        <FaLinkedin size={16} style={{ color: '#0a66c2', marginLeft: 'auto' }} />
      </div>
      <p className="text-[11px] mb-2.5 leading-relaxed" style={{ color: '#9ca3af' }}>{s.bio}</p>
      <div
        className="grid grid-cols-2 gap-2 border-t pt-2.5"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Connections', value: s.connections },
          { label: 'Posts', value: s.posts },
        ].map(stat => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-sm font-bold leading-none" style={{ color: '#fff' }}>{stat.value}</span>
            <span className="text-[9px] mt-0.5 uppercase tracking-wide" style={{ color: '#6b7280' }}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Twitter / X card ────────────────────────────────────────────────────────
function TwitterCard() {
  const s = SOCIAL_STATS.twitter
  return (
    <div>
      <div className="flex items-center gap-3 mb-2.5">
        <img
          src="/profile.jpeg"
          alt="Ishan Kumar"
          className="w-10 h-10 rounded-full border object-cover object-top"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
        />
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#fff' }}>Ishan Kumar</p>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>@ishankumax</p>
        </div>
        <FaXTwitter size={16} style={{ color: '#fff', opacity: 0.7, marginLeft: 'auto' }} />
      </div>
      <p className="text-[11px] mb-2.5 leading-relaxed" style={{ color: '#9ca3af' }}>{s.bio}</p>
      <div
        className="grid grid-cols-3 gap-2 border-t pt-2.5"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Followers', value: s.followers },
          { label: 'Following', value: s.following },
          { label: 'Posts', value: s.posts },
        ].map(stat => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-sm font-bold leading-none" style={{ color: '#fff' }}>{stat.value}</span>
            <span className="text-[9px] mt-0.5 uppercase tracking-wide" style={{ color: '#6b7280' }}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Instagram card ──────────────────────────────────────────────────────────
function InstagramCard() {
  const s = SOCIAL_STATS.instagram
  return (
    <div>
      <div className="flex items-center gap-3 mb-2.5">
        <img
          src="/profile.jpeg"
          alt="Ishan Kumar"
          className="w-10 h-10 rounded-full border object-cover object-top"
          style={{ borderColor: 'rgba(225,48,108,0.4)' }}
        />
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#fff' }}>ishankumax</p>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>@ishankumax</p>
        </div>
        <FaInstagram size={16} style={{ color: '#e1306c', marginLeft: 'auto' }} />
      </div>
      <p className="text-[11px] mb-2.5 leading-relaxed whitespace-pre-line" style={{ color: '#9ca3af' }}>{s.bio}</p>
      <div
        className="grid grid-cols-2 gap-2 border-t pt-2.5"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Followers', value: s.followers },
          { label: 'Posts', value: s.posts },
        ].map(stat => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-sm font-bold leading-none" style={{ color: '#fff' }}>{stat.value}</span>
            <span className="text-[9px] mt-0.5 uppercase tracking-wide" style={{ color: '#6b7280' }}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main hover wrapper ───────────────────────────────────────────────────────
export default function SocialHoverCard({ platform, href, children }) {
  const [visible, setVisible] = useState(false)
  const [ghData, setGhData] = useState(null)
  const [ghLoading, setGhLoading] = useState(false)
  const hideTimer = useRef(null)

  const show = () => {
    clearTimeout(hideTimer.current)
    setVisible(true)

    if (platform === 'github' && !ghData && !ghLoading) {
      setGhLoading(true)

      // Fetch profile + contribution totals in parallel
      Promise.all([
        fetch('https://api.github.com/users/ishankumax').then(r => r.json()),
        fetch('https://github-contributions-api.jogruber.de/v4/ishankumax?y=last')
          .then(r => r.json())
          .catch(() => null),
      ])
        .then(([profile, contribs]) => {
          // API returns total as { "lastYear": N } or { "2026": N }
          const contribTotal = contribs?.total
            ? (contribs.total.lastYear ?? Object.values(contribs.total)[0] ?? null)
            : null
          setGhData({
            name: profile.name || 'Ishan Kumar',
            username: profile.login,
            avatar: profile.avatar_url,
            bio: profile.bio,
            location: profile.location,
            repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            contributions_total: contribTotal,
            contributions: contribs?.contributions ?? [],
          })
        })
        .catch((err) => { console.error('[SocialHoverCard] GitHub fetch failed:', err) })
        .finally(() => setGhLoading(false))
    }
  }

  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 150)
  }

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const renderCard = () => {
    if (platform === 'github') return <GitHubCard data={ghData} loading={ghLoading} />
    if (platform === 'linkedin') return <LinkedInCard />
    if (platform === 'twitter' || platform === 'x.com') return <TwitterCard />
    if (platform === 'instagram') return <InstagramCard />
    return null
  }

  const card = renderCard()
  if (!card) return <>{children}</>

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Floating preview card */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 14px)',
          left: '50%',
          transform: visible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(8px)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          zIndex: 9999,
          width: '240px',
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {/* Caret */}
        <div
          style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #161616',
          }}
        />
        {/* Card body */}
        <div
          style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            padding: '14px',
            boxShadow:
              '0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {card}
        </div>
      </div>

      {/* Trigger */}
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </div>
  )
}
