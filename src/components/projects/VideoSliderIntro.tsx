import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { assetUrl } from '../../utils/assetUrl';

interface DesktopSlideItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  type: 'image' | 'video';
  aspectRatio: string;
  ctaPosition: {
    left: string;
    width: string;
    top: string;
    height: string;
    transform?: string;
  };
}

const desktopSlides: DesktopSlideItem[] = [
  { 
    id: '01', 
    src: assetUrl('/veda-project-hero.mp4'), 
    poster: assetUrl('/veda-project-hero.jpeg'),
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
    src: assetUrl('/veda-project-hero.jpeg'), 
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

/**
 * MobileHero
 * Dedicated mobile presentation displaying ONLY the mobile video (veda-project-hero-mobile.mp4)
 * with no carousel interactions, no unwanted slide advancement, and prominent GET PRICE & FLOOR PLANS CTAs.
 */
function MobileHero({ onOpenEnquiry }: { onOpenEnquiry: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.play().catch(() => {});

    const handleFirstTouch = () => {
      if (v.paused) {
        v.muted = true;
        v.play().catch(() => {});
      }
    };
    window.addEventListener('touchstart', handleFirstTouch, { once: true });
    window.addEventListener('click', handleFirstTouch, { once: true });
    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden z-20 flex flex-col items-center">
      {/* 9:16 Vertical Mobile Video Presentation */}
      <div 
        className="relative w-full max-w-[480px] mx-auto overflow-hidden bg-white select-none"
        style={{ aspectRatio: '1080 / 1920' }}
      >
        <video
          ref={videoRef}
          src={assetUrl('/veda-project-hero-mobile.mp4')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover block select-none pointer-events-none"
        />
      </div>

      {/* Clean, intentional Button Layout below the mobile video */}
      <div className="w-full bg-[#FAF8F5] py-4 px-5 flex flex-col items-center justify-center border-b border-black/[0.06] shadow-xs">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenEnquiry();
          }}
          className="w-full max-w-sm py-3.5 px-6 rounded-full bg-[#9e7138] hover:bg-[#88602c] active:bg-[#745023] text-white font-medium text-xs uppercase tracking-[0.16em] shadow-[0_4px_16px_rgba(158,113,56,0.35)] hover:shadow-[0_6px_22px_rgba(158,113,56,0.45)] border border-[#edd5a4]/60 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] select-none"
          aria-label="Get Price and Floor Plans"
        >
          <span className="font-codec font-semibold tracking-wider">GET PRICE &amp; FLOOR PLANS</span>
          <span className="text-sm font-bold">↗</span>
        </button>
      </div>
    </section>
  );
}

/**
 * DesktopHeroSlider
 * Full-fidelity desktop promotional slider with GSAP crossfades, navigation pill, and video synchronization.
 */
function DesktopHeroSlider({ onOpenEnquiry }: { onOpenEnquiry: () => void }) {
  const activeIndex = 0;
  const containerRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      desktopSlides.forEach((_, idx) => {
        const slide = slideRefs.current[idx];
        if (slide) {
          gsap.set(slide, { opacity: idx === 0 ? 1 : 0, zIndex: idx === 0 ? 10 : 1 });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === activeIndex) {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#ffffff] overflow-hidden z-20"
    >
      <div className="absolute inset-0 w-full h-full">
        {desktopSlides.map((slide, idx) => (
          <div
            key={slide.id}
            ref={el => slideRefs.current[idx] = el}
            className="absolute inset-0 w-full h-full bg-[#ffffff] flex items-center justify-center overflow-hidden"
            style={{ opacity: idx === 0 ? 1 : 0 }}
          >
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
                  preload={idx === 0 ? "metadata" : "none"}
                  className="w-full h-full object-contain select-none block"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.src}
                  alt={slide.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-contain select-none block"
                />
              )}

              {/* Desktop CTA Button */}
              <div
                className="absolute z-20 pointer-events-auto flex items-center justify-center"
                style={{
                  left: slide.ctaPosition.left,
                  width: slide.ctaPosition.width,
                  top: slide.ctaPosition.top,
                  height: slide.ctaPosition.height,
                  transform: slide.ctaPosition.transform,
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenEnquiry();
                  }}
                  className="relative w-full h-full flex items-center justify-center gap-1.5 md:gap-2 px-1.5 md:px-2
                             bg-[#9e7138] hover:bg-[#aa7d39] active:bg-[#94692f]
                             text-white font-medium uppercase tracking-[0.07em] md:tracking-[0.09em]
                             text-[8px] md:text-[8.5px] lg:text-[9.2px] xl:text-[9.8px]
                             rounded-[5px] md:rounded-[6px]
                             border border-[#edd5a4]/75
                             shadow-[0_2px_8px_rgba(164,119,52,0.20)]
                             hover:shadow-[0_3px_12px_rgba(164,119,52,0.35)]
                             hover:-translate-y-[1px] active:translate-y-0
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2
                             transition-all duration-300 ease-out select-none cursor-pointer group"
                  aria-label="Get Price & Floor Plans"
                >
                  <span className="whitespace-nowrap origin-center inline-block">
                    GET PRICE &amp; FLOOR PLANS
                  </span>
                  <svg
                    className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2 lg:h-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5 shrink-0"
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
    </section>
  );
}

export default function VideoSliderIntro() {
  const { openModal } = useEnquiryModal();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  return isMobile ? (
    <MobileHero onOpenEnquiry={openModal} />
  ) : (
    <DesktopHeroSlider onOpenEnquiry={openModal} />
  );
}
