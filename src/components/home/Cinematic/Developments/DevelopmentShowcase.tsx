import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DevelopmentShowcaseProps {
  progress: number;
  activeDev: number;
}

export default function DevelopmentShowcase({ progress, activeDev }: DevelopmentShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Development Data (matching existing Veda structure)
  const developments = [
    {
      title: "BELLAGIO",
      location: "ALIBAUG",
      desc: "55 exquisite plots spread across 10 acres of pristine landscape.",
      tag: "READY TO BUILD"
    },
    {
      title: "VISTA",
      location: "LONAVALA",
      desc: "Elevated living with panoramic valley views.",
      tag: "UPCOMING"
    },
    {
      title: "UPCOMING",
      location: "GOA",
      desc: "Coastal luxury living redefined.",
      tag: "PRE-LAUNCH"
    }
  ];

  useEffect(() => {
    // Reveal Showcase between 0.55 and 0.65
    // As the DNA rotates and camera pulls back, the UI comes in.
    const pReveal = Math.max(0, Math.min(1, (progress - 0.55) / 0.1));
    
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        opacity: pReveal,
        y: (1 - pReveal) * 50
      });
    }
  }, [progress]);

  const dev = developments[activeDev];

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24 opacity-0">
      
      {/* Subtle cinematic masking gradient to ensure text readability against the 3D scene */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-4xl">
        <div className="overflow-hidden mb-2">
          {/* Keyframes could be used here for staggered text reveal when activeDev changes, 
              but since activeDev updates instantly on scroll, we keep it simple and elegant */}
          <h3 className="text-[#d4c9b3] text-sm md:text-base tracking-[0.3em] font-medium uppercase">
            {dev.location} &mdash; {dev.tag}
          </h3>
        </div>
        
        <h1 className="text-[#F4F1E8] text-[clamp(40px,8vw,120px)] font-bold uppercase tracking-tighter leading-none mb-6 drop-shadow-xl">
          {dev.title}
        </h1>
        
        <p className="text-white/80 text-lg md:text-2xl font-light max-w-2xl">
          {dev.desc}
        </p>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute right-8 md:right-16 lg:right-24 bottom-8 md:bottom-16 lg:bottom-24 flex flex-col gap-4">
        {developments.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 transition-all duration-500 ease-out ${
              i === activeDev ? 'h-12 bg-[#d4c9b3]' : 'h-4 bg-white/20'
            }`} 
          />
        ))}
      </div>
      
    </div>
  );
}
