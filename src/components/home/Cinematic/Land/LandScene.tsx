import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LandTypography from './LandTypography';
import SurveyField from './SurveyField';
import TopographicField from './TopographicField';
import MasterplanField from './MasterplanField';

export default function LandScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<any>(null);
  const surveyRef = useRef<any>(null);
  const topoRef = useRef<any>(null);
  const masterplanRef = useRef<any>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            
            if (typoRef.current?.setProgress) typoRef.current.setProgress(p);
            if (surveyRef.current?.setProgress) surveyRef.current.setProgress(p);
            if (topoRef.current?.setProgress) topoRef.current.setProgress(p);
            if (masterplanRef.current?.setProgress) masterplanRef.current.setProgress(p);

            if (bgImageRef.current) {
              const pReveal = Math.max(0, Math.min(1, (p - 0.3) / 0.15));
              const pChoose = Math.max(0, Math.min(1, (p - 0.75) / 0.1));
              
              gsap.set(bgImageRef.current, {
                opacity: pReveal * (1 - pChoose * 0.4),
                scale: 1.1 + (pChoose * 0.1),
                filter: `blur(${(1 - pReveal) * 20}px) grayscale(${100 - pReveal * 100}%) brightness(${1 - pChoose * 0.2})`,
              });
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[600vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden">
        
        <img 
          ref={bgImageRef}
          src="/hero-frames/frame_0180.webp" 
          alt="Land Environment"
          className="absolute inset-0 w-full h-full object-cover opacity-0 z-0 mix-blend-luminosity"
        />

        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <SurveyField ref={surveyRef} />
          <TopographicField ref={topoRef} />
          <MasterplanField ref={masterplanRef} />
        </div>

        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <LandTypography ref={typoRef} />
        </div>

      </div>
    </section>
  );
}
