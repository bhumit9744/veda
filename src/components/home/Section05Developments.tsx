import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../MagneticButton';

export default function Section05Developments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const textY = useTransform(scrollYProgress, [0.2, 0.8], [50, -50]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto px-[5%] mb-20">
        <h5 className="text-[#b89a6b] tracking-[0.2em] uppercase text-sm mb-4">Our Developments</h5>
      </div>

      {/* Large Project Showcase */}
      <div className="relative w-[90%] md:w-[80%] mx-auto h-[70vh] md:h-[85vh] group">
        
        {/* Parallax Image */}
        <div className="w-full h-full overflow-hidden">
          <motion.img 
            src="/assets/images/bellagio/img12.jpg" 
            alt="Codename Bellagio"
            className="w-[110%] h-[110%] object-cover transition-transform duration-1000 group-hover:scale-105"
            style={{ x: imageX }}
          />
        </div>

        {/* Floating Information */}
        <motion.div 
          className="absolute bottom-0 left-0 md:-left-12 bg-white p-8 md:p-12 shadow-2xl max-w-md"
          style={{ y: textY }}
        >
          <h2 className="text-3xl md:text-5xl font-light text-[#111] uppercase tracking-tighter mb-4">
            Codename<br/>
            <span className="font-bold">Bellagio</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#555] uppercase tracking-widest mb-8">
            <span className="w-4 h-[1px] bg-[#b89a6b]"></span>
            Alibaug
          </div>

          <MagneticButton className="group bg-[#111] text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#b89a6b] transition-colors duration-500">
            Explore Development
            <motion.span className="inline-block ml-4 transition-transform duration-500 group-hover:translate-x-2">→</motion.span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
