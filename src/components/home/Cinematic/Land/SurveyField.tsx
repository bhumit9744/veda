import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const SurveyField = forwardRef((_props, ref) => {
  const [progress, setProgress] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  const nodes = Array.from({ length: 40 }).map((_, i) => ({
    x: (i * 137.5) % 1000,
    y: (i * 211.3) % 1000,
    r: i % 3 === 0 ? 3 : 1
  }));

  const lines = nodes.slice(0, 20).map((n, i) => ({
    x1: n.x, y1: n.y,
    x2: nodes[(i + 5) % 40].x, y2: nodes[(i + 5) % 40].y
  }));

  useEffect(() => {
    const pIn = Math.max(0, Math.min(1, (progress - 0.1) / 0.15));
    const pOut = Math.max(0, Math.min(1, (progress - 0.35) / 0.15));
    
    if (svgRef.current) {
      gsap.set(svgRef.current, {
        opacity: pIn - pOut,
        scale: 0.9 + (pIn * 0.1) + (pOut * 0.1)
      });
    }
  }, [progress]);

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full opacity-0" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      {lines.map((l, i) => (
        <line key={`l-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#d4c9b3" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" />
      ))}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r={n.r} fill="#F4F1E8" />
          {i % 5 === 0 && (
            <text x={n.x + 8} y={n.y + 4} fill="#d4c9b3" fontSize="10" fontFamily="monospace" opacity="0.6">
              N{n.x.toFixed(0)} E{n.y.toFixed(0)}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
});

SurveyField.displayName = 'SurveyField';
export default SurveyField;
