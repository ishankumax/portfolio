import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// ============================================================================
// Terminal — activated by pressing backtick (`) or Ctrl+K
// Supports commands to explore the portfolio as a filesystem
// ============================================================================

const BANNER = [
  '  _     _                 _                                ',
  ' (_)___| |__   __ _ _ __ | | ___   _ _ __ ___   __ ___  __',
  " | / __| '_ \\ / _` | '_ \\| |/ / | | | '_ ` _ \\ / _` \\ \\/ /",
  ' | \\__ \\ | | | (_| | | | |   <| |_| | | | | | | (_| |>  < ',
  ' |_|___/_| |_|\\__,_|_| |_|_|\\_\\\\__,_|_| |_| |_|\\__,_/_/\\_\\',
  '',
  '  portfolio terminal v1.0 — type "help" to get started',
  '',
]

const FILES = {
  'whoami': [
    'ishan kumar (@ishankumax)',
    '20 y/o cs undergrad | founder of inthebox pvt. ltd.',
    'interested in growth, startups, networking and infra.',
    '',
    'currently:',
    '  • chief marketing officer @ inthebox',
    '  • harvard ylc coordinator @ chitkara university',
    '  • building & shipping on weekends',
  ],
  'skills': [
    'frontend:    react, vite, tailwind css, javascript (92%)',
    'backend:     node.js, python, supabase, rest apis',
    'tools:       git/github, figma, vs code, linux/cli',
    '',
    "run 'open /specs' for the full technical breakdown.",
  ],
  'experience': [
    '2026  chief marketing officer @ inthebox',
    '      harvard ylc coordinator @ chitkara university',
    '',
    '2025  head of marketing @ acm student chapter',
    '      ecosystem manager @ devlearn',
    '      graphics exec. @ coding blocks',
    '',
    '2024  marketing exec. @ acm | campus ambassador @ kotlin delhi',
    '      design & branding @ gfg | graphics head @ devlearn',
    '      outreach exec. @ coding ninjas',
    '',
    '2023  graphics exec. @ devlearn',
    '',
    "run 'open /experience' for the full detailed view.",
  ],
  'contact': [
    'email:     ishankumax@gmail.com',
    'linkedin:  linkedin.com/in/ishankumax',
    'twitter:   @ishankumax',
    'instagram: @ishankumax',
    'github:    github.com/ishankumax',
    '',
    "run 'open /network' to visit the network page.",
  ],
}

const COMMANDS = {
  help: () => [
    'available commands:',
    '',
    '  whoami              — who am i?',
    '  ls                  — list all sections',
    '  cat <file>          — read a file (skills, experience, network)',
    '  open <path>         — navigate to a page (/experience, /network, /specs)',
    '  clear               — clear the terminal',
    '  exit                — close the terminal',
    '',
    'tip: press ` or Ctrl+K to toggle this terminal anytime.',
  ],
  ls: () => [
    'drwxr-xr-x  /home',
    'drwxr-xr-x  /experience',
    'drwxr-xr-x  /specs',
    'drwxr-xr-x  /network',
    'drwxr-xr-x  /insights',
    '-rw-r--r--  whoami',
    '-rw-r--r--  skills',
    '-rw-r--r--  experience',
    '-rw-r--r--  network',
  ],
  clear: () => '__CLEAR__',
  exit: () => '__EXIT__',
}

function Terminal({ onClose }) {
  const [lines, setLines] = useState(BANNER)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const runCommand = useCallback((raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const prompt = `ishankumax@portfolio:~$ ${trimmed}`
    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').replace(/^\//, '')

    setHistory(h => [trimmed, ...h])
    setHistIdx(-1)

    // cat <file>
    if (cmd === 'cat') {
      const file = FILES[arg]
      if (file) {
        setLines(l => [...l, prompt, ...file, ''])
      } else {
        setLines(l => [...l, prompt, `cat: ${arg}: no such file — try 'ls' to see available files`, ''])
      }
      return
    }

    // open <path>
    if (cmd === 'open') {
      const routes = ['/experience', '/network', '/specs', '/insights', '/about', '/']
      const path = '/' + arg
      if (routes.includes(path) || path === '/home' || arg === 'home') {
        const target = path === '/home' ? '/' : path
        setLines(l => [...l, prompt, `navigating to ${target}...`, ''])
        setTimeout(() => { onClose(); navigate(target) }, 600)
      } else {
        setLines(l => [...l, prompt, `open: ${arg}: unknown route — available: /experience /network /specs /insights`, ''])
      }
      return
    }

    if (cmd === 'whoami') {
      setLines(l => [...l, prompt, ...COMMANDS.whoami?.() ?? [], ''])
      // whoami uses FILES
      setLines(l => [...l.slice(0, -1), prompt, ...FILES['whoami'], ''])
      return
    }

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]()
      if (result === '__CLEAR__') { setLines([]); return }
      if (result === '__EXIT__') { onClose(); return }
      setLines(l => [...l, prompt, ...result, ''])
      return
    }

    setLines(l => [...l, prompt, `command not found: ${cmd} — type 'help' for available commands`, ''])
  }, [navigate, onClose])

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(idx)
      setInput(history[idx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : history[idx])
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-3xl bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-black/80 font-mono text-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/70 bg-[#111]">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/40" />
          <span className="ml-3 text-[11px] text-gray-600 flex-1 text-center">ishankumax — portfolio terminal</span>
          <span className="text-[10px] text-gray-700">` or Ctrl+K to close</span>
        </div>

        {/* Output */}
        <div
          className="h-72 md:h-96 overflow-y-auto p-4 space-y-0.5 text-[12px] leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre ${line.startsWith('ishankumax@') ? 'text-white' : 'text-gray-500'}`}>
              {line || '\u00A0'}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-800/70 bg-[#0d0d0d]">
          <span className="text-gray-600 text-[12px] shrink-0">ishankumax@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent text-white text-[12px] outline-none caret-white placeholder-gray-700"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Hook: useTerminal — manages open state and keyboard shortcut
// ============================================================================
export function useTerminal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '`') { e.preventDefault(); setOpen(o => !o) }
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setOpen(o => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { open, setOpen }
}

export default Terminal
