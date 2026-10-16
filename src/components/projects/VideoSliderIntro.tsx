import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

interface SlideItem {
  id: string;
  src: string;
  title: string;
}

const slides: SlideItem[] = [
  { 
    id: '01', 
    src: '/veda-project01.jpeg', 
    title: 'The Privileged 42 • Veda Monteza'
  },
  { 
    id: '02', 
    src: '/veda-project02.jpeg', 
    title: "Who's Next Door? • Veda Monteza"
  }
];

export default function VideoSliderIntro() {
  const { openModal } = useEnquiryModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Setup initial GSAP states
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

  const goToSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === activeIndex) return;
    setIsTransitioning(true);

    const currentSlide = slideRefs.current[activeIndex];
    const nextSlide = slideRefs.current[newIndex];

    if (!currentSlide || !nextSlide) {
      setIsTransitioning(false);
      return;
    }

    // Prepare next slide
    gsap.set(nextSlide, { zIndex: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 1, opacity: 0 });
        gsap.set(nextSlide, { zIndex: 10 });
        setActiveIndex(newIndex);
        setIsTransitioning(false);
      }
    });

    // Smooth cinematic crossfade
    tl.fromTo(nextSlide,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
    );
    tl.to(currentSlide, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, '<');
  };

  const handleNext = () => goToSlide((activeIndex + 1) % slides.length);
  const handlePrev = () => goToSlide((activeIndex - 1 + slides.length) % slides.length);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#ffffff] overflow-hidden z-20 flex flex-col justify-end">

      {/* Full-Bleed Slides with High-Fidelity Rendering & CTA */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            ref={el => slideRefs.current[idx] = el}
            className="absolute inset-0 w-full h-full bg-[#ffffff] flex items-center justify-center overflow-hidden"
            style={{ opacity: idx === 0 ? 1 : 0 }}
          >
            {/* Aspect-ratio matched container ensuring CTA button tracks image layout across all screen sizes */}
            <div 
              className="relative flex items-center justify-center select-none"
              style={{
                aspectRatio: '1200 / 628',
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'calc(100vh * (1200 / 628))',
                height: 'auto',
              }}
            >
              <img
                src={slide.src}
                alt={slide.title}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-contain select-none block"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />

              {/* GET PRICE & FLOOR PLANS CTA Button */}
              <div
                className="absolute z-20 pointer-events-auto flex items-center justify-center"
                style={{
                  left: '61.6%',
                  width: '33.0%',
                  top: '73.2%',
                  height: '9.2%',
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                  className="w-full h-full flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 px-2 sm:px-4
                             bg-[#9e7138] hover:bg-[#aa7d39] active:bg-[#94692f]
                             text-white font-medium uppercase tracking-[0.11em] sm:tracking-[0.14em]
                             text-[7px] xs:text-[8.5px] sm:text-[10px] md:text-[11.5px] lg:text-[12.5px] xl:text-[13px]
                             rounded-[8px] sm:rounded-[11px] md:rounded-[14px]
                             border border-[#edd5a4]/75
                             shadow-[0_4px_18px_rgba(164,119,52,0.22)]
                             hover:shadow-[0_6px_22px_rgba(164,119,52,0.40)]
                             hover:-translate-y-[2px] active:translate-y-0
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2
                             transition-all duration-300 ease-out select-none cursor-pointer group"
                  aria-label="Get Price & Floor Plans"
                >
                  <span className="truncate">GET PRICE &amp; FLOOR PLANS</span>
                  <svg
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls Overlay */}
      <div className="relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-24 pb-6 sm:pb-8 md:pb-12 flex flex-row items-end justify-end pointer-events-auto">

        {/* Sleek Transparent Luxury Navigation */}
        <div className="flex items-center gap-3.5 bg-white/40 hover:bg-white/60 backdrop-blur-xl px-4 py-2 rounded-full border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
          <button
            onClick={handlePrev}
            className="group p-1 flex items-center justify-center transition-all duration-200 hover:-translate-x-0.5 active:scale-95 text-[#1f1f1f] hover:text-[#9b7b5a]"
            disabled={isTransitioning}
            aria-label="Previous Slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-colors">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isTransitioning}
                className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
                  idx === activeIndex 
                    ? 'w-7 bg-[#1f1f1f]' 
                    : 'w-3.5 bg-black/20 hover:bg-black/45'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group p-1 flex items-center justify-center transition-all duration-200 hover:translate-x-0.5 active:scale-95 text-[#1f1f1f] hover:text-[#9b7b5a]"
            disabled={isTransitioning}
            aria-label="Next Slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-colors">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
