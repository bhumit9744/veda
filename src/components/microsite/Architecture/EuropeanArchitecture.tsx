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
    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center bg-transparent z-0">
      <div 
        className="text-center px-6"
        style={{
          opacity,
          transform: `scale(${scale})`
        }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-editorial text-veda-forest leading-tight tracking-wide mb-6">
          A Design Ready for Your Vision.
        </h2>
        <div className="text-[13px] md:text-[15px] lg:text-[17px] text-veda-olive font-light tracking-wide max-w-3xl mx-auto space-y-2">
          {/* Mobile Text */}
          <p className="block md:hidden">
            Thoughtfully designed European-inspired villas, created for effortless living. Choose your design. Make it your own.
          </p>
          {/* Desktop Text */}
          <div className="hidden md:block space-y-2">
            <p>
              Begin with a thoughtfully designed European-inspired villa and make it your own.
            </p>
            <p>
              From considered floor plans to elegant elevations and seamless indoor-outdoor spaces, every design is created to make the journey from plot to home simpler and more inspiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
