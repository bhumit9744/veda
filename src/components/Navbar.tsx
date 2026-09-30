import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

function MagneticEnquire({ isHome }: { isHome: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>
      <Link 
        ref={ref}
        to="/contact-us.php"
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={`group flex items-center gap-2 px-6 py-[12px] rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.14em] font-veda-sans font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:px-7 hover:scale-[1.02] whitespace-nowrap
          ${isHome ? 'bg-veda-ivory text-veda-dark-1 hover:bg-white' : 'bg-[#121212]/95 text-[#F4F1E8] hover:bg-[#1a1a1a] shadow-xl'}`}
      >
        <span className="group-hover:-translate-x-0.5 transition-transform duration-500">Enquire</span>
        <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1">↗</span>
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/index.php';

  const { scrollY } = useScroll();

  // Scroll Transformations
  const navBgDefault = useTransform(scrollY, [0, 200], ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']);
  const navBgHome = useTransform(scrollY, [0, 200], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)']);
  const navBg = isHome ? navBgHome : navBgDefault;

  const navBlurDefault = useTransform(scrollY, [0, 200], ['blur(18px)', 'blur(28px)']);
  const navBlurHome = useTransform(scrollY, [0, 200], ['blur(0px)', 'blur(12px)']);
  const navBlur = isHome ? navBlurHome : navBlurDefault;

  const navBorderDefault = useTransform(scrollY, [0, 200], ['1px solid rgba(0,0,0,0.05)', '1px solid rgba(0,0,0,0.1)']);
  const navBorderHome = useTransform(scrollY, [0, 200], ['1px solid rgba(255,255,255,0)', '1px solid rgba(255,255,255,0.05)']);
  const navBorder = isHome ? navBorderHome : navBorderDefault;

  const navPadding = useTransform(scrollY, [0, 200], ['24px 4vw', '16px 4vw']);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'approach', 'developments', 'beyond-living'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT US', href: '/aboutus.php' },
    { name: 'NEWS & REWARDS', href: '/news.php' },
    { name: 'OUR TEAM', href: '/our-team.php' },
    { name: 'OUR PROJECTS', href: '/developments' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const textColorClass = isHome ? 'text-veda-ivory hover:text-white' : 'text-[#0a0a0a] hover:text-black';
  const lineColorClass = isHome ? 'bg-veda-ivory' : 'bg-[#0a0a0a]';

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 w-full z-[9999] hidden md:grid grid-cols-[1fr_auto_1fr] items-center pointer-events-auto transition-all ${isHome ? 'bg-[#040c08]/40 backdrop-blur-md border-b border-white/5' : ''}`}
        style={!isHome ? {
          background: navBg,
          backdropFilter: navBlur,
          borderBottom: navBorder,
          padding: navPadding
        } : {
          padding: navPadding 
        }}
      >
        {/* LEFT: LOGO */}
        <motion.div 
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-7 lg:h-8 flex items-center justify-start relative z-10"
        >
          <Link 
            to="/" 
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} 
            className="h-full flex items-center drop-shadow-md hover:opacity-80 transition-opacity duration-300"
          >
            <img 
              src="/assets/images/logo.png" 
              className="h-full object-contain transition-all duration-300 opacity-90" 
              style={{ filter: isHome ? 'brightness(0) invert(1)' : 'brightness(0)' }}
              alt="Veda Lifespaces" 
            />
          </Link>
        </motion.div>

        {/* CENTER: LINKS */}
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 lg:gap-10 whitespace-nowrap"
          >
            {navLinks.map((link, i) => {
              const isActive = link.href.startsWith('/#') 
                ? activeSection === link.href.replace('/#', '')
                : location.pathname === link.href;
                
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1), duration: 0.5, ease: 'easeOut' }}
                >
                  <Link 
                    to={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`group relative text-[10px] lg:text-[11px] xl:text-[12px] uppercase font-veda-sans font-medium tracking-[0.14em] transition-all duration-300 block 
                      hover:-translate-y-[2px] whitespace-nowrap
                      ${isActive ? `${textColorClass} opacity-100` : `${textColorClass} opacity-70`}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[1px] ${lineColorClass} transition-all duration-300 ease-out 
                      ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* RIGHT: CTA */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 50 }}
          className="relative z-10 flex justify-end"
        >
          <MagneticEnquire isHome={isHome} />
        </motion.div>
      </motion.nav>

      {/* MOBILE NAVBAR HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-[9999] md:hidden p-6 flex items-center justify-between pointer-events-none"
      >
        <Link 
          to="/" 
          onClick={(e) => { 
            setMobileMenuOpen(false); 
            if(location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }} 
          className="pointer-events-auto h-6 drop-shadow-md z-[10000]"
        >
          <img 
            src="/assets/images/logo.png" 
            className="h-full object-contain" 
            style={{ filter: isHome ? 'brightness(0) invert(1)' : 'brightness(0)' }}
            alt="Veda" 
          />
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="pointer-events-auto flex flex-col justify-center gap-[5px] w-10 h-10 items-end drop-shadow-md z-[10000]"
        >
          <span className={`w-6 h-[1px] block ${isHome ? 'bg-veda-ivory' : 'bg-black'}`} />
          <span className={`w-5 h-[1px] block ${isHome ? 'bg-veda-ivory' : 'bg-black'}`} />
        </button>
      </motion.div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ clipPath: 'circle(0% at 100% 0)', backgroundColor: 'rgba(245,242,232,0)' }}
            animate={{ clipPath: 'circle(150% at 100% 0)', backgroundColor: 'rgba(245,242,232,1)' }}
            exit={{ clipPath: 'circle(0% at 100% 0)', backgroundColor: 'rgba(245,242,232,0)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998] text-[#0a0a0a] flex flex-col justify-between p-8 pt-24"
          >
            {/* Mobile Header Inside Menu */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <div className="h-6 opacity-0"></div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-black/60 hover:text-black uppercase text-xs tracking-widest p-2 flex flex-col gap-[5px] justify-center items-end"
              >
                <span className="text-[10px] tracking-widest font-veda-sans">CLOSE</span>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    to={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-3xl font-light uppercase tracking-widest flex items-baseline gap-6 text-[#0a0a0a] hover:text-black/60 transition-colors font-veda-serif"
                  >
                    <span className="text-sm font-serif italic text-black/40 font-normal">0{i + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-8"
                >
                  <Link 
                    to="/contact-us.php"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center bg-[#121212] text-[#F4F1E8] px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium font-veda-sans"
                  >
                    Enquire ↗
                  </Link>
              </motion.div>
            </div>

            {/* Mobile Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-auto border-t border-black/10 pt-6 pb-4"
            >
              <span className="text-xs uppercase tracking-[0.4em] font-veda-serif italic text-black/60">
                Beyond Living.
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
