import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionTesting() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 w-full h-[120%]"
        style={{ y: yBg }}
      >
        <div 
          className="w-full h-full bg-[url('/assets/images/testing-bg.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-end justify-between">
        
        {/* Left Typography Block */}
        <motion.div 
          style={{ y: yText }}
          className="w-full md:w-2/3 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">
              Veda Lifespaces
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95] mb-8 text-white"
          >
            We find land<br />
            worth owning.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl font-light space-y-4"
          >
            <p>
              We don't just find land. We find the right opportunity.
            </p>
            <p>
              We study markets, identify land with potential, and develop
              thoughtfully planned plotted communities with clarity,
              quality and long-term value.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Label Block */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          viewport={{ once: true }}
          className="hidden md:flex items-center gap-4 pb-8"
        >
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 font-medium">
            Find the opportunity
          </span>
          <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center relative">
            <span className="text-[10px] font-medium text-white">01</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
