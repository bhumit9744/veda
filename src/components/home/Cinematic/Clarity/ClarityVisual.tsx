import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const ClarityVisual = forwardRef((_props, ref) => {
  
  const pathsRef = useRef<SVGPathElement[]>([]);
  const dotsRef = useRef<SVGCircleElement[]>([]);
  const landImgRef = useRef<HTMLImageElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  useEffect(() => {
    // Animation progression:
    // 0.0 - 0.2: Blurred abstract texture (opacity of topo is 0)
    // 0.2 - 0.5: Topo contour lines form (stroke-dashoffset animates)
    // 0.4 - 0.6: Nodes/points appear
    // 0.6 - 1.0: Everything becomes sharp, land image underneath fades in, boundaries expand

    const pBlur = Math.max(0, Math.min(1, progress / 0.3));
    
    
    const pLand = Math.max(0, Math.min(1, (progress - 0.7) / 0.3));

    if (blurOverlayRef.current) {
      gsap.set(blurOverlayRef.current, {
        opacity: 1 - pBlur,
        filter: `blur(${20 - pBlur * 20}px)`
      });
    }

    pathsRef.current.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength() || 1000;
      // Stagger drawing
      const staggerP = Math.max(0, Math.min(1, (progress - 0.2 - (i * 0.02)) / 0.3));
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length * (1 - staggerP),
        opacity: 0.3 + (staggerP * 0.5),
        scale: 1 + (pLand * 0.1), // Expands at the end
        transformOrigin: "center center"
      });
    });

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const staggerP = Math.max(0, Math.min(1, (progress - 0.4 - (i * 0.02)) / 0.2));
      gsap.set(dot, {
        scale: staggerP,
        opacity: staggerP * 0.8,
        transformOrigin: "center center"
      });
    });

    if (landImgRef.current) {
      gsap.set(landImgRef.current, {
        opacity: pLand * 0.3, // Soft reveal
        scale: 1.1 - (pLand * 0.1),
        filter: `blur(${(1 - pLand) * 10}px) grayscale(${100 - pLand * 100}%)`
      });
    }

  }, [progress]);

  // Generate some random paths for topo lines
  const paths = [
    "M-100,500 Q200,300 500,500 T1100,200",
    "M-100,600 Q250,400 550,600 T1100,300",
    "M-100,700 Q300,500 600,700 T1100,400",
    "M100,-100 Q400,200 400,500 T600,1100",
    "M200,-100 Q500,300 500,600 T700,1100",
    "M-100,200 Q200,400 500,200 T1100,600",
    "M300,400 Q400,350 500,400 T700,500", // inner loop
    "M400,500 Q500,450 600,500 T800,600", // inner loop
  ];

  const nodes = [
    {cx: "20%", cy: "30%"}, {cx: "50%", cy: "50%"}, {cx: "70%", cy: "40%"},
    {cx: "30%", cy: "70%"}, {cx: "60%", cy: "80%"}, {cx: "80%", cy: "60%"},
    {cx: "40%", cy: "20%"}, {cx: "85%", cy: "30%"}, {cx: "25%", cy: "85%"}
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* Land image reveal at the end */}
      <img 
        ref={landImgRef}
        src="/hero-frames/frame_0180.webp" // Reusing hero frame as land placeholder
        alt="Land"
        className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-luminosity"
      />

      <div ref={blurOverlayRef} className="absolute inset-0 bg-[#050505] z-10 pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        {paths.map((d, i) => (
          <path
            key={i}
            ref={el => { if (el) pathsRef.current[i] = el; }}
            d={d}
            fill="none"
            stroke="#d4c9b3"
            strokeWidth={i % 2 === 0 ? "1" : "0.5"}
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="opacity-0"
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={`dot-${i}`}
            ref={el => { if (el) dotsRef.current[i] = el; }}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#F4F1E8"
            className="opacity-0"
          />
        ))}
        {/* Plot boundaries that appear */}
        <polygon 
          ref={el => { if (el) pathsRef.current[paths.length] = el; }}
          points="300,300 700,350 800,700 400,800 250,600"
          fill="rgba(212, 201, 179, 0.05)"
          stroke="#F4F1E8"
          strokeWidth="1.5"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          className="opacity-0"
        />
      </svg>
    </div>
  );
});

ClarityVisual.displayName = 'ClarityVisual';
export default ClarityVisual;
