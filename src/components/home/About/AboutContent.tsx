import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  sceneRef: React.RefObject<HTMLElement>;
}

export default function AboutContent({ sceneRef }: Props) {
  useEffect(() => {
    if (!sceneRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: prefersReducedMotion ? false : true,
        }
      });

      const introBlock = document.querySelector('.about-intro') as HTMLElement;
      const p1Block = document.querySelector('.about-p1') as HTMLElement;
      const p2Block = document.querySelector('.about-p2') as HTMLElement;
      const p3Block = document.querySelector('.about-p3') as HTMLElement;
      const p4Block = document.querySelector('.about-p4') as HTMLElement;
      
      const blocks = [introBlock, p1Block, p2Block, p3Block, p4Block];

      if (!prefersReducedMotion) {
        // Initial setup
        blocks.forEach((block, i) => {
          if (!block) return;
          const isLeft = i === 0 || i === 2 || i === 4;
          if (i === 0) {
            gsap.set(block, { opacity: 1, x: 0, filter: 'blur(0px)', clipPath: 'inset(0% 0 0 0)' });
          } else {
            const startX = isLeft ? -20 : 20;
            gsap.set(block, { opacity: 0, x: startX, filter: 'blur(4px)', clipPath: 'inset(10% 0 0 0)' });
          }
        });

        tl.to({}, { duration: 100 }, 0); // 100% timeline

        // Animation helper
        const animateBlock = (
          el: HTMLElement, 
          start: number, 
          end: number, 
          isLeft: boolean, 
          isLast: boolean = false,
          isFirst: boolean = false
        ) => {
          if (!el) return;
          const enterDur = 3;
          const exitDur = 3;
          const exitX = isLeft ? 20 : -20; // opposite side subtle movement
          
          if (!isFirst) {
            tl.to(el, { 
              opacity: 1, x: 0, filter: 'blur(0px)', clipPath: 'inset(0% 0 0 0)', 
              duration: enterDur, ease: "power2.out" 
            }, start);
          }
          
          if (!isLast) {
            tl.to(el, { 
              opacity: 0, x: exitX, filter: 'blur(3px)', 
              duration: exitDur, ease: "power2.in" 
            }, end - exitDur);
          }
        };

        // Text 0: Intro (0-15%) - LEFT
        tl.to(introBlock, { 
          opacity: 0, x: 20, filter: 'blur(3px)', 
          duration: 3, ease: "power2.in" 
        }, 15 - 3);

        // Text 1: P1 (15-37%) - RIGHT
        animateBlock(p1Block, 15, 37, false);

        // Text 2: P2 (37-56%) - LEFT
        animateBlock(p2Block, 37, 56, true);

        // Text 3: P3 (56-78%) - RIGHT
        animateBlock(p3Block, 56, 78, false);

        // Text 4: P4 (78-94%) - LEFT, holds to 100
        animateBlock(p4Block, 78, 100, true, true);
      } else {
         // Reduced motion styling override: ensure all are visible and stacked, or just show final state
         // To avoid a mess of text overlapping, we can just position them statically
         blocks.forEach(block => {
           if (block) gsap.set(block, { opacity: 1, position: 'relative', transform: 'none', top: 'auto', left: 'auto', right: 'auto', margin: '2rem auto' });
         });
      }
    });

    return () => ctx.revert();
  }, [sceneRef]);

  return (
    <div className="absolute inset-0 z-10 w-full h-[100svh] pointer-events-none">
      
      {/* Intro - Left */}
      <div className="about-intro absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[7vw] w-[86vw] md:w-[38vw]">
        <p className="text-[11px] md:text-[14px] tracking-[0.15em] uppercase text-[#7C8662] mb-6 md:mb-8 font-medium">
          ABOUT VEDA
        </p>
        <h2 className="text-[clamp(34px,10vw,52px)] md:text-[clamp(42px,5vw,78px)] font-light leading-[1.1] text-[#F1EBDD] tracking-tight">
          Built on vision,<br/>
          ethics, discipline,<br/>
          and authenticity.
        </h2>
      </div>

      {/* Paragraph 1 - Right */}
      <div className="about-p1 absolute top-1/2 -translate-y-1/2 right-[6vw] md:right-[7vw] w-[86vw] md:w-[38vw]">
        <div className="text-[11px] md:text-[13px] tracking-[0.18em] text-[#F1EBDD]/50 mb-4">01 / 04</div>
        <p className="text-[#F1EBDD] text-[clamp(16px,4.3vw,20px)] md:text-[clamp(16px,1.1vw,21px)] leading-[1.6]">
          Veda Life Spaces is built on a simple belief that land ownership should be secure, transparent, and meaningful. We focus on creating private lifestyle communities for a very limited set of families, where every land parcel is legally verified, thoughtfully planned, and developed with strong ethical standards.
        </p>
      </div>

      {/* Paragraph 2 - Left */}
      <div className="about-p2 absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[7vw] w-[86vw] md:w-[38vw]">
        <div className="text-[11px] md:text-[13px] tracking-[0.18em] text-[#F1EBDD]/50 mb-4">02 / 04</div>
        <p className="text-[#F1EBDD] text-[clamp(16px,4.3vw,20px)] md:text-[clamp(16px,1.1vw,21px)] leading-[1.6]">
          Our approach goes beyond selling land. We curate spaces that offer privacy, long term value, and a sense of belonging for those who seek more than just an investment.
        </p>
      </div>

      {/* Paragraph 3 - Right (slightly wider on desktop) */}
      <div className="about-p3 absolute top-1/2 -translate-y-1/2 right-[6vw] md:right-[7vw] w-[86vw] md:w-[42vw]">
        <div className="text-[11px] md:text-[13px] tracking-[0.18em] text-[#F1EBDD]/50 mb-4">03 / 04</div>
        <p className="text-[#F1EBDD] text-[clamp(16px,4.3vw,20px)] md:text-[clamp(16px,1.1vw,21px)] leading-[1.6]">
          At our core, we combine disciplined execution with a vision for future ready living. From land acquisition and due diligence to infrastructure planning and home build support, we take a comprehensive approach to ensure every opportunity is secure, practical, and growth oriented.
        </p>
      </div>

      {/* Paragraph 4 - Left */}
      <div className="about-p4 absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[7vw] w-[86vw] md:w-[38vw]">
        <div className="text-[11px] md:text-[13px] tracking-[0.18em] text-[#F1EBDD]/50 mb-4">04 / 04</div>
        <p className="text-[#F1EBDD] text-[clamp(16px,4.3vw,20px)] md:text-[clamp(16px,1.1vw,21px)] leading-[1.6]">
          With Veda Life Spaces, land becomes more than an asset. It becomes a foundation for legacy, stability, and a refined lifestyle.
        </p>
      </div>
      
    </div>
  );
}
