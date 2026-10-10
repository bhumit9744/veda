import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const villas = [
  { id: '01', title: 'VILLA CLASSIC', image: '/villa 1 cutout.png' },
  { id: '02', title: 'VILLA GRANDE', image: '/villa 2 cutout.png' },
  { id: '03', title: 'VILLA ROYALE', image: '/villa 3 cutout.png' },
];

export default function DesignReadyVillas() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      
      // 0. Initial Text Setup
      gsap.set(textRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: '50%',
        top: '40%', 
        x: '15vw',
        y: 80,
        opacity: 0,
        rotation: 2 // arc tilt
      });

      // 1. Entrance Text Animation (Triggers just before pinning)
      gsap.to(textRef.current, {
        y: 30, 
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // 2. Initial Villa Setup (Hidden off-stage or faded out initially)
      // Typography for Villa A:
      gsap.set('.villa-a-text', {
        y: 40,
      });

      // Typography for Villa B:
      gsap.set('.villa-b-text', {
        y: 40,
        opacity: 0,
      });

      // Typography for Villa C:
      gsap.set('.villa-c-text', {
        y: 40,
        opacity: 0,
      });

      // Villa 01: Center initially, scaled down and invisible until text exits
      gsap.set('.villa-card-0', {
        xPercent: -50,
        yPercent: -50,
        left: '50%',
        top: '50%',
        scale: 0.8,
        rotation: -5,
        opacity: 0,
      });

      // Villa 02: Right edge
      gsap.set('.villa-card-1', {
        xPercent: -50,
        yPercent: -50,
        left: '120%',
        top: '58%',
        scale: 0.7,
        rotation: 10,
        opacity: 0,
      });

      // Villa 03: Further right
      gsap.set('.villa-card-2', {
        xPercent: -50,
        yPercent: -50,
        left: '160%',
        top: '65%',
        scale: 0.6,
        rotation: 15,
        opacity: 0, 
      });

      // Master Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%', // Total scroll distance accommodates both phases
          pin: true,
          scrub: 1,
        }
      });

      // --- PHASE A: Text Arc ---
      
      // 0 to 15: Text to center
      tl.to(textRef.current, {
        x: '0vw',
        y: 0,
        rotation: 0,
        duration: 15,
        ease: 'power2.out'
      }, 0);

      // 15 to 20: Text holds center
      tl.to({}, { duration: 5 }, 15);

      // 20 to 35: Text moves left and exits
      tl.to(textRef.current, {
        x: '-25vw',
        y: 60,
        rotation: -2,
        opacity: 0,
        duration: 15,
        ease: 'power2.in'
      }, 20);

      // --- PHASE B: Villa Carousel Begins ---
      
      // 25 to 35: Reveal Villa 01 and 02 seamlessly as text fades out
      tl.to('.villa-a-text', {
        y: 0,
        duration: 10,
        ease: 'power2.out'
      }, 25);

      tl.to('.villa-card-0', {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 10,
        ease: 'power2.out'
      }, 25);

      tl.to('.villa-card-1', {
        scale: 0.8,
        opacity: 0.6,
        duration: 10,
        ease: 'power2.out'
      }, 25);

      // 35 to 40: Hold Villa 01 in center
      tl.to({}, { duration: 5 }, 35);

      // 40 to 70: Villa 01 -> Villa 02 Transition
      
      // Reveal Villa B text smoothly as it approaches center
      tl.to('.villa-b-text', {
        y: 0,
        opacity: 1,
        duration: 20,
        ease: 'power2.out'
      }, 45);

      tl.to('.villa-card-0', {
        left: '-20%',
        top: '58%',
        scale: 0.8,
        rotation: -10,
        opacity: 0.6,
        duration: 30,
        ease: 'power2.inOut',
      }, 40);

      tl.to('.villa-card-1', {
        left: '50%',
        top: '50%',
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 30,
        ease: 'power2.inOut',
      }, 40);
      
      tl.to('.villa-card-2', {
        left: '120%',
        top: '58%',
        scale: 0.8,
        rotation: 10,
        opacity: 0.6,
        duration: 30,
        ease: 'power2.inOut',
      }, 40);

      // 70 to 75: Hold Villa 02 in center
      tl.to({}, { duration: 5 }, 70);

      // 75 to 105: Villa 02 -> Villa 03 Transition
      
      // Reveal Villa C text smoothly as it approaches center
      tl.to('.villa-c-text', {
        y: 0,
        opacity: 1,
        duration: 20,
        ease: 'power2.out'
      }, 80);

      tl.to('.villa-card-0', {
        left: '-60%',
        top: '65%',
        scale: 0.7,
        rotation: -15,
        opacity: 0,
        duration: 30,
        ease: 'power2.inOut',
      }, 75);

      tl.to('.villa-card-1', {
        left: '-20%',
        top: '58%',
        scale: 0.8,
        rotation: -10,
        opacity: 0.6,
        duration: 30,
        ease: 'power2.inOut',
      }, 75);

      tl.to('.villa-card-2', {
        left: '50%',
        top: '50%',
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 30,
        ease: 'power2.inOut',
      }, 75);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden z-20">
      
      {/* TEXT LAYER */}
      <div 
        ref={textRef} 
        className="absolute w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1200px] text-center pointer-events-none z-10 flex flex-col items-center justify-center gap-6"
      >
        <h2 className="font-veda-serif text-4xl md:text-6xl lg:text-7xl text-[#2d2d2d] leading-[1.1] tracking-tight max-w-[900px] mx-auto">
          European-Inspired Architecture for the Privileged 42.
        </h2>
        
        <p className="text-[#555] font-veda-sans text-base md:text-lg lg:text-xl font-light tracking-wide max-w-[650px] mx-auto leading-relaxed mt-2 md:mt-4">
          Unlike traditional plotted developments where you start from scratch, Veda offers thoughtfully designed European-inspired villas.
        </p>

        <p className="text-[#666] font-veda-sans text-sm md:text-base lg:text-lg font-light tracking-wide max-w-[600px] mx-auto leading-relaxed">
          You own the land while we bring your dream home to life with curated architecture, efficient planning, and premium execution.
        </p>
      </div>

      {/* CARDS LAYER */}
      <div className="absolute top-[8vh] md:top-[12vh] lg:top-[15vh] left-0 w-full h-full pointer-events-none z-0">
         {villas.map((villa, i) => (
           <div 
             key={i} 
             className={`villa-card-${i} absolute w-[85vw] md:w-[60vw] max-w-[900px] aspect-video flex flex-col`}
           >
             {/* Typography for Villa Classic (i === 0) */}
             {i === 0 && (
               <div className="villa-a-text absolute -top-24 md:-top-32 lg:-top-40 left-0 w-full flex flex-col items-center text-center pointer-events-none pt-4 md:pt-6">
                 <h2 className="font-veda-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-3 md:mb-4 font-normal tracking-tight">
                   VILLA CLASSIC
                 </h2>
                 <p className="font-veda-sans text-[11px] md:text-xs text-[#666] font-medium tracking-[0.2em] uppercase">
                   1500 SQUARE FEET
                 </p>
               </div>
             )}

             {/* Typography for Villa Grande (i === 1) */}
             {i === 1 && (
               <div className="villa-b-text absolute -top-24 md:-top-32 lg:-top-40 left-0 w-full flex flex-col items-center text-center pointer-events-none pt-4 md:pt-6">
                 <h2 className="font-veda-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-3 md:mb-4 font-normal tracking-tight">
                   VILLA GRANDE
                 </h2>
                 <p className="font-veda-sans text-[11px] md:text-xs text-[#666] font-medium tracking-[0.2em] uppercase">
                   2300 SQUARE FEET
                 </p>
               </div>
             )}

             {/* Typography for Villa Royale (i === 2) */}
             {i === 2 && (
               <div className="villa-c-text absolute -top-24 md:-top-32 lg:-top-40 left-0 w-full flex flex-col items-center text-center pointer-events-none pt-4 md:pt-6">
                 <h2 className="font-veda-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-3 md:mb-4 font-normal tracking-tight">
                   VILLA ROYALE
                 </h2>
                 <p className="font-veda-sans text-[11px] md:text-xs text-[#666] font-medium tracking-[0.2em] uppercase">
                   3000 SQUARE FEET
                 </p>
               </div>
             )}

             <div className="relative w-full h-full flex items-center justify-center">
               <img 
                 src={villa.image} 
                 alt={villa.title} 
                 className="w-full h-full object-contain" 
               />
             </div>
             
             {/* Text floating natively without card overlays */}
             <div className="absolute bottom-0 left-0 w-full flex flex-col items-start px-4 md:px-8 pb-4">
               <span className="block font-veda-sans text-[10px] md:text-xs tracking-widest uppercase text-[#888] mb-1 md:mb-2">
                 Type {villa.id}
               </span>
               <h3 className="font-veda-serif text-3xl md:text-5xl text-[#2d2d2d] drop-shadow-md">
                 {villa.title}
               </h3>
             </div>
           </div>
         ))}
      </div>

    </section>
  );
}
