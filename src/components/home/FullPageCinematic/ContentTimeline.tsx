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
    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center p-6 md:p-12 z-20 text-[#F0EBDD] text-center">
      
      {/* 1. HERO (0-30) */}
      <div className="absolute w-full h-full max-w-[1400px] flex flex-col items-center justify-center" style={getPhaseStyles(progressBetween(0, 30), 0.2, 0.8, true)}>
        <FilledTextHover scrollProgress={progressBetween(0, 30)} />
      </div>

      {/* 2. WHAT DO WE DO (31-60) */}
      <div className="absolute w-full px-4 max-w-5xl" style={getPhaseStyles(progressBetween(31, 60))}>
        <div className="text-xs tracking-[0.3em] uppercase text-[#C7A34A] mb-4">
          {vedaContent.whatWeDo.eyebrow}
        </div>

        <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-8 uppercase">
          {vedaContent.whatWeDo.subheadline}
        </h2>
        <p className="text-sm md:text-lg text-white/70 max-w-3xl mx-auto mb-6 leading-relaxed">
          {vedaContent.whatWeDo.body1}
        </p>
        {vedaContent.whatWeDo.body2 && (
          <p className="text-sm md:text-lg text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            {vedaContent.whatWeDo.body2}
          </p>
        )}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 text-[#C7A34A] items-center opacity-80 mt-12">
          <div className="flex flex-col items-center gap-4">
            <Search size={32} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.2em] uppercase font-light text-[#F0EBDD]/80">Research the market</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <MapPin size={32} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.2em] uppercase font-light text-[#F0EBDD]/80">Choose the land</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Pickaxe size={32} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.2em] uppercase font-light text-[#F0EBDD]/80">Develop the opportunity</span>
          </div>
        </div>
      </div>

      {/* 3. PROMISE (61-90) */}
      <div className="absolute w-full px-4 max-w-5xl" style={getPhaseStyles(progressBetween(61, 90))}>
        <div className="text-xs tracking-[0.3em] uppercase text-[#C7A34A] mb-4">
          {vedaContent.promise.eyebrow}
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-12 uppercase leading-tight">
          {vedaContent.promise.headline.split('\n').map((line, i) => <div key={i}>{line}</div>)}
        </h2>
        <p className="text-sm md:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
          {vedaContent.promise.body1}
        </p>
        <p className="text-lg md:text-xl font-serif italic text-white">
          {vedaContent.promise.body3}
        </p>
      </div>

      {/* 4. OUR DEVELOPMENT (91-115) */}
      <div className="absolute w-full px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left" style={getPhaseStyles(progressBetween(91, 115))}>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-[#C7A34A] mb-4">
            {vedaContent.ourDevelopment.eyebrow}
          </div>
          <h2 className="text-5xl md:text-7xl font-bebas uppercase tracking-widest text-[#F0EBDD] mb-8">
            {vedaContent.ourDevelopment.headline}
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-xl leading-relaxed mb-12">
            {vedaContent.ourDevelopment.body}
          </p>
          <button className="text-sm tracking-[0.2em] uppercase text-[#C7A34A] hover:text-white transition-colors pointer-events-auto border border-[#C7A34A]/30 px-6 py-3 rounded-sm">
            {vedaContent.ourDevelopment.cta}
          </button>
        </div>
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl opacity-90 border border-white/10">
           <img src="/alibaug.png" alt="Alibaug Development" className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000" />
        </div>
      </div>

      {/* 5. AFTER YOU BUY (116-150) */}
      <div className="absolute w-full px-4 max-w-5xl" style={getPhaseStyles(progressBetween(116, 150))}>
        <div className="text-xs tracking-[0.3em] uppercase text-[#C7A34A] mb-4">
          {vedaContent.afterYouBuy.eyebrow}
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-6 uppercase">
          {vedaContent.afterYouBuy.headline}
        </h2>
        <p className="text-lg md:text-2xl font-serif italic text-[#C7A34A] mb-12">
          {vedaContent.afterYouBuy.intro}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 px-4">
          {vedaContent.afterYouBuy.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center bg-black/40 border border-white/10 p-8 rounded-sm hover:bg-white/5 hover:border-[#C7A34A]/40 transition-all duration-500 shadow-2xl backdrop-blur-sm group">
              <h3 className="text-2xl font-bebas tracking-widest text-[#C7A34A] mb-4 group-hover:scale-105 transition-transform duration-500">{step.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed text-center group-hover:text-white/90 transition-colors duration-500">{step.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="text-sm uppercase tracking-widest text-white/60 space-y-2">
          <p>{vedaContent.afterYouBuy.outro1}</p>
          <p className="text-white">{vedaContent.afterYouBuy.outro2}</p>
        </div>
      </div>

    </div>
  );
}
