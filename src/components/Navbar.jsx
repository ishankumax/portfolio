import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 mb-20 text-sm md:text-base text-gray-500">
      <a href="#insights" className="hover:text-white transition-colors">[i] insights</a>
      <Link to="/specs" className="hover:text-white transition-colors">[s] specs</Link>
      <a href="#highlights" className="hover:text-white transition-colors">[h] highlights</a>
      <a href="#about" className="hover:text-white transition-colors">[a] about me</a>
      <a href="mailto:ishankumax@gmail.com" className="hover:text-white transition-colors">[n] network</a>
    </nav>
  )
}

export default Navbar
