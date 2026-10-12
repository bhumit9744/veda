import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Initial state (positioned on the right, lowered, and faded out)
      gsap.set(textRef.current, {
        x: '15vw',
        y: 80,
        opacity: 0,
        rotation: 2 // Subtle tilt for the circular arc effect
      });

      // 1. Entrance Reveal (Triggered when section enters viewport)
      gsap.to(textRef.current, {
        y: 30, // Move upward slightly but keep room for the arc to crest
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // 2. Scrubbed Arc Animation (Triggered when section pins)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Scroll distance for the animation
          pin: true,
          scrub: 1,
        }
      });

      // Phase A: Move from right to dead center (crest of the arc)
      tl.to(textRef.current, {
        x: '0vw',
        y: 0, // Crest highest point
        rotation: 0,
        duration: 1,
        ease: 'power2.out'
      });

      // Phase B: Pause in the center to allow the user to read comfortably
      tl.to({}, { duration: 0.6 });

      // Phase C: Move from center to the left and fade out
      tl.to(textRef.current, {
        x: '-15vw',
        y: 60, // Dip down again
        rotation: -2,
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden flex items-center justify-center z-20"
    >
      <div 
        ref={textRef} 
        className="w-[90vw] md:w-[75vw] lg:w-[65vw] max-w-[1100px] text-center pointer-events-none"
      >
        <p className="font-veda-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] leading-[1.35] tracking-tight">
          Unlike traditional plotted developments where you start from scratch, Veda offers thoughtfully designed European-inspired villas. 
          <span className="block mt-8 text-[#555] font-veda-sans text-lg md:text-xl font-light tracking-wide max-w-[700px] mx-auto leading-relaxed">
            You own the land while we bring your dream home to life with curated architecture, efficient planning, and premium execution.
          </span>
        </p>
      </div>
    </section>
  );
}
