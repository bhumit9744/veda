import React, { useRef, useEffect, useState } from 'react';
import { useVedaStore } from './store';

/* ══════════════════════════════════════════════════════════════════════════════
   ARCHITECTURAL SVG JOURNEY & BOTANICAL LEAF TRAVELLER — HERO MASTER PASS
   
   Hero Choreography:
   - Subtle poetic entrance: Path gently begins drawing → Leaf blooms at leading edge
   - Exact physical stem anchoring at the stroke endpoint (0px 20px)
   - Dynamic tangent rotation: Math.atan2(dy, dx)
   - Refined scale: Desktop 70-90px | Large Desktop 85-110px | Mobile 40-55px
   - Dual-tone adaptation: Warm ivory/gold on Dark sections; Forest charcoal on Light
   - Zero unrevealed ghost track: The leaf leads the voyage into pristine open space
   ══════════════════════════════════════════════════════════════════════════════ */

// Continuous architectural path in 1000 x 11000 viewBox
export const JOURNEY_PATH_DATA = [
  // ─── 01: HERO (DARK) 0 - 1200 ───
  // Begins in upper right-center, curves down between hero text and coordinates
  'M 620 180',
  'C 640 380, 580 620, 540 880',
  'C 510 1080, 460 1220, 480 1350',

  // ─── 02: WHY VEDA (LIGHT) 1350 - 2500 ───
  // Text is on the left; path sweeps into the open right margin (x: 680-740)
  'C 520 1520, 680 1700, 720 1920',
  'C 750 2140, 680 2340, 580 2520',

  // ─── 03: OUR METHOD (LIGHT) 2520 - 3800 ───
  // Text is on the right; path sweeps gracefully through LEFT open space (x: 280-360)
  // NEVER cuts across headlines
  'C 460 2680, 310 2860, 320 3100',
  'C 330 3340, 420 3540, 460 3750',

  // ─── 04: LAND TRANSFORMATION (DARK) 3750 - 5000 ───
  // Subtle geometric terraced cadastral curves
  'C 490 3950, 560 4150, 540 4380',
  'C 520 4580, 460 4780, 500 5000',

  // ─── 05: VEDA DIFFERENCE & CLARITY (LIGHT) 5000 - 6400 ───
  // Precision architectural plumb line passing through column gap (x: 500)
  'L 500 5250',
  'C 500 5500, 460 5750, 480 6000',
  'C 500 6200, 540 6320, 510 6440',

  // ─── 06: ALIBAUG / DEVELOPMENT (DARK) 6440 - 7800 ───
  // Cadastral plot boundaries & masterplan roads
  'L 560 6620',
  'L 620 6780',
  'L 620 7060',
  'L 480 7220',
  'L 480 7460',
  'C 500 7620, 550 7720, 520 7840',

  // ─── 07: OWNERSHIP JOURNEY (LIGHT) 7840 - 9300 ───
  // Sweeps through the 4 milestones FIND → OWN → BUILD → GROW
  'C 470 8020, 420 8220, 440 8440',
  'C 460 8660, 560 8860, 520 9080',
  'C 480 9200, 510 9280, 500 9360',

  // ─── 08: BEYOND LIVING & FOOTER (DARK) 9360 - 11000 ───
  // Serene arc settling into the earth
  'C 480 9580, 430 9820, 450 10080',
  'C 470 10320, 500 10560, 500 10760',
  'L 500 11000',
].join(' ');

