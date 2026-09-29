import React from 'react';

export default function ContentOverlay() {
  return (
    <div className="flex flex-col w-full text-veda-text">
      {/* 01 HERO */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-6 w-full text-center mix-blend-difference text-white">
          <p className="text-sm font-medium tracking-widest uppercase mb-12">We Believe</p>
          <h1 className="font-display text-5xl md:text-8xl leading-[1.1] tracking-tight">
            GOOD LAND<br />IS FOUND.
          </h1>
          <h1 className="font-display text-5xl md:text-8xl leading-[1.1] tracking-tight mt-4 text-white/50">
            GREAT OPPORTUNITIES<br />ARE CREATED.
          </h1>
        </div>
        
        <div className="absolute bottom-12 left-6 text-[10px] tracking-widest text-white/50 flex flex-col gap-1 mix-blend-difference font-mono uppercase">
          <p>ALIBAUG / MAHARASHTRA</p>
          <p>18.6412° N</p>
          <p>72.8722° E</p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/70 flex flex-col items-center gap-4 mix-blend-difference">
          <span>Scroll to discover</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* 02 WHY VEDA */}
      <section className="h-[150vh] w-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-start gap-12 sticky top-1/3">
          <p className="text-sm font-medium tracking-widest uppercase">Why Veda</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl">
            ALIBAUG IS EVOLVING.
          </h2>
          <p className="text-xl md:text-2xl font-light text-veda-text/70 max-w-2xl leading-relaxed">
            Yet finding land with clear ownership, thoughtful planning and genuine long-term potential remains a challenge.
          </p>
          {/* We'll let the 3D scene handle the scattered words: LOCATION, CONNECTIVITY, OWNERSHIP, DEVELOPMENT, POTENTIAL */}
        </div>
      </section>

      {/* 03 THE VEDA ENGINE */}
      <section className="h-[200vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full flex justify-end">
            <div className="max-w-md">
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                We don't just find land.<br />We find the right opportunity.
              </h2>
              <div className="flex flex-col gap-4 text-sm font-medium tracking-widest text-veda-text/50">
                <p>RESEARCH</p>
                <p>↓</p>
                <p>SELECT</p>
                <p>↓</p>
                <p>DEVELOP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 THE VEDA DIFFERENCE */}
      <section className="h-[200vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
          <div className="flex justify-between w-full max-w-7xl px-6">
            <div className="text-6xl md:text-9xl font-display opacity-10">OPPORTUNITY</div>
            <div className="text-6xl md:text-9xl font-display opacity-10">CLARITY</div>
          </div>
          <div className="absolute text-center max-w-2xl px-6">
            <h3 className="font-display text-3xl md:text-5xl mb-8">CONFIDENCE</h3>
            <p className="text-lg md:text-xl font-light text-veda-text/70">
              The right opportunity is only valuable when you can own it with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 05 ALIBAUG */}
      <section className="h-screen w-full flex items-end pb-24">
        <div className="max-w-7xl mx-auto px-6 w-full mix-blend-difference text-white">
          <h2 className="font-display text-4xl md:text-7xl mb-12">
            ALIBAUG<br /><span className="text-white/50">WHERE VEDA BEGAN.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-white/80 border-t border-white/20 pt-8">
            <p>Carefully selected land.</p>
            <p>Clear-title villa plots.</p>
            <p>Thoughtful planning.</p>
            <p>Infrastructure built around ownership.</p>
          </div>
          <button className="mt-16 text-sm tracking-widest uppercase border-b border-white/30 pb-1 hover:border-white transition-colors">
            Explore Developments →
          </button>
        </div>
      </section>

      {/* 06 FIND OWN BUILD GROW */}
      <section className="h-[250vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-24">
           {/* R3F canvas handles the visuals */}
           <div className="w-full max-w-7xl mx-auto px-6">
              <h2 className="font-display text-2xl tracking-widest uppercase opacity-30">
                The Journey
              </h2>
           </div>
        </div>
      </section>

      {/* 07 THE HUMAN MOMENT */}
      <section className="h-[120vh] w-full relative bg-black flex flex-col items-center justify-center text-white overflow-hidden pointer-events-auto">
        <div className="absolute inset-0 z-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2574&auto=format&fit=crop" 
            alt="Family at sunset"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-12 opacity-80">Beyond Living</p>
          <p className="text-2xl md:text-4xl font-light leading-relaxed mb-24">
            We believe land is more than an asset.<br />
            It is where futures are planned, wealth is created, legacies are built and possibilities take shape.
          </p>
          <h2 className="font-display text-5xl md:text-8xl tracking-tight">
            WILL THIS CREATE<br />LASTING VALUE?
          </h2>
        </div>
      </section>

      {/* 08 FOOTER */}
      <section className="h-screen w-full bg-black text-white flex flex-col justify-between py-12 px-6">
        <div className="flex-1 flex items-center justify-center">
          {/* Logo formed by contour line animation in R3F */}
        </div>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-12 text-sm border-t border-white/20 pt-8">
          <div>
            <h3 className="font-display tracking-widest text-2xl mb-2">VEDA</h3>
            <p className="opacity-50 tracking-widest uppercase text-xs">Life Spaces</p>
            <p className="mt-8 opacity-70">BEYOND LIVING.</p>
          </div>
          <div className="flex gap-12 uppercase tracking-widest text-xs opacity-70">
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Developments</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
          <div className="text-xs tracking-widest uppercase opacity-50">
            ALIBAUG · MUMBAI
          </div>
        </div>
      </section>
    </div>
  );
}
