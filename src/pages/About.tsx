import React from 'react';
import PlantSequence from '../components/cinematic/PlantSequence';

export default function About() {
  return (
    <div className="relative w-full min-h-screen bg-[#F5F1E8] overflow-hidden">
      {/* 
        =================================================
        PLANT CINEMATIC FRAME SEQUENCE (ANIMATION ONLY)
        =================================================
      */}
      <PlantSequence />
    </div>
  );
}
