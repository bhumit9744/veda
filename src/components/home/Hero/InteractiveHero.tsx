import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { HeroInteraction } from './HeroInteraction';
import { DistortionTypography } from './DistortionTypography';

export interface InteractiveHeroRef {
  initAnimations: (tl: gsap.core.Timeline) => void;
}

const InteractiveHero = forwardRef<InteractiveHeroRef, {}>((props, ref) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [interaction, setInteraction] = useState<HeroInteraction | null>(null);

  // Initialize interaction engine
  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new HeroInteraction(canvasRef.current);
    setInteraction(engine);

    // Give DOM a tick to lay out, then recalculate and start
    const timer = setTimeout(() => {
      engine.recalculateRects();
      engine.start();
    }, 100);

    return () => {
      clearTimeout(timer);
      engine.stop();
      // Need a way to destroy particles if needed, but stopping raf is enough
    };
  }, []);

  useImperativeHandle(ref, () => ({
    initAnimations: (tl: gsap.core.Timeline) => {
      // Transition from Hero to Content (0 to 40)
      tl.to(heroRef.current, {
        autoAlpha: 0,
        y: -50,
        duration: 40,
        ease: "power2.inOut",
        onUpdate: function() {
          // Disable interaction when scroll starts
          if (this.progress() > 0.02 && interaction) {
            interaction.setInteractive(false);
          } else if (this.progress() <= 0.02 && interaction) {
            interaction.setInteractive(true);
          }
        }
      }, 0);

      // Background slightly darkens
      tl.to(bgOverlayRef.current, {
        opacity: 0.5,
        duration: 40,
        ease: "power2.inOut"
      }, 0);
    }
  }));

  // Initial Intro Animation
  useEffect(() => {
    if (!interaction) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.0 });
      
      tl.to('.line-1 .char', { opacity: 0.7, duration: 1.5, stagger: 0.03, ease: 'power2.out' }, 0)
        .to('.line-2 .char', { opacity: 0.7, duration: 1.5, stagger: 0.03, ease: 'power2.out' }, 0.5)
        .to('.line-3 .char', { opacity: 0.7, duration: 1.5, stagger: 0.03, ease: 'power2.out' }, 1.5)
        .to('.line-4 .char', { opacity: 0.7, duration: 1.5, stagger: 0.03, ease: 'power2.out' }, 2.0)
        .fromTo('.scroll-indicator', { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 3.5);
    }, containerRef);

    return () => ctx.revert();
  }, [interaction]);

  return (
    <>
      <div 
        ref={heroRef}
        className="interactive-hero absolute inset-0 z-30 flex flex-col justify-center pointer-events-auto overflow-hidden"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />

        <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          
          <div className="flex flex-col gap-6 md:gap-12 w-full max-w-6xl mx-auto relative z-20 font-veda-serif text-3xl md:text-5xl lg:text-7xl xl:text-[5.5rem] leading-[1.1] tracking-tight text-veda-ivory cursor-default">
            
            {/* Editorial Layout: First Statement (Left aligned, indented second line) */}
            <div className="flex flex-col items-start w-full">
              <div className="line-1">
                <DistortionTypography word="WE BELIEVE GOOD LAND" interaction={interaction!} />
              </div>
              <div className="line-2 md:ml-[15%] lg:ml-[25%]">
                <DistortionTypography word="IS FOUND." interaction={interaction!} />
              </div>
            </div>
            
            {/* Editorial Layout: Second Statement (Right aligned, indented second line) */}
            <div className="flex flex-col items-end w-full mt-12 md:mt-16">
              <div className="line-3">
                <DistortionTypography word="GREAT OPPORTUNITIES" interaction={interaction!} />
              </div>
              <div className="line-4 md:mr-[10%] lg:mr-[20%]">
                <DistortionTypography word="ARE CREATED." interaction={interaction!} />
              </div>
            </div>

          </div>

          <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-veda-ivory opacity-70 z-20">
            <span className="font-veda-sans text-[9px] uppercase tracking-[0.4em]">Scroll to Enter</span>
            <div className="w-[1px] h-10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-veda-ivory/20" />
              <motion.div
                animate={{ y: [0, 40] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-veda-ivory"
              />
            </div>
            <span className="font-veda-sans text-[9px] uppercase tracking-[0.4em] mt-4 opacity-50">Veda Life Spaces</span>
          </div>

        </div>
      </div>

      {/* Dark overlay that increases on scroll */}
      <div ref={bgOverlayRef} className="absolute inset-0 bg-veda-dark-1 opacity-0 z-20 pointer-events-none mix-blend-multiply" />
    </>
  );
});

export default InteractiveHero;
