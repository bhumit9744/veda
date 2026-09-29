import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutClarity() {
  const sectionRef = useRef<HTMLElement>(null);
  const clarityWordRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);
  const annotationItems = useRef<(HTMLSpanElement | null)[]>([]);

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
      gsap.set(clarityWordRef.current, { filter: 'blur(20px)', opacity: 0, scale: 1.2 });
      gsap.set(subtextRef.current, { opacity: 0, y: 30 });
      gsap.set(annotationItems.current, { opacity: 0, scale: 0.8 });

      // Blur to sharp transition
      tl.to(clarityWordRef.current, { 
        filter: 'blur(0px)', 
        opacity: 1, 
        scale: 1, 
        duration: 3 
      }, 0);

      // Subtext appears
      tl.to(subtextRef.current, { opacity: 1, y: 0, duration: 2 }, 1.5);

      // Annotations pop in sporadically around it
      annotationItems.current.forEach((item, i) => {
        tl.to(item, { opacity: 0.6, scale: 1, duration: 1 }, 2 + (i * 0.3));
      });

      tl.to({}, { duration: 2 }); // hold at the end

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const annotations = ['TITLE', 'LEGAL', 'LOCATION', 'CONNECTIVITY', 'PLANNING', 'DEVELOPMENT'];

  return (
    <section ref={sectionRef} className="relative w-full h-[200vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Huge Background/Foreground CLARITY word */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h2 ref={clarityWordRef} className="text-[clamp(6rem,18vw,24rem)] font-light tracking-widest text-[#F4F1E8]/20 select-none uppercase">
          Clarity
        </h2>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center mt-32 md:mt-48">
        <div ref={subtextRef} className="flex flex-col gap-2 md:gap-4 text-2xl md:text-5xl font-light tracking-widest uppercase">
          <span className="text-[#F4F1E8]">We Find The Opportunity.</span>
          <span className="text-[#b89a6b]">We Give You The Clarity.</span>
        </div>
      </div>

      {/* Scattered Annotations */}
      <div ref={annotationsRef} className="absolute inset-0 z-30 pointer-events-none">
        {annotations.map((word, i) => {
          // Calculate random-ish positions around the center
          const top = [20, 15, 80, 75, 45, 60][i] + '%';
          const left = [15, 75, 25, 85, 10, 80][i] + '%';
          
          return (
            <span 
              key={word}
              ref={el => annotationItems.current[i] = el}
              className="absolute text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-[#F4F1E8] font-medium"
              style={{ top, left }}
            >
              [ {word} ]
            </span>
          );
        })}
      </div>

    </section>
  );
}
