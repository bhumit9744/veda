import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section10BeyondLiving() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <section id="beyond-living" ref={containerRef} className="relative w-full min-h-[120vh] bg-[#050505] overflow-hidden flex flex-col justify-center items-center py-32">
      
      {/* Background with grain/texture */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-lighten"
        style={{ y: imageY }}
      >
        <img src="/assets/images/banner-midd.jpg" alt="Atmosphere" className="w-full h-[120%] object-cover contrast-150 blur-[2px]" />
        <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-20 pointer-events-none"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-[5%] text-center">
        
        <h2 className="text-6xl md:text-[10rem] font-bold text-white uppercase tracking-tighter leading-none mb-24 opacity-90 mix-blend-overlay">
          Beyond<br/>Living.
        </h2>

        <motion.div 
          className="text-xl md:text-3xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="mb-8">Land is more than an asset.</p>
          <p>
            It is where futures are planned,<br/>
            wealth is created,<br/>
            legacies are built,<br/>
            and possibilities take shape.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
