import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  sceneRef: React.RefObject<HTMLDivElement>;
}

const ABOUT_DEBUG = false;

// Controlled Cache
const MAX_CACHE_SIZE = 60; // Keep up to 60 decoded frames in memory

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
      const context = canvas.getContext('2d', { alpha: false });
      if (!context) return;

      const bitmapsCache = new Map<number, ImageBitmap | HTMLImageElement>();
      const loadingQueue = new Set<number>();
      let lastRenderedFrame = -1;
      let preloaderInterval: number | null = null;
      
      const imageSeq = { frame: prefersReducedMotion ? frameCount : 1 };

      const loadFrame = async (index: number) => {
        if (bitmapsCache.has(index) || loadingQueue.has(index)) return;
        
        // Manage cache size
        if (bitmapsCache.size > MAX_CACHE_SIZE) {
          const currentFrameIdx = Math.max(1, Math.min(frameCount, Math.round(imageSeq.frame)));
          let furthest = -1;
          let maxDist = -1;
          for (const key of bitmapsCache.keys()) {
            const dist = Math.abs(key - currentFrameIdx);
            if (dist > maxDist) {
              maxDist = dist;
              furthest = key;
            }
          }
          if (furthest !== -1 && maxDist > 30) {
            const bmp = bitmapsCache.get(furthest);
            if (bmp && 'close' in bmp) {
                (bmp as ImageBitmap).close();
            }
            bitmapsCache.delete(furthest);
          }
        }

        loadingQueue.add(index);

        try {
          if (typeof window.createImageBitmap === 'function') {
            const response = await fetch(currentFrame(index));
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const bitmap = await window.createImageBitmap(blob);
            bitmapsCache.set(index, bitmap);
          } else {
            const img = new Image();
            img.src = currentFrame(index);
            await img.decode();
            bitmapsCache.set(index, img);
          }
        } catch (e) {
          console.warn(`Failed to load frame ${index}:`, e);
        } finally {
          loadingQueue.delete(index);
        }
      };

      const preloadSmart = () => {
        const currentFrameIdx = Math.max(1, Math.min(frameCount, Math.round(imageSeq.frame)));
        const direction = currentFrameIdx >= lastRenderedFrame ? 1 : -1;
        
        loadFrame(currentFrameIdx);

        // Priority 2: Directional lookahead (next 15 frames)
        for (let i = 1; i <= 15; i++) {
          const ahead = currentFrameIdx + (i * direction);
          if (ahead >= 1 && ahead <= frameCount) {
            loadFrame(ahead);
          }
        }

        // Priority 3: Opposite direction (buffer 5 frames behind)
        for (let i = 1; i <= 5; i++) {
          const behind = currentFrameIdx - (i * direction);
          if (behind >= 1 && behind <= frameCount) {
            loadFrame(behind);
          }
        }
      };

      const render = (frameIdx: number = Math.round(imageSeq.frame)) => {
        let renderIdx = Math.max(1, Math.min(frameCount, frameIdx));
        
        if (renderIdx !== lastRenderedFrame) {
            let imgToDraw = bitmapsCache.get(renderIdx);
            
            // Find nearest if exact is not ready
            if (!imgToDraw) {
              let dist = 1;
              while (dist < frameCount) {
                 const up = renderIdx + dist;
                 const down = renderIdx - dist;
                 if (bitmapsCache.has(up)) {
                     imgToDraw = bitmapsCache.get(up);
                     break;
                 }
                 if (bitmapsCache.has(down)) {
                     imgToDraw = bitmapsCache.get(down);
                     break;
                 }
                 dist++;
              }
            }

            if (imgToDraw) {
              const hRatio = canvas.width / imgToDraw.width;
              const vRatio = canvas.height / imgToDraw.height;
              const ratio = Math.max(hRatio, vRatio);
              const centerShift_x = (canvas.width - imgToDraw.width * ratio) / 2;
              const centerShift_y = (canvas.height - imgToDraw.height * ratio) / 2;
              
              context.drawImage(
                imgToDraw, 
                0, 0, imgToDraw.width, imgToDraw.height,
                centerShift_x, centerShift_y, imgToDraw.width * ratio, imgToDraw.height * ratio
              );
              
              lastRenderedFrame = renderIdx;
            }
        }
      };

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        lastRenderedFrame = -1;
        render();
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();

      if (prefersReducedMotion) {
        loadFrame(frameCount).then(() => render());
      } else {
        // Initial load: frames 1 to 10 immediately
        const initialLoad = async () => {
          await loadFrame(1);
          render();
          for (let i = 2; i <= 10; i++) {
            loadFrame(i); // don't await
          }
        };
        initialLoad();

        preloaderInterval = window.setInterval(() => {
            preloadSmart();
        }, 150);

        gsap.to(imageSeq, {
          frame: frameCount,
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
               // Use requestAnimationFrame for the render to avoid React/GSAP fighting
               requestAnimationFrame(() => render());
               
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
        if (preloaderInterval) clearInterval(preloaderInterval);
        bitmapsCache.forEach(bmp => {
           if ('close' in bmp) {
              (bmp as ImageBitmap).close();
           }
        });
        bitmapsCache.clear();
      };
    });

    return () => ctx.revert();
  }, [sceneRef]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover" 
      />
      {ABOUT_DEBUG && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-4 font-mono text-xs rounded border border-white/20">
           <div>FRAME {String(debugInfo.frame).padStart(3, '0')} / {frameCount}</div>
           <div>PROGRESS {debugInfo.progress}%</div>
           <div>STATE: {debugInfo.state}</div>
        </div>
      )}
    </>
  );
}
