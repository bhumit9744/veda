import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // 200vh total scroll duration for this sequence
          scrub: 1, // Smooth cinematic scrub
          pin: true,
        }
      });
      
      // Establish timeline duration of 1 for easy percentage mapping
      tl.to({}, { duration: 1 });
      
      // 0.00 - 0.25: Video 1 held (implied)
      // 0.25 - 0.75: Swipe
      tl.to('.video-slider', {
        x: '-50%', // Slider is 200% width, so -50% shifts exactly 1 viewport width
        ease: 'power2.inOut',
        duration: 0.5
      }, 0.25);
      
      // 0.75 - 1.00: Video 2 held (implied by timeline duration)
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
       <div 
         className="video-slider absolute top-0 left-0 h-full flex" 
         style={{ width: '200vw', willChange: 'transform' }}
       >
          
          {/* VIDEO 01 */}
          <div className="w-[100vw] h-full relative overflow-hidden">
             <video 
               src="/veda hero.mp4" 
               autoPlay 
               muted 
               loop 
               playsInline 
               className="absolute top-0 left-0 w-full h-full object-cover object-center"
             />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* VIDEO 02 */}
          <div className="w-[100vw] h-full relative overflow-hidden">
             <video 
               src="/Veda land.mp4" 
               autoPlay 
               muted 
               loop 
               playsInline 
               // On mobile, keep architectural content centered
               className="absolute top-0 left-0 w-full h-full object-cover object-[50%_center] md:object-center"
             />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>

       </div>
    </section>
  );
}
