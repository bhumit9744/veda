import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DestinationItem {
  name: string;
  time: string;
}

interface DestinationGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: DestinationItem[];
}

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.loc-fade').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const googleMapsUrl = "https://www.google.com/maps/place/Veda+Life+Spaces/@18.7230031,72.9024155,785m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be8775acf11c0ad:0xbc9ddc948e3bcd7e!8m2!3d18.7230031!4d72.9024155!16s%2Fg%2F11yxqld22c?hl=en&entry=ttu";
  const embedUrl = "https://maps.google.com/maps?q=18.7230031,72.9024155&hl=en&z=15&output=embed";

  const destinationGroups: DestinationGroup[] = [
    {
      id: 'tourism',
      title: 'Tourism & Lifestyle',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#8C6F4B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      items: [
        { name: 'Kihim Beach', time: '7 Mins.' },
        { name: 'Awas Beach', time: '13 Mins.' },
        { name: 'Alibaug Beach', time: '13 Mins.' },
      ]
    },
    {
      id: 'hotels',
      title: 'Hotels & Resorts',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#8C6F4B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 7h1" /><path d="M9 11h1" /><path d="M9 15h1" />
          <path d="M14 7h1" /><path d="M14 11h1" /><path d="M14 15h1" />
        </svg>
      ),
      items: [
        { name: 'Tropicana Resort & Spa', time: '4 Mins.' },
        { name: 'Outpost at Alibag', time: '4 Mins.' },
        { name: 'Kiki Restobar', time: '19 Mins.' },
        { name: 'Taj Hotel', time: '23 Mins.' },
        { name: 'Aparanta', time: '23 Mins.' },
        { name: 'Boardwalk by Flamboyante', time: '26 Mins.' },
      ]
    },
    {
      id: 'transport',
      title: 'Transport',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#8C6F4B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
      items: [
        { name: 'Mandwa Jetty', time: '22 Mins.' },
        { name: 'Navi Mumbai Airport', time: '1 hr. 50 Mins.' },
      ]
    },
    {
      id: 'markets',
      title: 'Markets & Essentials',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#8C6F4B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      items: [
        { name: 'Chondhi Bazaar', time: '7 Mins.' },
        { name: 'Alibag Market', time: '13 Mins.' },
      ]
    }
  ];

  const renderListItem = (name: string, time: string) => (
    <div 
      key={name}
      className="group flex items-center justify-between py-1.5 border-b border-black/[0.04] last:border-b-0 hover:bg-black/[0.015] -mx-1 px-1 sm:-mx-1.5 sm:px-1.5 rounded transition-colors gap-2"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
        <span className="w-1 h-1 rounded-full bg-[#8C6F4B]/50 group-hover:bg-[#8C6F4B] transition-colors shrink-0" />
        <span className="font-codec text-xs sm:text-[13px] text-[#2c2b29] font-normal tracking-wide group-hover:text-[#8C6F4B] transition-colors leading-snug truncate">
          {name}
        </span>
      </div>
      <span className="font-codec text-[11px] sm:text-xs text-[#8C6F4B] font-medium tracking-wider tabular-nums whitespace-nowrap shrink-0">
        {time}
      </span>
    </div>
  );

  const renderCategoryBlock = (group: DestinationGroup) => (
    <div key={group.id} className="flex flex-col">
      <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-[#8C6F4B]/20">
        <span className="shrink-0">{group.icon}</span>
        <h4 className="font-codec text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#8C6F4B] font-semibold">
          {group.title}
        </h4>
      </div>
      <div className="flex flex-col">
        {group.items.map(item => renderListItem(item.name, item.time))}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#FAF8F5] pt-10 sm:pt-14 md:pt-18 lg:pt-20 pb-8 sm:pb-10 md:pb-14 z-20 relative font-codec"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* Section Intro - Editorial & Balanced */}
        <div className="text-center mb-7 sm:mb-9 md:mb-12 max-w-3xl mx-auto loc-fade">
          <span className="font-codec text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6F4B] font-semibold block mb-2 sm:mb-2.5">
            Location & Connectivity
          </span>
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] text-[#1f1f1f] font-normal leading-[1.12] tracking-tight mb-2.5 sm:mb-3"
          >
            A Privileged Location.
            <span className="block italic font-normal text-[#8C6F4B] text-xl sm:text-2xl md:text-3xl lg:text-[36px] mt-1">
              For the Privileged 42.
            </span>
          </h2>
          <p className="font-codec text-xs sm:text-sm md:text-base text-[#666] max-w-xl mx-auto leading-relaxed font-light">
            Nestled in Mapgaon, Alibaug — where serene beaches, distinguished retreats, and key coastal transit hubs meet in secluded harmony.
          </p>
        </div>

        {/* Side-by-Side 50/50 Layout: Directory Card (Left) + Interactive Map Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-9 items-stretch">
          
          {/* 1. Destinations & Distance Directory Card (Left Half) */}
          <div className="w-full h-full loc-fade flex flex-col">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-7 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
              
              {/* Header Bar */}
              <div className="pb-3.5 mb-4 border-b border-black/[0.06] flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-codec text-lg sm:text-xl md:text-2xl text-[#1f1f1f] font-normal tracking-tight">
                    Destinations & Distance
                  </h3>
                  <p className="font-codec text-xs text-[#706a61] mt-0.5 font-light">
                    Travel times calculated from Veda Monteza
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#8C6F4B]/10 text-[#8C6F4B] text-[10px] font-medium tracking-wider uppercase border border-[#8C6F4B]/20">
                  Alibaug Guide
                </span>
              </div>

              {/* Mobile Single Column (< sm) */}
              <div className="flex flex-col gap-4 sm:hidden flex-grow">
                {destinationGroups.map(renderCategoryBlock)}
              </div>

              {/* Tablet & Desktop 2-Column Balanced Grid (>= sm) */}
              <div className="hidden sm:grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-5 flex-grow">
                {/* Column 1: Tourism & Lifestyle + Transport + Markets & Essentials */}
                <div className="flex flex-col gap-5">
                  {renderCategoryBlock(destinationGroups[0])}
                  {renderCategoryBlock(destinationGroups[2])}
                  {renderCategoryBlock(destinationGroups[3])}
                </div>

                {/* Column 2: Hotels & Resorts */}
                <div className="flex flex-col">
                  {renderCategoryBlock(destinationGroups[1])}
                </div>
              </div>

              {/* Bottom Balancer Note */}
              <div className="mt-5 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#706a61] flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C6F4B]"></span>
                  <span className="font-codec">Mapgaon, Coastal Alibaug</span>
                </div>
                <span className="font-codec text-[#8C6F4B] font-medium text-[11px]">All timings approximate</span>
              </div>

            </div>
          </div>

          {/* 2. Interactive Google Maps Card (Right Half) */}
          <div className="w-full h-auto min-h-[300px] sm:min-h-[360px] lg:min-h-0 lg:h-full loc-fade flex flex-col">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] bg-[#e8e6e1] relative flex flex-col justify-between">
              
              {/* Floating Pin Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-black/[0.06] shadow-xs flex items-center gap-1.5 sm:gap-2 pointer-events-none max-w-[calc(100%-24px)]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C6F4B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C6F4B]"></span>
                </span>
                <span className="font-codec text-[10px] sm:text-xs font-medium text-[#1f1f1f] tracking-wide truncate">
                  Veda Monteza • Mapgaon, Alibaug
                </span>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[420px] lg:flex-grow">
                <iframe
                  title="Veda Life Spaces Location"
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full grayscale-[18%] contrast-[102%] brightness-[99%]"
                ></iframe>
              </div>

              {/* Map Footer Bar */}
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-3 border-t border-black/[0.06] flex items-center justify-between z-10 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#6e685f]">
                  <svg className="w-3.5 h-3.5 text-[#8C6F4B] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-codec font-mono text-[10px] sm:text-xs">18.7230° N, 72.9024° E</span>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-codec text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#1f1f1f] hover:text-[#8C6F4B] font-semibold inline-flex items-center gap-1 sm:gap-1.5 transition-colors group shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8C6F4B]">↗</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Restrained Editorial Transition into Buy · Build · Sell */}
        <div className="mt-10 sm:mt-12 md:mt-16 flex items-center justify-center gap-3 loc-fade">
          <div className="h-px w-10 sm:w-14 bg-[#8C6F4B]/20"></div>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C6F4B]/40"></span>
          <div className="h-px w-10 sm:w-14 bg-[#8C6F4B]/20"></div>
        </div>

      </div>
    </section>
  );
}
