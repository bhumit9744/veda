import React from 'react';
import { Link } from 'react-router-dom';
import FilledTextHover from '../InteractiveHero/FilledTextHover';
import OwnershipJourneySection from '../../projects/OwnershipJourneySection';

export default function FullPageCinematic() {
  return (
    <div className="relative w-full bg-white text-veda-forest">
      {/* 01. HERO (Second section on home page after HeroVideoIntro) */}
      <section data-section="second-section" className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <FilledTextHover scrollProgress={0} />
      </section>

      {/* 02. OPPORTUNITY SHOWCASE — GOLDEN VILLA DRIVEWAY AT SUNSET (FULL-WIDTH ALIGNMENT) */}
      <section className="relative w-full overflow-hidden z-20 font-codec">
        <div className="relative w-full aspect-[1672/941] max-h-[92vh] overflow-hidden group">
          <img 
            src="/assets/images/Golden Villa Driveway at Sunset.png" 
            alt="Veda Opportunity - Villa Driveway at Sunset" 
            className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out" 
            loading="eager"
          />
          {/* Subtle soft dark gradient overlay at bottom for optimal contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
          
          {/* Overlay content in small below and left */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-12 md:left-14 lg:bottom-16 lg:left-20 z-20 max-w-2xl text-left pointer-events-auto">
            <h2 className="font-codec font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] tracking-[0.06em] sm:tracking-[0.08em] text-white uppercase leading-[1.38] drop-shadow-md select-none">
              WE DON’T JUST FIND LAND. WE FIND THE RIGHT OPPORTUNITY.
            </h2>
          </div>
        </div>
      </section>

      {/* 03. VIDEO SHOWCASE — ALIBAUG IS WHERE IT BEGAN (CLICKABLE TO /projects) */}
      <section className="relative w-full overflow-hidden z-20 font-codec mt-3 sm:mt-4 md:mt-6">
        <Link 
          to="/projects"
          className="block relative w-full aspect-[16/9] max-h-[92vh] overflow-hidden group cursor-pointer"
          title="Explore Veda Projects"
        >
          <video 
            src="/assets/images/homevideo.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          />
          {/* Subtle soft dark gradient overlay at bottom for optimal contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none group-hover:from-black/85 transition-colors duration-500" />
          
          {/* Overlay content - Larger typography below and left */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-12 md:left-14 lg:bottom-16 lg:left-20 z-20 max-w-2xl text-left pointer-events-auto">
            <h2 className="font-codec font-normal text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px] tracking-[0.06em] sm:tracking-[0.08em] text-white uppercase leading-[1.3] drop-shadow-lg select-none group-hover:text-[#F3E7C4] transition-colors duration-300 flex items-center gap-3">
              <span>ALIBAUG IS WHERE IT BEGAN.</span>
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 text-[#C7A65B] text-xl md:text-2xl font-light">→</span>
            </h2>
          </div>
        </Link>
      </section>

      {/* 04. OWNERSHIP JOURNEY: BUY → BUILD → SELL (FULL SVG ARCHITECTURAL PATHWAY) */}
      <OwnershipJourneySection />
    </div>
  );
}
