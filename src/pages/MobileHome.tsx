import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeafFrameCanvas from '../components/home/FullPageCinematic/LeafFrameCanvas';
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full font-body bg-veda-black text-veda-text-light overflow-x-hidden">
      
      {/* FIXED BACKGROUND SEQUENCE */}
      <div className="fixed top-0 left-0 w-full h-[100svh] pointer-events-none z-0 overflow-hidden">
        {/* Adjust focusX (0.0 = left, 1.0 = right) if the leaf gets cropped on mobile */}
        <LeafFrameCanvas ref={canvasRef} focusX={0.5} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 mix-blend-multiply" />
      </div>

      {/* RELATIVE CONTENT SECTIONS */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* 1. HERO */}
        <section className="relative w-full h-[100svh] flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <div className="w-full pt-20">
            <h1 className="font-light tracking-widest text-[#F0EBDD]/90 uppercase leading-[1.05] md:leading-[1.1] text-[length:var(--mobile-display)] md:text-[32px] lg:text-[42px] xl:text-[54px] max-w-full break-words mx-auto">
              {vedaContent.hero.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br className="md:hidden" />
                  <br className="hidden md:block" />
                </React.Fragment>
              ))}
            </h1>
          </div>
          
          <div className="w-full max-w-[320px] md:max-w-2xl mx-auto mt-16 md:mt-24 text-center">
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light">
              {vedaContent.hero.body}
            </p>
          </div>
        </section>



        {/* 3. WHAT DO WE DO */}
        <section className="relative w-full py-24 md:py-48 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-start text-left mb-16 md:mb-24">
            <div className="text-[length:var(--mobile-small)] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-8">
              {vedaContent.whatWeDo.eyebrow}
            </div>
            <h2 className="text-[length:var(--mobile-heading)] md:text-5xl font-light tracking-widest uppercase leading-[1.2]">
              <span className="block mb-6 md:mb-4">{vedaContent.whatWeDo.headline}</span>
              <span className="block text-[length:var(--mobile-subheading)] md:text-4xl opacity-90">{vedaContent.whatWeDo.subheadline}</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-10 md:gap-12 text-left px-0">
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 max-w-2xl leading-[1.7] font-light">
              {vedaContent.whatWeDo.body1}
            </p>
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 max-w-2xl leading-[1.7] font-light">
              {vedaContent.whatWeDo.body2}
            </p>
          </div>
          
          <div className="mt-20 md:mt-32 flex flex-col md:flex-row gap-12 md:gap-24">
            {vedaContent.whatWeDo.steps.map((step, i) => (
               <div key={i} className="flex flex-col gap-5 items-start">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-veda-gold/30 flex items-center justify-center text-veda-gold text-sm md:text-base font-light">
                   0{i + 1}
                 </div>
                 <h3 className="text-[length:var(--mobile-subheading)] md:text-2xl font-bebas tracking-widest text-veda-gold">{step}</h3>
               </div>
            ))}
          </div>
        </section>

        {/* 4. PROMISE */}
        <section className="relative w-full py-24 md:py-48 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-start text-left">
          <div className="text-[length:var(--mobile-small)] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-8">
            {vedaContent.promise.eyebrow}
          </div>
          <h2 className="text-[length:var(--mobile-heading)] md:text-5xl font-light tracking-widest mb-16 uppercase leading-[1.2]">
            {vedaContent.promise.headline.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </h2>
          <div className="w-full flex flex-col gap-6 md:flex-row md:justify-between items-start mb-16 border-t border-white/10 pt-10">
            {["LOCATION", "CONNECTIVITY", "DEVELOPMENT", "POTENTIAL"].map(word => (
               <div key={word} className="text-xl md:text-3xl font-light tracking-widest text-white/40 hover:text-white transition-colors cursor-default">
                 {word}
               </div>
            ))}
          </div>
          <div className="flex flex-col items-start w-full">
            <h3 className="text-[length:var(--mobile-display)] md:text-7xl font-bebas tracking-widest text-veda-gold mb-10">CLARITY</h3>
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 max-w-2xl leading-[1.7] font-light mb-10">
              {vedaContent.promise.body1}
            </p>
            <p className="text-[length:var(--mobile-subheading)] md:text-3xl font-editorial italic text-veda-ivory leading-relaxed max-w-xl">
              {vedaContent.promise.body3}
            </p>
          </div>
        </section>

        {/* 5. OUR DEVELOPMENT */}
        <section className="relative w-full py-24 md:py-48 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 text-left">
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <div className="text-[length:var(--mobile-small)] md:text-xs tracking-[0.3em] uppercase text-veda-gold mb-8">
              {vedaContent.ourDevelopment.eyebrow}
            </div>
            <h2 className="text-[length:var(--mobile-display)] md:text-7xl font-bebas tracking-widest mb-10">
              {vedaContent.ourDevelopment.headline}
            </h2>
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light mb-12 max-w-lg">
              {vedaContent.ourDevelopment.body}
            </p>
            <button className="w-full md:w-auto max-w-[300px] border border-veda-gold/40 text-veda-gold tracking-[0.2em] text-xs uppercase py-5 px-8 hover:bg-veda-gold hover:text-black transition-colors rounded-sm">
              EXPLORE OUR DEVELOPMENTS
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img src="/alibaug.png" className="w-full h-auto object-cover aspect-[4/5] md:aspect-[4/3] brightness-75 rounded-sm" alt="Alibaug" />
          </div>
        </section>

        {/* 6. BUY BUILD SELL */}
        <section className="relative w-full py-24 md:py-48 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="flex flex-col gap-20 md:flex-row md:gap-8 justify-between text-left">
            {vedaContent.afterYouBuy.steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-6 items-start md:flex-1 md:bg-white/5 md:p-12 md:border md:border-white/10 md:rounded-sm">
                <h3 className="text-[length:var(--mobile-heading)] md:text-4xl font-bebas tracking-widest text-veda-gold">{step.title}</h3>
                <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 border-t border-white/10 pt-16 flex flex-col gap-5 text-left md:text-center">
            <p className="text-[length:var(--mobile-small)] md:text-sm tracking-[0.2em] uppercase opacity-50">
              {vedaContent.afterYouBuy.outro1}
            </p>
            <p className="text-[length:var(--mobile-small)] md:text-sm tracking-[0.2em] uppercase opacity-90 text-veda-ivory">
              {vedaContent.afterYouBuy.outro2}
            </p>
          </div>
        </section>

        {/* 7. WHY WE STARTED VEDA */}
        <section className="relative w-full py-24 md:py-48 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-start text-left">
           <h2 className="text-[length:var(--mobile-heading)] md:text-5xl font-light tracking-widest mb-16 uppercase leading-[1.2]">
             {vedaContent.whyWeStarted.headline}
           </h2>
           <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-white/5 mb-16 overflow-hidden rounded-sm">
             <img src="/assets/images/bellagio-old/img268.jpg" className="w-full h-full object-cover opacity-70" />
           </div>
           <p className="text-[length:var(--mobile-subheading)] md:text-2xl font-editorial italic opacity-90 mb-10 max-w-2xl text-veda-ivory">
             {vedaContent.whyWeStarted.body1}
           </p>
           <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 max-w-2xl leading-[1.7] font-light mb-16">
             {vedaContent.whyWeStarted.body2}
           </p>
           <h3 className="text-[length:var(--mobile-heading)] md:text-4xl font-bebas tracking-widest text-veda-gold">
             {vedaContent.whyWeStarted.body3}
           </h3>
        </section>

        {/* 8. VEDA DIFFERENCE */}
        <section className="relative w-full py-24 md:py-48 px-6 md:px-12 max-w-4xl mx-auto text-center md:text-left">
          <h2 className="text-[length:var(--mobile-heading)] md:text-5xl font-bebas tracking-widest mb-16 text-veda-gold">
            {vedaContent.difference.headline}
          </h2>
          <div className="flex flex-col items-center md:items-start gap-6 mb-16 md:pl-6 md:border-l md:border-veda-gold/30">
            <span className="text-[length:var(--mobile-small)] md:text-sm tracking-[0.2em] uppercase opacity-70 text-veda-ivory">MARKET RESEARCH</span>
            <div className="w-12 h-[1px] bg-veda-gold/30 md:hidden block"></div>
            <span className="text-[length:var(--mobile-small)] md:text-sm tracking-[0.2em] uppercase opacity-70 text-veda-ivory">LEGAL DILIGENCE</span>
            <div className="w-12 h-[1px] bg-veda-gold/30 md:hidden block"></div>
            <span className="text-[length:var(--mobile-small)] md:text-sm tracking-[0.2em] uppercase opacity-70 text-veda-ivory">FUTURE-GROWTH EVALUATION</span>
          </div>
          <p className="text-[length:var(--mobile-subheading)] md:text-3xl font-light leading-[1.5] md:leading-[1.5] opacity-90 text-veda-ivory max-w-3xl mx-auto md:mx-0">
            {vedaContent.difference.body2.split('\n').map((l, i) => <span key={i} className="block mb-2">{l}</span>)}
          </p>
        </section>
        
        {/* 9. INVESTMENT */}
        <section className="relative w-full py-32 md:py-48 px-6 md:px-12 bg-veda-paper text-veda-black text-left flex flex-col items-start md:items-center md:text-center">
          <h2 className="text-[length:var(--mobile-heading)] md:text-5xl font-editorial max-w-4xl mb-16 leading-[1.3]">
            {vedaContent.investment.headline}
          </h2>
          <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden mb-20 rounded-sm shadow-xl">
             <img src="/assets/images/bellagio-old/img12.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-3xl flex flex-col gap-8 text-left">
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light">
              {vedaContent.investment.body1}
            </p>
            <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 leading-[1.7] font-light">
              {vedaContent.investment.body2}
            </p>
          </div>
        </section>

        {/* 10. FIND OWN BUILD GROW */}
        <section className="relative w-full py-32 md:py-64 px-6 bg-veda-black flex flex-col items-center text-center">
           <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 opacity-40 mb-20 text-veda-ivory">
             {vedaContent.customerJourney.steps.map((s, i) => (
                <React.Fragment key={s}>
                  <span className="text-2xl md:text-3xl tracking-widest">{s}</span>
                  {i < 3 && <span className="hidden md:block">→</span>}
                  {i < 3 && <span className="md:hidden block opacity-50">↓</span>}
                </React.Fragment>
             ))}
           </div>
           <h2 className="text-[length:var(--mobile-heading)] md:text-6xl font-bebas tracking-widest text-veda-gold">
             FIND → OWN → BUILD → GROW
           </h2>
        </section>

        {/* 11. BEYOND LIVING */}
        <section className="relative w-full py-32 md:py-64 px-6 bg-veda-black flex flex-col items-start md:items-center text-left md:text-center">
           <h2 className="text-[length:var(--mobile-display)] md:text-7xl font-editorial text-veda-ivory mb-16">
             {vedaContent.brandPhilosophy.headline}
           </h2>
           <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 max-w-2xl leading-[1.7] font-light mb-8">
             {vedaContent.brandPhilosophy.body1}
           </p>
           <p className="text-[length:var(--mobile-body)] md:text-lg opacity-80 max-w-2xl leading-[1.7] font-light mb-20">
             {vedaContent.brandPhilosophy.body2}
           </p>
           <p className="text-[length:var(--mobile-subheading)] md:text-4xl font-editorial italic text-veda-gold max-w-3xl leading-relaxed">
             {vedaContent.brandPhilosophy.question}
           </p>
        </section>

      </div>
    </div>
  );
}
