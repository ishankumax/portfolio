import React, { useState } from 'react';
import { FiBox, FiUsers, FiAward, FiFileText, FiCode, FiTrendingUp, FiFlag } from 'react-icons/fi';

const timelineData = [
  {
    year: '2025',
    label: '2025 - Present',
    entries: [
      {
        icon: <FiBox />,
        title: 'Founder @ InTheBox',
        description: 'Building premium packaging solutions',
      },
      {
        icon: <FiUsers />,
        title: 'Community Lead',
        description: 'Managing tech events & ecosystem',
      }
    ]
  },
  {
    year: '2024',
    label: '2024',
    entries: [
      {
        icon: <FiAward />,
        title: 'Winner at Microsoft',
        description: 'Secured top position at hackathon',
      },
      {
        icon: <FiFileText />,
        title: 'Press Feature',
        description: 'Covered in Hindustan Times',
      },
      {
        icon: <FiCode />,
        title: 'Founding Member',
        description: 'Devlearn developer community',
      }
    ]
  },
  {
    year: '2023',
    label: '2023',
    entries: [
      {
        icon: <FiTrendingUp />,
        title: 'Marketing Head',
        description: 'Led growth for ACM student chapter',
      },
      {
        icon: <FiFlag />,
        title: 'Entrepreneurship Journey',
        description: 'Entered the startup ecosystem',
      }
    ]
  }
];

function Timeline() {
  const [hoveredYear, setHoveredYear] = useState(null);

  return (
    <div className="relative flex flex-col w-full h-full pt-12 font-mono">
      {/* Background Line - strictly at 60px distance */}
      <div className="absolute left-[60px] top-0 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent"></div>
      
      {timelineData.map((item, index) => {
        const isHovered = hoveredYear === item.year;
        const isCurrent = item.year === '2025';
        
        return (
          <div 
            key={item.year} 
            className="relative flex items-center mb-24 cursor-pointer group"
            onMouseEnter={() => setHoveredYear(item.year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            {/* Year Text */}
            <div className={`w-[60px] text-right pr-6 text-sm transition-all duration-300 ${(isHovered || isCurrent) ? 'text-white font-bold' : 'text-gray-600'}`}>
              {item.year}
            </div>

            {/* Dot & Glow - perfectly centered on the line */}
            <div className="absolute left-[60px] -translate-x-1/2 flex items-center justify-center">
              <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${(isHovered || isCurrent) ? 'bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-gray-700 group-hover:bg-gray-500'}`}></div>
            </div>

            {/* Expander Box (Card) hover popup */}
            {/* Starts at 80px, taking 280px width. Total reserved space = 360px */}
            <div 
              className={`absolute left-[80px] top-1/2 -translate-y-1/2 w-[280px] bg-black border border-gray-800 rounded-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all duration-500 origin-left z-50 
                ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-2 pointer-events-none'}`}
            >
              <h3 className="text-gray-300 text-xs tracking-wider uppercase font-bold mb-4">{item.label}</h3>
              
              <div className="flex flex-col gap-4">
                {item.entries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-4 hover:translate-x-1 transition-transform duration-300">
                    <div className="text-gray-400 text-[18px] shrink-0 mt-0.5">{entry.icon}</div>
                    <div>
                      <h4 className="text-gray-100 text-sm font-semibold mb-1">{entry.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
