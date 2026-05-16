import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLongUrl } from '../lib/db';

export default function ShortLinkRedirect() {
  const { slug } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function handleRedirect() {
      try {
        const longUrl = await getLongUrl(slug);
        if (longUrl) {
          // Add protocol if missing
          const target = longUrl.startsWith('http') ? longUrl : `https://${longUrl}`;
          window.location.replace(target);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Redirect error:", err);
        setError(true);
      }
    }

    handleRedirect();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent)' }}>404</h1>
        <p className="text-sm opacity-50 mb-8">Link not found or has expired.</p>
        <button 
          onClick={() => navigate('/')}
          className="border border-[var(--accent)] text-[var(--accent)] px-6 py-2 rounded-lg text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:text-black transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono">
      <div className="w-8 h-8 border-2 border-[var(--accent-faint)] border-t-[var(--accent)] rounded-full animate-spin mb-6" />
      <p className="text-xs uppercase tracking-[0.3em] opacity-50 animate-pulse">
        Decrypting Link...
      </p>
    </div>
  );
}
