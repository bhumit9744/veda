import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const developments = [
  {
    id: '01',
    title: 'Codename Bellagio',
    location: 'Alibaug',
    type: 'Research',
    image: '/assets/images/bellagio/img268.jpg',
    link: '/codename-bellagio.php',
    status: 'Explore Development',
  },
  {
    id: '02',
    title: 'Codename Vista',
    location: 'Karjat',
    type: 'Design',
    image: '/assets/images/images-1-big.jpg',
    link: '#',
    status: 'Coming Soon',
  },
  {
    id: '03',
    title: 'Upcoming',
    location: 'To be announced',
    type: 'Discovery',
    image: '/assets/images/images-2-big.jpg',
    link: '#',
    status: 'Future Project',
  }
];

export default function SectionOurDevelopmentsCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="developments" ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-[#F4F1E8] py-32 px-6 md:px-16 flex flex-col justify-center">
      
      {/* Section Header */}
      <div className="w-full max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4 font-medium">Our Developments</h2>
          <h3 className="text-4xl md:text-6xl font-light uppercase tracking-widest max-w-2xl leading-tight">
            Spaces designed for <span className="font-serif italic text-white/60 lowercase tracking-normal">extraordinary</span> living.
          </h3>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {developments.map((dev, i) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col group"
          >
            {/* Image Container */}
            <Link 
              to={dev.link} 
              className="relative w-full aspect-[3/4] overflow-hidden rounded-sm mb-8 block cursor-pointer"
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={dev.image} 
                  alt={dev.title} 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                />
              </motion.div>
              
              {/* Number Overlay */}
              <div className="absolute top-6 left-6 text-sm font-serif italic text-white/80 overflow-hidden mix-blend-difference">
                {dev.id}
              </div>
            </Link>

            {/* Info */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-baseline border-b border-white/20 pb-4 mb-4">
                  <h4 className="text-2xl md:text-3xl font-light tracking-widest uppercase">{dev.title}</h4>
                </div>
                <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-white/50 mb-8">
                  <span>{dev.location}</span>
                  <span>— {dev.type}</span>
                </div>
              </div>
              
              <Link 
                to={dev.link}
                className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-medium hover:text-white/70 transition-colors"
              >
                {dev.status} <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}
