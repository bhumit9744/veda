import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeafFrameCanvas from '../components/home/FullPageCinematic/LeafFrameCanvas';
import { Search, MapPin, Pickaxe } from 'lucide-react';
import { vedaContent } from '../content/vedaContent';

gsap.registerPlugin(ScrollTrigger);

export default function MobileHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Bind the canvas sequence to the total scroll of the page!
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            if (canvasRef.current?.setProgress) {
              canvasRef.current.setProgress(self.progress);
            }
          }
        }
      });

      // Animate all text elements with the .animate-on-scroll class
      gsap.utils.toArray('.animate-on-scroll').forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Animate the step cards with a stagger effect
      gsap.utils.toArray('.animate-cards-container').forEach((container: any) => {
        gsap.fromTo(container.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full font-body bg-veda-black text-veda-text-light overflow-x-hidden">
      
      {/* FIXED BACKGROUND SEQUENCE */}
      <div className="fixed top-0 left-0 w-full h-[100svh] pointer-events-none z-0 overflow-hidden">
        {/* Adjust focusX (0.0 = left, 1.0 = right) if the leaf gets cropped on mobile */}
        <LeafFrameCanvas ref={canvasRef} focusX={0.5} className="absolute inset-0 w-full h-full object-cover z-0 opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 mix-blend-multiply" />
      </div>

      {/* RELATIVE CONTENT SECTIONS */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* 1. HERO */}
        <section className="relative w-full h-[100svh] flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <div className="w-full pt-20 animate-on-scroll">
            <h1 className="font-light tracking-widest text-[#F0EBDD]/90 uppercase leading-[1.1] md:leading-[1.1] text-2xl md:text-[32px] lg:text-[42px] xl:text-[54px] max-w-full break-words mx-auto">
              {vedaContent.hero.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br className="md:hidden" />
                  <br className="hidden md:block" />
                </React.Fragment>
              ))}
            </h1>
          </div>
          
          <div className="w-full max-w-[320px] md:max-w-2xl mx-auto mt-10 md:mt-24 text-center animate-on-scroll">
            <p className="text-sm md:text-lg opacity-80 leading-[1.8] font-light">
              {vedaContent.hero.body}
            </p>
          </div>
        </section>



        {/* 3. WHAT DO WE DO */}
        <section className="relative w-full py-40 md:py-48 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-6 md:mb-8 animate-on-scroll">
            {vedaContent.whatWeDo.eyebrow}
          </div>
          <h2 className="text-2xl md:text-5xl font-light tracking-widest uppercase leading-[1.3] text-white max-w-4xl mb-12 animate-on-scroll">
            {vedaContent.whatWeDo.subheadline}
          </h2>
          
          <div className="flex flex-col gap-8 items-center text-center max-w-3xl mb-16 animate-on-scroll">
            <p className="text-sm md:text-lg opacity-80 leading-[1.7] font-light">
              {vedaContent.whatWeDo.body1}
            </p>
            {vedaContent.whatWeDo.body2 && (
              <p className="text-sm md:text-lg opacity-80 leading-[1.7] font-light">
                {vedaContent.whatWeDo.body2}
              </p>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 w-full justify-around mt-8 border-t border-white/10 pt-16 md:border-none md:pt-0 animate-cards-container">
            <div className="flex flex-col gap-4 items-center">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-veda-gold opacity-90" strokeWidth={1.2} />
              <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-veda-gold/70 mt-2">{vedaContent.whatWeDo.steps[0]}</h3>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-veda-gold opacity-90" strokeWidth={1.2} />
              <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-veda-gold/70 mt-2">{vedaContent.whatWeDo.steps[1]}</h3>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Pickaxe className="w-8 h-8 md:w-10 md:h-10 text-veda-gold opacity-90" strokeWidth={1.2} />
              <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-veda-gold/70 mt-2">{vedaContent.whatWeDo.steps[2]}</h3>
            </div>
          </div>
        </section>

        {/* 4. PROMISE */}
        <section className="relative w-full pt-40 pb-[30vh] md:py-48 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-6 md:mb-8 animate-on-scroll">
            {vedaContent.promise.eyebrow}
          </div>
          <h2 className="text-2xl md:text-5xl font-light tracking-widest mb-10 md:mb-12 uppercase leading-[1.3] text-white animate-on-scroll">
            {vedaContent.promise.headline.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </h2>
          <div className="flex flex-col items-center w-full max-w-3xl mx-auto animate-on-scroll">
            <p className="text-sm md:text-lg opacity-80 leading-[1.7] font-light mb-12">
              {vedaContent.promise.body1}
            </p>
            <p className="text-xl md:text-3xl font-editorial italic text-veda-ivory leading-relaxed">
              {vedaContent.promise.body3}
            </p>
          </div>
        </section>

        {/* 5. OUR DEVELOPMENT */}
        <section className="relative w-full pt-[30vh] pb-[30vh] md:py-48 px-6 md:px-12 max-w-6xl mx-auto flex flex-col items-center text-center overflow-hidden">
          <div className="w-full max-w-lg flex flex-col items-center">
            <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-4 md:mb-8 animate-on-scroll">
              {vedaContent.ourDevelopment.eyebrow}
            </div>
            <h2 className="text-5xl md:text-7xl font-bebas tracking-widest mb-6 md:mb-10 text-white animate-on-scroll">
              {vedaContent.ourDevelopment.headline}
            </h2>
            <p className="text-sm md:text-lg opacity-80 leading-[1.7] font-light mb-10 text-white animate-on-scroll">
              {vedaContent.ourDevelopment.body}
            </p>
            <button className="inline-block border border-veda-gold/40 text-veda-gold tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs uppercase py-4 px-6 hover:bg-veda-gold hover:text-black transition-colors whitespace-nowrap animate-on-scroll">
              {vedaContent.ourDevelopment.cta}
            </button>
          </div>
        </section>

        {/* 6. BUY BUILD SELL */}
        <section className="relative w-full pt-[30vh] pb-40 md:py-48 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-6 animate-on-scroll">
            {vedaContent.afterYouBuy.eyebrow}
          </div>
          <h2 className="text-2xl md:text-5xl font-light tracking-widest mb-8 uppercase leading-[1.3] text-white animate-on-scroll">
            {vedaContent.afterYouBuy.headline}
          </h2>
          <p className="text-xl md:text-3xl font-editorial italic text-veda-gold mb-16 animate-on-scroll">
            {vedaContent.afterYouBuy.intro}
          </p>

          <div className="flex flex-col gap-6 w-full max-w-md mx-auto animate-cards-container">
            {vedaContent.afterYouBuy.steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4 items-center bg-white/5 p-8 border border-white/10 rounded-sm">
                <h3 className="text-2xl font-bebas tracking-widest text-veda-gold">{step.title}</h3>
                <p className="text-sm md:text-lg opacity-80 leading-[1.7] font-light max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex flex-col gap-4 text-center animate-cards-container">
            <p className="text-[10px] md:text-sm tracking-[0.2em] uppercase opacity-50 text-white">
              {vedaContent.afterYouBuy.outro1}
            </p>
            <p className="text-[10px] md:text-sm tracking-[0.2em] uppercase opacity-90 text-white">
              {vedaContent.afterYouBuy.outro2}
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
