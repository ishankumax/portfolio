import { useState, useEffect } from 'react'

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
