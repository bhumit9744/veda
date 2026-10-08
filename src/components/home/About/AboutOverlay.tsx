import React from 'react';

export default function AboutOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-[#0A1D12] opacity-40 pointer-events-none z-0 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06120B]/90 via-[#06120B]/30 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#06120B_120%)] pointer-events-none z-0 opacity-80" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </>
  );
}
