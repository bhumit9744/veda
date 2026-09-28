import React from 'react';
import './atmosphere.css';
import LeafCanvas from './LeafCanvas';

interface GreenAtmosphereProps {
  density?: 'low' | 'medium' | 'high';
  intensity?: 'subtle' | 'normal' | 'strong';
}

export default function GreenAtmosphere({ 
  density = 'medium', 
  intensity = 'normal' 
}: GreenAtmosphereProps) {
  
  // Depending on intensity, we could tweak CSS variables or classes,
  // but for now we'll stick to the core veda-atmosphere-bg styling.
  // The density prop could eventually be passed down to LeafCanvas to adjust maxLeaves.

  return (
    <div className="fixed inset-0 w-full h-[100svh] pointer-events-none z-0">
      {/* 1. Deep forest green base with atmospheric light */}
      <div className="absolute inset-0 w-full h-full veda-atmosphere-bg" />
      
      {/* 2. Optional extremely subtle grain */}
      <div className="veda-atmosphere-grain" />
      
      {/* 3. Lightweight 2D Leaf Physics Layer */}
      <LeafCanvas />
    </div>
  );
}
