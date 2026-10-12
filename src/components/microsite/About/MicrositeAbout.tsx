import { useMemo, useEffect, useState } from 'react';
import AboutStory from './AboutStory';
import { aboutContent } from '../../../content/aboutContent';

interface MicrositeAboutProps {
  progress: number;
}

export default function MicrositeAbout({ progress }: MicrositeAboutProps) {
  // Global active between 0.77 and 0.91 (adjusted to match phase 5)
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.77) / 0.14));
  }, [progress]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = progress >= 0.76 && progress <= 0.92;
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
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-transparent">
      
      {/* Background Image that persists through the About section, darkening slightly */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('/assets/images/generated/villa_a.jpg')",
          opacity: localProgress > 0.05 && localProgress < 0.9 ? 0.2 : 0,
          filter: `blur(${localProgress > 0.5 ? 10 : 0}px)`
        }}
      />
      <div className="absolute inset-0 bg-transparent/30 pointer-events-none" style={{ opacity: localProgress > 0.05 && localProgress < 0.9 ? 1 : 0 }} />

      {/* Story Chapter */}
      <AboutStory progress={localProgress} isMobile={isMobile} />

    </div>
  );
}
