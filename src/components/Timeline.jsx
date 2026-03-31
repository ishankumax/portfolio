import React, { useState, useRef } from 'react';

const timelineData = [
  {
    year: '2025',
    items: [
      {
        id: '1',
        role: 'Chief Marketing Officer',
        company: 'InTheBox',
        date: 'NOV 2024 - PRESENT',
        bullets: [
          'Driving innovation and packaging excellence',
          'Focusing on quality and sustainability',
          'Delivering customer-centric solutions'
        ]
      },
      {
        id: '2',
        role: 'Head of Marketing',
        company: 'ACM Student Chapter',
        date: 'NOV 2024 - JUL 2025',
        bullets: [
          'Organised Annual ACM-W India Lady Ada',
          'Managed Lady Ada Facilitation'
        ]
      },
      {
        id: '3',
        role: 'Ecosystem Manager',
        company: 'DevLearn',
        date: 'MAY 2024 - FEB 2025',
        bullets: [
          'Managed community and ecosystem',
          'Organised the Co Learning Camp',
          'Handled event and operations management'
        ]
      },
      {
        id: '4',
        role: 'Graphics Exec.',
        company: 'Coding Blocks',
        date: 'DEC 2023 - MAY 2025',
        bullets: [
          "Organised India's biggest Web3 Hackathon",
          'Honoured for graphic design and web design'
        ]
      }
    ]
  },
  {
    year: '2024',
    items: [
      {
        id: '5',
        role: 'Marketing Exec.',
        company: 'ACM Student Chapter',
        date: 'SEP 2024 - NOV 2024',
        bullets: [
          'Organised ISCCSC',
          'Organised 1st ICSCCS',
          'Managed marketing and student outreach'
        ]
      },
      {
        id: '6',
        role: 'Campus Ambassador',
        company: 'Kotlin Delhi',
        date: 'JUN 2024 - JUL 2024',
        bullets: [
          'Promoted KotlinConfDelhi',
          'Managed selection mails and outreach'
        ]
      },
      {
        id: '7',
        role: 'Design & Branding',
        company: 'GFG CUIET',
        date: 'JAN 2024 - JUL 2024',
        bullets: [
          'Managed branding for 23-24 Team',
          'Led group photo graphic design'
        ]
      },
      {
        id: '8',
        role: 'Graphics Head',
        company: 'DevLearn',
        date: 'FEB 2024 - MAY 2024',
        bullets: [
          'Led graphic design team',
          'Managed web design initiatives'
        ]
      },
      {
        id: '9',
        role: 'Outreach Exec.',
        company: 'Coding Ninjas',
        date: 'JAN 2024 - FEB 2024',
        bullets: [
          'Managed outreach for Utkrishti 2024',
          'Led student outreach initiatives'
        ]
      }
    ]
  },
  {
    year: '2023',
    items: [
      {
        id: '10',
        role: 'Graphics Exec.',
        company: 'DevLearn',
        date: 'NOV 2023 - FEB 2024',
        bullets: [
          'Executed remote graphic design tasks',
          'Supported community visual identity'
        ]
      }
    ]
  }
];

function Timeline() {
  const [activeId, setActiveId] = useState(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const itemRefs = useRef({});

  const handleMouseEnter = (id) => {
    // If the browser is currently executing our smooth scroll, bypass triggering new hovers.
    // This perfectly prevents the jittering and unwanted cascading layout shifts!
    if (isScrolling.current) return;
    
    setActiveId(id);
    
    // Once hovered, instruct the browser to elegantly scroll this item to the center
    // aligning visually with the fixed center-right card location.
    const el = itemRefs.current[id];
    if (el) {
      isScrolling.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      // Unlock hovers after scrolling resolves. 800ms covers standard modern smooth native scrolling.
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    }
  };

  const activeItem = timelineData.flatMap(y => y.items).find(i => i.id === activeId);

  return (
    <div className="relative font-mono py-6 w-full">
      {/* Timeline List (Scrolling Left side) */}
      <div className="relative flex flex-col w-full">
        {/* Primary Vertical Track Line */}
        <div className="absolute left-[70px] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

        <div className="flex flex-col gap-6">
          {timelineData.map((yearGroup, yIndex) => (
            <div key={yearGroup.year} className="relative z-10">
              
              {/* Year Node (Only render once per year block) */}
              <div className="absolute left-0 top-3 flex items-center w-[70px] justify-between pr-4 bg-black/80 backdrop-blur-sm z-20">
                <span className={`text-[13px] font-mono transition-colors duration-300 ${yIndex === 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                  {yearGroup.year}
                </span>
                <div className="relative flex justify-center items-center w-2 h-2 translate-x-[5px]">
                  <div className={`w-1.5 h-1.5 rounded-full ${yIndex === 0 ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-125' : 'bg-gray-600'}`}></div>
                </div>
              </div>

              {/* Role List for the Year */}
              <div className="flex flex-col">
                {yearGroup.items.map((item) => {
                  const isActive = activeId === item.id;
                  
                  return (
                    <div 
                      key={item.id} 
                      ref={el => itemRefs.current[item.id] = el}
                      className="relative border-b border-gray-800/60 last:border-transparent cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                    >
                      {/* Minimal Role Heading */}
                      <div className={`pl-[100px] py-5 pr-4 transition-colors duration-300 ${isActive ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}>
                        <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>
                          {item.role}
                        </span>
                      </div>

                      {/* Expanded Inline Card (Accordion effect) */}
                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="ml-[100px] mr-6 mb-6 mt-1 bg-[#0b0c10]/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                            
                            {/* Subtle Glow Highlight Inside Card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10">
                              <h3 className="text-gray-100 font-semibold tracking-wide text-sm">{item.company}</h3>
                              <p className="text-gray-500 font-mono text-[10px] mt-1.5 tracking-wider">{item.date}</p>
                              
                              <div className="my-3 border-t border-gray-800/80"></div>

                              <h4 className="text-white font-semibold text-sm mb-3 tracking-wide">{item.role}</h4>
                              
                              <ul className="flex flex-col gap-2">
                                {item.bullets.map((bullet, i) => (
                                  <li key={i} className="flex items-start text-[11px] text-gray-400 leading-relaxed font-sans">
                                    <span className="mr-2.5 text-gray-600 mt-[2px]">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Hover details now expand inline beneath the headings to strictly prevent overlapping main profile content on the right side. */}

    </div>
  );
}

export default Timeline;
