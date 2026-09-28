import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section02Who() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const line1Y = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const line2X = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);
  const line2Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const line3X = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const line3Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const beyondScale = useTransform(scrollYProgress, [0.4, 0.8], [0.8, 1.2]);
  const beyondOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section id="about" ref={containerRef} className="relative w-full min-h-[150vh] bg-[#f4f2ef] flex items-center justify-center overflow-hidden py-32 px-[5%]">
      
      {/* Background Image Parallax */}
      <motion.div 
        className="absolute right-0 top-[20%] w-[60%] md:w-[40%] h-[70vh] opacity-40 mix-blend-multiply filter grayscale"
        style={{ y: imageY }}
      >
        <img src="/assets/images/images-1-big.jpg" alt="Veda Background" className="w-full h-full object-cover" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center gap-12 md:gap-24">
        
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl text-[#111] font-light tracking-tight uppercase"
          style={{ y: line1Y, opacity: line1Opacity }}
        >
          Thoughtful in what we choose.
        </motion.h2>

        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl text-[#111] font-light tracking-tight uppercase md:ml-24"
          style={{ x: line2X, opacity: line2Opacity }}
        >
          Meticulous in how we work.
        </motion.h2>

        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl text-[#111] font-light tracking-tight uppercase self-end text-right md:mr-12"
          style={{ x: line3X, opacity: line3Opacity }}
        >
          Committed to what comes next.
        </motion.h2>

        <div className="mt-32 w-full flex justify-center">
          <motion.h1 
            className="text-[12vw] md:text-[8rem] font-bold text-[#b89a6b] tracking-tighter uppercase leading-none mix-blend-multiply"
            style={{ scale: beyondScale, opacity: beyondOpacity }}
          >
            Beyond Living.
          </motion.h1>
        </div>

      </div>
    </section>
  );
}
