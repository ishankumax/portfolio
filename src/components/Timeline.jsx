import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { timelineData } from '../data/timelineData';

// ============================================================================
// UTILITY: Custom Easing Scroll
// ----------------------------------------------------------------------------
// Browsers natively execute `scrollIntoView` too abruptly for premium layouts.
// This function mathematically interpolates the scroll physically pixel-by-pixel 
// using a beautiful 'cubic' easing curve for ultra-soft, slow transitions.
// ============================================================================
let scrollRafId = null;

const softScrollTo = (targetY, duration = 1200, container = window) => {
  // Seamlessly cancel any currently running scroll animation so it redirects natively!
  if (scrollRafId) window.cancelAnimationFrame(scrollRafId);

  const isWindow = container === window;
  const startY = isWindow ? window.scrollY : container.scrollTop;
  const difference = targetY - startY;
  let startTime = null;

  // Easing function: easeInOutQuart
  const ease = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = currentTime - startTime;
    const normalizedTime = Math.min(progress / duration, 1);
    
    const nextY = startY + difference * ease(normalizedTime);
    
    if (isWindow) {
      window.scrollTo(0, nextY);
    } else {
      container.scrollTop = nextY;
    }

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
// handles scrolling document flow. Roles are clickable and navigate to /experience.
// ============================================================================
function Timeline({ isMobileMode = false }) {
  
  const [activeId, setActiveId] = useState(null);
  const hoverTimeout = useRef(null);
  const itemRefs = useRef({});
  const navigate = useNavigate();

  // ============================================================================
  // FUNCTION: handleMouseEnter(id)
  // ============================================================================
  const handleMouseEnter = (id) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    
    hoverTimeout.current = setTimeout(() => {
      setActiveId(id);
      
      const el = itemRefs.current[id];
      if (el) {
        const container = el.closest('.overflow-y-auto') || window;
        const isWindow = container === window;
        
        const rect = el.getBoundingClientRect();
        
        let containerCenter = window.innerHeight / 2;
        let currentScroll = window.scrollY;
        let containerHeight = window.innerHeight;
        
        if (!isWindow) {
           const containerRect = container.getBoundingClientRect();
           containerCenter = containerRect.top + (containerRect.height / 2);
           currentScroll = container.scrollTop;
           containerHeight = containerRect.height;
        }

        const elementCenter = rect.top + (rect.height / 2);
        const distanceFromCenter = Math.abs(containerCenter - elementCenter);
        const safeZone = containerHeight * 0.42; 

        if (distanceFromCenter > safeZone && !isMobileMode) {
          const targetY = currentScroll + (elementCenter - containerCenter);
          softScrollTo(targetY, 1400, container); 
        }
      }
    }, 60);
  };

  // ============================================================================
  // FUNCTION: handleRoleClick(item)
  // Navigate to the dedicated experience page with the role's anchor
  // ============================================================================
  const handleRoleClick = (item) => {
    navigate(`/experience#${item.slug}`);
  };

  return (
    <div 
      className="relative font-mono py-6 w-full"
      onMouseLeave={() => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setActiveId(null);
      }}
    >
      
      <div className="relative flex flex-col w-full">
        {/* The single vertical timeline track — centered precisely with the dots */}
        <div className="absolute left-[50px] md:left-[70px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-[#818cf8]/40 to-transparent shadow-[0_0_10px_rgba(129,140,248,0.15)]"></div>
        
        <div className="flex flex-col gap-16">
          {timelineData.map((yearGroup, yIndex) => (
            <div key={yearGroup.year} className="relative z-10">
              
              {/* Yearly Marker (e.g. "2026" + Glowing Dot) */}
              <div className="absolute left-0 top-3 flex items-center w-[60px] md:w-[84px] justify-between pr-[8px] md:pr-[12px] bg-black/95 backdrop-blur-md z-30 py-1.5 rounded-r-md">
                <span className="text-[15px] font-mono tracking-widest text-white font-bold brightness-125">
                  {yearGroup.year}
                </span>
                {/* Dot — precisely centered on the track */}
                <div className="relative flex justify-center items-center">
                  <div className={`w-[8px] h-[8px] rounded-full bg-[#818cf8] shadow-[0_0_12px_rgba(129,140,248,0.8)] ${yIndex === 0 ? 'ring-4 ring-indigo-500/20' : ''}`}></div>
                </div>
              </div>

              {/* Role entries for this year */}
              <div className="flex flex-col">
                {yearGroup.items.map((item) => {
                  const isActive = activeId === item.id;
                  
                  return (
                    <div 
                      key={item.id} 
                      ref={el => itemRefs.current[item.id] = el}
                      className="relative border-b border-gray-800/60 last:border-transparent cursor-pointer"
                      onMouseEnter={() => !isMobileMode && handleMouseEnter(item.id)}
                      onClick={() => {
                        if (isMobileMode) {
                          setActiveId(prev => prev === item.id ? null : item.id);
                        } else {
                          handleMouseEnter(item.id);
                        }
                      }}
                    >
                    {/* Role heading — click navigates to /experience#slug */}
                      <div 
                        className={`pl-16 md:pl-[110px] py-7 pr-6 transition-all duration-300 group/row flex items-center justify-between ${
                          isActive ? 'bg-[#818cf8]/[0.07] border-l-2 border-[#818cf8]/50' : 'hover:bg-[#818cf8]/[0.03] border-l-2 border-transparent'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoleClick(item);
                        }}
                      >
                        <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? 'text-[#818cf8] font-bold' : 'text-gray-500 group-hover/row:text-gray-300'}`}>
                          {item.role}
                        </span>
                        {/* Nav arrow — visible on hover or active */}
                        <span className={`font-mono text-[10px] transition-all duration-300 ${
                          isActive
                            ? 'text-[#818cf8] translate-x-0 opacity-100'
                            : 'text-gray-700 -translate-x-1 opacity-0 group-hover/row:translate-x-0 group-hover/row:opacity-60 group-hover/row:text-[#818cf8]'
                        }`}>
                          →
                        </span>
                      </div>

                      {/* Expanding Details Card */}
                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          
                          <div className="ml-16 md:ml-[110px] mr-4 md:mr-8 mb-10 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                            
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[50px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10">
                              <h3 className="text-gray-400/80 font-semibold tracking-widest text-[11px] uppercase opacity-70 mb-4">{item.company}</h3>
                              <p className="text-gray-500 font-mono text-[11px] mb-8 tracking-wider">{item.date}</p>
                              
                              <div className="mb-10 border-t border-white/5"></div>

                              <h4 className="text-white font-bold text-2xl mb-10 tracking-tight leading-[1.3]">{item.role}</h4>
                              
                              <ul className="flex flex-col gap-6 mb-8">
                                {item.bullets.map((bullet, i) => (
                                  <li key={i} className="flex items-start text-sm text-gray-400/90 leading-relaxed font-sans">
                                    <span className="mr-4 text-[#818cf8] mt-[6px] opacity-60 text-xs">/</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Deep dive link */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoleClick(item);
                                }}
                                className="mt-8 text-[11px] font-mono text-gray-500 hover:text-[#818cf8] transition-colors flex items-center gap-2 group/link uppercase tracking-widest"
                              >
                                <span>view details</span>
                                <span className="group-hover/link:translate-x-1 group-hover/link:text-[#818cf8] transition-all duration-300">→</span>
                              </button>
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
