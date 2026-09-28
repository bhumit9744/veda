import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../MagneticButton';
import { Link } from 'react-router-dom';

export default function Section11FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[90vh] bg-white overflow-hidden flex items-center justify-center">
      
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 filter grayscale"
        style={{ scale: imageScale }}
      >
        <img src="/assets/images/banner.jpg" alt="Final CTA" className="w-full h-full object-cover" />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-[5%] text-center">
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#111] uppercase tracking-tight mb-8">
          Will this create<br/>
          <span className="font-medium text-[#b89a6b]">lasting value?</span>
        </h2>

        <div className="text-sm md:text-base text-[#111]/60 uppercase tracking-[0.3em] font-medium mb-16">
          Veda Lifespaces — Beyond Living.
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Link to="/#developments" className="w-full md:w-auto">
            <MagneticButton className="group bg-[#111] text-white px-10 py-5 uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#b89a6b] transition-colors duration-500 w-full md:w-auto">
              Explore Developments
            </MagneticButton>
          </Link>
          
          <Link to="/contact-us.php" className="w-full md:w-auto">
            <MagneticButton className="group bg-transparent border border-[#111] text-[#111] px-10 py-5 uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#111] hover:text-white transition-colors duration-500 w-full md:w-auto">
              Enquire Now
            </MagneticButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
