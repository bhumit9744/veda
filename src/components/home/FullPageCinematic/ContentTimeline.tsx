import React from 'react';
import { Search, MapPin, Pickaxe } from 'lucide-react';
import { vedaContent } from '../../../content/vedaContent';
import FilledTextHover from '../InteractiveHero/FilledTextHover';

interface ContentTimelineProps {
  masterProgress: number;
}

export default function ContentTimeline({ masterProgress }: ContentTimelineProps) {
  
  // Helper to get normalized progress between start and end (0 to 1)
  const progressBetween = (startFrame: number, endFrame: number) => {
    const start = startFrame / 150;
    const end = endFrame / 150;
    return Math.min(1, Math.max(0, (masterProgress - start) / (end - start)));
  };

  // Helper to map normalized progress to specific animation curves
  const getPhaseStyles = (p: number, enterEnd = 0.2, exitStart = 0.8, isFirst = false) => {
    let opacity = 0;
    let y = 0;
    
    if (p <= 0 && !isFirst) return { opacity: 0, transform: 'translateY(20px)', pointerEvents: 'none' as any };
    if (p >= 1) return { opacity: 0, transform: 'translateY(-20px)', pointerEvents: 'none' as any };

    if (p < enterEnd) {
      // Entering
      if (isFirst) {
        opacity = 1;
        y = 0;
      } else {
        const enterProgress = Math.max(0, p / enterEnd);
        opacity = enterProgress;
        y = 20 * (1 - enterProgress);
      }
    } else if (p > exitStart) {
      // Exiting
      const exitProgress = (p - exitStart) / (1 - exitStart);
      opacity = 1 - exitProgress;
      y = -20 * exitProgress;
    } else {
      // Holding
      opacity = 1;
      y = 0;
    }

    return {
      opacity,
      transform: `translateY(${y}px)`,
      pointerEvents: opacity > 0.1 ? 'auto' as any : 'none' as any
    };
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center p-6 md:p-12 z-20 text-veda-forest text-center">
      
      {/* 1. HERO (0-30) */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center" style={getPhaseStyles(progressBetween(0, 30), 0.2, 0.8, true)}>
        <FilledTextHover scrollProgress={progressBetween(0, 30)} />
      </div>

      {/* 2. OPPORTUNITY SHOWCASE (26-62) */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center px-5 sm:px-8 lg:px-10 xl:px-12 pointer-events-none" 
        style={getPhaseStyles(progressBetween(26, 62), 0.18, 0.82)}
      >
        <div className="relative w-full max-w-[1580px] mx-auto flex items-center justify-center">
          <div className="relative w-full aspect-[16/9] h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[590px] 2xl:h-[630px] max-h-[70vh] overflow-hidden rounded-sm shadow-2xl border border-neutral-200/90 group pointer-events-auto">
            <img 
              src="/assets/images/Golden Villa Driveway at Sunset.png" 
              alt="Veda Opportunity" 
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" 
              loading="eager"
            />
            {/* Subtle soft dark gradient overlay at bottom for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            
            {/* Overlay content in small below and left */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 md:bottom-9 md:left-10 z-20 max-w-xl text-left">
              <h2 className="font-codec font-normal text-xs sm:text-sm md:text-base lg:text-[17px] tracking-[0.06em] sm:tracking-[0.08em] text-white uppercase leading-[1.38] drop-shadow-md select-none">
                WE DON’T JUST FIND LAND. WE FIND THE RIGHT OPPORTUNITY.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PROMISE (61-90) */}
      <div className="absolute w-full px-4 max-w-5xl" style={getPhaseStyles(progressBetween(61, 90))}>
        <div className="text-xs tracking-[0.3em] uppercase text-[#B59A68] mb-4 font-medium">
          {vedaContent.promise.eyebrow}
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-12 uppercase leading-tight text-veda-forest">
          {vedaContent.promise.headline.split('\n').map((line, i) => <div key={i}>{line}</div>)}
        </h2>
        <p className="text-sm md:text-lg text-veda-forest/75 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          {vedaContent.promise.body1}
        </p>
        <p className="text-lg md:text-xl font-serif italic text-veda-forest">
          {vedaContent.promise.body3}
        </p>
      </div>

      {/* 4. OUR DEVELOPMENT (91-115) */}
      <div className="absolute w-full px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left" style={getPhaseStyles(progressBetween(91, 115))}>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-[#B59A68] mb-4 font-medium">
            {vedaContent.ourDevelopment.eyebrow}
          </div>
          <h2 className="text-5xl md:text-7xl font-bebas uppercase tracking-widest text-veda-forest mb-8">
            {vedaContent.ourDevelopment.headline}
          </h2>
          <p className="text-base md:text-xl text-veda-forest/80 max-w-xl leading-relaxed mb-12 font-light">
            {vedaContent.ourDevelopment.body}
          </p>
          <button className="text-sm tracking-[0.2em] uppercase text-veda-forest hover:text-white transition-colors pointer-events-auto border border-[#B59A68] hover:bg-[#B59A68] px-6 py-3 rounded-sm">
            {vedaContent.ourDevelopment.cta}
          </button>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#B59A68]/30 group">
           <img src="/alibaug.png" alt="Alibaug Development" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" />
        </div>
      </div>

      {/* 5. AFTER YOU BUY (116-150) */}
      <div className="absolute w-full px-4 max-w-5xl" style={getPhaseStyles(progressBetween(116, 150))}>
        <div className="text-xs tracking-[0.3em] uppercase text-[#B59A68] mb-4 font-medium">
          {vedaContent.afterYouBuy.eyebrow}
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-6 uppercase text-veda-forest">
          {vedaContent.afterYouBuy.headline}
        </h2>
        <p className="text-lg md:text-2xl font-serif italic text-[#B59A68] mb-12">
          {vedaContent.afterYouBuy.intro}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 px-4">
          {vedaContent.afterYouBuy.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center bg-white/80 border border-[#D8D3C6] p-8 rounded-sm hover:border-[#B59A68] transition-all duration-500 shadow-md hover:shadow-xl backdrop-blur-sm group">
              <h3 className="text-2xl font-bebas tracking-widest text-[#B59A68] mb-4 group-hover:scale-105 transition-transform duration-500">{step.title}</h3>
              <p className="text-sm text-veda-forest/75 leading-relaxed text-center group-hover:text-veda-forest transition-colors duration-500 font-light">{step.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="text-sm uppercase tracking-widest text-veda-forest/60 space-y-2">
          <p>{vedaContent.afterYouBuy.outro1}</p>
          <p className="text-veda-forest font-medium">{vedaContent.afterYouBuy.outro2}</p>
        </div>
      </div>

    </div>
  );
}
