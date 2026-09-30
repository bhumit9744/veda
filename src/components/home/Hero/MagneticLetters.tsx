import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticLetters({ word, isInteractive }: { word: string, isInteractive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Skip heavy physics on mobile/reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (mq.matches || isMobile) return;

    let cursorX = 0;
    let cursorY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      velocityX = cursorX - lastX;
      velocityY = cursorY - lastY;
      lastX = cursorX;
      lastY = cursorY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Create GSAP quick setters for high performance
    const setters = lettersRef.current.map((el) => {
      if (!el) return null;
      return {
        x: gsap.quickSetter(el, "x", "px"),
        y: gsap.quickSetter(el, "y", "px"),
        rotation: gsap.quickSetter(el, "rotation", "deg"),
        color: gsap.quickSetter(el, "color"),
      };
    });

    // Store letter physics state
    const physics = lettersRef.current.map(() => ({
      x: 0, y: 0, vx: 0, vy: 0, rot: 0
    }));

    const render = () => {
      if (!isInteractive) {
        // Return to rest smoothly
        physics.forEach((p, i) => {
          p.x += (0 - p.x) * 0.1;
          p.y += (0 - p.y) * 0.1;
          p.rot += (0 - p.rot) * 0.1;
          
          const set = setters[i];
          if (set) {
            set.x(p.x);
            set.y(p.y);
            set.rotation(p.rot);
            set.color('#F4F1E8'); // reset to ivory
          }
        });
        return; // Don't loop requestAnimationFrame, but GSAP ticker handles it. Wait, I'm using requestAnimationFrame.
      }

      // Decay velocity
      velocityX *= 0.9;
      velocityY *= 0.9;

      const radius = 220; // proximity radius

      lettersRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const dx = cursorX - elX;
        const dy = cursorY - elY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const p = physics[i];
        
        if (dist < radius) {
          // Inside radius - magnetic force
          const strength = 1 - (dist / radius);
          const pushX = (dx / dist) * strength * -15; // push away
          const pushY = (dy / dist) * strength * -15;
          
          // Add cursor velocity influence
          p.vx += (pushX + velocityX * strength * 0.05) * 0.2;
          p.vy += (pushY + velocityY * strength * 0.05) * 0.2;
          
          // Rotation based on x velocity
          p.rot += (p.vx * 0.5 - p.rot) * 0.2;
          
          // Slight gold tint based on proximity
          if (setters[i]) {
            // blend ivory (#F4F1E8) towards gold (#C7A34A) slightly
            // just hardcode a subtle gold for simplicity if extremely close
            if (dist < 100) {
              setters[i]!.color('#e6d5b3');
            } else {
              setters[i]!.color('#F4F1E8');
            }
          }
        } else {
          // Outside radius - spring back
          p.vx += (0 - p.x) * 0.05;
          p.vy += (0 - p.y) * 0.05;
          p.rot += (0 - p.rot) * 0.05;
          
          if (setters[i]) setters[i]!.color('#F4F1E8');
        }
        
        // Apply friction
        p.vx *= 0.8;
        p.vy *= 0.8;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Apply to DOM
        const set = setters[i];
        if (set) {
          set.x(p.x);
          set.y(p.y);
          set.rotation(p.rot);
        }
      });
    };

    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(render);
    };
  }, [isInteractive]);

  return (
    <div 
      ref={containerRef} 
      className="font-veda-serif text-[clamp(40px,6vw,100px)] text-veda-ivory uppercase font-light tracking-wide leading-[1.0] flex flex-wrap"
    >
      {word.split(' ').map((w, wIndex) => (
        <div key={wIndex} className="flex mr-[clamp(12px,2vw,30px)]">
          {w.split('').map((char, cIndex) => {
            const index = wIndex * 100 + cIndex; // unique enough
            return (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block relative whitespace-pre"
                style={{ transformOrigin: 'center center' }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
