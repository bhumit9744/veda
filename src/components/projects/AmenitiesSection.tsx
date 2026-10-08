import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

const amenities = [
  {
    category: 'COMMUNITY',
    title: 'The Clubhouse',
    desc: 'A place to gather, connect and spend time together.',
    image: '/assets/images/bellagio/img102.jpg'
  },
  {
    category: 'COMMUNITY',
    title: 'Landscaped Gardens',
    desc: 'Generous green spaces designed for quiet reflection and community life.',
    image: '/assets/images/bellagio/img326.jpg'
  },
  {
    category: 'WELLNESS',
    title: 'Swimming Pool',
    desc: 'A serene environment for relaxation and daily wellness.',
    image: '/assets/images/veda_beyond_living.jpg'
  },
  {
    category: 'WELLNESS',
    title: 'Fitness & Yoga',
    desc: 'Dedicated spaces for movement, health and personal wellbeing.',
    image: '/assets/images/bellagio/img228.jpg'
  },
  {
    category: 'ENTERTAINMENT',
    title: 'Outdoor Dining',
    desc: 'Perfectly framed settings for evening gatherings and celebrations.',
    image: '/assets/images/bellagio/img264.jpg'
  },
  {
    category: 'ENTERTAINMENT',
    title: 'Leisure & Recreation',
    desc: 'Curated spaces for relaxation and unstructured leisure time.',
    image: '/assets/images/veda_project_bg.jpg'
  }
];

