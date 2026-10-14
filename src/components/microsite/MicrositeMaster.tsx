import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroFrameSequence from './ProjectJourney/HeroFrameSequence';
import LandIntro from './ProjectJourney/LandIntro';
import LandJourney from './ProjectJourney/LandJourney';
import ConceptBenefits from './Concept/ConceptBenefits';
import EuropeanArchitecture from './Architecture/EuropeanArchitecture';
import VillaTriptych from './Architecture/VillaTriptych';
import LifestyleSection from './Lifestyle/LifestyleSection';
import LocationJourney from './Location/LocationJourney';
import MicrositeAbout from './About/MicrositeAbout';
import MicrositeEnquiry from './Enquiry/MicrositeEnquiry';

gsap.registerPlugin(ScrollTrigger);

export default function MicrositeMaster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [masterProgress, setMasterProgress] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Auto open popup after 5 seconds
    const timer = setTimeout(() => {
      setIsContactOpen(true);
    }, 5000);

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
          onUpdate: (self) => {
            setMasterProgress(self.progress);
          }
        }
      });
    }, containerRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative w-full font-sans text-veda-forest bg-[#f8f9f7] z-0" style={{ height: '2000vh' }}>

        <HeroFrameSequence progress={masterProgress} />
        <div className="sticky top-[63px] left-0 w-full h-[calc(100svh-63px)] overflow-hidden bg-transparent flex items-center justify-center z-10">
          
          {/* PHASE 1: LAND & CONCEPT (0.00 to 0.15) */}
          <LandIntro progress={masterProgress} />
          <LandJourney progress={masterProgress} />
          <ConceptBenefits progress={masterProgress} />

          {/* PHASE 2: ARCHITECTURE (0.15 to 0.40) */}
          <EuropeanArchitecture progress={masterProgress} />
          <VillaTriptych progress={masterProgress} />

          {/* PHASE 3: LIFESTYLE (0.40 to 0.65) */}
          <LifestyleSection progress={masterProgress} />

          {/* PHASE 4: LOCATION (0.65 to 0.78) */}
          <LocationJourney progress={masterProgress} />

          {/* PHASE 5: ABOUT VEDA (0.78 to 0.90) */}
          <MicrositeAbout progress={masterProgress} />

          {/* PHASE 6: ENQUIRY (0.90 to 1.00) */}
          <MicrositeEnquiry progress={masterProgress} />

        </div>
      </section>

      {/* Contact Popup Modal / Right Drawer */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsContactOpen(false)}
          />
          
          {/* Side Drawer - Light Theme */}
          <div className="relative bg-[#f8f9f7] w-full max-w-md h-full p-8 md:p-12 border-l border-black/10 shadow-2xl flex flex-col justify-center animate-slide-in-right overflow-y-auto">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 text-veda-forest/50 hover:text-veda-forest transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="text-center mb-10">
              <h3 className="font-editorial text-4xl text-veda-forest mb-2">CONTACT US</h3>
              <p className="text-sm text-veda-forest/70 max-w-[250px] mx-auto">
                Register your interest to know more about our latest villas.
              </p>
            </div>

            <form className="w-full space-y-6" onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); }}>
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name*" 
                  className="w-full bg-transparent border-b border-veda-forest/20 text-veda-forest px-0 py-3 text-sm focus:outline-none focus:border-veda-gold transition-colors placeholder:text-veda-forest/50"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address*" 
                  className="w-full bg-transparent border-b border-veda-forest/20 text-veda-forest px-0 py-3 text-sm focus:outline-none focus:border-veda-gold transition-colors placeholder:text-veda-forest/50"
                  required
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Phone Number*" 
                  className="w-full bg-transparent border-b border-veda-forest/20 text-veda-forest px-0 py-3 text-sm focus:outline-none focus:border-veda-gold transition-colors placeholder:text-veda-forest/50"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#1a1a1a] text-[#F0EBDD] uppercase tracking-[0.2em] font-semibold text-xs py-4 mt-8 hover:bg-black transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
