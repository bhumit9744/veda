import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="w-full bg-[#050505] text-[#F4F1E8] font-sans">
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/assets/images/aboutus-banner-new.png" 
            alt="About Veda" 
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-[5%] text-center flex flex-col items-center pt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#b89a6b] text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-6"
          >
            The Legacy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light uppercase tracking-widest text-white"
          >
            About <span className="font-serif italic text-white/70 lowercase tracking-normal">us</span>
          </motion.h1>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative w-full py-32 md:py-48 bg-[#0a0a0a]">
        <div className="container mx-auto px-[5%] max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img 
                  src="/assets/images/new-images/veda-about-us-new.jpeg" 
                  alt="Veda Life Spaces" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </motion.div>
              {/* Decorative Border */}
              <div className="absolute inset-4 border border-white/10 z-10 pointer-events-none transition-colors duration-700 group-hover:border-white/30" />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#b89a6b] text-xs uppercase tracking-[0.3em] font-medium mb-6"
            >
              Our Philosophy
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-light text-white leading-tight mb-12 tracking-wide"
            >
              Built on vision, ethics,<br/>
              <span className="font-serif italic text-white/60">discipline</span> & authenticity.
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base leading-loose text-white/50 font-light flex flex-col gap-6"
            >
              <p>
                Veda Life Spaces is built on a simple belief that land ownership should be secure, transparent, and meaningful. We focus on creating private lifestyle communities for a very limited set of families, where every land parcel is legally verified, thoughtfully planned, and developed with strong ethical standards.
              </p>
              <p>
                Our approach goes beyond selling land. We curate spaces that offer privacy, long term value, and a sense of belonging for those who seek more than just an investment.
              </p>
              <p>
                At our core, we combine disciplined execution with a vision for future ready living. From land acquisition and due diligence to infrastructure planning and home build support, we take a comprehensive approach to ensure every opportunity is secure, practical, and growth oriented.
              </p>
              <p className="text-[#b89a6b] font-medium tracking-wide">
                With Veda Life Spaces, land becomes more than an asset. It becomes a foundation for legacy, stability, and a refined lifestyle.
              </p>
            </motion.div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
