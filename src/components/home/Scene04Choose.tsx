import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Scene04Choose() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parcels appearing and fading
  const parcel1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0]);
  const parcel2Opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, 1, 1, 0]);
  const parcel3Opacity = useTransform(scrollYProgress, [0.2, 0.4, 1, 1], [0, 1, 1, 1]); // This one stays
  
  const selectedScale = useTransform(scrollYProgress, [0.4, 0.8], [1, 1.1]);
  const selectedBorder = useTransform(scrollYProgress, [0.6, 0.8], ['rgba(184,154,107,0)', 'rgba(184,154,107,1)']);

  const textOpacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.7, 0.85], ['30px', '0px']);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background continuing from previous scene */}
        <div className="absolute inset-0 opacity-30">
          <img src="/assets/images/images-1-big.jpg" className="w-full h-full object-cover" alt="" />
        </div>

        {/* Parcels */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video">
            {/* Parcel 1 */}
            <motion.div 
              className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-white/5 border border-white/20 backdrop-blur-sm"
              style={{ opacity: parcel1Opacity }}
            />
            {/* Parcel 2 */}
            <motion.div 
              className="absolute bottom-[10%] right-[20%] w-[25%] h-[35%] bg-white/5 border border-white/20 backdrop-blur-sm"
              style={{ opacity: parcel2Opacity }}
            />
            {/* Parcel 3 (The chosen one) */}
            <motion.div 
              className="absolute top-[30%] left-[40%] w-[35%] h-[50%] bg-white/10 backdrop-blur-sm flex items-center justify-center"
              style={{ opacity: parcel3Opacity, scale: selectedScale, borderColor: selectedBorder, borderWidth: 2 }}
            >
              <motion.span 
                className="text-[#b89a6b] tracking-[0.3em] text-sm uppercase"
                style={{ opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]) }}
              >
                Parcel A-1
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Typography */}
        <motion.div 
          className="relative z-10 w-full px-[5%] max-w-[1400px] mx-auto flex flex-col justify-start pt-32 h-full pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="text-[#fdfdfd] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none uppercase">
            Choose
          </h2>
          <h2 className="text-[#b89a6b] text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none uppercase ml-12 md:ml-32 mt-2">
            The Land.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
