import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';
import { useTheme } from '../../../ThemeContext';

export default function Games() {
  const { accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('snake'); // 'snake' or 'ttt'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 220px)',
      }}
    >
      {/* ── Top row: breadcrumb ── */}
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
            games
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
              Mini Games
              <span className="animate-pulse ml-1" style={{ color: 'var(--accent)' }}>_</span>
            </h1>
            <p
              className="font-mono"
              style={{ fontSize: 13, color: 'var(--text-secondary)', opacity: 0.65, lineHeight: 1.6 }}
            >
              A collection of classic arcade games like Snake and Tic-Tac-Toe.
            </p>
          </div>

          {/* Navigation Selector */}
          <div 
            className="flex border rounded-xl p-1 bg-black/35 backdrop-blur w-fit" 
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <button
              onClick={() => setActiveTab('snake')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'snake'
                  ? 'text-black shadow-[0_0_15px_var(--accent-glow)]'
                  : 'hover:text-[color:var(--accent)]'
              }`}
              style={{
                backgroundColor: activeTab === 'snake' ? accentColor : 'transparent',
                color: activeTab === 'snake' ? 'black' : 'var(--text-secondary)'
              }}
            >
              Snake Game
            </button>
            <button
              onClick={() => setActiveTab('ttt')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'ttt'
                  ? 'text-black shadow-[0_0_15px_var(--accent-glow)]'
                  : 'hover:text-[color:var(--accent)]'
              }`}
              style={{
                backgroundColor: activeTab === 'ttt' ? accentColor : 'transparent',
                color: activeTab === 'ttt' ? 'black' : 'var(--text-secondary)'
              }}
            >
              Tic-Tac-Toe
            </button>
          </div>

          {/* Instructions / Hints */}
          <p
            className="font-mono"
            style={{ fontSize: 10, color: 'var(--text-secondary)', opacity: 0.65, lineHeight: 1.8 }}
          >
            controls — use <span className="text-[color:var(--accent)]">WASD</span> or <span className="text-[color:var(--accent)]">arrow keys</span> for Snake.<br />
            Tic-Tac-Toe features an <span className="text-[color:var(--accent)]">unbeatable minimax AI</span>.<br />
            sound effects are dynamically synthesized in browser.
          </p>
        </div>

        {/* RIGHT — Game Preview Card */}
        <div className="flex-1 w-full flex items-center justify-center py-10 lg:py-0">
          <div
            className="relative w-full max-w-md flex flex-col items-center justify-center p-8 pb-14 rounded-2xl border transition-all duration-500 min-h-[460px]"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 0 40px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.style.boxShadow = `0 0 48px ${accentColor}14`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,0,0,0.3)';
            }}
          >
            <div className="w-full flex justify-center">
              {activeTab === 'snake' ? (
                <SnakeGame />
              ) : (
                <TicTacToe />
              )}
            </div>
            
            {/* Watermark */}
            <div 
              className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono uppercase text-[8px] tracking-[0.5em] opacity-35 select-none"
              style={{ color: 'var(--text-secondary)' }}
            >
              ishankumax / arcade
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
