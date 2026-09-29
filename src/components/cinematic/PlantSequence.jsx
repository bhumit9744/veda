import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 76;
const FRAME_START = 1;

export default function PlantSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  
  // Create an object to hold the tweenable value
  const frameObj = useRef({ frame: FRAME_START });

  useEffect(() => {
    // 1. Preload Images
    const loadedImages = new Array(TOTAL_FRAMES + 1);
    let loadedCount = 0;

    const loadFrame = (index) => {
      return new Promise((resolve) => {
        // Skip missing frame 73 if it exists in the numbering
        if (index === 73) resolve(null);
        
        const img = new Image();
        // Format: /plant_animation_frames/frame_001.jpg
        const paddedIndex = String(index).padStart(3, '0');
        img.src = `/plant_animation_frames/frame_${paddedIndex}.jpg`;
        img.onload = () => {
          loadedImages[index] = img;
          loadedCount++;
          if (index === FRAME_START) setFirstFrameLoaded(true);
          resolve(img);
        };
        img.onerror = () => {
          // Fallback or ignore
          resolve(null);
        };
      });
    };

    const preloadSequence = async () => {
      // Prioritize first 5 frames
      for (let i = FRAME_START; i <= Math.min(FRAME_START + 4, TOTAL_FRAMES); i++) {
        await loadFrame(i);
      }
      // Load the rest concurrently in small batches to avoid network choking
      const batchSize = 10;
      for (let i = FRAME_START + 5; i <= TOTAL_FRAMES; i += batchSize) {
        const batch = [];
        for (let j = 0; j < batchSize && i + j <= TOTAL_FRAMES; j++) {
          batch.push(loadFrame(i + j));
        }
        await Promise.all(batch);
      }
      setImages(loadedImages);
    };

    preloadSequence();
    
    // We only set images once to avoid re-rendering.
    // The canvas will directly access loadedImages array through a ref if needed, 
    // but passing it via state is okay since we draw in RAF/ScrollTrigger.
    setImages(loadedImages);
  }, []);

  // 2. Rendering Logic
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const img = images[index];
    if (!img) return;

    // Handle high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // CRITICAL FIX: Use window dimensions to prevent GSAP pin-spacer from inflating the canvas rect!
    // The previous getBoundingClientRect() read the 400vh pin height, causing a massive 4x zoom.
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    const targetWidth = Math.floor(screenW * dpr);
    const targetHeight = Math.floor(screenH * dpr);
    
    // ONLY resize the canvas buffer if the window dimensions actually changed
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Use COVER logic to ensure no borders ever appear.
    // scale = MAX(canvasWidth / imageWidth, canvasHeight / imageHeight)
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    
    // Center the image in the canvas buffer
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;
    
    // Draw the frame
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Resize handler - only force re-render if the window resizes
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(frameObj.current.frame));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  // Initial draw when first frame loads
  useEffect(() => {
    if (firstFrameLoaded) {
      renderFrame(FRAME_START);
    }
  }, [firstFrameLoaded]);

  // 3. GSAP ScrollTrigger
  useLayoutEffect(() => {
    if (!firstFrameLoaded) return;

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // 600vh scroll distance for ultra-smooth 76 frame playback
          pin: true,
          scrub: true, // pure scrub, no artificial lag
          invalidateOnRefresh: true,
        }
      });

      // Animate frame object
      tl.to(frameObj.current, {
        frame: TOTAL_FRAMES,
        ease: "none",
        duration: 1, // Represents the relative duration in the timeline
        onUpdate: () => {
          renderFrame(Math.round(frameObj.current.frame));
        }
      });

      // Hold the final frame for a moment before unpinning
      // This ensures the last few seconds of the video are fully visible and readable
      // rather than instantly scrolling out of view when the animation completes.
      tl.to({}, { duration: 0.15 });

    }, containerRef);

    return () => ctx.revert();
  }, [firstFrameLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#F5F1E8] overflow-hidden">
      
      <canvas 
        ref={canvasRef} 
        className="w-[100vw] h-[100vh] block"
      />

    </div>
  );
}
