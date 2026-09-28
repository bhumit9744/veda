import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section03What() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const textX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const lineScaleX = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const subtextOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const numberY = useTransform(scrollYProgress, [0, 1], ['50%', '-50%']);

  return (
    <section id="approach" ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-white py-32 overflow-hidden flex items-center">
      
      {/* Animated Number */}
      <motion.div 
        className="absolute top-[10%] right-[5%] text-[30vw] md:text-[20rem] font-bold text-white/[0.03] leading-none pointer-events-none"
        style={{ y: numberY }}
      >
        01
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-[5%] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <motion.div 
          className="relative z-10 flex flex-col"
          style={{ x: textX }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight uppercase leading-[1.1] mb-12">
            We find land<br/>
            <span className="text-[#b89a6b] font-medium">worth owning.</span>
          </h2>
          
          <motion.div 
            className="w-full h-[1px] bg-white/20 origin-left mb-12"
            style={{ scaleX: lineScaleX }}
          />

          <motion.div style={{ opacity: subtextOpacity }} className="text-lg md:text-xl font-light text-white/70 max-w-md leading-relaxed">
            We don't just find land.<br/>
            <span className="text-white font-medium">We find the right opportunity.</span>
          </motion.div>
        </motion.div>

        {/* Image Side */}
        <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <motion.img 
            src="/assets/images/new-images/our-foundation-new.jpeg"
            alt="Land Discovery"
            className="absolute inset-0 w-full h-[130%] object-cover object-center filter grayscale contrast-125"
            style={{ top: imageY }}
          />
        </div>

      </div>
    </section>
  );
}
