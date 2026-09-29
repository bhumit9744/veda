import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVedaStore } from './store';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// Simple terrain generator
function Terrain() {
  const meshRef = useRef();
  const store = useVedaStore();
  const noise2D = useMemo(() => createNoise2D(), []);

  // Generate a plane with height map based on simplex noise
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 128, 128);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = noise2D(x * 0.1, y * 0.1) * 2;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [noise2D]);

  useFrame(() => {
    const progress = store.getState().scrollProgress;
    
    // Example: modify terrain based on scroll progress
    if (meshRef.current) {
       // Section 1: Hero (Dark, earthy)
       // Section 4: Grid transition
       // Let's fade it out or change material color
       const isHero = progress < 0.2;
       const isGrid = progress > 0.4 && progress < 0.6;
       const isDark = progress > 0.8; // Footer
       
       const targetColor = new THREE.Color(
         isDark ? '#000000' : (isGrid ? '#F2EEE6' : '#2A2621')
       );
       meshRef.current.material.color.lerp(targetColor, 0.05);

       const targetWireframe = isGrid;
       if (meshRef.current.material.wireframe !== targetWireframe && Math.abs(progress - 0.5) > 0.01) {
          // just a rough toggle for effect
          // meshRef.current.material.wireframe = targetWireframe;
       }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <meshStandardMaterial 
        color="#2A2621" 
        roughness={0.8} 
        metalness={0.2}
        flatShading
      />
    </mesh>
  );
}

// Contour lines simulated with edges geometry
function ContourLines() {
  const linesRef = useRef();
  
  useFrame((state) => {
    const progress = useVedaStore.getState().scrollProgress;
    if (linesRef.current) {
      linesRef.current.position.y = -1.9 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={linesRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
      <ringGeometry args={[5, 5.02, 64]} />
      <meshBasicMaterial color="#9b7b5a" side={THREE.DoubleSide} transparent opacity={0.5} />
    </mesh>
  );
}

// Particle network for "THE VEDA ENGINE"
function LocationPoints() {
  const pointsRef = useRef();
  const count = 1000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    const progress = useVedaStore.getState().scrollProgress;
    if (pointsRef.current) {
      // Appear around 0.3 (Engine section)
      const targetOpacity = (progress > 0.25 && progress < 0.45) ? 0.8 : 0;
      pointsRef.current.material.opacity += (targetOpacity - pointsRef.current.material.opacity) * 0.05;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#9b7b5a" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0} />
    </Points>
  );
}

// Dynamic Camera that responds to scroll progress
function CameraRig() {
  useFrame((state) => {
    const progress = useVedaStore.getState().scrollProgress;
    
    // Default Hero position
    let targetPos = new THREE.Vector3(0, 5, 10);
    let targetLook = new THREE.Vector3(0, 0, 0);

    if (progress < 0.15) {
      // Hero: slow travel across the land
      targetPos.set(Math.sin(progress * Math.PI) * 5, 5 - progress * 2, 10 - progress * 5);
    } else if (progress < 0.3) {
      // Why Veda: focus on a single point
      targetPos.set(0, 8, 2);
    } else if (progress < 0.45) {
      // The Engine: Zoom out to see network
      targetPos.set(0, 15, 0.1); // Top down
    } else if (progress < 0.6) {
      // The Difference: Architectural Grid
      targetPos.set(-5, 2, 5);
      targetLook.set(5, 0, -5);
    } else if (progress < 0.72) {
      // Alibaug: Masterplan approach
      targetPos.set(0, 3, 8);
    } else if (progress < 0.84) {
      // Journey
      targetPos.set(0, 1, 5);
    } else {
      // Philosophy & Footer: fade away
      targetPos.set(0, 20, 20);
    }

    // Add subtle mouse parallax
    const mouseX = (state.pointer.x * 0.5);
    const mouseY = (state.pointer.y * 0.5);
    
    state.camera.position.lerp(
      new THREE.Vector3(targetPos.x + mouseX, targetPos.y + mouseY, targetPos.z), 
      0.05
    );
    
    // Lerp lookAt
    const currentLookAt = new THREE.Vector3(0,0,0);
    state.camera.getWorldDirection(currentLookAt);
    const targetDirection = new THREE.Vector3().subVectors(targetLook, state.camera.position).normalize();
    
    const finalDir = currentLookAt.lerp(targetDirection, 0.05);
    const lookAtPos = state.camera.position.clone().add(finalDir);
    state.camera.lookAt(lookAtPos);
  });

  return null;
}

function BackgroundColor() {
  useFrame((state) => {
    const progress = useVedaStore.getState().scrollProgress;
    const isDark = progress > 0.8;
    const isHero = progress < 0.2;
    
    // Default ivory: #F2EEE6, Dark mode: #000000, Hero earthy: #050505
    const targetColor = new THREE.Color(
      isDark ? '#000000' : (isHero ? '#111111' : '#F2EEE6')
    );
    state.scene.background = state.scene.background || new THREE.Color('#111111');
    state.scene.background.lerp(targetColor, 0.05);
  });
  return null;
}

export default function VedaScene() {
  return (
    <>
      <BackgroundColor />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F2EEE6" castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#9b7b5a" />

      <CameraRig />
      
      <Terrain />
      <ContourLines />
      <LocationPoints />
      
      {/* Placeholder for Architectural Grid */}
      <gridHelper args={[50, 50, '#9b7b5a', '#171713']} position={[0, -1.95, 0]} />
      
      <Environment preset="city" />
    </>
  );
}
