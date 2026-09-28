import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const TopographicField = forwardRef((_props, ref) => {
  const [progress, setProgress] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  const paths = [
    "M0,300 Q200,400 400,300 T800,400 T1200,300",
    "M0,400 Q200,500 400,400 T800,500 T1200,400",
    "M0,500 Q200,600 400,500 T800,600 T1200,500",
    "M0,600 Q200,700 400,600 T800,700 T1200,600",
    "M0,700 Q200,800 400,700 T800,800 T1200,700",
    "M300,500 Q400,450 500,500 T700,500"
  ];

  useEffect(() => {
    const pIn = Math.max(0, Math.min(1, (progress - 0.25) / 0.15));
    const pOut = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));

    if (svgRef.current) {
      gsap.set(svgRef.current, {
        opacity: pIn - (pOut * 0.8),
        scale: 1 + (progress * 0.1)
      });
    }

    pathsRef.current.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength() || 1500;
      const staggerIn = Math.max(0, Math.min(1, (progress - 0.25 - (i * 0.02)) / 0.1));
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length * (1 - staggerIn)
      });
    });

  }, [progress]);

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full opacity-0" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      {paths.map((d, i) => (
        <path
          key={i}
          ref={el => { if (el) pathsRef.current[i] = el; }}
          d={d}
          fill="none"
          stroke="#d4c9b3"
          strokeWidth="1"
          opacity={0.3 + (i % 2) * 0.3}
        />
      ))}
    </svg>
  );
});

TopographicField.displayName = 'TopographicField';
export default TopographicField;
