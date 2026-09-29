import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutDifference() {
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const item4Ref = useRef<HTMLDivElement>(null);

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
      gsap.set([title1Ref.current, title2Ref.current], { opacity: 0, y: 30 });
      gsap.set(item1Ref.current, { opacity: 0, x: -100 }); // Horizontal
      gsap.set(item2Ref.current, { opacity: 0, y: 100 }); // Vertical
      gsap.set(item3Ref.current, { opacity: 0, x: -100, y: 100 }); // Diagonal
      gsap.set(item4Ref.current, { opacity: 0, scale: 0.5 }); // Scale

      // THE VEDA DIFFERENCE
      tl.to(title1Ref.current, { opacity: 1, y: 0, duration: 1 }, 0)
        .to(title2Ref.current, { opacity: 1, y: 0, duration: 1 }, 0.5);

      tl.to([title1Ref.current, title2Ref.current], { opacity: 0, y: -30, duration: 1 }, 2.5);

      // 1. MARKET RESEARCH
      tl.to(item1Ref.current, { opacity: 1, x: 0, duration: 1.5 }, 3.5)
        .to(item1Ref.current, { opacity: 0, x: 100, duration: 1.5 }, 6);
      
      // 2. LEGAL DILIGENCE
      tl.to(item2Ref.current, { opacity: 1, y: 0, duration: 1.5 }, 7.5)
        .to(item2Ref.current, { opacity: 0, y: -100, duration: 1.5 }, 10);
      
      // 3. FUTURE-GROWTH EVALUATION
      tl.to(item3Ref.current, { opacity: 1, x: 0, y: 0, duration: 1.5 }, 11.5)
        .to(item3Ref.current, { opacity: 0, x: 100, y: -100, duration: 1.5 }, 14);
      
      // 4. THOUGHTFUL DEVELOPMENT
      tl.to(item4Ref.current, { opacity: 1, scale: 1, duration: 1.5 }, 15.5)
        .to(item4Ref.current, { opacity: 0, scale: 1.5, duration: 1.5 }, 18);

      tl.to({}, { duration: 2 }); // End buffer

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] flex items-center justify-center overflow-hidden">
      
      {/* Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6">
        <div ref={title1Ref} className="text-3xl md:text-5xl font-serif italic text-[#b89a6b] mb-4">The Veda</div>
        <div ref={title2Ref} className="text-[clamp(3rem,8vw,8rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8]">Difference</div>
      </div>

      {/* Phrases */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6">
        
        <div ref={item1Ref} className="absolute text-center">
          <h3 className="text-[clamp(2.5rem,6vw,6rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8]">
            Market<br/>Research
          </h3>
        </div>

        <div ref={item2Ref} className="absolute text-center">
          <h3 className="text-[clamp(2.5rem,6vw,6rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8]">
            Legal<br/><span className="font-serif italic text-[#b89a6b] lowercase tracking-normal">Diligence</span>
          </h3>
        </div>

        <div ref={item3Ref} className="absolute text-center">
          <h3 className="text-[clamp(2.5rem,6vw,6rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8]">
            Future-Growth<br/>Evaluation
          </h3>
        </div>

        <div ref={item4Ref} className="absolute text-center">
          <h3 className="text-[clamp(2.5rem,6vw,6rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8]">
            Thoughtful<br/>Development
          </h3>
        </div>

      </div>

    </section>
  );
}
