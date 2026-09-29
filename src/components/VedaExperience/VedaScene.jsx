import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useVedaStore } from './store';
import * as THREE from 'three';

/* ══════════════════════════════════════════════════════════════════════════════
   ARCHITECTURAL THREE.JS TERRAIN — HERO MASTER PASS
   
   Aesthetic:
   - Subtle gallery exhibition physical model emerging from deep forest atmosphere
   - Low-contrast architectural contour relief in muted sage & antique bronze
   - Interactive key spotlight that gently responds to cursor position
   - Quiet, architectural presence that supports typography rather than shouting
   ══════════════════════════════════════════════════════════════════════════════ */

const terrainVert = `
  uniform float uTime;
  uniform float uMorph;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vNormal;

  vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x,289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,
                        -0.577350269189626,0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i,289.0);
    vec3 p = permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m = m*m; m = m*m;
    vec3 x_ = 2.0*fract(p*C.www)-1.0;
    vec3 h = abs(x_)-0.5;
    vec3 ox = floor(x_+0.5);
    vec3 a0 = x_-ox;
    m *= 1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x = a0.x*x0.x + h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vUv = uv;
    float t = uTime * 0.006;

    // Organic rolling topography
    float organic = snoise(uv * 1.8 + vec2(t * 0.25, -t * 0.12)) * 2.6;
    organic += snoise(uv * 4.5 - vec2(t * 0.12, t * 0.18)) * 0.55;

    // Terraced contour plateaus
    float terraced = floor(organic * 2.8) / 2.8;

    // Plotted masterplan grid relief
    float grid = terraced + sin(uv.x * 40.0) * sin(uv.y * 40.0) * 0.08;

    // Morph progression
    float s1 = smoothstep(0.0, 0.45, uMorph);
    float s2 = smoothstep(0.45, 1.0, uMorph);
    float elevation = mix(organic, terraced, s1);
    elevation = mix(elevation, grid, s2);

    vElevation = elevation;

    // Surface normal approximation
    vec2 eps = vec2(0.012, 0.0);
    float eX = snoise((uv + eps.xy) * 1.8) * 2.6 - organic;
    float eY = snoise((uv + eps.yx) * 1.8) * 2.6 - organic;
    vNormal = normalize(vec3(-eX, -eY, 0.38));

    vec3 pos = position;
    pos.z += elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const terrainFrag = `
  uniform float uMorph;
  uniform float uOpacity;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main(){
    // Minor contour lines — thin, architectural, quiet
    float lines = fract(vElevation * 5.8);
    float contour = smoothstep(0.0, 0.03, lines) - smoothstep(0.03, 0.065, lines);

    // Major index contours (every 4th)
    float majorLines = fract(vElevation * 1.45);
    float majorContour = smoothstep(0.0, 0.035, majorLines) - smoothstep(0.035, 0.08, majorLines);

    // Cadastral grid lines in development phase
    vec2 gUv = fract(vUv * 30.0);
    float gridLine = smoothstep(0.0, 0.03, gUv.x) + smoothstep(0.0, 0.03, gUv.y);
    gridLine = clamp(gridLine, 0.0, 1.0);
    float s2 = smoothstep(0.45, 0.95, uMorph);

    // Architectural low-contrast palette
    vec3 deepShadow = vec3(0.004, 0.009, 0.005);     // #010201
    vec3 baseEarth = vec3(0.015, 0.035, 0.020);      // #040905
    vec3 contourSage = vec3(0.16, 0.24, 0.12);       // #293D1F (subtle, non-competing)
    vec3 majorSage = vec3(0.28, 0.38, 0.20);         // #476133
    vec3 brassAccent = vec3(0.50, 0.44, 0.26);       // #807042 (warm antique highlight)

    // Soft architectural diffuse lighting
    float diffuse = clamp(dot(vNormal, normalize(vec3(0.5, 0.7, 0.6))), 0.0, 1.0);
    vec3 surface = mix(deepShadow, baseEarth, diffuse * 0.65 + 0.35);

    // Layer contour lines with restraint
    surface = mix(surface, contourSage, contour * 0.35);
    surface = mix(surface, majorSage, majorContour * 0.55);

    // Layer masterplan grid in development phase
    surface = mix(surface, brassAccent, gridLine * s2 * 0.3);

    // Peak highlights
    float peak = smoothstep(1.4, 2.6, vElevation);
    surface += brassAccent * peak * 0.07;

    // Radial edge vignette falloff
    float dist = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.60, 0.26, dist);

    gl_FragColor = vec4(surface, vignette * uOpacity);
  }
