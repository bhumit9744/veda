import React, { useEffect, useRef, useState } from 'react';
import { LeafPhysicsSystem } from './LeafPhysics';

export default function LeafCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physicsRef = useRef<LeafPhysicsSystem | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Accessibility check for reduced motion
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Load the leaf image
    const img = new Image();
    img.src = '/assets/images/leaf-transparent.png'; // Make sure this asset exists
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || prefersReducedMotion.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup DPR for high DPI screens, cap around 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      if (physicsRef.current) {
        physicsRef.current.updateDimensions();
      }
    };

    window.addEventListener('resize', resize);
    
    physicsRef.current = new LeafPhysicsSystem();
    resize(); // initial setup

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      // Calculate delta time in seconds, capped to prevent huge jumps if tab is backgrounded
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Update physics
      if (physicsRef.current) {
        physicsRef.current.update(dt, time / 1000);
      }

      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (physicsRef.current && imageRef.current) {
        const img = imageRef.current;
        
        // Render leaves
        physicsRef.current.leaves.forEach(leaf => {
          if (!leaf.active) return;
          
          ctx.save();
          
          // Translate to leaf position
          ctx.translate(leaf.x, leaf.y);
          
          // Apply rotation
          ctx.rotate(leaf.rotation);
          
          // Simulate 3D flip with scaleX sine wave
          const flipScale = Math.sin(leaf.flipPhase);
          
          // Base size around 100px width. Scale modifies this for bg/mid/fg
          const baseWidth = 100 * leaf.scale;
          const baseHeight = 100 * leaf.scale * (img.height / img.width);
          
          // Apply scale and flip
          // We also apply subtle shape variants to make leaves look slightly different
          const stretchX = leaf.shapeVariant === 1 ? 0.8 : leaf.shapeVariant === 2 ? 1.2 : 1.0;
          const stretchY = leaf.shapeVariant === 1 ? 1.2 : leaf.shapeVariant === 2 ? 0.8 : 1.0;
          
          ctx.scale(flipScale * stretchX, 1 * stretchY);
          
          // Apply depth effects
          if (leaf.depth === 'bg') {
            ctx.globalAlpha = 0.5; // Slightly transparent
            // ctx.filter = 'blur(2px)'; // Optional: canvas blur is very slow, avoiding for 60fps
          } else if (leaf.depth === 'mid') {
            ctx.globalAlpha = 0.85;
          } else {
            ctx.globalAlpha = 1.0;
          }

          // Draw image centered
          ctx.drawImage(img, -baseWidth / 2, -baseHeight / 2, baseWidth, baseHeight);
          
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (physicsRef.current) {
        physicsRef.current.destroy();
      }
    };
  }, [imageLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
      style={{
        // Ensure it spans exactly the viewport
        display: 'block'
      }}
    />
  );
}
