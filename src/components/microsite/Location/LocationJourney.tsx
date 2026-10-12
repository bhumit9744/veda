import { useMemo } from 'react';

interface LocationJourneyProps {
  progress: number;
}

export default function LocationJourney({ progress }: LocationJourneyProps) {
  // Global active between 0.65 and 0.78
  const isActive = progress >= 0.64 && progress <= 0.79;
  
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.65) / 0.13));
  }, [progress]);

  if (!isActive) return null;

  // We gently fade the map in and out at the boundaries
  const opacity = localProgress < 0.05 
    ? localProgress / 0.05 
    : localProgress > 0.95 
      ? 1 - ((localProgress - 0.95) / 0.05) 
      : 1;
      
  // Subtle scale effect as you scroll through the section
  const scale = 0.98 + (localProgress * 0.02);

  return (
    <div 
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col items-center justify-center z-0 pointer-events-auto px-6"
      style={{ opacity }}
    >
      <div 
        className="w-full flex flex-col items-center text-center mb-10"
        style={{ transform: `translateY(${(1 - localProgress) * 20}px)` }}
      >
        <h2 className="text-3xl md:text-5xl font-editorial text-veda-forest uppercase tracking-widest drop-shadow-sm">
          Location
        </h2>
      </div>

      <div 
        className="w-full max-w-5xl h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden shadow-2xl border border-veda-border/50 relative pointer-events-auto"
        style={{ transform: `scale(${scale})` }}
      >
        <iframe
          src="https://maps.google.com/maps?q=18.7230031,72.9024155&hl=en&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[30%]" 
        ></iframe>
      </div>
    </div>
  );
}
