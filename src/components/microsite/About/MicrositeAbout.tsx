import { useMemo, useEffect, useState } from 'react';
import AboutStory from './AboutStory';
import { aboutContent } from '../../../content/aboutContent';

interface MicrositeAboutProps {
  progress: number;
}

export default function MicrositeAbout({ progress }: MicrositeAboutProps) {
  // Global active between 0.50 and 0.75
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.50) / 0.25));
  }, [progress]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = progress >= 0.49 && progress <= 0.76;
  if (!isActive) return null;

  // Timeline within About (0 to 1):
  // 0.0 - 0.2: Intro ("BEYOND LIVING.")
  // 0.2 - 0.8: Story chapters (Vision, Discipline, Authenticity)
  // 0.8 - 1.0: Final statement

  const introActive = localProgress < 0.25;
  const introProgress = Math.min(1, Math.max(0, localProgress / 0.2));

  const storyActive = localProgress >= 0.15 && localProgress <= 0.85;
  const storyProgress = Math.min(1, Math.max(0, (localProgress - 0.2) / 0.6));

  const outroActive = localProgress > 0.75;
  const outroProgress = Math.min(1, Math.max(0, (localProgress - 0.8) / 0.2));

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-veda-ivory">
      
      {/* Background Image that persists through the About section, darkening slightly */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('/assets/images/generated/villa_a.jpg')",
          opacity: localProgress > 0.05 && localProgress < 0.9 ? 0.2 : 0,
          filter: `blur(${localProgress > 0.5 ? 10 : 0}px)`
        }}
      />
      <div className="absolute inset-0 bg-veda-ivory/30 pointer-events-none" style={{ opacity: localProgress > 0.05 && localProgress < 0.9 ? 1 : 0 }} />

      {/* Intro */}
      {introActive && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{
            opacity: introProgress < 0.2 ? introProgress / 0.2 : introProgress > 0.8 ? 1 - ((introProgress - 0.8) / 0.2) : 1,
            transform: `scale(${0.95 + (introProgress * 0.1)})`
          }}
        >
          <span className="text-xs md:text-sm tracking-[0.4em] text-veda-olive uppercase mb-8 font-medium">
            {aboutContent.eyebrow}
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-editorial text-veda-forest uppercase leading-tight tracking-widest drop-shadow-sm max-w-6xl mx-auto">
            {aboutContent.title}
          </h2>
        </div>
      )}

      {/* Story Chapters */}
      {storyActive && (
        <AboutStory progress={storyProgress} isMobile={isMobile} />
      )}

      {/* Outro */}
      {outroActive && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-veda-ivory"
          style={{
            opacity: outroProgress < 0.2 ? outroProgress / 0.2 : 1,
            transform: `scale(${1 + ((outroProgress - 0.5) * 0.1)})`
          }}
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-editorial text-veda-forest uppercase leading-tight tracking-widest max-w-4xl mb-12 drop-shadow-sm">
            "With Veda Life Spaces, land becomes more than an asset."
          </h3>
          <p className="text-veda-text-secondary tracking-[0.3em] text-sm uppercase">
            A foundation for legacy
          </p>
        </div>
      )}

    </div>
  );
}
