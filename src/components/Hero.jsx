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
        <p className="text-[#818cf8] font-mono text-sm mb-6 uppercase tracking-[0.3em] opacity-90">@ishankumax</p>
        
        <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
          <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer"
            className="p-3 border border-white/5 rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-gray-500">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ishankumax/" target="_blank" rel="noopener noreferrer"
            className="p-3 border border-white/5 rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-gray-500">
            <FaLinkedin size={20} />
          </a>
          <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer"
            className="p-3 border border-white/5 rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-gray-500">
            <FaXTwitter size={20} />
          </a>
          <a href="https://www.instagram.com/ishankumax/" target="_blank" rel="noopener noreferrer"
            className="p-3 border border-white/5 rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-gray-500">
            <FaInstagram size={20} />
          </a>
        </div>
 
        <p className="text-gray-400 leading-relaxed text-base md:text-lg max-w-xl">
          i'm a 20 y/o cs undergrad. i love building businesses and solving problems. interested in growth, startups, networking and infra. when i'm not cooking stuff, i'm prolly locking another client for my business - <span className="text-white border-b border-white/20 pb-0.5">inthebox.</span>
        </p>
      </div>
    </div>
  )
}

export default Hero
