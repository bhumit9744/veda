import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contentData = [
  {
    num: "01 / 04",
    title: "Secure & Meaningful Land Ownership",
    text: "Veda Life Spaces is built on a simple belief that land ownership should be secure, transparent, and meaningful. We focus on creating private lifestyle communities for a very limited set of families, where every land parcel is legally verified, thoughtfully planned, and developed with strong ethical standards.",
    img: "/assets/images/about/image01.jpg",
  },
  {
    num: "02 / 04",
    title: "Curating Spaces For Long Term Value",
    text: "Our approach goes beyond selling land. We curate spaces that offer privacy, long term value, and a sense of belonging for those who seek more than just an investment.",
    img: "/assets/images/about/image02.jpg",
  },
  {
    num: "03 / 04",
    title: "Disciplined Execution, Future Ready Living",
    text: "At our core, we combine disciplined execution with a vision for future ready living. From land acquisition and due diligence to infrastructure planning and home build support, we take a comprehensive approach to ensure every opportunity is secure, practical, and growth oriented.",
    img: "/assets/images/about/image03.jpg",
  },
  {
    num: "04 / 04",
    title: "A Foundation For Your Legacy",
    text: "With Veda Life Spaces, land becomes more than an asset. It becomes a foundation for legacy, stability, and a refined lifestyle.",
    img: "/assets/images/about/image04.jpg",
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  
  const [nodes, setNodes] = useState<any[]>([]);
  const [pathD, setPathD] = useState("");
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () => {
      const W = window.innerWidth;
      const isMobile = W < 768;
      const H = window.innerHeight * (isMobile ? 6 : 5); // Increased height to prevent overlap with the header
      
      const n1x = isMobile ? W * 0.85 : W * 0.42;
      const n2x = isMobile ? W * 0.15 : W * 0.58;
      const n3x = isMobile ? W * 0.85 : W * 0.42;
      const n4x = isMobile ? W * 0.15 : W * 0.58;
      
      const y0 = 0;
      const y1 = H * 0.20; // Starts 1 full screen height below the top
      const y2 = H * 0.45;
      const y3 = H * 0.70;
      const y4 = H * 0.88; // Moved higher to prevent overlapping with the bottom curve
      const y5 = H;

      const dy = H * 0.1; 

      const d = `
        M ${W/2} ${y0}
        C ${W/2} ${y0 + dy}, ${n1x} ${y1 - dy}, ${n1x} ${y1}
        C ${n1x} ${y1 + dy}, ${n2x} ${y2 - dy}, ${n2x} ${y2}
        C ${n2x} ${y2 + dy}, ${n3x} ${y3 - dy}, ${n3x} ${y3}
        C ${n3x} ${y3 + dy}, ${n4x} ${y4 - dy}, ${n4x} ${y4}
        C ${n4x} ${y4 + dy}, ${W/2} ${y5 - dy}, ${W/2} ${y5}
      `;
      
      setPathD(d);
      setNodes([
        { id: 1, x: n1x, y: y1, content: contentData[0] },
        { id: 2, x: n2x, y: y2, content: contentData[1] },
        { id: 3, x: n3x, y: y3, content: contentData[2] },
        { id: 4, x: n4x, y: y4, content: contentData[3] }
      ]);
      setDimensions({ w: W, h: H });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!pathD || !worldRef.current || !activePathRef.current) return;
    
    let ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id === "aboutJourney") st.kill();
      });

      const activePath = activePathRef.current!;
      const pathLength = activePath.getTotalLength();
      gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const findPathLengthAtY = (targetY: number) => {
        let low = 0;
        let high = pathLength;
        let best = 0;
        for (let i = 0; i < 25; i++) {
          const mid = (low + high) / 2;
          const pt = activePath.getPointAtLength(mid);
          if (pt.y < targetY) low = mid;
          else high = mid;
          best = mid;
        }
        return best;
      };

      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: "aboutJourney",
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            const currentLen = p * pathLength;
            const tip = activePath.getPointAtLength(currentLen);
            
            // Track camera slightly above center
            let targetY = (window.innerHeight * 0.55) - tip.y;
            
            const minY = -(dimensions.h - window.innerHeight);
            const maxY = 0;
            if (targetY < minY) targetY = minY;
            if (targetY > maxY) targetY = maxY;
            
            gsap.set(worldRef.current, { y: targetY });
            
            if (dotRef.current) {
              gsap.set(dotRef.current, { 
                attr: { cx: tip.x, cy: tip.y },
                opacity: p > 0.01 && p < 0.99 ? 1 : 0
              });
            }
          }
        }
      });

      masterTl.fromTo(activePath, 
        { strokeDashoffset: pathLength }, 
        { strokeDashoffset: 0, ease: "none", duration: 1000 }, 
        0
      );

      nodes.forEach((node, i) => {
        const lengthAtNode = findPathLengthAtY(node.y);
        const t_node = (lengthAtNode / pathLength) * 1000;
        
        // Find exactly when the node reaches the top of the screen to exit
        const exitY = node.y + window.innerHeight * 0.55;
        const lengthAtExit = findPathLengthAtY(Math.min(dimensions.h, exitY));
        let t_exit = (lengthAtExit / pathLength) * 1000;
        if (t_exit <= t_node + 50) t_exit = t_node + 150; // fallback if near end
        
        // Node dot highlights when line reaches it
        masterTl.fromTo(`.node-ring-${i}`, 
          { opacity: 0, scale: 0.5 }, 
          { opacity: 1, scale: 1, duration: 40, ease: "power2.out" }, 
          t_node
        ).fromTo(`.node-dot-${i}`,
          { backgroundColor: "#18231B", scale: 1 },
          { backgroundColor: "#B08A3C", scale: 1.5, duration: 20, ease: "power2.out" },
          t_node
        );

        // Content reveals right before line hits node
        const t_reveal = Math.max(0, t_node - 50);
        
        masterTl.fromTo(`.node-img-wrap-${i}`,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 80, ease: "power3.inOut" },
          t_reveal
        ).fromTo(`.node-img-${i}`,
          { scale: 1.05 },
          { scale: 1, duration: 80, ease: "power3.out" },
          t_reveal
        );

        const t_text = Math.max(0, t_node - 20);
        masterTl.fromTo(`.node-text-${i}`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 60, ease: "power2.out" },
          t_text
        );

        // Content exits before line reaches top of screen
        masterTl.to(`.node-text-${i}`,
          { opacity: 0, y: -20, duration: 30, ease: "power2.in" },
          t_exit - 40
        ).to(`.node-img-wrap-${i}`,
          { clipPath: 'inset(0 0 100% 0)', duration: 40, ease: "power3.inOut" },
          t_exit - 10
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, [pathD, dimensions, nodes]);

  return (
    <div className="w-full bg-[#F3F0E8] text-[#18231B] selection:bg-[#B08A3C] selection:text-[#F3F0E8] min-h-[450vh] md:min-h-[750vh] font-sans relative" ref={containerRef}>
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* The scrolling virtual world */}
        <div ref={worldRef} className="absolute top-0 left-0 w-full" style={{ height: dimensions.h }}>
          
          <svg ref={svgRef} className="absolute inset-0 pointer-events-none w-full h-full z-0">
            <path ref={bgPathRef} d={pathD} stroke="#B5B9AB" strokeOpacity="0.4" strokeWidth="1" fill="none" />
            <path ref={activePathRef} id="about-journey-active" d={pathD} stroke="#B08A3C" strokeWidth="2" fill="none" />
            <circle ref={dotRef} r="4" fill="#18231B" opacity="0" />
          </svg>

          {/* Header (starts at top, scrolls up naturally) */}
          <div className="absolute top-[15vh] w-full flex flex-col justify-center items-center text-center z-10 pointer-events-none px-6">
             <span className="text-[#B08A3C] text-xs md:text-sm tracking-[0.4em] uppercase mb-8 block font-medium">About Veda</span>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-editorial tracking-tight leading-[1.1] mb-8 text-[#18231B] max-w-4xl">
               Built on vision, ethics,<br/>
               discipline, <em className="italic text-[#4F584F]">and authenticity.</em>
             </h1>
          </div>

          {/* Content Nodes */}
          {nodes.map((node, i) => {
            const textFirst = i % 2 === 0; // Node 0: Text left, Node 1: Image left.
            
            // Calculate widths dynamically to span the full screen with a gap for the line
            const xRatio = node.x / (dimensions.w || 1000);
            const leftWidth = `${xRatio * 100}vw`;
            const rightWidth = `${(1 - xRatio) * 100}vw`;

            const isLeftWider = xRatio > 0.5;

            const renderText = () => (
              <div className={`node-text-${i} opacity-0 w-full max-w-md lg:max-w-lg text-left`}>
                <div className="text-[11px] tracking-[0.18em] text-[#666] mb-4 font-semibold uppercase">{node.content.num}</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-editorial text-[#18231B] leading-tight mb-6">
                  {node.content.title}
                </h2>
                <p className="text-[#444] text-[15px] md:text-[17px] leading-relaxed font-light">
                  {node.content.text}
                </p>
              </div>
            );

            const renderImage = () => (
              <div className={`node-img-wrap-${i} relative overflow-hidden aspect-[4/3] w-full max-w-md lg:max-w-xl rounded-sm mb-6 md:mb-0`} style={{ clipPath: 'inset(0 100% 0 0)' }}>
                <img src={node.content.img} className={`node-img-${i} w-full h-full object-cover scale-[1.05]`} alt="Veda" />
              </div>
            );

            return (
              <div key={node.id} className="absolute z-10 pointer-events-none" style={{ left: 0, top: node.y, width: '100vw' }}>
                
                {/* Node Graphics - Still positioned precisely on the line */}
                <div className="absolute flex items-center justify-center z-20" style={{ left: node.x, top: 0, transform: 'translate(-50%, -50%)' }}>
                  <div className={`node-ring-${i} absolute w-6 h-6 rounded-full border border-[#B08A3C] opacity-0`} />
                  <div className={`node-dot-${i} absolute w-2 h-2 rounded-full bg-[#18231B]`} />
                  <div className={`absolute top-6 text-[10px] tracking-[0.18em] text-[#B08A3C] font-semibold`}>{node.content.num.split(' ')[0]}</div>
                </div>

                {/* Full screen layout */}
                <div className="absolute top-0 left-0 w-full flex flex-row items-center -translate-y-1/2">
                  
                  {/* DESKTOP LEFT SIDE */}
                  <div className="hidden md:flex justify-end pl-12 lg:pl-[8%] pr-16 lg:pr-20" style={{ width: leftWidth }}>
                    {textFirst ? renderText() : renderImage()}
                  </div>

                  {/* DESKTOP RIGHT SIDE */}
                  <div className="hidden md:flex justify-start pr-12 lg:pr-[8%] pl-16 lg:pl-20" style={{ width: rightWidth }}>
                    {!textFirst ? renderText() : renderImage()}
                  </div>

                  {/* MOBILE LEFT SIDE */}
                  <div className="flex md:hidden justify-end pl-4 pr-8" style={{ width: leftWidth }}>
                    {isLeftWider && (
                      <div className="flex flex-col w-full max-w-[320px]">
                        {renderImage()}
                        {renderText()}
                      </div>
                    )}
                  </div>

                  {/* MOBILE RIGHT SIDE */}
                  <div className="flex md:hidden justify-start pr-4 pl-8" style={{ width: rightWidth }}>
                    {!isLeftWider && (
                      <div className="flex flex-col w-full max-w-[320px]">
                        {renderImage()}
                        {renderText()}
                      </div>
                    )}
                  </div>
                  
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
