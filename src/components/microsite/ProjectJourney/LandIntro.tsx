import { useMemo } from 'react';

interface LandIntroProps {
  progress: number;
}

export default function LandIntro({ progress }: LandIntroProps) {
  // Active between 0.00 and 0.035
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, progress / 0.035));
  }, [progress]);

  const isActive = progress < 0.04;

  if (!isActive) return null;

  const exitProgress = Math.max(0, (localProgress - 0.4) / 0.6); 
  
  const textOpacity = 1 - exitProgress;
  const textY = -50 * exitProgress;
  const letterSpacing = 0.05 + (exitProgress * 0.1); 
  const blur = exitProgress * 10; 

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        <span className="text-xs tracking-[0.3em] text-veda-olive uppercase mb-6 font-medium">
          Veda Life Spaces
        </span>
        
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-editorial text-veda-forest uppercase leading-tight mb-8"
          style={{ letterSpacing: `${letterSpacing}em` }}
        >
          Land Worth<br/>Owning.
        </h1>
        
        <p className="text-lg md:text-xl text-veda-text-secondary font-light max-w-lg mx-auto">
          We don't just find land.<br/>
          We find the right opportunity.
        </p>
      </div>
    </div>
  );
}
