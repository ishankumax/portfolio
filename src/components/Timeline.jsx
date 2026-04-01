import React, { useState, useRef } from 'react';

// ============================================================================
// DATA STRUCTURE: timelineData
// ----------------------------------------------------------------------------
// This array defines your chronological history, neatly grouped by year.
// Storing data like this keeps your main component completely clean and allows 
// you to map over it naturally. Each item contains specific data nodes (role,
// company, date, bullets) that populate the expanding frosted glass cards.
// ============================================================================
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

// ============================================================================
// UTILITY: Custom Easing Scroll
// ----------------------------------------------------------------------------
// Browsers natively execute `scrollIntoView` too abruptly for premium layouts.
// This function mathematically interpolates the scroll physically pixel-by-pixel 
// using a beautiful 'cubic' easing curve for ultra-soft, slow transitions.
// ============================================================================
let scrollRafId = null;

const softScrollTo = (targetY, duration = 1200) => {
  // Seamlessly cancel any currently running scroll animation so it redirects natively!
  if (scrollRafId) window.cancelAnimationFrame(scrollRafId);

  const startY = window.scrollY;
  const difference = targetY - startY;
  let startTime = null;

  // Easing function: easeInOutQuart
  // Starts extremely slow, accelerates, and gracefully decelerates to a halt.
  const ease = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = currentTime - startTime;
    const normalizedTime = Math.min(progress / duration, 1);
    
    window.scrollTo(0, startY + difference * ease(normalizedTime));

    if (progress < duration) {
      scrollRafId = window.requestAnimationFrame(step);
    }
  };

  scrollRafId = window.requestAnimationFrame(step);
};

// ============================================================================
// COMPONENT: Timeline
// ----------------------------------------------------------------------------
// Re-usable vertical scrolling timeline that tracks 'active states' and elegantly
// handles scrolling document flow.
// ============================================================================
function Timeline({ isMobileMode = false }) {
  
  // ============================================================================
  // STATE: activeId
  // Stores the unique string ID of whichever timeline item your mouse is currently on.
  // When an ID updates here, React immediately transitions that specific item's 
  // nested details card from 'grid-rows-[0fr]' (hidden) to 'grid-rows-[1fr]' (visible).
  // ============================================================================
  const [activeId, setActiveId] = useState(null);

  // ============================================================================
  // REFS: isScrolling, scrollTimeout, itemRefs
  // - hoverTimeout: Adds a tiny imperceptible delay to stabilize transitions and 
  //   completely eliminate flickering when rapidly dragging the mouse across items.
  // - itemRefs: A dictionary object storing direct HTML DOM elements. This allows
  //   us to target exact role entries and scroll straight to them.
  // ============================================================================
  const hoverTimeout = useRef(null);
  const itemRefs = useRef({});

  // ============================================================================
  // FUNCTION: handleMouseEnter(id)
  // ----------------------------------------------------------------------------
  // Fired instantly when your cursor touches any minimal role heading.
  // 1. Assigns the `activeId` state so the accordion opens for this item.
  // 2. Instructs the custom math function to exquisitely glide the entire webpage 
  //    so the target centers itself flawlessly over 1.4 seconds.
  // ============================================================================
  const handleMouseEnter = (id) => {
    // Clear any existing timeouts to prevent race conditions if rapidly scrubbing
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    
    // Add a stabilizing 60ms delay before capturing the hover
    hoverTimeout.current = setTimeout(() => {
      // Instantly assign the state to open the exact hovered item (closes all others)
      setActiveId(id);
      
      const el = itemRefs.current[id];
      if (el) {
        const rect = el.getBoundingClientRect();
        const elementAbsoluteTop = rect.top + window.scrollY;
        
        // We calculate how far the element physically is from the exact center of the screen
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + (rect.height / 2);
        const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
        
        // SAFE ZONE THRESHOLD:
        // By setting this to 0.42, 84% of your entire screen is an absolute "safe zone".
        // The page will now ONLY auto-scroll if you hover something literally squeezed into 
        // the top 8% or bottom 8% of your physical monitor.
        const safeZone = window.innerHeight * 0.42; 

        if (distanceFromCenter > safeZone && !isMobileMode) {
          // Only glide the camera if it's explicitly not in a mobile drawer!
          const targetY = elementAbsoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          softScrollTo(targetY, 1400); 
        }
      }
    }, 60);
  };

  return (
    // The outermost wrapper monitors when the mouse physical leaves the entire component.
    // If you stray outside, it sets activeId to null, elegantly collapsing any open cards!
    <div 
      className="relative font-mono py-6 w-full"
      onMouseLeave={() => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setActiveId(null);
      }}
    >
      
      <div className="relative flex flex-col w-full">
        {/* The single vertical gray timeline track running behind all points */}
        <div className="absolute left-[70px] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

        <div className="flex flex-col gap-6">
          {timelineData.map((yearGroup, yIndex) => (
            <div key={yearGroup.year} className="relative z-10">
              
              {/* Yearly Marker (e.g. "2025" + Glowing Dot) */}
              <div className="absolute left-0 top-3 flex items-center w-[70px] justify-between pr-4 bg-black/80 backdrop-blur-sm z-20">
                <span className={`text-[13px] font-mono transition-colors duration-300 ${yIndex === 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                  {yearGroup.year}
                </span>
                <div className="relative flex justify-center items-center w-2 h-2 translate-x-[5px]">
                  <div className={`w-1.5 h-1.5 rounded-full ${yIndex === 0 ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-125' : 'bg-gray-600'}`}></div>
                </div>
              </div>

              {/* The array block for all the distinct professional roles matching that exact year */}
              <div className="flex flex-col">
                {yearGroup.items.map((item) => {
                  const isActive = activeId === item.id;
                  
                  return (
                    // We bind the ref callback to save this DOM wrapper permanently for scrolling mapping context
                    <div 
                      key={item.id} 
                      ref={el => itemRefs.current[item.id] = el}
                      className="relative border-b border-gray-800/60 last:border-transparent cursor-pointer"
                      onMouseEnter={() => !isMobileMode && handleMouseEnter(item.id)}
                      onClick={() => {
                        if (isMobileMode) {
                          // Tap-friendly logic purely for mobile navigation
                          setActiveId(prev => prev === item.id ? null : item.id);
                        } else {
                          // Just smoothly scroll into focus if clicked manually on desktop
                          handleMouseEnter(item.id);
                        }
                      }}
                    >
                      {/* Very subtle clickable header you see prior to hovering anything */}
                      <div className={`pl-[100px] py-5 pr-4 transition-colors duration-300 ${isActive ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}>
                        <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>
                          {item.role}
                        </span>
                      </div>

                      {/* The fluid expanding Details Card. 
                          It is structurally bound inside the role so it intrinsically pushes other elements down linearly */}
                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          
                          {/* Inner detailed custom UI mapping. Very highly styled with dark frosted styling matching product landers */}
                          <div className="ml-[100px] mr-6 mb-6 mt-1 bg-[#0b0c10]/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                            
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10">
                              <h3 className="text-gray-100 font-semibold tracking-wide text-sm">{item.company}</h3>
                              <p className="text-gray-500 font-mono text-[10px] mt-1.5 tracking-wider">{item.date}</p>
                              
                              <div className="my-3 border-t border-gray-800/80"></div>

                              <h4 className="text-white font-semibold text-sm mb-3 tracking-wide">{item.role}</h4>
                              
                              <ul className="flex flex-col gap-2">
                                {/* Auto-loops your specific achievement pointers so they populate perfectly aligned below your timeline marker */}
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

    </div>
  );
}

export default Timeline;
