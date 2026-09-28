import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section01Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* Background Video with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/images/completed-video.mp4" type="video/mp4" />
        </video>
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply pointer-events-none"></div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 w-full px-[5%] md:px-[10%] flex flex-col items-start mt-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/80 tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-8"
        >
          Veda Lifespaces
        </motion.div>

        <div className="flex flex-col text-[#F4F1E8] text-[clamp(42px,7vw,100px)] font-semibold leading-[1.1] tracking-[-0.03em] uppercase">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Good Land Is Found.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#e3dac9] ml-0 md:ml-12"
          >
            Great Opportunities
          </motion.div>

          <div className="flex items-center gap-6 ml-0 md:ml-24">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Are Created.
            </motion.div>

            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="hidden md:block text-white/50 text-[10px] md:text-xs tracking-[0.2em] font-normal lowercase"
            >
              from land to possibility.
            </motion.span>
          </div>

        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12 w-full justify-between">
          
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="text-[#F4F1E8] font-serif italic text-3xl md:text-5xl tracking-wider"
          >
            Beyond Living.
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="pb-2 md:pb-4 pointer-events-auto"
          >
            <a 
              href="#developments"
              className="group flex items-center gap-4 text-white hover:text-[#d4c9b3] transition-colors"
            >
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-medium">Explore Developments</span>
              <span className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-500 relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:translate-x-2 text-[10px]">↗</span>
              </span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
