import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

const SESSION_KEY = 'veda_scroll_enquiry_shown';

/**
 * ScrollEnquiryPopup
 * Automatically opens the shared EnquiryModal once per browser session when
 * the second website section occupies at least approximately 50% of the viewport height.
 *
 * Exact trigger condition:
 * - Identifies the actual second section (#land-showcase-section, [data-section="second-section"], or second <section>)
 * - Calculates the visible intersection height of that section with the viewport:
 *     visibleHeight = Math.max(0, Math.min(vh, rect.bottom) - Math.max(0, rect.top))
 * - Triggers when visibleHeight >= window.innerHeight * 0.48 (approx 50% of viewport height)
 * - Strict guard against initial load: scrollY must be > 80px and user must have scrolled into section 2
 * - Sets sessionStorage only when the modal actually opens
 * - In development, reloading at the top of the page (scrollY < 80) clears stale storage for easy re-testing
 * - Supports ?fresh=true / ?reset=true and window.__resetEnquiryPopup()
 */
export default function ScrollEnquiryPopup() {
  const { openModal } = useEnquiryModal();
  const location = useLocation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDev = Boolean(import.meta.env && import.meta.env.DEV);

    // Check URL parameters for explicit reset override
    const searchParams = new URLSearchParams(window.location.search);
    const isResetRequested =
      searchParams.get('fresh') === 'true' ||
      searchParams.get('reset') === 'true' ||
      searchParams.get('debug_popup') === 'true';

    // In development mode, if user loads/reloads at the top of the page (scrollY < 80),
    // automatically clear any stale session flag so the trigger can be tested repeatedly
    const initialScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
    if (isResetRequested || (isDev && initialScrollY < 80)) {
      sessionStorage.removeItem(SESSION_KEY);
      hasTriggeredRef.current = false;
    }

    // Expose window helper for debugging in console
    (window as unknown as { __resetEnquiryPopup: () => void }).__resetEnquiryPopup = () => {
      sessionStorage.removeItem(SESSION_KEY);
      hasTriggeredRef.current = false;
      console.log('[ScrollEnquiryPopup] Session flag cleared. Scroll down to second section to trigger modal.');
    };

    // If already shown in this browser session and no reset was requested, do not attach listeners
    if (!isResetRequested && sessionStorage.getItem(SESSION_KEY) === 'true') {
      return;
    }

    const triggerPopup = () => {
      if (hasTriggeredRef.current) return;
      if (!isResetRequested && sessionStorage.getItem(SESSION_KEY) === 'true') return;

      hasTriggeredRef.current = true;
      sessionStorage.setItem(SESSION_KEY, 'true');
      openModal();
    };

    // Find the actual second section element
    const findSecondSection = (): HTMLElement | null => {
      // 1. Direct verified ID or data-section attribute
      const explicit = document.querySelector<HTMLElement>('#land-showcase-section, [data-section="second-section"]');
      if (explicit) return explicit;

      // 2. Second section in .project-section container
      const projectSections = document.querySelectorAll<HTMLElement>('.project-section > section');
      if (projectSections.length >= 2) return projectSections[1];

      // 3. Second section in <main>
      const mainSections = document.querySelectorAll<HTMLElement>('main section');
      if (mainSections.length >= 2) return mainSections[1];

      // 4. Second <section> on the page
      const allSections = document.querySelectorAll<HTMLElement>('section');
      if (allSections.length >= 2) return allSections[1];

      return null;
    };

    const checkVisibility = () => {
      if (hasTriggeredRef.current) return;
      if (!isResetRequested && sessionStorage.getItem(SESSION_KEY) === 'true') return;

      const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
      // Guard: User must not be on the initial load or still in section 1
      if (scrollY < 80) return;

      const section = findSecondSection();
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      if (vh <= 0 || rect.height <= 0) return;

      // Calculate the visible intersection height of the second section within the viewport
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vh, rect.bottom);
      const visibleIntersectionHeight = Math.max(0, visibleBottom - visibleTop);

      // Check whether the second section occupies at least approximately 50% (>= 48%) of the viewport height
      if (visibleIntersectionHeight >= vh * 0.48) {
        triggerPopup();
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen to scroll and resize on both window and document (compatible with Lenis smooth scroll)
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    // Initial check (in case page was reloaded while already scrolled into section 2)
    checkVisibility();

    // Secondary checks to handle layout changes, image loading, or GSAP ScrollTrigger.refresh()
    const t1 = setTimeout(checkVisibility, 150);
    const t2 = setTimeout(checkVisibility, 350);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('scroll', onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [openModal, location.pathname]);

  return null;
}


