import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function OpportunityScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const clarityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Initial states
    gsap.set(text1Ref.current, { autoAlpha: 0, y: 50, filter: "blur(10px)" });
    gsap.set(text2Ref.current, { autoAlpha: 0, y: 50, filter: "blur(10px)" });
    gsap.set(clarityRef.current, { autoAlpha: 0, scale: 0.5, filter: "blur(20px)" });

    tl.to(text1Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 })
      .to(text1Ref.current, { autoAlpha: 0, y: -50, filter: "blur(10px)", duration: 1 }, "+=0.5")
      .to(text2Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 })
      .to(text2Ref.current, { autoAlpha: 0, y: -50, filter: "blur(10px)", duration: 1 }, "+=0.5")
      .to(clarityRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 2 });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
         if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        
        <div ref={text1Ref} className="absolute text-center px-4 w-full">
          <h2 className="text-[#F4F1E8] text-[clamp(32px,5vw,80px)] font-semibold uppercase tracking-[-0.02em] leading-tight">
            We Find<br />The Opportunity.
          </h2>
        </div>

        <div ref={text2Ref} className="absolute text-center px-4 w-full">
          <h2 className="text-[#d4c9b3] text-[clamp(28px,4vw,60px)] font-medium uppercase tracking-[0.1em] leading-tight">
            We Give You The
          </h2>
        </div>

        <div ref={clarityRef} className="absolute text-center px-4 w-full flex justify-center">
          <h1 className="text-white text-[clamp(80px,18vw,300px)] font-bold uppercase tracking-tighter leading-none">
            Clarity
          </h1>
        </div>

      </div>
    </section>
  );
}
