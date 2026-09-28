import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function ClarityScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Parallax floating words around CLARITY
    wordsRef.current.forEach((word, i) => {
      if (!word) return;
      const speedY = (i % 2 === 0 ? 1 : -1) * (50 + i * 20);
      const speedX = (i % 3 === 0 ? 1 : -1) * (30 + i * 15);
      
      gsap.set(word, { 
        autoAlpha: 0, 
        y: speedY, 
        x: speedX, 
        scale: 0.8 + (i * 0.1),
        filter: "blur(10px)" 
      });

      tl.to(word, { 
        autoAlpha: 0.6, 
        y: 0, 
        x: 0, 
        scale: 1, 
        filter: "blur(0px)", 
        duration: 2, 
        ease: "power1.inOut" 
      }, 0);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
         if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  const annotations = ["TITLE", "LEGAL", "LOCATION", "CONNECTIVITY", "PLANNING", "DEVELOPMENT"];

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background base CLARITY to hold the layout steady */}
        <h1 className="absolute text-white text-[clamp(80px,18vw,300px)] font-bold uppercase tracking-tighter leading-none pointer-events-none">
          Clarity
        </h1>

        {/* Floating Annotations */}
        {annotations.map((text, i) => {
          const top = `${20 + (i * 12)}%`;
          const left = i % 2 === 0 ? `${10 + (i * 5)}%` : `${60 + (i * 5)}%`;
          
          return (
            <div 
              key={text}
              ref={el => { if (el) wordsRef.current[i] = el; }}
              className="absolute text-[#d4c9b3] text-[10px] md:text-sm uppercase tracking-[0.3em] font-medium"
              style={{ top, left }}
            >
              {text}
            </div>
          );
        })}

      </div>
    </section>
  );
}
