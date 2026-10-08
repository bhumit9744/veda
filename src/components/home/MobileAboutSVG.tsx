import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MobileAboutSVG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;
    const pathLength = pathRef.current.getTotalLength();
    
    // Initial state
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    const ctx = gsap.context(() => {
      // Draw path on scroll
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 0.5,
        }
      });

      // Animate text nodes
      const nodes = gsap.utils.toArray<HTMLElement>('.about-node');
      nodes.forEach((node, i) => {
        gsap.fromTo(node, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[400px] md:max-w-3xl mx-auto flex flex-col pt-12 md:pt-24">
      
      {/* SVG Spine */}
      <div className="absolute top-0 left-0 w-full h-[100%] pointer-events-none hidden md:block">
        <svg viewBox="0 0 800 2000" fill="none" preserveAspectRatio="xMidYMin slice" className="w-full h-full opacity-30">
           <path 
             ref={pathRef}
             d="M400,0 C400,200 600,300 600,500 C600,700 200,800 200,1000 C200,1200 600,1300 600,1500 C600,1700 400,1800 400,2000" 
             stroke="#C7A34A" 
             strokeWidth="2"
           />
        </svg>
      </div>

      <div className="absolute top-0 left-0 w-[40px] h-full pointer-events-none md:hidden">
         {/* Mobile vertical line approach to simulate spine */}
         <div className="absolute left-[24px] top-[10%] w-[1px] h-[85%] bg-veda-gold/30 rounded-full bg-gradient-to-b from-transparent via-veda-gold/40 to-transparent"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-24 md:mb-48 md:pl-0 pl-14">
        <span className="text-[length:var(--mobile-small)] md:text-sm tracking-[0.2em] uppercase text-veda-gold block mb-6">
          ABOUT VEDA
        </span>
        <h2 className="text-[length:var(--mobile-heading)] md:text-5xl font-editorial italic text-veda-ivory leading-[1.2] max-w-sm md:max-w-md">
          Built on vision,<br/>ethics, discipline,<br/>and authenticity
        </h2>
      </div>

      {/* NODE 1 */}
      <div className="about-node relative z-10 flex flex-col md:flex-row items-start gap-8 mb-32 md:mb-48 pl-14 md:pl-0">
        <div className="md:w-1/2">
           <div className="w-full aspect-[4/5] bg-white/5 overflow-hidden rounded-sm border border-white/10 mb-6">
             <img src="/assets/images/bellagio-old/img176.jpg" className="w-full h-full object-cover" />
           </div>
        </div>
        <div className="md:w-1/2 md:pt-12">
           <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light text-veda-ivory">
             Veda Life Spaces is built on a simple belief that land ownership should be secure, transparent, and meaningful. We focus on creating private lifestyle communities for a very limited set of families, where every land parcel is legally verified, thoughtfully planned, and developed with strong ethical standards.
           </p>
        </div>
      </div>

      {/* NODE 2 (Reversed) */}
      <div className="about-node relative z-10 flex flex-col md:flex-row-reverse items-start gap-8 mb-32 md:mb-48 pl-14 md:pl-0">
        <div className="md:w-1/2">
           <div className="w-full aspect-[4/3] bg-white/5 overflow-hidden rounded-sm border border-white/10 mb-6">
             <img src="/assets/images/bellagio-old/img200.jpg" className="w-full h-full object-cover" />
           </div>
        </div>
        <div className="md:w-1/2 md:pt-12 text-left md:text-right">
           <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light text-veda-ivory">
             Our approach goes beyond selling land. We curate spaces that offer privacy, long term value, and a sense of belonging for those who seek more than just an investment.
           </p>
        </div>
      </div>

      {/* NODE 3 */}
      <div className="about-node relative z-10 flex flex-col items-center md:items-start gap-8 mb-32 md:mb-48 pl-14 md:pl-0 text-left md:text-center">
        <div className="w-full md:w-2/3 aspect-[21/9] bg-white/5 overflow-hidden rounded-sm border border-white/10 mb-6">
           <img src="/assets/images/bellagio-old/img258.jpg" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-3/4">
           <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light text-veda-ivory md:mx-auto">
             At our core, we combine disciplined execution with a vision for future ready living. From land acquisition and due diligence to infrastructure planning and home build support, we take a comprehensive approach to ensure every opportunity is secure, practical, and growth oriented.
           </p>
        </div>
      </div>

      {/* NODE 4 */}
      <div className="about-node relative z-10 flex flex-col items-center pl-14 md:pl-0 text-left md:text-center mt-12 md:mt-24 pb-24">
        <p className="text-[length:var(--mobile-subheading)] md:text-3xl font-editorial italic text-veda-gold leading-relaxed max-w-2xl border-t border-veda-gold/20 pt-16">
          With Veda Life Spaces, land becomes more than an asset. It becomes a foundation for legacy, stability, and a refined lifestyle.
        </p>
      </div>

    </div>
  );
}
