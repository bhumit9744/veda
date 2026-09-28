import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section08Investment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] bg-[#050505] overflow-hidden flex items-center">
      
      {/* Background Image Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-50 grayscale contrast-125"
        style={{ y: imageY }}
      >
        <img src="/assets/images/new-images/our-purpose-new-image.jpeg" alt="Landscape" className="w-full h-[130%] object-cover object-bottom" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-[5%] flex flex-col justify-center">
        
        <h2 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tight leading-[1.1] mb-12 max-w-4xl">
          Land remains<br/>
          one of the most<br/>
          <span className="text-[#b89a6b] font-medium">timeless assets.</span>
        </h2>

        {/* Animated timeline line */}
        <div className="w-full max-w-2xl mt-12 relative">
          <motion.div 
            className="h-[1px] bg-[#b89a6b] origin-left"
            style={{ scaleX: lineScaleX }}
          />
          <div className="flex justify-between mt-4 text-xs tracking-widest text-white/50 uppercase">
            <span>Acquisition</span>
            <span>Appreciation</span>
            <span>Legacy</span>
          </div>
        </div>

      </div>
    </section>
  );
}
