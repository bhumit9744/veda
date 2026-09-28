import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface DNAObjectProps {
  scrollProgress: number;
  activeDev: number;
}

export function DNAObject({ scrollProgress, activeDev }: DNAObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { primaryCurves, secondaryCurves } = useMemo(() => {
    const primary: THREE.CatmullRomCurve3[] = [];
    const secondary: THREE.CatmullRomCurve3[] = [];
    
    const count = 150; // increased vertical resolution
    const height = 85; // significantly taller
    const radius = 3.5; // slightly thinner for elegance
    const turns = 2.5; // more turns to maintain proportion
    const numSecondaryPerStrand = 45; // Dense bundle of glowing fibers

    // Generate 2 main structural strands
    for (let strand = 0; strand < 2; strand++) {
      const offsetAngle = strand * Math.PI;

      // Primary core strand
      const primaryPoints = [];
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 2 * turns + offsetAngle;
        const y = (t - 0.5) * height;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        primaryPoints.push(new THREE.Vector3(x, y, z));
      }
      primary.push(new THREE.CatmullRomCurve3(primaryPoints));

      // Chaotic wrapping fibers
      for (let f = 0; f < numSecondaryPerStrand; f++) {
        const points = [];
        const fiberRadiusOffset = (Math.random() - 0.5) * 3.0; // wider spread
        const fiberAngleOffset = (Math.random() - 0.5) * 1.0;
        const noiseFreq = Math.random() * 4 + 1;
        const noiseAmp = Math.random() * 1.5;

        for (let i = 0; i <= count; i++) {
          const t = i / count;
          // Pinch in the middle (hourglass shape)
          const pinch = 1.0 - Math.sin(t * Math.PI) * 0.4;
          
          const angle = t * Math.PI * 2 * turns + offsetAngle + fiberAngleOffset;
          const y = (t - 0.5) * height;
          
          const currentRadius = (radius + fiberRadiusOffset + Math.sin(t * Math.PI * noiseFreq) * noiseAmp) * pinch;
          const x = Math.cos(angle) * currentRadius;
          const z = Math.sin(angle) * currentRadius;
          
          points.push(new THREE.Vector3(x, y, z));
        }
        secondary.push(new THREE.CatmullRomCurve3(points));
      }
      
      // Cross-over fibers bridging the strands (replacing rigid rungs)
      for (let f = 0; f < 25; f++) { // More cross-overs for taller structure
         const points = [];
         const startT = Math.random();
         const yOffset = (Math.random() - 0.5) * 6; // wider spread
         for (let i = 0; i <= 20; i++) {
            const t = i / 20; // 0 to 1 across the gap
            // Interpolate angle from strand 1 to strand 2
            const currentStrandAngle = startT * Math.PI * 2 * turns;
            const angle = currentStrandAngle + offsetAngle + (t * Math.PI);
            
            const currentT = startT + (t * 0.1) - 0.05;
            const y = (currentT - 0.5) * height + yOffset;
            
            // Dip radius inward towards center
            const currentRadius = radius * (1 - Math.sin(t * Math.PI) * 0.8);
            
            const x = Math.cos(angle) * currentRadius;
            const z = Math.sin(angle) * currentRadius;
            points.push(new THREE.Vector3(x, y, z));
         }
         secondary.push(new THREE.CatmullRomCurve3(points));
      }
    }

    return { primaryCurves: primary, secondaryCurves: secondary };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotate fully across the scroll section (slightly slower since it's massive)
    const baseRotation = scrollProgress * Math.PI * 4;
    // Extra spin based on active dev state
    const stateRotation = activeDev * Math.PI * 0.4;
    
    // Smooth damp rotation
    const targetY = baseRotation + stateRotation + state.clock.elapsedTime * 0.04;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    
    // Also add slight tumble on X/Z for dynamic feel (reduced since it's tall)
    const targetX = Math.sin(scrollProgress * Math.PI) * 0.1;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;

    // Subtly float vertically
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
  });

  return (
    <group ref={groupRef}>
      {/* Primary Structural Strands */}
      {primaryCurves.map((curve, idx) => (
        <mesh key={`primary-${idx}`}>
          <tubeGeometry args={[curve, 150, 0.12, 5, false]} />
          <meshBasicMaterial 
            color="#ffbb44" // bright gold
            transparent 
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Secondary Fine Filaments */}
      {secondaryCurves.map((curve, idx) => (
        <mesh key={`secondary-${idx}`}>
          <tubeGeometry args={[curve, 100, 0.02, 3, false]} />
          <meshBasicMaterial 
            color="#ff6600" // fiery deep orange
            transparent 
            opacity={0.25 + (activeDev * 0.05)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
