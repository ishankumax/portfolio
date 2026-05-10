import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './components/Home'
import Success from './components/Success'
import About from './components/About'
import Insights from './components/Insights'
import Experience from './components/Experience'
import Network from './components/Network'
import MainLayout from './components/layout/MainLayout'
import Terminal, { useTerminal } from './components/Terminal'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider, useTheme } from './ThemeContext'
import { ContentProvider } from './ContentContext'
import { AdminProvider } from './AdminContext'
import RippleBackground from './components/RippleBackground'
import ProjectSidebar from './components/ui/ProjectSidebar'
import AdminPage from './components/admin/AdminPage'
import QRGenerator from './components/projects/qr-generator'
import QRPreview from './components/projects/qr-generator/QRPreview'
import LinkShortener from './components/projects/link-shortener'
import Games from './components/projects/games'

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
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/network" element={<Network />} />
                  <Route path="/contact" element={<Network />} />
                  <Route path="/projects/qr-generator" element={<QRGenerator />} />
                  <Route path="/projects/qr-generator-preview" element={<QRPreview />} />
                  <Route path="/projects/link-shortener" element={<LinkShortener />} />
                  <Route path="/projects/games" element={<Games />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
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
