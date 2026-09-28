import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DNAObject } from './DNAObject';
import { ParticleField } from './ParticleField';
import { TopographyField } from './TopographyField';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface DevelopmentSceneProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  activeDev: number;
}

function CameraRig({ mousePos, activeDev, scrollProgress }: DevelopmentSceneProps) {
  useFrame((state) => {
    // Parallax
    const targetX = (mousePos.x - 0.5) * 5;
    const targetY = -(mousePos.y - 0.5) * 5;
    
    // Zoom in dramatically to match the reference image's massive scale
    const targetZ = 22 - (activeDev * 2) - (scrollProgress * 3);

    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
    
    // Look at center
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent({ scrollProgress, activeDev }: { scrollProgress: number, activeDev: number }) {
  const { viewport } = useThree();
  
  // Center the DNA or shift it very slightly right to match the reference image layout
  const dnaX = viewport.width < 12 ? 0 : 2;

  return (
    <>
      <group position={[dnaX, 0, 0]}>
        <DNAObject scrollProgress={scrollProgress} activeDev={activeDev} />
        <ParticleField scrollProgress={scrollProgress} activeDev={activeDev} />
      </group>
      
      <TopographyField scrollProgress={scrollProgress} activeDev={activeDev} />
    </>
  );
}

export default function DevelopmentScene({ scrollProgress, mousePos, activeDev }: DevelopmentSceneProps) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 45], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#070807']} />
      <fog attach="fog" args={['#070807', 20, 80]} />

      {/* Restrained Lighting Setup */}
      <ambientLight intensity={0.15} color="#d4c9b3" />
      <directionalLight position={[5, 5, 2]} intensity={0.8} color="#f5ecd8" />
      <directionalLight position={[-5, -5, -2]} intensity={0.3} color="#5e6651" />

      <SceneContent scrollProgress={scrollProgress} activeDev={activeDev} />
      
      <CameraRig mousePos={mousePos} activeDev={activeDev} scrollProgress={scrollProgress} />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.1} // Lower threshold so fibers glow
          mipmapBlur 
          intensity={1.8} // Strong fiery bloom
          radius={0.8}
        />
      </EffectComposer>
    </Canvas>
  );
}
