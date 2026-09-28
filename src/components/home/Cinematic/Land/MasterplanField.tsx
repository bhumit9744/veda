import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const MasterplanField = forwardRef((_props, ref) => {
  const [progress, setProgress] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  
  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => setProgress(p)
  }));

  useEffect(() => {
    const pChoose = Math.max(0, Math.min(1, (progress - 0.7) / 0.15));
    const pDevelop = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));

    if (svgRef.current) {
      const choosePoly = svgRef.current.querySelector('.choose-poly');
      if (choosePoly) {
        gsap.set(choosePoly, {
          opacity: pChoose * (1 - pDevelop * 0.5),
          strokeDashoffset: 2000 * (1 - pChoose),
          scale: 1 + (pChoose * 0.05),
          transformOrigin: "70% 50%"
        });
      }

      const developLines = svgRef.current.querySelectorAll('.develop-line');
      developLines.forEach((line: any, i) => {
        const stagger = Math.max(0, Math.min(1, (progress - 0.85 - (i * 0.01)) / 0.1));
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length * (1 - stagger),
          opacity: stagger * 0.7
        });
      });
      
      const developPlots = svgRef.current.querySelectorAll('.develop-plot');
      developPlots.forEach((plot: any, i) => {
        const stagger = Math.max(0, Math.min(1, (progress - 0.9 - (i * 0.01)) / 0.1));
        gsap.set(plot, {
          opacity: stagger * 0.15,
          scale: 0.9 + (stagger * 0.1),
          transformOrigin: "center center"
        });
      });
    }
  }, [progress]);

  const gridLines = Array.from({ length: 10 }).map((_, i) => `M${100 * i},0 L${100 * i + 300},1000`);
  const gridLines2 = Array.from({ length: 10 }).map((_, i) => `M0,${100 * i} L1000,${100 * i - 200}`);

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <g className="develop-layer">
        {gridLines.concat(gridLines2).map((d, i) => (
          <path key={`dl-${i}`} className="develop-line" d={d} fill="none" stroke="#d4c9b3" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <rect key={`dp-${i}`} className="develop-plot" x={200 + (i % 4)*150} y={300 + Math.floor(i / 4)*150} width="120" height="120" fill="#F4F1E8" opacity="0" />
        ))}
      </g>
      <polygon 
        className="choose-poly"
        points="600,300 850,350 900,650 550,750 450,500"
        fill="rgba(212, 201, 179, 0.1)"
        stroke="#F4F1E8"
        strokeWidth="3"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        opacity="0"
      />
    </svg>
  );
});

MasterplanField.displayName = 'MasterplanField';
export default MasterplanField;
