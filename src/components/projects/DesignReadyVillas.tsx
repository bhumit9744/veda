import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const villas = [
  { id: '01', title: 'VILLA CLASSIC', image: '/villa 1 cutout.png' },
  { id: '02', title: 'VILLA GRANDE', image: '/villa 2 cutout.png' },
  { id: '03', title: 'VILLA ROYALE', image: '/villa 3 cutout.png' },
];

export default function DesignReadyVillas() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      
      // 0. Initial Text Setup
      gsap.set(textRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: '50%',
        top: '44%', 
        x: '15vw',
        y: 80,
        opacity: 0,
        rotation: 2 // arc tilt
      });

      // 1. Entrance Text Animation (Triggers just before pinning)
      gsap.to(textRef.current, {
        y: 30, 
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // 2. Initial Villa Setup (Hidden off-stage or faded out initially)
      // Typography for Villa A:
      gsap.set('.villa-a-text', {
        y: 40,
      });

      // Typography for Villa B:
      gsap.set('.villa-b-text', {
        y: 40,
        opacity: 0,
      });

      // Typography for Villa C:
      gsap.set('.villa-c-text', {
        y: 40,
        opacity: 0,
      });

      // Villa 01: Center initially, scaled down and invisible until text exits
      gsap.set('.villa-card-0', {
        xPercent: -50,
        yPercent: -50,
        left: '50%',
        top: '50%',
        scale: 0.8,
        rotation: -5,
        opacity: 0,
      });

      // Villa 02: Right edge
      gsap.set('.villa-card-1', {
        xPercent: -50,
        yPercent: -50,
        left: '120%',
        top: '58%',
        scale: 0.7,
        rotation: 10,
        opacity: 0,
      });

      // Villa 03: Further right
      gsap.set('.villa-card-2', {
        xPercent: -50,
        yPercent: -50,
        left: '160%',
        top: '65%',
        scale: 0.6,
        rotation: 15,
        opacity: 0, 
      });

      // Master Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%', // Total scroll distance accommodates both phases
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // --- PHASE A: Text Arc ---
      
      // 0 to 15: Text to center
      tl.to(textRef.current, {
        x: '0vw',
        y: 0,
        rotation: 0,
        duration: 15,
        ease: 'power2.out'
      }, 0);

      // 15 to 20: Text holds center
      tl.to({}, { duration: 5 }, 15);

      // 20 to 35: Text moves left and exits
      tl.to(textRef.current, {
        x: '-25vw',
        y: 60,
        rotation: -2,
        opacity: 0,
        duration: 15,
        ease: 'power2.in'
      }, 20);

      // --- PHASE B: Villa Carousel Begins ---
      
      // 25 to 35: Reveal Villa 01 and 02 seamlessly as text fades out
      tl.to('.villa-a-text', {
        y: 0,
        duration: 10,
        ease: 'power2.out'
      }, 25);

      tl.to('.villa-card-0', {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 10,
        ease: 'power2.out'
      }, 25);

      tl.to('.villa-card-1', {
        scale: 0.8,
        opacity: 0.6,
        duration: 10,
        ease: 'power2.out'
      }, 25);

      // 35 to 40: Hold Villa 01 in center
      tl.to({}, { duration: 5 }, 35);

      // 40 to 70: Villa 01 -> Villa 02 Transition
      
      // Reveal Villa B text smoothly as it approaches center
      tl.to('.villa-b-text', {
        y: 0,
        opacity: 1,
        duration: 20,
        ease: 'power2.out'
      }, 45);

      tl.to('.villa-card-0', {
        left: '-20%',
        top: '58%',
        scale: 0.8,
        rotation: -10,
        opacity: 0.6,
        duration: 30,
        ease: 'power2.inOut',
      }, 40);

      tl.to('.villa-card-1', {
        left: '50%',
        top: '50%',
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 30,
        ease: 'power2.inOut',
      }, 40);
      
      tl.to('.villa-card-2', {
        left: '120%',
        top: '58%',
        scale: 0.8,
        rotation: 10,
        opacity: 0.6,
        duration: 30,
        ease: 'power2.inOut',
      }, 40);

      // 70 to 75: Hold Villa 02 in center
      tl.to({}, { duration: 5 }, 70);

      // 75 to 105: Villa 02 -> Villa 03 Transition
      
      // Reveal Villa C text smoothly as it approaches center
      tl.to('.villa-c-text', {
        y: 0,
        opacity: 1,
        duration: 20,
        ease: 'power2.out'
      }, 80);

      tl.to('.villa-card-0', {
        left: '-60%',
        top: '65%',
        scale: 0.7,
        rotation: -15,
        opacity: 0,
        duration: 30,
        ease: 'power2.inOut',
      }, 75);

      tl.to('.villa-card-1', {
        left: '-20%',
        top: '58%',
        scale: 0.8,
        rotation: -10,
        opacity: 0.6,
        duration: 30,
        ease: 'power2.inOut',
      }, 75);

      tl.to('.villa-card-2', {
        left: '50%',
        top: '50%',
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 30,
        ease: 'power2.inOut',
      }, 75);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden z-20 font-codec">
      
      {/* LUXURY BOTANICAL LEAFY & GRASSY BACKGROUND PATTERN */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Seamless Botanical Leaf & Meadow Grass Pattern - Faded Whisper */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="veda-leafy-grassy-pattern"
              width="240"
              height="240"
              patternUnits="userSpaceOnUse"
            >
              {/* --- BACKGROUND BOTANICAL ACCENT VEINS & RUNNERS --- */}
              <path
                d="M 0 120 C 60 130 90 90 140 100 C 180 110 210 80 240 85"
                fill="none"
                stroke="#6B8062"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <path
                d="M 120 0 C 130 60 90 100 110 160 C 120 200 95 220 100 240"
                fill="none"
                stroke="#6B8062"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                opacity="0.4"
              />

              {/* --- CLUSTER 1: TALL MEADOW GRASS TUFT (Center-Left / Bottom) --- */}
              {/* Grass blades rising and bending gracefully */}
              <g stroke="#3E5038" strokeWidth="1.2" strokeLinecap="round" fill="none">
                <path d="M 45 240 C 42 185 30 140 10 100" />
                <path d="M 48 240 C 50 170 60 120 85 85" />
                <path d="M 52 240 C 62 175 90 140 125 115" />
                <path d="M 40 240 C 35 195 20 160 -5 135" />
                <path d="M 50 240 C 52 200 55 165 62 130" />
              </g>
              {/* Shaded grass blade silhouettes */}
              <path
                d="M 46 240 C 44 180 32 142 12 105 C 24 140 39 180 43 240 Z"
                fill="#53674B"
                opacity="0.4"
              />
              <path
                d="M 49 240 C 56 172 72 128 95 95 C 78 135 60 180 54 240 Z"
                fill="#687F60"
                opacity="0.35"
              />
              {/* Meadow grass seedheads */}
              <circle cx="10" cy="99" r="1.8" fill="#849977" />
              <circle cx="85" cy="84" r="1.8" fill="#849977" />
              <circle cx="125" cy="114" r="1.8" fill="#849977" />
              <circle cx="6" cy="108" r="1.3" fill="#849977" opacity="0.8" />
              <circle cx="91" cy="92" r="1.3" fill="#849977" opacity="0.8" />

              {/* --- TOP WRAP FOR CLUSTER 1 (Ensures seamless vertical tiling: y=0 matches y=240) --- */}
              <g stroke="#3E5038" strokeWidth="1.2" strokeLinecap="round" fill="none">
                <path d="M 45 0 C 42 -55 30 -100 10 -140" />
                <path d="M 48 0 C 50 -70 60 -120 85 -155" />
                <path d="M 52 0 C 62 -65 90 -100 125 -125" />
                <path d="M 40 0 C 35 -45 20 -80 -5 -105" />
              </g>
              <path
                d="M 46 0 C 44 -60 32 -98 12 -135 C 24 -100 39 -60 43 0 Z"
                fill="#53674B"
                opacity="0.4"
              />

              {/* --- CLUSTER 2: BOTANICAL LEAFY OLIVE / LAUREL BRANCH (Diagonal Swag) --- */}
              {/* Organic branch stem */}
              <path
                d="M 110 240 C 130 190 160 145 200 105 C 220 85 235 60 240 30"
                fill="none"
                stroke="#374831"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              {/* Paired leaf foliage along branch */}
              {/* Leaf Pair A */}
              <path
                d="M 138 190 C 120 184 110 166 116 152 C 128 160 140 174 144 179 Z"
                fill="#4E6246"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <path d="M 138 184 Q 126 168 116 154" stroke="#6F8566" strokeWidth="0.6" fill="none" />

              <path
                d="M 150 172 C 168 168 180 154 178 138 C 164 145 155 158 152 166 Z"
                fill="#617757"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <path d="M 152 166 Q 166 152 176 140" stroke="#879E7E" strokeWidth="0.6" fill="none" />

              {/* Leaf Pair B */}
              <path
                d="M 168 142 C 148 134 140 115 148 102 C 158 112 170 126 174 133 Z"
                fill="#4E6246"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <path d="M 168 136 Q 156 120 150 104" stroke="#6F8566" strokeWidth="0.6" fill="none" />

              <path
                d="M 182 125 C 202 118 212 102 208 86 C 194 94 186 109 184 118 Z"
                fill="#6B8260"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <path d="M 184 118 Q 198 104 206 88" stroke="#8EA584" strokeWidth="0.6" fill="none" />

              {/* Terminal foliage */}
              <path
                d="M 205 98 C 214 78 228 62 240 52 C 234 70 222 88 212 98 Z"
                fill="#556A4C"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.9"
              />

              {/* TOP WRAP FOR CLUSTER 2 (Branch start at y=0 matches y=240) */}
              <path
                d="M 110 0 C 130 -50 160 -95 200 -135"
                fill="none"
                stroke="#374831"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M 138 -50 C 120 -56 110 -74 116 -88 C 128 -80 140 -66 144 -61 Z"
                fill="#4E6246"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.85"
              />

              {/* LEFT WRAP FOR CLUSTER 2 (Branch tip at x=240 matches x=0) */}
              <path
                d="M 0 30 C 5 20 15 10 25 5"
                fill="none"
                stroke="#374831"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M 0 52 C 5 42 16 35 24 38 C 18 46 8 52 0 52 Z"
                fill="#556A4C"
                stroke="#374831"
                strokeWidth="0.8"
                opacity="0.85"
              />

              {/* --- CLUSTER 3: DELICATE PINNATE FERN / PALM SPRIG (Top Left) --- */}
              <path
                d="M 0 45 C 30 38 65 46 95 22"
                fill="none"
                stroke="#364730"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Feathery leaflets along the fern spine */}
              <path d="M 22 43 C 20 28 30 18 38 19 C 34 29 27 38 24 43 Z" fill="#5A7051" opacity="0.8" />
              <path d="M 42 43 C 46 29 57 21 64 23 C 59 33 50 40 45 44 Z" fill="#6E8564" opacity="0.8" />
              <path d="M 62 38 C 64 24 76 15 83 17 C 78 27 69 35 65 39 Z" fill="#5A7051" opacity="0.8" />
              <path d="M 82 28 C 88 16 99 10 106 13 C 100 22 90 28 84 30 Z" fill="#6E8564" opacity="0.8" />

              {/* BOTTOM WRAP FOR FERN (y=240 matches y=0) */}
              <path
                d="M 0 285 C 30 278 65 286 95 262"
                fill="none"
                stroke="#364730"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* --- CLUSTER 4: SECONDARY WILD MEADOW REEDS & GRASSES (Top Right) --- */}
              <g stroke="#42553C" strokeWidth="1.1" strokeLinecap="round" fill="none">
                <path d="M 175 0 C 170 45 155 85 130 115" />
                <path d="M 180 0 C 185 50 200 90 220 120" />
                <path d="M 170 0 C 160 40 140 70 110 90" />
              </g>
              <path
                d="M 176 0 C 172 42 158 80 135 110 C 146 75 165 40 178 0 Z"
                fill="#596E50"
                opacity="0.3"
              />
              {/* Whispering seed awns */}
              <circle cx="129" cy="116" r="1.6" fill="#7D9373" />
              <circle cx="221" cy="121" r="1.6" fill="#7D9373" />
              <circle cx="109" cy="91" r="1.6" fill="#7D9373" />

              {/* BOTTOM WRAP FOR CLUSTER 4 (Matches y=0 at y=240) */}
              <g stroke="#42553C" strokeWidth="1.1" strokeLinecap="round" fill="none">
                <path d="M 175 240 C 170 285 155 325 130 355" />
                <path d="M 180 240 C 185 290 200 330 220 360" />
              </g>

              {/* --- CLUSTER 5: TENDER CLOVER & WILD GRASS PATCH (Center-Right Floating) --- */}
              {/* Wild three-leaf clover / sorrel */}
              <g transform="translate(195, 185)">
                <path d="M 0 0 C -12 -5 -16 -20 -3 -22 C 3 -18 3 -8 0 0 Z" fill="#5F7555" opacity="0.75" />
                <path d="M 0 0 C -4 -16 10 -24 16 -12 C 14 -4 6 0 0 0 Z" fill="#6F8765" opacity="0.75" />
                <path d="M 0 0 C 8 -10 20 -4 16 8 C 8 10 2 4 0 0 Z" fill="#506648" opacity="0.75" />
                <path d="M 0 0 Q -5 15 -8 24" stroke="#3D5037" strokeWidth="0.8" fill="none" />
              </g>

              {/* Tiny wild grass cluster in center */}
              <g stroke="#485B42" strokeWidth="0.9" strokeLinecap="round" fill="none">
                <path d="M 85 140 C 80 120 72 105 60 95" />
                <path d="M 88 140 C 92 118 102 102 115 92" />
                <path d="M 86 140 C 86 122 88 110 92 98" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#veda-leafy-grassy-pattern)" />
        </svg>

        {/* Soft Radial Vignette for Depth & Readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(249,248,246,0.35) 0%, rgba(249,248,246,0.72) 55%, rgba(238,235,227,0.88) 100%)'
          }}
        />
      </div>

      {/* TEXT LAYER */}
      <div 
        ref={textRef} 
        className="absolute w-[92vw] md:w-[85vw] lg:w-[75vw] max-w-[1100px] text-center pointer-events-none z-10 flex flex-col items-center justify-center gap-5 md:gap-6"
      >
        <h2 className="font-codec text-2xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#2d2d2d] font-normal leading-[1.2] tracking-tight max-w-[920px] mx-auto">
          A European-Inspired Vision<br className="hidden sm:inline" /> for the Privileged 42
        </h2>
        
        <p className="text-[#555] font-codec text-sm md:text-base lg:text-[17px] font-light tracking-wide max-w-[640px] mx-auto leading-relaxed mt-1 md:mt-2">
          Choose from our branded villa plots and discover European-inspired designs that complement your plot and reflect your vision.
        </p>

        <p className="text-[#777] font-codec text-xs md:text-sm lg:text-[15px] font-light tracking-wide max-w-[600px] mx-auto leading-relaxed">
          A place that begins with your choice, reflects your taste, and becomes a world entirely your own.
        </p>
      </div>

      {/* CARDS LAYER */}
      <div className="absolute top-[6vh] md:top-[8vh] lg:top-[10vh] left-0 w-full h-full pointer-events-none z-20">
         {villas.map((villa, i) => {
           return (
             <div 
               key={i} 
               className={`villa-card-${i} absolute w-[85vw] md:w-[60vw] max-w-[900px] aspect-video flex flex-col`}
             >
               {/* Typography for Villa Classic (i === 0) */}
               {i === 0 && (
                 <div className="villa-a-text absolute -top-32 md:-top-40 lg:-top-44 left-0 w-full flex flex-col items-center text-center pointer-events-none pt-2 md:pt-4">
                   <p className="font-codec text-xs md:text-sm text-[#666] font-normal tracking-wider mb-1">
                     Proposed Villa Design
                   </p>
                   <h2 className="font-codec text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-1.5 font-normal tracking-tight uppercase">
                     VILLA CLASSIC
                   </h2>
                   <p className="font-codec text-xs md:text-sm text-[#666] font-normal tracking-wider">
                     Plot Size (1,500–1,800 sq. ft.)
                   </p>
                 </div>
               )}

               {/* Typography for Villa Grande (i === 1) */}
               {i === 1 && (
                 <div className="villa-b-text absolute -top-32 md:-top-40 lg:-top-44 left-0 w-full flex flex-col items-center text-center pointer-events-none pt-2 md:pt-4">
                   <p className="font-codec text-xs md:text-sm text-[#666] font-normal tracking-wider mb-1">
                     Proposed Villa Design
                   </p>
                   <h2 className="font-codec text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-1.5 font-normal tracking-tight uppercase">
                     VILLA GRANDE
                   </h2>
                   <p className="font-codec text-xs md:text-sm text-[#666] font-normal tracking-wider">
                     Plot Size (2,300–5,000 sq. ft.)
                   </p>
                 </div>
               )}

               {/* Typography for Villa Royale (i === 2) */}
               {i === 2 && (
                 <div className="villa-c-text absolute -top-32 md:-top-40 lg:-top-44 left-0 w-full flex flex-col items-center text-center pointer-events-none pt-2 md:pt-4">
                   <p className="font-codec text-xs md:text-sm text-[#666] font-normal tracking-wider mb-1">
                     Proposed Villa Design
                   </p>
                   <h2 className="font-codec text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-1.5 font-normal tracking-tight uppercase">
                     VILLA ROYALE
                   </h2>
                   <p className="font-codec text-xs md:text-sm text-[#666] font-normal tracking-wider">
                     Plot Size (1,900–2,300 sq. ft.)
                   </p>
                 </div>
               )}

               <div className="relative w-full h-full flex items-center justify-center">
                 <img 
                   src={villa.image} 
                   alt={villa.title} 
                   className="w-full h-full object-contain" 
                 />
               </div>

             </div>
           );
         })}
      </div>

    </section>
  );
}
