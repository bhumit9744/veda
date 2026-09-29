import React from 'react';

/* ══════════════════════════════════════════════════════════════════════════════
   EDITORIAL CONTENT OVERLAY — AWWWARDS-LEVEL QUALITY PASS
   
   Rhythm:
   01 [DARK]  HERO — Restrained, asymmetric, poetic opening
   02 [LIGHT] WHY VEDA — Warm ivory architectural paper (#F4F1E8)
   03 [LIGHT] OUR METHOD — Soft cream stone (#EEEAE0), unhindered spacing
   04 [DARK]  LAND TRANSFORMATION — Cinematic 3D topographical relief
   05 [LIGHT] THE VEDA DIFFERENCE & CLARITY — Paper manifesto (#F8F6F0)
   06 [DARK]  ALIBAUG DEVELOPMENT — Real project proof & masterplan imagery
   07 [LIGHT] THE OWNERSHIP JOURNEY — FIND → OWN → BUILD → GROW (#F4F1E8)
   08 [DARK]  BEYOND LIVING & FOOTER — Serene final brand reflection
   ══════════════════════════════════════════════════════════════════════════════ */

export default function ContentOverlay() {
  const heroContentRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const el = heroContentRef.current;
    if (!el) return;

    // Check touch device or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 14;
      targetY = ((e.clientY / innerHeight) - 0.5) * 10;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative w-full">

      {/* ═══════════════════════════════════════════
          01 — [DARK] HERO — MASTER ART-DIRECTED PASS
          Hierarchy:
          Level 1: Editorial Label (WE BELIEVE)
          Level 2: Primary Statement (GOOD LAND IS FOUND / GREAT OPPORTUNITIES ARE CREATED)
          Level 3: Supporting Statement + Editorial CTA (DISCOVER VEDA →)
          Flow: HEADLINE → PATH → LEAF → LANDSCAPE → SCROLL
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-14 md:pb-18 px-6 md:px-12 lg:px-20 z-10 text-[#F1F0E8]">
        {/* Top Architectural Documentation Metadata */}
        <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between pointer-events-none pt-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#C4B06E] font-semibold">
              01 / FOUNDATION
            </span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.25em] uppercase text-[#A8ADA2]/50">
              Alibaug Development
            </span>
          </div>

          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#A8ADA2]/50">
            <span>ALIBAUG · MAHARASHTRA / INDIA</span>
          </div>
        </div>

        {/* Main Hero Composition — Left-Heavy Asymmetric Editorial Layout */}
        <div
          ref={heroContentRef}
          className={`max-w-[1400px] w-full mx-auto my-auto py-8 will-change-transform transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="max-w-2xl lg:max-w-3xl">
            {/* LEVEL 1: Small Editorial Label */}
            <p className="font-mono text-[10px] md:text-xs tracking-[0.45em] uppercase text-[#C4B06E] font-medium mb-6">
              We Believe
            </p>

            {/* LEVEL 2: Primary Statement — Confident, Architectural, Quiet */}
            <h1 className="font-display text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[0.92] tracking-[-0.035em] text-[#F1F0E8] font-normal mb-3">
              GOOD LAND
              <br />
              IS FOUND.
            </h1>

            <h1 className="font-display text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[0.92] tracking-[-0.035em] text-[#F1F0E8]/35 font-normal mb-8">
              GREAT OPPORTUNITIES
              <br />
              ARE CREATED.
            </h1>

            {/* LEVEL 3: Supporting Statement (Concise, 2-3 lines max) */}
            <p className="text-sm md:text-base font-light text-[#A8ADA2]/75 max-w-md leading-relaxed mb-8">
              Veda Life Spaces identifies promising markets, carefully selects land and develops thoughtfully planned plotted communities with a focus on clarity, quality and long-term value.
            </p>

            {/* Understated Editorial CTA with Micro-Hover */}
            <div className="pt-1">
              <a
                href="#why-veda"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('why-veda');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3.5 text-xs font-mono tracking-[0.25em] uppercase text-[#F1F0E8]/90 hover:text-[#C4B06E] transition-colors duration-500 cursor-pointer pointer-events-auto"
              >
                <span>Discover Veda</span>
                <div className="relative w-8 h-px bg-[#F1F0E8]/25 overflow-hidden">
                  <div className="absolute inset-0 bg-[#C4B06E] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>
                <span className="font-mono text-[11px] transform group-hover:translate-x-1 transition-transform duration-500">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator + Cadastral Coordinates */}
        <div className="max-w-[1400px] w-full mx-auto flex items-end justify-between pointer-events-none pb-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C4B06E] animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[#A8ADA2]/60">
              Scroll to discover
            </span>
          </div>

          <div className="font-mono text-[9px] tracking-[0.25em] text-[#A8ADA2]/45 text-right">
            <p>18.6412° N · 72.8722° E</p>
            <p className="text-[#C4B06E]/60 text-[8px] tracking-[0.2em] mt-0.5">TERRAIN SURVEY 01</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02 — [LIGHT] WHY VEDA
          Surface: Warm Ivory (#F4F1E8)
          ═══════════════════════════════════════════ */}
      <section id="why-veda" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-32 md:py-44 bg-[#F4F1E8] text-[#151814] z-10 shadow-xl border-t border-[#151814]/8">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#4A563D] font-medium">
                  02 / The Shift
                </span>
                <div className="w-12 h-px bg-[#4A563D]/30" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#555B52]">
                  Raigad Coastal Corridor
                </span>
              </div>

              <h2 className="font-display text-[clamp(2.4rem,5.8vw,5.4rem)] leading-[0.92] tracking-[-0.035em] text-[#151814] mb-10">
                ALIBAUG IS
                <br />
                EVOLVING.
              </h2>

              <p className="text-xl md:text-2xl font-light leading-relaxed text-[#242921] max-w-2xl mb-8">
                Yet finding land with clear ownership, thoughtful planning and genuine long-term potential remains a challenge.
              </p>

              <p className="text-base font-light leading-relaxed text-[#555B52] max-w-xl">
                Veda Life Spaces was founded to bridge that gap — identifying high-potential locations and transforming them into transparent, future-ready plotted communities.
              </p>
            </div>

            {/* Architectural Data Sidebar */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#151814]/12 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-between self-stretch">
              <div>
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#4A563D] mb-8 font-semibold">
                  Macro Indicators
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#555B52] mb-1">Infrastructure</p>
                    <p className="font-display text-lg text-[#151814]">MTHL · Ro-Ro · 12-Lane Expressway</p>
                  </div>
                  <div className="w-full h-px bg-[#151814]/8" />
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#555B52] mb-1">Land Ecosystem</p>
                    <p className="font-display text-lg text-[#151814]">Plotted Villa Demand Accelerating</p>
                  </div>
                  <div className="w-full h-px bg-[#151814]/8" />
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#555B52] mb-1">Institutional Standard</p>
                    <p className="font-display text-lg text-[#151814]">100% Clear-Title Gated Enclaves</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-[#151814]/10">
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#555B52]">
                  Coordinates: 18.6412° N, 72.8722° E
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          03 — [LIGHT] OUR METHOD
          Surface: Soft Cream Stone (#EEEAE0)
          Generous negative space on the left ensures the path never crosses typography
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-32 md:py-44 bg-[#EEEAE0] text-[#151814] z-10 border-t border-[#151814]/8">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Negative space allowing SVG path to flow down uninterrupted */}
            <div className="lg:col-span-5 flex flex-col justify-between pr-4">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#4A563D] font-medium">
                    03 / Our Method
                  </span>
                  <div className="w-12 h-px bg-[#4A563D]/30" />
                </div>

                <p className="text-xl md:text-2xl font-light leading-relaxed text-[#242921] mb-8">
                  We study markets, identify land with potential, and develop it into thoughtfully planned plotted communities.
                </p>

                <p className="text-base font-light leading-relaxed text-[#555B52]">
                  Every parcel is scrutinized through rigorous title verification, topographical suitability, and long-term infrastructural alignment.
                </p>
              </div>

              <div className="hidden lg:block pt-16">
                <span className="font-display text-8xl font-light text-[#151814]/6 select-none">
                  03
                </span>
              </div>
            </div>

            {/* Right Column: Clean, uncrossed headlines & steps */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8">
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#151814] mb-3">
                WE DON'T JUST
                <br />
                FIND LAND.
              </h2>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.035em] text-[#151814]/35 mb-14">
                WE FIND THE RIGHT
                <br />
                OPPORTUNITY.
              </h2>

              <div className="border-t border-[#151814]/15 divide-y divide-[#151814]/10">
                {[
                  { num: '01', title: 'Research the Market', desc: 'Deep demographic, connectivity, and land-use assessment across emerging corridors.' },
                  { num: '02', title: 'Choose the Land', desc: 'Direct landowner engagement, flawless title due diligence, and geographical vetting.' },
                  { num: '03', title: 'Develop the Opportunity', desc: 'Masterplanning, internal infrastructure, legal segregation, and community readiness.' },
                ].map((step) => (
                  <div key={step.num} className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:w-1/2">
                      <span className="font-mono text-xs text-[#4A563D] font-semibold">{step.num}</span>
                      <h3 className="font-display text-lg text-[#151814] tracking-[-0.01em]">{step.title}</h3>
                    </div>
                    <p className="text-sm font-light text-[#555B52] sm:w-1/2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          04 — [DARK] THREE.JS LAND TRANSFORMATION
          Cinematic Interlude: Raw terrain morphs to terraced boundaries
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-20 py-28 z-10 text-[#F1F0E8]">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C4B06E]">
                04 / Metamorphosis
              </span>
              <div className="w-12 h-px bg-[#C4B06E]/40" />
            </div>

            <h2 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.92] tracking-[-0.035em] text-[#F1F0E8] mb-8">
              THE ARCHITECTURE
              <br />
              OF LAND.
            </h2>

            <p className="text-lg md:text-xl font-light leading-relaxed text-[#A8ADA2] max-w-lg mb-8">
              From raw geology to precise cadastral plots. The terrain shifts beneath our feet — each contour line marking the deliberate boundary of future living.
            </p>

            <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[#C4B06E]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4B06E] animate-ping" />
                <span>Cadastral Survey Alpha</span>
              </div>
              <span>·</span>
              <span>18.6412° N</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          05 — [LIGHT] THE VEDA DIFFERENCE & CLARITY
          Surface: Natural Paper (#F8F6F0)
          ═══════════════════════════════════════════ */}
      <section className="relative py-36 md:py-48 px-6 md:px-12 lg:px-20 bg-[#F8F6F0] text-[#151814] z-10 shadow-2xl border-t border-[#151814]/8">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 pb-16 border-b border-[#151814]/12">
            <div>
              <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#4A563D] mb-8 font-medium">
                05 / The Veda Difference
              </p>
              <h2 className="font-display text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[0.92] tracking-[-0.035em] text-[#151814] mb-3">
                WE FIND THE
                <br />
                OPPORTUNITY.
              </h2>
              <h2 className="font-display text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[0.92] tracking-[-0.035em] text-[#151814]/35">
                WE GIVE YOU
                <br />
                THE CLARITY.
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#4A563D] mb-4 font-semibold">
                    Opportunity
                  </p>
                  <ul className="space-y-2 text-sm text-[#242921] font-light">
                    <li>· Location Assessment</li>
                    <li>· Arterial Connectivity</li>
                    <li>· Infrastructure Readiness</li>
                    <li>· Future Appreciation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#4A563D] mb-4 font-semibold">
                    Clarity
                  </p>
                  <ul className="space-y-2 text-sm text-[#242921] font-light">
                    <li>· Clear Marketable Title</li>
                    <li>· Full Legal Documentation</li>
                    <li>· Exact Demarcation</li>
                    <li>· Transparent Ownership</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Central Manifesto */}
          <div className="max-w-4xl mx-auto text-center py-8">
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-[#4A563D] mb-8 font-medium">
              Core Philosophy
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,4.8rem)] leading-[0.92] tracking-[-0.035em] text-[#151814] mb-10">
              THE RIGHT OPPORTUNITY
              <br />
              IS ONLY VALUABLE
              <br />
              WHEN YOU CAN OWN IT
              <br />
              WITH CONFIDENCE.
            </h2>
            <div className="w-16 h-px bg-[#151814]/20 mx-auto mb-8" />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#555B52]">
              Title · Due Diligence · Demarcation · Possession
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          06 — [DARK] ALIBAUG / DEVELOPMENT (PRIMARY PROOF SECTION)
          Features real project visual from Alibaug development
          Hierarchy: ALIBAUG → WHERE VEDA BEGAN → PROJECT VISUAL → EXPLORE
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-32 md:py-44 z-10 text-[#F1F0E8]">
        <div className="max-w-[1400px] w-full mx-auto">
            {/* Copy & Metrics */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C4B06E]">
                  06 / Flagship Development
                </span>
                <div className="w-12 h-px bg-[#C4B06E]/40" />
              </div>

              <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#A8ADA2]/70 mb-3">
                Where Veda Began.
              </p>

              <h2 className="font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.04em] text-[#F1F0E8] mb-8">
                ALIBAUG
              </h2>

              <p className="text-lg md:text-xl font-light leading-relaxed text-[#A8ADA2] max-w-lg mb-8">
                Veda Life Spaces began its journey in Alibaug — identifying prime coastal land and transforming it into thoughtfully masterplanned, clear-title plotted communities.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 max-w-md">
                {[
                  { label: 'Clear-Title Villa Plots', detail: '100% Institutional Title' },
                  { label: 'Infrastructure Ready', detail: 'Roads, Power, Water' },
                  { label: 'Gated Masterplan', detail: '24/7 Monitored Access' },
                  { label: 'Prime Coastal Location', detail: '10 Mins from Mandwa Jetty' },
                ].map((item) => (
                  <div key={item.label} className="border-l border-[#C4B06E]/30 pl-3">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F1F0E8]">{item.label}</p>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-[#A8ADA2]/60 mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>

              <a
                href="/developments"
                className="group inline-flex items-center gap-4 cursor-pointer"
              >
                <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#F1F0E8] group-hover:text-[#C4B06E] transition-colors duration-500">
                  Explore Our Developments
                </span>
                <div className="relative w-14 h-px bg-[#F1F0E8]/25 overflow-hidden">
                  <div className="absolute inset-0 bg-[#C4B06E] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              </a>
            </div>
          </div>
        </section>

      {/* ═══════════════════════════════════════════
          07 — [LIGHT] THE OWNERSHIP JOURNEY
          Surface: Warm Ivory (#F4F1E8)
          Continuous architectural journey through FIND → OWN → BUILD → GROW
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-32 md:py-44 bg-[#F4F1E8] text-[#151814] z-10 shadow-2xl border-t border-[#151814]/8">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#4A563D] font-medium">
              07 / Continuous Partnership
            </span>
            <div className="w-12 h-px bg-[#4A563D]/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-5">
              <h2 className="font-display text-[clamp(2.4rem,5.2vw,5rem)] leading-[0.92] tracking-[-0.035em] text-[#151814] mb-8">
                FIND →
                <br />
                OWN →
                <br />
                BUILD →
                <br />
                GROW
              </h2>

              <p className="text-base font-light leading-relaxed text-[#555B52] max-w-sm">
                The relationship does not end at the sale. Our core business is developing plotted communities — our commitment is to assist you beyond the purchase.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center divide-y divide-[#151814]/10">
              {[
                { step: 'FIND', title: 'Curated Land Selection', desc: 'We identify emerging markets and high-potential parcels worth owning before the market catches on.' },
                { step: 'OWN', title: 'Clear-Title Security', desc: 'Acquire your plot with 100% legal clarity, verified title chain, and zero ownership ambiguity.' },
                { step: 'BUILD', title: 'Architectural Assistance', desc: 'We connect you with leading architects and villa developers to bring your custom home to life.' },
                { step: 'GROW', title: 'Generational Value', desc: 'When your plans evolve, we assist with community management, estate care, and strategic resale.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="py-7 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#4A563D] font-semibold w-20 shrink-0">
                    {step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-[#151814] tracking-[-0.01em] mb-1">
                      {title}
                    </h3>
                    <p className="text-sm font-light text-[#555B52] leading-relaxed max-w-md">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          08 — [DARK] BEYOND LIVING & FOOTER
          Quiet, architectural closing
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-32 pb-16 z-10 text-[#F1F0E8]">
        {/* Manifesto Reflection */}
        <div className="max-w-3xl mx-auto text-center my-auto">
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-[#C4B06E] mb-14">
            Beyond Living.
          </p>

          <p className="text-xl md:text-2xl font-light leading-relaxed text-[#A8ADA2] mb-14 max-w-xl mx-auto">
            We believe land is more than an asset.
            <br /><br />
            It is where futures are planned,
            <br />wealth is created,
            <br />legacies are built
            <br />and possibilities take shape.
          </p>

          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.9] tracking-[-0.035em] text-[#F1F0E8] mb-10">
            WILL THIS CREATE
            <br />
            LASTING VALUE?
          </h2>

          <p className="text-sm font-light text-[#A8ADA2]/60 max-w-md mx-auto">
            That is the question behind every opportunity we choose to develop.
          </p>
        </div>

        {/* Minimal Architectural Signoff */}
        <footer className="max-w-[1400px] w-full mx-auto border-t border-[#A8ADA2]/15 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
            <div>
              <h3 className="font-display text-3xl tracking-[0.2em] font-semibold text-[#F1F0E8] mb-1">
                VEDA
              </h3>
              <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-[#A8ADA2]/60">
                LIFE SPACES · BEYOND LIVING.
              </p>
            </div>

            <nav className="flex flex-wrap gap-8">
              {[
                { label: 'About', href: '/about' },
                { label: 'Developments', href: '/developments' },
                { label: 'Approach', href: '/approach' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#A8ADA2]/70 hover:text-[#C4B06E] transition-colors duration-500"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="text-right">
              <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-[#A8ADA2]/60">
                Alibaug · Mumbai
              </p>
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#A8ADA2]/35 mt-1">
                © 2026 Veda Life Spaces. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>

    </div>
  );
}
