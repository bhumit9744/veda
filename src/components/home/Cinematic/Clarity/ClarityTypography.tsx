import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const ClarityTypography = forwardRef((_props, ref) => {
  const wordRef = useRef<HTMLHeadingElement>(null);
  const labelsRef = useRef<HTMLDivElement[]>([]);
  const annotations = ["TITLE", "LEGAL", "LOCATION", "CONNECTIVITY", "PLANNING", "DEVELOPMENT"];
  
  const [progress, setProgress] = useState(0);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  useEffect(() => {
    // Main CLARITY word (0 to 0.4 scale down and unblur, 0.4 to 1 stays as part of topo)
    const pWord = Math.max(0, Math.min(1, progress / 0.4));
    const pWordOut = Math.max(0, Math.min(1, (progress - 0.7) / 0.3));

    if (wordRef.current) {
      gsap.set(wordRef.current, {
        scale: 1.4 - (pWord * 0.4) + (pWordOut * 0.1),
        x: `${10 - (pWord * 10)}vw`,
        filter: `blur(${(1 - pWord) * 12}px)`,
        opacity: 0.2 + (pWord * 0.8) - (pWordOut * 0.5), // Fades slightly at the end to integrate with land
        letterSpacing: `${0.1 - (pWord * 0.05)}em`
      });
    }

    // Floating labels appear between 0.3 and 0.6
    labelsRef.current.forEach((label, i) => {
      if (!label) return;
      const staggerStart = 0.3 + (i * 0.05);
      const pLabel = Math.max(0, Math.min(1, (progress - staggerStart) / 0.2));
      const pLabelOut = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));
      
      const speedY = (i % 2 === 0 ? 1 : -1) * 30;
      const speedX = (i % 3 === 0 ? 1 : -1) * 20;

      gsap.set(label, {
        opacity: pLabel - (pLabelOut * 0.5), // fade out slightly at the end
        y: speedY * (1 - pLabel),
        x: speedX * (1 - pLabel),
        filter: `blur(${(1 - pLabel) * 5}px)`,
        scale: 0.8 + (pLabel * 0.2)
      });
    });

  }, [progress]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <h1 
        ref={wordRef} 
        className="absolute text-white text-[clamp(60px,15vw,250px)] font-bold uppercase tracking-tighter leading-none mix-blend-overlay z-10"
      >
        Clarity
      </h1>

      {annotations.map((text, i) => {
        const top = `${15 + (i * 14)}%`;
        const left = i % 2 === 0 ? `${10 + (i * 5)}%` : `${65 + (i * 5)}%`;
        
        return (
          <div 
            key={text}
            ref={el => { if (el) labelsRef.current[i] = el; }}
            className="absolute text-[#d4c9b3] text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.3em] font-medium z-20"
            style={{ top, left }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4c9b3] opacity-60"></span>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
});

ClarityTypography.displayName = 'ClarityTypography';
export default ClarityTypography;
