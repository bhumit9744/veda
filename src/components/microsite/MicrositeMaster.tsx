import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    if (!containerRef.current) return;
    
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-veda-ivory font-sans text-veda-forest" style={{ height: '2000vh' }}>
      <div className="sticky top-[63px] left-0 w-full h-[calc(100svh-63px)] overflow-hidden bg-veda-ivory flex items-center justify-center">
        
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
  );
}
