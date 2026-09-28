import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section09FindOwnBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const findY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const ownX = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const buildX = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const growScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-white overflow-hidden flex items-center justify-center min-h-screen">
      
      <div className="w-full max-w-7xl mx-auto px-[5%] flex flex-col items-center justify-center gap-4 md:gap-8 relative z-10">
        
        <motion.div style={{ y: findY }} className="text-4xl md:text-8xl font-light text-[#111] uppercase tracking-widest text-left w-full md:w-3/4">
          Find <span className="text-[#b89a6b]">→</span>
        </motion.div>

        <motion.div style={{ x: ownX }} className="text-4xl md:text-8xl font-light text-[#111] uppercase tracking-widest text-right w-full md:w-3/4">
          Own <span className="text-[#b89a6b]">→</span>
        </motion.div>

        <motion.div style={{ x: buildX }} className="text-4xl md:text-8xl font-light text-[#111] uppercase tracking-widest text-left w-full md:w-3/4">
          Build <span className="text-[#b89a6b]">→</span>
        </motion.div>

        <motion.div style={{ scale: growScale }} className="text-4xl md:text-8xl font-bold text-[#b89a6b] uppercase tracking-widest text-right w-full md:w-3/4">
          Grow
        </motion.div>

      </div>
    </section>
  );
}
