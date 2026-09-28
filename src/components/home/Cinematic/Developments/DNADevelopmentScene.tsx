import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MasterplanField from '../Land/MasterplanField';
import DevelopmentScene from '../../OurDevelopments/DevelopmentScene';
import DevelopmentShowcase from './DevelopmentShowcase';

export default function DNADevelopmentScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States to pass to the 3D scene and Showcase
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDev, setActiveDev] = useState(0);
  
  // Refs for the breakdown transition
  const masterplanWrapperRef = useRef<HTMLDivElement>(null);
  const masterplanRef = useRef<any>(null);
  const developTextRef = useRef<HTMLHeadingElement>(null);
  const threeSceneWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We set the MasterplanField to its final state (progress=1.0) so it matches the end of Checkpoint 4 seamlessly.
    if (masterplanRef.current?.setProgress) {
      masterplanRef.current.setProgress(1.0);
    }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            
            // Map 0-1 of this 800vh scene to the DNA scene progress
            // We'll let the DNA scene receive the full 0-1 so it rotates and evolves correctly
            setScrollProgress(p);

            // Determine active development based on progress
            if (p < 0.68) setActiveDev(0); // Bellagio (default/forming)
            else if (p >= 0.68 && p < 0.85) setActiveDev(1); // Vista
            else setActiveDev(2); // Upcoming

            // 0.00 - 0.15: Masterplan breakdown
            const pBreak = Math.max(0, Math.min(1, p / 0.15));
            
            if (masterplanWrapperRef.current) {
              gsap.set(masterplanWrapperRef.current, {
                opacity: 1 - pBreak,
                scale: 1 + (pBreak * 0.2),
                filter: `blur(${pBreak * 10}px)`,
                rotateZ: pBreak * 10
              });
            }

            if (developTextRef.current) {
              gsap.set(developTextRef.current, {
                opacity: 1 - (pBreak * 1.5),
                scale: 1 + (pBreak * 0.5),
                letterSpacing: `${0.1 + (pBreak * 0.5)}em`,
                filter: `blur(${pBreak * 15}px)`
              });
            }

            // 0.05 - 0.25: 3D Scene Fades In
            const pDNAIn = Math.max(0, Math.min(1, (p - 0.05) / 0.2));
            if (threeSceneWrapperRef.current) {
              gsap.set(threeSceneWrapperRef.current, {
                opacity: pDNAIn
              });
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[800vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden">
        
        {/* The 3D DNA Scene (fades in) */}
        <div ref={threeSceneWrapperRef} className="absolute inset-0 w-full h-full opacity-0 z-0">
          <DevelopmentScene 
            scrollProgress={scrollProgress} 
            mousePos={{x: 0.5, y: 0.5}} 
            activeDev={activeDev} 
          />
        </div>

        {/* The Masterplan & DEVELOP text from end of Checkpoint 4 (breaks apart) */}
        <div ref={masterplanWrapperRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center mix-blend-screen">
          <MasterplanField ref={masterplanRef} />
        </div>
        
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-center">
          <h1 ref={developTextRef} className="text-white text-[clamp(60px,12vw,200px)] uppercase font-bold leading-none tracking-tighter">
            Develop
          </h1>
        </div>

        {/* Development Showcase UI (fades in later) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
          <DevelopmentShowcase progress={scrollProgress} activeDev={activeDev} />
        </div>

      </div>
    </section>
  );
}
