import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

interface SlideItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  type: 'image' | 'video';
  aspectRatio: string;
  ctaPosition?: {
    left: string;
    width: string;
    top: string;
    height: string;
  };
}

const slides: SlideItem[] = [
  { 
    id: '01', 
    src: '/veda-project-hero.jpeg', 
    poster: '/veda-project01.jpeg',
    title: 'The Privileged 42 • Veda Monteza',
    type: 'video',
    aspectRatio: '1200 / 628',
    ctaPosition: {
      left: '67.9%',
      width: '21.0%',
      top: '78.6%',
      height: '5.2%',
    }
  },
  { 
    id: '02', 
    src: '/veda-project02.jpeg', 
    title: "Who's Next Door? • Veda Monteza",
    type: 'image',
    aspectRatio: '1200 / 628',
    ctaPosition: {
      left: '67.9%',
      width: '21.0%',
      top: '78.6%',
      height: '5.2%',
    }
  }
];

export default function VideoSliderIntro() {
  const { openModal } = useEnquiryModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  // Ensure active video plays reliably across all browsers
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === activeIndex) {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy fallback: resume on user gesture
          });
        }
      } else {
        v.pause();
      }
    });
  }, [activeIndex]);

  // First user interaction unlock listener in case of strict autoplay policies
  useEffect(() => {
    const unlockAutoplay = () => {
      const activeVideo = videoRefs.current[activeIndex];
      if (activeVideo && activeVideo.paused) {
        activeVideo.muted = true;
        activeVideo.play().catch(() => {});
      }
    };

    window.addEventListener('click', unlockAutoplay, { once: true });
    window.addEventListener('touchstart', unlockAutoplay, { once: true });
    return () => {
      window.removeEventListener('click', unlockAutoplay);
      window.removeEventListener('touchstart', unlockAutoplay);
    };
  }, [activeIndex]);

  const goToSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === activeIndex) return;
    setIsTransitioning(true);

    const currentSlide = slideRefs.current[activeIndex];
    const nextSlide = slideRefs.current[newIndex];
    const nextVideo = videoRefs.current[newIndex];

    if (!currentSlide || !nextSlide) {
      setIsTransitioning(false);
      return;
    }

    // Immediately start playing incoming video so crossfade is seamless
    if (nextVideo) {
      nextVideo.muted = true;
      nextVideo.defaultMuted = true;
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }

    // Prepare next slide
    gsap.set(nextSlide, { zIndex: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 1, opacity: 0 });
        gsap.set(nextSlide, { zIndex: 10 });
        const prevVideo = videoRefs.current[activeIndex];
        if (prevVideo && prevVideo !== nextVideo) {
          prevVideo.pause();
        }
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
            {/* Aspect-ratio matched container ensuring CTA button tracks image/video layout across all screen sizes */}
            <div 
              className="relative flex items-center justify-center select-none"
              style={{
                aspectRatio: slide.aspectRatio,
                maxWidth: '100%',
                maxHeight: '100%',
                width: `calc(100vh * (${slide.aspectRatio}))`,
                height: 'auto',
              }}
            >
              {slide.type === 'video' ? (
                <video
                  ref={el => {
                    if (el) {
                      el.muted = true;
                      el.defaultMuted = true;
                      el.playsInline = true;
                      videoRefs.current[idx] = el;
                      if (idx === activeIndex) {
                        el.play().catch(() => {});
                      }
                    }
                  }}
                  src={slide.src}
                  poster={slide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain select-none block"
                >
                  <source src="/veda-project-hero.mp4" type="video/mp4" />
                  <source src={slide.src} />
                </video>
              ) : (
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
              )}

              {/* GET PRICE & FLOOR PLANS CTA Button */}
              {slide.ctaPosition && (
                <div
                  className="absolute z-20 pointer-events-auto flex items-center justify-center"
                  style={{
                    left: slide.ctaPosition.left,
                    width: slide.ctaPosition.width,
                    top: slide.ctaPosition.top,
                    height: slide.ctaPosition.height,
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                    className="w-full h-full flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-1 sm:px-1.5 md:px-2
                               bg-[#9e7138] hover:bg-[#aa7d39] active:bg-[#94692f]
                               text-white font-medium uppercase tracking-[0.05em] sm:tracking-[0.07em] md:tracking-[0.09em]
                               text-[5px] xs:text-[6px] sm:text-[7.5px] md:text-[8.5px] lg:text-[9.2px] xl:text-[9.8px]
                               rounded-[4px] sm:rounded-[5px] md:rounded-[6px]
                               border border-[#edd5a4]/75
                               shadow-[0_2px_8px_rgba(164,119,52,0.20)]
                               hover:shadow-[0_3px_12px_rgba(164,119,52,0.35)]
                               hover:-translate-y-[1px] active:translate-y-0
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2
                               transition-all duration-300 ease-out select-none cursor-pointer group"
                    aria-label="Get Price & Floor Plans"
                  >
                    <span className="whitespace-nowrap scale-[0.8] sm:scale-100 origin-center inline-block">
                      GET PRICE &amp; FLOOR PLANS
                    </span>
                    <svg
                      className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2 lg:h-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5 shrink-0"
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
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
