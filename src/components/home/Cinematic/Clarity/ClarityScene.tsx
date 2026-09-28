import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ClarityTypography from './ClarityTypography';
import ClarityVisual from './ClarityVisual';

export default function ClarityScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<any>(null);
  const visualRef = useRef<any>(null);

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
            if (typoRef.current?.setProgress) {
              typoRef.current.setProgress(self.progress);
            }
            if (visualRef.current?.setProgress) {
              visualRef.current.setProgress(self.progress);
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden">
        
        {/* Background Visual (Topo/Land) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ClarityVisual ref={visualRef} />
        </div>

        {/* Foreground Typography */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <ClarityTypography ref={typoRef} />
        </div>

      </div>
    </section>
  );
}
