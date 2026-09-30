import { useEffect, useRef } from 'react';
import { HeroInteraction } from './HeroInteraction';

interface Props {
  word: string;
  interaction?: HeroInteraction;
}

export function DistortionTypography({ word, interaction }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!interaction || !containerRef.current) return;
    
    // Register all children with the interaction engine
    const spans = containerRef.current.querySelectorAll('.char');
    spans.forEach((span, i) => {
      const char = span.textContent || '';
      interaction.registerLetter(span as HTMLElement, char);
    });
    
  }, [interaction]);

  return (
    <div ref={containerRef} className="flex relative">
      {word.split('').map((char, index) => (
        <span 
          key={index}
          className={`char inline-block will-change-transform ${char === ' ' ? 'w-[0.3em]' : ''}`}
          style={{ 
            transition: 'opacity 0.3s ease-out', // Keep basic transitions for un-managed state
            opacity: 0 // initial opacity for GSAP intro
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
