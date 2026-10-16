import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EnquireButton from '../common/EnquireButton';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.loc-fade').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const googleMapsUrl = "https://www.google.com/maps/place/Veda+Life+Spaces/@18.7230031,72.9024155,785m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be8775acf11c0ad:0xbc9ddc948e3bcd7e!8m2!3d18.7230031!4d72.9024155!16s%2Fg%2F11yxqld22c?hl=en&entry=ttu";
  const embedUrl = "https://maps.google.com/maps?q=18.7230031,72.9024155&hl=en&z=15&output=embed";

  const renderListItem = (name: string, time: string) => (
    <div className="group flex items-center justify-between py-2 border-b border-black/[0.06] last:border-b-0 hover:bg-black/[0.02] -mx-1.5 px-1.5 rounded transition-colors">
      <span className="font-codec text-xs sm:text-[13px] text-[#2d2d2d] font-normal tracking-wide group-hover:text-[#9b7b5a] transition-colors truncate pr-2">
        {name}
      </span>
      <span className="font-codec text-[11px] sm:text-xs text-[#7c7365] font-medium tracking-wider tabular-nums whitespace-nowrap">
        {time}
      </span>
    </div>
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#f1f3ec] py-20 md:py-28 z-20 relative font-codec">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Intro - Centered & Refined */}
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto loc-fade">
          <span className="font-codec text-xs uppercase tracking-[0.25em] text-[#9b7b5a] font-semibold block mb-3">
            Location & Connectivity
          </span>
          <h2 className="font-codec text-3xl md:text-5xl lg:text-5xl text-[#2d2d2d] font-normal leading-[1.15] tracking-tight mb-4">
            A Privileged Location.<br />
            <span className="italic font-light text-[#555]">For the Privileged 42.</span>
          </h2>
          <p className="font-codec text-sm md:text-base text-[#666] max-w-xl mx-auto leading-relaxed font-light">
            Secluded in Mapgaon, Alibaug — positioned with effortless proximity to tranquil beaches, luxury resorts, and key transit hubs.
          </p>
        </div>

        {/* Side-by-Side 50/50 Layout: Directory Card (Left Half) + Map Card (Right Half) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* 1. Destinations & Distance Directory Card (Left Half) */}
          <div className="w-full h-full loc-fade flex flex-col">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-black/[0.06] shadow-xs flex flex-col justify-between h-full">
              
              {/* Header Bar */}
              <div className="pb-5 mb-6 border-b border-black/[0.06]">
                <h3 className="font-codec text-2xl md:text-3xl text-[#2d2d2d] font-normal tracking-tight">
                  Destinations & Distance
                </h3>
                <p className="font-codec text-xs md:text-sm text-[#777] mt-1 font-light">
                  Travel times calculated from Codename Bellagio
                </p>
              </div>

              {/* Balanced 2-Column Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-6 flex-grow">
                
                {/* Left Sub-Column: Tourism + Transport + Markets (7 items total) */}
                <div className="flex flex-col gap-5">
                  
                  {/* Category 1: Tourism & Lifestyle */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#9b7b5a]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b7b5a]"></span>
                      <h4 className="font-codec text-[11px] tracking-[0.2em] uppercase text-[#9b7b5a] font-semibold">
                        Tourism & Lifestyle
                      </h4>
                    </div>
                    <div className="flex flex-col">
                      {renderListItem('Kihim Beach', '7 Mins.')}
                      {renderListItem('Awas Beach', '13 Mins.')}
                      {renderListItem('Alibaug Beach', '13 Mins.')}
                    </div>
                  </div>

                  {/* Category 2: Transport & Transit */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#9b7b5a]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b7b5a]"></span>
                      <h4 className="font-codec text-[11px] tracking-[0.2em] uppercase text-[#9b7b5a] font-semibold">
                        Transport
                      </h4>
                    </div>
                    <div className="flex flex-col">
                      {renderListItem('Mandwa Jetty', '22 Mins.')}
                      {renderListItem('Navi Mumbai Airport', '1 hr. 50 Mins.')}
                    </div>
                  </div>

                  {/* Category 3: Markets & Essentials */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#9b7b5a]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b7b5a]"></span>
                      <h4 className="font-codec text-[11px] tracking-[0.2em] uppercase text-[#9b7b5a] font-semibold">
                        Markets & Essentials
                      </h4>
                    </div>
                    <div className="flex flex-col">
                      {renderListItem('Chondhi Bazaar', '7 Mins.')}
                      {renderListItem('Alibag Market', '13 Mins.')}
                    </div>
                  </div>

                </div>

                {/* Right Sub-Column: Hotels & Resorts (6 items) */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#9b7b5a]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b7b5a]"></span>
                      <h4 className="font-codec text-[11px] tracking-[0.2em] uppercase text-[#9b7b5a] font-semibold">
                        Hotels & Resorts
                      </h4>
                    </div>
                    <div className="flex flex-col">
                      {renderListItem('Tropicana Resort & Spa', '4 Mins.')}
                      {renderListItem('Outpost at Alibag', '4 Mins.')}
                      {renderListItem('Kiki Restobar', '19 Mins.')}
                      {renderListItem('Taj Hotel', '23 Mins.')}
                      {renderListItem('Aparanta', '23 Mins.')}
                      {renderListItem('Boardwalk by Flamboyante', '26 Mins.')}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Balancer Note */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#888]">
                <span className="font-codec">Alibaug Coastal Belt</span>
                <span className="font-codec text-[#9b7b5a] font-medium">All timings approximate</span>
              </div>

            </div>
          </div>

          {/* 2. Interactive Map Card (Right Half) */}
          <div className="w-full h-full min-h-[520px] loc-fade flex flex-col">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs bg-[#e8e6e1] relative flex flex-col justify-between">
              
              {/* Floating Pin Badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-black/[0.06] shadow-xs flex items-center gap-2.5 pointer-events-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9b7b5a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9b7b5a]"></span>
                </span>
                <span className="font-codec text-xs font-medium text-[#2d2d2d] tracking-wide">
                  Codename Bellagio • Mapgaon, Alibaug
                </span>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full flex-grow min-h-[440px]">
                <iframe
                  title="Veda Life Spaces Location"
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[102%]"
                ></iframe>
              </div>

              {/* Map Footer Bar */}
              <div className="bg-white/95 backdrop-blur-md px-6 py-4 border-t border-black/[0.06] flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-xs text-[#777]">
                  <svg className="w-3.5 h-3.5 text-[#9b7b5a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-codec font-mono">18.7230° N, 72.9024° E</span>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-codec text-xs uppercase tracking-[0.15em] text-[#2d2d2d] hover:text-[#9b7b5a] font-semibold inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>Open in Google Maps</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#9b7b5a]">↗</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Location Enquiry CTA Banner */}
        <div className="mt-12 md:mt-16 text-center loc-fade">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white/80 backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border border-black/[0.06] shadow-sm max-w-2xl mx-auto">
            <span className="font-codec text-xs sm:text-sm text-[#444] font-medium tracking-wide text-center sm:text-left">
              Plan your private visit to experience the scenic Alibaug location in person.
            </span>
            <EnquireButton text="ENQUIRE NOW" variant="primary" className="whitespace-nowrap flex-shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
