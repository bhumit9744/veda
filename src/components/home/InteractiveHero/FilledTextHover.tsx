import React, { useState, useEffect } from 'react';
import { vedaContent } from '../../../content/vedaContent';

export default function FilledTextHover({ scrollProgress }: { scrollProgress: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax and scale calculations based on scrollProgress (0 to 1)
  const imageParallaxY = scrollProgress * -20;
  const imageScale = 1 + scrollProgress * 0.03;
  const opacity = scrollProgress > 0.8 ? Math.max(0, 1 - (scrollProgress - 0.8) / 0.2) : 1;

  return (
    <div 
      className="relative w-full max-w-[1580px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 pt-20 md:pt-24 pb-8 z-50 pointer-events-auto cursor-default select-none font-codec flex items-center justify-center min-h-[calc(100vh-5rem)]"
      style={{
        opacity,
        transform: `translateY(${scrollProgress * -15}px)`,
        transition: 'opacity 0.4s ease-out, transform 0.1s ease-out'
      }}
    >
      {/* 57/43 Grid for an enlarged, dominant image presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-[57%_43%] items-center gap-8 lg:gap-10 xl:gap-14 w-full">
        
        {/* LEFT COLUMN: ENLARGED CRISP RECTANGULAR IMAGE */}
        <div className="relative w-full flex items-center justify-center order-2 lg:order-1">
          <div 
            className={`relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[590px] 2xl:h-[630px] max-h-[68vh] overflow-hidden rounded-sm shadow-2xl border border-neutral-200/90 transition-all duration-1000 ease-out group ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              transform: mounted 
                ? `translateY(${imageParallaxY}px) scale(${imageScale})` 
                : 'translateY(24px) scale(0.95)',
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out'
            }}
          >
            <img 
              src="/assets/images/Golden Hour Villa Street Without Tree.png" 
              alt="Veda Plotted Development - Golden Hour Villa Street" 
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" 
              loading="eager"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: REFINED TYPOGRAPHY (NEVER CLIPPED) */}
        <div className="flex flex-col items-start text-left w-full pl-0 lg:pl-3 xl:pl-6 pr-2 sm:pr-4 order-1 lg:order-2">
          {/* Headline - Exactly 2 lines in Codec font, sized to fit comfortably */}
          <h2 className="font-codec font-normal text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] tracking-[0.03em] sm:tracking-[0.05em] text-veda-forest uppercase leading-[1.32] text-left select-none">
            <span className="block whitespace-nowrap">
              WE BELIEVE GOOD LAND IS FOUND.
            </span>
            <span className="block whitespace-nowrap mt-1 sm:mt-1.5">
              GREAT OPPORTUNITIES ARE CREATED.
            </span>
          </h2>

          {/* Body Copy - Increased by 3px */}
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-base lg:text-[17.5px] text-neutral-600 leading-[1.75] font-light font-codec text-left max-w-lg">
            {vedaContent.hero.body}
          </p>
        </div>

      </div>
    </div>
  );
}
