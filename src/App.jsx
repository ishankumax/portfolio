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
import { ThemeProvider } from './ThemeContext'


function AppInner() {
  const { open: terminalOpen, setOpen: setTerminalOpen } = useTerminal()

  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen scroll-smooth overflow-x-hidden" id="app-root">
        {/* Global Terminal Overlay */}
        {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}

        <MainLayout onOpenTerminal={() => setTerminalOpen(true)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/network" element={<Network />} />
            <Route path="/contact" element={<Network />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

export default App
