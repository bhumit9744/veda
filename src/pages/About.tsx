import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlantSequence from '../components/cinematic/PlantSequence';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal simple text elements
      gsap.utils.toArray('.reveal-text').forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 2. Progressive word reveal (Belief section)
      const beliefTrigger = document.querySelector('.belief-container');
      if (beliefTrigger) {
        gsap.fromTo('.belief-word', 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: beliefTrigger,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 3. Beyond Land Progressive reveal
      const beyondTrigger = document.querySelector('.beyond-container');
      if (beyondTrigger) {
        gsap.fromTo('.beyond-phrase', 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: beyondTrigger,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 4. Approach scroll transformation (Land to Lifespace)
      const approachContainer = document.querySelector('.approach-container');
      if (approachContainer) {
        const approachSteps = gsap.utils.toArray('.approach-step');
        const approachLines = gsap.utils.toArray('.approach-line');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: approachContainer,
            start: "top 40%",
            end: "+=150%",
            pin: true,
            scrub: 1
          }
        });

        approachSteps.forEach((step, i) => {
          // Fade out previous step if not first
          if (i > 0) {
            tl.to(approachSteps[i - 1], { opacity: 0.2, duration: 0.5 }, `step${i}`);
          }
          // Fade in current step
          tl.to(step, { opacity: 1, y: 0, duration: 1 }, `step${i}`);
          // Draw line if it exists
          if (approachLines[i]) {
            tl.to(approachLines[i], { scaleY: 1, duration: 1 }, `step${i}`);
          }
          // Hold
          tl.to({}, { duration: 0.5 });
        });
      }

      // 5. Comprehensive words
      const compTrigger = document.querySelector('.comp-container');
      if (compTrigger) {
        gsap.fromTo('.comp-word', 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: compTrigger,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0A100D] text-[#E8E6E1] overflow-hidden selection:bg-[#E8E6E1] selection:text-[#0A100D]">
      
      {/* =========================================
          CHAPTER 01: HERO
          ========================================= */}
      <section className="relative w-full h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-16 lg:px-24">
        {/* Soft atmospheric gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#141C16] via-[#0A100D] to-[#0A100D] opacity-80 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full justify-between">
          <div className="reveal-text">
            <p className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#88908A] mb-12">About Veda Life Spaces</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight">
              <span className="block text-[#C2C7C4]">GOOD LAND</span>
              <span className="block text-[#C2C7C4] mb-4 md:mb-6">IS FOUND.</span>
              <span className="block text-[#E8E6E1]">GREAT OPPORTUNITIES</span>
              <span className="block text-[#E8E6E1]">ARE CREATED.</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <p className="reveal-text text-sm md:text-base md:w-[420px] leading-relaxed text-[#88908A]">
              WE CREATE PRIVATE LIFESTYLE COMMUNITIES WHERE LAND BECOMES A FOUNDATION FOR LONG-TERM VALUE, BELONGING AND LEGACY.
            </p>
            
            <div className="flex flex-col items-center md:items-end gap-4 reveal-text opacity-70">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#88908A]">Scroll to explore</p>
              <div className="w-[1px] h-16 bg-gradient-to-b from-[#88908A] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CHAPTER 02: BELIEF
          ========================================= */}
      <section className="relative w-full min-h-screen flex items-center py-32 px-6 md:px-16 lg:px-24 belief-container">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#C2C7C4]">
              <span className="block reveal-text">BUILT ON</span>
              <span className="block text-[#E8E6E1] belief-word opacity-0 translate-y-8">VISION.</span>
              <span className="block text-[#E8E6E1] belief-word opacity-0 translate-y-8">ETHICS.</span>
              <span className="block text-[#E8E6E1] belief-word opacity-0 translate-y-8">DISCIPLINE.</span>
              <span className="block text-[#E8E6E1] belief-word opacity-0 translate-y-8">AUTHENTICITY.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end pb-4 space-y-8 text-base md:text-lg leading-relaxed text-[#A3A8A4] max-w-lg">
            <p className="reveal-text">
              Veda Life Spaces is built on a simple belief that land ownership should be secure, transparent, and meaningful.
            </p>
            <p className="reveal-text">
              We focus on creating private lifestyle communities for a very limited set of families...
            </p>
            <p className="reveal-text">
              ...where every land parcel is legally verified, thoughtfully planned, and developed with strong ethical standards.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          CHAPTER 03: BEYOND LAND
          ========================================= */}
      <section className="relative w-full min-h-[80vh] flex items-center py-32 px-6 md:px-16 lg:px-24 beyond-container">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl font-light leading-[1.1] tracking-tight text-[#E8E6E1] mb-12 reveal-text">
            MORE THAN<br/>AN ASSET.
          </h2>
          <p className="text-lg md:text-xl text-[#A3A8A4] mb-16 reveal-text">
            Our approach goes beyond selling land.
          </p>
          
          <div className="flex flex-col items-center space-y-6 text-2xl md:text-4xl font-light tracking-widest uppercase text-[#C2C7C4]">
            <span className="beyond-phrase opacity-0 translate-y-8">WE CURATE SPACES</span>
            <span className="beyond-phrase opacity-0 translate-y-8">THAT OFFER PRIVACY.</span>
            <span className="beyond-phrase opacity-0 translate-y-8 text-[#E8E6E1]">LONG-TERM VALUE.</span>
            <span className="beyond-phrase opacity-0 translate-y-8">AND A SENSE OF BELONGING.</span>
          </div>

          <p className="mt-20 text-sm md:text-base text-[#88908A] tracking-widest uppercase reveal-text">
            For those who seek more than just an investment.
          </p>
        </div>
      </section>

      {/* =========================================
          CHAPTER 04: THE APPROACH (SCROLL ANIMATION)
          ========================================= */}
      <section className="relative w-full min-h-screen py-32 approach-container bg-[#080C0A]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-16 h-full items-start md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-light leading-[1.1] tracking-tight text-[#E8E6E1] mb-8 reveal-text">
              FROM LAND<br/>TO LIFESPACE.
            </h2>
            <p className="text-lg md:text-xl text-[#A3A8A4] leading-relaxed max-w-md reveal-text">
              At our core, we combine disciplined execution with a vision for future-ready living.
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col gap-0 border-l border-[#202822] pl-8">
            {['LAND ACQUISITION', 'DUE DILIGENCE', 'INFRASTRUCTURE', 'PLANNING', 'HOME BUILD SUPPORT'].map((step, i) => (
              <div key={step} className="relative py-8 approach-step opacity-20 translate-y-8">
                <div className="absolute -left-[33px] top-1/2 w-[16px] h-[1px] bg-[#C2C7C4] approach-line origin-left scale-y-0" />
                <h3 className="text-xl md:text-3xl font-light tracking-widest text-[#E8E6E1] uppercase">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CHAPTER 05: THE COMPREHENSIVE APPROACH
          ========================================= */}
      <section className="relative w-full min-h-screen flex items-center py-32 px-6 md:px-16 lg:px-24 comp-container">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#C2C7C4] mb-16">
            <span className="block reveal-text">EVERY OPPORTUNITY</span>
            <span className="block reveal-text">DESERVES</span>
            <span className="block text-[#E8E6E1] reveal-text">DISCIPLINE.</span>
          </h2>
          
          <div className="max-w-2xl text-base md:text-xl leading-relaxed text-[#A3A8A4] space-y-8 mb-16">
            <p className="reveal-text">
              From land acquisition and due diligence to infrastructure planning and home build support...
            </p>
            <p className="reveal-text">
              ...we take a comprehensive approach to ensure every opportunity is secure, practical, and growth oriented.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-xl md:text-3xl font-light tracking-widest text-[#E8E6E1] uppercase">
            <span className="comp-word opacity-0 translate-y-8">SECURE.</span>
            <span className="comp-word opacity-0 translate-y-8">PRACTICAL.</span>
            <span className="comp-word opacity-0 translate-y-8">GROWTH ORIENTED.</span>
          </div>
        </div>
      </section>

      {/* =========================================
          CHAPTER 06: CLIMAX (PLANT SEQUENCE)
          ========================================= */}
      {/* The Plant Sequence will act as the portal. It has a dark background and pins. */}
      <PlantSequence />

      {/* =========================================
          CHAPTER 07: LEGACY (LIGHT THEME)
          ========================================= */}
      {/* Transitioning to light theme. We wrap this in a block that has light bg. */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-6 md:px-16 lg:px-24 bg-[#F5F1E8] text-[#0A100D] transition-colors duration-1000">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8 reveal-text">
            <span className="block">LAND BECOMES</span>
            <span className="block">MORE THAN AN ASSET.</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[#5A5C5A] mb-16 reveal-text max-w-2xl mx-auto leading-relaxed">
            It becomes a foundation for legacy, stability, and a refined lifestyle.
          </p>

          <h3 className="text-6xl md:text-9xl font-light tracking-tight text-[#0A100D] mb-32 reveal-text">
            LEGACY
          </h3>
          
          <div className="flex flex-col items-center gap-4 text-sm md:text-base uppercase tracking-widest text-[#5A5C5A]">
            <span className="reveal-text font-medium text-[#0A100D] tracking-[0.2em]">VEDA LIFE SPACES</span>
            <span className="reveal-text">Thoughtfully chosen.</span>
            <span className="reveal-text">Meticulously planned.</span>
            <span className="reveal-text">Created with intention.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
