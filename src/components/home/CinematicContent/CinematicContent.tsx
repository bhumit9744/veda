import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export interface CinematicContentRef {
  initAnimations: (tl: gsap.core.Timeline) => void;
}

const CinematicContent = forwardRef<CinematicContentRef, {}>((props, ref) => {
  // References for all elements
  const openRef = useRef<HTMLDivElement>(null);
  
  const whatRef = useRef<HTMLDivElement>(null);
  
  const rcdContainerRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const chooseRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);
  
  const promiseRef = useRef<HTMLDivElement>(null);
  const clarityRef = useRef<HTMLHeadingElement>(null);
  const clarityListRef = useRef<HTMLDivElement>(null);
  
  const alibaugRef = useRef<HTMLDivElement>(null);
  
  const bbsContainerRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const sellRef = useRef<HTMLDivElement>(null);
  const bbsTextRef = useRef<HTMLDivElement>(null);
  
  const whyRef = useRef<HTMLDivElement>(null);
  
  const diffRef = useRef<HTMLDivElement>(null);
  const diffLine1Ref = useRef<HTMLHeadingElement>(null);
  const diffLine2Ref = useRef<HTMLHeadingElement>(null);
  const demandRef = useRef<HTMLSpanElement>(null);
  const oppRef = useRef<HTMLSpanElement>(null);
  
  const investRef = useRef<HTMLDivElement>(null);
  
  const fobgRef = useRef<HTMLDivElement>(null);
  const findRef = useRef<HTMLSpanElement>(null);
  const ownRef = useRef<HTMLSpanElement>(null);
  const buildWordRef = useRef<HTMLSpanElement>(null);
  const growRef = useRef<HTMLSpanElement>(null);
  
  const beyondRef = useRef<HTMLDivElement>(null);
  
  const finalRef = useRef<HTMLDivElement>(null);
  
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useImperativeHandle(ref, () => ({
    initAnimations: (tl: gsap.core.Timeline) => {
      // Hide all containers initially
      const containers = [
        openRef.current, whatRef.current, rcdContainerRef.current, promiseRef.current,
        alibaugRef.current, bbsContainerRef.current, whyRef.current, diffRef.current,
        investRef.current, fobgRef.current, beyondRef.current, finalRef.current
      ];
      gsap.set(containers, { autoAlpha: 0 });

      // 01 — OPENING (041–075)
      // Mask reveal + letter spacing (simulated via subtle scale for performance)
      tl.fromTo(openRef.current, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 6, ease: "power2.out" }, 41);
      tl.to(openRef.current, { autoAlpha: 0, y: -50, duration: 5, ease: "power2.in" }, 70);
      
      // 02 — WHAT DO WE DO? (076–120)
      // Large typography scale
      tl.fromTo(whatRef.current, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 6, ease: "power2.out" }, 76);
      tl.to(whatRef.current, { autoAlpha: 0, scale: 1.05, duration: 5, ease: "power2.in" }, 115);
      
      // 03 — RESEARCH / CHOOSE / DEVELOP (121–150)
      tl.set(rcdContainerRef.current, { autoAlpha: 1 }, 121);
      
      // Research: Horizontal movement
      tl.fromTo(researchRef.current, { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0, duration: 4, ease: "power3.out" }, 121);
      tl.to(researchRef.current, { autoAlpha: 0, x: 100, duration: 4, ease: "power3.in" }, 127);
      
      // Choose: Vertical transition
      tl.fromTo(chooseRef.current, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 4, ease: "power3.out" }, 131);
      tl.to(chooseRef.current, { autoAlpha: 0, y: -100, duration: 4, ease: "power3.in" }, 137);
      
      // Develop: Typography replacement (Scale out)
      tl.fromTo(developRef.current, { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: 4, ease: "power3.out" }, 141);
      tl.to(developRef.current, { autoAlpha: 0, scale: 0.9, duration: 4, ease: "power3.in" }, 146);
      
      tl.set(rcdContainerRef.current, { autoAlpha: 0 }, 150);
      
      // 04 — VEDA PROMISE / CLARITY (151–190)
      // Typography expansion
      tl.fromTo(promiseRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 5 }, 151);
      tl.fromTo(clarityRef.current, { letterSpacing: "0em", scale: 0.95 }, { letterSpacing: "0.05em", scale: 1, duration: 15, ease: "none" }, 151);
      tl.fromTo(clarityListRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 4, ease: "power2.out" }, 156);
      tl.to(promiseRef.current, { autoAlpha: 0, duration: 5, ease: "power2.in" }, 185);
      
      // 05 — ALIBAUG (191–215)
      // Image reveal (Image is in the JSX, we animate the container)
      tl.fromTo(alibaugRef.current, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 5, ease: "power2.out" }, 191);
      tl.to(alibaugRef.current, { autoAlpha: 0, y: -50, duration: 5, ease: "power2.in" }, 210);
      
      // 06 — BUY / BUILD / SELL (216–255)
      // Sequential word takeover
      tl.set(bbsContainerRef.current, { autoAlpha: 1 }, 216);
      
      tl.fromTo(buyRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 3, ease: "power2.out" }, 216);
      tl.to(buyRef.current, { autoAlpha: 0, y: -20, duration: 3, ease: "power2.in" }, 225);
      
      tl.fromTo(buildRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 3, ease: "power2.out" }, 227);
      tl.to(buildRef.current, { autoAlpha: 0, y: -20, duration: 3, ease: "power2.in" }, 236);
      
      tl.fromTo(sellRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 3, ease: "power2.out" }, 238);
      tl.fromTo(bbsTextRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, 242);
      
      tl.to(bbsContainerRef.current, { autoAlpha: 0, duration: 4, ease: "power2.in" }, 251);
      
      // 07 — WHY WE STARTED VEDA (256–275)
      // Slow editorial fade with quiet image
      tl.fromTo(whyRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 6, ease: "power1.inOut" }, 256);
      tl.to(whyRef.current, { autoAlpha: 0, duration: 5, ease: "power1.inOut" }, 270);
      
      // 08 — THE VEDA DIFFERENCE (276–300)
      // Typography climax
      tl.fromTo(diffRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, 276);
      
      // line 1 enters
      tl.fromTo(diffLine1Ref.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 3 }, 278);
      // line 2 enters
      tl.fromTo(diffLine2Ref.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 3 }, 282);
      
      // pause then highlight DEMAND -> OPPORTUNITIES
      tl.to(demandRef.current, { color: "#C7A34A", duration: 2 }, 288);
      tl.to(oppRef.current, { color: "#C7A34A", duration: 2 }, 291);
      
      tl.to(diffRef.current, { autoAlpha: 0, duration: 4, ease: "power2.in" }, 296);
      
      // 09 — INVESTMENT (301–315)
      // Image + text parallax
      tl.fromTo(investRef.current, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 4, ease: "power2.out" }, 301);
      tl.to(investRef.current, { autoAlpha: 0, y: -60, duration: 4, ease: "power2.in" }, 311);
      
      // 10 — FIND / OWN / BUILD / GROW (316–327)
      // Large word transitions
      tl.set(fobgRef.current, { autoAlpha: 1 }, 316);
      tl.fromTo(findRef.current, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 2 }, 316);
      tl.fromTo(ownRef.current, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 2 }, 318);
      tl.fromTo(buildWordRef.current, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 2 }, 320);
      tl.fromTo(growRef.current, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 2 }, 322);
      tl.to(fobgRef.current, { autoAlpha: 0, scale: 1.1, duration: 3 }, 324);
      
      // 11 — BEYOND LIVING (328–336)
      // Slow minimal reveal
      tl.fromTo(beyondRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 4, ease: "power1.inOut" }, 328);
      tl.to(beyondRef.current, { autoAlpha: 0, duration: 3, ease: "power1.inOut" }, 333);
      
      // 12 — FINAL QUESTION (337–340)
      // Very slow hold (does not exit)
      tl.fromTo(finalRef.current, { autoAlpha: 0, filter: "blur(10px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 3, ease: "power2.out" }, 337);
    }
  }));

  return (
    <div className="absolute inset-0 z-20 pointer-events-none text-veda-ivory selection:bg-veda-gold selection:text-veda-dark-1">
      
      {/* 01 — OPENING */}
      <div ref={openRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-20">
        <p className="font-veda-sans text-veda-micro opacity-60 mb-10 uppercase tracking-[0.3em] text-center">01 — Veda Life Spaces</p>
        <h2 className="font-veda-serif text-[clamp(40px,5vw,90px)] uppercase text-center mb-12 leading-[1.1] tracking-wide">
          We believe good land is found.<br/>
          <span className="text-veda-gold block mt-2">Great opportunities are created.</span>
        </h2>
        <p className="font-veda-sans text-veda-body opacity-80 max-w-3xl mx-auto text-center mb-16 leading-relaxed">
          Veda Life Spaces identifies promising markets, carefully selects land and develops thoughtfully planned plotted communities with a focus on clarity, quality and long-term value.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 font-veda-sans text-veda-micro uppercase opacity-70 text-center tracking-widest">
          <p>Thoughtful in what we choose.</p>
          <p>Meticulous in how we work.</p>
          <p>Committed to what comes next.</p>
          <p className="text-veda-gold font-medium tracking-[0.3em] hidden md:block">Beyond Living.</p>
        </div>
      </div>

      {/* 02 — WHAT DO WE DO? */}
      <div ref={whatRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
        <p className="font-veda-sans text-veda-micro opacity-60 mb-8 uppercase tracking-[0.3em]">02 — What Do We Do?</p>
        <h2 className="font-veda-serif text-[clamp(60px,8vw,130px)] leading-[0.95] uppercase mb-16 tracking-wide">
          We find land<br/>worth owning.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start max-w-7xl">
          <div className="md:col-span-5">
            <h3 className="font-veda-serif text-3xl md:text-4xl text-veda-gold uppercase tracking-wide leading-[1.3]">
              We don't just find land.<br/>We find the right opportunity.
            </h3>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-8 font-veda-sans text-veda-body opacity-80 leading-relaxed">
            <p>We study markets, identify land with potential and develop it into thoughtfully planned plotted communities.</p>
            <p>We identify locations with growth potential and transform them into thoughtfully planned communities where families can build, invest and create lasting value.</p>
            <p>From land selection and due diligence to planning and infrastructure, every development is shaped around one objective — creating plots that are clear, well-developed and positioned for long-term value.</p>
          </div>
        </div>
      </div>

      {/* 03 — RESEARCH CHOOSE DEVELOP */}
      <div ref={rcdContainerRef} className="absolute inset-0 flex items-center justify-center">
        <div ref={researchRef} className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-veda-serif text-[clamp(60px,12vw,200px)] uppercase tracking-widest text-veda-ivory">Research</h2>
        </div>
        <div ref={chooseRef} className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-veda-serif text-[clamp(60px,12vw,200px)] uppercase tracking-widest text-veda-ivory">Choose</h2>
        </div>
        <div ref={developRef} className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <h2 className="font-veda-serif text-[clamp(60px,12vw,200px)] uppercase tracking-widest text-veda-gold">Develop</h2>
          <p className="font-veda-sans text-veda-micro uppercase tracking-[0.4em] opacity-60">Develop the opportunity.</p>
        </div>
      </div>

      {/* 04 — VEDA PROMISE / CLARITY */}
      <div ref={promiseRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
        <div className="flex flex-col items-center text-center w-full max-w-6xl mx-auto">
          <p className="font-veda-sans text-veda-micro opacity-60 mb-12 uppercase tracking-[0.3em]">03 — Veda Lifespaces Promise</p>
          
          <h2 className="font-veda-serif text-3xl md:text-5xl uppercase mb-8 tracking-wide">
            We find the opportunity. <span className="text-veda-gold">We give you the clarity.</span>
          </h2>
          
          <h1 ref={clarityRef} className="font-veda-serif text-[clamp(80px,15vw,250px)] leading-[0.85] uppercase text-veda-ivory opacity-20 my-8 mix-blend-overlay">
            CLARITY
          </h1>
          
          <div ref={clarityListRef} className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 mb-16 max-w-4xl">
            <span className="font-veda-sans text-veda-micro uppercase opacity-70 tracking-widest border border-veda-ivory/20 px-4 py-2 rounded-full">Location</span>
            <span className="font-veda-sans text-veda-micro uppercase opacity-70 tracking-widest border border-veda-ivory/20 px-4 py-2 rounded-full">Connectivity</span>
            <span className="font-veda-sans text-veda-micro uppercase opacity-70 tracking-widest border border-veda-ivory/20 px-4 py-2 rounded-full">Development</span>
            <span className="font-veda-sans text-veda-micro uppercase opacity-70 tracking-widest border border-veda-ivory/20 px-4 py-2 rounded-full">Potential</span>
            <span className="font-veda-sans text-veda-micro uppercase opacity-70 tracking-widest border border-veda-ivory/20 px-4 py-2 rounded-full">Title</span>
            <span className="font-veda-sans text-veda-micro uppercase opacity-70 tracking-widest border border-veda-ivory/20 px-4 py-2 rounded-full">Legal</span>
          </div>

          <div className="flex flex-col gap-6 font-veda-sans text-veda-body opacity-90 leading-relaxed max-w-3xl text-center">
            <p>We look beyond the plot to identify the right land in the right market — studying its location, connectivity, development and potential.</p>
            <p>And when we bring an opportunity to you, clarity comes first.</p>
            <p>From title and legal documentation to the details of the development, we make sure you have the information you need to make a confident decision.</p>
            <p className="text-veda-gold italic font-veda-serif mt-6 text-3xl tracking-wide">The right opportunity is only valuable when you can own it with confidence.</p>
          </div>
        </div>
      </div>

      {/* 05 — OUR DEVELOPMENTS / ALIBAUG */}
      <div ref={alibaugRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
        <div className="flex flex-col md:flex-row gap-16 items-center max-w-7xl mx-auto">
          <div className="flex flex-col w-full md:w-1/2 z-20">
            <p className="font-veda-sans text-veda-micro opacity-60 mb-8 uppercase tracking-[0.3em]">04 — Our Developments</p>
            <h2 className="font-veda-serif text-veda-display uppercase mb-10 text-veda-gold tracking-wide">Alibaug</h2>
            <div className="flex flex-col gap-8">
              <p className="font-veda-sans text-veda-body opacity-90 leading-relaxed">
                Alibaug is where Veda Life Spaces began its journey into plotted development.
              </p>
              <p className="font-veda-sans text-veda-body opacity-80 leading-relaxed">
                Our developments here bring together carefully selected land, clear-title villa plots, thoughtful planning and the infrastructure needed to create a well-considered ownership experience.
              </p>
              <a href="/developments" className="mt-10 inline-block pointer-events-auto font-veda-sans text-veda-micro uppercase tracking-widest border-b border-veda-ivory/40 pb-2 w-max hover:text-veda-gold hover:border-veda-gold transition-colors">
                Explore Our Developments
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded shadow-2xl relative border border-veda-ivory/10 transform md:-translate-y-12">
            <div className="absolute inset-0 bg-veda-dark-1/20 mix-blend-multiply z-10 pointer-events-none"></div>
            <img src="/assets/images/alibaug_villa.jpg" alt="Alibaug Villa Development" className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
          </div>
        </div>
      </div>

      {/* 06 — BUY BUILD SELL */}
      <div ref={bbsContainerRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
        <p className="font-veda-sans text-veda-micro opacity-60 mb-8 uppercase tracking-[0.3em] text-center">05 — What Happens After You Buy?</p>
        <h2 className="font-veda-serif text-[clamp(40px,6vw,90px)] uppercase mb-20 text-center tracking-wide leading-[1.1]">
          The relationship doesn't<br className="hidden md:block"/> end at the sale.
        </h2>
        
        <div className="relative h-64 max-w-5xl mx-auto w-full flex items-center justify-center text-center">
          <div ref={buyRef} className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="font-veda-serif text-[clamp(50px,8vw,120px)] text-veda-gold uppercase mb-6 tracking-wide">Buy</h3>
            <p className="font-veda-sans text-veda-body opacity-80 leading-relaxed max-w-xl">Own a clear-title plot, thoughtfully developed and ready for your vision.</p>
          </div>
          <div ref={buildRef} className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="font-veda-serif text-[clamp(50px,8vw,120px)] text-veda-gold uppercase mb-6 tracking-wide">Build</h3>
            <p className="font-veda-sans text-veda-body opacity-80 leading-relaxed max-w-xl">When you're ready to build, we assist you through the journey and help connect you with the right professionals.</p>
          </div>
          <div ref={sellRef} className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="font-veda-serif text-[clamp(50px,8vw,120px)] text-veda-gold uppercase mb-6 tracking-wide">Sell</h3>
            <p className="font-veda-sans text-veda-body opacity-80 leading-relaxed max-w-xl">And when your plans change, we can assist you with the resale of your property.</p>
          </div>
        </div>
        
        <div ref={bbsTextRef} className="mt-16 font-veda-sans text-veda-micro uppercase tracking-widest opacity-60 text-center flex flex-col md:flex-row justify-center gap-4 md:gap-12">
          <p>Our core business is developing plotted communities.</p>
          <span className="hidden md:block opacity-30">|</span>
          <p>Our role is to assist you beyond the purchase.</p>
        </div>
      </div>

      {/* 07 — WHY WE STARTED VEDA */}
      <div ref={whyRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
        <div className="relative w-full max-w-7xl mx-auto h-[60vh] rounded shadow-2xl overflow-hidden border border-veda-ivory/10">
          <div className="absolute inset-0 bg-veda-dark-1/60 z-10 pointer-events-none"></div>
          <img src="/assets/images/veda_quiet.jpg" alt="Quiet Forest Detail" className="w-full h-full object-cover mix-blend-luminosity opacity-60" />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-10 md:p-20">
            <h2 className="font-veda-serif text-[clamp(40px,5vw,80px)] uppercase mb-12 tracking-wide text-veda-gold">Why We Started Veda</h2>
            <div className="flex flex-col gap-8 font-veda-sans text-veda-body opacity-90 max-w-3xl leading-relaxed">
              <p>Alibaug is evolving faster than ever. Yet finding land with clear ownership, thoughtful planning and genuine long-term potential remains a challenge.</p>
              <p>Veda Life Spaces was founded to bridge that gap by identifying high-potential locations and transforming them into transparent, future-ready plotted communities that people can invest in with confidence.</p>
              <p className="text-veda-ivory italic font-veda-serif mt-4 text-4xl tracking-wide opacity-80">This adds purpose.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 08 — THE VEDA DIFFERENCE */}
      <div ref={diffRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 items-end text-right">
        <h2 className="font-veda-serif text-veda-display uppercase mb-12 tracking-wide">The Veda Difference</h2>
        <p className="font-veda-sans text-veda-body opacity-80 max-w-3xl mb-24 leading-relaxed">
          Unlike conventional plotted developments, every Veda opportunity begins with extensive market research, legal diligence and future-growth evaluation before development begins.
        </p>
        <div className="max-w-6xl">
          <h3 ref={diffLine1Ref} className="font-veda-serif text-[clamp(40px,5vw,80px)] uppercase leading-[1.1] mb-8 opacity-60 tracking-wide">
            We don't develop land first<br/> and then create <span ref={demandRef} className="transition-colors duration-1000">demand</span>.
          </h3>
          <h3 ref={diffLine2Ref} className="font-veda-serif text-[clamp(40px,5vw,80px)] uppercase leading-[1.1] opacity-90 tracking-wide">
            We identify demand first<br/> and then create <span ref={oppRef} className="transition-colors duration-1000">opportunities</span>.
          </h3>
        </div>
      </div>

      {/* 09 — INVESTMENT */}
      <div ref={investRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
          <div className="relative aspect-[4/3] rounded overflow-hidden shadow-2xl border border-veda-ivory/10 transform md:translate-y-16">
            <div className="absolute inset-0 bg-veda-dark-1/20 mix-blend-multiply z-10 pointer-events-none"></div>
            <img src="/assets/images/veda_land.jpg" alt="Vast Land Asset" className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
          </div>
          <div className="flex flex-col gap-12 pt-10 border-l border-veda-ivory/20 pl-10 md:pl-16">
            <h2 className="font-veda-serif text-[clamp(40px,5vw,80px)] leading-[1.1] uppercase tracking-wide">
              Land remains<br/>one of the most<br/>timeless assets.
            </h2>
            <div className="flex flex-col gap-8 font-veda-sans text-veda-body opacity-80 leading-relaxed">
              <p>While markets fluctuate, well-located land continues to be one of the most sought-after asset classes.</p>
              <p>At Veda, we focus on locations with growth potential and infrastructure-led appreciation opportunities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10 — FIND OWN BUILD GROW */}
      <div ref={fobgRef} className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
        <span ref={findRef} className="font-veda-serif text-[clamp(60px,8vw,140px)] uppercase opacity-90 tracking-widest block">Find</span>
        <span ref={ownRef} className="font-veda-serif text-[clamp(60px,8vw,140px)] uppercase text-veda-gold tracking-widest block">Own</span>
        <span ref={buildWordRef} className="font-veda-serif text-[clamp(60px,8vw,140px)] uppercase opacity-90 tracking-widest block">Build</span>
        <span ref={growRef} className="font-veda-serif text-[clamp(60px,8vw,140px)] uppercase text-veda-gold tracking-widest block">Grow</span>
      </div>

      {/* 11 — BEYOND LIVING */}
      <div ref={beyondRef} className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-24">
        <div className="relative w-full max-w-7xl aspect-[16/9] overflow-hidden rounded shadow-2xl border border-veda-ivory/10">
          <div className="absolute inset-0 bg-veda-dark-1/40 mix-blend-multiply z-10"></div>
          <img src="/assets/images/veda_beyond_living.jpg" alt="Family Lifestyle Veda" className="w-full h-full object-cover mix-blend-luminosity opacity-70" />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 bg-black/30 backdrop-blur-[2px] text-center">
            <h2 className="font-veda-serif text-[clamp(60px,10vw,160px)] uppercase mb-8 text-veda-ivory opacity-90 tracking-[0.1em]">Beyond Living</h2>
            <p className="font-veda-sans text-[clamp(16px,1.5vw,24px)] opacity-90 max-w-3xl leading-relaxed text-veda-ivory">
              We believe land is more than an asset. It is a place where futures are planned, wealth is created, legacies are built and possibilities take shape.
            </p>
          </div>
        </div>
      </div>

      {/* 12 — FINAL QUESTION */}
      <div ref={finalRef} className="absolute inset-0 flex flex-col justify-center items-center px-6">
        <h2 className="font-veda-serif text-[clamp(40px,6vw,110px)] uppercase text-center leading-[1.1] tracking-widest text-veda-gold">
          Will this create<br/>lasting value<br/>for the people<br/>who own it?
        </h2>
      </div>

    </div>
  );
});

export default CinematicContent;
