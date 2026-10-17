import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmenitiesSection from '../components/projects/AmenitiesSection';
import DesignReadyVillas from '../components/projects/DesignReadyVillas';
import EnquirySection from '../components/projects/EnquirySection';
import LandShowcaseSection from '../components/projects/LandShowcaseSection';
import LocationSection from '../components/projects/LocationSection';
import OwnershipJourneySection from '../components/projects/OwnershipJourneySection';
import VideoSliderIntro from '../components/projects/VideoSliderIntro';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Refresh ScrollTrigger after all child components mount and layout their pin-spacings in DOM order
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(refreshTimer);
  }, []);

  return (
    <div ref={containerRef} className="project-section font-codec w-full bg-[#0a0a0a] text-white font-sans min-h-screen">

      {/* 01. Promotional image slider */}
      <VideoSliderIntro />

      {/* 02. Plotted land background section (4 ACRES / 42 BRANDED VILLA PLOTS) */}
      <LandShowcaseSection />

      {/* 03. Lifestyle & Amenities (6 amenity cards + horizontal GSAP scroll) */}
      <AmenitiesSection />

      {/* 04. Villa Showcase (Villa Classic, Villa Grande, Villa Royale) */}
      <DesignReadyVillas />

      {/* 05. Project Location & Connectivity */}
      <LocationSection />

      {/* 06. Ownership Journey: BUY → BUILD → RESELL */}
      <OwnershipJourneySection />

      {/* 07. Enquiry Section Form */}
      <EnquirySection />
    </div>
  );
}
