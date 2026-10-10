import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmenitiesSection from '../components/projects/AmenitiesSection';
import DesignReadyVillas from '../components/projects/DesignReadyVillas';
import EnquirySection from '../components/projects/EnquirySection';
import LandShowcaseSection from '../components/projects/LandShowcaseSection';
import LocationSection from '../components/projects/LocationSection';
import VideoSliderIntro from '../components/projects/VideoSliderIntro';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

    }, containerRef); // Scoped to the entire component

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#0a0a0a] text-white font-sans min-h-screen">

      {/* 01. Video Slider Sequence */}
      <VideoSliderIntro />

      {/* 02. COMBINED EDITORIAL + DESIGN READY VILLAS */}
      <DesignReadyVillas />

      {/* 03. Premium Land Showcase */}
      <LandShowcaseSection />

      {/* 04. Lifestyle & Amenities */}
      <AmenitiesSection />

      {/* 05. Premium Location & Connectivity */}
      <LocationSection />

      {/* 06. Enquiry Section */}
      <EnquirySection />
    </div>
  );
}
