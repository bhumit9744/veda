import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Add staggered animations for lists and headings
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.loc-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const googleMapsUrl = "https://www.google.com/maps/place/Veda+Life+Spaces/@18.7230031,72.9024155,785m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be8775acf11c0ad:0xbc9ddc948e3bcd7e!8m2!3d18.7230031!4d72.9024155!16s%2Fg%2F11yxqld22c?hl=en&entry=ttu";
  const embedUrl = "https://maps.google.com/maps?q=18.7230031,72.9024155&hl=en&z=15&output=embed";

  const renderListItem = (name: string, time?: string) => (
    <div className="flex items-baseline justify-between py-2 loc-fade">
      <span className="font-veda-sans text-sm md:text-base text-[#444] whitespace-nowrap">{name}</span>
      {time && (
        <>
          <div className="flex-grow mx-4 border-b border-dotted border-[#aaa] opacity-60"></div>
          <span className="font-veda-sans text-sm md:text-base text-[#444] whitespace-nowrap text-right">{time}</span>
        </>
      )}
    </div>
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#f1f3ec] py-24 md:py-32 z-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Intro */}
        <div className="text-center mb-24 max-w-3xl mx-auto loc-fade">
          <h2 className="font-veda-serif text-3xl md:text-5xl lg:text-6xl text-[#2d2d2d] leading-[1.1] tracking-tight mb-8">
            A Privileged Location.<br />For the Privileged 42.
          </h2>
          <p className="font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light mb-6">

          </p>
          <p className="font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light">

          </p>
        </div>

        {/* Side by side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column - Details (55% ~ 7 cols) */}
          <div className="lg:col-span-7 w-full">
            <h3 className="font-veda-serif text-3xl md:text-4xl text-[#2d2d2d] mb-12 tracking-tight loc-fade text-left">
              Project Location
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-12">
              
              {/* Inner Left Column */}
              <div className="flex flex-col gap-12">
                {/* Category 1: Tourism */}
                <div>
                  <h4 className="font-veda-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#b89a6b] font-semibold mb-6 loc-fade">
                    TOURISM AND LIFESTYLE
                  </h4>
                  <div className="flex flex-col gap-1">
                    {renderListItem('Kihim Beach', '7 Mins.')}
                    {renderListItem('Awas Beach', '13 Mins.')}
                    {renderListItem('Alibaug Beach', '13 Mins.')}
                  </div>
                </div>

                <div className="h-px w-full bg-[#dce0d6] loc-fade"></div>

                {/* Category 2: Transport */}
                <div>
                  <h4 className="font-veda-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#b89a6b] font-semibold mb-6 loc-fade">
                    TRANSPORT
                  </h4>
                  <div className="flex flex-col gap-1">
                    {renderListItem('Mandwa Jetty', '22 Mins.')}
                    {renderListItem('Navi Mumbai')}
                    {renderListItem('International Airport', '1 hr. 50 Mins.')}
                  </div>
                </div>
              </div>

              {/* Inner Right Column */}
              <div className="flex flex-col gap-12">
                {/* Category 3: Hotels */}
                <div>
                  <h4 className="font-veda-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#b89a6b] font-semibold mb-6 loc-fade">
                    HOTELS AND RESORTS
                  </h4>
                  <div className="flex flex-col gap-1">
                    {renderListItem('Tropicana Resort & Spa', '4 Mins.')}
                    {renderListItem('Outpost at Alibag', '4 Mins.')}
                    {renderListItem('Kiki Restobar', '19 Mins.')}
                    {renderListItem('Tai Hotel', '23 Mins.')}
                    {renderListItem('Aparanta', '23 Mins.')}
                    {renderListItem('Boardwalk by flamboyante', '26 Mins.')}
                  </div>
                </div>

                <div className="h-px w-full bg-[#dce0d6] loc-fade"></div>

                {/* Category 4: Markets */}
                <div>
                  <h4 className="font-veda-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#b89a6b] font-semibold mb-6 loc-fade">
                    MARKETS AND ESSENTIALS
                  </h4>
                  <div className="flex flex-col gap-1">
                    {renderListItem('Chondhi Bazaar', '7 Mins.')}
                    {renderListItem('Alibag Market', '13 Mins.')}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Map (45% ~ 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start loc-fade w-full mt-4 lg:mt-0">
            <div className="w-full h-[400px] lg:h-[650px] min-h-[400px] rounded-sm overflow-hidden border border-black/5 shadow-xl bg-[#e5e3df] relative mb-8">
              <iframe
                title="Veda Life Spaces Location"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[20%] contrast-100"
              ></iframe>
              <div className="absolute inset-0 bg-[#f1f3ec]/5 pointer-events-none mix-blend-overlay"></div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 pb-2 border-b border-[#2d2d2d]/30 hover:border-[#2d2d2d] transition-colors duration-300 w-fit"
            >
              <span className="font-veda-sans text-xs md:text-sm tracking-[0.15em] uppercase text-[#2d2d2d] font-semibold">
                OPEN IN GOOGLE MAPS
              </span>
              <span className="text-[#2d2d2d] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
