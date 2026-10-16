import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

const SESSION_KEY = 'veda_scroll_enquiry_shown';

/**
 * ScrollEnquiryPopup
 * Listens for ~45% scroll depth in the session and triggers the single shared EnquiryModal.
 * Ensures exactly one modal instance exists across the site without duplication.
 */
export default function ScrollEnquiryPopup() {
  const { openModal } = useEnquiryModal();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already shown in this browser session
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      return;
    }

    let ticking = false;

    const triggerPopup = () => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      openModal();
    };

    const checkScrollProgress = () => {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 50) return;

      const progress = (scrollTop / maxScroll) * 100;

      // Trigger at approximately 45% scroll depth
      if (progress >= 45) {
        triggerPopup();
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // GSAP ScrollTrigger integration (compatible with Lenis smooth-scroll)
    let st: ScrollTrigger | null = null;
    try {
      st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (sessionStorage.getItem(SESSION_KEY) === 'true') return;
          if (self.progress >= 0.45) {
            triggerPopup();
          }
        }
      });
    } catch {
      // Fallback relies on window scroll
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (st) st.kill();
    };
  }, [openModal]);

  return null;
}
