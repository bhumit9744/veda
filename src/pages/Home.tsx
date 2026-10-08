import React, { useState, useEffect } from 'react';
import FullPageCinematic from '../components/home/FullPageCinematic';
import MobileHome from './MobileHome';
import HeroVideoIntro from '../components/home/HeroVideoIntro';

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
      <HeroVideoIntro />
      {isMobile ? <MobileHome /> : <FullPageCinematic />}
    </div>
  );
}