export default function VedaJourneyPath() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const mainPathRef = useRef(null);
  const glowPathRef = useRef(null);
  const leafRef = useRef(null);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mainPath = mainPathRef.current;
    const glowPath = glowPathRef.current;
    const leaf = leafRef.current;
    const svg = svgRef.current;
    if (!mainPath || !glowPath || !leaf || !svg) return;

    // Cache total path length
    const totalLength = mainPath.getTotalLength();
    mainPath.style.strokeDasharray = `${totalLength}`;
    glowPath.style.strokeDasharray = `${totalLength}`;
    mainPath.style.strokeDashoffset = `${totalLength}`;
    glowPath.style.strokeDashoffset = `${totalLength}`;

    // Cache SVG bounding dimensions
    let svgWidth = svg.clientWidth || 1400;
    let svgHeight = svg.clientHeight || 11000;

    const handleResize = () => {
      if (svg) {
        const rect = svg.getBoundingClientRect();
        svgWidth = rect.width;
        svgHeight = rect.height;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entrance animation state
    let targetProgress = useVedaStore.getState().scrollProgress || 0;
    // Base initial progress at 0.005 so the leaf is poised at the start of the path
    let currentProgress = prefersReducedMotion ? targetProgress : 0;
    let entranceDone = prefersReducedMotion;
    let entranceStartTime = performance.now() + 250; // slight 250ms breathing delay
    let rafId = null;

    const unsubscribe = useVedaStore.subscribe((state) => {
      targetProgress = state.scrollProgress || 0;
    });

    const updatePhysics = (now) => {
      // 08 — Hero Entrance Choreography:
      if (!entranceDone) {
        const elapsed = now - entranceStartTime;
        if (elapsed > 0) {
          const t = Math.min(1, elapsed / 1100);
          // Ease-out cubic for gentle opening reveal
          const easeOut = 1 - Math.pow(1 - t, 3);
          const introP = easeOut * 0.005;
          currentProgress = Math.max(introP, targetProgress);
          if (t >= 1) entranceDone = true;
        }
      } else {
        const diff = targetProgress - currentProgress;
        if (Math.abs(diff) > 0.00004) {
          currentProgress += diff * 0.18;
        } else {
          currentProgress = targetProgress;
        }
      }

      const clampedP = Math.max(0, Math.min(1, currentProgress));
      const distance = clampedP * totalLength;

      // Stroke reveal: path drawn EXACTLY up to distance
      const strokeOffset = totalLength - distance;
      mainPath.style.strokeDashoffset = `${strokeOffset}`;
      glowPath.style.strokeDashoffset = `${strokeOffset}`;

      // Sample current point where stroke ends
      const currentPoint = mainPath.getPointAtLength(distance);

      // Sample next point slightly ahead for tangent angle
      const sampleStep = 2.5;
      let dx, dy;
      if (distance + sampleStep <= totalLength) {
        const nextPoint = mainPath.getPointAtLength(distance + sampleStep);
        dx = nextPoint.x - currentPoint.x;
        dy = nextPoint.y - currentPoint.y;
      } else {
        const prevPoint = mainPath.getPointAtLength(Math.max(0, distance - sampleStep));
        dx = currentPoint.x - prevPoint.x;
        dy = currentPoint.y - prevPoint.y;
      }

      const scaleX = svgWidth / 1000;
      const scaleY = svgHeight / 11000;

      const screenX = currentPoint.x * scaleX;
      const screenY = currentPoint.y * scaleY;
      const angle = Math.atan2(dy * scaleY, dx * scaleX);

      // Position leaf with stem anchored at (screenX, screenY)
      leaf.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) rotate(${angle}rad)`;

      // Light vs Dark section detection
      const inLight =
        (clampedP >= 0.12 && clampedP < 0.38) ||
        (clampedP >= 0.49 && clampedP < 0.65) ||
        (clampedP >= 0.77 && clampedP < 0.88);

      setIsLightSection(inLight);

      rafId = requestAnimationFrame(updatePhysics);
    };

    rafId = requestAnimationFrame(updatePhysics);

    // Fade in leaf after slight mounting delay
    const readyTimer = setTimeout(() => setIsReady(true), 350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(readyTimer);
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20 }}
    >
      {/* ─── CONTINUOUS ARCHITECTURAL SVG PATH ─── */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 11000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Multi-stage architectural path gradient */}
          <linearGradient id="editorialPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            {/* 01: Hero (Dark) */}
            <stop offset="0%" stopColor="#B9B59A" stopOpacity="0.45" />
            <stop offset="11%" stopColor="#B9B59A" stopOpacity="0.4" />

            {/* 02: Why Veda (Light) */}
            <stop offset="13%" stopColor="#4A563D" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#4A563D" stopOpacity="0.55" />

            {/* 03: Our Method (Light) */}
            <stop offset="27%" stopColor="#4A563D" stopOpacity="0.55" />
            <stop offset="37%" stopColor="#4A563D" stopOpacity="0.55" />

            {/* 04: Land Development (Dark) */}
            <stop offset="39%" stopColor="#B29B55" stopOpacity="0.5" />
            <stop offset="48%" stopColor="#B29B55" stopOpacity="0.45" />

            {/* 05: Veda Difference & Clarity (Light) */}
            <stop offset="50%" stopColor="#4A563D" stopOpacity="0.6" />
            <stop offset="64%" stopColor="#4A563D" stopOpacity="0.55" />

            {/* 06: Alibaug Development (Dark) */}
            <stop offset="66%" stopColor="#B29B55" stopOpacity="0.5" />
            <stop offset="76%" stopColor="#B29B55" stopOpacity="0.45" />

            {/* 07: Ownership Journey (Light) */}
            <stop offset="78%" stopColor="#4A563D" stopOpacity="0.6" />
            <stop offset="87%" stopColor="#4A563D" stopOpacity="0.55" />

            {/* 08: Beyond Living (Dark) */}
            <stop offset="89%" stopColor="#B9B59A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#B9B59A" stopOpacity="0.4" />
          </linearGradient>

          {/* Soft path glow filter for dark moments */}
          <filter id="softLineAura" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft aura behind revealed stroke */}
        <path
          ref={glowPathRef}
          d={JOURNEY_PATH_DATA}
          fill="none"
          stroke="url(#editorialPathGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#softLineAura)"
          opacity="0.3"
        />

        {/* Primary revealed path stroke — terminates exactly at leaf stem */}
        <path
          ref={mainPathRef}
          d={JOURNEY_PATH_DATA}
          fill="none"
          stroke="url(#editorialPathGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ─── THE BOTANICAL LEAF (PROTAGONIST AT EXACT LEADING EDGE) ─── */}
      <div
        ref={leafRef}
        className={`absolute top-0 left-0 pointer-events-none will-change-transform z-30 transition-opacity duration-1000 ease-out ${
          isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ transformOrigin: '0px 0px' }}
      >
        {/*
          LEAF ANCHOR GEOMETRY:
          The stem base is at (0, 0) relative to this anchor.
          Visual scale:
          Mobile: ~48px | Tablet: ~65-75px | Desktop: ~88px | Large Desktop: ~102px
          The leaf rotates along path tangent, with stroke meeting at its stem.
        */}
        <div
          className="relative transition-all duration-500"
          style={{ transform: 'translate(0px, -50%)' }}
        >
          <svg
            viewBox="0 0 90 40"
            className="w-[48px] h-[21px] sm:w-[65px] sm:h-[29px] md:w-[75px] md:h-[33px] lg:w-[88px] lg:h-[39px] xl:w-[102px] xl:h-[45px] overflow-visible"
            style={{
              filter: isLightSection
                ? 'drop-shadow(0 3px 6px rgba(21, 24, 20, 0.32))'
                : 'drop-shadow(0 0 12px rgba(196,176,110,0.55))',
            }}
          >
            <defs>
              {/* Dark Section Gradient: warm ivory to pale champagne gold */}
              <linearGradient id="leafDarkThemeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#1B2414" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#44552A" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#C4B06E" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#F5F0E1" stopOpacity="1" />
              </linearGradient>

              {/* Light Section Gradient: deep forest charcoal to subtle moss */}
              <linearGradient id="leafLightThemeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#121611" stopOpacity="0.98" />
                <stop offset="45%" stopColor="#252F1E" stopOpacity="0.96" />
                <stop offset="85%" stopColor="#3C4A2E" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#556642" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Stem base attachment node */}
            <circle
              cx="0"
              cy="20"
              r="2.8"
              fill={isLightSection ? '#252F1E' : '#C4B06E'}
              stroke={isLightSection ? '#4A563D' : '#F5F0E1'}
              strokeWidth="0.85"
            />

            {/* Outer Botanical Leaf Blade */}
            <path
              d="M 0,20 C 14,5 54,3 88,20 C 54,37 14,35 0,20 Z"
              fill={isLightSection ? 'url(#leafLightThemeGrad)' : 'url(#leafDarkThemeGrad)'}
              stroke={isLightSection ? '#121611' : '#D4C494'}
              strokeWidth="0.95"
              strokeLinejoin="round"
            />

            {/* Central Midrib / Stem Vein */}
            <path
              d="M 0,20 Q 44,19.4 87,20"
              fill="none"
              stroke={isLightSection ? '#98A880' : '#FAF7EE'}
              strokeWidth="1.35"
              strokeLinecap="round"
            />

            {/* Upper secondary lateral veins */}
            <path
              d="M 16,19.8 C 24,14 36,11 44,10.5
                 M 36,19.8 C 44,14.5 56,13 66,12.5
                 M 54,19.8 C 62,15.5 72,15 80,15"
              fill="none"
              stroke={isLightSection ? '#B8C4A0' : '#F3F0E8'}
              strokeWidth="0.6"
              strokeOpacity={isLightSection ? '0.6' : '0.5'}
              strokeLinecap="round"
            />

            {/* Lower secondary lateral veins */}
            <path
              d="M 16,20.2 C 24,26 36,29 44,29.5
                 M 36,20.2 C 44,25.5 56,27 66,27.5
                 M 54,20.2 C 62,24.5 72,25 80,25"
              fill="none"
              stroke={isLightSection ? '#B8C4A0' : '#F3F0E8'}
              strokeWidth="0.6"
              strokeOpacity={isLightSection ? '0.6' : '0.5'}
              strokeLinecap="round"
            />

            {/* Leading Edge Discovery Tip */}
            <circle
              cx="88"
              cy="20"
              r="2"
              fill={isLightSection ? '#EAE5D8' : '#FFFFFF'}
            />
            <circle
              cx="88"
              cy="20"
              r="4"
              fill={isLightSection ? '#556642' : '#C4B06E'}
              opacity="0.35"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
