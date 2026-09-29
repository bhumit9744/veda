import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section06BeyondSale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const buyX = useTransform(scrollYProgress, [0.3, 0.6], [-100, 0]);
  const buildScale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1]);
  const sellY = useTransform(scrollYProgress, [0.5, 0.8], [100, 0]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#f4f2ef] overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto px-[5%] text-center mb-32">
        <h2 className="text-3xl md:text-5xl text-[#111] font-light uppercase tracking-wide">
          The relationship<br/>
          doesn't end at the sale.
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-[5%] grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
        
        {/* BUY */}
        <motion.div 
          className="relative group h-[50vh] flex items-center justify-center overflow-hidden"
          style={{ x: buyX }}
        >
          <img src="/assets/images/images-1.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all duration-700" alt="" />
          <h3 className="relative z-10 text-6xl md:text-8xl font-bold text-[#111] uppercase tracking-tighter mix-blend-multiply">Buy</h3>
        </motion.div>

        {/* BUILD */}
        <motion.div 
          className="relative group h-[50vh] flex items-center justify-center overflow-hidden"
          style={{ scale: buildScale }}
        >
          <img src="/assets/images/images-2.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all duration-700" alt="" />
          <h3 className="relative z-10 text-6xl md:text-8xl font-bold text-[#111] uppercase tracking-tighter mix-blend-multiply">Build</h3>
        </motion.div>

        {/* SELL */}
        <motion.div 
          className="relative group h-[50vh] flex items-center justify-center overflow-hidden"
          style={{ y: sellY }}
        >
          <img src="/assets/images/img-1.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all duration-700" alt="" />
          <h3 className="relative z-10 text-6xl md:text-8xl font-bold text-[#111] uppercase tracking-tighter mix-blend-multiply">Sell</h3>
        </motion.div>

      </div>
    </section>
  );
}
