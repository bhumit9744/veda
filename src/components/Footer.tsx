import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'X', url: 'https://x.com/vedalifespace', icon: '/assets/images/X-Icon-White.png' },
    { name: 'Facebook', url: 'https://www.facebook.com/vedalifespaces', icon: '/assets/images/facebook-icon.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/veda-life-spaces/', icon: '/assets/images/Linkedin-Icon.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/vedalifespaces/', icon: '/assets/images/Instagram-Icon.png' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Vedalifespaces', icon: '/assets/images/Youtube-Icon.png' }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/aboutus.php' },
    { name: 'Developments', path: '/#developments' },
    { name: 'News', path: '/news.php' },
    { name: 'Careers', path: '/carrers.php' },
    { name: 'Contact', path: '/contact-us.php' }
  ];

  // Restrained mouse parallax for the wordmark
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wordmarkRef.current) return;
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    gsap.to(wordmarkRef.current, { x: xPos * -20, duration: 1.5, ease: "power2.out" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Triggers when the footer strongly enters the viewport
          toggleActions: "play none none reverse"
        }
      });

      // 1. Headline Reveals
      tl.fromTo('.footer-hero-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" }
      )
      // 2. CTA appears
      .fromTo('.footer-cta-container',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );

      // 3. Architectural SVG path begins drawing
      const activePath = document.getElementById('footer-svg-line') as any;
      if (activePath && activePath.getTotalLength) {
        const length = activePath.getTotalLength();
        gsap.set(activePath, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(activePath, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" }, "-=1");
      }

      // 4. VEDA rises into view (clip-path + transform)
      tl.fromTo('.veda-wordmark',
        { clipPath: "inset(100% 0 0 0)", y: 80, opacity: 0 },
        { clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1, duration: 1.8, ease: "expo.out" },
        "-=1.5"
      );

      // 5. Navigation / info subtly reveals
      tl.fromTo('.footer-nav-item',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" },
        "-=1.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] bg-[#F4F1E8] text-[#050505] overflow-hidden flex flex-col justify-between selection:bg-[#050505] selection:text-[#F4F1E8]"
    >
      
      {/* ==============================================
          ARCHITECTURAL SVG PATH (BACKGROUND)
          ============================================== */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Faint Guide Contour */}
        <path 
          d="M 50 0 V 30 H 80 V 65 H 20 V 100" 
          stroke="#050505" 
          strokeOpacity="0.03"
          strokeWidth="0.2" 
          fill="none" 
          vectorEffect="non-scaling-stroke" 
        />
        {/* Animated Architectural Contour */}
        <path 
          id="footer-svg-line" 
          d="M 50 0 V 30 H 80 V 65 H 20 V 100" 
          stroke="#b89a6b" 
          strokeWidth="0.4" 
          fill="none" 
          vectorEffect="non-scaling-stroke" 
        />
      </svg>

      {/* ==============================================
          TOP: HERO CTA
          ============================================== */}
      <div className="relative z-10 flex flex-col items-center text-center pt-24 md:pt-32 px-6">
        <div className="overflow-hidden pb-4">
          <h2 className="footer-hero-word text-5xl md:text-8xl lg:text-[10rem] font-light leading-[0.85] tracking-tighter uppercase">
            Let's Build
          </h2>
        </div>
        <div className="overflow-hidden pb-4 mb-12">
          <h2 className="footer-hero-word text-5xl md:text-8xl lg:text-[10rem] font-light leading-[0.85] tracking-tighter uppercase">
            What Lasts.
          </h2>
        </div>
        
        <div className="footer-cta-container">
          <Link to="/contact-us.php" className="group flex items-center gap-6 border border-black/10 rounded-full px-8 py-4 hover:border-black/40 bg-[#F4F1E8]/50 backdrop-blur-sm transition-all duration-500">
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Start a Conversation</span>
            <div className="relative overflow-hidden w-6 h-[1px] bg-black/20 group-hover:w-10 transition-all duration-500 ease-out">
              <div className="absolute inset-0 bg-[#050505] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-500 text-lg leading-none">→</span>
          </Link>
        </div>
      </div>

      {/* ==============================================
          BOTTOM: VEDA & NAVIGATION (Unified block)
          ============================================== */}
      <div className="relative z-10 flex flex-col w-full mt-auto pt-16 px-4 md:px-8">
        
        {/* Minimal Nav / Contact sitting right above the wordmark */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-[1800px] mx-auto mb-4 md:mb-[-2rem] z-20 gap-8 md:gap-0">
          
          {/* Left: Navigation Grid */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 max-w-lg text-[0.7rem] md:text-sm tracking-[0.2em] uppercase font-medium text-black/70">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="footer-nav-item group relative hover:text-black transition-colors duration-300">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </div>

          {/* Right: Contact & Socials */}
          <div className="flex flex-col items-start md:items-end gap-3 md:gap-4 text-xs md:text-[0.85rem] tracking-[0.2em] uppercase font-medium text-black/70">
            <a href="mailto:info@vedalifespaces.in" className="footer-nav-item group relative hover:text-black transition-colors duration-300">
              info@vedalifespaces.in
              <span className="absolute -bottom-1 right-0 md:left-auto md:right-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </a>
            <a href="tel:+919619394620" className="footer-nav-item group relative hover:text-black transition-colors duration-300">
              +91 96193 94620
              <span className="absolute -bottom-1 right-0 md:left-auto md:right-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </a>
            
            <div className="flex gap-5 mt-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="footer-nav-item hover:opacity-60 transition-opacity duration-300">
                  <img src={social.icon} alt={social.name} className="w-5 h-5 md:w-6 md:h-6 object-contain invert" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Giant VEDA Wordmark */}
        <div className="w-full overflow-hidden flex justify-center items-end leading-none z-10 pointer-events-none">
          <h1 
            ref={wordmarkRef}
            className="veda-wordmark text-[30vw] font-light tracking-tighter text-[#050505] m-0 p-0 leading-[0.78]"
          >
            VEDA
          </h1>
        </div>

        {/* Absolute Minimal Legal Bar */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-[1800px] mx-auto text-[0.55rem] md:text-[0.6rem] tracking-[0.2em] uppercase text-black/40 pb-6 pt-4 z-20 border-t border-black/5 mt-4 md:mt-0 gap-4">
          <span className="footer-nav-item">© {currentYear} Veda Lifespaces. All rights reserved.</span>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="footer-nav-item hover:text-black transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="footer-nav-item hover:text-black transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}
