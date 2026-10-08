import { useMemo, useEffect, useState } from 'react';

interface VillaTriptychProps {
  progress: number;
}

export default function VillaTriptych({ progress }: VillaTriptychProps) {
  // Active between 0.18 and 0.40
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.18) / 0.22));
  }, [progress]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = progress >= 0.17 && progress <= 0.41;
  if (!isActive) return null;

  const getVillaState = (index: number) => {
    let dominantScore = 0;
    
    if (index === 0) { 
      if (localProgress <= 0.25) dominantScore = 1;
      else if (localProgress > 0.25 && localProgress < 0.41) {
        dominantScore = 1 - ((localProgress - 0.25) / 0.16);
      } else {
        dominantScore = 0;
      }
    } else if (index === 1) { 
      if (localProgress > 0.25 && localProgress < 0.41) {
        dominantScore = (localProgress - 0.25) / 0.16;
      } else if (localProgress >= 0.41 && localProgress <= 0.58) {
        dominantScore = 1;
      } else if (localProgress > 0.58 && localProgress < 0.75) {
        dominantScore = 1 - ((localProgress - 0.58) / 0.17);
      } else {
        dominantScore = 0;
      }
    } else if (index === 2) { 
      if (localProgress > 0.58 && localProgress < 0.75) {
        dominantScore = (localProgress - 0.58) / 0.17;
      } else if (localProgress >= 0.75) {
        dominantScore = 1;
      } else {
        dominantScore = 0;
      }
    }

    return dominantScore;
  };

  const villas = [
    { 
      id: 'A', 
      name: 'VILLA A', 
      desc: 'Thoughtfully designed European-inspired villa layout optimizing natural light, flow, and spatial elegance.',
      image: '/assets/images/IMG-20261007-WA0056.jpg.jpeg' 
    },
    { 
      id: 'B', 
      name: 'VILLA B', 
      desc: 'Seamless indoor-outdoor living with expansive tropical landscaping, stone accents, and premium architectural finishes.',
      image: '/assets/images/IMG-20261007-WA0057.jpg.jpeg' 
    },
    { 
      id: 'C', 
      name: 'VILLA C', 
      desc: 'Our signature footprint featuring grand entertaining spaces, double-height volumes, and ultimate residential privacy.',
      image: '/assets/images/IMG-20261007-WA0058.jpg.jpeg' 
    },
  ];

  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-veda-ivory z-0 flex flex-col">
        {/* TOP HALF - IMAGE */}
        <div className="w-full h-[55vh] relative overflow-hidden">
           {villas.map((villa, idx) => {
             const dom = getVillaState(idx);
             if (dom === 0) return null;
             return (
               <div 
                 key={`img-m-${villa.id}`}
                 className="absolute inset-0 w-full h-full bg-cover bg-center"
                 style={{
                   backgroundImage: `url(${villa.image})`,
                   opacity: dom,
                   transform: `scale(${1 + (1 - dom) * 0.1})`
                 }}
               />
             )
           })}
        </div>
        {/* BOTTOM HALF - TEXT */}
        <div className="w-full h-[45vh] relative flex items-center px-8">
           {villas.map((villa, idx) => {
             const dom = getVillaState(idx);
             if (dom === 0) return null;
             return (
               <div 
                 key={`text-m-${villa.id}`}
                 className="absolute left-8 right-8 top-1/2 text-center"
                 style={{
                   opacity: dom,
                   transform: `translateY(calc(-50% + ${(1 - dom) * 15}px))`
                 }}
               >
                 <span className="text-veda-olive text-xs tracking-widest uppercase mb-2 block">European Architecture</span>
                 <h2 className="text-4xl font-editorial text-veda-forest mb-4">
                   {villa.name}
                 </h2>
                 <div className="w-8 h-[1px] bg-veda-border mx-auto mb-4"></div>
                 <p className="text-sm text-veda-text-secondary font-light leading-relaxed">
                   {villa.desc}
                 </p>
               </div>
             )
           })}
        </div>
      </div>
    );
  }

  // DESKTOP SPLIT LAYOUT
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex bg-veda-ivory z-0">
      {/* LEFT SIDE - IMAGE */}
      <div className="w-1/2 h-full relative overflow-hidden">
        {villas.map((villa, idx) => {
          const dom = getVillaState(idx);
          if (dom === 0) return null;
          return (
            <div 
              key={`img-${villa.id}`}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${villa.image})`,
                opacity: dom,
                transform: `scale(${1 + (1 - dom) * 0.05})`
              }}
            />
          )
        })}
      </div>

      {/* RIGHT SIDE - TEXT */}
      <div className="w-1/2 h-full flex flex-col justify-center bg-[#151716] relative overflow-hidden">
        {villas.map((villa, idx) => {
          const dom = getVillaState(idx);
          if (dom === 0) return null;
          return (
            <div 
              key={`text-${villa.id}`}
              className="absolute left-16 lg:left-24 right-16 top-1/2"
              style={{
                opacity: dom,
                transform: `translateY(calc(-50% + ${(1 - dom) * 20}px))`
              }}
            >
              <span className="text-veda-gold text-sm tracking-widest uppercase mb-4 block italic opacity-90 font-serif">A high street on the promenade</span>
              <h2 className="text-5xl lg:text-7xl font-editorial text-veda-ivory mb-6 leading-tight">
                {villa.name}
              </h2>
              <div className="w-12 h-[1px] bg-veda-border/30 mb-6"></div>
              <p className="text-lg lg:text-xl text-veda-ivory/80 font-light leading-relaxed mb-12 max-w-lg">
                {villa.desc}
              </p>
              
              <div className="flex flex-col gap-4 text-veda-ivory/90 text-sm font-medium tracking-widest uppercase">
                <div className="flex items-center gap-4"><span className="w-4 h-[1px] bg-veda-gold"></span> Front Elevation</div>
                <div className="flex items-center gap-4"><span className="w-4 h-[1px] bg-veda-gold"></span> Rear Elevation</div>
                <div className="flex items-center gap-4"><span className="w-4 h-[1px] bg-veda-gold"></span> Floor Plan</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
