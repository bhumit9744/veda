import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const OpportunityTypography = forwardRef((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  
  const [progress, setProgress] = useState(0);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  useEffect(() => {
    // "WE FIND THE OPPORTUNITY." (0 to 0.4)
    // Starts: oversized, blurred, clipped, translatedX(-8vw)
    // Becomes: sharp, x=0, letter spacing tightens, opacity 1
    // Then moves away (0.4 to 0.6)
    
    // Phase 1: Enter
    const p1In = Math.max(0, Math.min(1, progress / 0.3));
    // Phase 2: Exit
    const p1Out = Math.max(0, Math.min(1, (progress - 0.35) / 0.25));

    if (text1Ref.current) {
      gsap.set(text1Ref.current, {
        x: p1Out > 0 ? p1Out * -50 : -80 * (1 - p1In),
        opacity: p1Out > 0 ? 1 - p1Out : p1In,
        filter: p1Out > 0 ? `blur(${p1Out * 10}px)` : `blur(${(1 - p1In) * 15}px)`,
        scale: p1Out > 0 ? 1 - (p1Out * 0.1) : 1.1 - (p1In * 0.1),
        letterSpacing: p1Out > 0 ? `${0.1 + p1Out * 0.1}em` : `${0.2 - p1In * 0.1}em`,
        clipPath: `polygon(0 0, ${p1In * 100}% 0, ${p1In * 100}% 100%, 0 100%)`
      });
    }

    // "WE GIVE YOU THE CLARITY." (0.45 to 0.85)
    // Enters from right: translateX(8vw)
    const p2In = Math.max(0, Math.min(1, (progress - 0.45) / 0.3));
    const p2Out = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));

    if (text2Ref.current) {
      gsap.set(text2Ref.current, {
        x: p2Out > 0 ? p2Out * 50 : 80 * (1 - p2In),
        opacity: p2Out > 0 ? 1 - p2Out : p2In,
        filter: p2Out > 0 ? `blur(${p2Out * 10}px)` : `blur(${(1 - p2In) * 15}px)`,
        scale: p2Out > 0 ? 1 + (p2Out * 0.1) : 1.1 - (p2In * 0.1),
        clipPath: `polygon(${100 - p2In * 100}% 0, 100% 0, 100% 100%, ${100 - p2In * 100}% 100%)`
      });
    }

  }, [progress]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
      <h1 
        ref={text1Ref} 
        className="absolute text-[#F4F1E8] text-[clamp(28px,5vw,70px)] font-light uppercase text-center px-4"
        style={{ letterSpacing: '0.2em' }}
      >
        We Find<br/>The Opportunity.
      </h1>
      <h1 
        ref={text2Ref} 
        className="absolute text-[#d4c9b3] text-[clamp(32px,6vw,90px)] font-medium uppercase tracking-[0.05em] text-center px-4 leading-none"
      >
        We Give You The<br/>Clarity.
      </h1>
    </div>
  );
});

OpportunityTypography.displayName = 'OpportunityTypography';
export default OpportunityTypography;
