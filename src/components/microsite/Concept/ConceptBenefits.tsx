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
    <div className="absolute inset-0 w-full h-full bg-veda-ivory overflow-hidden z-10">
      
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

      {/* INITIAL LARGE TYPOGRAPHY (Behind the image) */}
      <div 
        className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale}) translateY(${textY}px)`
        }}
      >
        <span className="text-xs md:text-sm tracking-[0.4em] text-veda-olive uppercase mb-6 font-medium">
          The Philosophy
        </span>
        <h2 className="text-[14vw] md:text-[10vw] font-editorial text-veda-forest uppercase leading-[0.85] tracking-widest text-center whitespace-nowrap">
          The <span className="italic font-light text-veda-gold">Concept</span>
        </h2>
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
          src="/assets/images/generated/villa_a.jpg" 
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

      {/* INITIAL METADATA (02) */}
      <div 
        className="absolute z-[10] top-[15%] md:top-[15%] right-[5%] md:right-[10%]"
        style={{
          opacity: numOpacity,
          transform: `translateY(${numY}px)`
        }}
      >
        <span className="font-editorial text-6xl md:text-8xl lg:text-[120px] text-veda-gold mix-blend-multiply opacity-60 drop-shadow-sm">
          02
        </span>
      </div>

      {/* REVEALED CONTENT (Fades in after expand) */}
      <div 
        className="absolute inset-0 w-full h-full z-[30] flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-32 gap-8 md:gap-24"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`
        }}
      >
        <div className="w-full md:w-1/2 text-left">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-[1px] bg-veda-gold"></div>
             <span className="text-xs tracking-[0.4em] text-veda-gold uppercase font-medium">
               02 — The Concept
             </span>
          </div>
          <h3 className="font-editorial text-5xl md:text-7xl text-veda-ivory uppercase leading-tight mb-8 drop-shadow-md">
            Design Ready<br/>Villas
          </h3>
          <p className="text-veda-ivory/90 font-light text-base md:text-lg leading-relaxed max-w-lg mb-8 drop-shadow-sm">
            Unlike traditional plotted developments where you start from scratch, Veda offers thoughtfully designed European-inspired villas. You own the land while we bring your dream home to life with curated architecture, efficient planning, and premium execution.
          </p>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-6 backdrop-blur-sm bg-[#050505]/20 p-8 border border-veda-ivory/10 rounded-xl">
          <div className="flex flex-col gap-6">
            {[
              "Design Ready",
              "Hassle-Free Construction",
              "European Architecture",
              "One Trusted Developer"
            ].map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <div className="w-2 h-2 rounded-full bg-veda-gold shadow-[0_0_10px_rgba(181,154,104,0.5)]"></div>
                <span className="text-veda-ivory tracking-[0.15em] uppercase text-sm md:text-base font-medium drop-shadow-md">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
