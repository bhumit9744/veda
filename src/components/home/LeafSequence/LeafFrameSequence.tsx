import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface LeafFrameSequenceRef {
  setProgress: (p: number) => void;
}

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = '/leaf-frames-desktop/frame_';
const FRAME_EXTENSION = '.webp';

const pad = (num: number, size: number) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const getImagePath = (index: number) => `${FRAME_PREFIX}${pad(index, 4)}${FRAME_EXTENSION}`;

// Controlled Cache
const MAX_CACHE_SIZE = 60; // Keep up to 60 decoded frames in memory

const LeafFrameSequence = forwardRef<LeafFrameSequenceRef>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const requestRef = useRef<number>();
  const lastRenderedFrameRef = useRef(-1);
  
  // State for frame loading
  const bitmapsCache = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const loadingQueue = useRef<Set<number>>(new Set());
  const preloaderInterval = useRef<number | null>(null);

  const loadFrame = async (index: number) => {
    if (bitmapsCache.current.has(index) || loadingQueue.current.has(index)) return;
    
    // Manage cache size
    if (bitmapsCache.current.size > MAX_CACHE_SIZE) {
      // Find the furthest frame from current progress and delete it
      const currentFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progressRef.current * (TOTAL_FRAMES - 1))));
      let furthest = -1;
      let maxDist = -1;
      for (const key of bitmapsCache.current.keys()) {
        const dist = Math.abs(key - currentFrame);
        if (dist > maxDist) {
          maxDist = dist;
          furthest = key;
        }
      }
      if (furthest !== -1 && maxDist > 30) {
        const bmp = bitmapsCache.current.get(furthest);
        if (bmp && 'close' in bmp) {
            (bmp as ImageBitmap).close();
        }
        bitmapsCache.current.delete(furthest);
      }
    }

    loadingQueue.current.add(index);

    try {
      if (typeof window.createImageBitmap === 'function') {
        const response = await fetch(getImagePath(index));
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const bitmap = await window.createImageBitmap(blob);
        bitmapsCache.current.set(index, bitmap);
      } else {
        // Fallback to Image.decode()
        const img = new Image();
        img.src = getImagePath(index);
        await img.decode();
        bitmapsCache.current.set(index, img);
      }
    } catch (e) {
      console.warn(`Failed to load frame ${index}:`, e);
    } finally {
      loadingQueue.current.delete(index);
    }
  };

  const preloadSmart = () => {
    const currentFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progressRef.current * (TOTAL_FRAMES - 1))));
    const direction = currentFrame >= lastRenderedFrameRef.current ? 1 : -1;
    
    // Priority 1: Current frame
    loadFrame(currentFrame);

    // Priority 2: Directional lookahead (next 15 frames)
    for (let i = 1; i <= 15; i++) {
      const ahead = currentFrame + (i * direction);
      if (ahead >= 1 && ahead <= TOTAL_FRAMES) {
        loadFrame(ahead);
      }
    }

    // Priority 3: Opposite direction (buffer 5 frames behind)
    for (let i = 1; i <= 5; i++) {
      const behind = currentFrame - (i * direction);
      if (behind >= 1 && behind <= TOTAL_FRAMES) {
        loadFrame(behind);
      }
    }
  };

  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize canvas
    if (!ctx) return;

    const p = progressRef.current;
    const exactFrame = 1 + p * (TOTAL_FRAMES - 1);
    let frameIndex = Math.round(exactFrame);
    
    if (frameIndex < 1) frameIndex = 1;
    if (frameIndex > TOTAL_FRAMES) frameIndex = TOTAL_FRAMES;

    // Redraw only if frame changed
    if (frameIndex !== lastRenderedFrameRef.current) {
        let imgToDraw = bitmapsCache.current.get(frameIndex);
        
        // Find nearest if exact is not ready
        if (!imgToDraw) {
          let dist = 1;
          while (dist < TOTAL_FRAMES) {
             const up = frameIndex + dist;
             const down = frameIndex - dist;
             if (bitmapsCache.current.has(up)) {
                 imgToDraw = bitmapsCache.current.get(up);
                 break;
             }
             if (bitmapsCache.current.has(down)) {
                 imgToDraw = bitmapsCache.current.get(down);
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
          
          // No need to clearRect if drawing over the whole thing and using alpha: false
          ctx.drawImage(
            imgToDraw, 
            0, 0, imgToDraw.width, imgToDraw.height,
            centerShift_x, centerShift_y, imgToDraw.width * ratio, imgToDraw.height * ratio
          );
          
          lastRenderedFrameRef.current = frameIndex;
        }
    }
    
    requestRef.current = requestAnimationFrame(renderFrame);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // force redraw on resize
      lastRenderedFrameRef.current = -1;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initial load: frames 1 to 10 immediately
    const initialLoad = async () => {
      await loadFrame(1);
      for (let i = 2; i <= 10; i++) {
        loadFrame(i); // don't await, let them load in background
      }
    };
    initialLoad();

    // Smart preloader interval
    preloaderInterval.current = window.setInterval(() => {
        preloadSmart();
    }, 150);

    // Start render loop
    requestRef.current = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (preloaderInterval.current) clearInterval(preloaderInterval.current);
      
      // Cleanup bitmaps
      bitmapsCache.current.forEach(bmp => {
         if ('close' in bmp) {
            (bmp as ImageBitmap).close();
         }
      });
      bitmapsCache.current.clear();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      progressRef.current = p;
    }
  }));

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none"
    />
  );
});

LeafFrameSequence.displayName = 'LeafFrameSequence';
export default LeafFrameSequence;
