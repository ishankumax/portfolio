import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import AccentPicker from '../ui/AccentPicker'

/**
 * MainLayout
 * Unified wrapper for all pages to ensure consistent alignment,
 * max-width, and persistent navigation.
 */
const MainLayout = ({ children, onOpenTerminal }) => {
  const location = useLocation()
  
  // The experience page has a sidebar, so we give it more breathing room
  const isExperiencePage = location.pathname === '/experience'
  const maxWidth = isExperiencePage ? "max-w-6xl" : "max-w-4xl"

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] font-mono selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)]">
      {/* Global Navigation */}
      <Navbar onOpenTerminal={onOpenTerminal} />

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${maxWidth} mx-auto ${isExperiencePage ? 'px-4 md:px-6' : 'px-6'} pt-36 md:pt-40 pb-20 transition-all duration-300`}>
        {children}
      </main>

      {/* Dynamic Theme Customizer */}
      <AccentPicker />
    </div>
  )
}

export default MainLayout