`;

function Terrain() {
  const matRef = useRef();
  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uMorph:   { value: 0 },
    uOpacity: { value: 0.6 },
  }), []);

  useFrame((state) => {
    const p = useVedaStore.getState().scrollProgress || 0;
    const u = matRef.current?.uniforms;
    if (!u) return;

    u.uTime.value = state.clock.elapsedTime;

    // Opacity: Hero (0.6), dips during Light sections, flares during Dark Land Development & Alibaug
    let targetOpacity = 0.6;
    if ((p >= 0.12 && p < 0.38) || (p >= 0.49 && p < 0.65) || (p >= 0.77 && p < 0.88)) {
      targetOpacity = 0.0;
    } else if (p >= 0.38 && p < 0.49) {
      targetOpacity = 0.7;
    } else if (p >= 0.65 && p < 0.77) {
      targetOpacity = 0.65;
    } else if (p >= 0.88) {
      targetOpacity = Math.max(0, 1 - (p - 0.88) / 0.1);
    }

    u.uOpacity.value += (targetOpacity - u.uOpacity.value) * 0.05;

    const targetMorph = p < 0.3 ? 0 : (p > 0.68 ? 1 : (p - 0.3) / 0.38);
    u.uMorph.value += (targetMorph - u.uMorph.value) * 0.03;
  });

  return (
    <mesh rotation={[-Math.PI / 2.25, 0, 0]} position={[0, -1.8, -4]}>
      <planeGeometry args={[46, 46, 180, 180]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={terrainVert}
        fragmentShader={terrainFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// Sparse, floating warm gold particles
function DustParticles() {
  const ref = useRef();
  const count = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 48;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 48;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.003;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.025;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#B29B55"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.18}
      />
    </Points>
  );
}

// Camera Rig & Interactive Gallery Spotlight
function CameraRig() {
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useMemo(() => new THREE.Vector3(), []);
  const keyLightRef = useRef();

  useFrame((state) => {
    const p = useVedaStore.getState().scrollProgress || 0;

    if (p < 0.14) {
      // 01 HERO — Elevated architectural overview
      const t = p / 0.14;
      targetPos.set(0, 3.6 - t * 0.8, 14.5 - t * 3.0);
      targetLook.set(0, -0.4, 0);
    } else if (p < 0.38) {
      targetPos.set(1.5, 2.5, 10);
      targetLook.set(0, -0.6, -2);
    } else if (p < 0.49) {
      const t = (p - 0.38) / 0.11;
      targetPos.set(-1.0 + t * 2.0, 5.0 + t * 2.5, 7.5 - t * 2.5);
      targetLook.set(0, 0, -2);
    } else if (p < 0.65) {
      targetPos.set(0, 4.5, 12);
      targetLook.set(0, 0, 0);
    } else if (p < 0.77) {
      const t = (p - 0.65) / 0.12;
      targetPos.set(1.2, 2.4 - t * 0.6, 5.8 - t * 1.5);
      targetLook.set(0, -0.7, -4);
    } else {
      const t = Math.max(0, (p - 0.88) / 0.12);
      targetPos.set(0, 4.0 + t * 10.0, 12.0 + t * 8.0);
      targetLook.set(0, 0, 0);
    }

    // Subtle mouse parallax
    const mx = state.pointer.x * 0.22;
    const my = state.pointer.y * 0.14;

    state.camera.position.lerp(
      targetPos.clone().add(new THREE.Vector3(mx, my, 0)),
      0.025
    );

    // Subtle spotlight position modulation following cursor
    if (keyLightRef.current) {
      keyLightRef.current.position.x = 8 + state.pointer.x * 3;
      keyLightRef.current.position.y = 7 + state.pointer.y * 2;
    }

    state.camera.getWorldDirection(currentLook);
    const dir = targetLook.clone().sub(state.camera.position).normalize();
    currentLook.lerp(dir, 0.03);
    state.camera.lookAt(state.camera.position.clone().add(currentLook));
  });

  return (
    <>
      <ambientLight intensity={0.14} color="#060E08" />
      <directionalLight ref={keyLightRef} position={[8, 7, -6]} intensity={1.6} color="#2A3719" />
      <pointLight position={[-6, 4, 5]} intensity={0.9} color="#B29B55" distance={26} decay={2} />
    </>
  );
}

export default function VedaScene() {
  return (
    <>
      <CameraRig />
      <Terrain />
      <DustParticles />
    </>
  );
}
