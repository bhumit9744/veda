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

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const socialLinks = [
    { name: 'X', url: 'https://x.com/vedalifespace', icon: '/assets/images/X-Icon-White.png' },
    { name: 'Facebook', url: 'https://www.facebook.com/vedalifespaces', icon: '/assets/images/facebook-icon.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/veda-life-spaces/', icon: '/assets/images/Linkedin-Icon.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/vedalifespaces/', icon: '/assets/images/Instagram-Icon.png' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Vedalifespaces', icon: '/assets/images/Youtube-Icon.png' }
  ];

  return (
    <footer ref={containerRef} className="relative bg-[#050505] text-[#F4F1E8] overflow-hidden pt-24 md:pt-32 font-sans border-t border-black">
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Upper Footer - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-32">
          
          {/* Column 01: QUICK LINKS */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[0.65rem] uppercase tracking-[0.3em] mb-12 text-white/40 font-semibold">Navigation</h4>
            <div className="flex flex-col gap-5">
              {['Home', 'About', 'Developments', 'Contact', 'Careers', 'FAQ'].map((item, i) => {
                const paths: Record<string, string> = {
                  'Home': '/',
                  'About': '/aboutus.php',
                  'Developments': '/#developments',
                  'Contact': '/contact-us.php',
                  'Careers': '/carrers.php',
                  'FAQ': '/faq.php'
                };
                return (
                  <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
                    <Link to={paths[item]} className="group flex items-center text-sm md:text-base font-light text-white/70 hover:text-white transition-all duration-500 w-max">
                      <span className="w-0 h-[1px] bg-[#b89a6b] mr-0 group-hover:w-6 group-hover:mr-4 transition-all duration-500 ease-out" />
                      <span className="group-hover:translate-x-1 transition-transform duration-500 ease-out">{item}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Column 02: CONTACT INFO */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-[0.65rem] uppercase tracking-[0.3em] mb-12 text-white/40 font-semibold">Inquiries</h4>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 text-sm font-light text-white/70"
            >
              <div className="group flex flex-col gap-2 w-max cursor-pointer">
                <span className="uppercase tracking-[0.2em] text-[0.65rem] text-[#b89a6b]">Email</span>
                <a href="mailto:info@vedalifespaces.in" className="text-base md:text-lg group-hover:text-white transition-colors duration-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white group-hover:after:w-full after:transition-all after:duration-500">info@vedalifespaces.in</a>
              </div>
              <div className="group flex flex-col gap-2 w-max cursor-pointer">
                <span className="uppercase tracking-[0.2em] text-[0.65rem] text-[#b89a6b]">Phone</span>
                <a href="tel:+919619394620" className="text-base md:text-lg group-hover:text-white transition-colors duration-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white group-hover:after:w-full after:transition-all after:duration-500">+91 96193 94620</a>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <span className="uppercase tracking-[0.2em] text-[0.65rem] text-white/40">Office</span>
                <span className="leading-loose text-white/70 max-w-[200px]">Mumbai, Maharashtra,<br/>India</span>
              </div>
            </motion.div>

            {/* Premium Social Icons */}
            <div className="flex gap-4 mt-16">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-500 group"
                >
                  <img src={social.icon} alt={social.name} className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-60 group-hover:opacity-100 group-hover:invert transition-all duration-500" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 03: FEATURED DEVELOPMENT */}
          <div className="md:col-span-5 flex flex-col">
            <h4 className="text-[0.65rem] uppercase tracking-[0.3em] mb-12 text-white/40 font-semibold">Featured Estate</h4>
            <Link
              to="/codename-bellagio.php"
              className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden group cursor-pointer block bg-[#111]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="w-full h-full"
              >
                <img 
                  src="/assets/images/bellagio/img268.jpg" 
                  alt="Codename Bellagio"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </motion.div>
              {/* Refined overlay frame */}
              <div className="absolute inset-4 border border-white/10 z-10 pointer-events-none transition-colors duration-700 group-hover:border-white/30" />
            </Link>
            
            <div className="flex flex-row justify-between items-center mt-8">
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">Codename Bellagio</span>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#b89a6b]">Alibaug</span>
              </div>
              <Link to="/codename-bellagio.php" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-[#b89a6b] hover:border-[#b89a6b] transition-all duration-500 group">
                <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-lg font-light">→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* HUGE VEDA WORDMARK */}
        <div className="w-full flex flex-col items-center justify-center relative pb-12 md:pb-24 pt-12 border-t border-white/5">
          <motion.div 
            style={{ y: wordmarkY }}
            className="w-full flex justify-center overflow-hidden"
          >
            <h1 className="text-[clamp(3rem,11vw,12rem)] font-light tracking-widest leading-none text-white/5 select-none text-center">
              VEDA
            </h1>
          </motion.div>
          
          <div className="absolute bottom-6 md:bottom-16">
            <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.5em] text-[#b89a6b] font-medium">
              Beyond Living
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="w-full border-t border-white/5 bg-[#030303]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.65rem] uppercase tracking-widest text-white/40">
          <div>
            © {currentYear} Veda Lifespaces. All rights reserved.
          </div>
          <div className="flex gap-10">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
