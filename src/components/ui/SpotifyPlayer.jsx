import React, { useState, useEffect } from 'react'
import { FaSpotify, FaMusic } from 'react-icons/fa6'

export default function SpotifyPlayer() {
  const [song, setSong] = useState({
    isPlaying: false,
    title: '',
    artist: '',
    album: '',
    albumImageUrl: '',
    songUrl: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const loadMockData = () => {
      setSong({
        isPlaying: true,
        title: 'Stairway to Heaven',
        artist: 'Led Zeppelin',
        album: 'Led Zeppelin IV',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273c08202c50371e234d20caf62',
        songUrl: 'https://open.spotify.com/track/5CQ3hkBLGtyPcr26RIvJ1C',
      })
    }

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/now-playing')
        
        if (res.ok) {
          const text = await res.text()
          if (text.startsWith('<')) {
            // It's the Vite dev server index.html fallback
            loadMockData()
            return
          }
          const data = JSON.parse(text)
          setSong(data)
        } else {
          // If we got a 404/500, but we are in local dev, show mock data
          if (import.meta.env.DEV) {
            loadMockData()
          } else {
            setSong({ isPlaying: false })
          }
        }
      } catch (error) {
        console.warn('Spotify API not configured/accessible, using offline fallback.')
        if (import.meta.env.DEV) {
          loadMockData()
        } else {
          setSong({ isPlaying: false })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchNowPlaying()
    // Poll Spotify player state every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

  // Reset image error state whenever song image URL changes
  useEffect(() => {
    setImgError(false)
  }, [song.albumImageUrl])

  if (isLoading) return null

  // If there's no track and it's not playing (i.e. empty state)
  const hasTrack = !!song.title

  return (
    <a
      href={song.songUrl || 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center h-12 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)',
        backdropFilter: 'blur(12px)',
      }}
      aria-label="Spotify Player"
    >
      {/* Icon and Equalizer Circle */}
      <div 
        className="flex items-center justify-center w-12 h-12 flex-shrink-0 relative z-10 rounded-full transition-all duration-300" 
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <FaSpotify 
          size={22} 
          className={`transition-all duration-500 ${
            song.isPlaying 
              ? 'text-[#1DB954] scale-110 rotate-[360deg]' 
              : 'text-[color:var(--text-secondary)] group-hover:text-[#1DB954]'
          }`} 
        />
        
        {/* Absolute equalizer wave inside circle to indicate playing state */}
        {song.isPlaying && (
          <div className="absolute bottom-1.5 flex gap-[1px]">
            <div className="spotify-equalizer__bar h-2 w-[1.5px]" />
            <div className="spotify-equalizer__bar h-2 w-[1.5px]" />
            <div className="spotify-equalizer__bar h-2 w-[1.5px]" />
          </div>
        )}
      </div>

      {/* Expanded Track Information Panel */}
      <div
        className="transform transition-all duration-500 ease-out translate-x-0 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[280px] flex items-center gap-3 pr-5 pl-1 overflow-hidden whitespace-nowrap text-left z-0"
      >
        {hasTrack ? (
          <>
            {/* Album Cover Art */}
            {song.albumImageUrl && !imgError ? (
              <img
                src={song.albumImageUrl}
                alt={song.album || song.title}
                onError={() => setImgError(true)}
                className={`w-7 h-7 rounded-md object-cover border border-white/10 ${
                  song.isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
                }`}
              />
            ) : (
              <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center border border-white/10 flex-shrink-0">
                <FaMusic className="text-[11px] text-[#1DB954]" />
              </div>
            )}
            
            {/* Track metadata */}
            <div className="flex flex-col min-w-0 select-none">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-widest font-bold font-mono text-[#1DB954]">
                  {song.isPlaying ? 'Now Playing' : 'Last Played'}
                </span>
                {song.isPlaying && (
                  <div className="spotify-equalizer">
                    <div className="spotify-equalizer__bar" />
                    <div className="spotify-equalizer__bar" />
                    <div className="spotify-equalizer__bar" />
                    <div className="spotify-equalizer__bar" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-bold tracking-tight text-[color:var(--text-primary)] truncate max-w-[170px] mt-0.5">
                {song.title}
              </span>
              <span className="text-[9px] text-[color:var(--text-secondary)] truncate max-w-[170px]">
                {song.artist}
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col select-none pr-2">
            <span className="text-[9px] uppercase tracking-widest font-bold font-mono text-[color:var(--text-secondary)]">
              Spotify
            </span>
            <span className="text-[10px] text-[color:var(--text-muted)] font-medium">
              Not listening right now
            </span>
          </div>
        )}
      </div>
    </a>
  )
}

