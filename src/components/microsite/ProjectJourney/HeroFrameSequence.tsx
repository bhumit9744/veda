import { useEffect, useRef, useState, useMemo } from 'react';

interface HeroFrameSequenceProps {
  progress: number;
}

export default function HeroFrameSequence({ progress }: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 314;
  
  // Active between 0.00 and 0.15 (the first section).
  // Adjust this range if the animation should span longer!
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, progress / 0.15));
  }, [progress]);
  
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;
    
    // We only load every Nth frame if needed for performance, but 314 is okay.
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameIndex = String(i).padStart(4, '0');
      img.src = `/assets/images/veda_ai_frames/frame_${frameIndex}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === frameCount) {
          // Trigger a re-render when all are loaded to draw the first frame
          setImages([...loadedImages]);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    let frameIndex = Math.floor(localProgress * (frameCount - 1));
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex >= frameCount) frameIndex = frameCount - 1;
    
    const img = images[frameIndex];
    if (img && img.complete) {
      // Draw image covering the canvas (object-fit: cover)
      const canvas = canvasRef.current;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (cw - iw * ratio) / 2;
      const cy = (ch - ih * ratio) / 2;
      
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, cx, cy, iw * ratio, ih * ratio);
    }
  }, [localProgress, images]);

  // Handle Resize
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const opacity = progress > 0.15 ? Math.max(0, 1 - (progress - 0.15) / 0.05) : 1;

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
