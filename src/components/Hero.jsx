import React from 'react'
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

function Hero() {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-24 items-start">
      {/* Profile Image */}
      <div className="shrink-0 mx-auto md:mx-0">
        <img 
          src="/pfp.jpg" 
          alt="Ishan Kumar" 
          className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Profile Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">ishan kumar</h1>
        <p className="text-gray-500 mb-6">@ishankumax</p>
        
        <div className="flex justify-center md:justify-start gap-4 mb-8">
          <a href="https://www.instagram.com/ishankumax/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded hover:bg-white hover:text-black transition-all">
            <FaInstagram size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ishankumax/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded hover:bg-white hover:text-black transition-all">
            <FaLinkedin size={18} />
          </a>
          <a href="https://x.com/ishankumax" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded hover:bg-white hover:text-black transition-all">
            <FaXTwitter size={18} />
          </a>
        </div>

        <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-2xl">
          i'm a 20 y/o cs undergrad. i love building businesses and solving problems. interested in growth, startups, networking and infra. when i'm not cooking stuff, i'm prolly locking another client for my business - inthebox.
        </p>
      </div>
    </div>
  )
}

export default Hero