export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCat, setActiveCat] = useState('COMMUNITY');
  
  // Store the autoScroll tween so we can control it from buttons
  const autoScrollRef = useRef<gsap.core.Tween | null>(null);
  const totalWidthRef = useRef(0);
  const resumeTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !containerRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Entrance Animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      tl.fromTo('.amenities-header', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.amenity-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );

      // 2. Seamless Infinite Loop Setup
      const track = trackRef.current;
      if (!track) return;
      
      const cards = gsap.utils.toArray('.amenity-card-wrapper');
      // Calculate total width of one set of cards
      // We assume gap is 24px (1.5rem)
      let totalWidth = 0;
      // We will just animate the track x to -50% since we duplicated the array exactly once.
      // But for Draggable with wrap, we need exact pixel bounds.
      
      const updateWidths = () => {
        totalWidth = track.scrollWidth / 2;
      };
      
      updateWidths();
      window.addEventListener('resize', updateWidths);

      // Create the auto-play tween
      // Speed: ~25px per second. Duration = totalWidth / 25
      const speed = 25;
      let duration = totalWidth / speed;

      const autoScroll = gsap.to(track, {
        x: `-=${totalWidth}`,
        ease: 'none',
        duration: duration,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return parseFloat(x) % totalWidth; 
          })
        }
      });
      autoScrollRef.current = autoScroll;
      totalWidthRef.current = totalWidth;

      const pauseAutoScroll = () => {
        autoScroll.pause();
        clearTimeout(resumeTimeoutRef.current);
      };

      const resumeAutoScroll = () => {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
          if (autoScrollRef.current) autoScrollRef.current.play();
        }, 2000);
      };

      // Hover interaction
      track.addEventListener('mouseenter', () => {
        gsap.to(autoScroll, { timeScale: 0.3, duration: 0.5 });
      });
      track.addEventListener('mouseleave', () => {
        if (!Draggable.get(track)?.isDragging) {
          gsap.to(autoScroll, { timeScale: 1, duration: 0.5 });
        }
      });

      // 3. Draggable Setup
      Draggable.create(track, {
        type: 'x',
        inertia: true,
        onPress: pauseAutoScroll,
        onDragStart: pauseAutoScroll,
        onDrag: function() {
           // Ensure it wraps seamlessly when dragging
           this.x = this.x % totalWidth;
        },
        onThrowUpdate: function() {
           this.x = this.x % totalWidth;
        },
        onRelease: resumeAutoScroll,
        onThrowComplete: resumeAutoScroll,
      });

      return () => {
        window.removeEventListener('resize', updateWidths);
        clearTimeout(resumeTimeoutRef.current);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (cat: string) => {
    setActiveCat(cat);
    
    let targetIndex = 0;
    if (cat === 'WELLNESS') targetIndex = 2;
    if (cat === 'ENTERTAINMENT') targetIndex = 4;

    const track = trackRef.current;
    if (!track) return;

    // Pause auto-scroll
    if (autoScrollRef.current) {
      autoScrollRef.current.pause();
      clearTimeout(resumeTimeoutRef.current);
    }

    // Calculate step width
    const cards = track.querySelectorAll('.amenity-card-wrapper');
    if (cards.length > 0) {
      const firstCard = cards[0] as HTMLElement;
      // offsetWidth + gap. Using purely DOM to get gap:
      const gap = window.innerWidth >= 768 ? 32 : 24; // md:gap-8 (32px), mobile gap-6 (24px)
      const step = firstCard.offsetWidth + gap;
      let targetX = -(targetIndex * step);
      
      // Ensure targetX wraps properly within the bounds
      targetX = targetX % totalWidthRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          // Resume auto-scroll after transition
          resumeTimeoutRef.current = setTimeout(() => {
            if (autoScrollRef.current) autoScrollRef.current.play();
          }, 2000);
        }
      });

      // Cinematic transition: opacity + scale down, move, scale up + opacity
      tl.to('.amenity-card-wrapper', { scale: 0.95, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
        .to(track, { x: targetX, duration: 0.6, ease: 'power3.inOut' }, '-=0.1')
        .to('.amenity-card-wrapper', { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.2');
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F9F8F6] text-[#1a1a1a] z-20 flex flex-col py-24 md:py-32 overflow-hidden">
      
      {/* Intro Header */}
      <div className="amenities-header w-full px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-veda-sans text-xs tracking-[0.2em] uppercase text-[#666]">05 / Lifestyle & Amenities</span>
          <div className="h-px w-8 bg-[#d1cec7]"></div>
        </div>
        <h2 className="font-veda-serif text-3xl md:text-5xl lg:text-6xl text-[#2d2d2d] leading-[1.1] tracking-tight mb-8">
          BUILT AROUND THE <br className="hidden md:block"/> WAY YOU LIVE.
        </h2>
        <p className="font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light max-w-[500px]">
          More than a home, a considered environment for everyday life — from quiet mornings and wellness to time spent together.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="amenities-nav flex items-center gap-8 md:gap-12 px-6 md:px-12 lg:px-24 mb-10 md:mb-16 opacity-0 translate-y-5">
        {['COMMUNITY', 'WELLNESS', 'ENTERTAINMENT'].map((cat) => (
          <button 
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`font-veda-sans text-[11px] md:text-xs tracking-[0.15em] uppercase pb-2 border-b-2 transition-all duration-300 ${
              activeCat === cat 
                ? 'border-[#738276] text-[#2d2d2d] font-semibold' 
                : 'border-transparent text-[#888] hover:text-[#555]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative w-full cursor-grab active:cursor-grabbing pl-6 md:pl-12 lg:pl-24 select-none"
      >
        <div 
          ref={trackRef}
          className="flex w-max gap-6 md:gap-8"
          style={{ willChange: 'transform' }}
        >
          {/* Duplicate array once to create the seamless loop */}
          {[...amenities, ...amenities].map((item, idx) => (
            <div 
              key={idx} 
              className="amenity-card-wrapper flex-shrink-0 w-[78vw] md:w-[32vw] h-[55vh]"
            >
              <div className="amenity-card w-full h-full bg-[#F9F8F6] flex flex-col overflow-hidden relative">
                {/* Image */}
                <div className="w-full h-[75%] rounded-[4px] overflow-hidden relative mb-5">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="w-full flex flex-col px-2">
                  <span className="font-veda-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#738276] font-semibold mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-veda-serif text-xl md:text-2xl text-[#2d2d2d] mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-veda-sans text-xs md:text-sm text-[#666] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
