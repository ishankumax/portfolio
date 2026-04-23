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
function Timeline({ isMobileMode = false, activeYear = null }) {
  
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
        <div className="timeline-track absolute left-[30px] md:left-[35px] top-10 bottom-10 w-[3px] shadow-[0_0_15px_var(--accent-purple-glow)]" style={{ background: 'linear-gradient(to bottom, transparent, var(--accent-purple), transparent)', opacity: 0.6 }}></div>
        
        <div className="flex flex-col gap-16">
          {timelineData.map((yearGroup, yIndex) => {
            const isYearActive = activeYear === yearGroup.year;
            return (
            <div key={yearGroup.year} className="relative z-10">
              
              {/* Yearly Marker (e.g. "2026" + Glowing Dot) */}
              <div
                className="absolute left-0 top-3 flex items-center w-[50px] md:w-[60px] justify-between pr-[4px] md:pr-[6px] backdrop-blur-md z-30 py-1.5 rounded-r-md transition-all duration-500"
                style={{ backgroundColor: 'var(--bg-base-95)' }}
              >
                <span
                  className="timeline-year-label text-[10px] md:text-[12px] font-mono tracking-tighter font-bold transition-all duration-500"
                  style={{ 
                    color: isYearActive ? 'var(--accent-purple)' : 'var(--text-primary)', 
                    textShadow: isYearActive ? '0 0 15px var(--accent-purple-glow)' : 'none',
                  }}
                >
                  '{yearGroup.year.slice(2)}
                </span>
                {/* Dot — glow when year is active */}
                <div className="relative flex justify-center items-center">
                  <div
                    className={`timeline-dot w-[10px] h-[10px] rounded-full transition-all duration-500 ${isYearActive ? 'scale-150' : ''}`}
                    style={{
                      backgroundColor: 'var(--accent-purple)',
                      boxShadow: isYearActive
                        ? '0 0 0 5px var(--accent-purple-faint), 0 0 25px var(--accent-purple-glow)'
                        : '0 0 12px var(--accent-purple-glow)'
                    }}
                  />
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
                      className="relative border-b last:border-transparent cursor-pointer"
                      style={{ borderColor: 'var(--border-subtle)' }}
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
                        className={`pl-10 md:pl-[50px] py-7 pr-2 transition-all duration-300 group/row flex items-center justify-between border-l-2 ${
                          isActive ? 'bg-[color:var(--accent-purple-faint)]' : 'border-transparent'
                        }`}
                        style={{ borderLeftColor: isActive ? 'var(--accent-purple)' : 'transparent' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoleClick(item);
                        }}
                      >
                        <span className={`timeline-role-label font-mono text-sm transition-colors duration-300 ${isActive ? 'font-bold' : 'group-hover/row:text-[color:var(--text-primary)]'}`} style={{ color: isActive ? 'var(--accent-purple)' : 'var(--text-muted)' }}>
                          {item.role}
                        </span>
                        {/* Nav arrow — visible on hover or active */}
                        <span className={`timeline-nav-arrow font-mono text-[10px] transition-all duration-300 ${
                          isActive
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-1 opacity-0 group-hover/row:translate-x-0 group-hover/row:opacity-60'
                        }`} style={{ color: isActive ? 'var(--accent-purple)' : 'var(--text-muted)' }}>
                          →
                        </span>
                      </div>

                      {/* Expanding Details Card */}
                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          
                          <div className="ml-16 md:ml-[110px] mr-4 md:mr-0 mb-10 mt-2 backdrop-blur-xl border rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base-95)', borderColor: 'var(--border-card)' }}>
                            
                            <div className="absolute top-0 right-0 w-48 h-48 blur-[50px] rounded-full pointer-events-none" style={{ backgroundColor: 'var(--accent-purple-faint)' }}></div>

                            <div className="relative z-10">
                              <h3 className="font-semibold tracking-widest text-[11px] uppercase opacity-70 mb-4" style={{ color: 'var(--text-muted)' }}>{item.company}</h3>
                              <p className="font-mono text-[11px] mb-8 tracking-wider" style={{ color: 'var(--text-muted)' }}>{item.date}</p>
                              
                              <div className="mb-10 border-t" style={{ borderColor: 'var(--border-subtle)' }}></div>

                              <h4 className="font-bold text-2xl mb-10 tracking-tight leading-[1.3]" style={{ color: 'var(--text-primary)' }}>{item.role}</h4>
                              
                              <ul className="flex flex-col gap-6 mb-8">
                                {item.bullets.map((bullet, i) => (
                                  <li key={i} className="flex items-start text-sm leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="mr-4 mt-[6px] opacity-60 text-xs" style={{ color: 'var(--accent-purple)' }}>/</span>
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
                                className="mt-8 text-[11px] font-mono hover:text-[color:var(--accent-purple)] transition-colors flex items-center gap-2 group/link uppercase tracking-widest"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                <span>view details</span>
                                <span className="group-hover/link:translate-x-1 transition-all duration-300">→</span>
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
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Timeline;
