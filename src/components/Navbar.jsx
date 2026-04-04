import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ onToggleDrawer }) {
  // The Navbar component takes 'onToggleDrawer' function as a prop to handle the sidebar panel.
  return (
    // Outer navigation wrapper using flexbox for responsive layout and spacing.
    <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4 items-center mb-16 text-sm md:text-base text-gray-500 w-full px-2">
      
      {/* Link to the Insights page / section */}
      <Link to="/insights" className="hover:text-white transition-colors whitespace-nowrap">[i] insights</Link>
      
      {/* Link to the Specifications (specs) page */}
      <Link to="/specs" className="hover:text-white transition-colors whitespace-nowrap">[s] specs</Link>
      
      {/* Link to the Highlights section on the home page via hash fragment */}
      <Link to="/#highlights" className="hover:text-white transition-colors whitespace-nowrap">[h] highlights</Link>
      
      {/* Link to the About Me page */}
      <Link to="/about" className="hover:text-white transition-colors whitespace-nowrap">[a] about me</Link>
      
      {/* Mailto link for triggering the user's email client directly */}
      <a href="mailto:ishankumax@gmail.com" className="hover:text-white transition-colors whitespace-nowrap">[n] network</a>
      
      {/* Unified '[x] experience' Button: Triggers the sliding sidebar / drawer experience panel */}
      <button 
        onClick={onToggleDrawer} // Executes the drawer toggle function passed from the parent (Home.jsx)
        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        aria-label="Toggle Experience Panel"
      >
        {/* Label for the experience trigger */}
        <span>[x] experience</span>
        
        {/* Simple hamburger SVG icon (2 horizontal bars) for visual hint */}
        
      </button>
    </nav>
  )
}

export default Navbar
