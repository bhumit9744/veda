import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

const LeafFrameCanvas = forwardRef((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const requestRef = useRef<number | undefined>(undefined);
  const TOTAL_FRAMES = 150;

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      progressRef.current = p;
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(render);
      }
    }
  }));

  const loadFrame = (index: number) => {
    if (imagesRef.current.has(index)) return;
    const img = new Image();
    const frameStr = String(index).padStart(4, '0');
    img.src = `/leaf-frames/frame_${frameStr}.webp`;
    imagesRef.current.set(index, img);
    img.onload = () => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(render);
      }
    };
    img.onerror = () => {
      console.warn(`Failed to load frame ${index} at ${img.src}`);
    };
  };

  useEffect(() => {
    loadFrame(1);
    
    let loadedCount = 2;
    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        if (loadedCount <= TOTAL_FRAMES) {
          loadFrame(loadedCount);
          loadedCount++;
        } else {
          clearInterval(interval);
          break;
        }
      }
    }, 30);

    return () => {
      clearInterval(interval);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const render = () => {
    requestRef.current = undefined;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progressRef.current * (TOTAL_FRAMES - 1)) + 1));
    
    let img = imagesRef.current.get(frameIndex);
    
    if (!img || !img.complete || img.naturalWidth === 0) {
      let offset = 1;
      let found = false;
      while (offset < TOTAL_FRAMES) {
        const up = imagesRef.current.get(frameIndex + offset);
        if (up && up.complete && up.naturalWidth > 0) {
          img = up;
          found = true;
          break;
        }
        const down = imagesRef.current.get(frameIndex - offset);
        if (down && down.complete && down.naturalWidth > 0) {
          img = down;
          found = true;
          break;
        }
        offset++;
      }
      if (!found) return;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    if (!img) return;
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', render);
    render();
    return () => window.removeEventListener('resize', render);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      style={{ display: 'block' }}
    />
  );
});

LeafFrameCanvas.displayName = 'LeafFrameCanvas';
export default LeafFrameCanvas;
