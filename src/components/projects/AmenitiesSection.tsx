import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const amenitiesList = [
  {
    category: 'COMMUNITY & GATHERING',
    title: 'Mountain View Coffee',
    image: '/Laughter Over Coffee with Mountain Views.png'
  },
  {
    category: 'WELLNESS & RELAXATION',
    title: 'Serene Head Massage',
    image: '/Serene Head Massage in a Warm Spa.png'
  },
  {
    category: 'OUTDOOR RECREATION',
    title: 'Garden Cycling Trails',
    image: '/Sunlit Cycling Through the Garden.png'
  },
  {
    category: 'INDOOR LEISURE',
    title: 'Modern Billiards Lounge',
    image: '/Sunlit Modern Billiards Lounge.png'
  },
  {
    category: 'WORK & SOCIAL SPACES',
    title: 'Poolside Coworking Café',
    image: '/Sunlit Poolside Coworking Café.png'
  },
  {
    category: 'SPORTS & RECREATION',
    title: 'Garden Tennis Courts',
    image: '/Golden Hour Garden Tennis Match.png'
  }
];

export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation (before pinning)
      const q = gsap.utils.selector(textRef);
      gsap.fromTo(q('.amenities-main'), 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      gsap.fromTo(q('.amenities-supporting'), 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Subtle Parallax for the background
      gsap.fromTo('.amenities-bg', 
        { yPercent: -5 },
        { 
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // 3. Scroll-Driven Master Timeline for the Horizontal Slider
      const track = trackRef.current;
      
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%', // Pin for a long enough distance to scroll through 6 cards
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculate x-distance if window is resized
        }
      });

      // Phase 1: Text fades out/moves up, and the track rises from the bottom
      pinTl.to(textRef.current, { y: -50, opacity: 0, duration: 2, ease: 'power2.inOut' }, 0);
      pinTl.fromTo(track, 
        { y: '120%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 2.5, ease: 'power2.out' },
        0.5 // Start slightly after text begins fading
      );

      // Phase 2: Horizontal Scroll
      // Start moving left once the track is up
      pinTl.to(track, {
        x: () => {
          // Calculate the horizontal travel distance needed to show the last card.
          // Add some right-side padding (e.g., 60px) so the last card doesn't hit the absolute edge.
          const paddingRight = window.innerWidth > 768 ? 96 : 24; 
          return -(track.scrollWidth - window.innerWidth + paddingRight); 
        },
        duration: 7, 
        ease: 'none' // Linear horizontal scroll
      }, 3); 

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-black z-20 flex flex-col justify-start">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src="/club-house.png" 
          alt="Veda Life Spaces - Clubhouse"
          className="amenities-bg w-full h-[110%] object-cover absolute top-[-5%] left-0"
        />
        {/* Subtle, carefully controlled overlay to ensure typography remains readable */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Soft gradient from left so text is crisp and editorial */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
      </div>

      {/* Editorial Content Container */}
      <div 
        ref={textRef} 
        className="absolute top-0 left-0 w-full z-10 max-w-7xl px-6 md:px-12 lg:px-24 flex flex-col justify-start pt-24 md:pt-32 lg:pt-40"
      >
        <div className="max-w-2xl text-left">
          {/* Main statement - Asymmetrical styling */}
          <div className="amenities-main flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-8">
            <h2 className="font-veda-serif text-white leading-[0.9]">
              <span className="text-[6rem] md:text-[8rem] lg:text-[10rem] tracking-tight block drop-shadow-md">27<span className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-light align-top ml-2">+</span></span>
            </h2>
            <h2 className="font-veda-sans text-3xl md:text-5xl lg:text-5xl tracking-[0.2em] uppercase font-light text-white/95 drop-shadow-sm mt-4 md:mt-0">
              AMENITIES
            </h2>
          </div>

          {/* Supporting line */}
          <div className="amenities-supporting">
            <h3 className="font-veda-sans text-sm md:text-base lg:text-lg tracking-[0.4em] uppercase text-[#d1cec7] font-light ml-2 md:ml-4 border-l border-white/20 pl-6">
              FOR THE PRIVILEGED 42
            </h3>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Track Container */}
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end pb-8 md:pb-16 px-6 md:px-12 lg:px-24 pointer-events-none z-20 overflow-visible">
        <div 
          ref={trackRef} 
          className="flex w-max gap-4 md:gap-8 pointer-events-auto items-end"
          style={{ willChange: 'transform' }}
        >
          {amenitiesList.map((item, idx) => (
            <div key={idx} className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] aspect-[4/5] md:aspect-square lg:aspect-[3/4] bg-white/5 backdrop-blur-md rounded-sm overflow-hidden border border-white/10 relative flex flex-col group shadow-2xl">
              <div className="absolute inset-0 w-full h-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              </div>
              
              <div className="relative z-10 mt-auto p-6 md:p-8">
                <span className="font-veda-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/70 mb-2 md:mb-3 block">
                  {item.category}
                </span>
                <h3 className="font-veda-serif text-2xl md:text-3xl text-white tracking-wide font-light">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
