import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OwnershipJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      if (prefersReducedMotion) {
        gsap.set('.journey-header, .journey-stage-1, .journey-stage-2, .journey-stage-3', {
          opacity: 1,
          y: 0,
          scale: 1
        });
        if (path1Ref.current) gsap.set(path1Ref.current, { strokeDashoffset: 0 });
        if (path2Ref.current) gsap.set(path2Ref.current, { strokeDashoffset: 0 });
        return;
      }

      if (isDesktop && path1Ref.current && path2Ref.current) {
        const path1 = path1Ref.current;
        const path2 = path2Ref.current;
        const len1 = path1.getTotalLength();
        const len2 = path2.getTotalLength();

        // Initialize SVG paths to hidden (offset = full length)
        gsap.set(path1, { strokeDasharray: len1, strokeDashoffset: len1 });
        gsap.set(path2, { strokeDasharray: len2, strokeDashoffset: len2 });

        // Initial states: Header & Stage 1 fade in, Stage 2 & 3 hidden until SVG reaches them
        gsap.set('.journey-header', { opacity: 0, y: 24 });
        gsap.set('.journey-stage-1', { opacity: 0, y: 30, scale: 0.98 });
        gsap.set('.journey-stage-2', { opacity: 0, y: 30, scale: 0.96 });
        gsap.set('.journey-stage-3', { opacity: 0, y: 30, scale: 0.96 });

        // Master Pinned Timeline: Reveals milestones one by one as SVG curve draws
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1
          }
        });

        // Step 1: Reveal Header & Milestone 1 (BUY)
        tl.to('.journey-header', {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        }, 0);

        tl.to('.journey-stage-1', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out'
        }, 0.05);

        // Step 2: Draw SVG curve from BUY to BUILD
        tl.to(path1, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: 'none'
        }, 0.2);

        // Step 3: When SVG reaches BUILD, reveal Milestone 2 (BUILD)
        tl.to('.journey-stage-2', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out'
        }, 0.5);

        // Step 4: Draw SVG curve from BUILD to SELL
        tl.to(path2, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: 'none'
        }, 0.65);

        // Step 5: When SVG reaches SELL, reveal Milestone 3 (SELL)
        tl.to('.journey-stage-3', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out'
        }, 0.95);

        // Step 6: Hold completed state before releasing pin
        tl.to({}, { duration: 0.2 });

      } else {
        // Mobile / Tablet: Sequential scroll triggers without pinning
        gsap.fromTo('.journey-header',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        ['.journey-stage-1', '.journey-stage-2', '.journey-stage-3'].forEach((selector, i) => {
          gsap.fromTo(selector,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: selector,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnquiryScroll = () => {
    const el = document.querySelector('form') || document.querySelector('.enquiry-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-clip z-20 font-codec bg-[#FAF8F5]"
      style={{ minHeight: '100vh' }}
    >
      {/* 
        ========================================================================
        EDGE-TO-EDGE SECTION BACKGROUND
        Artwork covers entire section from edge to edge with warm ivory base,
        faded trees in bottom-left, and topographic linework in bottom-right.
        ========================================================================
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundColor: '#FAF8F5',
          backgroundImage: "url('/images/veda-journey-bg.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom'
        }}
        aria-hidden="true"
      />

      {/* 
        ========================================================================
        FOREGROUND CONTENT LAYER (z-10)
        ========================================================================
      */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full min-h-screen flex flex-col justify-between py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* --- 1. SECTION HEADER --- */}
        <div className="journey-header text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <h2 className="font-codec text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#1C1D1A] font-normal leading-[1.2] tracking-tight">
            A Privilege That Goes<br />
            <span className="text-[#8C6F4B] italic font-light">Beyond Ownership.</span>
          </h2>
        </div>

        {/* --- 2. DESKTOP CONTINUOUS ARCHITECTURAL PATHWAY (Hidden on Mobile) --- */}
        <div className="hidden lg:block relative w-full my-auto py-2">
          
          <div className="relative w-full max-w-6xl mx-auto">

            {/* Background SVG connecting curve tracks positioned behind circles */}
            <div className="absolute top-0 left-0 right-0 h-56 xl:h-64 pointer-events-none z-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Guide track 1 (BUY to BUILD) */}
                <path
                  d="M 310 130 C 355 130 365 210 400 210 C 435 210 445 130 490 130"
                  stroke="#A47A53"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Animated active path 1 (Draws on scroll) */}
                <path
                  ref={path1Ref}
                  d="M 310 130 C 355 130 365 210 400 210 C 435 210 445 130 490 130"
                  stroke="#9E7750"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Guide track 2 (BUILD to SELL) */}
                <path
                  d="M 710 130 C 755 130 765 210 800 210 C 835 210 845 130 890 130"
                  stroke="#A47A53"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Animated active path 2 (Draws on scroll) */}
                <path
                  ref={path2Ref}
                  d="M 710 130 C 755 130 765 210 800 210 C 835 210 845 130 890 130"
                  stroke="#9E7750"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* 3 Milestone Columns (Revealed one by one on scroll) */}
            <div className="relative z-10 grid grid-cols-3 w-full">
              
              {/* STAGE 1: BUY */}
              <div className="journey-stage-1 flex flex-col items-center text-center px-4 font-codec">
                <div className="relative w-56 h-56 xl:w-64 xl:h-64 mb-6 flex items-center justify-center">
                  <img
                    src="/images/token-buy-clean.png"
                    alt="Veda Ownership - Buy"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-codec text-2xl xl:text-3xl text-[#1C1D1A] font-normal tracking-wide mb-2 uppercase">
                  BUY
                </h3>
                <span className="w-8 h-[1.5px] bg-[#9E7750] mb-3" />
                <p className="font-codec text-sm xl:text-[15px] text-[#555] leading-relaxed font-light max-w-[240px]">
                  Expert guidance to help you find the right plot.
                </p>
              </div>

              {/* STAGE 2: BUILD */}
              <div className="journey-stage-2 flex flex-col items-center text-center px-4 font-codec">
                <div className="relative w-56 h-56 xl:w-64 xl:h-64 mb-6 flex items-center justify-center">
                  <img
                    src="/images/token-build-clean.png"
                    alt="Veda Ownership - Build"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-codec text-2xl xl:text-3xl text-[#1C1D1A] font-normal tracking-wide mb-2 uppercase">
                  BUILD
                </h3>
                <span className="w-8 h-[1.5px] bg-[#9E7750] mb-3" />
                <p className="font-codec text-sm xl:text-[15px] text-[#555] leading-relaxed font-light max-w-[240px]">
                  Assistance to bring your vision to life.
                </p>
              </div>

              {/* STAGE 3: SELL */}
              <div className="journey-stage-3 flex flex-col items-center text-center px-4 font-codec">
                <div className="relative w-56 h-56 xl:w-64 xl:h-64 mb-6 flex items-center justify-center">
                  <img
                    src="/images/token-sell-clean.png"
                    alt="Veda Ownership - Sell"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-codec text-2xl xl:text-3xl text-[#1C1D1A] font-normal tracking-wide mb-2 uppercase">
                  SELL
                </h3>
                <span className="w-8 h-[1.5px] bg-[#9E7750] mb-3" />
                <p className="font-codec text-sm xl:text-[15px] text-[#555] leading-relaxed font-light max-w-[240px]">
                  Support to help you realise your plot’s value.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* --- 3. MOBILE RESPONSIVE TIMELINE (Shown on Mobile / Tablet) --- */}
        <div className="block lg:hidden relative w-full my-8">
          
          {/* Continuous vertical timeline connector line */}
          <div className="absolute left-8 top-12 bottom-12 w-[1.5px] bg-gradient-to-b from-[#9E7750] via-[#9E7750]/60 to-[#9E7750]" />

          <div className="flex flex-col gap-12 font-codec">
            
            {/* Stage 1: BUY */}
            <div className="journey-stage-1 relative pl-20 flex flex-col items-start font-codec">
              {/* Node indicator */}
              <div className="absolute left-[26px] top-4 w-4 h-4 rounded-full border-2 border-[#9E7750] bg-[#FAF8F5] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#9E7750]" />
              </div>

              {/* Visual circle token */}
              <div className="w-20 h-20 rounded-full overflow-hidden border border-[#D5C7B0] shadow-xs mb-3">
                <img src="/images/token-buy-clean.png" alt="Buy" className="w-full h-full object-cover" />
              </div>

              <h3 className="font-codec text-2xl text-[#1C1D1A] font-normal mb-1 uppercase tracking-wide">
                BUY
              </h3>
              <span className="w-6 h-[1.5px] bg-[#9E7750] mb-2" />
              <p className="font-codec text-sm text-[#555] leading-relaxed font-light max-w-xs">
                Expert guidance to help you find the right plot.
              </p>
            </div>

            {/* Stage 2: BUILD */}
            <div className="journey-stage-2 relative pl-20 flex flex-col items-start font-codec">
              {/* Node indicator */}
              <div className="absolute left-[26px] top-4 w-4 h-4 rounded-full border-2 border-[#9E7750] bg-[#FAF8F5] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#9E7750]" />
              </div>

              {/* Visual circle token */}
              <div className="w-20 h-20 rounded-full overflow-hidden border border-[#D5C7B0] shadow-xs mb-3">
                <img src="/images/token-build-clean.png" alt="Build" className="w-full h-full object-cover" />
              </div>

              <h3 className="font-codec text-2xl text-[#1C1D1A] font-normal mb-1 uppercase tracking-wide">
                BUILD
              </h3>
              <span className="w-6 h-[1.5px] bg-[#9E7750] mb-2" />
              <p className="font-codec text-sm text-[#555] leading-relaxed font-light max-w-xs">
                Assistance to bring your vision to life.
              </p>
            </div>

            {/* Stage 3: SELL */}
            <div className="journey-stage-3 relative pl-20 flex flex-col items-start font-codec">
              {/* Node indicator */}
              <div className="absolute left-[26px] top-4 w-4 h-4 rounded-full border-2 border-[#9E7750] bg-[#FAF8F5] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#9E7750]" />
              </div>

              {/* Visual circle token */}
              <div className="w-20 h-20 rounded-full overflow-hidden border border-[#D5C7B0] shadow-xs mb-3">
                <img src="/images/token-sell-clean.png" alt="Sell" className="w-full h-full object-cover" />
              </div>

              <h3 className="font-codec text-2xl text-[#1C1D1A] font-normal mb-1 uppercase tracking-wide">
                SELL
              </h3>
              <span className="w-6 h-[1.5px] bg-[#9E7750] mb-2" />
              <p className="font-codec text-sm text-[#555] leading-relaxed font-light max-w-xs mb-3">
                Support to help you realise your plot’s value.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

