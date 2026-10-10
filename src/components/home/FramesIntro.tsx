import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The exact sequence of frames present in the directory (60 frames total, skipping missing 058)
const FRAMES_LIST = [
  'frame_001.jpg', 'frame_002.jpg', 'frame_003.jpg', 'frame_004.jpg', 'frame_005.jpg',
  'frame_006.jpg', 'frame_007.jpg', 'frame_008.jpg', 'frame_009.jpg', 'frame_010.jpg',
  'frame_011.jpg', 'frame_012.jpg', 'frame_013.jpg', 'frame_014.jpg', 'frame_015.jpg',
  'frame_016.jpg', 'frame_017.jpg', 'frame_018.jpg', 'frame_019.jpg', 'frame_020.jpg',
  'frame_021.jpg', 'frame_022.jpg', 'frame_023.jpg', 'frame_024.jpg', 'frame_025.jpg',
  'frame_026.jpg', 'frame_027.jpg', 'frame_028.jpg', 'frame_029.jpg', 'frame_030.jpg',
  'frame_031.jpg', 'frame_032.jpg', 'frame_033.jpg', 'frame_034.jpg', 'frame_035.jpg',
  'frame_036.jpg', 'frame_037.jpg', 'frame_038.jpg', 'frame_039.jpg', 'frame_040.jpg',
  'frame_041.jpg', 'frame_042.jpg', 'frame_043.jpg', 'frame_044.jpg', 'frame_045.jpg',
  'frame_046.jpg', 'frame_047.jpg', 'frame_048.jpg', 'frame_049.jpg', 'frame_050.jpg',
  'frame_051.jpg', 'frame_052.jpg', 'frame_053.jpg', 'frame_054.jpg', 'frame_055.jpg',
  'frame_056.jpg', 'frame_057.jpg', 'frame_059.jpg', 'frame_060.jpg', 'frame_061.jpg'
];

export default function FramesIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(FRAMES_LIST.length));
  const objRef = useRef({ progress: 0 }); // Use generic progress 0 to 1
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization for opaque images
    if (!ctx) return;
    
    // Render function
    const renderFrame = (index: number) => {
       // Look backwards if the exact frame isn't loaded yet
       let img = imagesRef.current[index];
       let searchIndex = index;
       while ((!img || !img.complete || img.naturalWidth === 0) && searchIndex > 0) {
           searchIndex--;
           img = imagesRef.current[searchIndex];
       }
       
       if (!img || !img.complete || img.naturalWidth === 0) return;
       
       const dpr = window.devicePixelRatio || 1;
       const rect = containerRef.current!.getBoundingClientRect();
       
       // Only resize canvas if dimensions change
       if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
           canvas.width = rect.width * dpr;
           canvas.height = rect.height * dpr;
           ctx.scale(dpr, dpr);
       }
       
       // Calculate cover dimensions
       const canvasRatio = rect.width / rect.height;
       const imgRatio = img.width / img.height;
       
       let drawWidth = rect.width;
       let drawHeight = rect.height;
       let offsetX = 0;
       let offsetY = 0;
       
       if (canvasRatio > imgRatio) {
           // Canvas is wider than image
           drawHeight = rect.width / imgRatio;
           offsetY = (rect.height - drawHeight) / 2;
       } else {
           // Canvas is taller than image
           drawWidth = rect.height * imgRatio;
           offsetX = (rect.width - drawWidth) / 2;
       }
       
       ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Preload images efficiently
    let isCancelled = false;
    const loadImages = async () => {
      // 1. Load first frame immediately
      const firstImg = new Image();
      firstImg.src = `/video_frames/${FRAMES_LIST[0]}`;
      await new Promise((resolve) => {
        firstImg.onload = () => {
          if (!isCancelled) {
             imagesRef.current[0] = firstImg;
             renderFrame(0);
          }
          resolve(true);
        };
        firstImg.onerror = () => resolve(false);
      });

      if (isCancelled) return;

      // 2. Load the rest asynchronously in small chunks to avoid blocking the main thread
      const loadChunk = async (startIndex: number, endIndex: number) => {
         const promises = [];
         for (let i = startIndex; i < endIndex && i < FRAMES_LIST.length; i++) {
           const img = new Image();
           img.src = `/video_frames/${FRAMES_LIST[i]}`;
           const p = new Promise((resolve) => {
             img.onload = () => {
               if (!isCancelled) imagesRef.current[i] = img;
               resolve(true);
             };
             img.onerror = () => {
               console.warn(`Failed to load ${FRAMES_LIST[i]}`);
               resolve(false);
             };
           });
           promises.push(p);
         }
         await Promise.all(promises);
      };

      // Load 5 frames at a time
      for (let i = 1; i < FRAMES_LIST.length; i += 5) {
         if (isCancelled) break;
         await loadChunk(i, i + 5);
      }
    };
    
    loadImages();
    
    // Setup GSAP
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let gsapCtx: gsap.Context;
    
    const updateFrameFromProgress = () => {
       const frameIndex = Math.round(objRef.current.progress * (FRAMES_LIST.length - 1));
       const clampedIndex = Math.max(0, Math.min(frameIndex, FRAMES_LIST.length - 1));
       renderFrame(clampedIndex);
    };

    if (prefersReducedMotion) {
       gsapCtx = gsap.context(() => {
           // Wait a bit to ensure image loaded if fallback triggers
           setTimeout(() => renderFrame(0), 100);
       }, containerRef);
    } else {
       gsapCtx = gsap.context(() => {
          gsap.to(objRef.current, {
             progress: 1, // Tween progress from 0 to 1 smoothly
             ease: "none",
             scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Longer scroll distance for 60 frames allows better detail
                scrub: 1.5, // Added smoothing for high frame count
                pin: true,
                onUpdate: updateFrameFromProgress
             },
             onUpdate: updateFrameFromProgress
          });
       }, containerRef);
    }
    
    // Handle resize with debouncing
    let resizeTimer: any;
    const handleResize = () => {
       clearTimeout(resizeTimer);
       resizeTimer = setTimeout(() => {
           updateFrameFromProgress();
           ScrollTrigger.refresh();
       }, 150);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
       isCancelled = true;
       window.removeEventListener('resize', handleResize);
       clearTimeout(resizeTimer);
       gsapCtx.revert();
    };
  }, []);
  
  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
       <canvas 
         ref={canvasRef} 
         className="absolute top-0 left-0 w-full h-full block" 
       />
       {/* Minimal gradient or overlay to preserve nav contrast if needed */}
       <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    </section>
  );
}
