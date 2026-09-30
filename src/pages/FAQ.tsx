import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqData, faqGroups } from '../content/faqContent';

gsap.registerPlugin(ScrollTrigger);

type GroupData = {
  id: string;
  label: string;
  categories: string[];
};

export default function FAQ() {
  const [activeGroup, setActiveGroup] = useState<string>(faqGroups[0].id);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentGroup = faqGroups.find((g: GroupData) => g.id === activeGroup) || faqGroups[0];
  
  const filteredFaqs = faqData.filter((faq: any) => {
    if (activeCategory) {
      return faq.category === activeCategory;
    }
    return currentGroup.categories.includes(faq.category);
  });

  const getCategoryCount = (cat: string) => faqData.filter((f: any) => f.category === cat).length;
  const getGroupCount = (group: GroupData) => faqData.filter((f: any) => group.categories.includes(f.category)).length;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Helper to binary-search the SVG path length at a specific Y coordinate
      const findPathLengthAtY = (pathElement: SVGPathElement, targetY: number, totalLength: number) => {
        let low = 0;
        let high = totalLength;
        let best = 0;
        for (let i = 0; i < 20; i++) {
          const mid = (low + high) / 2;
          const pt = pathElement.getPointAtLength(mid);
          if (pt.y < targetY) {
            low = mid;
          } else {
            high = mid;
          }
          best = mid;
        }
        return best;
      };

      const updatePathAndTimeline = () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.id === "faqJourney") st.kill();
        });

        const timeline = document.querySelector('.faq-timeline-container');
        if (!timeline) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const nodeItems = gsap.utils.toArray('.faq-node') as HTMLElement[];
        
        const nodesData = nodeItems.map(item => {
          const anchor = item.querySelector('.faq-anchor') as HTMLElement;
          if(!anchor) return null;
          const rect = anchor.getBoundingClientRect();
          return {
            x: (rect.left + rect.width / 2) - timelineRect.left,
            y: (rect.top + rect.height / 2) - timelineRect.top,
            item,
            anchor,
            dot: item.querySelector('.faq-dot')
          };
        }).filter(Boolean) as any[];
        
        if (nodesData.length === 0) return;

        const pathNodes = [
          { x: 30, y: 0 },
          ...nodesData.map(n => ({ x: n.x, y: n.y })),
          { x: 30, y: timelineRect.height }
        ];

        let d = `M ${pathNodes[0].x} ${pathNodes[0].y}`;
        for (let i = 1; i < pathNodes.length; i++) {
          const prev = pathNodes[i - 1];
          const curr = pathNodes[i];
          const dy = curr.y - prev.y;
          const cp1y = prev.y + dy * 0.5;
          const cp2y = curr.y - dy * 0.5;
          d += ` C ${prev.x} ${cp1y}, ${curr.x} ${cp2y}, ${curr.x} ${curr.y}`;
        }

        const bgPath = document.getElementById('faq-journey-bg') as any;
        const activePath = document.getElementById('faq-journey-active') as any;
        
        if (!bgPath || !activePath) return;

        bgPath.setAttribute('d', d);
        activePath.setAttribute('d', d);
        
        const pathLength = activePath.getTotalLength();
        gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        nodesData.forEach(node => {
          const l = findPathLengthAtY(activePath, node.y, pathLength);
          node.progress = l / pathLength;
        });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            id: "faqJourney",
            trigger: '.faq-timeline-container',
            start: "top 50%",
            end: "bottom 50%",
            scrub: true,
            onUpdate: (self) => {
              const point = activePath.getPointAtLength(self.progress * pathLength);
              gsap.set('#faq-journey-dot', { 
                attr: { cx: point.x, cy: point.y },
                opacity: self.progress > 0.01 && self.progress < 0.99 ? 1 : 0
              });
            }
          }
        });

        masterTl.fromTo(activePath, 
          { strokeDashoffset: pathLength }, 
          { strokeDashoffset: 0, ease: "none", duration: 100 }, 
          0
        );

        nodesData.forEach(node => {
          const t = node.progress * 100;
          if (node.dot) {
            masterTl.fromTo(node.dot,
              { backgroundColor: "rgba(0,0,0,0.1)", scale: 1 },
              { backgroundColor: "#b89a6b", scale: 1.5, duration: 4, ease: "power2.out" },
              t
            );
          }
        });
      };

      setTimeout(updatePathAndTimeline, 350);
      window.addEventListener('resize', updatePathAndTimeline);
      return () => window.removeEventListener('resize', updatePathAndTimeline);

    }, containerRef);
    return () => ctx.revert();
  }, [filteredFaqs, activeCategory, activeGroup, openQuestion]); // re-run when content changes

  return (
    <div ref={containerRef} className="w-full bg-[#F3F0E8] text-[#1A1F16] selection:bg-[#C7A34A]/30 min-h-screen font-sans relative">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full relative z-10">
        {/* HEADER */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-[#C7A34A] tracking-[0.2em] uppercase text-xs md:text-sm font-medium mb-4 block">FAQs</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-editorial tracking-tight mb-6">
            Questions, <em className="italic text-[#C7A34A]">Answered</em>
          </h1>
          <p className="text-[#1A1F16]/60 text-lg max-w-xl mx-auto leading-relaxed font-light">
            Over {faqData.length} answers on land, legal process, and construction — organized so you can find yours in seconds.
          </p>
        </div>

        {/* GROUP TABS */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12 border-b border-[#1A1F16]/10 pb-4 overflow-x-auto no-scrollbar">
          {faqGroups.map((group: GroupData) => (
            <button
              key={group.id}
              onClick={() => {
                setActiveGroup(group.id);
                setActiveCategory(null);
                setOpenQuestion(null);
              }}
              className={`whitespace-nowrap pb-2 text-sm md:text-base tracking-widest uppercase font-medium transition-colors relative ${
                activeGroup === group.id ? 'text-[#C7A34A]' : 'text-[#1A1F16]/40 hover:text-[#1A1F16]/70'
              }`}
            >
              {group.label} <span className="ml-2 text-xs opacity-60">({getGroupCount(group)})</span>
              {activeGroup === group.id && (
                <motion.div
                  layoutId="groupTabIndicator"
                  className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#C7A34A]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
          {/* SIDEBAR (CATEGORIES) */}
          <aside className="w-full lg:w-1/4 lg:sticky top-32 h-max">
            <h3 className="text-xs tracking-[0.2em] uppercase text-[#1A1F16]/40 mb-6 font-semibold">Filter by Category</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setOpenQuestion(null);
                }}
                className={`text-left px-4 py-3 rounded-md transition-all text-sm md:text-base ${
                  activeCategory === null 
                    ? 'bg-[#1A1F16]/5 text-[#C7A34A] font-medium border border-[#C7A34A]/20' 
                    : 'text-[#1A1F16]/60 hover:bg-[#1A1F16]/5'
                }`}
              >
                All in {currentGroup.label}
                <span className="float-right opacity-60 text-xs mt-1">{getGroupCount(currentGroup)}</span>
              </button>
              
              {currentGroup.categories.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenQuestion(null);
                  }}
                  className={`text-left px-4 py-3 rounded-md transition-all text-sm md:text-base ${
                    activeCategory === cat 
                      ? 'bg-[#1A1F16]/5 text-[#C7A34A] font-medium border border-[#C7A34A]/20' 
                      : 'text-[#1A1F16]/60 hover:bg-[#1A1F16]/5'
                  }`}
                >
                  {cat}
                  <span className="float-right opacity-60 text-xs mt-1">{getCategoryCount(cat)}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* FAQ LIST */}
          <div className="w-full lg:w-3/4 faq-timeline-container relative">
            
            {/* The SVG Journey Path Background */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full z-0" style={{ top: 0, left: 0 }}>
              <path id="faq-journey-bg" stroke="#1A1F16" strokeOpacity="0.08" strokeWidth="1" fill="none" />
              <path id="faq-journey-active" stroke="#b89a6b" strokeWidth="2" fill="none" />
              <circle id="faq-journey-dot" r="4" fill="#1A1F16" opacity="0" />
            </svg>

            <div className="mb-8 pl-12">
              <h3 className="text-xl md:text-2xl font-editorial text-[#1A1F16]">
                {activeCategory ? activeCategory : `All questions in ${currentGroup.label}`}
              </h3>
              <p className="text-[#1A1F16]/50 text-sm mt-2">{filteredFaqs.length} questions</p>
            </div>

            <div className="flex flex-col border-t border-[#1A1F16]/10 relative z-10">
              {filteredFaqs.map((faq: any, idx: number) => {
                const isOpen = openQuestion === faq.q;
                return (
                  <div key={idx} className="faq-node border-b border-[#1A1F16]/10 relative">
                    <div className="faq-anchor absolute top-8 left-4 w-4 h-4 -ml-2">
                      <div className="faq-dot w-2 h-2 rounded-full bg-black/10 mx-auto mt-1" />
                    </div>
                    <button
                      onClick={() => setOpenQuestion(isOpen ? null : faq.q)}
                      className="w-full flex justify-between items-center py-6 pl-12 text-left focus:outline-none group bg-transparent hover:bg-black/5 transition-colors"
                    >
                      <span className="text-base md:text-lg font-medium text-[#1A1F16]/90 group-hover:text-[#C7A34A] transition-colors leading-snug">
                        {faq.q}
                      </span>
                      <span className={`text-[#C7A34A] text-2xl transition-transform duration-300 ease-in-out px-4 ${isOpen ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                         <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 pl-12 pr-4 text-[#1A1F16]/70 leading-relaxed text-sm md:text-base font-light">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
