import { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import DevelopmentScene from './DevelopmentScene';

const developments = [
  { id: '01', title: 'Bellagio', location: 'Alibaug', state: 'RESEARCH' },
  { id: '02', title: 'Vista', location: 'Khandala', state: 'CHOOSE' },
  { id: '03', title: 'Upcoming', location: 'Goa', state: 'DEVELOP' }
];

export default function OurDevelopments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDev, setActiveDev] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
  };

  const [progressVal, setProgressVal] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      // Map the progress to finish at 80% of the scroll container.
      // This leaves the remaining 20% for the DNA to pause before scrolling up.
      const adjV = Math.min(v / 0.8, 1);
      setProgressVal(adjV);
      if (adjV < 0.33) setActiveDev(0);
      else if (adjV < 0.66) setActiveDev(1);
      else setActiveDev(2);
    });
    return unsubscribe;
  }, [smoothProgress]);

  // Framer Motion transforms for Typography
  const labelY = useTransform(smoothProgress, [0, 0.1], [20, 0]);
  const labelOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  const title1Y = useTransform(smoothProgress, [0, 0.15], [50, 0]);
  const title1Opacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);

  const title2X = useTransform(smoothProgress, [0, 0.2], [-50, 0]);
  const title2Opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  const activeProject = developments[activeDev];

  return (
    <section 
      id="developments"
      ref={containerRef} 
      className="relative w-full h-[480vh] bg-[#070807]"
      onMouseMove={handleMouseMove}
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
        
        {/* Background Depth layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111311] via-[#070807] to-[#040504] opacity-80" />
        <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

        {/* 3D WebGL Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {isInView && (
            <Suspense fallback={null}>
              <DevelopmentScene scrollProgress={progressVal} mousePos={mousePos} activeDev={activeDev} />
            </Suspense>
          )}
        </div>

        {/* HTML DOM Content Layer */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
          
          {/* Top/Left: Big Typography */}
          <div className="absolute top-0 left-0 p-8 md:p-16 max-w-4xl pt-12 md:pt-20">
            <motion.h5 
              className="text-[#d4c9b3] tracking-[0.4em] uppercase text-[10px] md:text-xs mb-10 font-medium"
              style={{ y: labelY, opacity: labelOpacity }}
            >
              Our Developments
            </motion.h5>
            
            <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-light text-white uppercase tracking-tighter leading-[0.95]">
              <div className="relative">
                <motion.div style={{ y: title1Y, opacity: title1Opacity, filter: useTransform(smoothProgress, [0, 0.15], ['blur(20px)', 'blur(0px)']), scale: useTransform(smoothProgress, [0, 0.15], [1.05, 1]), transformOrigin: "left center" }}>
                  We find land
                </motion.div>
              </div>
              <div className="relative">
                <motion.div 
                  className="font-bold text-[#d4c9b3]"
                  style={{ x: title2X, opacity: title2Opacity, filter: useTransform(smoothProgress, [0.05, 0.2], ['blur(20px)', 'blur(0px)']), scale: useTransform(smoothProgress, [0.05, 0.2], [0.95, 1]), transformOrigin: "left center" }}
                >
                  worth owning.
                </motion.div>
              </div>
            </h2>
          </div>

          {/* Bottom section: Metadata & Navigation */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end pointer-events-auto">
            
            {/* Active Development Data */}
            <div className="flex flex-col mb-8 md:mb-0">
              <span className="text-[#5e6651] text-[10px] tracking-[0.3em] mb-2 uppercase">
                {activeProject.id} / 03
              </span>
              <h3 className="text-3xl md:text-5xl font-medium text-white uppercase tracking-widest mb-1">
                {activeProject.title}
              </h3>
              <span className="text-[#d4c9b3] text-xs tracking-[0.3em] uppercase mb-6">
                {activeProject.location} — {activeProject.state}
              </span>

              {/* Subdued minimal CTA */}
              <button className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300 w-max relative">
                <span className="relative z-10">Explore Development</span>
                <span className="transition-transform duration-500 group-hover:translate-x-2 relative z-10">→</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#d4c9b3] transition-all duration-500 group-hover:w-full" />
              </button>
            </div>

            {/* Development Selector Nav */}
            <div className="flex gap-6 md:gap-12 text-[10px] md:text-xs tracking-[0.2em] uppercase">
              {developments.map((dev, idx) => (
                <button 
                  key={dev.id}
                  onClick={() => setActiveDev(idx)}
                  className={`flex flex-col transition-all duration-500 ${activeDev === idx ? 'text-[#d4c9b3] opacity-100' : 'text-white/30 hover:text-white/60'}`}
                >
                  <span className="mb-1">{dev.id}</span>
                  <span>{dev.title}</span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
