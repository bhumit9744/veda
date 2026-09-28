import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollProgress: number;
  activeDev: number;
}

export function ParticleField({ scrollProgress, activeDev }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000; 

  const { positions, phases, colors, speeds, layers } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const lyr = new Float32Array(count);
    
    const colorAtmosphere = new THREE.Color("#00ff44"); // Emerald green
    const colorDNA = new THREE.Color("#ffaa00"); // Fiery gold
    const colorBg = new THREE.Color("#002211"); // Dark green tint
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      let radius, y, theta, layerType;
      
      const rand = Math.random();
      if (rand < 0.2) {
        // Layer 3: DNA Particles (Travel along DNA strands)
        radius = 3.5 + (Math.random() - 0.5) * 1.5;
        layerType = 3;
        tempColor.copy(colorDNA).multiplyScalar(0.8 + Math.random() * 0.4);
      } else if (rand < 0.7) {
        // Layer 2: Atmosphere (Drift around DNA)
        radius = 6 + Math.random() * 10;
        layerType = 2;
        tempColor.copy(colorAtmosphere).multiplyScalar(0.5 + Math.random() * 0.5);
      } else {
        // Layer 1: Background (Distant)
        radius = 15 + Math.random() * 20;
        layerType = 1;
        tempColor.copy(colorBg);
      }

      theta = Math.random() * Math.PI * 2;
      y = (Math.random() - 0.5) * 85;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      phs[i] = Math.random() * Math.PI * 2;
      spd[i] = layerType === 3 ? (Math.random() * 0.05 + 0.02) : (Math.random() * 0.01 + 0.005);
      lyr[i] = layerType;

      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }
    return { positions: pos, phases: phs, colors: col, speeds: spd, layers: lyr };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionsAttr = geometry.attributes.position;

    // Rotation responds to scroll and active state
    const targetY = scrollProgress * Math.PI + activeDev * 0.5 + time * 0.01;
    pointsRef.current.rotation.y += (targetY - pointsRef.current.rotation.y) * 0.05;

    // Movement speed multiplier based on active development state
    const speedMult = 1 + (activeDev * 0.5);

    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      const speed = speeds[i] * speedMult;
      const layer = layers[i];
      
      const idx = i * 3 + 1; // Y coord
      const currentY = positions[idx];
      
      // DNA particles travel upwards faster and spiral slightly
      let newY = currentY + speed + Math.sin(time * 0.2 + phase) * 0.01;
      
      if (layer === 3) {
        // Add slight spiral to DNA layer
        const xIdx = i * 3;
        const zIdx = i * 3 + 2;
        const currentX = positions[xIdx];
        const currentZ = positions[zIdx];
        const angle = speed * 0.2;
        positionsAttr.array[xIdx] = currentX * Math.cos(angle) - currentZ * Math.sin(angle);
        positionsAttr.array[zIdx] = currentX * Math.sin(angle) + currentZ * Math.cos(angle);
      }

      if (newY > 45) newY = -45;
      positionsAttr.array[idx] = newY;
    }
    
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
