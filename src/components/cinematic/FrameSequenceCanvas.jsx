import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useFrameSequence } from './useFrameSequence';

const FrameSequenceCanvas = forwardRef(({ 
  frameCount = 520, 
  onLoaded = () => {}
}, ref) => {
  const canvasRef = useRef(null);
  const debugRef = useRef(null);
  const { frames, loaded } = useFrameSequence(frameCount);
  
  // Track current frame state without React re-renders
  const stateRef = useRef({ progress: 0, lastDrawnIndex: -1 });

  useEffect(() => {
    if (loaded) {
      onLoaded();
      drawFrame(stateRef.current.progress); // Draw initial frame based on current progress
    }
  }, [loaded, onLoaded]);

  const drawFrame = (progress) => {
    if (!loaded || !frames || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Calculate current frame index based on progress (0 to 1)
    const frameIndex = Math.floor(progress * (frameCount - 1));
    
    // Map frameIndex (0 to frameCount-1) to image array index (1 to frameCount)
    // because useFrameSequence loads frame_001.jpg into index 1.
    const imageIndex = Math.min(frameCount, Math.max(1, frameIndex + 1));

    // Update debug overlay
    if (debugRef.current) {
      debugRef.current.innerText = `FRAME: ${String(imageIndex).padStart(3, '0')} / ${frameCount}\nPROGRESS: ${progress.toFixed(4)}\nSCROLLTRIGGER: ACTIVE`;
    }

    // Only draw if the frame actually changed
    if (imageIndex === stateRef.current.lastDrawnIndex) return;
    stateRef.current.lastDrawnIndex = imageIndex;

    const img = frames[imageIndex];
    
    if (img && img.complete) {
      // Avoid resizing canvas on every frame to save performance, 
      // but ensure it matches current window size
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        // Use devicePixelRatio for better rendering on high-DPI displays
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
      }

      const canvasRatio = window.innerWidth / window.innerHeight;
      const imgRatio = img.width / img.height;
      
      let drawWidth = window.innerWidth;
      let drawHeight = window.innerHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = window.innerWidth / imgRatio;
        offsetY = (window.innerHeight - drawHeight) / 2;
      } else {
        drawWidth = window.innerHeight * imgRatio;
        offsetX = (window.innerWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
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
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div className="veda-canvas-overlay" />
      
      {/* Critical Debug Overlay */}
      <div 
        ref={debugRef}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#00ff00',
          padding: '10px 15px',
          fontFamily: 'monospace',
          fontSize: '14px',
          zIndex: 9999,
          pointerEvents: 'none',
          whiteSpace: 'pre',
          border: '1px solid #00ff00'
        }}
      >
        FRAME: 001 / {frameCount}{'\n'}PROGRESS: 0.0000{'\n'}SCROLLTRIGGER: WAITING...
      </div>
    </div>
  );
});

export default FrameSequenceCanvas;
