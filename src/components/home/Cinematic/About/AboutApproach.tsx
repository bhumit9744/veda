import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const chooseRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);
  
  // Decorative line/particle system ref
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
        }
      });

      // Initial state
      gsap.set([researchRef.current, chooseRef.current, developRef.current], { opacity: 0 });
      gsap.set(researchRef.current, { x: -100 });
      gsap.set(chooseRef.current, { x: 100 });
      gsap.set(developRef.current, { y: 100, scale: 0.9 });
      
      // Draw SVG line logic
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(lineRef.current, { strokeDashoffset: 0, duration: 10, ease: 'none' }, 0);
      }

      // Sequence
      tl.to(researchRef.current, { opacity: 1, x: 0, duration: 2 }, 1)
        .to(researchRef.current, { opacity: 0.2, x: 50, duration: 2 }, 4) // shifts away
        
        .to(chooseRef.current, { opacity: 1, x: 0, duration: 2 }, 4) // Choose comes in
        .to(chooseRef.current, { opacity: 0.2, x: -50, duration: 2 }, 7)
        
        .to(developRef.current, { opacity: 1, y: 0, scale: 1, duration: 2 }, 7) // Develop dominates
        .to({}, { duration: 2 }); // padding at the end

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] flex items-center justify-center">
      
      {/* Background Organic/Botanical Line System */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
        <svg viewBox="0 0 1000 1000" className="w-full h-full max-w-4xl" preserveAspectRatio="xMidYMid slice">
          <path 
            ref={lineRef}
            d="M 100,200 C 300,300 400,100 500,400 C 600,700 800,500 900,800"
            fill="none"
            stroke="#b89a6b"
            strokeWidth="2"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(184,154,107,0.5)]"
          />
          {/* We could add glowing circles/particles along the path if desired */}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-center h-screen">
        
        {/* State 01: RESEARCH */}
        <div ref={researchRef} className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[#b89a6b] text-sm uppercase tracking-[0.4em] mb-4">01</span>
          <h3 className="text-5xl md:text-7xl font-light uppercase tracking-widest text-[#F4F1E8] mb-6">Research</h3>
          <p className="text-lg md:text-xl font-light text-[#F4F1E8]/60">Study markets.</p>
        </div>

        {/* State 02: CHOOSE */}
        <div ref={chooseRef} className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[#b89a6b] text-sm uppercase tracking-[0.4em] mb-4">02</span>
          <h3 className="text-5xl md:text-7xl font-light uppercase tracking-widest text-[#F4F1E8] mb-6">Choose</h3>
          <p className="text-lg md:text-xl font-light text-[#F4F1E8]/60">Choose the land.</p>
        </div>

        {/* State 03: DEVELOP */}
        <div ref={developRef} className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[#b89a6b] text-sm uppercase tracking-[0.4em] mb-4">03</span>
          <h3 className="text-5xl md:text-8xl font-serif italic text-[#F4F1E8] mb-6">Develop</h3>
          <p className="text-lg md:text-xl font-light text-[#F4F1E8]/60 uppercase tracking-widest">Develop the opportunity.</p>
          
          {/* Botanical form metaphor - very abstract */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-[radial-gradient(circle_at_center,rgba(184,154,107,0.05)_0%,transparent_70%)] rounded-full -z-10 blur-xl" />
        </div>

      </div>
    </section>
  );
}
