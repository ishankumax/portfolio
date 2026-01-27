import React from 'react'
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="pt-6 pb-6 mt-10 border-t border-gray-700">
      <div className="flex flex-wrap justify-between gap-6">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all">
          <FaInstagram size={18} />
          <span className="text-sm">Instagram</span>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all">
          <FaLinkedin size={18} />
          <span className="text-sm">LinkedIn</span>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all">
          <FaXTwitter size={18} />
          <span className="text-sm">Twitter</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
