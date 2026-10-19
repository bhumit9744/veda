import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { assetUrl } from '../../utils/assetUrl';

gsap.registerPlugin(ScrollTrigger);

export default function LandShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(textRef);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(q('.land-eyebrow'), 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo(q('.land-main'), 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(q('.land-secondary'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.9'
      );

      // Parallax for the background
      gsap.fromTo('.land-bg', 
        { yPercent: -10 },
        { 
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="land-showcase-section" 
      data-section="second-section" 
      className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-black z-20 flex items-center"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <picture className="w-full h-full">
          <source media="(max-width: 767px)" srcSet={assetUrl('/Plots-mobile.png')} />
          <source media="(min-width: 768px)" srcSet={assetUrl('/Plots.png')} />
          <img 
            src={assetUrl('/Plots.png')} 
            alt="Veda Life Spaces - 4 Acres - 42 Branded Villa Plots"
            className="land-bg w-full h-[120%] object-cover absolute top-[-10%] left-0"
          />
        </picture>
        {/* Subtle, carefully controlled overlay to ensure aerial plots and landscape remain vivid */}
        <div className="absolute inset-0 bg-black/25"></div>
        {/* Soft gradient from left for crisp, legible typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
      </div>

      {/* Editorial Content Container */}
      <div 
        ref={textRef} 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full pt-10"
      >
        <div className="max-w-3xl text-left">
          {/* Eyebrow */}
          <div className="land-eyebrow flex items-center gap-4 mb-6 md:mb-10">
            <span className="font-veda-sans text-xs md:text-sm tracking-[0.25em] uppercase text-white/80">
              AN EXCLUSIVE LANDSCAPE
            </span>
            <div className="h-px w-12 bg-white/30"></div>
          </div>

          {/* Main statement - Asymmetrical styling */}
          <div className="land-main flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-8">
            <h2 className="font-veda-serif text-white leading-[0.85]">
              <span className="text-[6rem] md:text-[10rem] lg:text-[13rem] tracking-tight block drop-shadow-md">4</span>
            </h2>
            <h2 className="font-veda-serif text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase font-light text-white/90 drop-shadow-sm">
              ACRES
            </h2>
          </div>

          {/* Secondary statement */}
          <div className="land-secondary max-w-full">
            <h3 className="font-veda-sans text-sm md:text-lg lg:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/95 border-l-2 border-[#b89a6b] pl-4 md:pl-6 py-1 leading-loose">
              42 Branded Villa Plots for the Privileged 42
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
