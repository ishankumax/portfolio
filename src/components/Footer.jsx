import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="pt-10 pb-8 mt-16 border-t border-gray-800/60">
      <div className="flex flex-col gap-8">

        {/* Top row: CTA + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left: Let's Talk CTA */}
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-2 font-mono">got an idea?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-white border border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-5 py-2.5 rounded-lg text-sm font-mono group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              let's talk
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer"
              className="p-2 border border-gray-800 rounded hover:bg-[#818cf8] hover:text-black transition-all duration-200 text-gray-400 hover:text-black">
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/ishankumax/" target="_blank" rel="noopener noreferrer"
              className="p-2 border border-gray-800 rounded hover:bg-[#818cf8] hover:text-black transition-all duration-200 text-gray-400 hover:text-black">
              <FaLinkedin size={16} />
            </a>
            <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer"
              className="p-2 border border-gray-800 rounded hover:bg-[#818cf8] hover:text-black transition-all duration-200 text-gray-400 hover:text-black">
              <FaXTwitter size={16} />
            </a>
            <a href="https://www.instagram.com/ishankumax/" target="_blank" rel="noopener noreferrer"
              className="p-2 border border-gray-800 rounded hover:bg-[#818cf8] hover:text-black transition-all duration-200 text-gray-400 hover:text-black">
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        {/* Bottom row: Copyright + quick nav */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-4 border-t border-gray-800/40">
          <p className="text-[11px] text-gray-600 font-mono">
            © {year} ishankumax — built with react + vite
          </p>
          <div className="flex gap-4 text-[11px] text-gray-600 font-mono">
            <Link to="/insights" className="hover:text-gray-400 transition-colors">insights</Link>
            <Link to="/experience" className="hover:text-gray-400 transition-colors">experience</Link>
            <Link to="/specs" className="hover:text-gray-400 transition-colors">specs</Link>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">contact</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
