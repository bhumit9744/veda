import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

const SESSION_KEY = 'veda_scroll_enquiry_shown';

/**
 * ScrollEnquiryPopup
 * Automatically opens the shared EnquiryModal once per browser session when
 * the second website section reaches approximately 50% visibility in the viewport.
 *
 * Trigger logic:
 * - Identifies the actual second section element (#land-showcase-section, [data-section="second-section"], or second <section>)
 * - Calculates the visible intersection between the section and viewport
 * - Triggers when approximately half of the section's height is visible (or occupies >= 50% of the viewport)
 * - Safe against initial page load and when still in section 1
 * - Only sets sessionStorage when the modal actually opens
 * - Supports ?fresh=true / ?reset=true and window.__resetEnquiryPopup() for test resets
 */
export default function ScrollEnquiryPopup() {
  const { openModal } = useEnquiryModal();
  const location = useLocation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check URL parameters for development / testing reset override
    const searchParams = new URLSearchParams(window.location.search);
    const isResetRequested =
      searchParams.get('fresh') === 'true' ||
      searchParams.get('reset') === 'true' ||
      searchParams.get('debug_popup') === 'true';

    if (isResetRequested) {
      sessionStorage.removeItem(SESSION_KEY);
      hasTriggeredRef.current = false;
    }

    // Expose window helper for debugging
    (window as unknown as { __resetEnquiryPopup: () => void }).__resetEnquiryPopup = () => {
      sessionStorage.removeItem(SESSION_KEY);
      hasTriggeredRef.current = false;
      console.log('[ScrollEnquiryPopup] Session flag cleared. Scroll to second section (50% visible) to trigger modal.');
    };

    // If already triggered in this browser session and no reset was requested, do not attach listeners
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

    // Find the second section element
    const findSecondSection = (): HTMLElement | null => {
      // 1. Direct explicit identifier
      const explicit = document.querySelector<HTMLElement>('#land-showcase-section, [data-section="second-section"]');
      if (explicit) return explicit;

      // 2. Project section list
      const projectSections = document.querySelectorAll<HTMLElement>('.project-section > section');
      if (projectSections.length >= 2) return projectSections[1];

      // 3. Main container sections
      const mainSections = document.querySelectorAll<HTMLElement>('main section');
      if (mainSections.length >= 2) return mainSections[1];

      // 4. Any page sections
      const allSections = document.querySelectorAll<HTMLElement>('section');
      if (allSections.length >= 2) return allSections[1];

      return null;
    };

    const checkVisibility = () => {
      if (hasTriggeredRef.current) return;
      if (!isResetRequested && sessionStorage.getItem(SESSION_KEY) === 'true') return;

      const section = findSecondSection();
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      if (viewportHeight <= 0 || rect.height <= 0) return;

      // Calculate the portion of the section currently visible inside the viewport
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // Section is not in viewport or user is still completely in the first section above
      if (visibleHeight <= 0) return;

      // Calculate both:
      // 1. Ratio of the section's total height that is visible
      const sectionRatio = visibleHeight / rect.height;
      // 2. Ratio of the viewport height that is occupied by the second section
      const viewportRatio = visibleHeight / viewportHeight;

      // Trigger when approximately half (>= 48%) of that section's height is visible
      // OR when the second section occupies >= 48% of the viewport height
      if (sectionRatio >= 0.48 || viewportRatio >= 0.48) {
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

    // Set up IntersectionObserver with multiple thresholds for immediate callback
    let observer: IntersectionObserver | null = null;
    const target = findSecondSection();
    if (target && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            // Check intersection ratio of the section or viewport
            if (entry.isIntersecting) {
              const vh = window.innerHeight || document.documentElement.clientHeight || 0;
              const rect = entry.boundingClientRect;
              const visibleH = Math.max(0, Math.min(vh, rect.bottom) - Math.max(0, rect.top));
              const sRatio = rect.height > 0 ? visibleH / rect.height : 0;
              const vRatio = vh > 0 ? visibleH / vh : 0;

              if (entry.intersectionRatio >= 0.48 || sRatio >= 0.48 || vRatio >= 0.48) {
                triggerPopup();
              }
            }
          }
        },
        {
          threshold: [0.1, 0.25, 0.4, 0.48, 0.5, 0.6, 0.75],
        }
      );
      observer.observe(target);
    }

    // Attach passive scroll and resize listeners (compatible with Lenis smooth scroll)
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check (in case page refreshed while already scrolled down)
    checkVisibility();

    // Secondary check after dynamic layout stabilization (e.g. ScrollTrigger.refresh() after 150ms)
    const timer = setTimeout(checkVisibility, 200);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (observer) observer.disconnect();
      clearTimeout(timer);
    };
  }, [openModal, location.pathname]);

  return null;
}

