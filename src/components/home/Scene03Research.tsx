import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Scene03Research() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Sequential revealing of elements
  const mapOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const markersOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const linesOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.45, 0.6], ['30px', '0px']);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Map / Terrain Base */}
        <motion.div 
          className="absolute inset-0 origin-center"
          style={{ opacity: mapOpacity }}
        >
          <img 
            src="/assets/images/images-1-big.jpg" 
            alt="Terrain Map" 
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>

        {/* Annotations / Lines */}
        <motion.div className="absolute inset-0" style={{ opacity: linesOpacity }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#b89a6b" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="#b89a6b" strokeWidth="1" strokeDasharray="5,5" />
            <circle cx="40%" cy="50%" r="4" fill="#b89a6b" />
          </svg>
        </motion.div>

        {/* Location Markers */}
        <motion.div className="absolute inset-0" style={{ opacity: markersOpacity }}>
           <div className="absolute top-[20%] left-[10%] text-[#b89a6b] text-xs tracking-widest uppercase">Elevation 120m</div>
           <div className="absolute top-[52%] left-[42%] text-[#b89a6b] text-xs tracking-widest uppercase">Zone A Connectivity</div>
           <div className="absolute top-[28%] left-[82%] text-[#b89a6b] text-xs tracking-widest uppercase">Water Table</div>
        </motion.div>

        {/* Typography */}
        <motion.div 
          className="relative z-10 w-full px-[5%] max-w-[1400px] mx-auto flex flex-col justify-end pb-32 h-full pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="text-[#fdfdfd] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none uppercase">
            Research
          </h2>
          <h2 className="text-[#b89a6b] text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none uppercase ml-12 md:ml-32 mt-2">
            The Market.
          </h2>
        </motion.div>
        
      </div>
    </div>
  );
}
