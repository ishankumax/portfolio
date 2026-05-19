import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

// Route-based code-splitting: lazy-load heavier route components
const Home = lazy(() => import('./components/Home'))
const Success = lazy(() => import('./components/Success'))
const About = lazy(() => import('./components/About'))
const Insights = lazy(() => import('./components/Insights'))
const Experience = lazy(() => import('./components/Experience'))
const Network = lazy(() => import('./components/Network'))
const AdminPage = lazy(() => import('./components/admin/AdminPage'))
const QRGenerator = lazy(() => import('./components/projects/qr-generator'))
const QRPreview = lazy(() => import('./components/projects/qr-generator/QRPreview'))
const LinkShortener = lazy(() => import('./components/projects/link-shortener'))
const Games = lazy(() => import('./components/projects/games'))
const ShortLinkRedirect = lazy(() => import('./components/ShortLinkRedirect'))

import MainLayout from './components/layout/MainLayout'
import Terminal, { useTerminal } from './components/Terminal'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider, useTheme } from './ThemeContext'
import { ContentProvider } from './ContentContext'
import { AdminProvider } from './AdminContext'
import RippleBackground from './components/RippleBackground'
import ProjectSidebar from './components/ui/ProjectSidebar'

function AppInner() {
  const { open: terminalOpen, setOpen: setTerminalOpen } = useTerminal()
  const { rippleEnabled } = useTheme()

  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen scroll-smooth overflow-x-hidden" id="app-root" style={{ position: 'relative' }}>
        {/* Interactive dot-grid ripple canvas — fixed background layer */}
        <RippleBackground enabled={rippleEnabled} />

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
                <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/network" element={<Network />} />
                    <Route path="/contact" element={<Network />} />
                    <Route path="/qr" element={<QRGenerator />} />
                    <Route path="/projects/qr-generator-preview" element={<QRPreview />} />
                    <Route path="/projects/link-shortener" element={<LinkShortener />} />
                    <Route path="/projects/games" element={<Games />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/s/:slug" element={<ShortLinkRedirect />} />
                  </Routes>
                </Suspense>
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
