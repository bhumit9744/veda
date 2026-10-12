import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const videos = [
  { 
    id: '01', 
    src: '/microsite-vedio1.mp4', 
    title: 'A life of Privilege.\nLimited to 42.'
  },
  { 
    id: '02', 
    src: '/microsite-vedio2.mp4', 
    title: 'A life of Privilege.\nLimited to 42.'
  }
];

export default function VideoSliderIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Setup initial GSAP states safely
  useEffect(() => {
    const ctx = gsap.context(() => {
      slideRefs.current.forEach((slide, idx) => {
        if (slide) {
          gsap.set(slide, { opacity: idx === 0 ? 1 : 0, zIndex: idx === 0 ? 10 : 1 });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle Playback State
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeIndex) {
          // Play the active video
          video.play().catch(e => console.log('Autoplay blocked:', e));
        } else {
          // Pause inactive video immediately
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  const goToSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === activeIndex) return;
    setIsTransitioning(true);

    const currentSlide = slideRefs.current[activeIndex];
    const nextSlide = slideRefs.current[newIndex];

    if (!currentSlide || !nextSlide) {
      setIsTransitioning(false);
      return;
    }

    // Prep next slide to be above the current one but invisible
    gsap.set(nextSlide, { zIndex: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 1, opacity: 0 });
        gsap.set(nextSlide, { zIndex: 10 });
        setActiveIndex(newIndex);
        setIsTransitioning(false);
      }
    });

    // Premium cinematic crossfade with a very subtle scale
    tl.fromTo(nextSlide,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' }
    );
    tl.to(currentSlide, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, "<");
  };

  const handleNext = () => goToSlide((activeIndex + 1) % videos.length);
  const handlePrev = () => goToSlide((activeIndex - 1 + videos.length) % videos.length);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden z-20 flex flex-col justify-end">

      {/* Video Slides */}
      <div className="absolute inset-0 w-full h-full">
        {videos.map((vid, idx) => (
          <div
            key={vid.id}
            ref={el => slideRefs.current[idx] = el}
            className="absolute inset-0 w-full h-full bg-[#0a0a0a]"
            style={{ opacity: idx === 0 ? 1 : 0 }}
          >
            <video
              ref={el => videoRefs.current[idx] = el}
              src={vid.src}
              className="w-full h-full object-cover opacity-95"
              muted
              playsInline
              loop
              preload={idx === 0 ? "auto" : "metadata"}
            />
          </div>
        ))}
      </div>

      {/* Content & Controls */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-24 pb-16 flex flex-row items-end justify-between pointer-events-auto">
        
        {/* Empty space for flex alignment, or you can place something else here */}
        <div></div>

        {/* Minimal Progress & Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            className="group p-2 flex items-center justify-center transition-transform hover:-translate-x-1"
            disabled={isTransitioning}
            aria-label="Previous Video"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/80 group-hover:text-white transition-colors">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isTransitioning}
                className={`h-px transition-all duration-500 ease-in-out ${idx === activeIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/80'}`}
                aria-label={`Go to video ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group p-2 flex items-center justify-center transition-transform hover:translate-x-1"
            disabled={isTransitioning}
            aria-label="Next Video"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/80 group-hover:text-white transition-colors">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

      </div>

    </section>
  );
}
