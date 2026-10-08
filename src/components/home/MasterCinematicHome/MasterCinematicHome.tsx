import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeafFrameSequence, { LeafFrameSequenceRef } from '../LeafSequence/LeafFrameSequence';
import CinematicContent, { CinematicContentRef } from '../CinematicContent/CinematicContent';
import InteractiveHero, { InteractiveHeroRef } from '../Hero/InteractiveHero';

gsap.registerPlugin(ScrollTrigger);

export default function MasterCinematicHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<LeafFrameSequenceRef>(null);
  const contentRef = useRef<CinematicContentRef>(null);
  const heroRef = useRef<InteractiveHeroRef>(null);
  const leafContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create one master timeline spanning the entire 1500vh scroll
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub tracking
        }
      });

      // 1. Map the progress to the leaf frames. 
      // The total scroll duration is 340 units. 
      // The leaf frames will slowly animate across the entire 340 units.
      const proxy = { frame: 1 };
      masterTl.to(proxy, {
        frame: 300,
        ease: "none",
        duration: 340,
        onUpdate: () => {
          if (sequenceRef.current?.setProgress) {
            sequenceRef.current.setProgress((proxy.frame - 1) / 299);
          }
        }
      }, 0);

      // 2. Delegate to InteractiveHero to handle its transition out (0-40)
      if (heroRef.current?.initAnimations) {
        heroRef.current.initAnimations(masterTl);
      }

      // 3. Delegate to CinematicContent to inject all typography animations
      // We will offset everything inside CinematicContent by +40
      if (contentRef.current?.initAnimations) {
        contentRef.current.initAnimations(masterTl);
      }
    }, containerRef);

    // Subtle Leaf Parallax
    const onMouseMove = (e: MouseEvent) => {
      if (!leafContainerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      gsap.to(leafContainerRef.current, {
        x: x * -15, // max 15px movement
        y: y * -15,
        duration: 2,
        ease: 'power2.out'
      });
    };

    const mq = window.matchMedia('(pointer: fine)');
    if (mq.matches) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="bg-[#06130C]">
      {/* The master scroll controller container - 1500vh for deep scrolling */}
      <section ref={containerRef} className="relative w-full h-[1500vh]">
        <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden">
          
          {/* Visual Layer: 300 Leaf Frames ONLY with Subtle Parallax */}
          <div ref={leafContainerRef} className="absolute inset-0 w-full h-full scale-[1.02]">
            <LeafFrameSequence ref={sequenceRef} />
          </div>
          
          {/* Subtle dark green overlay to fade background and improve readability */}
          <div className="absolute inset-0 bg-veda-dark-1/20 z-10 pointer-events-none mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>

          {/* Hero Layer (fades out first) */}
          <InteractiveHero ref={heroRef} />

          {/* Content Layer: Typography & Compositions injected into Master TL */}
          <CinematicContent ref={contentRef} />
          
        </div>
      </section>
    </div>
  );
}
