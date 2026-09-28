import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const { scrollY } = useScroll();

  // Scroll Transformations
  const capsuleBg = useTransform(scrollY, [0, 200], ['rgba(245, 242, 232, 0.10)', 'rgba(245, 242, 232, 0.18)']);
  const capsuleBlur = useTransform(scrollY, [0, 200], ['blur(18px)', 'blur(28px)']);
  const capsuleBorder = useTransform(scrollY, [0, 200], ['1px solid rgba(255,255,255,0.18)', '1px solid rgba(255,255,255,0.3)']);
  const capsulePadding = useTransform(scrollY, [0, 200], ['12px 32px', '8px 28px']);

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
    { name: 'OUR PROJECTS', href: '/#developments' }
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="fixed top-6 md:top-8 left-[4vw] right-[4vw] mx-auto max-w-[1400px] z-[9999] hidden md:grid grid-cols-[1fr_auto_1fr] items-center pointer-events-none"
      >
        {/* LEFT: LOGO */}
        <motion.div 
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto h-8 flex items-center justify-start relative z-10"
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
            <img src="/assets/images/logo.png" className="h-full object-contain brightness-0 invert" alt="Veda Lifespaces" />
          </Link>
        </motion.div>

        {/* CENTER: CAPSULE */}
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scaleX: 0.8, clipPath: 'inset(0 50% 0 50%)' }}
            animate={{ opacity: 1, scaleX: 1, clipPath: 'inset(0 0% 0 0%)' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto rounded-full flex items-center gap-6 lg:gap-8 overflow-hidden whitespace-nowrap"
            style={{
              background: capsuleBg,
              backdropFilter: capsuleBlur,
              border: capsuleBorder,
              padding: capsulePadding
            }}
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
                      hover:-translate-y-[2px] hover:text-white hover:opacity-100 whitespace-nowrap
                      ${isActive ? 'text-white opacity-100' : 'text-white opacity-70'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[1px] bg-white transition-all duration-300 ease-out 
                      ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* RIGHT: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, type: 'spring', stiffness: 50 }}
          className="pointer-events-auto relative z-10 flex justify-end"
        >
          <Link 
            to="/contact-us.php"
            className="group flex items-center gap-2 bg-[#121212]/95 hover:bg-[#1a1a1a] text-[#F4F1E8] px-6 py-[14px] rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.14em] font-medium border border-white/5 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:px-7 hover:scale-[1.02] whitespace-nowrap"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-500">Enquire</span>
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1">↗</span>
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
          <img src="/assets/images/logo.png" className="h-full object-contain brightness-0 invert" alt="Veda" />
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="pointer-events-auto flex flex-col justify-center gap-[5px] w-10 h-10 items-end drop-shadow-md z-[10000]"
        >
          <span className="w-6 h-[1px] bg-white block" />
          <span className="w-5 h-[1px] bg-white block" />
        </button>
      </motion.div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ clipPath: 'circle(0% at 100% 0)', backgroundColor: 'rgba(15,18,17,0)' }}
            animate={{ clipPath: 'circle(150% at 100% 0)', backgroundColor: 'rgba(15,18,17,1)' }}
            exit={{ clipPath: 'circle(0% at 100% 0)', backgroundColor: 'rgba(15,18,17,0)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998] text-[#F4F1E8] flex flex-col justify-between p-8 pt-24"
          >
            {/* Mobile Header Inside Menu */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <div className="h-6 opacity-0"></div> {/* Spacer for logo to remain visible from under */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/60 hover:text-white uppercase text-xs tracking-widest p-2 flex flex-col gap-[5px] justify-center items-end"
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
                    className="text-3xl font-light uppercase tracking-widest flex items-baseline gap-6 text-white hover:text-white/60 transition-colors"
                  >
                    <span className="text-sm font-serif italic text-white/40 font-normal">0{i + 1}</span>
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
                    className="inline-flex items-center justify-center bg-[#F4F1E8] text-[#0a0a0a] px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium"
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
              className="mt-auto border-t border-white/10 pt-6 pb-4"
            >
              <span className="text-xs uppercase tracking-[0.4em] font-serif italic text-white/60">
                Beyond Living.
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
