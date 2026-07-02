import React, { useState, useRef, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaStar, FaCodeBranch } from 'react-icons/fa6'

// ─── Static data for platforms without public APIs ───────────────────────────
const STATIC_DATA = {
  linkedin: {
    name: 'Ishan Kumar',
    username: 'ishankumax',
    avatar: '/profile.jpeg',
    bio: 'CS Undergrad · Founder @ InTheBox · CMO',
    color: '#0a66c2',
    stats: [
      { label: 'Connections', value: '500+' },
      { label: 'Posts', value: '12+' },
    ],
  },
  twitter: {
    name: 'Ishan Kumar',
    username: 'ishankumax',
    avatar: '/profile.jpeg',
    bio: '20 y/o CS undergrad building for the next billion users 🚀',
    color: '#000000',
    stats: [
      { label: 'Followers', value: '—' },
      { label: 'Following', value: '—' },
    ],
  },
  instagram: {
    name: 'ishankumax',
    username: 'ishankumax',
    avatar: '/profile.jpeg',
    bio: 'CS undergrad · building & shipping 🚀\nFounder @ InTheBox',
    color: '#e1306c',
    stats: [
      { label: 'Posts', value: '—' },
      { label: 'Followers', value: '—' },
    ],
  },
}

// ─── Mini contribution heatmap (static decorative grid) ─────────────────────
function ContribGrid() {
  const cols = 18
  const rows = 7
  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4]
  const colors = [
    'rgba(57,255,20,0.06)',
    'rgba(57,255,20,0.20)',
    'rgba(57,255,20,0.40)',
    'rgba(57,255,20,0.65)',
    'rgba(57,255,20,0.90)',
  ]

  // Deterministic pseudo-random based on position
  const level = (c, r) => {
    const n = Math.abs(Math.sin(c * 7 + r * 13) * 1000)
    return levels[Math.floor(n % levels.length)]
  }

  return (
    <div className="flex gap-[2px] mb-3">
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

// ─── Platform-specific card content ─────────────────────────────────────────
function GitHubCard({ data }) {
  return (
    <div>
      <ContribGrid />
      <div className="flex items-center gap-3 mb-3">
        <img
          src={data.avatar || '/profile.jpeg'}
          alt={data.name}
          className="w-10 h-10 rounded-full border"
          style={{ borderColor: 'rgba(57,255,20,0.25)' }}
          onError={e => { e.currentTarget.src = '/profile.jpeg' }}
        />
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#fff' }}>{data.name}</p>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>@{data.username}</p>
        </div>
      </div>
      {data.bio && (
        <p className="text-[11px] mb-3 leading-relaxed" style={{ color: '#9ca3af' }}>
          {data.bio.length > 60 ? data.bio.slice(0, 60) + '…' : data.bio}
        </p>
      )}
      {data.location && (
        <p className="text-[10px] mb-3 flex items-center gap-1" style={{ color: '#6b7280' }}>
          <span>📍</span> {data.location}
        </p>
      )}
      <div className="flex gap-4 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {data.stats.map(s => (
          <div key={s.label}>
            <span className="text-sm font-bold" style={{ color: '#39ff14' }}>{s.value}</span>
            <span className="text-[10px] ml-1" style={{ color: '#6b7280' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GenericCard({ data, icon: Icon, iconColor }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-10 h-10 rounded-full border object-cover object-top"
          style={{ borderColor: 'rgba(255,255,255,0.10)' }}
          onError={e => { e.currentTarget.src = '/profile.jpeg' }}
        />
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#fff' }}>{data.name}</p>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>@{data.username}</p>
        </div>
        <div className="ml-auto">
          <Icon size={18} style={{ color: iconColor, opacity: 0.8 }} />
        </div>
      </div>
      {data.bio && (
        <p className="text-[11px] mb-3 leading-relaxed whitespace-pre-line" style={{ color: '#9ca3af' }}>
          {data.bio}
        </p>
      )}
      <div className="flex gap-4 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {data.stats.map(s => (
          <div key={s.label}>
            <span className="text-sm font-bold" style={{ color: '#fff' }}>{s.value}</span>
            <span className="text-[10px] ml-1" style={{ color: '#6b7280' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main wrapper component ──────────────────────────────────────────────────
export default function SocialHoverCard({ platform, href, children }) {
  const [visible, setVisible] = useState(false)
  const [ghData, setGhData] = useState(null)
  const [ghLoading, setGhLoading] = useState(false)
  const hideTimer = useRef(null)
  const containerRef = useRef(null)

  const show = () => {
    clearTimeout(hideTimer.current)
    setVisible(true)

    if (platform === 'github' && !ghData && !ghLoading) {
      setGhLoading(true)
      fetch('https://api.github.com/users/ishankumax')
        .then(r => r.json())
        .then(d => {
          setGhData({
            name: d.name || 'Ishan Kumar',
            username: d.login,
            avatar: d.avatar_url,
            bio: d.bio,
            location: d.location,
            stats: [
              { label: 'Repos', value: d.public_repos ?? '—' },
              { label: 'Followers', value: d.followers ?? '—' },
              { label: 'Following', value: d.following ?? '—' },
            ],
          })
        })
        .catch(() => {})
        .finally(() => setGhLoading(false))
    }
  }

  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 120)
  }

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const renderCard = () => {
    if (platform === 'github') {
      const data = ghData ?? {
        name: 'Ishan Kumar',
        username: 'ishankumax',
        avatar: '/profile.jpeg',
        bio: 'Building software for the next billion users.',
        location: 'India',
        stats: [
          { label: 'Repos', value: ghLoading ? '…' : '—' },
          { label: 'Followers', value: ghLoading ? '…' : '—' },
          { label: 'Following', value: ghLoading ? '…' : '—' },
        ],
      }
      return <GitHubCard data={data} />
    }
    if (platform === 'linkedin') {
      return <GenericCard data={STATIC_DATA.linkedin} icon={FaLinkedin} iconColor="#0a66c2" />
    }
    if (platform === 'twitter' || platform === 'x.com') {
      return <GenericCard data={STATIC_DATA.twitter} icon={FaXTwitter} iconColor="#fff" />
    }
    if (platform === 'instagram') {
      return <GenericCard data={STATIC_DATA.instagram} icon={FaInstagram} iconColor="#e1306c" />
    }
    return null
  }

  const card = renderCard()
  if (!card) return <>{children}</>

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Hover card — appears above the trigger */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 12px)',
          left: '50%',
          transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(6px)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          zIndex: 9999,
          width: '240px',
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {/* Arrow */}
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
            borderTop: '6px solid #1a1a1a',
          }}
        />
        {/* Card */}
        <div
          style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '14px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {card}
        </div>
      </div>

      {/* Original trigger content */}
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </div>
  )
}
