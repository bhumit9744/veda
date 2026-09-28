import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section07Difference() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const phrase1X = useTransform(scrollYProgress, [0.1, 0.4], [-200, 0]);
  const phrase2Rot = useTransform(scrollYProgress, [0.2, 0.5], [10, 0]);
  const phrase3Scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  const phrase4Blur = useTransform(scrollYProgress, [0.4, 0.7], [20, 0]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#f4f2ef] overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto px-[5%] mb-20 text-center">
        <h2 className="text-5xl md:text-8xl text-[#b89a6b] font-bold uppercase tracking-tighter mix-blend-multiply">
          The Veda<br/>Difference
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-[5%] flex flex-col gap-12 md:gap-24 relative z-10 py-20">
        
        <motion.div 
          className="text-3xl md:text-6xl font-light text-[#111] uppercase tracking-wide self-start"
          style={{ x: phrase1X }}
        >
          Market Research
        </motion.div>

        <motion.div 
          className="text-3xl md:text-6xl font-light text-[#111] uppercase tracking-wide self-end text-right origin-right"
          style={{ rotateZ: phrase2Rot }}
        >
          Legal Diligence
        </motion.div>

        <motion.div 
          className="text-3xl md:text-6xl font-light text-[#111] uppercase tracking-wide self-center text-center"
          style={{ scale: phrase3Scale }}
        >
          Future-Growth Evaluation
        </motion.div>

        <motion.div 
          className="text-3xl md:text-6xl font-light text-[#111] uppercase tracking-wide self-start"
          style={{ filter: useTransform(phrase4Blur, v => `blur(${v}px)`) }}
        >
          Thoughtful Development
        </motion.div>

      </div>
    </section>
  );
}
