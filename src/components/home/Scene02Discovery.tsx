import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Scene02Discovery() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Camera continues to zoom in
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Topographic lines reveal
  const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Text movement
  const textY = useTransform(scrollYProgress, [0.3, 1], ['20%', '-20%']);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#111]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Continued Landscape Image */}
        <motion.div 
          className="absolute inset-0 origin-center"
          style={{ scale, y }}
        >
          <img 
            src="/assets/images/foundation-img.jpg" 
            alt="Land Discovery" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Topographic Lines Overlay (SVG) */}
          <motion.svg 
            className="absolute inset-0 w-full h-full text-white/20 pointer-events-none"
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ opacity }}
          >
            <motion.path 
              d="M0,50 Q25,30 50,50 T100,50 M0,70 Q25,50 50,70 T100,70 M0,30 Q25,10 50,30 T100,30" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.2"
              style={{ pathLength }}
            />
          </motion.svg>
        </motion.div>

        {/* Huge Typography */}
        <motion.div 
          className="relative z-10 w-full px-[5%] max-w-[1400px] mx-auto flex flex-col justify-center h-full pointer-events-none"
          style={{ y: textY, opacity: textOpacity }}
        >
          <h2 className="text-[#fdfdfd] text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-2 uppercase">
            We find land
          </h2>
          <div className="relative">
            <h1 className="text-[#b89a6b] text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tighter leading-none mix-blend-overlay">
              WORTH
            </h1>
            <h1 className="text-white text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tighter leading-none absolute top-0 left-4 mix-blend-plus-lighter opacity-70">
              OWNING.
            </h1>
          </div>
        </motion.div>
        
        {/* Gradient Transition at bottom */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none"></div>

      </div>
    </div>
  );
}
