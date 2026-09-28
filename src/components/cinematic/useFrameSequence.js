import { useState, useEffect, useRef } from 'react';

export function useFrameSequence(frameCount, framePrefix = '/sequences/veda/frame_', padLength = 3, extension = '.webp') {
  const [loaded, setLoaded] = useState(false);
  const framesRef = useRef([]);

  useEffect(() => {
    let isCancelled = false;

    const loadFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = String(index).padStart(padLength, '0');
        img.src = `${framePrefix}${paddedIndex}${extension}`;
        img.onload = () => {
          framesRef.current[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          resolve(null);
        };
      });
    };

    const preloadSequence = async () => {
      // 1. Load frame 001 immediately
      await loadFrame(1);
      
      if (isCancelled) return;
      setLoaded(true); // First frame is ready, we can show the canvas

      // 2. Load the first visible range (e.g., first 30 frames)
      const firstRangePromises = [];
      for (let i = 2; i <= Math.min(30, frameCount); i++) {
        firstRangePromises.push(loadFrame(i));
      }
      await Promise.all(firstRangePromises);

      if (isCancelled) return;

      // 3. Progressively preload remaining frames in chunks to avoid blocking the main thread
      const chunkSize = 20;
      for (let i = 31; i <= frameCount; i += chunkSize) {
        if (isCancelled) break;
        const chunkPromises = [];
        for (let j = i; j < i + chunkSize && j <= frameCount; j++) {
          chunkPromises.push(loadFrame(j));
        }
        await Promise.all(chunkPromises);
      }
    };

    preloadSequence();

    return () => {
      isCancelled = true;
    };
  }, [frameCount, framePrefix, padLength, extension]);

  return { frames: framesRef.current, loaded };
}
