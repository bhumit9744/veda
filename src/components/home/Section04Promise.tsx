import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section04Promise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const blurValue = useTransform(scrollYProgress, [0.3, 0.6], [20, 0]);
  const clarityScale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1]);
  const clarityOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const words = ['Title', 'Legal', 'Location', 'Connectivity', 'Planning', 'Development'];
  
  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#f4f2ef] overflow-hidden flex flex-col justify-center py-32">
      
      <div className="w-full max-w-7xl mx-auto px-[5%] relative z-20 mb-32">
        <h2 className="text-4xl md:text-5xl text-[#111] font-light uppercase tracking-wide">
          We find the opportunity.
        </h2>
        <h2 className="text-4xl md:text-5xl text-[#111] font-light uppercase tracking-wide">
          We give you the <span className="text-transparent">clarity.</span>
        </h2>
      </div>

      <div className="relative w-full h-screen flex items-center justify-center">
        
        {/* Split Screen / Full Screen Image with Blur Transition */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ filter: useTransform(blurValue, v => `blur(${v}px)`) }}
        >
          <img 
            src="/assets/images/our-promise-new-img.jpeg" 
            alt="Clarity" 
            className="w-full h-full object-cover filter brightness-75 grayscale contrast-125"
          />
        </motion.div>

        {/* Enormous "CLARITY" */}
        <motion.h1 
          className="relative z-10 text-[18vw] font-bold text-white uppercase tracking-tighter leading-none mix-blend-overlay"
          style={{ scale: clarityScale, opacity: clarityOpacity }}
        >
          Clarity
        </motion.h1>

        {/* Floating Words */}
        {words.map((word, i) => {
          const y = useTransform(scrollYProgress, [0.5, 0.8], [100 + i * 20, -50 - i * 10]);
          const opacity = useTransform(scrollYProgress, [0.5 + i * 0.05, 0.7 + i * 0.05], [0, 1]);
          const xPos = [10, 80, 20, 70, 15, 85][i];
          const yPos = [20, 30, 60, 70, 85, 15][i];

          return (
            <motion.div
              key={word}
              className="absolute z-20 text-white/80 font-medium tracking-[0.2em] uppercase text-xs md:text-sm mix-blend-difference"
              style={{ 
                left: `${xPos}%`, 
                top: `${yPos}%`,
                y,
                opacity
              }}
            >
              {word}
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
