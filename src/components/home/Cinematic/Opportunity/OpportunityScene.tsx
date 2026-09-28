import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import OpportunityTypography from './OpportunityTypography';

export default function OpportunityScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<any>(null);

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
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background atmospheric texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(50,50,50,0.5) 0%, rgba(5,5,5,1) 70%)' }}>
        </div>
        <OpportunityTypography ref={typoRef} />
      </div>
    </section>
  );
}
