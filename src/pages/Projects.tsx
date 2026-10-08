import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmenitiesSection from '../components/projects/AmenitiesSection';
import DesignReadyVillas from '../components/projects/DesignReadyVillas';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {



      // --- Storytelling Section Animation ---
      const stories = gsap.utils.toArray('.story-section');
      stories.forEach((story: any) => {
        const textContainer = story.querySelector('.story-text-container');
        const imgs = story.querySelectorAll('.story-img');
        
        // Initial setup for images
        gsap.set(imgs, { opacity: 0.85, scale: 1.04 });

        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: 'top 70%',
          }
        });

        // Text animation
        if (textContainer) {
          storyTl.to(textContainer, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0);
        }
        
        // Image animation (Opacity and Scale)
        if (imgs.length) {
          storyTl.to(imgs, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0);
        }

        // Subtle parallax effect on scroll
        gsap.to(imgs, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: story,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

    }, containerRef); // Scoped to the entire component

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#0a0a0a] text-white font-sans min-h-screen">
      
      {/* 01. Video Animation Placeholder */}
      <section className="w-full h-screen bg-[#111] flex items-center justify-center relative z-20 border-b border-white/10">
        <div className="flex flex-col items-center gap-4 opacity-50">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <p className="font-veda-sans text-[10px] tracking-[0.2em] uppercase text-white">
            Video Animation Sequence Reserved
          </p>
        </div>
      </section>

      {/* 02. DESIGN READY VILLAS */}
      <DesignReadyVillas />


      {/* Storytelling Section */}
      <section className="relative w-full bg-[#F9F8F6] text-[#1a1a1a] z-20 flex flex-col">
        
        {/* Story 01: THE LAND */}
        <div className="story-section w-full min-h-[90vh] grid grid-cols-1 md:grid-cols-2">
          {/* Mobile Image (Visible only on mobile) */}
          <div className="md:hidden w-full h-[55vh] overflow-hidden">
            <img src="/assets/images/veda_project_bg.jpg" alt="The Land" className="story-img w-full h-full object-cover" />
          </div>
          
          {/* Desktop Image (Left) */}
          <div className="hidden md:block w-full h-full overflow-hidden relative">
            <img src="/assets/images/veda_project_bg.jpg" alt="The Land" className="story-img absolute top-0 left-0 w-full h-[115%] -top-[7.5%] object-cover" />
          </div>
          
          {/* Text Content */}
          <div className="story-text-container flex flex-col justify-center px-8 md:px-[8vw] py-16 md:py-0 opacity-0 translate-y-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-veda-sans text-xs tracking-[0.2em] uppercase text-[#666]">The Land</span>
              <div className="h-px w-8 bg-[#d1cec7]"></div>
            </div>
            <h2 className="font-veda-serif text-3xl md:text-5xl lg:text-5xl text-[#2d2d2d] leading-[1.15] tracking-tight mb-8">
              Where your <br className="hidden lg:block"/> home begins.
            </h2>
            <p className="font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light max-w-[500px] mb-8">
              Before the architecture, there is the land. Generous green plots, considered planning and open surroundings create the foundation for a home that feels connected to its landscape.
            </p>
            
            {/* Project Details */}
            <div className="grid grid-cols-2 gap-y-3 font-veda-sans text-sm tracking-wide text-[#333] mb-12 max-w-[500px]">
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Total Land Area</div>
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Open Spaces</div>
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Number of Plots</div>
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Clubhouse</div>
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Internal Roads</div>
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Green Zones</div>
              <div className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-[#b89a6b]"></span> Landscaped Areas</div>
            </div>

            <span className="font-veda-sans text-xs tracking-[0.2em] text-[#888]">01 / 03</span>
          </div>
        </div>

        {/* Story 02: THE ARCHITECTURE */}
        <div className="story-section w-full min-h-[90vh] flex flex-col md:flex-row">
          {/* Mobile Image (Visible only on mobile, moved to top for mobile flow) */}
          <div className="md:hidden w-full h-[55vh] overflow-hidden order-1">
            <img src="/assets/images/veda_beyond_living.jpg" alt="The Architecture" className="story-img w-full h-full object-cover" />
          </div>
          
          {/* Text Content (Left on desktop, bottom on mobile) */}
          <div className="story-text-container w-full md:w-1/2 flex flex-col justify-center px-8 md:px-[8vw] py-16 md:py-0 order-2 md:order-1 opacity-0 translate-y-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-veda-sans text-xs tracking-[0.2em] uppercase text-[#666]">The Architecture</span>
              <div className="h-px w-8 bg-[#d1cec7]"></div>
            </div>
            <h2 className="font-veda-serif text-3xl md:text-5xl lg:text-6xl text-[#2d2d2d] leading-[1.15] tracking-tight mb-8">
              European character. <br className="hidden lg:block"/> Made for modern living.
            </h2>
            <p className="font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light max-w-[500px] mb-10">
              Drawing from the quiet elegance of European architecture, every home balances timeless proportions, natural materials and generous spaces with the way modern families live.
            </p>

            {/* Villa Types List */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-12 max-w-[600px]">
              {[
                "Villa Type A",
                "Villa Type B",
                "Villa Type C"
              ].map((villa, idx) => (
                <div key={idx} className="flex flex-col">
                  <h4 className="font-veda-sans text-xs tracking-[0.15em] uppercase text-[#2d2d2d] font-semibold mb-4 border-b border-[#e5e5e5] pb-2">{villa}</h4>
                  <ul className="flex flex-col gap-2 font-veda-sans text-[13px] tracking-wide text-[#555]">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#b89a6b]/60"></span> Front Elevation</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#b89a6b]/60"></span> Rear Elevation</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#b89a6b]/60"></span> Floor Plan</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#b89a6b]/60"></span> Built-up Area</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#b89a6b]/60"></span> Plot Size</li>
                  </ul>
                </div>
              ))}
            </div>

            <span className="font-veda-sans text-xs tracking-[0.2em] text-[#888]">02 / 03</span>
          </div>

          {/* Desktop Image (Right) */}
          <div className="hidden md:block w-full md:w-1/2 h-auto overflow-hidden relative order-2">
            <img src="/assets/images/veda_beyond_living.jpg" alt="The Architecture" className="story-img absolute top-0 left-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* Story 03: THE EXPERIENCE */}
        <div className="story-section w-full min-h-[90vh] grid grid-cols-1 md:grid-cols-2">
          {/* Mobile Image (Visible only on mobile) */}
          <div className="md:hidden w-full h-[55vh] overflow-hidden">
            <img src="/assets/images/bellagio/img326.jpg" alt="The Experience" className="story-img w-full h-full object-cover" />
          </div>
          
          {/* Desktop Image (Left) */}
          <div className="hidden md:block w-full h-full overflow-hidden relative">
            <img src="/assets/images/bellagio/img326.jpg" alt="The Experience" className="story-img absolute top-0 left-0 w-full h-full object-cover" />
          </div>
          
          {/* Text Content */}
          <div className="story-text-container flex flex-col justify-center px-8 md:px-[8vw] py-16 md:py-0 opacity-0 translate-y-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-veda-sans text-xs tracking-[0.2em] uppercase text-[#666]">The Experience</span>
              <div className="h-px w-8 bg-[#d1cec7]"></div>
            </div>
            <h2 className="font-veda-serif text-3xl md:text-5xl lg:text-6xl text-[#2d2d2d] leading-[1.15] tracking-tight mb-8">
              A home that <br className="hidden lg:block"/> feels complete.
            </h2>
            <p className="font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light max-w-[500px] mb-10">
              From the approach to the garden, from the architecture to the smallest detail, every element is brought together to create an experience that feels considered from the moment you arrive.
            </p>

            {/* Lifestyle & Amenities */}
            <div className="flex flex-col mb-12 max-w-[500px]">
              <h4 className="font-veda-sans text-xs tracking-[0.15em] uppercase text-[#2d2d2d] font-semibold mb-6 border-b border-[#e5e5e5] pb-2">Lifestyle & Amenities</h4>
              <div className="flex flex-col sm:flex-row flex-wrap gap-x-10 gap-y-4">
                {[
                  "Community",
                  "Wellness",
                  "Entertainment"
                ].map((category, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-px bg-[#b89a6b]/80"></div>
                    <span className="font-veda-sans text-[13px] tracking-[0.1em] uppercase text-[#555]">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <span className="font-veda-sans text-xs tracking-[0.2em] text-[#888]">03 / 03</span>
          </div>
        </div>

      </section>

      {/* 05. Lifestyle & Amenities Section */}
      <AmenitiesSection />
    </div>
  );
}
