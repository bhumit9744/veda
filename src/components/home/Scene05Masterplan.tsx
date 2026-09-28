import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Scene05Masterplan() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layer Reveal Sequence
  const boundaryOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const roadsOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const plotsOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const greeneryOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const amenitiesOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  
  // Overall Scene rotation/scale
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const sceneRotateX = useTransform(scrollYProgress, [0, 1], [40, 20]);
  const sceneRotateZ = useTransform(scrollYProgress, [0, 1], [-20, 0]);

  const textOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505] perspective-[1000px]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Masterplan 3D Container */}
        <motion.div 
          className="relative w-full max-w-[800px] aspect-square transform-style-3d"
          style={{ 
            scale: sceneScale, 
            rotateX: sceneRotateX, 
            rotateZ: sceneRotateZ 
          }}
        >
          {/* Base / Boundary */}
          <motion.div 
            className="absolute inset-0 border border-[#b89a6b]/30 bg-[#111]"
            style={{ opacity: boundaryOpacity }}
          />

          {/* Roads (SVG Placeholder) */}
          <motion.svg className="absolute inset-0 w-full h-full" style={{ opacity: roadsOpacity }}>
             <path d="M 200,0 L 200,800 M 0,400 L 800,400 M 400,0 L 400,800 M 0,200 L 800,200" stroke="#333" strokeWidth="20" fill="none" />
          </motion.svg>

          {/* Plots */}
          <motion.div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 p-8" style={{ opacity: plotsOpacity }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-sm"></div>
            ))}
          </motion.div>

          {/* Greenery */}
          <motion.div className="absolute inset-0" style={{ opacity: greeneryOpacity }}>
             <div className="absolute top-[10%] left-[10%] w-16 h-16 bg-green-900/30 rounded-full blur-xl"></div>
             <div className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-green-900/40 rounded-full blur-xl"></div>
             <div className="absolute top-[40%] right-[30%] w-24 h-24 bg-green-800/30 rounded-full blur-xl"></div>
          </motion.div>

          {/* Amenities */}
          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: amenitiesOpacity }}>
             <div className="w-32 h-32 bg-[#b89a6b]/20 border border-[#b89a6b] backdrop-blur-md flex items-center justify-center">
               <span className="text-[#b89a6b] text-[10px] tracking-widest uppercase">Clubhouse</span>
             </div>
          </motion.div>
        </motion.div>

        {/* Typography */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <div className="bg-[#050505]/80 backdrop-blur-sm p-12 text-center w-full">
            <h2 className="text-[#fdfdfd] text-4xl md:text-6xl font-light tracking-wide uppercase mb-2">
              Develop
            </h2>
            <h2 className="text-[#b89a6b] text-4xl md:text-6xl font-medium tracking-wide uppercase">
              The Opportunity.
            </h2>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
