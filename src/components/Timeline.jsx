import React, { useState } from 'react';

const timelineData = [
  {
    year: '2025',
    label: '2025 - Present',
    entries: [
      {
        icon: '🚀',
        title: 'Founder @ InTheBox',
        description: 'Building premium packaging solutions',
      },
      {
        icon: '👥',
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
        icon: '🏆',
        title: 'Winner at Microsoft',
        description: 'Secured top position at hackathon',
      },
      {
        icon: '📰',
        title: 'Press Feature',
        description: 'Covered in Hindustan Times',
      },
      {
        icon: '💡',
        title: 'Devlearn Founding Member',
        description: 'Built a developer community',
      }
    ]
  },
  {
    year: '2023',
    label: '2023',
    entries: [
      {
        icon: '📈',
        title: 'Marketing Head',
        description: 'Led growth for ACM student chapter',
      },
      {
        icon: '🌟',
        title: 'Entrepreneurship Journey',
        description: 'Entered the startup ecosystem',
      }
    ]
  }
];

function Timeline() {
  const [hoveredYear, setHoveredYear] = useState(null);

  return (
    <div className="relative flex flex-col w-full h-full pt-12">
      {/* Background Line */}
      <div className="absolute left-[3.35rem] top-0 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
      
      {timelineData.map((item, index) => {
        const isHovered = hoveredYear === item.year;
        // Always highlight the most recent year if not hovering over anything
        const isCurrent = item.year === '2025';
        
        return (
          <div 
            key={item.year} 
            className="relative flex items-center mb-[5.5rem] cursor-pointer group"
            onMouseEnter={() => setHoveredYear(item.year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            {/* Year Text */}
            <div className={`w-12 text-right pr-4 text-sm font-mono transition-colors duration-300 ${(isHovered || isCurrent) ? 'text-white' : 'text-gray-500'}`}>
              {item.year}
            </div>

            {/* Dot & Glow */}
            <div className="relative flex items-center justify-center">
              <div className={`absolute w-[6px] h-[6px] rounded-full transition-all duration-300 ${(isHovered || isCurrent) ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-gray-600 group-hover:bg-gray-400'}`}></div>
            </div>

            {/* Expander Box (Card) hover popup */}
            <div 
              className={`absolute left-[4.5rem] top-1/2 -translate-y-1/2 w-72 bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-300 origin-left z-50 
                ${isHovered ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
              <h3 className="text-white text-sm font-bold mb-3">{item.label}</h3>
              
              <div className="flex flex-col gap-2">
                {item.entries.map((entry, i) => (
                  <div key={i} className="bg-[#141414] border border-gray-800 rounded-lg p-3 flex items-start gap-3 hover:bg-[#1a1a1a] transition-colors">
                    <div className="text-base shrink-0 mt-0.5">{entry.icon}</div>
                    <div>
                      <h4 className="text-white text-xs font-bold mb-1">{entry.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{entry.description}</p>
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
