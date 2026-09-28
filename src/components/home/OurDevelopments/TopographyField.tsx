import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

export function TopographyField({ scrollProgress, activeDev }: { scrollProgress: number, activeDev: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const noise3D = createNoise3D();

  const { lines, points } = useMemo(() => {
    const linesData = [];
    const pointsData = [];
    
    // Create 8 concentric contour rings
    for (let r = 1; r <= 8; r++) {
      const radius = r * 2.5 + 4;
      const pts = [];
      const numSegments = 60;
      
      for (let i = 0; i <= numSegments; i++) {
        const theta = (i / numSegments) * Math.PI * 2;
        // Use noise to perturb a perfect circle into a topographic contour
        const nx = Math.cos(theta);
        const nz = Math.sin(theta);
        const noiseVal = noise3D(nx * 1.5, nz * 1.5, r * 0.1);
        
        const finalRadius = radius + noiseVal * 1.5;
        const x = Math.cos(theta) * finalRadius;
        const z = Math.sin(theta) * finalRadius;
        // Subtle depth
        const y = (r - 4.5) * -1.5 + noiseVal * 0.5;
        
        pts.push(new THREE.Vector3(x, y, z));
        
        // Occasionally drop a survey node
        if (i % 15 === 0 && Math.random() > 0.5) {
          pointsData.push(new THREE.Vector3(x, y, z));
        }
      }
      linesData.push(new THREE.CatmullRomCurve3(pts, true));
    }
    
    return { lines: linesData, points: pointsData };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slow, subtle rotation reacting to scroll
    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.2 + state.clock.elapsedTime * 0.02;
    // Slight tilt to give it a "map" perspective from below
    groupRef.current.rotation.x = -Math.PI * 0.1;
    
    // Scale breathes slightly based on state
    const targetScale = 1 + activeDev * 0.05;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
  });

  return (
    <group ref={groupRef}>
      {lines.map((curve, idx) => (
        <line key={`topo-${idx}`}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              args={[new Float32Array(curve.getPoints(100).flatMap(p => [p.x, p.y, p.z])), 3]} 
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00ff44" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
        </line>
      ))}
      {points.length > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]} 
            />
          </bufferGeometry>
          <pointsMaterial color="#00ff44" size={0.1} transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
      )}
    </group>
  );
}
