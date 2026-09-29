import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const emphasisRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

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

      // Initial state
      gsap.set([text1Ref.current, text2Ref.current, emphasisRef.current], { opacity: 0, y: 20 });
      gsap.set(textureRef.current, { opacity: 0 });

      // Line 1
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 2 }, 1);
      
      // Line 2
      tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 2 }, 3);
      
      // Emphasis & Texture
      tl.to(emphasisRef.current, { opacity: 1, y: 0, duration: 2 }, 5)
        .to(textureRef.current, { opacity: 1, duration: 3 }, 5);

      // Transition (08)
      // "CREATE OPPORTUNITIES" moves upward, rest fades
      tl.to([text1Ref.current, text2Ref.current], { opacity: 0, duration: 2 }, 9)
        .to(emphasisRef.current, { y: -150, scale: 1.2, duration: 3 }, 9);
      
      // Hold
      tl.to({}, { duration: 3 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[250vh] flex items-center justify-center bg-[#010302] overflow-hidden">
      
      {/* Subtle Botanical/Light Texture */}
      <div ref={textureRef} className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(22,45,28,0.4)_0%,transparent_70%)] rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        <div ref={text1Ref} className="text-xl md:text-3xl font-light text-[#F4F1E8]/60 tracking-widest uppercase leading-relaxed mb-6">
          We don't develop land first and then create demand.
        </div>
        
        <div ref={text2Ref} className="text-xl md:text-3xl font-light text-[#F4F1E8]/60 tracking-widest uppercase leading-relaxed mb-12">
          We identify demand first and then...
        </div>
        
        <div ref={emphasisRef} className="text-[clamp(3rem,8vw,8rem)] leading-none font-light uppercase tracking-widest text-[#b89a6b]">
          Create<br/>
          <span className="text-[#F4F1E8]">Opportunities</span>
        </div>

      </div>
    </section>
  );
}
