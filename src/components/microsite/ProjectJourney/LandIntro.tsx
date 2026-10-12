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
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-editorial text-white leading-tight mb-8 px-8 py-4 rounded-xl"
          style={{
            textShadow: '0px 4px 20px rgba(0,0,0,0.9), 0px 2px 8px rgba(0,0,0,0.8)'
          }}
        >
          A European Way of Life, Reimagined in Alibaug.
        </h1>
      </div>
    </div>
  );
}
