import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useVedaStore } from './store';
import VedaScene from './VedaScene';
import VedaJourneyPath from './VedaJourneyPath';
import ContentOverlay from './ContentOverlay';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════════════════════
   FLOATING ADAPTIVE NAVIGATION
   Intelligently transitions between:
   - Light sections (75% of site): Ivory surface with dark charcoal text (#151814)
   - Dark sections (25% of site): Dark atmosphere with warm ivory text (#F1F0E8)
   ══════════════════════════════════════════════════════════════════════════════ */
function FloatingNav() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const unsubscribe = useVedaStore.subscribe((state) => {
      const p = state.scrollProgress || 0;
      // Light sections rhythm:
      // Why Veda & Method: ~0.12 to ~0.38
      // Veda Difference & Clarity: ~0.49 to ~0.65
      // Ownership Journey: ~0.77 to ~0.88
      const inLight =
        (p >= 0.12 && p < 0.38) ||
        (p >= 0.49 && p < 0.65) ||
        (p >= 0.77 && p < 0.88);
      setIsLightMode(inLight);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 lg:px-20 py-5 transition-all duration-700 pointer-events-auto ${
        isLightMode
          ? 'bg-[#F4F1E8]/90 backdrop-blur-md border-b border-[#151814]/10 text-[#151814]'
          : 'bg-[#000201]/40 backdrop-blur-md border-b border-white/5 text-[#F1F0E8]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-lg tracking-[0.2em] font-semibold uppercase transition-colors duration-500">
            VEDA
          </span>
          <span
            className={`font-mono text-[9px] tracking-[0.35em] uppercase transition-colors duration-500 ${
              isLightMode ? 'text-[#151814]/65' : 'text-[#A8ADA2]/70'
            }`}
          >
            LIFE SPACES
          </span>
        </a>

        {/* Editorial Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'About', href: '/about' },
            { label: 'Developments', href: '/developments' },
            { label: 'Approach', href: '/approach' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-mono text-[10px] tracking-[0.28em] uppercase transition-colors duration-500 hover:text-[#C4B06E] ${
                isLightMode ? 'text-[#242921]/75 hover:text-[#59644B]' : 'text-[#A8ADA2]/80'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Origin Coordinates */}
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-[9px] tracking-[0.3em] uppercase transition-colors duration-500 ${
              isLightMode ? 'text-[#59644B] font-semibold' : 'text-[#C4B06E]'
            }`}
          >
            Alibaug
          </span>
          <span
            className={`hidden sm:inline font-mono text-[8px] tracking-[0.2em] transition-colors duration-500 ${
              isLightMode ? 'text-[#151814]/40' : 'text-[#A8ADA2]/40'
            }`}
          >
            18.64° N
          </span>
        </div>
      </div>
    </header>
  );
}

export default function VedaExperience() {
  const containerRef = useRef(null);
  const setScrollProgress = useVedaStore((s) => s.setScrollProgress);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full selection:bg-[#C4B06E] selection:text-[#000201]">
      {/* ── LAYER 50: Floating Adaptive Navigation ── */}
      <FloatingNav />

      {/* ── LAYER 0: Deep Atmospheric background (fixed for dark moments) ── */}
      <div className="fixed inset-0 z-0 veda-atmosphere pointer-events-none" />

      {/* ── LAYER 1: Three.js canvas (fixed for cinematic moments) ── */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Canvas
          camera={{ position: [0, 3.8, 15], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <VedaScene />
        </Canvas>
      </div>

      {/* ── LAYER 2: Journey Path & Travelling Leaf (z-20) + Editorial Content (z-10) ── */}
      <div className="relative z-10 w-full">
        {/* The SVG Journey Path and Leaf Traveller live on z-20 */}
        <VedaJourneyPath />

        {/* Content sections (Light sections have opaque ivory surfaces on z-10) */}
        <ContentOverlay />
      </div>
    </div>
  );
}
