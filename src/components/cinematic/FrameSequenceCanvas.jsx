import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useFrameSequence } from './useFrameSequence';

const FrameSequenceCanvas = forwardRef(({ 
  frameCount = 520, 
  onLoaded = () => {}
}, ref) => {
  const canvasRef = useRef(null);
  const { frames, loaded } = useFrameSequence(frameCount);
  
  // Track current frame state without React re-renders
  const stateRef = useRef({ progress: 0, lastDrawnIndex: -1 });

  useEffect(() => {
    if (loaded) {
      onLoaded();
      drawFrame(0); // Draw initial frame
    }
  }, [loaded, onLoaded]);

  const drawFrame = (progress) => {
    if (!loaded || !frames.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Calculate current frame index based on progress (0 to 1)
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(progress * (frameCount - 1)))
    );

    // Only draw if the frame actually changed
    if (frameIndex === stateRef.current.lastDrawnIndex) return;
    stateRef.current.lastDrawnIndex = frameIndex;

    const img = frames[frameIndex + 1]; // +1 because we loaded from frame 1
    
    if (img && img.complete) {
      // Avoid resizing canvas on every frame to save performance, 
      // but ensure it matches current window size
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      // ctx.clearRect(0, 0, canvas.width, canvas.height); // drawImage with cover effectively clears it
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  useImperativeHandle(ref, () => ({
    setProgress: (progress) => {
      stateRef.current.progress = progress;
      drawFrame(progress);
    }
  }));

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Force a redraw by resetting the last drawn index
      stateRef.current.lastDrawnIndex = -1;
      drawFrame(stateRef.current.progress);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, frames]);

  return (
    <div className="veda-canvas-container">
      <canvas ref={canvasRef} />
      <div className="veda-canvas-overlay" />
    </div>
  );
});

export default FrameSequenceCanvas;
