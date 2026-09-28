import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameSequenceCanvas from './FrameSequenceCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    let ctx = gsap.context(() => {
      
      const enterText = (targets, startTime, duration = 0.9) => {
        return masterTl.fromTo(
          targets,
          { y: 25, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration, ease: "power3.out" },
          startTime
        );
      };

      const exitText = (targets, startTime, duration = 0.8) => {
        return masterTl.to(
          targets,
          { y: -25, autoAlpha: 0, duration, ease: "power3.out" },
          startTime
        );
      };

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=8000",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (canvasRef.current) {
              canvasRef.current.setProgress(self.progress);
            }
            
            // Map chapters based on timeline progress
            if (self.progress < 0.45) setActiveChapter(1);
            else if (self.progress < 0.75) setActiveChapter(2);
            else setActiveChapter(3);
          }
        }
      });

      // Master timeline is 100 total units
      
      /* =======================================
         SCENE 1: LAND & PLOT (0 - 24)
         ======================================= */
      masterTl.set(".scene-land", { autoAlpha: 1 }, 0);
      masterTl.set([".h1-2", ".h2-2", ".h2-3", ".h3-2"], { autoAlpha: 0, y: 25 }, 0);
      
      masterTl.fromTo(".sc1-header", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" }, 0);
      enterText(".h1-1", 1);
      
      masterTl.to(".scroll-indicator", { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, 5);
      
      // Transition: WE BELIEVE -> GREAT OPPORTUNITIES
      exitText(".h1-1", 12);
      enterText(".h1-2", 13.5);
      
      exitText(".sc1-header", 22);
      exitText(".h1-2", 22.5);
      masterTl.to(".scene-land", { autoAlpha: 0, duration: 1 }, 24);


      /* =======================================
         SCENE 2: BUNGALOW HERO (24 - 40)
         ======================================= */
      masterTl.set(".scene-bungalow", { autoAlpha: 1 }, 24);
      
      // Body Copy
      enterText(".body-copy", 25);
      exitText(".body-copy", 31);
      
      // Principles List
      enterText(".principles-list", 32.5);
      
      masterTl.set(".pl-1", { className: "editorial-list-item active" }, 33);
      masterTl.set(".pl-1", { className: "editorial-list-item" }, 35);
      
      masterTl.set(".pl-2", { className: "editorial-list-item active" }, 35);
      masterTl.set(".pl-2", { className: "editorial-list-item" }, 37);
      
      masterTl.set(".pl-3", { className: "editorial-list-item active" }, 37);
      masterTl.set(".pl-3", { className: "editorial-list-item" }, 39);
      
      exitText(".principles-list", 39.5);
      masterTl.to(".scene-bungalow", { autoAlpha: 0, duration: 1 }, 40);


      /* =======================================
         SCENE 3: SIGNATURE / BEYOND LIVING (40 - 50)
         ======================================= */
      masterTl.set(".scene-signature", { autoAlpha: 1 }, 40);
      
      // Visual silence 40-44
      enterText(".signature-block", 44, 1.5);
      exitText(".signature-block", 48, 1.0);
      
      masterTl.to(".scene-signature", { autoAlpha: 0, duration: 1 }, 50);


      /* =======================================
         SCENE 4: INTERIOR (50 - 75)
         ======================================= */
      masterTl.set(".scene-interior", { autoAlpha: 1 }, 50);
      
      masterTl.fromTo(".sc4-header", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" }, 52);
      enterText(".h2-1", 53.5);
      
      exitText(".h2-1", 58);
      enterText(".h2-2", 59.5);
      
      exitText(".h2-2", 64);
      enterText(".h2-3", 65.5);
      
      exitText(".sc4-header", 71);
      exitText(".h2-3", 72);
      masterTl.to(".scene-interior", { autoAlpha: 0, duration: 1 }, 74);


      /* =======================================
         SCENE 5: MASTERPLAN (75 - 100)
         ======================================= */
      masterTl.set(".scene-masterplan", { autoAlpha: 1 }, 75);
      
      masterTl.fromTo(".sc5-header", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" }, 77);
      enterText(".h3-1", 78.5);
      
      exitText(".h3-1", 83);
      enterText(".h3-2", 84.5);
      
      // Remove headline, let masterplan breathe
      exitText(".sc5-header", 89);
      exitText(".h3-2", 89);
      
      // Visual silence 89-94
      
      enterText(".final-statement", 94, 2);

      // Force timeline to exactly 100 units
      masterTl.set({}, {}, 100);

      // Ensure ScrollTrigger measures the layout correctly after initialization
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="veda-cinematic">
      {!isLoaded && (
        <div className="loading-screen" style={{
          position: 'absolute', inset: 0, zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#171714', color: '#F4F1E8', fontSize: '11px', letterSpacing: '0.16em', fontWeight: 500
        }}>
          LOADING
        </div>
      )}
      
      <FrameSequenceCanvas 
        ref={canvasRef} 
        frameCount={520} 
        onLoaded={() => setIsLoaded(true)} 
      />

      {isLoaded && (
        <div className="micro-nav">
          <div className={activeChapter === 1 ? "active-num" : ""}>01</div>
          <div className="nav-line"></div>
          <div className={activeChapter === 2 ? "active-num" : ""}>02</div>
          <div className="nav-line"></div>
          <div className={activeChapter === 3 ? "active-num" : ""}>03</div>
        </div>
      )}

      <div className="veda-content">
        
        {/* SCENE 1: LAND & PLOT */}
        <div className="editorial-layer scene-land">
          <div className="pos-top-left sc1-header">
            <div className="eyebrow">
              01 / WHO WE ARE
              <div className="eyebrow-divider"></div>
            </div>
            <div className="scroll-indicator">
              Scroll to explore
              <div className="line"></div>
            </div>
          </div>

          <div className="headline-text pos-bottom-left text-gradient-bg">
            <div className="h1-1">
              WE BELIEVE<br/>GOOD LAND IS FOUND.
            </div>
            <div className="abs-overlay h1-2">
              GREAT OPPORTUNITIES<br/>ARE CREATED.
            </div>
          </div>
        </div>

        {/* SCENE 2: BUNGALOW HERO */}
        <div className="editorial-layer scene-bungalow">
          <div className="pos-bottom-right body-copy text-gradient-bg" style={{ marginBottom: '15vh' }}>
            <p className="body-text">
              Veda Life Spaces identifies promising markets, carefully selects land and develops thoughtfully planned plotted communities with a focus on clarity, quality and long-term value.
            </p>
          </div>
          
          <div className="pos-center-left principles-list text-gradient-bg" style={{ marginLeft: '4vw' }}>
            <div className="editorial-list">
              <div className="editorial-list-item pl-1">
                <span>01</span>
                <div>
                  <div className="line"></div>
                  <p style={{marginTop: '16px'}}>Thoughtful in what we choose.</p>
                </div>
              </div>
              <div className="editorial-list-item pl-2">
                <span>02</span>
                <div>
                  <div className="line"></div>
                  <p style={{marginTop: '16px'}}>Meticulous in how we work.</p>
                </div>
              </div>
              <div className="editorial-list-item pl-3">
                <span>03</span>
                <div>
                  <div className="line"></div>
                  <p style={{marginTop: '16px'}}>Committed to what comes next.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCENE 3: SIGNATURE */}
        <div className="editorial-layer scene-signature">
          <div className="pos-center-left signature-block" style={{ gridColumn: '2 / span 5' }}>
            <div className="signature-text text-gradient-bg" style={{ display: 'inline-block', padding: '20px', margin: '-20px' }}>Beyond Living.</div>
          </div>
        </div>

        {/* SCENE 4: INTERIOR */}
        <div className="editorial-layer scene-interior">
          <div className="pos-top-left sc4-header">
            <div className="eyebrow">
              02 / WHAT WE DO
              <div className="eyebrow-divider"></div>
            </div>
          </div>
          <div className="headline-text pos-interior-align text-gradient-bg">
            <div className="h2-1">
              WE FIND LAND<br/>WORTH OWNING.
            </div>
            <div className="abs-overlay h2-2">
              WE DON'T JUST<br/>FIND LAND.
            </div>
            <div className="abs-overlay h2-3">
              WE FIND THE RIGHT<br/>OPPORTUNITY.
            </div>
          </div>
        </div>

        {/* SCENE 5: MASTERPLAN */}
        <div className="editorial-layer scene-masterplan">
          <div className="pos-top-left sc5-header">
            <div className="eyebrow">
              03 / VEDA LIFE SPACES PROMISE
              <div className="eyebrow-divider"></div>
            </div>
          </div>
          
          <div className="headline-text pos-bottom-left text-gradient-bg">
            <div className="h3-1">
              WE FIND THE<br/>OPPORTUNITY.
            </div>
            <div className="abs-overlay h3-2">
              WE GIVE YOU<br/>THE CLARITY.
            </div>
          </div>
          
          <div className="pos-bottom-right final-statement text-gradient-bg" style={{ marginBottom: '12vh' }}>
            The right opportunity is only valuable<br/>
            when you can own it with confidence.
          </div>
        </div>

      </div>
    </div>
  );
}
