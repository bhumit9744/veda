import { useMemo } from 'react';
import { aboutContent } from '../../../content/aboutContent';

interface AboutStoryProps {
  progress: number;
  isMobile: boolean;
}

export default function AboutStory({ progress, isMobile }: AboutStoryProps) {
  // progress goes from 0.0 to 1.0
  // We extract 3 punchy, subtle phrases from the aboutContent paragraphs to avoid text-heavy design.
  
  const phrases = [
    "Secure, transparent, and meaningful.",
    "Curating spaces for privacy and long-term value.",
    "A foundation for legacy."
  ];

  // Determine which phrase is active
  const activeIdx = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
  const phrase = phrases[activeIdx];
  
  // Calculate a local progress from 0 to 1 for the current phrase
  const localP = (progress - (activeIdx * 0.33)) / 0.33;
  
  // Smooth bell curve for opacity: fades in fast, holds, fades out
  const opacity = localP < 0.2 ? localP / 0.2 : localP > 0.8 ? 1 - ((localP - 0.8) / 0.2) : 1;
  
  // Continuous smooth scaling and slight upward drift
  const scale = 0.95 + (localP * 0.1); // subtle grow
  const translateY = 20 - (localP * 40); // drifts from 20px down to -20px up
  
  // Blur effect for entering and exiting
  const blur = localP < 0.2 ? 10 - (localP * 50) : localP > 0.8 ? ((localP - 0.8) * 50) : 0;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none px-6">
      <div 
        className="max-w-5xl text-center"
        style={{ 
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          filter: `blur(${Math.max(0, blur)}px)`
        }}
      >
        <h4 className={`font-editorial text-veda-forest uppercase tracking-[0.1em] drop-shadow-sm leading-tight
          ${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'}
        `}>
          {phrase}
        </h4>
      </div>
    </div>
  );
}
