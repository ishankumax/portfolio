import React from 'react'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'

function Hero() {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-24 items-center md:items-start px-2 md:px-0">
      {/* Profile Image */}
      <div className="shrink-0">
        <img 
          src="/pfp.jpg" 
          alt="Ishan Kumar" 
          className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-300 shadow-2xl shadow-white/5"
        />
      </div>
 
      {/* Profile Content */}
      <div className="flex-1 text-center md:text-left min-w-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter">ishan kumar</h1>
        <p className="text-[#818cf8] font-mono text-sm mb-6 lowercase tracking-wider opacity-90">@ishankumax</p>
        
        <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
          <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer"
            className="p-3 border rounded-xl hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-300"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ishankumax/" target="_blank" rel="noopener noreferrer"
            className="p-3 border rounded-xl hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-300"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
            <FaLinkedin size={20} />
          </a>
          <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer"
            className="p-3 border rounded-xl hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-300"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
            <FaXTwitter size={20} />
          </a>
          <a href="https://www.instagram.com/ishankumax/" target="_blank" rel="noopener noreferrer"
            className="p-3 border rounded-xl hover:bg-[color:var(--accent-purple)] hover:text-black transition-all duration-300"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
            <FaInstagram size={20} />
          </a>
        </div>
 
        <p className="leading-relaxed text-base md:text-lg max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          i'm a 20 y/o cs undergrad. i love building businesses and solving problems. interested in growth, startups, networking and infra. when i'm not cooking stuff, i'm prolly locking another client for my business - <span className="border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent-purple-border)' }}>inthebox.</span>
        </p>
      </div>
    </div>
  )
}

export default Hero
