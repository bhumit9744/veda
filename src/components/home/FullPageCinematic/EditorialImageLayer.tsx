interface EditorialImageLayerProps {
  masterProgress: number;
}

export default function EditorialImageLayer({ masterProgress }: EditorialImageLayerProps) {
  
  const progressBetween = (startFrame: number, endFrame: number) => {
    const start = startFrame / 150;
    const end = endFrame / 150;
    return Math.min(1, Math.max(0, (masterProgress - start) / (end - start)));
  };

  const getPhaseStyles = (p: number, enterEnd = 0.2, exitStart = 0.8) => {
    let opacity = 0;
    let clipPath = 'inset(100% 0 0 0)';
    let scale = 1.1;

    if (p <= 0 || p >= 1) return { opacity: 0, clipPath: 'inset(100% 0 0 0)', pointerEvents: 'none' as any };

    if (p < enterEnd) {
      const enterProgress = p / enterEnd;
      opacity = enterProgress;
      clipPath = `inset(${100 - (enterProgress * 100)}% 0 0 0)`;
      scale = 1.1 - (enterProgress * 0.1);
    } else if (p > exitStart) {
      const exitProgress = (p - exitStart) / (1 - exitStart);
      opacity = 1 - exitProgress;
      clipPath = `inset(0 0 ${exitProgress * 100}% 0)`;
      scale = 1;
    } else {
      opacity = 1;
      clipPath = 'inset(0 0 0 0)';
      scale = 1;
    }

    return {
      opacity,
      clipPath,
      transform: `scale(${scale})`,
      transition: 'none',
      pointerEvents: 'none' as any
    };
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      
      {/* ALIBAUG IMAGE REMOVED TO PREVENT OVERLAP */}

    </div>
  );
}
