import { useMemo, useState, useEffect } from 'react';

interface LifestyleSectionProps {
  progress: number;
}

const slides = [
  { title: 'Swimming Pool And Cabana', image: '/assets/images/project_image_9.jpg' },
  { title: 'Club House With Modern Amenities', image: '/assets/images/project_image_10.jpg' },
  { title: 'Multi-Purpose Play Court', image: '/assets/images/project_image_8.jpg' },
  { title: 'Jogging Track', image: '/assets/images/project_image_2.jpg' },
  { title: 'YOGA / MEDITATION ZONE', image: '/assets/images/project_image_4.jpg' },
  { title: 'Kids Zone', image: '/assets/images/project_image_3.jpg' },
  { title: 'Library', image: '/assets/images/project_image_11.jpg' },
  { title: 'Co-Work Space', image: '/assets/images/project_image_14.jpg' },
  { title: 'Pet Zone', image: '/assets/images/project_image_1.jpg' },
  { title: 'Guest Car Park', image: '/assets/images/project_image_5.jpg' },
  { title: 'PRAYER ZONE', image: '/assets/images/project_image_15.jpg' },
  { title: 'MIYAWAKI FOREST POCKET', image: '/assets/images/project_image_12.jpg' },
  { title: 'Senior Citizen Corner', image: '/assets/images/project_image_7.jpg' },
  { title: 'STARGAZING AREA', image: '/assets/images/project_image_13.jpg' },
];

// Duplicate slides to allow for an infinite seamless loop
const duplicatedSlides = [...slides, ...slides];

export default function LifestyleSection({ progress }: LifestyleSectionProps) {
  // Global active between 0.40 and 0.65
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.40) / 0.25));
  }, [progress]);

  const isActive = progress >= 0.39 && progress <= 0.66;

  if (!isActive) return null;

  // Timeline:
  // 0.0 -> 0.15: Intro fades in and holds
  // 0.15 -> 0.20: Intro fades out
  // 0.20 -> 1.0: Auto slideshow is visible

  const introOpacity = localProgress < 0.1 
    ? localProgress / 0.1 
    : localProgress < 0.15 
      ? 1 
      : Math.max(0, 1 - ((localProgress - 0.15) / 0.05));
      
  const introScale = 0.95 + (localProgress * 0.5);

  const slideshowOpacity = localProgress < 0.18 ? 0 : Math.min(1, (localProgress - 0.18) / 0.05);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-veda-ivory overflow-hidden">
      
      {/* Dynamic Keyframes for Seamless Loop with GPU Acceleration */}
      <style>{`
        @keyframes continuousInfiniteScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); } /* Exactly half the container width (14 slides) */
        }
        .animate-continuous-scroll {
          animation: continuousInfiniteScroll 210s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
      `}</style>

      {/* Intro */}
      <div 
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 z-20"
        style={{
          opacity: introOpacity,
          transform: `scale(${introScale})`,
          display: introOpacity === 0 ? 'none' : 'flex'
        }}
      >
        <span className="text-xs tracking-[0.4em] text-veda-olive uppercase mb-8 font-medium">
          Beyond the Villa
        </span>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-editorial text-veda-forest uppercase leading-tight tracking-widest drop-shadow-sm">
          Lifestyle<br/>& Amenities
        </h2>
      </div>

      {/* Auto Full-Screen Continuous Carousel */}
      <div 
        className="absolute inset-0 w-full h-full z-10 transition-opacity duration-1000 overflow-hidden"
        style={{
          opacity: slideshowOpacity,
          display: slideshowOpacity === 0 ? 'none' : 'block'
        }}
      >
        <div 
          className="flex h-full animate-continuous-scroll"
          style={{ 
            width: `${duplicatedSlides.length * 100}vw`
          }}
        >
          {duplicatedSlides.map((slide, i) => {
            // We use modulo for the slide number since we duplicated the array
            const slideIndex = i % slides.length;
            
            return (
              <div 
                key={i} 
                className="w-[100vw] h-full relative overflow-hidden shrink-0 border-r border-veda-ivory/5"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Background image without ken burns since the camera is already panning */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    filter: 'brightness(0.95)'
                  }}
                />
                
                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent pointer-events-none" />
                
                {/* Text overlay */}
                <div className="absolute bottom-16 left-8 md:bottom-24 md:left-24 max-w-xl">
                  <div className="flex items-end gap-6">
                    <span className="text-4xl md:text-5xl font-editorial text-veda-ivory uppercase leading-none drop-shadow-md">
                      {slide.title}
                    </span>
                    <span className="text-xl md:text-2xl font-editorial text-veda-gold pb-1 md:pb-2 drop-shadow-sm">
                      {String(slideIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
