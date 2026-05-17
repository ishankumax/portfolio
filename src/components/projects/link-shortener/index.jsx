import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiLink, RiClipboardLine, RiCheckLine, RiArrowRightLine, RiDeleteBinLine, RiExternalLinkLine } from 'react-icons/ri';
import { createShortLink } from '../../../lib/db';

export default function LinkShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('shortener-history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shortener-history', JSON.stringify(history));
  }, [history]);

  const handleShorten = async (e) => {
    e?.preventDefault();
    if (!longUrl.trim()) return;

    setIsShortening(true);
    
    try {
      const slug = await createShortLink(longUrl);
      const generatedShort = `ishankumax/${slug}`;
      setShortUrl(generatedShort);
      
      const newEntry = {
        id: Date.now(),
        long: longUrl,
        short: generatedShort,
        url: `https://ishankumar.dev/s/${slug}`, // Actual URL to resolve 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      
      setHistory(prev => [newEntry, ...prev.slice(0, 4)]); // Keep last 5
    } catch (err) {
      console.error("Shortening error:", err);
      alert("Failed to shorten link. Please try again.");
    } finally {
      setIsShortening(false);
    }
  };

  const copyToClipboard = () => {
    const slug = shortUrl.split('/').pop();
    const fullUrl = `${window.location.origin}/s/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('shortener-history');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 220px)',
      }}
    >
      {/* ── Top row: breadcrumb ── */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
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
            link-shortener
          </span>
        </div>
      </div>

      {/* ── Main two-column ── */}
      <div
        className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start lg:items-center"
        style={{ flex: 1 }}
      >
        {/* LEFT — controls */}
        <div className="w-full lg:w-[380px] flex flex-col gap-8">
          <div>
            <h1
              className="font-bold tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.05, marginBottom: 10 }}
            >
              Link Shortener
              <span className="animate-pulse ml-1" style={{ color: 'var(--accent)' }}>_</span>
            </h1>
            <p
              className="font-mono"
              style={{ fontSize: 13, color: 'var(--text-secondary)', opacity: 0.65, lineHeight: 1.6 }}
            >
              Transform long, complex URLs into clean, manageable links instantly.
            </p>
          </div>

          <form onSubmit={handleShorten} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="url-input"
                className="font-mono uppercase"
                style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent)' }}
              >
                target url
              </label>
              <div style={{ position: 'relative' }}>
                <div 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <RiLink size={16} />
                </div>
                <input
                  id="url-input"
                  type="url"
                  required
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://very-long-url.com/path..."
                  className="font-mono"
                  style={{
                    width: '100%',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 8,
                    padding: '12px 12px 12px 40px',
                    fontSize: 12,
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isShortening || !longUrl}
              className="font-mono uppercase font-bold tracking-widest"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 8,
                background: longUrl ? 'var(--accent)' : 'var(--bg-card)',
                color: longUrl ? 'black' : 'var(--text-muted)',
                border: 'none',
                cursor: longUrl ? 'pointer' : 'not-allowed',
                fontSize: 11,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: longUrl ? '0 0 20px color-mix(in srgb, var(--accent) 30%, transparent)' : 'none'
              }}
            >
              {isShortening ? (
                <>
                  <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Shorten URL <RiArrowRightLine size={14} />
                </>
              )}
            </button>
          </form>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono uppercase text-[9px] tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Recent History
                </span>
                <button 
                  onClick={clearHistory}
                  className="text-[9px] font-mono uppercase tracking-widest hover:text-red-400 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 rounded-lg border transition-all hover:border-[var(--accent-border)]"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <span className="text-[10px] font-mono truncate max-w-[180px]" style={{ color: 'var(--text-primary)' }}>{item.short}</span>
                      <span className="text-[9px] font-mono truncate max-w-[180px]" style={{ color: 'var(--text-muted)' }}>{item.long}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setShortUrl(item.short);
                        setLongUrl(item.long);
                      }}
                      className="p-1.5 rounded-md hover:bg-[var(--accent-faint)] transition-colors"
                      style={{ color: 'var(--accent)' }}
                    >
                      <RiExternalLinkLine size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — large Result Card */}
        <div className="flex-1 w-full flex items-center justify-center py-10 lg:py-0">
          <div
            className="relative w-full max-w-md aspect-[1.4/1] flex flex-col items-center justify-center p-10 rounded-2xl border transition-all duration-500"
            style={{
              background: 'var(--bg-card)',
              borderColor: shortUrl ? 'var(--accent)' : 'var(--border-subtle)',
              boxShadow: shortUrl ? '0 0 60px color-mix(in srgb, var(--accent) 8%, transparent)' : 'none',
            }}
          >
            {!shortUrl ? (
              <div className="flex flex-col items-center gap-6 opacity-30 text-center">
                <div 
                  className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center"
                  style={{ borderColor: 'var(--text-secondary)' }}
                >
                  <RiLink size={32} />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest">
                  Awaiting input
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono uppercase text-[9px] tracking-[0.4em]" style={{ color: 'var(--accent)' }}>
                    Generated Link
                  </span>
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center break-all">
                    {shortUrl}
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 font-mono uppercase text-[10px] font-bold tracking-widest p-4 rounded-xl transition-all"
                    style={{
                      background: copied ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                      color: copied ? 'black' : 'var(--text-primary)',
                      border: '1px solid',
                      borderColor: copied ? 'var(--accent)' : 'var(--border-subtle)',
                    }}
                  >
                    {copied ? (
                      <>
                        <RiCheckLine size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <RiClipboardLine size={16} /> Copy Link
                      </>
                    )}
                  </button>
                  <a
                    href={`/s/${shortUrl.split('/').pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 rounded-xl border hover:bg-[var(--accent-faint)] transition-all"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    <RiExternalLinkLine size={18} />
                  </a>
                </div>

                {/* Info badge */}
                <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  <span>Custom Analytics Enabled</span>
                  <span className="w-1 h-1 rounded-full bg-current opacity-20" />
                  <span>Frontend Demo</span>
                </div>
              </div>
            )}

            {/* Bottom watermark */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono uppercase text-[8px] tracking-[0.5em] opacity-30 select-none"
              style={{ color: 'var(--text-secondary)' }}
            >
              ishankumax / shortener
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
