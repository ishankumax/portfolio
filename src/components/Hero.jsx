import React from 'react'
import { FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'

function Hero() {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-24 items-start px-2 md:px-0">
      {/* Profile Image */}
      <div className="shrink-0 mx-auto md:mx-0 w-full max-w-[160px] md:max-w-none flex justify-center">
        <img 
          src="/pfp.jpg" 
          alt="Ishan Kumar" 
          className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-300 max-w-full shadow-2xl shadow-white/5"
        />
      </div>

      {/* Profile Content */}
      <div className="flex-1 text-center md:text-left w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">ishan kumar</h1>
        <p className="text-[#818cf8] font-mono text-xs mb-6 uppercase tracking-widest opacity-80">@ishankumax</p>
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <a href="https://github.com/ishankumax" target="_blank" rel="noopener noreferrer"
            className="p-2.5 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-gray-400">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ishankumax/" target="_blank" rel="noopener noreferrer"
            className="p-2.5 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-gray-400">
            <FaLinkedin size={18} />
          </a>
          <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer"
            className="p-2.5 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-gray-400">
            <FaXTwitter size={18} />
          </a>
          <a href="https://www.instagram.com/ishankumax/" target="_blank" rel="noopener noreferrer"
            className="p-2.5 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-gray-400">
            <FaInstagram size={18} />
          </a>
        </div>

        <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-2xl pt-8 mx-auto md:mx-0">
          i'm a 20 y/o cs undergrad. i love building businesses and solving problems. interested in growth, startups, networking and infra. when i'm not cooking stuff, i'm prolly locking another client for my business - <span className="text-white border-b border-white/20 pb-0.5">inthebox.</span>
        </p>
      </div>
    </div>
  )
}

export default Hero
