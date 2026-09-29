import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutHero from './AboutHero';
import AboutApproach from './AboutApproach';
import AboutClarity from './AboutClarity';
import AboutAlibaug from './AboutAlibaug';
import AboutDifference from './AboutDifference';
import AboutTransition from './AboutTransition';

gsap.registerPlugin(ScrollTrigger);

export default function AboutScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global background shifts if necessary
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030604] text-[#F4F1E8] font-sans overflow-x-hidden">
      {/* Fixed Background Environment */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030604]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,45,28,0.4)_0%,rgba(3,6,4,1)_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <AboutHero />
        <AboutApproach />
        <AboutClarity />
        <AboutAlibaug />
        <AboutDifference />
        <AboutTransition />
      </div>
    </div>
  );
}
