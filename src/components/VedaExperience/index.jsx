import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useVedaStore } from './store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import VedaScene from './VedaScene';
import ContentOverlay from './ContentOverlay';

gsap.registerPlugin(ScrollTrigger);

export default function VedaExperience() {
  const containerRef = useRef(null);
  const setScrollProgress = useVedaStore((state) => state.setScrollProgress);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full bg-veda-base text-veda-text font-body selection:bg-veda-accent selection:text-white">
      {/* Fixed R3F Canvas */}
      <div className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
          <VedaScene />
        </Canvas>
      </div>

      {/* Scrolling HTML Content */}
      <div className="relative z-10 w-full">
        <ContentOverlay />
      </div>
    </div>
  );
}
