import { forwardRef, useImperativeHandle, useRef } from 'react';

const HeroTypography = forwardRef((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getContainer: () => containerRef.current
  }));

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
      
      {/* TEXT 1: GOOD LAND IS FOUND */}
      <div className="hero-text-1 absolute bottom-[15vh] left-[5vw] md:left-[8vw] max-w-[90vw] md:max-w-[70vw] invisible">
        <h1 className="text-[#F4F1E8] font-light uppercase tracking-tighter leading-[0.9] flex flex-col drop-shadow-2xl">
          <span className="text-[clamp(48px,6vw,120px)] font-bold">GOOD LAND</span>
          <span className="text-[clamp(24px,3vw,50px)] tracking-widest text-[#F4F1E8]/70 mt-2 ml-1">IS FOUND.</span>
        </h1>
      </div>

      {/* TEXT 2: GREAT OPPORTUNITIES ARE CREATED */}
      <div className="hero-text-2 absolute top-[25vh] right-[5vw] md:right-[8vw] text-right max-w-[90vw] md:max-w-[70vw] invisible">
        <h1 className="text-[#F4F1E8] font-light uppercase tracking-tighter leading-[0.9] flex flex-col items-end drop-shadow-2xl">
          <span className="text-[clamp(40px,5vw,90px)] font-bold">GREAT OPPORTUNITIES</span>
          <span className="text-[clamp(24px,3vw,50px)] tracking-widest text-[#F4F1E8]/70 mt-2 mr-1">ARE CREATED.</span>
        </h1>
      </div>

      {/* FINAL LOCKUP */}
      <div className="hero-lockup absolute bottom-[12vh] left-0 right-0 flex flex-col items-center text-center px-[5vw] invisible">
        <h1 className="text-[#F4F1E8] uppercase leading-none flex flex-col items-center drop-shadow-2xl">
          <span className="text-[clamp(20px,3vw,40px)] font-light tracking-[0.2em] mb-4 text-[#F4F1E8]/80">GOOD LAND IS FOUND.</span>
          <span className="text-[clamp(32px,5vw,80px)] font-bold tracking-tighter">GREAT OPPORTUNITIES ARE CREATED.</span>
        </h1>
      </div>

    </div>
  );
});

HeroTypography.displayName = 'HeroTypography';
export default HeroTypography;
