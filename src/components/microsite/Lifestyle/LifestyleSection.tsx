import { useMemo, useState, useEffect } from 'react';

interface LifestyleSectionProps {
  progress: number;
}

const slides = [
  { title: 'Swimming Pool And Cabana', description: 'Dive into relaxation and luxury', image: '/assets/images/project_image_9.jpg' },
  { title: 'Club House With Modern Amenities', description: 'A space designed for community and leisure', image: '/assets/images/project_image_10.jpg' },
  { title: 'Multi-Purpose Play Court', description: 'Active living with versatile sports facilities', image: '/assets/images/project_image_8.jpg' },
  { title: 'Jogging Track', description: 'Start your mornings with a refreshing run', image: '/assets/images/project_image_2.jpg' },
  { title: 'YOGA / MEDITATION ZONE', description: 'Find inner peace in our dedicated mindful spaces', image: '/assets/images/project_image_4.jpg' },
  { title: 'Kids Zone', description: 'Safe and engaging play areas for the little ones', image: '/assets/images/project_image_3.jpg' },
  { title: 'Library', description: 'Quiet spaces for reading and focused work', image: '/assets/images/project_image_11.jpg' },
  { title: 'Co-Work Space', description: 'Professional environments for remote working', image: '/assets/images/project_image_14.jpg' },
  { title: 'Pet Creche', description: 'Bring your pets along. They\'ll be cared for and kept company while you work.', image: '/assets/images/project_image_1.jpg' },
  { title: 'Bowling Alley', description: 'Four lanes downstairs, for evenings when you need to unwind.', image: '/assets/images/project_image_15.jpg' },
  { title: 'MIYAWAKI FOREST POCKET', description: 'Experience dense, native greenery within the community', image: '/assets/images/project_image_12.jpg' },
  { title: 'Senior Citizen Corner', description: 'Peaceful gathering spaces designed for comfort', image: '/assets/images/project_image_7.jpg' },
  { title: 'STARGAZING AREA', description: 'Unobstructed views of the night sky', image: '/assets/images/project_image_13.jpg' },
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
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-transparent overflow-hidden">
      
      {/* Dynamic Keyframes for Seamless Loop with GPU Acceleration */}
      <style>{`
        @keyframes continuousInfiniteScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); } /* Exactly half the container width (14 slides) */
        }
        .animate-continuous-scroll {
          animation: continuousInfiniteScroll 50s linear infinite;
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

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-editorial text-veda-forest uppercase leading-tight tracking-widest drop-shadow-sm">
          Lifestyle & Amenities
        </h2>
      </div>

      {/* Auto Full-Screen Continuous Carousel */}
      <div 
        className="absolute inset-0 w-full h-full z-10 transition-opacity duration-1000 overflow-hidden flex items-center"
        style={{
          opacity: slideshowOpacity,
          display: slideshowOpacity === 0 ? 'none' : 'flex'
        }}
      >
        <div 
          className="flex animate-continuous-scroll w-max"
        >
          {duplicatedSlides.map((slide, i) => {
            // We use modulo for the slide number since we duplicated the array
            const slideIndex = i % slides.length;
            
            return (
              <div 
                key={i} 
                className="w-[85vw] md:w-[45vw] lg:w-[30vw] flex flex-col shrink-0 border-r-[4px] border-[#111111]/10"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Image Section */}
                <div className="relative w-full aspect-square overflow-hidden">
                  {/* Background image without ken burns since the camera is already panning */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      filter: 'brightness(0.95)'
                    }}
                  />
                </div>
                {/* Bottom Description Bar */}
                <div className="w-full h-24 md:h-28 bg-transparent flex flex-col justify-center px-6 md:px-8 shrink-0 text-left">
                  <span className="text-[10px] tracking-[0.2em] text-[#111111]/60 uppercase mb-1">
                    {slide.title}
                  </span>
                  <p className="text-[10px] text-[#111111]/90 font-sans leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
