import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Camera effect: Zoom and descent
  // Simulated by scaling and translating the background image container
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1.06, 1.12, 1.18, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  // Text Parallax: Typography moves slower than the background
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Sequential secondary text visibility
  const sec1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);
  const sec2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const sec3Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]);
  const beyondOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-black">
      {/* Sticky container that remains in viewport while scrolling through the 250vh */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Layer 2: Landscape / Background */}
        <motion.div 
          className="absolute inset-0 origin-center"
          style={{ scale, y: bgY }}
        >
          {/* Image fallback since the original mp4s appear to be 132-byte git LFS pointers or corrupted */}
          <img 
            src="/assets/images/aboutus-banner-new.png" 
            alt="Veda Life Spaces" 
            className="w-full h-full object-cover"
          />
          
          {/* Layer 1: Sky/Atmosphere overlay for cinematic contrast and text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none"></div>
          {/* Subtle grain/texture overlay using inline SVG */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        </motion.div>

        {/* Layer 6: Typography */}
        <motion.div 
          className="relative z-10 w-full px-[5%] max-w-[1400px] mx-auto flex flex-col justify-center h-full pointer-events-none"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className="overflow-hidden mb-2 md:mb-4">
            <motion.h1 
              className="text-[#fdfdfd] text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-light tracking-[-0.02em] leading-[1.05]"
              initial={{ clipPath: 'inset(100% 0 0 0)', y: 60 }}
              animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              GOOD LAND IS<br/>FOUND.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              className="text-[#b89a6b] text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] font-normal tracking-wide leading-[1.05]"
              initial={{ clipPath: 'inset(100% 0 0 0)', y: 60 }}
              animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              GREAT OPPORTUNITIES<br/>ARE CREATED.
            </motion.h2>
          </div>
        </motion.div>

        {/* Layer 6.5: Sequential Secondary Text */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-end px-[5%] max-w-[1400px] mx-auto">
          <div className="relative h-20 w-64 md:w-80 flex items-center justify-end text-right">
            <motion.p style={{ opacity: sec1Opacity }} className="absolute text-white/90 text-xs md:text-sm uppercase tracking-widest font-medium w-full">
              Thoughtful in what we choose.
            </motion.p>
            <motion.p style={{ opacity: sec2Opacity }} className="absolute text-white/90 text-xs md:text-sm uppercase tracking-widest font-medium w-full">
              Meticulous in how we work.
            </motion.p>
            <motion.p style={{ opacity: sec3Opacity }} className="absolute text-white/90 text-xs md:text-sm uppercase tracking-widest font-medium w-full">
              Committed to what comes next.
            </motion.p>
            <motion.p style={{ opacity: beyondOpacity }} className="absolute text-[#b89a6b] text-lg md:text-2xl font-light tracking-wide w-full">
              Beyond Living.
            </motion.p>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="absolute bottom-10 left-[5%] max-w-[1400px] w-[90%] mx-auto z-30 pointer-events-auto flex flex-col items-start gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              data-cursor="EXPLORE"
              className="group relative overflow-hidden bg-transparent border border-white/40 text-white px-8 py-3.5 uppercase text-xs md:text-sm tracking-[0.2em] font-medium transition-all hover:border-white"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                Explore Veda
              </span>
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-[5%] z-30 pointer-events-none flex flex-col items-center gap-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-white/70 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
              <motion.div 
                className="w-full h-full bg-white absolute top-0"
                animate={{ y: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
            <span className="text-white/70 text-[9px] tracking-[0.2em]">01</span>
          </motion.div>
        </div>

        {/* Layer 7: Exit Boundary to seamlessly transition to Land Discovery */}
        {/* We fade in a block at the bottom corresponding to the color of the next section bg-bg-beige (#fcfbf9) */}
        <motion.div 
          className="absolute bottom-0 w-full h-32 md:h-48 z-10 pointer-events-none"
          style={{ 
            background: "linear-gradient(to top, #f4f2ef 0%, transparent 100%)",
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) 
          }}
        />

      </div>
    </div>
  );
}
