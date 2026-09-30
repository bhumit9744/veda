import React, { useState, useEffect } from 'react';
import FullPageCinematic from '../components/home/FullPageCinematic';
import MobileHome from './MobileHome';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full font-sans bg-black">
      {isMobile ? <MobileHome /> : <FullPageCinematic />}
    </div>
  );
}
