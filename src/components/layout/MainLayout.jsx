import Navbar from '../Navbar'
import AccentPicker from '../ui/AccentPicker'

/**
 * MainLayout
 * Unified wrapper for all pages to ensure consistent alignment,
 * max-width, and persistent navigation.
 */
const MainLayout = ({ children, onOpenTerminal }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] font-mono selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)]">
      {/* Global Navigation */}
      <Navbar onOpenTerminal={onOpenTerminal} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-36 md:pt-40 pb-20">
        {children}
      </main>

      {/* Dynamic Theme Customizer */}
      <AccentPicker />
    </div>
  )
}

export default MainLayout
