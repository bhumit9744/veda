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

  const villas = [
    { 
      id: 'A', 
      name: 'VILLA CLASSIC', 
      size: '1500-1800 SQ.FT',
      image: '/assets/images/IMG-20261007-WA0056.jpg.jpeg' 
    },
    { 
      id: 'B', 
      name: 'VILLA PREMIUM', 
      size: '2200-2600 SQ.FT',
      image: '/assets/images/IMG-20261007-WA0057.jpg.jpeg' 
    },
    { 
      id: 'C', 
      name: 'VILLA SIGNATURE', 
      size: '3000-3500 SQ.FT',
      image: '/assets/images/IMG-20261007-WA0058.jpg.jpeg' 
    },
  ];

  const opacity = localProgress < 0.05 ? localProgress / 0.05 : localProgress > 0.95 ? (1 - localProgress) / 0.05 : 1;

  if (isMobile) {
    return (
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none bg-transparent z-0"
        style={{ opacity }}
      >
        <div 
          className="absolute left-0 top-0 w-full flex flex-col"
          style={{
            height: '300%',
            transform: `translateY(-${localProgress * 66.666}%)`
          }}
        >
          {villas.map((villa) => (
            <div key={`villa-m-${villa.id}`} className="w-full h-1/3 flex flex-col justify-center relative overflow-hidden py-8">
              <div className="w-full h-[70vh] relative overflow-hidden">
                <img 
                  src={villa.image} 
                  alt={villa.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay Text Box Mobile */}
                <div className="absolute bottom-0 left-[4vw] bg-[#f4f5f0] px-8 py-6 min-w-[250px]">
                  <div className="flex flex-col items-start text-left">
                    <h2 className="text-2xl font-editorial text-[#111111] mb-1">{villa.name}</h2>
                    {villa.size && (
                      <p className="text-xs tracking-widest text-[#111111] uppercase">{villa.size}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DESKTOP LAYOUT (SCROLLING ZIG-ZAG / OVERLAYS)
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none bg-transparent z-0 overflow-hidden"
      style={{ opacity }}
    >
      <div 
        className="w-full h-[300%] flex flex-col"
        style={{ 
          transform: `translateY(-${localProgress * (200 / 3)}%)`,
          willChange: 'transform'
        }}
      >
        {villas.map((villa, idx) => {
          return (
            <div 
              key={`villa-desktop-${villa.id}`}
              className="w-full h-1/3 relative overflow-hidden"
            >
              {/* IMAGE (FULL WIDTH) */}
              <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={villa.image} 
                    alt={villa.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* TEXT OVERLAY */}
                  <div className="absolute bottom-0 left-[4vw] bg-[#f4f5f0] px-12 py-10 min-w-[350px]">
                    <div className="flex flex-col items-start text-left">
                      <h2 className="text-3xl font-editorial text-[#111111] mb-2 tracking-wide whitespace-nowrap">
                        {villa.name}
                      </h2>
                      <div className="w-8 h-[1px] bg-[#111111]/20 my-3"></div>
                      <p className="text-sm tracking-[0.1em] text-[#111111] uppercase font-medium">
                        {villa.size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
