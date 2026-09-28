import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameSequenceCanvas from './FrameSequenceCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Debug State
  const [debug, setDebug] = useState({ frame: 0, progress: 0, state: 'INIT' });
  const DEBUG_MODE = true; // Temporary visual debug mode

  useLayoutEffect(() => {
    if (!isLoaded) return;

    let ctx = gsap.context(() => {
      
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000", // Length of the cinematic hero scroll
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const frame = Math.max(1, Math.round(p * 520));
            
            if (canvasRef.current) {
              canvasRef.current.setProgress(p);
            }
            
            // Debug state tracking
            let currentState = "INIT";
            if (p > 0.05 && p < 0.35) currentState = "GOOD LAND IS FOUND.";
            else if (p >= 0.35 && p < 0.50) currentState = "TRANSITION 1";
            else if (p >= 0.50 && p < 0.85) currentState = "GREAT OPPORTUNITIES ARE CREATED.";
            else if (p >= 0.85 && p < 0.90) currentState = "TRANSITION 2";
            else if (p >= 0.90) currentState = "FINAL HERO LOCKUP";

            if (DEBUG_MODE) {
              setDebug({
                frame,
                progress: (p * 100).toFixed(1),
                state: currentState
              });
            }
          }
        }
      });

      // Timeline scale 0 to 100
      masterTl.set({}, {}, 100);

      // ==========================================
      // PART 1: "GOOD LAND IS FOUND." (0 to 35)
      // Placed Bottom-Left (Frame 0-180 negative space)
      // ==========================================
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

      // Hold until 25, then exit
      masterTl.to(".hero-text-1", {
        autoAlpha: 0,
        x: "3vw",
        filter: "blur(8px)",
        duration: 10,
        ease: "power2.inOut"
      }, 25);


      // ==========================================
      // PART 2: "GREAT OPPORTUNITIES ARE CREATED." (50 to 85)
      // Placed Top-Right (Frame 270-450 negative space)
      // ==========================================
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

      // Hold until 75, then exit
      masterTl.to(".hero-text-2", {
        autoAlpha: 0,
        x: "-3vw",
        filter: "blur(8px)",
        duration: 10,
        ease: "power2.inOut"
      }, 75);


      // ==========================================
      // PART 3: FINAL LOCKUP (90 to 100)
      // Placed Bottom-Center (Frame 480-520 negative space)
      // Remains until frame 520 (Timeline end)
      // ==========================================
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

      // Ensure ScrollTrigger measures the layout correctly after initialization
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="bg-[#050505] relative w-full h-screen overflow-hidden">
      
      {/* LOADING SCREEN */}
      {!isLoaded && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-[#050505] text-[#F4F1E8] text-[11px] tracking-[0.16em] font-medium">
          LOADING VEDA...
        </div>
      )}
      
      {/* DEBUG OVERLAY */}
      {DEBUG_MODE && (
        <div className="absolute top-24 left-8 z-[9999] bg-black/80 text-green-400 p-4 font-mono text-xs uppercase tracking-widest pointer-events-none border border-green-500/30 backdrop-blur-md">
          <div className="mb-2 text-green-300 border-b border-green-500/30 pb-2">DEBUG MODE</div>
          <div>FRAME: {debug.frame} / 520</div>
          <div>PROGRESS: {debug.progress}%</div>
          <div className="mt-2 text-yellow-300">STATE: {debug.state}</div>
        </div>
      )}

      {/* CANVAS LAYER */}
      <div className="absolute inset-0 z-0">
        <FrameSequenceCanvas 
          ref={canvasRef} 
          frameCount={520} 
          onLoaded={() => setIsLoaded(true)} 
        />
        {/* Subtle overlay to ensure text contrast, but not a solid box */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* TYPOGRAPHY LAYER */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* TEXT 1: GOOD LAND IS FOUND */}
        <div className="hero-text-1 absolute bottom-[15vh] left-[5vw] md:left-[8vw] max-w-[90vw] md:max-w-[70vw]">
          <h1 className="text-[#F4F1E8] font-light uppercase tracking-tighter leading-[0.9] flex flex-col drop-shadow-2xl">
            <span className="text-[clamp(48px,6vw,120px)] font-bold">GOOD LAND</span>
            <span className="text-[clamp(24px,3vw,50px)] tracking-widest text-[#F4F1E8]/70 mt-2 ml-1">IS FOUND.</span>
          </h1>
        </div>

        {/* TEXT 2: GREAT OPPORTUNITIES ARE CREATED */}
        <div className="hero-text-2 absolute top-[25vh] right-[5vw] md:right-[8vw] text-right max-w-[90vw] md:max-w-[70vw]">
          <h1 className="text-[#F4F1E8] font-light uppercase tracking-tighter leading-[0.9] flex flex-col items-end drop-shadow-2xl">
            <span className="text-[clamp(40px,5vw,90px)] font-bold">GREAT OPPORTUNITIES</span>
            <span className="text-[clamp(24px,3vw,50px)] tracking-widest text-[#F4F1E8]/70 mt-2 mr-1">ARE CREATED.</span>
          </h1>
        </div>

        {/* FINAL LOCKUP */}
        <div className="hero-lockup absolute bottom-[12vh] left-0 right-0 flex flex-col items-center text-center px-[5vw]">
          <h1 className="text-[#F4F1E8] uppercase leading-none flex flex-col items-center drop-shadow-2xl">
            <span className="text-[clamp(20px,3vw,40px)] font-light tracking-[0.2em] mb-4 text-[#F4F1E8]/80">GOOD LAND IS FOUND.</span>
            <span className="text-[clamp(32px,5vw,80px)] font-bold tracking-tighter">GREAT OPPORTUNITIES ARE CREATED.</span>
          </h1>
        </div>

      </div>
    </div>
  );
}
