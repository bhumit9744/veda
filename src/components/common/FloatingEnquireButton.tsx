import React, { useState, useEffect } from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

/**
 * FloatingEnquireButton
 * Compact, bottom-right floating CTA button for Veda Life Spaces.
 * - Antique-gold/bronze background with rounded corners (12px radius)
 * - Opens the shared EnquiryModal with WhatsApp submission flow
 * - Auto-hides when the enquiry modal is open
 * - Respects safe-area insets on mobile devices
 */
export default function FloatingEnquireButton() {
  const { openModal, isOpen } = useEnquiryModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide completely when the enquiry modal is open
  if (isOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Floating Enquiry Action"
      className={`fixed z-40 transition-all duration-300 ease-out bottom-4 right-4 sm:bottom-6 sm:right-6 [bottom:max(16px,env(safe-area-inset-bottom,16px))] [right:max(16px,env(safe-area-inset-right,16px))] sm:[bottom:max(24px,env(safe-area-inset-bottom,24px))] sm:[right:max(24px,env(safe-area-inset-right,24px))] ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={() => openModal()}
        className="group flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-[12px] bg-[#9e7138] hover:bg-[#88602c] active:bg-[#745023] text-white font-medium text-[11px] sm:text-xs uppercase tracking-[0.14em] shadow-[0_4px_16px_rgba(158,113,56,0.35)] hover:shadow-[0_6px_22px_rgba(158,113,56,0.5)] hover:-translate-y-0.5 active:translate-y-0 border border-[#d8b075]/60 hover:border-[#d8b075] transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2"
        aria-label="Enquire Now"
      >
        <span>ENQUIRE NOW</span>
        <span
          className="text-xs sm:text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white/90"
          aria-hidden="true"
        >
          ↗
        </span>
      </button>
    </aside>
  );
}

