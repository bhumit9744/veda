import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Navbar from '../../../Navbar';
import FrameSequenceCanvas from './FrameSequenceCanvas';
import HeroTypography from './HeroTypography';

const HERO_DEBUG = false;

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [debug, setDebug] = useState({ frame: 0, progress: 0, state: 'INIT' });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            // Give 90% of the 400vh to the frame sequence, reserve 10% for the exit transition
            const frameProgress = Math.min(1, self.progress / 0.9);
            
            if (canvasRef.current?.setProgress) {
              canvasRef.current.setProgress(frameProgress);
            }
            
            if (HERO_DEBUG) {
              const frame = Math.max(1, Math.round(frameProgress * 520));
              let currentState = "INIT";
              if (frameProgress > 0.05 && frameProgress < 0.35) currentState = "GOOD LAND IS FOUND.";
              else if (frameProgress >= 0.35 && frameProgress < 0.50) currentState = "TRANSITION 1";
              else if (frameProgress >= 0.50 && frameProgress < 0.85) currentState = "GREAT OPPORTUNITIES ARE CREATED.";
              else if (frameProgress >= 0.85 && frameProgress < 0.90) currentState = "TRANSITION 2";
              else if (frameProgress >= 0.90) currentState = "FINAL HERO LOCKUP";
              
              setDebug({
                frame,
                progress: (self.progress * 100).toFixed(1),
                state: currentState
              });
            }
          }
        }
      });

      // Timeline scale 0 to 100 representing the 0.9 frame progress portion
      masterTl.set({}, {}, 100);

      // PART 1: "GOOD LAND IS FOUND." (0 to 35)
      masterTl.set(".hero-text-1", { 
        autoAlpha: 0, 
        x: "-5vw", 
        clipPath: "inset(0 100% 0 0)",
        filter: "blur(12px)",
        scale: 1.02
      }, 0);

      masterTl.to(".hero-text-1", {
        autoAlpha: 1,
        x: "0vw",
        clipPath: "inset(0 0% 0 0)",
        filter: "blur(0px)",
        scale: 1,
        duration: 12,
        ease: "power2.out"
      }, 5);

      masterTl.to(".hero-text-1", {
        autoAlpha: 0,
        x: "3vw",
        filter: "blur(8px)",
        duration: 10,
        ease: "power2.inOut"
      }, 25);

      // PART 2: "GREAT OPPORTUNITIES ARE CREATED." (50 to 85)
      masterTl.set(".hero-text-2", { 
        autoAlpha: 0, 
        x: "5vw", 
        clipPath: "inset(0 0 0 100%)",
        filter: "blur(12px)",
        scale: 1.02
      }, 0);

      masterTl.to(".hero-text-2", {
        autoAlpha: 1,
        x: "0vw",
        clipPath: "inset(0 0% 0 0%)",
        filter: "blur(0px)",
        scale: 1,
        duration: 12,
        ease: "power2.out"
      }, 50);

      masterTl.to(".hero-text-2", {
        autoAlpha: 0,
        x: "-3vw",
        filter: "blur(8px)",
        duration: 10,
        ease: "power2.inOut"
      }, 75);

      // PART 3: FINAL LOCKUP (90 to 100)
      masterTl.set(".hero-lockup", {
        autoAlpha: 0,
        y: "4vh",
        filter: "blur(12px)"
      }, 0);

      masterTl.to(".hero-lockup", {
        autoAlpha: 1,
        y: "0vh",
        filter: "blur(0px)",
        duration: 10,
        ease: "power2.out"
      }, 90);

      // EXIT TRANSITION: 90% to 100% of TOTAL SCROLL
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "90% top",
          end: "bottom bottom",
          scrub: true
        }
      });

      exitTl.to(canvasWrapperRef.current, {
        scale: 1.04,
        filter: "brightness(0.3) contrast(0.8)",
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      exitTl.to(overlayRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      exitTl.to(".hero-lockup", {
        scale: 0.9,
        filter: "blur(10px)",
        opacity: 0,
        y: -100,
        letterSpacing: "0.2em",
        duration: 1,
        ease: "power2.in"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-black">
        <Navbar />
        
        {HERO_DEBUG && (
          <div className="absolute top-24 left-8 z-[9999] bg-black/80 text-green-400 p-4 font-mono text-xs uppercase tracking-widest pointer-events-none border border-green-500/30 backdrop-blur-md">
            <div className="mb-2 text-green-300 border-b border-green-500/30 pb-2">DEBUG MODE</div>
            <div>FRAME: {debug.frame} / 520</div>
            <div>PROGRESS: {debug.progress}%</div>
            <div className="mt-2 text-yellow-300">STATE: {debug.state}</div>
          </div>
        )}

        <div ref={canvasWrapperRef} className="absolute inset-0 w-full h-full origin-center">
          <img src="/assets/images/5b44f3a4-f6fc-46ee-b252-86ca1a95c3e2.png" className="w-full h-full object-cover" alt="Hero Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>
        
        {/* Darkening overlay for exit transition */}
        <div ref={overlayRef} className="absolute inset-0 w-full h-full bg-[#050505] opacity-0 pointer-events-none" />
        
        <HeroTypography />
      </div>
    </section>
  );
}
