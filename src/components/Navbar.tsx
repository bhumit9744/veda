import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const { scrollY } = useScroll();

  const isHome = location.pathname === '/' || location.pathname === '/index.php';

  // Scroll Transformations
  const navBg = useTransform(scrollY, [0, 200], ['rgba(248, 247, 244, 0.62)', 'rgba(248, 247, 244, 0.95)']);
  const navBlur = useTransform(scrollY, [0, 200], ['blur(14px)', 'blur(20px)']);
  const navBorder = useTransform(scrollY, [0, 200], ['1px solid rgba(255, 255, 255, 0.18)', '1px solid rgba(255, 255, 255, 0.5)']);

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
    { name: 'OUR PROJECTS', href: '/projects' }
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

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 w-full z-[9999] hidden md:grid grid-cols-[1fr_auto_1fr] items-center pointer-events-auto transition-all"
        style={{
          background: navBg,
          backdropFilter: navBlur,
          borderBottom: navBorder,
          padding: navPadding
        }}
      >
        {/* LEFT: LOGO */}
        <motion.div 
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-8 flex items-center justify-start relative z-10"
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
              className="h-full object-contain" 
              alt="Veda Lifespaces" 
              style={{ filter: 'invert(1) brightness(0.2)' }}
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
                    className={`group relative text-[10px] lg:text-[11px] xl:text-[12px] uppercase font-medium tracking-[0.14em] transition-all duration-300 block 
                      hover:-translate-y-[1px] text-[#1a1a1a] whitespace-nowrap
                      ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[1px] bg-[#1a1a1a] transition-all duration-300 ease-out 
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
          <Link 
            to="/contact-us.php"
            className={`group flex items-center gap-2 px-6 py-[12px] rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.14em] font-medium shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] whitespace-nowrap bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#F8F7F4]`}
          >
            <span className="transition-transform duration-500">Enquire</span>
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </Link>
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
            alt="Veda" 
            style={{ filter: isHome ? 'none' : 'invert(1) hue-rotate(180deg) brightness(1.2)' }}
          />
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="pointer-events-auto flex flex-col justify-center gap-[5px] w-10 h-10 items-end drop-shadow-md z-[10000]"
        >
          <span className={`w-6 h-[1px] ${isHome ? 'bg-white' : 'bg-black'} block`} />
          <span className={`w-5 h-[1px] ${isHome ? 'bg-white' : 'bg-black'} block`} />
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
              <div className="h-6 opacity-0"></div> {/* Spacer for logo to remain visible from under */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-black/60 hover:text-black uppercase text-xs tracking-widest p-2 flex flex-col gap-[5px] justify-center items-end"
              >
                <span className="text-[10px] tracking-widest">CLOSE</span>
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
                    className="text-3xl font-light uppercase tracking-widest flex items-baseline gap-6 text-[#0a0a0a] hover:text-black/60 transition-colors"
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
                    className="inline-flex items-center justify-center bg-[#121212] text-[#F4F1E8] px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium"
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
              <span className="text-xs uppercase tracking-[0.4em] font-serif italic text-black/60">
                Beyond Living.
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
