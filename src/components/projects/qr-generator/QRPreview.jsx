import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import ProjectLayout from '../ProjectLayout'

const ACCENT = '#a855f7' // purple-500

export default function QRPreview() {
  const [text, setText] = useState('https://ishankumar.dev')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const canvasRef = useRef(null)

  /* ── Render QR to canvas ── */
  const renderQR = useCallback(async (value) => {
    if (!canvasRef.current) return
    try {
      await QRCode.toCanvas(canvasRef.current, value || ' ', {
        width: 220,
        margin: 2,
        color: {
          dark: '#ffffff',
          light: '#00000000', // transparent bg
        },
        errorCorrectionLevel: 'M',
      })
    } catch {
      // invalid input — leave previous frame
    }
  }, [])

  useEffect(() => {
    renderQR(text)
  }, [text, renderQR])

  /* ── Download PNG ── */
  const handleDownload = () => {
    if (!canvasRef.current || !text.trim()) return
    setDownloading(true)
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
    setTimeout(() => setDownloading(false), 1200)
  }

  return (
    <ProjectLayout
      slug="qr-generator-preview"
      title="QR Preview"
      description="Instant QR code from any link or text. Want more? Open the full generator."
    >
      {/* ── Card ── */}
      <div
        style={{
          maxWidth: 400,
          margin: '0 auto',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(168,85,247,0.18)',
          boxShadow: '0 0 48px rgba(168,85,247,0.07)',
          padding: '36px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* ── Label ── */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            color: ACCENT,
            opacity: 0.8,
            alignSelf: 'flex-start',
          }}
        >
          preview / quick-generate
        </p>

        {/* ── Input ── */}
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            id="qr-preview-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter URL or text…"
            spellCheck={false}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: 10,
              padding: '11px 14px',
              fontSize: 13,
              fontFamily: 'monospace',
              color: '#e2e8f0',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = ACCENT)}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(168,85,247,0.25)')}
          />
          {/* clear btn */}
          {text && (
            <button
              onClick={() => setText('')}
              aria-label="Clear"
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: 1,
                padding: 2,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              ×
            </button>
          )}
        </div>

        {/* ── QR Canvas ── */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 14,
            padding: 12,
            border: '1px solid rgba(168,85,247,0.12)',
            transition: 'box-shadow 0.3s',
            boxShadow: text ? `0 0 28px rgba(168,85,247,0.15)` : 'none',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: 'block', borderRadius: 8 }}
          />
        </div>

        {/* ── Actions ── */}
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          {/* Download */}
          <button
            id="qr-download-btn"
            onClick={handleDownload}
            disabled={!text.trim()}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              border: `1px solid ${ACCENT}`,
              background: text.trim() ? 'rgba(168,85,247,0.12)' : 'transparent',
              color: text.trim() ? ACCENT : 'rgba(168,85,247,0.35)',
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.08em',
              cursor: text.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
            onMouseEnter={(e) => {
              if (!text.trim()) return
              e.currentTarget.style.background = 'rgba(168,85,247,0.22)'
              e.currentTarget.style.boxShadow = `0 0 16px rgba(168,85,247,0.2)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = text.trim()
                ? 'rgba(168,85,247,0.12)'
                : 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {downloading ? (
              <>
                <DownloadIcon />
                Saving…
              </>
            ) : (
              <>
                <DownloadIcon />
                Download PNG
              </>
            )}
          </button>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(168,85,247,0.1)',
          }}
        />

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'monospace',
              marginBottom: 10,
              letterSpacing: '0.05em',
            }}
          >
            Need gradients, WiFi QR, history &amp; more?
          </p>
          <Link
            id="qr-full-tool-cta"
            to="/projects/qr-generator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 22px',
              borderRadius: 10,
              background: `linear-gradient(135deg, ${ACCENT}, #7c3aed)`,
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.25s',
              boxShadow: '0 4px 20px rgba(168,85,247,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(168,85,247,0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(168,85,247,0.3)'
            }}
          >
            More Customization →
          </Link>
        </div>
      </div>
    </ProjectLayout>
  )
}

/* ── Tiny inline icon ── */
function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
