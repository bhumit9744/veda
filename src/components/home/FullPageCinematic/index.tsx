import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeafFrameCanvas from './LeafFrameCanvas';
import ContentTimeline from './ContentTimeline';
import EditorialImageLayer from './EditorialImageLayer';

gsap.registerPlugin(ScrollTrigger);

export default function FullPageCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);
  const [masterProgress, setMasterProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
          onUpdate: (self) => {
            const p = self.progress;
            setMasterProgress(p);
            if (canvasRef.current?.setProgress) {
              canvasRef.current.setProgress(p);
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[750vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-black flex items-center justify-center">
        
        <LeafFrameCanvas ref={canvasRef} />

        {/* Subtle gradient overlay to ensure text readability without hiding the leaf */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        <EditorialImageLayer masterProgress={masterProgress} />
        
        <ContentTimeline masterProgress={masterProgress} />
        
      </div>
    </section>
  );
}
