import React, { useRef } from 'react';
import AboutPlantCanvas from './AboutPlantCanvas';
import AboutOverlay from './AboutOverlay';
import AboutContent from './AboutContent';

export default function AboutScene() {
  const sceneRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sceneRef}
      className="about-scene relative w-full bg-[#06120B]" 
      style={{ height: '500vh' }}
    >
      <div className="about-stage sticky top-0 left-0 w-full h-[100svh] overflow-hidden">
        <AboutPlantCanvas sceneRef={sceneRef} />
        <AboutOverlay />
        <AboutContent sceneRef={sceneRef} />
      </div>
    </section>
  );
}
