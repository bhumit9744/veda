import { useMemo } from 'react';

interface LandJourneyProps {
  progress: number;
}

export default function LandJourney({ progress }: LandJourneyProps) {
  // Active between 0.00 and 0.10
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, progress / 0.10));
  }, [progress]);

  const isActive = progress >= 0.00 && progress <= 0.11;
  if (!isActive) return null;

  const aerialScale = 1 + (localProgress * 0.25);
  const aerialY = localProgress * -8;
  const aerialOpacity = localProgress > 0.4 ? 1 - ((localProgress - 0.4) / 0.1) : 1;
  const aerialBlur = localProgress * 10;

  const roadsActive = localProgress > 0.2 && localProgress < 0.7;
  const roadsProgress = Math.max(0, (localProgress - 0.2) / 0.5);
  const roadsScale = 1.08 + (roadsProgress * 0.27); 
  const roadsOpacity = localProgress < 0.3 ? ((localProgress - 0.2) / 0.1) : localProgress > 0.6 ? 1 - ((localProgress - 0.6) / 0.1) : 1;
  const roadsBlur = localProgress > 0.6 ? ((localProgress - 0.6) / 0.1) * 10 : 0;

  const villaActive = localProgress > 0.45;
  const villaProgress = Math.max(0, (localProgress - 0.45) / 0.55);
  const villaScale = 1.05 + (villaProgress * 0.25);
  const villaOpacity = localProgress < 0.55 ? ((localProgress - 0.45) / 0.1) : 1;

  const heroTextActive = localProgress > 0.85;
  const heroTextOpacity = localProgress < 0.9 ? 0 : ((localProgress - 0.9) / 0.1);
  const heroTextScale = 0.95 + (localProgress - 0.9);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-transparent">
      {/* Text removed per user request */}
    </div>
  );
}
