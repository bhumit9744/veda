import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [150, 0]);

  const socialLinks = [
    { name: 'X', url: 'https://x.com/vedalifespace', icon: '/assets/images/X-Icon-White.png' },
    { name: 'Facebook', url: 'https://www.facebook.com/vedalifespaces', icon: '/assets/images/facebook-icon.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/veda-life-spaces/', icon: '/assets/images/Linkedin-Icon.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/vedalifespaces/', icon: '/assets/images/Instagram-Icon.png' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Vedalifespaces', icon: '/assets/images/Youtube-Icon.png' }
  ];

  return (
    <footer ref={containerRef} className="relative bg-[#0a0a0a] text-[#d4c9b3] overflow-hidden pt-20">
      
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-16 flex flex-col">
        
        {/* Upper Footer - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 md:mb-32">
          
          {/* Column 01: QUICK LINKS */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-xs uppercase tracking-[0.2em] mb-10 text-white/50">Quick Links</h4>
            <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.0, duration: 0.6 }} viewport={{ once: true }}>
                <Link to="/" className="group flex items-center gap-4 text-base md:text-lg text-[#d4c9b3] hover:text-white transition-colors duration-300 w-max relative">
                  <span className="relative z-10">Home</span>
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 relative z-10 text-xs">→</span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} viewport={{ once: true }}>
                <Link to="/aboutus.php" className="group flex items-center gap-4 text-base md:text-lg text-[#d4c9b3] hover:text-white transition-colors duration-300 w-max relative">
                  <span className="relative z-10">About</span>
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 relative z-10 text-xs">→</span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }}>
                <Link to="/#developments" className="group flex items-center gap-4 text-base md:text-lg text-[#d4c9b3] hover:text-white transition-colors duration-300 w-max relative">
                  <span className="relative z-10">Developments</span>
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 relative z-10 text-xs">→</span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} viewport={{ once: true }}>
                <Link to="/contact-us.php" className="group flex items-center gap-4 text-base md:text-lg text-[#d4c9b3] hover:text-white transition-colors duration-300 w-max relative">
                  <span className="relative z-10">Contact</span>
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 relative z-10 text-xs">→</span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} viewport={{ once: true }}>
                <Link to="/carrers.php" className="group flex items-center gap-4 text-base md:text-lg text-[#d4c9b3] hover:text-white transition-colors duration-300 w-max relative">
                  <span className="relative z-10">Careers</span>
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 relative z-10 text-xs">→</span>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} viewport={{ once: true }}>
                <Link to="/faq.php" className="group flex items-center gap-4 text-base md:text-lg text-[#d4c9b3] hover:text-white transition-colors duration-300 w-max relative">
                  <span className="relative z-10">FAQ</span>
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 relative z-10 text-xs">→</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Column 02: CONTACT INFO */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-xs uppercase tracking-[0.2em] mb-10 text-white/50">Contact Info</h4>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 text-sm md:text-base font-light"
            >
              <div className="flex flex-col gap-2">
                <span className="uppercase tracking-widest text-xs text-white/40">Email</span>
                <a href="mailto:info@vedalifespaces.in" className="hover:text-white transition-colors">info@vedalifespaces.in</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="uppercase tracking-widest text-xs text-white/40">Phone</span>
                <a href="tel:+919619394620" className="hover:text-white transition-colors">+91 96193 94620</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="uppercase tracking-widest text-xs text-white/40">Location</span>
                <span className="leading-relaxed max-w-[200px]">Mumbai, Maharashtra,<br/>India</span>
              </div>
            </motion.div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-12">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <img src={social.icon} alt={social.name} className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 03: FEATURED DEVELOPMENT */}
          <div className="md:col-span-5 flex flex-col">
            <h4 className="text-xs uppercase tracking-[0.2em] mb-10 text-white/50">Featured Development</h4>
            <Link
              to="/codename-bellagio.php"
              className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden group cursor-pointer block"
            >
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="w-full h-full"
              >
                <img 
                  src="/assets/images/bellagio/img268.jpg" 
                  alt="Codename Bellagio"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>
            </Link>
            
            <div className="flex flex-row justify-between items-end mt-6">
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-light uppercase tracking-widest text-white mb-1">Codename Bellagio</span>
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Alibaug</span>
              </div>
              <Link to="/codename-bellagio.php" className="text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
                Explore <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* HUGE VEDA WORDMARK */}
        <div className="w-full flex flex-col items-center justify-center relative pb-8 md:pb-16">
          <motion.h1 
            style={{ y: wordmarkY }}
            className="text-[clamp(40px,10vw,140px)] font-normal tracking-[-0.02em] leading-none text-[#e3dac9] opacity-90 whitespace-nowrap select-none"
          >
            VEDA LIFESPACES
          </motion.h1>
          
          <div className="absolute bottom-4 md:bottom-12 right-0 md:right-8">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/60">
              Beyond Living.
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="w-full border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs uppercase tracking-widest text-white/40">
          <div>
            © {currentYear} Veda Lifespaces
          </div>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="hidden md:block">
            Beyond Living.
          </div>
        </div>
      </div>
    </footer>
  );
}
