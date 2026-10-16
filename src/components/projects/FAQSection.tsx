import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: React.ReactNode;
}

export default function FAQSection() {
  const { openModal } = useEnquiryModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
    // Recompute ScrollTrigger after DOM height change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 360);
  };

  const handleOpenModal = () => {
    openModal();
  };

  const handleScheduleVisit = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('enquiry-section') || document.querySelector('form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqItems: FAQItem[] = [
    {
      id: 'faq-01',
      number: '01',
      question: 'What makes Veda Life Spaces villas unique?',
      answer: (
        <p className="leading-relaxed">
          Veda Life Spaces focuses on thoughtfully planned, design-ready villa plots in Alibaug,
          combining a premium lifestyle setting with an emphasis on clear-title land, legal verification,
          planned infrastructure, and support for building your home. The development is intended for people
          seeking privacy, a more relaxed lifestyle, and a considered long-term property investment.
        </p>
      ),
    },
    {
      id: 'faq-02',
      number: '02',
      question: 'Where are the villa projects located?',
      answer: (
        <p className="leading-relaxed">
          Veda Life Spaces&apos; featured development is in Alibaug, Maharashtra, in the Sogaon area.
          The location offers access to destinations such as Mandwa Jetty and nearby beaches. Visitors can explore
          the website&apos;s Project Location section for the map and listed travel times. Actual travel times
          may vary depending on traffic and route.
        </p>
      ),
    },
    {
      id: 'faq-03',
      number: '03',
      question: 'What types of villas are available?',
      answer: (
        <div className="space-y-4 leading-relaxed">
          <p>The website showcases three villa design concepts:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="bg-[#FAF8F5] border border-[#2d2d2d]/10 p-3.5 rounded-sm">
              <span className="block text-[10px] uppercase tracking-widest text-[#9e7138] font-medium">Concept 01</span>
              <p className="font-serif text-base text-[#1f1f1f] mt-0.5">Villa Classic</p>
              <p className="text-xs text-[#666] mt-0.5">1,500 sq. ft.</p>
            </div>
            <div className="bg-[#FAF8F5] border border-[#2d2d2d]/10 p-3.5 rounded-sm">
              <span className="block text-[10px] uppercase tracking-widest text-[#9e7138] font-medium">Concept 02</span>
              <p className="font-serif text-base text-[#1f1f1f] mt-0.5">Villa Grande</p>
              <p className="text-xs text-[#666] mt-0.5">2,300 sq. ft.</p>
            </div>
            <div className="bg-[#FAF8F5] border border-[#2d2d2d]/10 p-3.5 rounded-sm">
              <span className="block text-[10px] uppercase tracking-widest text-[#9e7138] font-medium">Concept 03</span>
              <p className="font-serif text-base text-[#1f1f1f] mt-0.5">Villa Royale</p>
              <p className="text-xs text-[#666] mt-0.5">3,000 sq. ft.</p>
            </div>
          </div>
          <p className="text-xs sm:text-[13px] text-[#666] italic leading-relaxed">
            These are the villa configurations currently displayed on the website. Please note that these are design
            concepts and that final specifications, plot availability, and construction details must be confirmed
            with the Veda Life Spaces team.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-04',
      number: '04',
      question: 'What is the price of a villa?',
      answer: (
        <div className="space-y-4 leading-relaxed">
          <p>
            Pricing depends on the selected configuration, plot, and applicable project terms. For current pricing,
            availability, and any applicable offers, visitors can use the Get Price &amp; Floor Plans button or submit
            an enquiry to the Veda Life Spaces team.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#9e7138] hover:text-[#7a5628] font-medium transition-colors cursor-pointer group"
            >
              <span>GET PRICE &amp; FLOOR PLANS</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-05',
      number: '05',
      question: 'How can I view the villa designs and floor plans?',
      answer: (
        <div className="space-y-4 leading-relaxed">
          <p>
            Visitors can explore the villa showcase on the website to view the Villa Classic, Villa Grande, and
            Villa Royale design concepts. To request detailed floor plans, configuration information, and current
            availability, they can click Get Price &amp; Floor Plans and submit the enquiry form.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#9e7138] hover:text-[#7a5628] font-medium transition-colors cursor-pointer group"
            >
              <span>GET PRICE &amp; FLOOR PLANS</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-06',
      number: '06',
      question: 'How can I schedule a site visit?',
      answer: (
        <div className="space-y-4 leading-relaxed">
          <p>
            Visitors can submit their contact details through the existing Enquiry Form or contact the Veda Life Spaces
            team directly to express their interest in arranging a site visit. The team can then confirm availability and
            coordinate the visit.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#9e7138] hover:text-[#7a5628] font-medium transition-colors cursor-pointer group"
            >
              <span>ENQUIRE NOW</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="faq-section"
      className="relative w-full bg-[#FAF8F5] py-24 md:py-32 border-t border-[#2d2d2d]/5 overflow-hidden z-20"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(184, 154, 107, 0.05) 0%, transparent 60%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 justify-center mb-4">
            <div className="h-px w-8 bg-[#b89a6b]/50"></div>
            <span className="font-veda-sans text-xs tracking-[0.25em] uppercase text-[#9e7138] font-medium">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <div className="h-px w-8 bg-[#b89a6b]/50"></div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2d2d] leading-[1.15] tracking-tight mb-5">
            Questions, Answered.
          </h2>

          <p className="font-veda-sans text-sm sm:text-base text-[#5f5a54] leading-relaxed font-light">
            Everything you need to know about Veda Life Spaces, from location and villa configurations
            to pricing, floor plans, and site visits.
          </p>
        </div>

        {/* Layout Grid: 68% Accordion + 32% Editorial Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          
          {/* FAQ Accordion (68% width on desktop) */}
          <div className="lg:col-span-8 divide-y divide-[#2d2d2d]/10 border-t border-b border-[#2d2d2d]/10">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const buttonId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div key={item.id} className="transition-colors duration-200">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left py-6 sm:py-7 flex items-start justify-between gap-4 sm:gap-6 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2 rounded-sm cursor-pointer"
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        <span className="font-mono text-xs sm:text-sm text-[#9e7138] font-medium mt-1 tracking-wider select-none shrink-0">
                          {item.number}
                        </span>
                        <span className={`font-serif text-lg sm:text-xl text-[#2d2d2d] font-normal leading-snug tracking-tight transition-colors duration-200 ${isOpen ? 'text-[#9e7138]' : 'group-hover:text-[#9e7138]'}`}>
                          {item.question}
                        </span>
                      </div>

                      {/* Minimal Plus/Minus Indicator */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'border-[#9e7138] bg-[#9e7138] text-white rotate-180'
                            : 'border-[#2d2d2d]/15 text-[#5f5a54] group-hover:border-[#9e7138] group-hover:text-[#9e7138]'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        )}
                      </div>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 sm:pl-12 pr-4 pb-7 text-sm sm:text-[15px] text-[#555] font-veda-sans font-light">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Supporting Visual & Editorial Panel (32% width on desktop) */}
          <div className="lg:col-span-4 w-full">
            <div className="bg-white/70 backdrop-blur-sm border border-[#2d2d2d]/10 rounded-sm p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:sticky lg:top-28">
              
              {/* Supporting Villa Image */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-sm overflow-hidden mb-5 bg-[#ede8dc]">
                <img
                  src="/villa 1.png"
                  alt="Veda Life Spaces European Villa Architecture"
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase text-white font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                  Alibaug Estate
                </span>
              </div>

              {/* Editorial Notes */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#9e7138] block">
                  BESPOKE ADVISORY
                </span>
                <h3 className="font-serif text-xl text-[#1f1f1f] leading-snug">
                  Explore Your European Villa in Alibaug
                </h3>
                <p className="font-veda-sans text-xs sm:text-[13px] text-[#666] leading-relaxed font-light">
                  Our private client advisory team is available to assist you with floor plans, title documentation,
                  and curated site visits across Sogaon, Alibaug.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2.5 pt-2 border-t border-[#2d2d2d]/10">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full py-3.5 px-4 rounded-full bg-[#9e7138] hover:bg-[#88602c] active:bg-[#745023] text-white text-xs uppercase tracking-[0.16em] font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_8px_rgba(158,113,56,0.25)] hover:shadow-[0_4px_14px_rgba(158,113,56,0.4)] hover:-translate-y-0.5 border border-[#d8b075]/40"
                >
                  <span>ENQUIRE NOW</span>
                  <span>↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full py-2.5 px-4 rounded-full border border-[#9e7138]/50 hover:border-[#9e7138] text-[#9e7138] hover:text-[#745023] text-xs uppercase tracking-[0.15em] font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer bg-transparent hover:bg-[#9e7138]/5"
                >
                  <span>GET PRICE &amp; FLOOR PLANS</span>
                  <span>↗</span>
                </button>
              </div>

              {/* Phone Helpline */}
              <div className="mt-5 pt-4 border-t border-[#2d2d2d]/10 flex items-center justify-between text-[11px] text-[#777]">
                <span>Senior Advisor Direct</span>
                <a
                  href="tel:+919619394620"
                  className="text-[#9e7138] hover:underline font-medium"
                >
                  +91 96193 94620
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
