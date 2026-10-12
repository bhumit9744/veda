import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin, Pickaxe } from 'lucide-react';
import { vedaContent } from '../content/vedaContent';
import OwnershipJourneySection from '../components/projects/OwnershipJourneySection';

gsap.registerPlugin(ScrollTrigger);

export default function MobileHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
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
    <div ref={containerRef} className="relative w-full font-body bg-transparent text-veda-forest overflow-x-hidden">
      
      {/* FIXED BACKGROUND */}
      <div 
        className="fixed top-0 left-0 w-full h-[100svh] pointer-events-none z-0 overflow-hidden bg-white"
      />

      {/* RELATIVE CONTENT SECTIONS */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* 1. HERO */}
        <section className="relative w-full h-[100svh] flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <div className="w-full pt-20 animate-on-scroll">
            <h1 className="font-light tracking-widest text-veda-forest uppercase leading-[1.1] md:leading-[1.1] text-2xl md:text-[32px] lg:text-[42px] xl:text-[54px] max-w-full break-words mx-auto">
              {vedaContent.hero.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br className="md:hidden" />
                  <br className="hidden md:block" />
                </React.Fragment>
              ))}
            </h1>
          </div>
          
          <div className="w-full max-w-[320px] md:max-w-2xl mx-auto mt-6 text-center animate-on-scroll">
            <p className="text-sm md:text-base text-veda-forest/75 leading-[1.7] font-light">
              {vedaContent.hero.body}
            </p>
          </div>

          {/* Hero Plotted Image on Mobile */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto mt-8 aspect-[16/9] relative animate-on-scroll group overflow-hidden rounded-sm shadow-lg border border-neutral-200">
            <img 
              src="/assets/images/Golden Hour Villa Street Without Tree.png" 
              alt="Plotted Communities - Golden Hour Villa Street" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </section>

        {/* 3. OPPORTUNITY SHOWCASE (FULL-WIDTH ALIGNMENT) */}
        <section className="relative w-full overflow-hidden my-8 sm:my-12">
          <div className="relative w-full aspect-[1672/941] overflow-hidden group animate-on-scroll">
            <img 
              src="/assets/images/Golden Villa Driveway at Sunset.png" 
              alt="Veda Opportunity" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle soft dark gradient overlay at bottom for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            
            {/* Overlay content in small below and left */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 max-w-md text-left">
              <h2 className="font-codec font-normal text-xs sm:text-sm tracking-[0.06em] text-white uppercase leading-[1.38] drop-shadow-md select-none">
                WE DON’T JUST FIND LAND. WE FIND THE RIGHT OPPORTUNITY.
              </h2>
            </div>
          </div>
        </section>



        {/* 4. VIDEO SHOWCASE — ALIBAUG IS WHERE IT BEGAN (CLICKABLE TO /projects) */}
        <section className="relative w-full overflow-hidden mt-3 sm:mt-4 mb-4 sm:mb-6">
          <Link 
            to="/projects"
            className="block relative w-full aspect-[16/9] overflow-hidden group animate-on-scroll cursor-pointer"
            title="Explore Veda Projects"
          >
            <video 
              src="/assets/images/homevideo.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle soft dark gradient overlay at bottom for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            
            {/* Overlay content in small below and left */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 max-w-md text-left">
              <h2 className="font-codec font-normal text-base sm:text-lg tracking-[0.06em] text-white uppercase leading-[1.3] drop-shadow-md select-none flex items-center gap-2">
                <span>ALIBAUG IS WHERE IT BEGAN.</span>
                <span className="text-[#C7A65B] text-base">→</span>
              </h2>
            </div>
          </Link>
        </section>

        {/* 5. OWNERSHIP JOURNEY: BUY → BUILD → SELL */}
        <OwnershipJourneySection />



      </div>
    </div>
  );
}
