import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './components/Home'
import MainLayout from './components/layout/MainLayout'
import Terminal from './components/Terminal'
import { useTerminal } from './hooks/useTerminal'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider, useTheme } from './ThemeContext'
import { ContentProvider } from './ContentContext'
import { AdminProvider } from './AdminContext'
import RippleBackground from './components/RippleBackground'
import ProjectSidebar from './components/ui/ProjectSidebar'

// Lazy load sub-pages to split bundle and speed up initial page load
const Success = React.lazy(() => import('./components/Success'))
const About = React.lazy(() => import('./components/About'))
const Insights = React.lazy(() => import('./components/Insights'))
const Experience = React.lazy(() => import('./components/Experience'))
const Network = React.lazy(() => import('./components/Network'))
const QRGenerator = React.lazy(() => import('./components/projects/qr-generator'))
const LinkShortener = React.lazy(() => import('./components/projects/link-shortener'))
const Games = React.lazy(() => import('./components/projects/games'))
const AdminPage = React.lazy(() => import('./components/admin/AdminPage'))
const ShortLinkRedirect = React.lazy(() => import('./components/ShortLinkRedirect'))
const ResumePage = React.lazy(() => import('./components/ResumePage'))

import ResumeButton from './components/ui/ResumeButton'

// Monospace page-level loader matching portfolio styling
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono">
      <div className="w-8 h-8 border-2 border-[var(--accent-faint)] border-t-[var(--accent)] rounded-full animate-spin mb-6" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] opacity-80 animate-pulse">
        Loading System Module...
      </p>
    </div>
  )
}

function AppInner() {
  const { open: terminalOpen, setOpen: setTerminalOpen } = useTerminal()
  const { rippleEnabled } = useTheme()

  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen scroll-smooth overflow-x-hidden" id="app-root" style={{ position: 'relative' }}>
        {/* Interactive dot-grid ripple canvas — fixed background layer */}
        <RippleBackground enabled={rippleEnabled} />

        {/* Global Action Buttons */}
        <ResumeButton />

        {/* Global Sidebars */}
        <ProjectSidebar />

        {/* Global Terminal Overlay */}
        {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}

        {/* Content layer — pointer-events auto so all UI remains interactive */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            {/* All Routes wrapped in MainLayout */}
            <Route path="/*" element={
              <MainLayout onOpenTerminal={() => setTerminalOpen(true)}>
                <React.Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/network" element={<Network />} />
                    <Route path="/contact" element={<Network />} />
                    <Route path="/qr" element={<QRGenerator />} />
                    <Route path="/link" element={<LinkShortener />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                    <Route path="/s/:slug" element={<ShortLinkRedirect />} />
                  </Routes>
                </React.Suspense>
              </MainLayout>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AdminProvider>
      <ContentProvider>
        <ThemeProvider>
          <AppInner />
        </ThemeProvider>
      </ContentProvider>
    </AdminProvider>
  )
}

export default App
