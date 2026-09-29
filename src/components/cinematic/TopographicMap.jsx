import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    
    // Stage 1: Organic / Geological Roots
    float organic = snoise(uv * 2.5 + uTime * 0.03) * 2.5;
    organic += snoise(uv * 6.0 - uTime * 0.05) * 0.8;
    
    // Stage 2: Boundaries (sharper, terraced)
    float boundaries = floor(organic * 4.0) / 4.0;
    
    // Stage 3: Planned Plots & Roads (grid structure)
    float plots = boundaries;
    float grid = sin(uv.x * 60.0) * sin(uv.y * 60.0) * 0.15;
    plots += grid;
    
    // Morph logic based on scroll progress (0 to 1)
    // 0.0 -> 0.3 : Organic to Boundaries
    // 0.3 -> 0.7 : Boundaries to Plots
    float stage1 = smoothstep(0.0, 0.4, uProgress);
    float stage2 = smoothstep(0.4, 0.8, uProgress);
    
    float elevation = mix(organic, boundaries, stage1);
    elevation = mix(elevation, plots, stage2);
    
    vElevation = elevation;
    
    // Compute simple normals for shading
    vec2 eps = vec2(0.01, 0.0);
    float eX = snoise((uv + eps.xy) * 2.5) * 2.5 - organic;
    float eY = snoise((uv + eps.yx) * 2.5) * 2.5 - organic;
    vec3 normal = normalize(vec3(-eX, -eY, 0.1));
    vNormal = normal; // Simplified for aesthetic
    
    vec3 newPosition = position;
    newPosition.z += elevation;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uProgress;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    float stage1 = smoothstep(0.0, 0.4, uProgress);
    float stage2 = smoothstep(0.4, 0.8, uProgress);
    
    // Topographic Lines (roots/geology)
    float lines = fract(vElevation * 10.0);
    float topoLines = smoothstep(0.0, 0.03, lines) - smoothstep(0.03, 0.06, lines);
    
    // Grid Lines (roads/plots)
    vec2 gridUV = fract(vUv * 40.0);
    float gridLines = smoothstep(0.0, 0.03, gridUV.x) + smoothstep(0.0, 0.03, gridUV.y);
    gridLines = clamp(gridLines, 0.0, 1.0);
    
    // Colors for Light Theme (Architectural Paper/Stone)
    vec3 baseColor = vec3(0.96, 0.94, 0.91); // #F5F1E8
    vec3 shadowColor = vec3(0.85, 0.82, 0.78); // Deeper bone
    vec3 topoColor = vec3(0.65, 0.48, 0.35); // Muted earthy terracotta
    vec3 gridColor = vec3(0.1, 0.1, 0.09); // Deep charcoal
    
    // Ambient Occlusion (fake depth based on elevation)
    float ao = smoothstep(-2.0, 2.0, vElevation);
    vec3 surfaceColor = mix(shadowColor, baseColor, ao * 0.8 + 0.2);
    
    // Active Lines Morph
    float currentLines = mix(topoLines, gridLines * 0.4, stage2);
    vec3 activeLineColor = mix(topoColor, gridColor, stage2);
    
    // Apply lines
    vec3 finalColor = mix(surfaceColor, activeLineColor, currentLines);
    
    // Soft specular highlight for physical material feel (clay/paper)
    float specular = max(0.0, dot(vNormal, vec3(0.5, 0.5, 1.0)));
    finalColor += vec3(0.05) * specular;
    
    // Radial fade for vignette
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.2, dist);
    
    // Increase overall opacity for light theme presence
    gl_FragColor = vec4(finalColor, alpha * 0.9);
  }
`;

export default function TopographicMap() {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Global scroll progress read
      if (window.vedaScrollProgress !== undefined) {
        materialRef.current.uniforms.uProgress.value = gsap.utils.interpolate(
          materialRef.current.uniforms.uProgress.value,
          window.vedaScrollProgress,
          0.05 // Smoothing factor
        );
      }
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -1.5, -4]}>
      <planeGeometry args={[35, 35, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
