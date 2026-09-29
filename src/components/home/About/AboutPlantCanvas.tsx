import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  sceneRef: React.RefObject<HTMLElement>;
}

const ABOUT_DEBUG = false; // set to true to enable visual debug checkpoints

export default function AboutPlantCanvas({ sceneRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [debugInfo, setDebugInfo] = useState({ frame: 1, progress: 0, state: 'INTRO' });
  const frameCount = 224;
  
  const currentFrame = (index: number) => 
    `/plant_animation_frames/frame_${String(index).padStart(3, '0')}.webp`;

  useEffect(() => {
    if (!sceneRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const images: HTMLImageElement[] = [];
      const imageSeq = { frame: prefersReducedMotion ? 224 : 1 };

      const render = (frameIdx: number = Math.round(imageSeq.frame)) => {
        // Ensure index is within bounds
        let renderIdx = Math.max(1, Math.min(224, frameIdx));
        
        // Find closest loaded frame if exact is not ready
        while (renderIdx > 0 && (!images[renderIdx - 1] || !images[renderIdx - 1].complete)) {
            renderIdx--;
        }
        
        if (renderIdx === 0) return; // No frames loaded yet

        const img = images[renderIdx - 1];
        if (img.complete) {
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;
          
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            img, 
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
          );
        }
      };

      const handleResize = () => {
        // Cap DPR around 2 to prevent excessive memory on 3x screens while keeping quality
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.scale(dpr, dpr);
        render();
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();

      const loadFrame = (index: number) => {
        const img = new Image();
        img.src = currentFrame(index);
        if (index === 1 || index === 224) {
          img.onload = () => render();
        }
        images[index - 1] = img;
      };

      if (prefersReducedMotion) {
        loadFrame(224);
      } else {
        loadFrame(1);
        setTimeout(() => {
          for (let i = 2; i <= 45; i++) loadFrame(i);
          setTimeout(() => {
            for (let i = 46; i <= frameCount; i++) loadFrame(i);
          }, 100);
        }, 0);

        gsap.to(imageSeq, {
          frame: frameCount,
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
               render();
               if (ABOUT_DEBUG) {
                 const prog = self.progress;
                 let state = 'INTRO';
                 if (prog > 0.15 && prog <= 0.37) state = 'P1';
                 else if (prog > 0.37 && prog <= 0.56) state = 'P2';
                 else if (prog > 0.56 && prog <= 0.78) state = 'P3';
                 else if (prog > 0.78) state = 'P4';
                 
                 setDebugInfo({
                   frame: Math.round(imageSeq.frame),
                   progress: Math.round(prog * 100),
                   state
                 });
               }
            }
          }
        });
      }

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => ctx.revert();
  }, [sceneRef]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />
      {ABOUT_DEBUG && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-4 font-mono text-xs rounded border border-white/20">
           <div>FRAME {String(debugInfo.frame).padStart(3, '0')} / 224</div>
           <div>PROGRESS {debugInfo.progress}%</div>
           <div>STATE: {debugInfo.state}</div>
        </div>
      )}
    </>
  );
}
