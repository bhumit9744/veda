import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameSequenceCanvas from './FrameSequenceCanvas';

gsap.registerPlugin(ScrollTrigger);

const MaskText = ({ children, className }) => (
  <div className={`mask-container ${className || ''}`}>
    <div className="mask-inner">{children}</div>
  </div>
);

export default function CinematicSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    let ctx = gsap.context(() => {
      // Helper function to animate masked text
      const revealMask = (targets, startTime, duration = 1.5) => {
        return masterTl.fromTo(
          targets,
          { yPercent: 110 },
          { yPercent: 0, duration, ease: "power3.out", stagger: 0.1 },
          startTime
        );
      };

      const hideMask = (targets, startTime, duration = 1.0) => {
        return masterTl.to(
          targets,
          { yPercent: -110, duration, ease: "power3.in", stagger: 0.05 },
          startTime
        );
      };

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=20000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (canvasRef.current) {
              canvasRef.current.setProgress(self.progress);
            }
            
            // Map chapters based on frame beats (approx)
            // 0 - 53% = Chapter 1 (0-290 frames)
            // 53% - 88% = Chapter 2 (290-480 frames)
            // 88% - 100% = Chapter 3 (480-545 frames)
            if (self.progress < 0.53) setActiveChapter(1);
            else if (self.progress < 0.88) setActiveChapter(2);
            else setActiveChapter(3);
          }
        }
      });

      // Master timeline is 100 total units
      
      /* =======================================
         SCENE 1: LAND (0 - 14.6%)
         ======================================= */
      masterTl.set(".scene-land", { autoAlpha: 1 }, 0);
      
      revealMask(".sc1-eyebrow .mask-inner", 0, 1.5);
      revealMask(".sc1-headline .mask-inner", 3, 2);
      
      hideMask(".sc1-headline .mask-inner", 12, 1);
      masterTl.to(".scene-land", { autoAlpha: 0, duration: 1 }, 14);


      /* =======================================
         SCENE 2: PLOT / BUNGALOW (14.6% - 27.5%)
         ======================================= */
      masterTl.set(".scene-plots", { autoAlpha: 1 }, 14.6);
      
      revealMask(".sc2-headline .mask-inner", 15, 2);
      hideMask(".sc2-headline .mask-inner", 24, 1);
      
      masterTl.to(".scene-plots", { autoAlpha: 0, duration: 1 }, 26.5);


      /* =======================================
         SCENE 3: BUNGALOW BODY (27.5% - 42.2%)
         ======================================= */
      masterTl.set(".scene-bungalow-body", { autoAlpha: 1 }, 27.5);
      
      revealMask(".sc3-body .mask-inner", 28, 2);
      hideMask(".sc3-body .mask-inner", 38, 1);
      
      masterTl.to(".scene-bungalow-body", { autoAlpha: 0, duration: 1 }, 41);


      /* =======================================
         SCENE 4: INTERIOR (53.2% - 77.0%)
         ======================================= */
      // Gap from 42.2 to 53.2 is intentional visual silence during camera approach
      
      masterTl.set(".scene-interior", { autoAlpha: 1 }, 53.2);
      
      revealMask(".sc4-eyebrow .mask-inner", 54, 1.5);
      
      // Statement 1
      revealMask(".sc4-statement1 .mask-inner", 56, 2);
      hideMask(".sc4-statement1 .mask-inner", 61, 1);
      
      // Statement 2
      revealMask(".sc4-statement2 .mask-inner", 63, 2);
      hideMask(".sc4-statement2 .mask-inner", 68, 1);
      
      // Statement 3
      revealMask(".sc4-statement3 .mask-inner", 70, 2);
      hideMask(".sc4-statement3 .mask-inner", 75, 1);
      
      masterTl.to(".scene-interior", { autoAlpha: 0, duration: 1 }, 76.5);


      /* =======================================
         SCENE 5: MASTERPLAN (88.0% - 100%)
         ======================================= */
      // Gap from 77.0 to 88.0 is visual silence during exit
      
      masterTl.set(".scene-masterplan", { autoAlpha: 1 }, 88.0);
      
      revealMask(".sc6-eyebrow .mask-inner", 88.5, 1.5);
      
      // Headline 1
      revealMask(".sc6-h1 .mask-inner", 89.5, 1.5);
      hideMask(".sc6-h1 .mask-inner", 92.5, 1);
      
      // Headline 2
      revealMask(".sc6-h2 .mask-inner", 94, 1.5);
      hideMask(".sc6-h2 .mask-inner", 97, 1);
      
      // Final Statement (Subtle serif)
      masterTl.fromTo(".sc6-final", { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 2 }, 98);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="veda-cinematic">
      {!isLoaded && (
        <div className="loading-screen" style={{
          position: 'absolute', inset: 0, zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#181815', color: '#F3F0E8', fontSize: '11px', letterSpacing: '0.16em'
        }}>
          LOADING
        </div>
      )}
      
      <FrameSequenceCanvas 
        ref={canvasRef} 
        frameCount={545} 
        onLoaded={() => setIsLoaded(true)} 
      />

      <div className="veda-content">
        
        {/* SCENE 1: LAND */}
        <div className="editorial-layer scene-land">
          <div className="eyebrow sc1-eyebrow">
            <MaskText>01 / WHO WE ARE</MaskText>
          </div>
          <div className="headline-text sc1-headline">
            <MaskText>WE BELIEVE</MaskText><br/>
            <MaskText>GOOD LAND IS FOUND.</MaskText>
          </div>
        </div>

        {/* SCENE 2: PLOT / BUNGALOW */}
        <div className="editorial-layer scene-plots">
          <div className="headline-text sc2-headline">
            <MaskText>GREAT OPPORTUNITIES</MaskText><br/>
            <MaskText>ARE CREATED.</MaskText>
          </div>
        </div>

        {/* SCENE 3: BUNGALOW BODY */}
        <div className="editorial-layer scene-bungalow-body">
          <div className="body-text sc3-body">
            <MaskText>Veda Life Spaces identifies promising markets,</MaskText><br/>
            <MaskText>carefully selects land and develops thoughtfully</MaskText><br/>
            <MaskText>planned plotted communities with a focus on</MaskText><br/>
            <MaskText>clarity, quality and long-term value.</MaskText>
          </div>
        </div>

        {/* SCENE 4: INTERIOR */}
        <div className="editorial-layer scene-interior">
          <div className="eyebrow sc4-eyebrow">
            <MaskText>02 / WHAT WE DO</MaskText>
          </div>
          <div className="headline-text sc4-statement1">
            <MaskText>WE FIND LAND</MaskText><br/>
            <MaskText>WORTH OWNING.</MaskText>
          </div>
          <div className="headline-text sc4-statement2">
            <MaskText>WE DON'T JUST</MaskText><br/>
            <MaskText>FIND LAND.</MaskText>
          </div>
          <div className="headline-text sc4-statement3">
            <MaskText>WE FIND THE RIGHT</MaskText><br/>
            <MaskText>OPPORTUNITY.</MaskText>
          </div>
        </div>

        {/* SCENE 6: MASTERPLAN */}
        <div className="editorial-layer scene-masterplan">
          <div className="eyebrow sc6-eyebrow">
            <MaskText>03 / VEDA LIFE SPACES PROMISE</MaskText>
          </div>
          <div className="headline-text sc6-h1">
            <MaskText>WE FIND THE</MaskText><br/>
            <MaskText>OPPORTUNITY.</MaskText>
          </div>
          <div className="headline-text sc6-h2">
            <MaskText>WE GIVE YOU</MaskText><br/>
            <MaskText>THE CLARITY.</MaskText>
          </div>
          <div className="sc6-final">
            The right opportunity is only valuable<br/>
            when you can own it with confidence.
          </div>
        </div>

      </div>

      {isLoaded && (
        <div className="subtle-nav">
          <span className="active-num">0{activeChapter}</span>
          <span style={{ opacity: 0.3, margin: '0 8px' }}>/</span>
          <span style={{ opacity: 0.3 }}>03</span>
        </div>
      )}
    </div>
  );
}
