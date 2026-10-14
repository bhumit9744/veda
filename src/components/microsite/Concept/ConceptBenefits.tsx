import { useMemo, useState, useEffect } from 'react';

interface ConceptBenefitsProps {
  progress: number;
}

export default function ConceptBenefits({ progress }: ConceptBenefitsProps) {
  // Global active between 0.09 and 0.16 (approx 0.10 to 0.15)
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.10) / 0.05));
  }, [progress]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = progress >= 0.09 && progress <= 0.16;
  if (!isActive) return null;

  // Timeline:
  // 0.0 -> 0.15: Enter (small image inside text)
  // 0.15 -> 0.35: Expand (image grows, text fades out)
  // 0.35 -> 0.50: Reveal new copy
  // 0.50 -> 0.90: Hold
  // 0.90 -> 1.00: Exit

  const enterP = Math.min(1, Math.max(0, localProgress / 0.15));
  const expandP = Math.min(1, Math.max(0, (localProgress - 0.15) / 0.20));
  const revealP = Math.min(1, Math.max(0, (localProgress - 0.35) / 0.15));
  const exitP = Math.min(1, Math.max(0, (localProgress - 0.90) / 0.10));

  // Determine Inset Mask for the Image
  const baseInsetY = isMobile ? 30 : 35; // %
  const baseInsetX = isMobile ? 10 : 35; // %
  
  // As expandP goes 0 -> 1, the inset approaches 0 to fill the viewport
  const currentInsetY = baseInsetY * (1 - expandP);
  const currentInsetX = baseInsetX * (1 - expandP);
  
  // Border radius goes from 26px to 0
  const currentRound = 26 * (1 - Math.min(1, expandP * 1.5)); 
  const clipPath = `inset(${currentInsetY}% ${currentInsetX}% ${currentInsetY}% ${currentInsetX}% round ${currentRound}px)`;

  // Image Layer
  const imageOpacity = enterP < 0.5 ? (enterP * 2) : 1;
  const exitOpacity = 1 - exitP;
  const exitScale = 1 + (exitP * 0.05);

  const imgScale = (1.1 - (enterP * 0.1) + (expandP * 0.05)) * exitScale; 
  const imgY = expandP * -2; // move up 2%

  // Initial Large Typography
  const textOpacity = enterP < 1 ? enterP : Math.max(0, 1 - (expandP * 2));
  const textY = (1 - enterP) * 40 - (expandP * 60);
  const textScale = 0.95 + (enterP * 0.05) + (expandP * 0.1);

  const numOpacity = enterP < 0.5 ? 0 : Math.max(0, (enterP - 0.5) * 2 - (expandP * 3));
  const numY = (1 - enterP) * 30 - (expandP * 40);

  // New Content Reveal
  const contentOpacity = revealP * (1 - exitP);
  const contentY = (1 - revealP) * 30 - (exitP * 30);

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent overflow-hidden z-10">
      
      {/* BACKGROUND GRID (Subtle architectural feel) */}
      <div 
        className="absolute inset-0 z-0 mix-blend-multiply transition-opacity duration-1000" 
        style={{
          opacity: (1 - expandP) * 0.4,
          backgroundImage: 'linear-gradient(rgba(24,35,29,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(24,35,29,0.06) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          backgroundPosition: 'center center'
        }}
      />

      {/* INITIAL LARGE TYPOGRAPHY (Over the image) */}
      <div 
        className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale}) translateY(${textY}px)`
        }}
      >
        <div className="relative flex flex-col items-center justify-center">
          <span className="absolute bottom-full mb-6 text-xs md:text-sm tracking-[0.4em] text-veda-olive uppercase font-medium drop-shadow-sm whitespace-nowrap">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-editorial text-veda-forest leading-tight tracking-wide text-center px-4 drop-shadow-sm">
            A European Way of Life
          </h2>
        </div>
      </div>

      {/* FULL SCREEN IMAGE LAYER (z-[5]) with clip-path mask */}
      <div 
        className="absolute inset-0 w-full h-full z-[5] shadow-2xl"
        style={{
          clipPath,
          WebkitClipPath: clipPath,
          opacity: imageOpacity * exitOpacity,
        }}
      >
        <img 
          src="/assets/images/Symmetrical 3×3 Greenfield Subdivision.png" 
          alt="Design Ready Villas"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `scale(${imgScale}) translateY(${imgY}%)`,
            transition: 'none' 
          }}
        />
        {/* Dark overlay that fades in as content reveals to make text readable */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#050505]/60 pointer-events-none"
          style={{ opacity: revealP }}
        />
      </div>



      {/* REVEALED CONTENT (Fades in after expand) */}
      <div 
        className="absolute inset-0 w-full h-full z-[30] flex items-center justify-center px-6 md:px-16 lg:px-32"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`
        }}
      >
        <div className="max-w-4xl text-center">
          <p className="text-veda-ivory font-light text-[15px] md:text-[17px] lg:text-xl leading-relaxed drop-shadow-md mb-2">
            A plot gives you ownership. A considered design gives it direction.
          </p>
          <p className="text-veda-ivory font-light text-[15px] md:text-[17px] lg:text-xl leading-relaxed drop-shadow-md">
            Choose your land. Choose your villa design. And bring it to life through a streamlined construction journey, thoughtfully managed from beginning to end.
          </p>
        </div>
      </div>

    </div>
  );
}
