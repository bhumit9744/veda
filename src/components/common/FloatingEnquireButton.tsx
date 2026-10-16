import React, { useState, useEffect } from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export default function FloatingEnquireButton() {
  const { openModal, isOpen } = useEnquiryModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal floating button after initial scroll (250px)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isOpen || !isVisible) return null;

  return (
    <aside
      aria-label="Quick Enquiry"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 pointer-events-auto"
    >
      <button
        type="button"
        onClick={() => openModal()}
        className="group flex items-center gap-2.5 px-4.5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#9e7138] hover:bg-[#88602c] active:bg-[#745023] text-white font-medium text-xs sm:text-[13px] uppercase tracking-[0.16em] border border-[#d8b075]/60 shadow-[0_6px_22px_rgba(158,113,56,0.4)] hover:shadow-[0_10px_30px_rgba(158,113,56,0.6)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm select-none"
        aria-label="Enquire Now about Veda Life Spaces"
      >
        <span className="w-2 h-2 rounded-full bg-[#FAF8F5] animate-pulse shrink-0" />
        <span className="font-semibold whitespace-nowrap">ENQUIRE NOW</span>
        <svg
          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </button>
    </aside>
  );
}
