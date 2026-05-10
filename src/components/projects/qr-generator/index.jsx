import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';

export default function QRGenerator() {
  const [text, setText] = useState('https://ishankumar.dev');
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef(null);

  /* ── Render QR ── */
  const renderQR = useCallback(async (value) => {
    if (!canvasRef.current) return;
    try {
      await QRCode.toCanvas(canvasRef.current, value || ' ', {
        width: 300,
        margin: 2,
        color: { dark: '#ffffff', light: '#00000000' },
        errorCorrectionLevel: 'M',
      });
    } catch { /* keep last frame */ }
  }, []);

  useEffect(() => { renderQR(text); }, [text, renderQR]);

  /* ── Download PNG ── */
  const handleDownload = () => {
    if (!canvasRef.current || !text.trim()) return;
    setDownloading(true);
    const a = document.createElement('a');
    a.download = 'qr-code.png';
    a.href = canvasRef.current.toDataURL('image/png');
    a.click();
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 220px)',
      }}
    >
      {/* ── Top row: breadcrumb · CTA ── */}
      <div className="flex items-center justify-between mb-10" style={{ overflow: 'visible' }}>
        <div className="flex items-center gap-2" style={{ flexWrap: 'nowrap', overflow: 'visible' }}>
          <Link
            to="/"
            className="font-mono uppercase hover:opacity-100 transition-opacity"
            style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--text-primary)', opacity: 0.6, whiteSpace: 'nowrap' }}
          >
            portfolio / home
          </Link>
          <span style={{ fontSize: 10, opacity: 0.4, color: 'var(--text-secondary)' }}>/</span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', opacity: 0.85, whiteSpace: 'nowrap' }}
          >
            qr-generator
          </span>
        </div>

        {/* Ghost CTA — top-right */}
        <a
          id="qr-full-tool-cta"
          href="https://antigravity-qr.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            opacity: 0.8,
            whiteSpace: 'nowrap',
            marginLeft: 16,
            transition: 'color 0.2s, opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.opacity = '0.8'; }}
        >
          open full generator ↗
        </a>
      </div>

      {/* ── Main two-column ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* LEFT — controls */}
        <div style={{ flex: '0 0 340px', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Title + subtitle */}
          <div>
            <h1
              className="font-bold tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.05, marginBottom: 10 }}
            >
              QR Generator
              <span className="animate-pulse ml-1" style={{ color: 'var(--accent)' }}>_</span>
            </h1>
            <p
              className="font-mono"
              style={{ fontSize: 13, color: 'var(--text-secondary)', opacity: 0.65, lineHeight: 1.6, maxWidth: 280 }}
            >
              Quickly generate QR codes for any link or text.
            </p>
          </div>

          {/* Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label
              htmlFor="qr-input"
              className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent)', opacity: 1 }}
            >
              input
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="qr-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text…"
                spellCheck={false}
                className="font-mono"
                style={{
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 8,
                  padding: '10px 32px 10px 12px',
                  fontSize: 12,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
              {text && (
                <button
                  onClick={() => setText('')}
                  aria-label="Clear"
                  style={{
                    position: 'absolute', right: 10, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    fontSize: 16, lineHeight: 1, padding: 0,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >×</button>
              )}
            </div>
          </div>

          {/* Download */}
          <button
            id="qr-download-btn"
            onClick={handleDownload}
            disabled={!text.trim()}
            className="font-mono uppercase"
            style={{
              padding: '10px 0',
              borderRadius: 8,
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: text.trim() ? 'var(--text-secondary)' : 'var(--text-muted)',
              fontSize: 10,
              letterSpacing: '0.2em',
              cursor: text.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              width: '100%',
            }}
            onMouseEnter={(e) => {
              if (!text.trim()) return;
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = text.trim() ? 'var(--text-secondary)' : 'var(--text-muted)';
            }}
          >
            <DownloadIcon />
            {downloading ? 'saving…' : 'download png'}
          </button>

          {/* Hint */}
          <p
            className="font-mono"
            style={{ fontSize: 10, color: 'var(--text-secondary)', opacity: 0.65, lineHeight: 1.8 }}
          >
            basic preview — gradients, wifi qr,<br />
            history &amp; more in the{' '}
            <a
              href="https://antigravity-qr.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', opacity: 0.9, textDecoration: 'none', transition: 'opacity 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
            >
              full generator ↗
            </a>
          </p>
        </div>

        {/* RIGHT — large QR preview */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20,
              paddingBottom: 16,
              borderRadius: 16,
              background: 'var(--bg-card)',
              border: '1px solid',
              borderColor: text ? 'var(--accent)' : 'var(--border-subtle)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              boxShadow: text
                ? '0 0 48px color-mix(in srgb, var(--accent) 12%, transparent)'
                : 'none',
              gap: 12,
            }}
          >
            <canvas ref={canvasRef} style={{ display: 'block', borderRadius: 6 }} />
            {/* Watermark */}
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.35em',
                color: 'var(--accent)',
                opacity: 0.45,
                userSelect: 'none',
              }}
            >
              ishankumax
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
