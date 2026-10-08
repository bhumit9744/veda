import { useMemo } from 'react';

interface EuropeanArchitectureProps {
  progress: number;
}

export default function EuropeanArchitecture({ progress }: EuropeanArchitectureProps) {
  // Active between 0.15 and 0.18
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.15) / 0.03));
  }, [progress]);

  const isActive = progress >= 0.14 && progress <= 0.19;
  if (!isActive) return null;

  const opacity = localProgress < 0.2 ? localProgress / 0.2 : localProgress > 0.8 ? 1 - ((localProgress - 0.8) / 0.2) : 1;
  const scale = 0.95 + (localProgress * 0.1); 

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center bg-veda-ivory z-0">
      <div 
        className="text-center px-6"
        style={{
          opacity,
          transform: `scale(${scale})`
        }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-editorial text-veda-forest uppercase leading-tight tracking-widest mb-8">
          European<br/>Architecture
        </h2>
        <p className="text-lg md:text-xl text-veda-olive font-light tracking-[0.2em] uppercase">
          Three architectural expressions.<br/>
          One considered way of living.
        </p>
      </div>
    </div>
  );
}
