import { useMemo, useState, useEffect } from 'react';
import EnquiryForm from './EnquiryForm';

interface MicrositeEnquiryProps {
  progress: number;
}

export default function MicrositeEnquiry({ progress }: MicrositeEnquiryProps) {
  // Global active between 0.90 and 1.00
  const localProgress = useMemo(() => {
    return Math.min(1, Math.max(0, (progress - 0.90) / 0.10));
  }, [progress]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = progress >= 0.89;
  if (!isActive) return null;

  // Background scales and darkens
  const bgScale = 1.2 - (localProgress * 0.2); 
  const bgOpacity = localProgress < 0.2 ? localProgress / 0.2 : 1;

  // Content fades in
  const contentOpacity = localProgress < 0.3 ? 0 : Math.min(1, (localProgress - 0.3) / 0.2);

  return (
    <div className="absolute inset-0 w-full h-full z-20 bg-transparent flex items-center justify-center">
      
      {/* Clean Ivory Background - no heavy images */}
      <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none" />

      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentOpacity < 1 ? 20 - (contentOpacity * 20) : 0}px)`
        }}
      >
        <div className="w-full lg:w-1/2 text-center lg:text-left pointer-events-none">
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-veda-olive uppercase mb-6 block font-medium">
            Enquire
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial text-veda-forest uppercase leading-tight drop-shadow-none">
            CONTACT US
          </h2>
          <p className="mt-8 text-sm md:text-base text-veda-text-secondary font-light max-w-sm mx-auto lg:mx-0 leading-relaxed">
            Register your interest to explore the development, review architectural plans, and secure your place in Alibaug's premier lifestyle community.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md pointer-events-auto">
            <EnquiryForm />
          </div>
        </div>
      </div>

    </div>
  );
}
