import { useMemo } from 'react';

interface MicrositeFooterProps {
  progress: number;
}

export default function MicrositeFooter({ progress }: MicrositeFooterProps) {
  // Global active between 0.97 and 1.00
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.97) / 0.03));
  }, [progress]);

  const isActive = progress >= 0.96;
  if (!isActive) return null;

  const currentYear = new Date().getFullYear();
  
  // Fade in the footer quickly as it enters
  const opacity = Math.min(1, localProgress * 3);
  const translateY = (1 - opacity) * 50;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-30 flex items-end">
      
      {/* Black block to slide up and cover the enquiry section if needed, or just overlay */}
      <div 
        className="w-full bg-[#050505] text-[#F0EBDD] flex flex-col pointer-events-auto"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`
        }}
      >
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 md:pt-24 md:pb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            {/* Brand Logo & Statement (Left) */}
            <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial tracking-widest uppercase mb-4 text-[#C7A34A]">
                  Veda<br/>Life Spaces
                </h2>
                <p className="text-sm text-[#F0EBDD]/60 max-w-sm tracking-wide font-light leading-relaxed">
                  Transforming raw land into fully approved, infrastructure-ready residential plots that offer both peace of mind and long-term value appreciation.
                </p>
              </div>
            </div>

            {/* Links (Right) */}
            <div className="col-span-1 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              
              <div className="flex flex-col gap-4">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-2">Explore</span>
                <a href="/#developments" className="text-sm tracking-widest uppercase text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">Project</a>
                <a href="/aboutus.php" className="text-sm tracking-widest uppercase text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">About</a>
                <a href="/faq" className="text-sm tracking-widest uppercase text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">FAQ</a>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-2">Contact</span>
                <a href="mailto:info@vedalifespaces.in" className="text-sm font-light text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
                  info@vedalifespaces.in
                </a>
                <a href="tel:+919619394620" className="text-sm font-light text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
                  +91 96193 94620
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-2">Location</span>
                <a href="https://www.google.com/maps/place/Veda+Life+Spaces/@18.7230031,72.9024155,785m" target="_blank" rel="noopener noreferrer" className="text-sm tracking-widest uppercase text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
                  Alibaug, MH
                </a>
              </div>

            </div>

          </div>

          <div className="w-full h-[1px] bg-[#F0EBDD]/10 mt-16 mb-6"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[0.65rem] tracking-[0.1em] uppercase text-[#F0EBDD]/40">
            <p>© {currentYear} Veda Lifespaces. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="/privacy-policy" className="hover:text-[#F0EBDD] transition-colors">Privacy</a>
              <a href="/disclaimer" className="hover:text-[#F0EBDD] transition-colors">Terms</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
