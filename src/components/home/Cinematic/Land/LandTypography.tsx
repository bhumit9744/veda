import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const LandTypography = forwardRef((_props, ref) => {
  const [progress, setProgress] = useState(0);

  const clarityRef = useRef<HTMLHeadingElement>(null);
  const labelsRef = useRef<HTMLDivElement[]>([]);
  const annotations = ["TITLE", "LEGAL", "LOCATION", "CONNECTIVITY", "PLANNING", "DEVELOPMENT"];

  const statementRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const chooseRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  useEffect(() => {
    const pBreak = Math.max(0, Math.min(1, progress / 0.15));
    if (clarityRef.current) {
      gsap.set(clarityRef.current, {
        opacity: 0.5 * (1 - pBreak),
        scale: 1 + (pBreak * 0.5),
        letterSpacing: `${0.05 + (pBreak * 0.5)}em`,
        filter: `blur(${pBreak * 20}px)`,
        y: pBreak * -50
      });
    }

    labelsRef.current.forEach((label, i) => {
      if (!label) return;
      const speedX = (i % 2 === 0 ? 1 : -1) * 100;
      const speedY = (i % 3 === 0 ? 1 : -1) * 100;
      gsap.set(label, {
        opacity: 1 - pBreak,
        x: speedX * pBreak,
        y: speedY * pBreak,
        filter: `blur(${pBreak * 10}px)`
      });
    });

    const pLandIn = Math.max(0, Math.min(1, (progress - 0.4) / 0.1));
    const pLandOut = Math.max(0, Math.min(1, (progress - 0.55) / 0.1));
    if (statementRef.current) {
      gsap.set(statementRef.current, {
        opacity: pLandIn - pLandOut,
        y: (1 - pLandIn) * 50 - (pLandOut * 50),
        filter: `blur(${(1 - pLandIn) * 10 + (pLandOut * 10)}px)`
      });
    }

    const pResearchIn = Math.max(0, Math.min(1, (progress - 0.6) / 0.1));
    const pResearchOut = Math.max(0, Math.min(1, (progress - 0.7) / 0.1));
    if (researchRef.current) {
      gsap.set(researchRef.current, {
        opacity: pResearchIn - pResearchOut,
        x: (1 - pResearchIn) * 50 - (pResearchOut * 50),
        filter: `blur(${(1 - pResearchIn) * 10 + (pResearchOut * 10)}px)`
      });
    }

    const pChooseIn = Math.max(0, Math.min(1, (progress - 0.75) / 0.1));
    const pChooseOut = Math.max(0, Math.min(1, (progress - 0.85) / 0.1));
    if (chooseRef.current) {
      gsap.set(chooseRef.current, {
        opacity: pChooseIn - pChooseOut,
        x: (1 - pChooseIn) * 50 - (pChooseOut * 50),
        filter: `blur(${(1 - pChooseIn) * 10 + (pChooseOut * 10)}px)`
      });
    }

    const pDevelopIn = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));
    if (developRef.current) {
      gsap.set(developRef.current, {
        opacity: pDevelopIn,
        scale: 0.9 + (pDevelopIn * 0.1),
        filter: `blur(${(1 - pDevelopIn) * 10}px)`
      });
    }

  }, [progress]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 ref={clarityRef} className="absolute text-white text-[clamp(80px,18vw,300px)] font-bold uppercase tracking-tighter leading-none mix-blend-overlay">
          Clarity
        </h1>
        {annotations.map((text, i) => {
          const top = `${15 + (i * 14)}%`;
          const left = i % 2 === 0 ? `${10 + (i * 5)}%` : `${65 + (i * 5)}%`;
          return (
            <div key={text} ref={el => { if (el) labelsRef.current[i] = el; }} className="absolute text-[#d4c9b3] text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.3em] font-medium" style={{ top, left }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4c9b3] opacity-60"></span>{text}
              </div>
            </div>
          );
        })}
      </div>

      <div ref={statementRef} className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0">
        <div className="relative w-full max-w-5xl h-full flex flex-col justify-center">
          <h2 className="text-[#F4F1E8] text-[clamp(24px,4vw,40px)] uppercase tracking-[0.2em] font-light absolute top-[25%] left-[10%]">
            We Find
          </h2>
          <h1 className="text-white text-[clamp(80px,20vw,350px)] uppercase font-bold leading-none tracking-tighter absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay">
            Land
          </h1>
          <h2 className="text-[#d4c9b3] text-[clamp(28px,5vw,50px)] uppercase tracking-[0.1em] font-medium absolute bottom-[25%] right-[10%]">
            Worth Owning.
          </h2>
          <div className="absolute bottom-[15%] left-[50%] -translate-x-1/2 text-center w-full">
            <p className="text-white/60 text-xs md:text-sm tracking-[0.2em] uppercase">We don't just find land.<br/>We find the right opportunity.</p>
          </div>
        </div>
      </div>

      <div ref={researchRef} className="absolute inset-0 flex items-center p-8 md:p-24 opacity-0">
        <div className="max-w-2xl">
          <div className="text-[#d4c9b3] text-xs tracking-[0.3em] mb-4">01</div>
          <h1 className="text-white text-[clamp(40px,8vw,120px)] uppercase font-bold leading-none tracking-tight mb-6">
            Research
          </h1>
          <p className="text-[#F4F1E8] text-lg md:text-3xl font-light tracking-wide">
            Study markets. Identify land with potential.
          </p>
        </div>
      </div>

      <div ref={chooseRef} className="absolute inset-0 flex items-center justify-end p-8 md:p-24 opacity-0 text-right">
        <div className="max-w-2xl">
          <div className="text-[#d4c9b3] text-xs tracking-[0.3em] mb-4">02</div>
          <h1 className="text-white text-[clamp(40px,8vw,120px)] uppercase font-bold leading-none tracking-tight mb-6">
            Choose
          </h1>
          <p className="text-[#F4F1E8] text-lg md:text-3xl font-light tracking-wide">
            Choose the land.
          </p>
        </div>
      </div>

      <div ref={developRef} className="absolute inset-0 flex items-center justify-center p-8 opacity-0">
        <div className="text-center">
          <div className="text-[#d4c9b3] text-xs tracking-[0.3em] mb-6">03</div>
          <h1 className="text-white text-[clamp(60px,12vw,200px)] uppercase font-bold leading-none tracking-tighter mb-8">
            Develop
          </h1>
          <p className="text-[#F4F1E8] text-xl md:text-4xl font-light tracking-[0.1em]">
            Develop the opportunity.
          </p>
        </div>
      </div>

    </div>
  );
});

LandTypography.displayName = 'LandTypography';
export default LandTypography;
