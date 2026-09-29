import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  const section2Ref = useRef<HTMLElement>(null);
  const aboutLabelRef = useRef<HTMLDivElement>(null);
  const mainAnchorRef = useRef<HTMLHeadingElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SECTION 1: WHO IS VEDA
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
        }
      });

      // Hide all initially
      gsap.set([eyebrowRef.current, text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { 
        opacity: 0, 
        y: 40 
      });

      tl1.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
         .to(text1Ref.current, { opacity: 1, y: 0, duration: 1 }, 1.5) // 15%
         .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, 3.0) // 30%
         .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, 5.0) // 50%
         .to(text4Ref.current, { opacity: 1, y: 0, duration: 1 }, 7.0) // 70%
         .to({}, { duration: 3 }); // hold until 100%

      // Fade out Section 1 as we move to Section 2
      gsap.to(sectionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        }
      });

      // SECTION 2: WHAT VEDA DOES
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
        }
      });

      gsap.set([aboutLabelRef.current, mainAnchorRef.current, supportRef.current, listRef.current], { 
        opacity: 0, 
        x: 40 
      });

      tl2.to(aboutLabelRef.current, { opacity: 1, x: 0, duration: 1 })
         .to(mainAnchorRef.current, { opacity: 1, x: 0, duration: 1.5 }, '-=0.5')
         .to(supportRef.current, { opacity: 1, x: 0, duration: 1 }, '-=0.5')
         .to(listRef.current, { opacity: 1, x: 0, duration: 1 }, '-=0.5');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 01 — WHO IS VEDA? */}
      <section ref={sectionRef} className="relative w-full h-[200vh] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center text-center w-full max-w-5xl px-6">
          <div ref={eyebrowRef} className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#b89a6b] mb-12">
            Who is Veda?
          </div>
          
          <div className="flex flex-col gap-2 md:gap-4 text-[clamp(2rem,6vw,6rem)] leading-[1.1] font-light tracking-wide uppercase">
            <div ref={text1Ref} className="text-[#F4F1E8]">We Believe</div>
            <div ref={text2Ref} className="text-[#F4F1E8]/60 font-serif italic mb-8 md:mb-12">Good Land is Found.</div>
            
            <div ref={text3Ref} className="text-[#F4F1E8]">Great Opportunities</div>
            <div ref={text4Ref} className="text-[#F4F1E8]/60 font-serif italic">Are Created.</div>
          </div>
        </div>
      </section>

      {/* 02 — WHAT VEDA DOES */}
      <section ref={section2Ref} className="relative w-full min-h-screen flex items-center py-32 px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Asymmetric layout */}
          <div className="md:col-start-2 md:col-span-3">
            <div ref={aboutLabelRef} className="text-xs uppercase tracking-[0.4em] text-[#b89a6b] sticky top-40">
              About Veda
            </div>
          </div>
          
          <div className="md:col-start-6 md:col-span-6 flex flex-col pt-12 md:pt-0">
            <h2 ref={mainAnchorRef} className="text-[clamp(3rem,6vw,5.5rem)] leading-[1.1] font-light tracking-wide uppercase text-[#F4F1E8] mb-16 max-w-2xl">
              We Find<br/>
              <span className="text-[#F4F1E8]/70">Land Worth<br/>Owning.</span>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-16 md:gap-24">
              <p ref={supportRef} className="text-xl md:text-2xl font-light text-[#F4F1E8]/80 leading-relaxed max-w-sm">
                We don't just find land.<br/>
                We find the right opportunity.
              </p>
              
              <div ref={listRef} className="flex flex-col gap-6 text-sm md:text-base text-[#F4F1E8]/50 font-light tracking-wide max-w-[280px]">
                <p>Study markets.</p>
                <p>Identify land with potential.</p>
                <p>Develop thoughtfully planned plotted communities.</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
