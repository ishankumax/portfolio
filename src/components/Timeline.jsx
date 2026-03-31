import React, { useState } from 'react';

const timelineData = [
  {
    id: 1,
    company: "InTheBox",
    role: "Chief Marketing Officer",
    date: "Nov 2024 - Present",
    location: "Chandigarh, India",
    description: "Driving innovation and excellence in packaging, ensuring that every product's first impression speaks volumes. Focused on quality, sustainability, and customer-centric solutions.",
    skills: "Team Leadership, Operations Management"
  },
  {
    id: 2,
    company: "ACM Chapter",
    role: "Head of Marketing",
    date: "Nov 2024 - Jul 2025",
    location: "Chitkara Univ.",
    description: "Organised Annual ACM-W India Lady Ada & Lady Ada Facilitation.",
    skills: "Event Planning, Execution"
  },
  {
    id: 3,
    company: "ACM Chapter",
    role: "Marketing Exec.",
    date: "Sep 2024 - Nov 2024",
    location: "Chitkara Univ.",
    description: "Organised ISCCSC and 1st ICSCCS.",
    skills: "Marketing, Outreach"
  },
  {
    id: 4,
    company: "Coding Blocks",
    role: "Graphics Exec.",
    date: "Dec 2023 - May 2025",
    location: "CUIET",
    description: "Organised India's biggest Web3 Hackathon. Honoured for graphic achievements.",
    skills: "Graphic Design, Web UI"
  },
  {
    id: 5,
    company: "DevLearn",
    role: "Ecosystem Mgr.",
    date: "May 2024 - Feb 2025",
    location: "Chandigarh, India",
    description: "Managed overall community ecosystem and organised the Co Learning Camp.",
    skills: "Operations Management"
  },
  {
    id: 6,
    company: "DevLearn",
    role: "Graphics Head",
    date: "Feb 2024 - May 2024",
    location: "Chandigarh, India",
    description: "Led graphic and web design initiatives.",
    skills: "Graphic Design, Web Design"
  },
  {
    id: 7,
    company: "Kotlin Delhi",
    role: "Campus Ambassador",
    date: "Jun 2024 - Jul 2024",
    location: "Delhi, India",
    description: "Promoted KotlinConfDelhi and managed local student outreach.",
    skills: "Student Outreach"
  },
  {
    id: 8,
    company: "GFG CUIET",
    role: "Design & Branding",
    date: "Jan 2024 - Jul 2024",
    location: "Rajpura, Punjab",
    description: "Managed the 23-24 Team branding and general graphic design.",
    skills: "Graphic Design, Branding"
  },
  {
    id: 9,
    company: "Coding Ninjas",
    role: "Outreach Exec.",
    date: "Jan 2024 - Feb 2024",
    location: "CUIET Chapter",
    description: "Managed outreach campaigns for Utkrishti 2024.",
    skills: "Student Outreach"
  }
];

function Timeline() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="relative flex flex-col w-full font-mono py-12">
      {/* Vertical Track Line */}
      <div className="absolute left-[130px] top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent z-0"></div>
      
      {timelineData.map((item) => {
        const isHovered = hoveredId === item.id;
        
        return (
          <div 
            key={item.id} 
            className="relative flex group"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Left Side: Company & Date Context */}
            <div className="w-[130px] text-right pr-5 pt-1 shrink-0 z-10 bg-black/50 backdrop-blur-sm relative">
              <div className={`text-xs font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
                {item.company}
              </div>
              <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">
                {item.date.split('-')[0].trim()}
              </div>
            </div>

            {/* Center Node / Dot */}
            <div className="absolute left-[130px] top-2.5 -translate-x-1/2 flex items-center justify-center z-20">
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-white scale-[1.7] shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-gray-700'
                }`}
              ></div>
            </div>

            {/* Right Side: Accordion Content */}
            <div className="pl-6 pb-5 flex-1 text-left z-10 relative bg-black/50 backdrop-blur-sm">
              <h3 className={`text-sm font-semibold transition-colors duration-300 ${isHovered ? 'text-gray-100' : 'text-gray-400'}`}>
                {item.role}
              </h3>
              
              {/* Accordion Logic: grid-rows-[1fr] expands safely without floating overlaps */}
              <div 
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isHovered ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2 pb-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest bg-gray-900 w-fit px-2 py-0.5 rounded">
                      {item.date} {item.location && `• ${item.location}`}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-relaxed pr-2">
                      {item.description}
                    </p>
                    {item.skills && (
                      <p className="text-[10px] text-gray-300 mt-1">
                        <span className="text-gray-600 font-bold uppercase tracking-wider">Skills: </span> 
                        {item.skills}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
