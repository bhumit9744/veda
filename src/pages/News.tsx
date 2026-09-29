import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function News() {
  const containerRef = useRef(null);

  const newsItems = [
    {
      title: "Veda Life Spaces Enters Alibaug's Billionaires' Row With Curated Villa Plot Community",
      category: "Times of India · Business",
      date: "May 2025",
      desc: "Veda Life Spaces marks a landmark entry into one of India's most exclusive coastal addresses — Alibaug's Billionaires' Row — with a thoughtfully curated villa plot community.",
      img: "/assets/images/times-of-india-news-th.jpeg",
      link: "https://timesofindia.indiatimes.com/business/india-business/veda-life-spaces-enters-alibaugs-billionaires-row-with-curated-villa-plot-community/articleshow/130001514.cms",
      tag: "Times of India"
    },
    {
      title: "Veda Life Spaces Enters Alibaug's Billionaire's Row With Curated Villa Plot Community",
      category: "Hindustan Times · Real Estate",
      date: "May 2025",
      desc: "Hindustan Times covers Veda Life Spaces' debut in Alibaug's most coveted coastal corridor, highlighting the brand's disciplined approach to plot development.",
      img: "/assets/images/hindustan-times-th.jpeg",
      link: "https://www.hindustantimes.com/genesis/veda-life-spaces-enters-alibaug-s-billionaire-s-row-with-curated-villa-plot-community-101773827900902.html",
      tag: "Hindustan Times"
    },
    {
      title: "More Media Features Coming Soon",
      category: "Press Coverage",
      date: "Coming Soon",
      desc: "As Veda Life Spaces continues to grow, new press features and media recognition will be added here.",
      img: "/assets/images/mchi-news.jpeg",
      link: "#",
      tag: "MCHI"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Hero Cinematic Reveal
      const tlHero = gsap.timeline();
      tlHero.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 })
        .fromTo('.hero-title-word', 
          { yPercent: 110 }, 
          { yPercent: 0, duration: 1.4, stagger: 0.1, ease: "expo.out" }, 
          "-=0.7"
        )
        .fromTo('.hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.inOut" }, "-=1.2");

      // Helper to binary-search the SVG path length at a specific Y coordinate
      const findPathLengthAtY = (pathElement, targetY, totalLength) => {
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

      // 2. Generate and Setup the SVG Journey Path
      const updatePathAndTimeline = () => {
        // Kill existing master timeline if it exists
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.id === "masterJourney") st.kill();
        });

        const timeline = document.querySelector('.timeline-container');
        if (!timeline) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const nodeItems = gsap.utils.toArray('.node-item') as HTMLElement[];
        
        // Calculate coordinates relative to the timeline container
        // We track the anchor positions AND the DOM elements for content
        const nodesData = nodeItems.map(item => {
          const anchor = item.querySelector('.node-anchor') as HTMLElement;
          const rect = anchor.getBoundingClientRect();
          return {
            x: (rect.left + rect.width / 2) - timelineRect.left,
            y: (rect.top + rect.height / 2) - timelineRect.top,
            item,
            anchor,
            ring: item.querySelector('.node-ring'),
            dot: item.querySelector('.node-dot'),
            content: item.querySelector('.node-content'),
            imgContainer: item.querySelector('.featured-image-container')
          };
        });
        
        if (nodesData.length === 0) return;

        // Path generation nodes (add start and end)
        const pathNodes = [
          { x: timelineRect.width / 2, y: 0 },
          ...nodesData.map(n => ({ x: n.x, y: n.y })),
          { x: timelineRect.width / 2, y: timelineRect.height }
        ];

        // Generate smooth vertical Bézier curve
        let d = `M ${pathNodes[0].x} ${pathNodes[0].y}`;
        for (let i = 1; i < pathNodes.length; i++) {
          const prev = pathNodes[i - 1];
          const curr = pathNodes[i];
          const dy = curr.y - prev.y;
          
          const cp1y = prev.y + dy * 0.5;
          const cp2y = curr.y - dy * 0.5;
          d += ` C ${prev.x} ${cp1y}, ${curr.x} ${cp2y}, ${curr.x} ${curr.y}`;
        }

        const bgPath = document.getElementById('journey-bg') as any;
        const activePath = document.getElementById('journey-active') as any;
        
        if (!bgPath || !activePath) return;

        bgPath.setAttribute('d', d);
        activePath.setAttribute('d', d);
        
        const pathLength = activePath.getTotalLength();
        gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        // Calculate exact path progress for each milestone
        nodesData.forEach(node => {
          const l = findPathLengthAtY(activePath, node.y, pathLength);
          node.progress = l / pathLength; // value between 0 and 1
        });

        // 3. MASTER SCROLL TIMELINE
        const masterTl = gsap.timeline({
          scrollTrigger: {
            id: "masterJourney",
            trigger: '.timeline-container',
            start: "top 50%", // Draw begins when timeline top hits screen center
            end: "bottom 50%",
            scrub: true, // Smooth organic drawing
            onUpdate: (self) => {
              const point = activePath.getPointAtLength(self.progress * pathLength);
              gsap.set('#journey-dot', { 
                attr: { cx: point.x, cy: point.y },
                opacity: self.progress > 0.01 && self.progress < 0.99 ? 1 : 0
              });
            }
          }
        });

        // The path drawing is the absolute backbone of the timeline (duration 100 to map percentages easily)
        masterTl.fromTo(activePath, 
          { strokeDashoffset: pathLength }, 
          { strokeDashoffset: 0, ease: "none", duration: 100 }, 
          0 // start at time 0
        );

        // Map content reveals onto the exact time the path reaches them
        nodesData.forEach(node => {
          const t = node.progress * 100; // The exact time on the 100-duration timeline when path hits the node
          
          // We want the image to START revealing well BEFORE the path reaches the node
          // so it is mostly visible by the time the path arrives.
          const imgStart = Math.max(0, t - 15); // Start revealing 15 units before node
          const textStart = Math.max(0, t - 10); // Start text 10 units before node
          
          // Animate image container (begins BEFORE the node is reached)
          if (node.imgContainer) {
            masterTl.fromTo(node.imgContainer,
              { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
              { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 18, ease: "power2.inOut" },
              imgStart
            );
          }

          // Animate content block (begins BEFORE the node is reached)
          if (node.content) {
            masterTl.fromTo(node.content, 
              { opacity: 0, y: 30, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }, 
              { opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 12, ease: "power2.out" }, 
              textStart
            );
          }

          // Animate node visuals (begins EXACTLY when the path reaches the node)
          if (node.ring && node.dot) {
            masterTl.fromTo(node.ring, 
              { opacity: 0, scale: 0.5 }, 
              { opacity: 0.15, scale: 1, duration: 8, ease: "power2.out" }, 
              t
            ).fromTo(node.dot,
              { backgroundColor: "rgba(0,0,0,0.2)", scale: 1 },
              { backgroundColor: "#b89a6b", scale: 1.3, duration: 4, ease: "power2.out" },
              t
            );
          }
        });

      };

      // Wait a tiny bit for layout shift before drawing first path
      setTimeout(updatePathAndTimeline, 100);

      // 5. Image Parallax (tied to scroll natively, independent of master sequence)
      gsap.utils.toArray('.parallax-img').forEach((img: any) => {
        gsap.fromTo(img, 
          { yPercent: -15, scale: 1.15 },
          {
            yPercent: 15,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      // Handle window resize dynamically rebuilding the path
      const handleResize = () => {
        updatePathAndTimeline();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const featured = newsItems[0];
  const secondary = newsItems[1];
  const updates = newsItems.slice(2);

  return (
    <div ref={containerRef} className="w-full bg-[#FAFAFA] text-[#0a0a0a] font-sans min-h-screen selection:bg-[#0a0a0a] selection:text-[#FAFAFA] overflow-hidden">
      
      {/* =========================================
          CHAPTER 01: HERO
          ========================================= */}
      <section className="pt-32 md:pt-48 px-[5%] md:px-[10%] max-w-[1600px] mx-auto pb-24 relative z-20">
        <div className="mb-16 flex flex-col justify-between items-start">
          <div className="w-full">
            <span className="hero-eyebrow text-[#b89a6b] text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-10 block">
              Media & Recognition
            </span>
            <div className="overflow-hidden pb-2">
              <h1 className="hero-title-word text-6xl md:text-8xl lg:text-[9rem] font-light uppercase tracking-tighter text-[#121212] leading-[0.9]">
                News <span className="font-serif italic text-black/30 lowercase tracking-normal text-5xl md:text-7xl lg:text-[8rem] pr-2">&</span>
              </h1>
            </div>
            <div className="overflow-hidden pb-4">
              <h1 className="hero-title-word text-6xl md:text-8xl lg:text-[9rem] font-light uppercase tracking-tighter text-[#121212] leading-[0.9]">
                Rewards
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/10 origin-left hero-line" />
      </section>

      {/* =========================================
          CHAPTER 02: THE JOURNEY (TIMELINE)
          ========================================= */}
      <div className="timeline-container relative w-full px-[5%] md:px-[10%] max-w-[1600px] mx-auto pb-48">
        
        {/* The organic journey SVG path */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full z-0" style={{ top: 0, left: 0 }}>
          <path id="journey-bg" stroke="#121212" strokeOpacity="0.08" strokeWidth="1" fill="none" />
          <path id="journey-active" stroke="#b89a6b" strokeWidth="2" fill="none" />
          <circle id="journey-dot" r="4" fill="#121212" opacity="0" />
        </svg>

        {/* --- MILESTONE 1: FEATURED STORY --- */}
        <div className="node-item relative z-10 pt-16 pb-40">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2 order-2 lg:order-1 relative z-10">
              <a href={featured.link} target="_blank" rel="noreferrer" className="group block">
                <div className="featured-image-container relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm bg-[#f0f0f0] shadow-sm">
                  <img src={featured.img} alt={featured.tag} className="parallax-img w-full h-full object-cover transform scale-[1.03] group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md border border-black/5 text-[#121212] text-[0.65rem] uppercase font-bold tracking-widest px-5 py-3 rounded-sm shadow-sm transition-transform duration-700 ease-out group-hover:-translate-y-1">
                    Featured
                  </div>
                </div>
              </a>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2 relative pl-12 md:pl-16">
              <div className="node-anchor absolute top-3 left-0 flex items-center justify-center w-8 h-8">
                <div className="node-ring absolute inset-0 rounded-full bg-[#b89a6b] opacity-0 scale-50" />
                <div className="node-dot w-2 h-2 rounded-full bg-black/20" />
              </div>
              
              <div className="node-content bg-[#FAFAFA]/80 backdrop-blur-sm py-4">
                <div className="flex items-center gap-4 text-xs text-black/50 uppercase tracking-widest mb-8 font-medium">
                  <span>{featured.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#b89a6b]" />
                  <span>{featured.date}</span>
                </div>
                <h3 className="text-3xl md:text-5xl text-[#121212] font-light leading-[1.1] mb-8 tracking-tight transition-colors duration-500 hover:text-[#b89a6b]">
                  <a href={featured.link} target="_blank" rel="noreferrer">{featured.title}</a>
                </h3>
                <p className="text-base md:text-lg text-black/60 leading-relaxed mb-12 max-w-md">
                  {featured.desc}
                </p>
                <a href={featured.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 text-xs font-semibold text-[#121212] uppercase tracking-[0.2em] hover:text-[#b89a6b] transition-colors duration-500">
                  Read Article 
                  <div className="relative overflow-hidden w-16 h-[1px] bg-black/20">
                    <div className="absolute inset-0 bg-[#b89a6b] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>
                </a>
              </div>
            </div>
            
          </div>
        </div>

        {/* --- MILESTONE 2: SECONDARY STORY --- */}
        <div className="node-item relative z-10 pb-40">
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center">
            
            <div className="w-full lg:w-[45%] order-2 lg:order-1 relative z-10">
              <a href={secondary.link} target="_blank" rel="noreferrer" className="group block">
                <div className="featured-image-container relative aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-sm bg-[#f0f0f0] shadow-sm">
                  <img src={secondary.img} alt={secondary.tag} className="parallax-img w-full h-full object-cover transform scale-[1.03] group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                </div>
              </a>
            </div>

            <div className="w-full lg:w-[55%] order-1 lg:order-2 relative pl-12 md:pl-0 lg:pr-16">
              {/* Node moves to left on mobile, right on desktop */}
              <div className="node-anchor absolute top-3 left-0 lg:left-auto lg:right-0 flex items-center justify-center w-8 h-8">
                <div className="node-ring absolute inset-0 rounded-full bg-[#b89a6b] opacity-0 scale-50" />
                <div className="node-dot w-2 h-2 rounded-full bg-black/20" />
              </div>
              
              <div className="node-content bg-[#FAFAFA]/80 backdrop-blur-sm py-4">
                <div className="flex items-center gap-4 text-xs text-black/50 uppercase tracking-widest mb-6 font-medium">
                  <span>{secondary.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#b89a6b]" />
                  <span>{secondary.date}</span>
                </div>
                <h3 className="text-2xl md:text-4xl text-[#121212] font-light leading-[1.15] mb-8 tracking-tight transition-colors duration-500 hover:text-[#b89a6b]">
                  <a href={secondary.link} target="_blank" rel="noreferrer">{secondary.title}</a>
                </h3>
                <p className="text-sm md:text-base text-black/60 leading-relaxed mb-10 max-w-md">
                  {secondary.desc}
                </p>
                <a href={secondary.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 text-xs font-semibold text-[#121212] uppercase tracking-[0.2em] hover:text-[#b89a6b] transition-colors duration-500">
                  Read Article 
                  <div className="relative overflow-hidden w-12 h-[1px] bg-black/20">
                    <div className="absolute inset-0 bg-[#b89a6b] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>
                </a>
              </div>
            </div>
            
          </div>
        </div>

        {/* --- MILESTONE 3: UPDATES & REWARDS --- */}
        <div className="node-item relative z-10 pb-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            <div className="w-full lg:w-1/3 relative pl-12 md:pl-16">
              <div className="node-anchor absolute top-2 left-0 flex items-center justify-center w-8 h-8">
                <div className="node-ring absolute inset-0 rounded-full bg-[#b89a6b] opacity-0 scale-50" />
                <div className="node-dot w-2 h-2 rounded-full bg-black/20" />
              </div>
              <div className="node-content bg-[#FAFAFA]/80 backdrop-blur-sm py-2">
                <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-[#121212] leading-tight">
                  Updates <span className="font-serif italic text-black/30 lowercase tracking-normal pr-1">&</span><br/>Rewards
                </h2>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3 node-content bg-[#FAFAFA]/95 backdrop-blur-md border-t border-black/10">
              {updates.map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  target={item.link !== '#' ? "_blank" : undefined}
                  rel={item.link !== '#' ? "noreferrer" : undefined}
                  className="group block border-b border-black/10 py-12 relative overflow-hidden transition-colors duration-500 hover:bg-white"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center px-4 relative z-10">
                    <div className="md:w-1/3 w-full relative aspect-video overflow-hidden rounded-sm bg-[#f0f0f0]">
                      <img src={item.img} alt={item.tag} className="w-full h-full object-cover transform scale-[1.03] group-hover:scale-100 transition-transform duration-[1.5s] ease-out" />
                    </div>
                    
                    <div className="md:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-[0.65rem] text-black/50 uppercase tracking-widest mb-3 font-medium">
                        <span>{item.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[#b89a6b]" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl text-[#121212] font-light leading-snug mb-3 group-hover:text-[#b89a6b] transition-colors duration-500">
                        {item.title}
                      </h3>
                      <p className="text-sm text-black/60 leading-relaxed max-w-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
