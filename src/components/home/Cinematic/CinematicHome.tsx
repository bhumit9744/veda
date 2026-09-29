import { useRef } from 'react';
import MasterScrollController from './MasterScrollController';
import HeroScene from './Hero/HeroScene';
import OpportunityScene from './Opportunity/OpportunityScene';
import ClarityScene from './Clarity/ClarityScene';
import LandScene from './Land/LandScene';
import DNADevelopmentScene from './Developments/DNADevelopmentScene';

export default function CinematicHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full bg-[#050505] text-white">
      <MasterScrollController />
      <HeroScene />
    </div>
  );
}
