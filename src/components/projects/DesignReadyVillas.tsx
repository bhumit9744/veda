import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const villas = [
  { id: '01', title: 'VILLA A', image: '/villa 1 cutout.png' },
  { id: '02', title: 'VILLA B', image: '/villa 2 cutout.png' },
];

export default function DesignReadyVillas() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%', // 300vh scroll duration for deliberate, slow movement
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Determine active index based on scroll progress dynamically
            const index = Math.min(
              villas.length - 1,
              Math.floor(p * villas.length)
            );
            
            // Only trigger state update if it changed
            setActiveIndex((prev) => (prev !== index ? index : prev));
          }
        }
      });

      // Horizontal wipe of the track (dynamically calculated for N items)
      // Moving (N-1) items out of N items total width
      tl.to(track, {
        xPercent: -100 * (villas.length - 1) / villas.length,
        ease: 'none',
      });

      // Subtle cinematic image scale tied to the scroll
      const images = gsap.utils.toArray('.villa-img');
      images.forEach((img: any) => {
         gsap.fromTo(img, 
           { scale: 1.05 }, 
           { 
             scale: 1, 
             ease: 'none',
             scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top top',
               end: '+=300%',
               scrub: true
             }
           }
         );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden z-20 flex flex-col">
      
      {/* Header Info - Fixed during pin */}
      <div className="w-full px-6 md:px-12 lg:px-24 pt-12 md:pt-16 pb-4 flex flex-col md:flex-row md:items-end justify-between z-10">
        
        <div className="flex flex-col mb-8 md:mb-0">
          <span className="font-veda-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#666] mb-4">
            Live in European-Inspired Villas
          </span>
          <h2 className="font-veda-serif text-4xl md:text-5xl text-[#2d2d2d] leading-[1.1] tracking-tight mb-4">
            DESIGN READY VILLAS
          </h2>
          <p className="font-veda-sans text-sm md:text-base text-[#555] max-w-sm font-light leading-relaxed">
            Three architectural expressions. <br className="hidden md:block" /> One considered way of living.
          </p>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <div className="flex items-center gap-2 font-veda-sans text-xs tracking-widest uppercase mb-4">
            <span className="text-[#2d2d2d] font-semibold">{villas[activeIndex]?.id}</span>
            <span className="text-[#666]">/ {villas[activeIndex]?.title}</span>
          </div>
          
          {/* Animated Line Progress */}
          <div className="relative flex items-center w-[180px] md:w-[220px] h-[20px]">
             {/* Base line */}
             <div className="absolute top-1/2 left-0 w-full h-px bg-[#e5e5e5] -translate-y-1/2"></div>
             
             {/* Progress line tied to activeIndex */}
             <div 
               className="absolute top-1/2 left-0 h-px bg-[#8da394] -translate-y-1/2 transition-all duration-700 ease-out" 
               style={{ width: `${(activeIndex / (villas.length - 1)) * 100}%` }}
             ></div>
             
             {/* Numbers */}
             {villas.map((_, i) => (
               <div 
                 key={i} 
                 className="absolute top-1/2 -translate-y-1/2 bg-[#F9F8F6] px-2 transition-colors duration-500"
                 style={{ left: `${(i / (villas.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
               >
                 <span className={`font-veda-sans text-[10px] tracking-widest transition-colors duration-500 ${activeIndex >= i ? 'text-[#2d2d2d] font-semibold' : 'text-[#aaa]'}`}>
                   0{i + 1}
                 </span>
               </div>
             ))}
          </div>
        </div>

      </div>

      {/* Horizontal Track */}
      <div className="relative flex-1 w-full flex items-center overflow-hidden pb-4">
        <div 
          ref={trackRef} 
          className="flex h-full"
          style={{ width: `${villas.length * 100}vw`, willChange: 'transform' }}
        >
          {villas.map((villa, i) => (
            <div key={i} className="w-[100vw] h-full flex items-center justify-center">
              {/* 1:1 Square Visual Area */}
              <div className="relative flex items-center justify-center w-[85vw] h-[85vw] md:w-[min(65vh,65vw)] md:h-[min(65vh,65vw)]">
                <img 
                  src={villa.image} 
                  alt={villa.title} 
                  className="villa-img w-[85%] h-[85%] object-contain drop-shadow-2xl"
                  style={{ willChange: 'transform' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
