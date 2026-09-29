import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutAlibaug() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
        }
      });

      // Initially dim and hidden
      gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });
      gsap.set([labelRef.current, titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });

      // Landscape fades in
      tl.to(imageRef.current, { opacity: 0.4, scale: 1, duration: 3 }, 0);
      
      // Text sequence
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 1 }, 1)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.5 }, 2)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.5 }, 2.5);

      tl.to({}, { duration: 2 }); // Hold

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[180vh] flex items-center justify-center bg-[#020403] overflow-hidden">
      
      {/* Landscape Texture Environment */}
      <div ref={imageRef} className="absolute inset-0 z-0 flex items-center justify-center opacity-0 pointer-events-none mix-blend-screen">
        {/* Abstract topographic contour lines */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%22100%25%22 height=%22100%25%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M 10 500 Q 200 400 400 500 T 800 400%22 fill=%22transparent%22 stroke=%22%23b89a6b%22 stroke-width=%221%22/%3E%3Cpath d=%22M 10 550 Q 200 450 400 550 T 800 450%22 fill=%22transparent%22 stroke=%22%23b89a6b%22 stroke-width=%221%22/%3E%3C/svg%3E')] background-repeat-y opacity-30" style={{ backgroundSize: '100% 100px' }} />
        
        {/* Subtle dark green aerial feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-[#020403]" />
        
        {/* Placeholder for botanical overlay */}
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(184,154,107,0.08)_0%,transparent_60%)] rounded-full blur-2xl" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(20,40,25,0.8)_0%,transparent_60%)] rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div ref={labelRef} className="text-xs uppercase tracking-[0.4em] text-[#b89a6b] mb-8">
          Why Veda
        </div>
        
        <h2 ref={titleRef} className="text-[clamp(4rem,12vw,12rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8] mb-6">
          Alibaug
        </h2>
        
        <div ref={subtitleRef} className="text-xl md:text-3xl font-serif italic text-[#F4F1E8]/70">
          Where Veda Began.
        </div>
      </div>

    </section>
  );
}
